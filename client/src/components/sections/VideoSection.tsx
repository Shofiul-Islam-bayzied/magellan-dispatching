import { PlayCircle } from "lucide-react";

export default function VideoSection() {
  return (
    <section className="py-24 bg-white relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            See How We Change Your Business
          </h2>
          <p className="text-lg text-muted-foreground font-sans">
            Watch this quick 90-second video to understand exactly how our dispatchers work relentlessly to keep your trucks moving and your profits high.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Video Placeholder */}
          <div className="relative rounded-2xl overflow-hidden bg-gray-900 aspect-video md:aspect-[21/9] shadow-2xl flex items-center justify-center group cursor-pointer border border-gray-200">
            {/* When real video is ready, replace this with iframe/video tag */}
            <img 
              src="/src/assets/images/hero-truck.jpg" 
              alt="Video thumbnail" 
              className="absolute inset-0 w-full h-full object-cover opacity-50 transition-opacity group-hover:opacity-40"
            />
            <div className="relative z-10 w-20 h-20 rounded-full bg-primary text-white flex items-center justify-center transform transition-transform group-hover:scale-110 shadow-xl shadow-primary/30">
              <PlayCircle className="w-10 h-10 ml-1" />
            </div>
            <div className="absolute bottom-6 left-0 right-0 text-center z-10">
              <span className="bg-black/60 text-white px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm">
                Explainer Video (Coming Soon)
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
