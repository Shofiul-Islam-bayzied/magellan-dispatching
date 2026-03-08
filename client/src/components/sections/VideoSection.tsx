import { Play } from "lucide-react";

export default function VideoSection() {
  return (
    <section className="py-32 bg-[#0B3C5D] relative overflow-hidden border-y-8 border-primary">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9IiNmZmYiLz48L3N2Zz4=')] z-0" />
      <div className="absolute -left-40 -top-40 w-96 h-96 bg-primary/20 rounded-full blur-3xl"></div>
      <div className="absolute -right-40 -bottom-40 w-96 h-96 bg-primary/20 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-3 px-4 py-1 mb-6 bg-primary text-white font-display font-bold text-sm tracking-widest uppercase transform -skew-x-12">
            <span className="transform skew-x-12 block">See Inside</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tighter">
            Watch How We <span className="text-primary">Scale</span> Your Business
          </h2>
          <p className="text-xl text-gray-300 font-sans">
            Take 90 seconds to see exactly how our dedicated dispatchers operate to keep your trucks moving and your revenue growing.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Video Placeholder - Industrial styling */}
          <div className="relative bg-black aspect-video shadow-[0_0_50px_rgba(0,0,0,0.5)] border-4 border-white/10 group cursor-pointer overflow-hidden">
            <img 
              src="/src/assets/images/hero-truck.jpg" 
              alt="Video thumbnail" 
              className="absolute inset-0 w-full h-full object-cover opacity-60 filter grayscale contrast-125 transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-primary/20 mix-blend-multiply transition-opacity duration-300 group-hover:opacity-0"></div>
            
            {/* Play Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 bg-primary text-white flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110 shadow-[0_0_30px_rgba(249,115,22,0.5)]">
                <Play className="w-10 h-10 ml-2 fill-current" />
              </div>
            </div>
            
            <div className="absolute bottom-0 left-0 bg-primary px-6 py-3 text-white font-bold uppercase tracking-widest text-sm m-6">
              Explainer Video Placeholder
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
