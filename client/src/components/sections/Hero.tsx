import { Button } from "@/components/ui/button";
import { CheckCircle2, PhoneCall, ShieldCheck, TrendingUp } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-secondary/90 mix-blend-multiply z-10" />
        <img 
          src="/src/assets/images/hero-truck.jpg" 
          alt="Semi truck on highway" 
          className="w-full h-full object-cover"
        />
      </div>

      <div className="container relative z-20 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
            Get a Dedicated Dispatcher and <span className="text-primary">Higher Paying Loads</span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-gray-200 mb-10 max-w-2xl font-sans">
            Stop searching load boards and doing paperwork. We find the best rates, negotiate for you, and keep your truck moving so you can focus on driving.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Button size="lg" className="text-lg px-8 py-6 rounded-md shadow-lg hover:shadow-xl transition-all" onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}>
              Check Eligibility
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 rounded-md bg-white/10 text-white border-white/20 hover:bg-white/20 backdrop-blur-sm" onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}>
              See How It Works
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-white/10">
            {[
              { icon: ShieldCheck, text: "Dedicated Dispatcher" },
              { icon: TrendingUp, text: "No Forced Dispatch" },
              { icon: PhoneCall, text: "24/7 Driver Support" },
              { icon: CheckCircle2, text: "Keep More Revenue" },
            ].map((badge, i) => (
              <div key={i} className="flex items-center gap-2 text-white/90">
                <badge.icon className="w-5 h-5 text-primary shrink-0" />
                <span className="text-sm font-medium">{badge.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
