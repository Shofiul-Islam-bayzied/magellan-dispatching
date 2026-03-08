import { Button } from "@/components/ui/button";
import { CheckCircle2, PhoneCall, ShieldCheck, TrendingUp, ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Video Background with overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-secondary/80 mix-blend-multiply z-10" />
        {/* Gradient fade to match the next section's background */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
        
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          poster="/src/assets/images/hero-truck.jpg"
          className="w-full h-full object-cover scale-105"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-semi-truck-driving-along-a-highway-42750-large.mp4" type="video/mp4" />
          {/* Fallback to image if video isn't available/supported */}
          <img src="/src/assets/images/hero-truck.jpg" alt="Semi truck" className="w-full h-full object-cover" />
        </video>
      </div>

      <div className="container relative z-20 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <div className="inline-block px-4 py-1.5 mb-6 rounded-sm border border-primary/50 bg-primary/10 backdrop-blur-md">
            <span className="text-primary font-bold tracking-wider text-sm uppercase">Premium Dispatch Services</span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.05] mb-6 tracking-tight uppercase">
            Get a Dedicated Dispatcher & <br />
            <span className="text-primary">Higher Paying Loads.</span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-gray-200 mb-10 max-w-2xl font-sans border-l-4 border-primary pl-6">
            Stop searching load boards and doing paperwork. We find the best rates, negotiate for you, and keep your truck moving so you can focus on driving.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <Button size="lg" className="text-lg px-8 py-7 rounded-sm shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:shadow-[0_0_30px_rgba(249,115,22,0.5)] transition-all font-bold group" onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}>
              Check Eligibility
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-7 rounded-sm bg-white/5 text-white border-white/20 hover:bg-white/10 backdrop-blur-md font-bold" onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}>
              See How It Works
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-white/10">
            {[
              { icon: ShieldCheck, text: "Dedicated Dispatcher" },
              { icon: TrendingUp, text: "No Forced Dispatch" },
              { icon: PhoneCall, text: "24/7 Driver Support" },
              { icon: CheckCircle2, text: "Keep More Revenue" },
            ].map((badge, i) => (
              <div key={i} className="flex items-center gap-3 text-white/90">
                <badge.icon className="w-6 h-6 text-primary shrink-0" />
                <span className="text-sm font-bold uppercase tracking-wide">{badge.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
