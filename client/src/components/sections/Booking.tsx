import { useEffect } from "react";
import { Calendar, CheckCircle2 } from "lucide-react";

// Hardcoded — no API dependency, works immediately on page load.
const CALENDLY_URL =
  "https://calendly.com/team-magellandispatching/30min?hide_event_type_details=1&hide_gdpr_banner=1&primary_color=F97316";

export default function Booking() {
  useEffect(() => {
    function initWidget() {
      const container = document.getElementById("calendly-widget");
      if (!container) return;
      const Cal = (window as any).Calendly;
      if (Cal?.initInlineWidget) {
        // Clear any stale iframe before re-initialising
        container.innerHTML = "";
        Cal.initInlineWidget({ url: CALENDLY_URL, parentElement: container });
      }
    }

    if ((window as any).Calendly) {
      // Script already loaded (browser cache) — init immediately
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
      // Works whether script is still loading or was already injected
      script.addEventListener("load", initWidget, { once: true });
      const scriptRef = script;
      return () => scriptRef.removeEventListener("load", initWidget);
    }
  }, []);

  return (
    <section className="py-20 lg:py-28 bg-white relative overflow-hidden" id="booking">
      {/* Background industrial pattern */}
      <div className="absolute right-0 top-0 w-1/2 h-full bg-[#f8f9fa] z-0 hidden lg:block"></div>
      <div className="absolute top-0 right-0 w-64 h-full bg-primary/5 transform skew-x-12 z-0 hidden lg:block"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start max-w-7xl mx-auto">

          <div className="w-full lg:w-5/12 pt-4 sm:pt-10">
            <div className="inline-flex items-center gap-3 px-4 py-1 mb-6 sm:mb-8 bg-[#0B3C5D] text-white font-display font-bold text-xs sm:text-sm tracking-widest uppercase transform -skew-x-12">
              <span className="transform skew-x-12 block">Get Started</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#2F2F2F] mb-6 sm:mb-8 uppercase tracking-tighter leading-[0.95] sm:leading-[0.9]">
              READY TO MAXIMIZE <span className="text-primary block mt-1 sm:mt-2">YOUR REVENUE?</span>
            </h2>

            <p className="text-lg sm:text-xl text-gray-600 font-sans mb-8 sm:mb-12 leading-relaxed border-l-4 border-primary pl-4 sm:pl-6">
              Schedule a quick 30-minute onboarding call with our dispatch specialists. We'll discuss your lanes, your goals, and show you exactly how much money you're leaving on the table.
            </p>

            {/* Mobile scroll hint */}
            <div className="lg:hidden flex items-start gap-3 mb-8 bg-primary/10 border-l-4 border-primary px-4 py-3">
              <span className="text-primary text-lg leading-none mt-0.5">👉</span>
              <p className="text-sm font-bold text-[#2F2F2F] uppercase tracking-wide leading-snug">
                Scroll down to select a time from the calendar below.
              </p>
            </div>

            <div className="space-y-4 sm:space-y-6 mb-10 sm:mb-12">
              {[
                "No commitment or upfront fees",
                "Find out if your truck qualifies",
                "Learn about our premium freight network",
                "Get set up to run within 24 hours"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 sm:gap-4 bg-gray-50 p-3 sm:p-4 border-l-2 border-primary">
                  <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-primary shrink-0" />
                  <span className="font-bold text-[#2F2F2F] uppercase tracking-wide text-sm sm:text-base">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full lg:w-7/12 bg-white rounded-none shadow-[0_20px_50px_rgba(0,0,0,0.1)] border-4 border-[#0B3C5D] min-h-[580px] sm:min-h-[700px] relative">
            <div className="absolute top-0 left-0 right-0 h-4 bg-primary z-10"></div>

            {/* Calendly inline widget — standard data-url approach */}
            <div
              id="calendly-widget"
              className="calendly-inline-widget w-full mt-4"
              data-url={CALENDLY_URL}
              style={{ minWidth: "280px", height: "660px" }}
            />

            {/* Fallback shown behind the widget while it loads */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center -z-10 bg-gray-50">
              <div className="text-center p-8">
                <div className="w-20 h-20 bg-gray-200 flex items-center justify-center mx-auto mb-6 transform -skew-x-12">
                  <Calendar className="w-10 h-10 text-gray-400 transform skew-x-12" />
                </div>
                <p className="text-gray-500 font-display font-black uppercase tracking-widest text-xl">Loading Calendar...</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
