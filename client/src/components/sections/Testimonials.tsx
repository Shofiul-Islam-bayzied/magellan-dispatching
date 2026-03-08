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
    <section className="py-24 bg-[#0B3C5D] text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-black mb-6 uppercase tracking-tight">
            Drivers Are Making <span className="text-primary">More Money</span> With Less Stress
          </h2>
          <p className="text-lg text-gray-300 font-sans">
            Don't just take our word for it. Here's what other independent drivers and fleet owners have to say about partnering with us.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, i) => (
            <div key={i} className="bg-white/5 border border-white/10 p-8 rounded-sm backdrop-blur-sm relative">
              <div className="flex text-primary mb-6">
                {[...Array(review.rating)].map((_, j) => (
                  <Star key={j} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <p className="text-lg font-sans text-gray-200 mb-8 italic">"{review.content}"</p>
              <div className="border-t border-white/10 pt-4 mt-auto">
                <p className="font-bold uppercase tracking-wider text-white">{review.name}</p>
                <p className="text-sm text-primary font-bold">{review.role}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <button 
            onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-primary text-white px-8 py-5 rounded-sm font-bold text-lg hover:bg-primary/90 transition-all shadow-[0_0_20px_rgba(249,115,22,0.4)] uppercase tracking-wide inline-flex items-center gap-2"
          >
            Ready to join them? Book your call now
          </button>
        </div>
      </div>
    </section>
  );
}
