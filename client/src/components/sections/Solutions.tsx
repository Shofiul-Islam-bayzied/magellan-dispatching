import { Search, Map, ShieldCheck, FileCheck, DollarSign } from "lucide-react";
import { gaTrack } from "@/lib/fbtrack";

export default function Solutions() {
  const solutions = [
    {
      icon: Search,
      title: "Load Sourcing",
      description: "We constantly monitor boards and use our direct broker relationships to find premium freight."
    },
    {
      icon: DollarSign,
      title: "Rate Negotiation",
      description: "Our experienced dispatchers negotiate hard to get you the highest possible rate per mile."
    },
    {
      icon: ShieldCheck,
      title: "Broker Credit Checks",
      description: "We vet every broker to ensure you actually get paid for the work you do."
    },
    {
      icon: FileCheck,
      title: "Paperwork Management",
      description: "From setup packets to rate cons and invoicing, we handle the administrative burden."
    },
    {
      icon: Map,
      title: "Route Planning",
      description: "We plan efficient routes to minimize deadhead and keep your truck in high-paying zones."
    }
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#F8F9FA]" id="solution">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-3 px-4 py-1 mb-6 bg-[#0B3C5D] text-white font-display font-bold text-sm tracking-widest uppercase transform -skew-x-12">
            <span className="transform skew-x-12 block">What We Do</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground mb-4 sm:mb-6 uppercase tracking-tighter">
            Our Complete <span className="text-primary">Dispatch</span> Solution
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground font-sans max-w-2xl mx-auto leading-relaxed">
            We operate as your dedicated back-office team. You drive, we handle the rest. It's a partnership designed to maximize your revenue and minimize your stress.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-gray-200">
          {solutions.map((solution, i) => (
            <div key={i} className="group relative bg-white border-b border-r border-gray-200 p-6 sm:p-10 hover:bg-gray-50 transition-colors duration-300">
              <div className="absolute top-0 left-0 w-full h-1 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#0B3C5D] flex items-center justify-center mb-6 sm:mb-8 transform -skew-x-12 group-hover:bg-primary transition-colors duration-300">
                <solution.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white transform skew-x-12" />
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-foreground mb-3 sm:mb-4 uppercase tracking-tight">{solution.title}</h3>
              <p className="text-muted-foreground font-sans text-base sm:text-lg">{solution.description}</p>
            </div>
          ))}
          
          <div className="bg-[#0B3C5D] p-6 sm:p-10 text-white flex flex-col justify-center items-start border-b border-r border-[#0B3C5D] relative overflow-hidden group">
            <div className="absolute inset-0 bg-primary transform scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-bottom z-0"></div>
            <div className="relative z-10 w-full">
              <h3 className="text-2xl sm:text-3xl font-black mb-3 sm:mb-4 uppercase tracking-tighter">Ready to upgrade?</h3>
              <p className="text-sm sm:text-lg text-gray-300 mb-6 sm:mb-8 font-sans group-hover:text-white transition-colors">Stop leaving money on the table.</p>
              <button 
                onClick={() => {
                  gaTrack("cta_click", { location: "Solutions" });
                  window.location.href = "/get-started";
                }}
                className="bg-white text-[#0B3C5D] px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base font-display font-bold uppercase tracking-widest hover:bg-gray-100 transition-colors w-full text-center"
              >
                Book a Free Call
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
