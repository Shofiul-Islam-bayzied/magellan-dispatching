import { useEffect } from "react";
import { ArrowRight, Calendar, CheckCircle2 } from "lucide-react";

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
      // Cleanup if needed
    };
  }, []);

  return (
    <section className="py-32 bg-white relative overflow-hidden" id="booking">
      {/* Background industrial pattern */}
      <div className="absolute right-0 top-0 w-1/2 h-full bg-[#f8f9fa] z-0 hidden lg:block"></div>
      <div className="absolute top-0 right-0 w-64 h-full bg-primary/5 transform skew-x-12 z-0 hidden lg:block"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-20 items-start max-w-7xl mx-auto">
          
          <div className="w-full lg:w-5/12 pt-10">
            <div className="inline-flex items-center gap-3 px-4 py-1 mb-8 bg-[#0B3C5D] text-white font-display font-bold text-sm tracking-widest uppercase transform -skew-x-12">
              <span className="transform skew-x-12 block">Get Started</span>
            </div>
            
            <h2 className="text-5xl md:text-6xl font-black text-[#2F2F2F] mb-8 uppercase tracking-tighter leading-[0.9]">
              READY TO MAXIMIZE <span className="text-primary block mt-2">YOUR REVENUE?</span>
            </h2>
            
            <p className="text-xl text-gray-600 font-sans mb-12 leading-relaxed border-l-4 border-primary pl-6">
              Schedule a quick 15-minute onboarding call with our dispatch specialists. We'll discuss your lanes, your goals, and show you exactly how much money you're leaving on the table.
            </p>

            <div className="space-y-6 mb-12">
              {[
                "No commitment or upfront fees",
                "Find out if your truck qualifies",
                "Learn about our premium freight network",
                "Get set up to run within 24 hours"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 bg-gray-50 p-4 border-l-2 border-primary">
                  <CheckCircle2 className="w-6 h-6 text-primary shrink-0" />
                  <span className="font-bold text-[#2F2F2F] uppercase tracking-wide">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full lg:w-7/12 bg-white rounded-none shadow-[0_20px_50px_rgba(0,0,0,0.1)] border-4 border-[#0B3C5D] min-h-[700px] relative">
            <div className="absolute top-0 left-0 right-0 h-4 bg-primary z-10"></div>
            
            {/* Calendly inline widget begin */}
            <div 
              className="calendly-inline-widget w-full mt-4" 
              data-url="https://calendly.com/your-calendly-link/dispatch-consultation?hide_event_type_details=1&hide_gdpr_banner=1&primary_color=F97316" 
              style={{ minWidth: '320px', height: '700px' }}
            ></div>
            
            {/* Fallback overlay in mockup mode just so it looks good if widget fails to load */}
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
