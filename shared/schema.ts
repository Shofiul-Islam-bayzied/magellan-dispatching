import { z } from "zod";

export const contactSchema = z.object({
  email: z.string(),
  phone: z.string(),
  address: z.string(),
});

export const calendlySchema = z.object({
  url: z.string(),
  primaryColor: z.string(),
  hideEventTypeDetails: z.boolean(),
  hideGdprBanner: z.boolean(),
});

export const analyticsSchema = z.object({
  ga4MeasurementId: z.string(),
  facebookPixelId: z.string(),
  microsoftClarityId: z.string(),
  customHeadScripts: z.string(),
});

export const settingsSchema = z.object({
  adminPassword: z.string(),
  contact: contactSchema,
  calendly: calendlySchema,
  analytics: analyticsSchema,
});

export type Settings = z.infer<typeof settingsSchema>;
export type ContactSettings = z.infer<typeof contactSchema>;
export type CalendlySettings = z.infer<typeof calendlySchema>;
export type AnalyticsSettings = z.infer<typeof analyticsSchema>;

export const publicSettingsSchema = z.object({
  contact: contactSchema,
  calendly: calendlySchema,
  analytics: analyticsSchema,
});

export type PublicSettings = z.infer<typeof publicSettingsSchema>;

export const defaultSettings: Settings = {
  adminPassword: "admin123",
  contact: {
    email: "info@magellandispatching.com",
    phone: "(800) 555-0199",
    address: "",
  },
  calendly: {
    url: "https://calendly.com/your-calendly-link/dispatch-consultation",
    primaryColor: "F97316",
    hideEventTypeDetails: true,
    hideGdprBanner: true,
  },
  analytics: {
    ga4MeasurementId: "",
    facebookPixelId: "",
    microsoftClarityId: "",
    customHeadScripts: "",
  },
};
