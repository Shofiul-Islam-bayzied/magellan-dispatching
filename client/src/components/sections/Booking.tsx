import { useEffect } from "react";

export default function Booking() {
  // Load Calendly widget script
  useEffect(() => {
    const head = document.querySelector("head");
    const script = document.createElement("script");
    script.setAttribute(
      "src",
      "https://assets.calendly.com/assets/external/widget.js"
    );
    head?.appendChild(script);

    return () => {
      // Cleanup if needed, though usually safe to leave
    };
  }, []);

  return (
    <section className="py-24 bg-gray-50 border-t border-gray-200" id="booking">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Check Eligibility & Schedule a Call
          </h2>
          <p className="text-lg text-muted-foreground font-sans">
            Pick a time that works best for you. Let's discuss your operation and see how much more revenue you could be making.
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 min-h-[700px]">
          {/* Calendly inline widget begin */}
          <div 
            className="calendly-inline-widget" 
            data-url="https://calendly.com/your-calendly-link/dispatch-consultation?hide_event_type_details=1&hide_gdpr_banner=1&primary_color=F97316" 
            style={{ minWidth: '320px', height: '700px' }}
          ></div>
          {/* If there's an issue loading Calendly locally in mockup, provide a fallback UI to indicate intent */}
          <div className="absolute opacity-0 -z-10 pointer-events-none">
             Note: Calendly embed goes here. Using a placeholder link in data-url.
          </div>
        </div>
      </div>
    </section>
  );
}
