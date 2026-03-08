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
    <section className="py-24 bg-white" id="how-it-works">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto mb-20">
          <div className="inline-flex items-center gap-3 px-4 py-1 mb-6 bg-gray-100 text-[#0B3C5D] font-display font-bold text-sm tracking-widest uppercase transform -skew-x-12">
            <span className="transform skew-x-12 block">Onboarding</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-foreground mb-6 uppercase tracking-tighter">
            SIMPLE <span className="text-primary">3-STEP</span> PROCESS
          </h2>
          <p className="text-xl text-muted-foreground font-sans max-w-2xl mx-auto">
            Getting started is fast and easy. We can have you onboarded and running your first high-paying load within 24 hours.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Connecting line for desktop */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2 z-0"></div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
            {steps.map((step, i) => (
              <div key={i} className="flex flex-col items-center text-center group">
                <div className="w-24 h-24 bg-white text-[#0B3C5D] flex items-center justify-center text-4xl font-black mb-8 border-4 border-gray-200 group-hover:border-primary group-hover:text-primary transition-colors duration-300 transform -skew-x-12">
                  <span className="transform skew-x-12">{step.number}</span>
                </div>
                <h3 className="text-2xl font-black text-foreground mb-4 uppercase tracking-tight">{step.title}</h3>
                <p className="text-muted-foreground font-sans text-lg leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 text-center">
          <button 
            onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-[#0B3C5D] text-white px-10 py-5 font-display font-bold text-xl uppercase tracking-widest hover:bg-primary transition-colors duration-300 shadow-[8px_8px_0px_0px_rgba(249,115,22,1)] hover:shadow-none hover:translate-y-2 hover:translate-x-2"
          >
            Start Step 1 Now
          </button>
        </div>
      </div>
    </section>
  );
}
