import { Search, Map, ShieldCheck, FileCheck, DollarSign } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function Solutions() {
  const solutions = [
    {
      icon: Search,
      title: "Load Sourcing",
      description: "We constantly monitor boards and use our direct broker relationships to find premium freight."
    },
    {
      icon: DollarSign,
      title: "Rate Negotiation",
      description: "Our experienced dispatchers negotiate hard to get you the highest possible rate per mile."
    },
    {
      icon: ShieldCheck,
      title: "Broker Credit Checks",
      description: "We vet every broker to ensure you actually get paid for the work you do."
    },
    {
      icon: FileCheck,
      title: "Paperwork Management",
      description: "From setup packets to rate cons and invoicing, we handle the administrative burden."
    },
    {
      icon: Map,
      title: "Route Planning",
      description: "We plan efficient routes to minimize deadhead and keep your truck in high-paying zones."
    }
  ];

  return (
    <section className="py-24 bg-white" id="solution">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Our Complete Dispatch Solution
          </h2>
          <p className="text-lg text-muted-foreground font-sans">
            We operate as your dedicated back-office team. You drive, we handle the rest. It's a partnership designed to maximize your revenue and minimize your stress.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {solutions.map((solution, i) => (
            <Card key={i} className="border border-gray-100 shadow-md hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8">
                <div className="w-14 h-14 rounded-full bg-secondary/10 flex items-center justify-center mb-6">
                  <solution.icon className="w-7 h-7 text-secondary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{solution.title}</h3>
                <p className="text-muted-foreground font-sans">{solution.description}</p>
              </CardContent>
            </Card>
          ))}
          
          <div className="bg-secondary rounded-xl p-8 text-white flex flex-col justify-center items-start shadow-lg">
            <h3 className="text-2xl font-bold mb-4">Ready to upgrade your business?</h3>
            <p className="text-secondary-foreground/80 mb-6 font-sans">Stop leaving money on the table and let professionals handle your dispatching.</p>
            <button 
              onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-primary text-white px-6 py-3 rounded-md font-bold hover:bg-primary/90 transition-colors w-full text-center"
            >
              Check Eligibility
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
