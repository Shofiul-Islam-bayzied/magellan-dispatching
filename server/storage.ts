import fs from "fs";
import path from "path";
import { Settings, defaultSettings } from "../shared/schema.js";

const DATA_DIR = path.join(process.cwd(), "data");
const SETTINGS_FILE = path.join(DATA_DIR, "settings.json");
const LEADS_FILE = path.join(DATA_DIR, "leads.json");

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

export interface Lead {
  name: string;
  email: string;
  phone: string;
  trucks: string;
  timestamp: string;
}

export function saveLead(lead: Lead): void {
  ensureDataDir();
  let leads: Lead[] = [];
  if (fs.existsSync(LEADS_FILE)) {
    try {
      leads = JSON.parse(fs.readFileSync(LEADS_FILE, "utf-8"));
    } catch {
      leads = [];
    }
  }
  leads.push(lead);
  fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2), "utf-8");
}

export function getLeads(): Lead[] {
  if (!fs.existsSync(LEADS_FILE)) return [];
  try {
    return JSON.parse(fs.readFileSync(LEADS_FILE, "utf-8"));
  } catch {
    return [];
  }
}
