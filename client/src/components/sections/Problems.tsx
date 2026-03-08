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
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="w-full lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Sound Familiar? The Struggle of an Independent Owner-Operator
            </h2>
            <p className="text-lg text-muted-foreground mb-10 font-sans">
              You got into the trucking business for freedom and profit, but instead you're finding yourself acting as a full-time secretary, negotiator, and dispatcher.
            </p>

            <div className="grid gap-8">
              {problems.map((problem, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center shrink-0">
                    <problem.icon className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">{problem.title}</h3>
                    <p className="text-muted-foreground font-sans">{problem.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full lg:w-1/2">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="/src/assets/images/driver-problems.jpg" 
                alt="Stressed truck driver" 
                className="w-full h-auto object-cover aspect-[4/3]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <p className="text-xl font-medium">"I used to spend 3 hours a day just trying to find my next load. Not anymore."</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
