import { Play } from "lucide-react";

export default function VideoSection() {
  return (
    <section className="py-32 bg-[#0B3C5D] relative overflow-hidden border-y-8 border-primary" id="video-section">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9IiNmZmYiLz48L3N2Zz4=')] z-0" />
      <div className="absolute -left-40 -top-40 w-96 h-96 bg-primary/20 rounded-full blur-3xl"></div>
      <div className="absolute -right-40 -bottom-40 w-96 h-96 bg-primary/20 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-3 px-4 py-1 mb-4 sm:mb-6 bg-primary text-white font-display font-bold text-xs sm:text-sm tracking-widest uppercase transform -skew-x-12">
            <span className="transform skew-x-12 block">See Inside</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-white mb-4 sm:mb-6 uppercase tracking-tighter leading-tight">
            Watch How We <span className="text-primary block sm:inline mt-1 sm:mt-0">Scale</span> Your Business
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 font-sans px-2 sm:px-0">
            Take 90 seconds to see exactly how our dedicated dispatchers operate to keep your trucks moving and your revenue growing.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Video Placeholder - Industrial styling matching the image exactly */}
          <div className="relative bg-black aspect-video shadow-[0_0_30px_rgba(0,0,0,0.5)] sm:shadow-[0_0_50px_rgba(0,0,0,0.5)] border-2 sm:border-4 border-black group cursor-pointer overflow-hidden">
            <img 
              src="/src/assets/images/hero-truck.jpg" 
              alt="Video thumbnail" 
              className="absolute inset-0 w-full h-full object-cover opacity-80 filter grayscale contrast-125 transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/20 transition-opacity duration-300 group-hover:opacity-0"></div>
            
            {/* Play Button - exact style from the screenshot */}
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <div className="w-20 h-20 sm:w-28 sm:h-28 bg-[#F97316] text-white flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110">
                <Play className="w-8 h-8 sm:w-12 sm:h-12 ml-1 sm:ml-2 fill-current" />
              </div>
            </div>
            
            {/* Orange placeholder badge exactly like screenshot */}
            <div className="absolute bottom-4 left-4 sm:bottom-8 sm:left-8 bg-[#F97316] px-4 py-2 sm:px-6 sm:py-3 text-white font-bold uppercase tracking-[0.1em] text-xs sm:text-sm z-20">
              Explainer Video Placeholder
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
