# Server & deployment

Operations doc for the `Northline Dispatching` landing page (repo name: `Landing-Page-Design`, app name: `magellan`). No secrets in this file — passwords and keys live in your password manager.

## Production host

| Field | Value |
| --- | --- |
| Host | `217.77.1.24` (hostname `vmi3146130`) |
| OS | Ubuntu 24.04 LTS |
| SSH user | `root` |
| App path | `/var/www/magellan` |
| Build artifact | `dist/index.cjs` |
| Node | 22.x |
| Process manager | PM2 — app name `magellan` |
| systemd | `pm2-root.service` (autostart on boot) |
| App port | `5000`, bound to `0.0.0.0` |
| Reverse proxy | nginx — site file `/etc/nginx/sites-enabled/magellan` (80/443) |
| Runtime data | `/var/www/magellan/data/{settings.json,leads.json}` — git-ignored |

## Access

The server password is in your password manager, not here. To get keyless access, append your public key to `/root/.ssh/authorized_keys` on the VPS:

```bash
# On your local machine (one time)
ssh-copy-id root@217.77.1.24
# or manually:
cat ~/.ssh/id_ed25519.pub | ssh root@217.77.1.24 'mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys'
```

Then `ssh root@217.77.1.24` works without a password.

## Deploy runbook

The server is **not** a git checkout — `/var/www/magellan` holds only the built `dist/`, `data/`, `node_modules/`, and `package.json`/`package-lock.json`. Source code stays on your laptop. The deploy is build-local-and-ship-artifacts.

**Local (your machine):**

```bash
git push origin main                                # source-of-truth on GitHub
npm run build                                       # writes dist/index.cjs + dist/public/
tar -czf dist.tgz dist
scp dist.tgz package.json package-lock.json root@217.77.1.24:/var/www/magellan/
```

**On the VPS:**

```bash
ssh root@217.77.1.24
cd /var/www/magellan
TS=$(date +%Y%m%d-%H%M%S)
tar -czf /root/magellan-backup-$TS.tgz dist data package.json package-lock.json
mkdir -p dist.new && tar -xzf dist.tgz -C dist.new --strip-components=1
[ -f dist.new/index.cjs ] || { echo "extract failed"; exit 1; }
mv dist dist.old.$TS && mv dist.new dist
npm ci --omit=dev                                   # only if package-lock.json changed
pm2 restart magellan --update-env
sleep 60 && pm2 logs magellan --lines 20 --nostream
curl -s -o /dev/null -w 'HTTP %{http_code}\n' http://127.0.0.1:5000/
rm -f dist.tgz
```

Note: app takes **~60 seconds** to bind to port 5000 after `pm2 restart`. Don't panic if the first curl fails — wait a minute and re-check.

## Rollback

```bash
# Snap back to the previous dist (no rebuild needed)
cd /var/www/magellan
PREV=$(ls -td dist.old.* | head -1)
rm -rf dist && mv "$PREV" dist
pm2 restart magellan
```

## Health checks

```bash
pm2 list                                          # status, restart count, uptime
pm2 logs magellan --lines 50 --nostream           # recent app logs
curl -sI http://127.0.0.1:5000/ | head -5         # local 200
curl -sI https://northlinedispatching.com/ | head -5
nginx -t && systemctl status nginx --no-pager
```

## Runtime data files

Admin panel settings and submitted leads live in `data/` on the server:

- `data/settings.json` — admin password, admin slug, contact info, Calendly config, analytics IDs (GA4, FB Pixel, Microsoft Clarity, custom head scripts)
- `data/leads.json` — every submission from the lead form

Both are git-ignored (`.gitignore` line 9 ignores all of `data/`), so `git pull` never touches them. `server/storage.ts` merges loaded settings on top of `defaultSettings`, so new schema fields auto-populate with defaults without overwriting live values.

To back up before risky changes:

```bash
ssh root@217.77.1.24 'tar -czf /root/magellan-data-$(date +%F).tgz -C /var/www/magellan data/'
```

## Where to set admin values

Log in at `https://northlinedispatching.com/<adminSlug>` (default `mgmt-9x7k`, configurable in the **Access URL** tab). Settings written through the admin UI are persisted to `data/settings.json` and read on every page load.

## Things to monitor

- App heap usage was observed near 95 % of a 66 MB heap — keep an eye on `pm2 list` memory column over time. Raise heap (`NODE_OPTIONS=--max-old-space-size=256`) or investigate a leak if it stays hot.
- Verify `SESSION_SECRET` in the PM2 env is a strong random value, not a hardcoded string. Inspect with `pm2 env <id>` and rotate if needed:
  ```bash
  pm2 set magellan:SESSION_SECRET "$(openssl rand -hex 32)"
  pm2 restart magellan --update-env
  ```
