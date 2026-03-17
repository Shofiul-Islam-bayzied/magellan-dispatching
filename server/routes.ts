import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { loadSettings, saveSettings } from "./storage.js";
import { settingsSchema } from "../shared/schema.js";

// Simple in-memory rate limiter for login attempts
const loginAttempts = new Map<string, { count: number; resetAt: number }>();
const LOGIN_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const LOGIN_MAX_ATTEMPTS = 5;

function checkLoginRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = loginAttempts.get(ip);
  if (!entry || now > entry.resetAt) {
    loginAttempts.set(ip, { count: 1, resetAt: now + LOGIN_WINDOW_MS });
    return true;
  }
  if (entry.count >= LOGIN_MAX_ATTEMPTS) return false;
  entry.count++;
  return true;
}

declare module "express-session" {
  interface SessionData {
    isAdmin: boolean;
  }
}

function requireAdmin(req: Request, res: Response, next: NextFunction) {
  if (req.session?.isAdmin) {
    return next();
  }
  return res.status(401).json({ message: "Unauthorized" });
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Public settings (no password exposed)
  app.get("/api/public/settings", (_req, res) => {
    const settings = loadSettings();
    const { adminPassword: _pw, ...publicSettings } = settings;
    res.json(publicSettings);
  });

  // Admin auth check
  app.get("/api/admin/me", (req, res) => {
    if (req.session?.isAdmin) {
      return res.json({ isAdmin: true });
    }
    return res.status(401).json({ message: "Not authenticated" });
  });

  // Admin login (rate-limited)
  app.post("/api/admin/login", (req, res) => {
    const ip = (req.headers["x-forwarded-for"] as string)?.split(",")[0].trim() || req.socket.remoteAddress || "unknown";
    if (!checkLoginRateLimit(ip)) {
      return res.status(429).json({ message: "Too many login attempts. Try again in 15 minutes." });
    }

    const { password } = req.body as { password: string };
    const settings = loadSettings();

    if (!password || password !== settings.adminPassword) {
      return res.status(401).json({ message: "Invalid password" });
    }

    req.session.isAdmin = true;
    return res.json({ success: true });
  });

  // Admin logout
  app.post("/api/admin/logout", (req, res) => {
    req.session.destroy(() => {
      res.json({ success: true });
    });
  });

  // Get all settings (protected) — password stripped from response
  app.get("/api/admin/settings", requireAdmin, (_req, res) => {
    const settings = loadSettings();
    const { adminPassword: _pw, ...safeSettings } = settings;
    res.json(safeSettings);
  });

  // Update settings (protected)
  app.put("/api/admin/settings", requireAdmin, (req, res) => {
    const current = loadSettings();
    const body = req.body as Partial<typeof current>;

    // Build updated settings, merging sections
    const updated = {
      ...current,
      ...body,
      contact: body.contact ? { ...current.contact, ...body.contact } : current.contact,
      calendly: body.calendly ? { ...current.calendly, ...body.calendly } : current.calendly,
      analytics: body.analytics ? { ...current.analytics, ...body.analytics } : current.analytics,
    };

    const result = settingsSchema.safeParse(updated);
    if (!result.success) {
      return res.status(400).json({ message: "Invalid settings", errors: result.error.flatten() });
    }

    saveSettings(result.data);
    const { adminPassword: _pw, ...publicSettings } = result.data;
    return res.json(publicSettings);
  });

  return httpServer;
}
