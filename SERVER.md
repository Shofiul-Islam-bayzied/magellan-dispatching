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

Push from local first (`git push origin main`), then on the VPS:

```bash
ssh root@217.77.1.24
cd /var/www/magellan
git fetch origin
git status                              # must be clean — investigate if not
git log --oneline HEAD..origin/main     # preview incoming commits
git pull --ff-only origin main
npm ci
npm run build                           # produces dist/index.cjs
pm2 restart magellan --update-env
pm2 logs magellan --lines 40 --nostream
curl -s -o /dev/null -w 'HTTP %{http_code}\n' http://127.0.0.1:5000/
```

## Rollback

```bash
# Roll back N commits and rebuild
git -C /var/www/magellan reset --hard HEAD~N
npm --prefix /var/www/magellan run build
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
