import { fbTrack, gaTrack } from "@/lib/fbtrack";

export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Apply & Check",
      description: "Fill out our quick form to see if your trucking operation qualifies for our dedicated dispatch services."
    },
    {
      number: "02",
      title: "Consultation",
      description: "We'll hop on a quick call to understand your preferred lanes, home time needs, and revenue goals."
    },
    {
      number: "03",
      title: "Earn More",
      description: "Once onboarded, we immediately start sourcing premium freight and handling your paperwork."
    }
  ];

  return (
    <section className="py-20 lg:py-28 bg-white" id="how-it-works">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-3 px-4 py-1 mb-6 bg-[#0B3C5D] text-white font-display font-bold text-sm tracking-widest uppercase transform -skew-x-12">
            <span className="transform skew-x-12 block">Onboarding</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground mb-4 sm:mb-6 uppercase tracking-tighter leading-tight">
            SIMPLE <span className="text-primary">3-STEP</span> PROCESS
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground font-sans max-w-2xl mx-auto leading-relaxed">
            Getting started is fast and easy. We can have you onboarded and running your first high-paying load within 24 hours.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Connecting line for desktop */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2 z-0"></div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-10 lg:gap-12 relative z-10">
            {steps.map((step, i) => (
              <div key={i} className="flex flex-col items-center text-center group bg-white sm:bg-transparent p-6 sm:p-0 border border-gray-100 sm:border-none shadow-sm sm:shadow-none">
                <div className="w-16 h-16 sm:w-24 sm:h-24 bg-white text-[#0B3C5D] flex items-center justify-center text-2xl sm:text-4xl font-black mb-6 sm:mb-8 border-2 sm:border-4 border-gray-200 group-hover:border-primary group-hover:text-primary transition-colors duration-300 transform -skew-x-12">
                  <span className="transform skew-x-12">{step.number}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-foreground mb-3 sm:mb-4 uppercase tracking-tight">{step.title}</h3>
                <p className="text-base sm:text-lg text-muted-foreground font-sans leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 sm:mt-20 text-center">
          <button
            onClick={() => {
              fbTrack("Lead", { content_name: "HowItWorks CTA" });
              gaTrack("generate_lead", { method: "HowItWorks CTA" });
              window.location.href = "/get-started";
            }}
            className="bg-primary text-white px-8 py-4 sm:px-10 sm:py-5 font-display font-bold text-lg sm:text-xl uppercase tracking-widest hover:bg-[#0B3C5D] transition-colors duration-300 shadow-[4px_4px_0_0_rgba(0,0,0,0.3)] hover:shadow-none hover:translate-y-1 hover:translate-x-1"
          >
            Book a Free Call
          </button>
        </div>
      </div>
    </section>
  );
}
