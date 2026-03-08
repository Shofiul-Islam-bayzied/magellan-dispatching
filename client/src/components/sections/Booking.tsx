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
    <section className="py-24 bg-[#f8f9fa] border-t border-gray-200" id="booking">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16 items-start max-w-6xl mx-auto">
          
          <div className="w-full lg:w-5/12">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary font-bold text-sm uppercase tracking-wider rounded-sm mb-6 border border-primary/20">
              <Calendar className="w-4 h-4" />
              <span>Free Consultation</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-black text-[#2F2F2F] mb-6 uppercase tracking-tight leading-tight">
              Ready To Maximize Your <span className="text-primary">Revenue?</span>
            </h2>
            
            <p className="text-lg text-gray-600 font-sans mb-8 leading-relaxed">
              Schedule a quick 15-minute onboarding call with our dispatch specialists. We'll discuss your lanes, your goals, and show you exactly how much money you're leaving on the table.
            </p>

            <div className="space-y-4 mb-10">
              {[
                "No commitment or upfront fees",
                "Find out if your truck qualifies",
                "Learn about our premium freight network",
                "Get set up to run within 24 hours"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-primary shrink-0" />
                  <span className="font-bold text-[#2F2F2F]">{item}</span>
                </div>
              ))}
            </div>

            <div className="p-6 bg-white border-l-4 border-primary rounded-r-sm shadow-md">
              <p className="italic text-gray-600 font-sans mb-4">
                "I hesitated for months before booking a call. Within week one, I made $1,500 more than my usual average. Don't wait."
              </p>
              <p className="font-bold uppercase text-sm tracking-wider text-[#0B3C5D]">— Thomas G., Owner Operator</p>
            </div>
          </div>

          <div className="w-full lg:w-7/12 bg-white rounded-sm shadow-2xl overflow-hidden border border-gray-100 min-h-[700px] relative">
            <div className="absolute top-0 left-0 right-0 h-2 bg-primary z-10"></div>
            
            {/* Calendly inline widget begin */}
            <div 
              className="calendly-inline-widget w-full" 
              data-url="https://calendly.com/your-calendly-link/dispatch-consultation?hide_event_type_details=1&hide_gdpr_banner=1&primary_color=F97316" 
              style={{ minWidth: '320px', height: '700px' }}
            ></div>
            
            {/* Fallback overlay in mockup mode just so it looks good if widget fails to load */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center -z-10 bg-gray-50">
               <div className="text-center p-8">
                 <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                   <Calendar className="w-8 h-8 text-gray-400" />
                 </div>
                 <p className="text-gray-500 font-bold uppercase tracking-widest">Loading Calendar...</p>
               </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
