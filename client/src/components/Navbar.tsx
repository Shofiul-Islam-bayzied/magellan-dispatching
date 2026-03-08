import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Truck, Menu } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToBooking = () => {
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-white/10 ${
        isScrolled ? "bg-[#0B3C5D] shadow-xl py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary rounded-sm flex items-center justify-center">
              <Truck className="w-8 h-8 text-white" />
            </div>
            <span className="text-3xl font-black tracking-tighter text-white uppercase">
              Dispatch<span className="text-primary">Pro</span>
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-10">
            {["Problems", "Solution", "Benefits", "How It Works"].map((item) => (
              <button 
                key={item}
                onClick={() => document.getElementById(item.toLowerCase().replace(/\s+/g, '-'))?.scrollIntoView({ behavior: 'smooth' })}
                className="text-sm font-bold uppercase tracking-widest text-white hover:text-primary transition-colors relative group"
              >
                {item}
                <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
              </button>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Button 
              onClick={scrollToBooking}
              className="bg-primary text-white hover:bg-primary/90 font-bold px-8 py-6 rounded-sm uppercase tracking-wide text-sm shadow-[0_0_15px_rgba(249,115,22,0.3)]"
            >
              Get Started
            </Button>
          </div>
          
          <button className="md:hidden text-white">
            <Menu className="w-8 h-8" />
          </button>
        </div>
      </div>
    </header>
  );
}
