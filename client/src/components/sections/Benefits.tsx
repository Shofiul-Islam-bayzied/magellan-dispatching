import { Check } from "lucide-react";
import dispatcherImg from "@/assets/images/dispatcher.webp";

export default function Benefits() {
  const benefitsList = [
    "Higher paying loads on average",
    "A dedicated dispatcher who knows your preferences",
    "Absolutely no forced dispatch - you are the boss",
    "All paperwork and administrative tasks handled",
    "Total focus on driving and safety",
    "24/7 support while you're on the road",
    "Consistent lanes and reliable freight",
    "Reduced deadhead miles"
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#0B3C5D] text-white relative overflow-hidden" id="benefits">
      {/* Decorative abstract shape */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 opacity-5 pointer-events-none">
        <svg width="800" height="800" viewBox="0 0 800 800" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="400" cy="400" r="400" fill="currentColor"/>
        </svg>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center">
          <div className="w-full lg:w-1/2">
            <div className="inline-flex items-center gap-3 px-4 py-1 mb-6 bg-primary text-white font-display font-bold text-sm tracking-widest uppercase transform -skew-x-12">
              <span className="transform skew-x-12 block">The Advantage</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4 sm:mb-6 text-white uppercase tracking-tighter leading-tight">
              Why Drivers <span className="text-primary">Choose Us</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 mb-8 sm:mb-10 font-sans">
              We aren't just finding loads; we're building a profitable business together. Our success is directly tied to your success.
            </p>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {benefitsList.map((benefit, i) => (
                <li key={i} className="flex items-start gap-3 bg-white/5 p-3 sm:p-4 border border-white/10 hover:border-primary/50 transition-colors">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-none bg-primary flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                  </div>
                  <span className="text-sm sm:text-base text-gray-200 font-bold uppercase tracking-wide leading-tight">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="w-full lg:w-1/2">
            <div className="rounded-none overflow-hidden shadow-[8px_8px_0_0_rgba(249,115,22,0.8)] border-4 border-white relative">
              <img
                src={dispatcherImg}
                alt="Happy truck driver standing in front of his truck — Magellan Dispatching owner-operator success story"
                loading="lazy"
                decoding="async"
                className="w-full h-auto object-cover aspect-square filter grayscale contrast-125"
              />
              <div className="absolute inset-0 bg-primary/20 mix-blend-multiply"></div>
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#0B3C5D] to-transparent pt-32 pb-8 px-8">
                <div className="bg-[#0B3C5D]/90 backdrop-blur-md border-l-4 border-primary p-6 text-white">
                  <h4 className="font-black text-2xl mb-2 uppercase tracking-tight">Meet Your Partner</h4>
                  <p className="text-base text-gray-300 font-sans">Our dispatchers work strictly for you, acting as your personal agent in the freight market.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
