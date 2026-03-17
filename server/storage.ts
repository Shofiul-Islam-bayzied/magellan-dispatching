import fs from "fs";
import path from "path";
import { Settings, defaultSettings } from "../shared/schema.js";

const DATA_DIR = path.join(process.cwd(), "data");
const SETTINGS_FILE = path.join(DATA_DIR, "settings.json");

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

export function loadSettings(): Settings {
  ensureDataDir();
  if (!fs.existsSync(SETTINGS_FILE)) {
    saveSettings(defaultSettings);
    return structuredClone(defaultSettings);
  }
  try {
    const raw = fs.readFileSync(SETTINGS_FILE, "utf-8");
    const parsed = JSON.parse(raw) as Settings;
    // Merge with defaults to handle missing fields from older versions
    return {
      ...defaultSettings,
      ...parsed,
      contact: { ...defaultSettings.contact, ...parsed.contact },
      calendly: { ...defaultSettings.calendly, ...parsed.calendly },
      analytics: { ...defaultSettings.analytics, ...parsed.analytics },
    };
  } catch {
    return structuredClone(defaultSettings);
  }
}

export function saveSettings(settings: Settings): void {
  ensureDataDir();
  fs.writeFileSync(SETTINGS_FILE, JSON.stringify(settings, null, 2), "utf-8");
}
