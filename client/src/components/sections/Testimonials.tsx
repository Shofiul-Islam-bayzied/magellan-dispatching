import { Star } from "lucide-react";

export default function Testimonials() {
  const reviews = [
    {
      name: "Marcus T.",
      role: "Owner-Operator (Reefer)",
      content: "I was about to sell my truck before I found these guys. Now I'm netting $2k more a week and I actually get to see my family on the weekends. Best decision I ever made.",
      rating: 5
    },
    {
      name: "David R.",
      role: "Fleet Owner (3 Trucks)",
      content: "Having a dedicated dispatcher who actually fights for my rates changed everything. They handle all the annoying paperwork so I can just focus on expanding my fleet.",
      rating: 5
    },
    {
      name: "Sarah M.",
      role: "Independent Driver (Flatbed)",
      content: "No forced dispatch is real here. If I don't like a load, we don't take it. But honestly, the freight they find is so good I rarely ever turn it down. Highly recommended.",
      rating: 5
    }
  ];

  return (
    <section className="py-24 bg-gray-100 text-foreground border-y border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto mb-20">
          <div className="inline-flex items-center gap-3 px-4 py-1 mb-6 bg-[#0B3C5D] text-white font-display font-bold text-sm tracking-widest uppercase transform -skew-x-12">
            <span className="transform skew-x-12 block">Proven Results</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black mb-6 uppercase tracking-tighter">
            Drivers Are Making <span className="text-primary block md:inline mt-2 md:mt-0">More Money</span>
          </h2>
          <p className="text-xl text-gray-600 font-sans max-w-2xl mx-auto">
            Don't just take our word for it. Here's what other independent drivers and fleet owners have to say about partnering with us.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, i) => (
            <div key={i} className="bg-white border-t-4 border-primary p-8 shadow-xl relative group hover:-translate-y-2 transition-transform duration-300">
              <div className="flex text-primary mb-6">
                {[...Array(review.rating)].map((_, j) => (
                  <Star key={j} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <p className="text-lg font-sans text-gray-700 mb-8 italic leading-relaxed">"{review.content}"</p>
              <div className="border-t border-gray-100 pt-6 mt-auto">
                <p className="font-black text-xl uppercase tracking-wider text-[#0B3C5D]">{review.name}</p>
                <p className="text-sm text-primary font-bold uppercase tracking-widest mt-1">{review.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
