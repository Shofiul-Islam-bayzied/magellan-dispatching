export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Apply & Check Eligibility",
      description: "Fill out our quick form to see if your trucking operation qualifies for our dedicated dispatch services."
    },
    {
      number: "02",
      title: "Speak with our Dispatch Team",
      description: "We'll hop on a quick call to understand your preferred lanes, home time needs, and revenue goals."
    },
    {
      number: "03",
      title: "Start Receiving Better Loads",
      description: "Once onboarded, we immediately start sourcing premium freight and handling your paperwork."
    }
  ];

  return (
    <section className="py-24 bg-gray-50" id="how-it-works">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Simple 3-Step Process
          </h2>
          <p className="text-lg text-muted-foreground font-sans">
            Getting started is fast and easy. We can have you onboarded and running your first high-paying load within 24 hours.
          </p>
        </div>

        <div className="relative">
          {/* Connecting line for desktop */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2 z-0"></div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
            {steps.map((step, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-full bg-primary text-white flex items-center justify-center text-3xl font-black mb-6 shadow-lg border-4 border-white shadow-primary/20">
                  {step.number}
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">{step.title}</h3>
                <p className="text-muted-foreground font-sans leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 text-center">
          <button 
            onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-secondary text-white px-8 py-4 rounded-md font-bold text-lg hover:bg-secondary/90 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 transform"
          >
            Start Step 1 Now
          </button>
        </div>
      </div>
    </section>
  );
}
