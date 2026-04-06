import { useEffect } from "react";
import { Calendar } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Analytics from "@/components/Analytics";
import { fbTrack, gaTrack, clarityEvent } from "@/lib/fbtrack";
import { useScrollDepth } from "@/lib/useScrollDepth";
import type { PublicSettings } from "@shared/schema";

const CALENDLY_URL =
  "https://calendly.com/team-magellandispatching/30min?hide_event_type_details=1&hide_gdpr_banner=1&primary_color=F97316";

export default function Schedule() {
  useScrollDepth("Schedule");

  const { data: settings } = useQuery<PublicSettings>({
    queryKey: ["/api/public/settings"],
    staleTime: 5 * 60 * 1000,
  });

  // ViewContent — user landed on scheduling page
  useEffect(() => {
    fbTrack("ViewContent", {
      content_name: "Schedule a Call – Calendly",
      content_category: "Booking",
    });
    gaTrack("view_item", { item_name: "Schedule Page" });
    clarityEvent("schedule_page_view");
  }, []);

  // Load Calendly inline widget
  useEffect(() => {
    function initWidget() {
      const container = document.getElementById("calendly-widget");
      if (!container) return;
      const Cal = (window as any).Calendly;
      if (Cal?.initInlineWidget) {
        container.innerHTML = "";
        Cal.initInlineWidget({ url: CALENDLY_URL, parentElement: container });
        // CalendlyLoaded — widget successfully initialised
        gaTrack("calendly_loaded");
        clarityEvent("calendly_loaded");
      }
    }

    if ((window as any).Calendly) {
      initWidget();
    } else {
      let script = document.getElementById("calendly-script") as HTMLScriptElement | null;
      if (!script) {
        script = document.createElement("script");
        script.id = "calendly-script";
        script.src = "https://assets.calendly.com/assets/external/widget.js";
        script.async = true;
        document.head.appendChild(script);
      }
      script.addEventListener("load", initWidget, { once: true });
      const scriptRef = script;
      return () => scriptRef.removeEventListener("load", initWidget);
    }
  }, []);

  // Calendly booking completion — fires only on this page
  useEffect(() => {
    function handleCalendly(e: MessageEvent) {
      if (e.data?.event !== "calendly.event_scheduled") return;

      const payload = e.data?.payload ?? {};
      const inviteeUri: string = payload?.invitee?.uri ?? "";
      const eventUri: string = payload?.event?.uri ?? "";

      // Google Analytics 4
      const gtag = (window as any).gtag;
      if (typeof gtag === "function") {
        gtag("event", "schedule", {
          content_type: "dispatch_consultation",
          item_id: eventUri || "calendly_booking",
        });
        gtag("event", "conversion", {
          send_to: settings?.analytics?.ga4MeasurementId,
          event_category: "booking",
          event_label: "Calendly Booking Completed",
        });
      }

      // GTM dataLayer
      const dataLayer = (window as any).dataLayer;
      if (Array.isArray(dataLayer)) {
        dataLayer.push({
          event: "calendly_booking_completed",
          booking_source: "Calendly",
          invitee_uri: inviteeUri,
          event_uri: eventUri,
        });
      }

      // Facebook Pixel — Schedule & CompleteRegistration only
      // Lead was already fired on the lead form page (or captured via FB Instant Form)
      const fbq = (window as any).fbq;
      if (typeof fbq === "function") {
        fbq("track", "Schedule");
        fbq("track", "CompleteRegistration", {
          content_name: "Dispatch Consultation",
          status: "booked",
        });
      }

      // Microsoft Clarity
      const clarity = (window as any).clarity;
      if (typeof clarity === "function") {
        clarity("event", "calendly_booking_completed");
        clarity("set", "booking_status", "completed");
      }

      if (import.meta.env.DEV) {
        console.log("[Analytics] Calendly booking tracked", { inviteeUri, eventUri });
      }
    }

    window.addEventListener("message", handleCalendly);
    return () => window.removeEventListener("message", handleCalendly);
  }, [settings?.analytics?.ga4MeasurementId]);

  return (
    <div className="min-h-screen bg-background">
      <Analytics />
      <Navbar />
      <main>
        {/* Header */}
        <section className="pt-28 sm:pt-36 pb-10 bg-[#0B3C5D] relative overflow-hidden">
          <div className="absolute inset-0 opacity-5"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)",
              backgroundSize: "20px 20px",
            }}
          />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <div className="inline-flex items-center gap-3 px-4 py-1 mb-6 bg-primary text-white font-bold text-xs tracking-widest uppercase transform -skew-x-12">
              <span className="transform skew-x-12 block">Almost There</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white uppercase tracking-tighter leading-[0.9] mb-4">
              PICK YOUR <span className="text-primary">TIME SLOT</span>
            </h1>
            <p className="text-base sm:text-lg text-white/70 max-w-xl mx-auto font-sans leading-relaxed">
              You're one step away. Choose a time and our dispatch specialists will show you exactly how to maximize your revenue in 30 minutes.
            </p>
          </div>
        </section>

        {/* Calendly Widget */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white shadow-[0_20px_50px_rgba(0,0,0,0.12)] border-4 border-[#0B3C5D] relative">
              <div className="absolute top-0 left-0 right-0 h-4 bg-primary z-10" />
              <div
                id="calendly-widget"
                className="calendly-inline-widget w-full mt-4"
                data-url={CALENDLY_URL}
                style={{ minWidth: "280px", height: "700px" }}
              />
              {/* Fallback behind the iframe */}
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center -z-10 bg-gray-50">
                <div className="text-center p-8">
                  <div className="w-20 h-20 bg-gray-200 flex items-center justify-center mx-auto mb-6 transform -skew-x-12">
                    <Calendar className="w-10 h-10 text-gray-400 transform skew-x-12" />
                  </div>
                  <p className="text-gray-500 font-display font-black uppercase tracking-widest text-xl">
                    Loading Calendar...
                  </p>
                </div>
              </div>
            </div>

            {/* Trust note */}
            <p className="text-center text-sm text-gray-400 font-medium mt-6">
              🔒 Secure booking powered by Calendly. No payment required.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
