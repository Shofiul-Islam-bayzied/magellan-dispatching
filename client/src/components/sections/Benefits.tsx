import { Check } from "lucide-react";

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
    <section className="py-24 bg-secondary text-white relative overflow-hidden">
      {/* Decorative abstract shape */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 opacity-10 pointer-events-none">
        <svg width="800" height="800" viewBox="0 0 800 800" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="400" cy="400" r="400" fill="currentColor"/>
        </svg>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="w-full lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Why Drivers Choose Us
            </h2>
            <p className="text-lg text-gray-300 mb-10 font-sans">
              We aren't just finding loads; we're building a profitable business together. Our success is directly tied to your success.
            </p>

            <ul className="space-y-4">
              {benefitsList.map((benefit, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-lg text-gray-200 font-sans">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="w-full lg:w-1/2">
            <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10 relative">
              <img 
                src="/src/assets/images/dispatcher.jpg" 
                alt="Professional dispatcher working" 
                className="w-full h-auto object-cover aspect-square"
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-secondary to-transparent pt-32 pb-8 px-8">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-xl text-white">
                  <h4 className="font-bold text-xl mb-2">Meet Your New Partner</h4>
                  <p className="text-sm text-gray-200 font-sans">Our dispatchers work strictly for you, acting as your personal agent in the freight market.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
