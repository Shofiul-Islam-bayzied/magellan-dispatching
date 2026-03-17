import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import type { PublicSettings } from "@shared/schema";

export default function Analytics() {
  const { data: settings } = useQuery<PublicSettings>({
    queryKey: ["/api/public/settings"],
    staleTime: 5 * 60 * 1000,
  });

  // Google Analytics 4
  useEffect(() => {
    const id = settings?.analytics?.ga4MeasurementId?.trim();
    if (!id) return;
    if (document.getElementById("ga4-script")) return;

    const script1 = document.createElement("script");
    script1.id = "ga4-script";
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
    document.head.appendChild(script1);

    const script2 = document.createElement("script");
    script2.id = "ga4-init";
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${id}');
    `;
    document.head.appendChild(script2);
  }, [settings?.analytics?.ga4MeasurementId]);

  // Facebook Meta Pixel
  useEffect(() => {
    const id = settings?.analytics?.facebookPixelId?.trim();
    if (!id) return;
    if (document.getElementById("fb-pixel")) return;

    const script = document.createElement("script");
    script.id = "fb-pixel";
    script.innerHTML = `
      !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
      n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
      document,'script','https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '${id}');
      fbq('track', 'PageView');
    `;
    document.head.appendChild(script);

    const noscript = document.createElement("noscript");
    noscript.id = "fb-pixel-noscript";
    noscript.innerHTML = `<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=${id}&ev=PageView&noscript=1"/>`;
    document.body.appendChild(noscript);
  }, [settings?.analytics?.facebookPixelId]);

  // Microsoft Clarity
  useEffect(() => {
    const id = settings?.analytics?.microsoftClarityId?.trim();
    if (!id) return;
    if (document.getElementById("ms-clarity")) return;

    const script = document.createElement("script");
    script.id = "ms-clarity";
    script.innerHTML = `
      (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
      })(window, document, "clarity", "script", "${id}");
    `;
    document.head.appendChild(script);
  }, [settings?.analytics?.microsoftClarityId]);

  // Calendly booking completion → fire all platforms
  useEffect(() => {
    function handleCalendly(e: MessageEvent) {
      if (e.data?.event !== "calendly.event_scheduled") return;

      const payload = e.data?.payload ?? {};
      const inviteeUri: string = payload?.invitee?.uri ?? "";
      const eventUri: string = payload?.event?.uri ?? "";

      // ── Google Analytics 4 ──────────────────────────────────────
      const gtag = (window as any).gtag;
      if (typeof gtag === "function") {
        // Primary conversion event
        gtag("event", "generate_lead", {
          event_category: "booking",
          event_label: "Calendly",
          method: "Calendly",
        });
        // Also push as a purchase-style conversion for ROAS tracking
        gtag("event", "conversion", {
          send_to: settings?.analytics?.ga4MeasurementId,
          event_category: "booking",
          event_label: "Calendly Booking Completed",
        });
        // Schedule event for GA4 recommended events
        gtag("event", "schedule", {
          content_type: "dispatch_consultation",
          item_id: eventUri || "calendly_booking",
        });
      }

      // ── Google Tag Manager dataLayer ────────────────────────────
      const dataLayer = (window as any).dataLayer;
      if (Array.isArray(dataLayer)) {
        dataLayer.push({
          event: "calendly_booking_completed",
          booking_source: "Calendly",
          invitee_uri: inviteeUri,
          event_uri: eventUri,
        });
      }

      // ── Meta / Facebook Pixel ───────────────────────────────────
      const fbq = (window as any).fbq;
      if (typeof fbq === "function") {
        fbq("track", "Schedule");
        fbq("track", "Lead", {
          content_name: "Dispatch Consultation Booking",
          content_category: "Calendly",
        });
        fbq("track", "CompleteRegistration", {
          content_name: "Dispatch Consultation",
          status: "booked",
        });
      }

      // ── Microsoft Clarity ───────────────────────────────────────
      const clarity = (window as any).clarity;
      if (typeof clarity === "function") {
        clarity("event", "calendly_booking_completed");
        clarity("set", "booking_status", "completed");
      }

      // ── Console confirmation (dev only) ─────────────────────────
      if (import.meta.env.DEV) {
        console.log("[Analytics] Calendly booking tracked across all platforms", { inviteeUri, eventUri });
      }
    }

    window.addEventListener("message", handleCalendly);
    return () => window.removeEventListener("message", handleCalendly);
  }, [settings?.analytics?.ga4MeasurementId]);

  // Custom head scripts
  useEffect(() => {
    const custom = settings?.analytics?.customHeadScripts?.trim();
    if (!custom) return;
    if (document.getElementById("custom-analytics")) return;

    const script = document.createElement("script");
    script.id = "custom-analytics";
    script.innerHTML = custom;
    document.head.appendChild(script);
  }, [settings?.analytics?.customHeadScripts]);

  return null;
}
