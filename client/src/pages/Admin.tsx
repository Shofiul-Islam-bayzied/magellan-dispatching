import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Compass, LogOut, Phone, Mail, Calendar, BarChart3, Key, Save, Eye, EyeOff, Check, Users, Download } from "lucide-react";
import { apiRequest, getQueryFn } from "@/lib/queryClient";
import type { PublicSettings, ContactSettings, CalendlySettings, AnalyticsSettings } from "@shared/schema";

// ── Types ────────────────────────────────────────────────────────────────────

interface AdminSettings extends PublicSettings {
  adminPassword?: string;
}

// ── Small helpers ─────────────────────────────────────────────────────────────

function SaveButton({ isPending, saved }: { isPending: boolean; saved: boolean }) {
  return (
    <button
      type="submit"
      disabled={isPending}
      className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-white font-bold uppercase tracking-widest text-sm disabled:opacity-60 hover:bg-primary/90 transition-colors"
    >
      {isPending ? (
        <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
      ) : saved ? (
        <Check className="w-4 h-4" />
      ) : (
        <Save className="w-4 h-4" />
      )}
      {isPending ? "Saving…" : saved ? "Saved!" : "Save Changes"}
    </button>
  );
}

function FormField({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-bold uppercase tracking-widest text-gray-400">
        {label}
      </label>
      {children}
      {hint && <p className="text-xs text-gray-500">{hint}</p>}
    </div>
  );
}

const inputCls =
  "w-full bg-[#0f1f2f] border border-[#1e3a52] text-white placeholder-gray-600 px-4 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors";
const textareaCls =
  "w-full bg-[#0f1f2f] border border-[#1e3a52] text-white placeholder-gray-600 px-4 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors resize-y min-h-[120px] font-mono";

// ── Section components ────────────────────────────────────────────────────────

function ContactSection({ settings }: { settings: AdminSettings }) {
  const qc = useQueryClient();
  const [saved, setSaved] = useState(false);
  const { register, handleSubmit } = useForm<ContactSettings>({
    defaultValues: settings.contact,
  });

  const mutation = useMutation({
    mutationFn: (data: ContactSettings) =>
      apiRequest("PUT", "/api/admin/settings", { contact: data }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["/api/public/settings"] });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    },
  });

  return (
    <form onSubmit={handleSubmit((d) => mutation.mutate(d))} className="space-y-6">
      <FormField label="Email Address" hint="Shown in the website footer">
        <input
          {...register("email")}
          type="text"
          placeholder="info@example.com"
          className={inputCls}
        />
      </FormField>
      <FormField label="Phone Number" hint="Shown in the website footer">
        <input
          {...register("phone")}
          type="text"
          placeholder="(800) 555-0199"
          className={inputCls}
        />
      </FormField>
      <FormField label="Address" hint="Optional — shown in footer if filled">
        <input
          {...register("address")}
          type="text"
          placeholder="123 Main St, City, State"
          className={inputCls}
        />
      </FormField>
      <div className="pt-2">
        <SaveButton isPending={mutation.isPending} saved={saved} />
        {mutation.isError && (
          <p className="mt-2 text-red-400 text-sm">Error saving. Please try again.</p>
        )}
      </div>
    </form>
  );
}

function CalendlySection({ settings }: { settings: AdminSettings }) {
  const qc = useQueryClient();
  const [saved, setSaved] = useState(false);
  const { register, handleSubmit, watch } = useForm<CalendlySettings>({
    defaultValues: settings.calendly,
  });

  const mutation = useMutation({
    mutationFn: (data: CalendlySettings) =>
      apiRequest("PUT", "/api/admin/settings", { calendly: data }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["/api/public/settings"] });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    },
  });

  const watchedUrl = watch("url");
  const watchedColor = watch("primaryColor");

  return (
    <form onSubmit={handleSubmit((d) => mutation.mutate(d))} className="space-y-6">
      <FormField
        label="Calendly URL"
        hint='Paste your full Calendly event URL, e.g. https://calendly.com/yourname/consultation'
      >
        <input
          {...register("url")}
          type="text"
          placeholder="https://calendly.com/your-name/event-name"
          className={inputCls}
        />
      </FormField>

      <FormField
        label="Primary Color (Hex)"
        hint="Used for the Calendly widget accent color. Do not include #."
      >
        <div className="flex items-center gap-3">
          <input
            {...register("primaryColor")}
            type="text"
            placeholder="F97316"
            maxLength={6}
            className={`${inputCls} max-w-[180px] font-mono`}
          />
          <div
            className="w-8 h-8 border border-[#1e3a52] flex-shrink-0"
            style={{ backgroundColor: `#${watchedColor || "F97316"}` }}
          />
        </div>
      </FormField>

      <div className="flex flex-col gap-3">
        <label className="flex items-center gap-3 cursor-pointer select-none">
          <input
            {...register("hideEventTypeDetails")}
            type="checkbox"
            className="w-4 h-4 accent-primary"
          />
          <span className="text-sm text-gray-300">Hide event type details in widget</span>
        </label>
        <label className="flex items-center gap-3 cursor-pointer select-none">
          <input
            {...register("hideGdprBanner")}
            type="checkbox"
            className="w-4 h-4 accent-primary"
          />
          <span className="text-sm text-gray-300">Hide GDPR banner in widget</span>
        </label>
      </div>

      {watchedUrl && (
        <div className="bg-[#0f1f2f] border border-[#1e3a52] p-4 text-xs text-gray-400 font-mono break-all">
          <p className="text-gray-500 uppercase tracking-widest text-[10px] mb-1">Embed URL Preview</p>
          {watchedUrl}?primary_color={watchedColor || "F97316"}
        </div>
      )}

      <div className="pt-2">
        <SaveButton isPending={mutation.isPending} saved={saved} />
        {mutation.isError && (
          <p className="mt-2 text-red-400 text-sm">Error saving. Please try again.</p>
        )}
      </div>
    </form>
  );
}

function AnalyticsSection({ settings }: { settings: AdminSettings }) {
  const qc = useQueryClient();
  const [saved, setSaved] = useState(false);
  const { register, handleSubmit } = useForm<AnalyticsSettings>({
    defaultValues: settings.analytics,
  });

  const mutation = useMutation({
    mutationFn: (data: AnalyticsSettings) =>
      apiRequest("PUT", "/api/admin/settings", { analytics: data }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["/api/public/settings"] });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    },
  });

  return (
    <form onSubmit={handleSubmit((d) => mutation.mutate(d))} className="space-y-6">
      <div className="bg-[#0f1f2f] border border-[#1e3a52] p-4 text-xs text-gray-500 leading-relaxed">
        <strong className="text-gray-400">Leave a field empty to disable that analytics tool.</strong>{" "}
        Scripts are only injected when an ID is present.
      </div>

      <FormField
        label="Google Analytics 4 — Measurement ID"
        hint='Format: G-XXXXXXXXXX — found in GA4 › Admin › Data Streams'
      >
        <input
          {...register("ga4MeasurementId")}
          type="text"
          placeholder="G-XXXXXXXXXX"
          className={`${inputCls} font-mono`}
        />
      </FormField>

      <FormField
        label="Facebook / Meta Pixel ID"
        hint='Numeric ID from Meta Business Suite › Events Manager'
      >
        <input
          {...register("facebookPixelId")}
          type="text"
          placeholder="123456789012345"
          className={`${inputCls} font-mono`}
        />
      </FormField>

      <FormField
        label="Microsoft Clarity — Project ID"
        hint='Found in Clarity › Settings › Overview (e.g. abcde12345)'
      >
        <input
          {...register("microsoftClarityId")}
          type="text"
          placeholder="abcde12345"
          className={`${inputCls} font-mono`}
        />
      </FormField>

      <FormField
        label="Custom Head Scripts"
        hint="Paste any additional JavaScript tracking snippets here (TikTok Pixel, LinkedIn, etc.)"
      >
        <textarea
          {...register("customHeadScripts")}
          placeholder="// Paste raw JS here — no <script> tags needed"
          className={textareaCls}
        />
      </FormField>

      <div className="pt-2">
        <SaveButton isPending={mutation.isPending} saved={saved} />
        {mutation.isError && (
          <p className="mt-2 text-red-400 text-sm">Error saving. Please try again.</p>
        )}
      </div>
    </form>
  );
}

function PasswordSection() {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const { register, handleSubmit, reset, watch } = useForm<{
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }>();

  const mutation = useMutation({
    mutationFn: async (data: { currentPassword: string; newPassword: string }) => {
      // Verify current password by trying to log in
      const verifyRes = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: data.currentPassword }),
        credentials: "include",
      });
      if (!verifyRes.ok) throw new Error("Current password is incorrect");
      return apiRequest("PUT", "/api/admin/settings", { adminPassword: data.newPassword });
    },
    onSuccess: () => {
      setSaved(true);
      setError("");
      reset();
      setTimeout(() => setSaved(false), 3000);
    },
    onError: (err: Error) => {
      setError(err.message || "Failed to change password");
    },
  });

  const onSubmit = (data: { currentPassword: string; newPassword: string; confirmPassword: string }) => {
    setError("");
    if (data.newPassword !== data.confirmPassword) {
      setError("New passwords do not match");
      return;
    }
    if (data.newPassword.length < 6) {
      setError("New password must be at least 6 characters");
      return;
    }
    mutation.mutate({ currentPassword: data.currentPassword, newPassword: data.newPassword });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-md">
      <FormField label="Current Password">
        <div className="relative">
          <input
            {...register("currentPassword", { required: true })}
            type={showCurrent ? "text" : "password"}
            placeholder="••••••••"
            className={inputCls}
          />
          <button
            type="button"
            onClick={() => setShowCurrent((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
          >
            {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </FormField>
      <FormField label="New Password" hint="At least 6 characters">
        <div className="relative">
          <input
            {...register("newPassword", { required: true })}
            type={showNew ? "text" : "password"}
            placeholder="••••••••"
            className={inputCls}
          />
          <button
            type="button"
            onClick={() => setShowNew((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
          >
            {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </FormField>
      <FormField label="Confirm New Password">
        <input
          {...register("confirmPassword", { required: true })}
          type="password"
          placeholder="••••••••"
          className={inputCls}
        />
      </FormField>
      {error && <p className="text-red-400 text-sm">{error}</p>}
      <div className="pt-2">
        <SaveButton isPending={mutation.isPending} saved={saved} />
      </div>
    </form>
  );
}

// ── Leads Section ─────────────────────────────────────────────────────────────

interface Lead {
  name: string;
  email: string;
  phone: string;
  trucks: string;
  timestamp: string;
}

function LeadsSection() {
  const { data: leads = [], isLoading } = useQuery<Lead[]>({
    queryKey: ["/api/admin/leads"],
    queryFn: getQueryFn({ on401: "returnNull" }),
  });

  function downloadCSV() {
    const header = ["Date", "Name", "Email", "Phone", "Truck Type"];
    const rows = leads.map((l) => [
      new Date(l.timestamp).toLocaleString(),
      l.name, l.email, l.phone, l.trucks,
    ]);
    const csv = [header, ...rows].map((r) => r.map((v) => `"${v}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `leads-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-48">
        <span className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <span className="bg-primary/15 text-primary font-black text-sm px-3 py-1 uppercase tracking-widest">
            {leads.length} lead{leads.length !== 1 ? "s" : ""}
          </span>
        </div>
        {leads.length > 0 && (
          <button
            onClick={downloadCSV}
            className="flex items-center gap-2 px-4 py-2 bg-[#0f1f2f] border border-[#1e3a52] text-gray-300 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            Export CSV
          </button>
        )}
      </div>

      {leads.length === 0 ? (
        <div className="bg-[#0f1f2f] border border-[#1e3a52] p-12 text-center">
          <Users className="w-10 h-10 text-gray-600 mx-auto mb-3" />
          <p className="text-gray-500 text-sm">No leads yet. Form submissions will appear here.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-[#0f1f2f] border-b border-[#1e3a52]">
                {["Date", "Name", "Email", "Phone", "Truck Type"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-gray-500">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {leads.map((lead, i) => (
                <tr
                  key={i}
                  className="border-b border-[#1e3a52] hover:bg-white/5 transition-colors"
                >
                  <td className="px-4 py-3 text-gray-500 text-xs whitespace-nowrap">
                    {new Date(lead.timestamp).toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-white font-medium">{lead.name}</td>
                  <td className="px-4 py-3 text-gray-300">
                    <a href={`mailto:${lead.email}`} className="hover:text-primary transition-colors">
                      {lead.email}
                    </a>
                  </td>
                  <td className="px-4 py-3 text-gray-300">
                    <a href={`tel:${lead.phone}`} className="hover:text-primary transition-colors">
                      {lead.phone}
                    </a>
                  </td>
                  <td className="px-4 py-3">
                    <span className="bg-primary/15 text-primary text-xs font-bold px-2 py-0.5 uppercase tracking-wide">
                      {lead.trucks || "—"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ── Login ─────────────────────────────────────────────────────────────────────

function LoginForm({ onLogin }: { onLogin: () => void }) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const mutation = useMutation({
    mutationFn: () =>
      apiRequest("POST", "/api/admin/login", { password }),
    onSuccess: onLogin,
    onError: () => setError("Invalid password. Please try again."),
  });

  return (
    <div className="min-h-screen bg-[#070f17] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-10 justify-center">
          <div className="w-12 h-12 bg-primary flex items-center justify-center">
            <Compass className="w-7 h-7 text-white" />
          </div>
          <div>
            <p className="text-2xl font-black tracking-tighter text-white uppercase leading-none">Magellan</p>
            <p className="text-[10px] text-primary font-bold tracking-[0.3em] uppercase">Admin Panel</p>
          </div>
        </div>

        <div className="bg-[#0d1e2d] border border-[#1e3a52] p-8">
          <h1 className="text-white font-black uppercase tracking-widest text-lg mb-6">Sign In</h1>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setError("");
              mutation.mutate();
            }}
            className="space-y-5"
          >
            <FormField label="Password">
              <div className="relative">
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter admin password"
                  className={inputCls}
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </FormField>

            {error && <p className="text-red-400 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={mutation.isPending || !password}
              className="w-full bg-primary text-white font-black uppercase tracking-widest py-3 hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {mutation.isPending && (
                <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              )}
              {mutation.isPending ? "Signing in…" : "Sign In"}
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-gray-600">
            Default password: <code className="text-gray-400">admin123</code>
            <br />
            Change it in the Password tab after logging in.
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Dashboard ─────────────────────────────────────────────────────────────────

type Tab = "leads" | "contact" | "calendly" | "analytics" | "password";

const TABS: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: "leads", label: "Leads", icon: <Users className="w-4 h-4" /> },
  { id: "contact", label: "Contact Info", icon: <Phone className="w-4 h-4" /> },
  { id: "calendly", label: "Calendly", icon: <Calendar className="w-4 h-4" /> },
  { id: "analytics", label: "Analytics", icon: <BarChart3 className="w-4 h-4" /> },
  { id: "password", label: "Password", icon: <Key className="w-4 h-4" /> },
];

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [activeTab, setActiveTab] = useState<Tab>("leads");

  const { data: settings, isLoading } = useQuery<AdminSettings>({
    queryKey: ["/api/admin/settings"],
    queryFn: getQueryFn({ on401: "returnNull" }),
  });

  const logoutMutation = useMutation({
    mutationFn: () => apiRequest("POST", "/api/admin/logout", {}),
    onSuccess: onLogout,
  });

  return (
    <div className="min-h-screen bg-[#070f17] flex flex-col">
      {/* Top bar */}
      <header className="bg-[#0d1e2d] border-b border-[#1e3a52] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-primary flex items-center justify-center">
            <Compass className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-white font-black tracking-tighter uppercase text-base leading-none">Magellan</p>
            <p className="text-[9px] text-primary font-bold tracking-[0.3em] uppercase">Admin Panel</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-gray-400 hover:text-white transition-colors uppercase tracking-widest"
          >
            View Site ↗
          </a>
          <button
            onClick={() => logoutMutation.mutate()}
            className="flex items-center gap-2 text-xs text-gray-400 hover:text-white transition-colors uppercase tracking-widest"
          >
            <LogOut className="w-3.5 h-3.5" />
            Logout
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar tabs */}
        <nav className="w-56 bg-[#0a1825] border-r border-[#1e3a52] p-4 flex-shrink-0">
          <p className="text-[10px] text-gray-600 uppercase tracking-widest font-bold mb-3 px-2">Settings</p>
          <ul className="space-y-1">
            {TABS.map((tab) => (
              <li key={tab.id}>
                <button
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm font-bold uppercase tracking-wider transition-colors ${
                    activeTab === tab.id
                      ? "bg-primary/15 text-primary border-l-2 border-primary"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-8">
          {isLoading ? (
            <div className="flex items-center justify-center h-48">
              <span className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
            </div>
          ) : !settings ? (
            <p className="text-red-400">Failed to load settings.</p>
          ) : (
            <>
              {activeTab === "leads" && (
                <Section
                  title="Leads"
                  description="All form submissions from the Get Started page. Newest first."
                  icon={<Users className="w-5 h-5 text-primary" />}
                >
                  <LeadsSection />
                </Section>
              )}
              {activeTab === "contact" && (
                <Section
                  title="Contact Information"
                  description="These details appear in the website footer."
                  icon={<Mail className="w-5 h-5 text-primary" />}
                >
                  <ContactSection settings={settings} />
                </Section>
              )}
              {activeTab === "calendly" && (
                <Section
                  title="Calendly Settings"
                  description="Paste your Calendly booking link and configure the embedded calendar widget."
                  icon={<Calendar className="w-5 h-5 text-primary" />}
                >
                  <CalendlySection settings={settings} />
                </Section>
              )}
              {activeTab === "analytics" && (
                <Section
                  title="Analytics & Tracking"
                  description="Add tracking IDs — scripts are injected automatically on the live site."
                  icon={<BarChart3 className="w-5 h-5 text-primary" />}
                >
                  <AnalyticsSection settings={settings} />
                </Section>
              )}
              {activeTab === "password" && (
                <Section
                  title="Change Admin Password"
                  description="Update the password used to access this admin panel."
                  icon={<Key className="w-5 h-5 text-primary" />}
                >
                  <PasswordSection />
                </Section>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}

function Section({
  title,
  description,
  icon,
  children,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-3 mb-2">
        {icon}
        <h2 className="text-white font-black uppercase tracking-widest text-xl">{title}</h2>
      </div>
      <p className="text-gray-500 text-sm mb-8 border-l-2 border-primary/40 pl-3">{description}</p>
      {children}
    </div>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────

export default function Admin() {
  const qc = useQueryClient();

  const { data: auth, isLoading } = useQuery<{ isAdmin: boolean } | null>({
    queryKey: ["/api/admin/me"],
    queryFn: getQueryFn({ on401: "returnNull" }),
    retry: false,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#070f17] flex items-center justify-center">
        <span className="w-10 h-10 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (!auth?.isAdmin) {
    return (
      <LoginForm
        onLogin={() => {
          qc.invalidateQueries({ queryKey: ["/api/admin/me"] });
          qc.invalidateQueries({ queryKey: ["/api/admin/settings"] });
        }}
      />
    );
  }

  return (
    <Dashboard
      onLogout={() => {
        qc.invalidateQueries({ queryKey: ["/api/admin/me"] });
        qc.removeQueries({ queryKey: ["/api/admin/settings"] });
      }}
    />
  );
}
