import { Button } from "@/components/ui/button";
import { CheckCircle2, PhoneCall, ShieldCheck, TrendingUp, ArrowRight, Play } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative pt-40 pb-32 lg:pt-56 lg:pb-48 overflow-hidden bg-[#0B3C5D]" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 90%, 0% 100%)' }}>
      {/* Video Background with overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[#0B3C5D]/60 mix-blend-multiply z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B3C5D] via-[#0B3C5D]/80 to-transparent z-10" />
        {/* Abstract pattern overlay for industrial feel */}
        <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9IiNmZmYiLz48L3N2Zz4=')] z-10" />
        
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          poster="/src/assets/images/hero-truck.jpg"
          className="w-full h-full object-cover"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-semi-truck-driving-along-a-highway-42750-large.mp4" type="video/mp4" />
          <img src="/src/assets/images/hero-truck.jpg" alt="Semi truck" className="w-full h-full object-cover" />
        </video>
      </div>

      {/* FreezPak inspired angled accent line */}
      <div className="absolute bottom-0 left-0 w-full h-4 bg-primary z-20" style={{ transform: 'skewY(-3deg)', transformOrigin: 'bottom left', bottom: '-20px' }}></div>

      <div className="container relative z-20 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-8 items-center">
          <div className="w-full lg:w-[55%]">
            <div className="inline-flex items-center gap-3 px-6 py-2 mb-8 bg-primary text-white font-display font-bold text-lg tracking-[0.2em] uppercase transform -skew-x-12 shadow-[5px_5px_0px_0px_rgba(0,0,0,0.3)]">
              <span className="transform skew-x-12 block">Premium Logistics</span>
            </div>
            
            <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-black text-white leading-[0.95] mb-6 sm:mb-8 tracking-tighter uppercase drop-shadow-xl">
              WE KEEP YOUR TRUCK <br />
              <span className="text-primary block mt-2 drop-shadow-2xl">MOVING & EARNING.</span>
            </h1>
            
            <p className="text-base sm:text-xl md:text-2xl text-white mb-8 sm:mb-12 max-w-2xl font-sans border-l-4 sm:border-l-8 border-primary pl-4 sm:pl-6 bg-black/40 p-4 sm:p-6 backdrop-blur-md shadow-lg">
              Stop fighting with brokers. Our dedicated dispatchers negotiate the highest rates and handle the paperwork so you can focus on the road.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-12 sm:mb-16">
              <Button size="lg" className="text-base sm:text-xl px-6 py-6 sm:px-10 sm:py-8 bg-primary text-white hover:bg-white hover:text-[#0B3C5D] rounded-none transition-all duration-300 font-display font-bold tracking-widest uppercase group shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,0.5)] hover:shadow-none hover:translate-y-1 hover:translate-x-1" onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}>
                Check Eligibility
                <ArrowRight className="ml-2 sm:ml-3 w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-2 transition-transform" />
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:gap-6 pt-8 sm:pt-10 border-t-2 border-white/20 max-w-xl">
              {[
                { icon: ShieldCheck, text: "Dedicated Agent" },
                { icon: TrendingUp, text: "Top Tier Rates" },
                { icon: PhoneCall, text: "24/7 Support" },
                { icon: CheckCircle2, text: "No Forced Dispatch" },
              ].map((badge, i) => (
                <div key={i} className="flex items-center gap-3 sm:gap-4 text-white group cursor-default">
                  <div className="p-2 sm:p-3 bg-primary/20 backdrop-blur-sm border-2 border-primary/50 group-hover:bg-primary transition-colors duration-300 transform -skew-x-6">
                    <badge.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary group-hover:text-white shrink-0 transform skew-x-6 transition-colors duration-300" />
                  </div>
                  <span className="text-sm sm:text-base font-display font-bold uppercase tracking-wider leading-tight">{badge.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full lg:w-[45%] hidden lg:block">
            <div className="flex flex-col items-center text-center mt-4">
              <div className="inline-flex items-center px-4 py-1 mb-6 bg-[#F97316] text-white font-display font-bold text-xs tracking-widest uppercase transform -skew-x-12">
                <span className="transform skew-x-12 block">See Inside</span>
              </div>
              <h2 className="text-2xl lg:text-3xl xl:text-5xl font-black text-white mb-4 uppercase tracking-tighter leading-tight drop-shadow-md">
                Watch How We <span className="text-[#F97316]">Scale</span> Your Business
              </h2>
              <p className="text-sm lg:text-base text-gray-200 font-sans px-2 mb-8 max-w-md">
                Take 90 seconds to see exactly how our dedicated dispatchers operate to keep your trucks moving and your revenue growing.
              </p>
              
              {/* Integrated Video Component on the right side */}
              <div className="relative w-full max-w-lg bg-black aspect-video shadow-[0_0_50px_rgba(0,0,0,0.5)] border-2 border-black group cursor-pointer overflow-hidden transform hover:scale-[1.02] transition-transform duration-500" onClick={() => document.getElementById('video-section')?.scrollIntoView({ behavior: 'smooth' })}>
                <img 
                  src="/src/assets/images/hero-truck.jpg" 
                  alt="Video thumbnail" 
                  className="absolute inset-0 w-full h-full object-cover opacity-80 filter grayscale contrast-125 transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 transition-opacity duration-300 group-hover:opacity-0"></div>
                
                {/* Central Play Button */}
                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <div className="w-16 h-16 xl:w-20 xl:h-20 bg-[#F97316] text-white flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110">
                    <Play className="w-8 h-8 xl:w-10 xl:h-10 ml-1 fill-current" />
                  </div>
                </div>
                
                <div className="absolute bottom-4 left-4 xl:bottom-6 xl:left-6 bg-[#F97316] px-4 py-2 xl:px-5 xl:py-2.5 text-white font-bold uppercase tracking-[0.1em] text-[10px] xl:text-xs z-20">
                  Explainer Video Placeholder
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
