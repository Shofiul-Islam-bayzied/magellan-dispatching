import { AlertCircle, Clock, FileText, Frown } from "lucide-react";

export default function Problems() {
  const problems = [
    {
      icon: Clock,
      title: "Wasting Hours on Load Boards",
      description: "Endlessly scrolling through DAT and Truckstop instead of resting or driving."
    },
    {
      icon: AlertCircle,
      title: "Brokers Offering Low Rates",
      description: "Fighting with brokers who try to undercut your value and take advantage."
    },
    {
      icon: FileText,
      title: "Drowning in Paperwork",
      description: "Dealing with rate cons, invoicing, and factoring when you just want to drive."
    },
    {
      icon: Frown,
      title: "No Time to Focus",
      description: "Trying to manage a business from the cab of a truck is stressful and inefficient."
    }
  ];

  return (
    <section className="py-24 bg-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="w-full lg:w-1/2">
            <div className="inline-flex items-center gap-3 px-4 py-1 mb-6 bg-[#0B3C5D] text-white font-display font-bold text-sm tracking-widest uppercase transform -skew-x-12">
              <span className="transform skew-x-12 block">The Problem</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-foreground mb-6 uppercase tracking-tighter leading-[1.1]">
              Sound Familiar? The Struggle of an <span className="text-primary">Independent Operator</span>
            </h2>
            <p className="text-xl text-gray-600 mb-10 font-sans border-l-4 border-gray-300 pl-4">
              You got into the trucking business for freedom and profit, but instead you're finding yourself acting as a full-time secretary, negotiator, and dispatcher.
            </p>

            <div className="grid gap-6">
              {problems.map((problem, i) => (
                <div key={i} className="flex gap-6 bg-white p-6 border-l-4 border-primary shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-red-100 flex items-center justify-center shrink-0 transform -skew-x-12">
                    <problem.icon className="w-6 h-6 text-red-600 transform skew-x-12" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-foreground mb-2 uppercase tracking-tight">{problem.title}</h3>
                    <p className="text-gray-600 font-sans text-lg">{problem.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full lg:w-1/2">
            <div className="relative overflow-hidden shadow-2xl border-8 border-white">
              <img 
                src="/src/assets/images/driver-problems.jpg" 
                alt="Stressed truck driver" 
                className="w-full h-auto object-cover aspect-[4/3] filter grayscale contrast-125"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B3C5D] to-transparent opacity-90"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white border-t-4 border-primary bg-[#0B3C5D]/80 backdrop-blur-sm">
                <p className="text-2xl font-bold italic mb-2">"I used to spend 3 hours a day just trying to find my next load. Not anymore."</p>
                <p className="text-primary font-display font-bold uppercase tracking-widest">Client Testimonial</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
