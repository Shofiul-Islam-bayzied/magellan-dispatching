import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Compass, Menu } from "lucide-react";

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b-4 ${
        isScrolled ? "bg-[#0B3C5D] shadow-2xl py-2 border-primary" : "bg-transparent py-4 sm:py-6 border-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-10 h-10 sm:w-14 sm:h-14 bg-primary flex items-center justify-center transform -skew-x-12 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)] sm:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)]">
              <Compass className="w-6 h-6 sm:w-8 sm:h-8 text-white transform skew-x-12" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-3xl font-black tracking-tighter text-white uppercase leading-none drop-shadow-md">
                Magellan
              </span>
              <span className="text-[10px] sm:text-xs text-primary font-bold tracking-[0.2em] sm:tracking-[0.3em] uppercase leading-none mt-1">Dispatching</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {["Problems", "Solution", "Benefits", "How It Works"].map((item) => (
              <button 
                key={item}
                onClick={() => document.getElementById(item.toLowerCase().replace(/\s+/g, '-'))?.scrollIntoView({ behavior: 'smooth' })}
                className="text-xs lg:text-sm font-black uppercase tracking-[0.15em] text-white hover:text-primary transition-colors relative group py-2"
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-1 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Button 
              onClick={scrollToBooking}
              className="bg-primary text-white hover:bg-white hover:text-[#0B3C5D] font-black px-6 py-5 lg:px-8 lg:py-7 rounded-none uppercase tracking-[0.2em] text-xs lg:text-sm transition-all duration-300 shadow-[5px_5px_0px_0px_rgba(0,0,0,0.5)] hover:shadow-none hover:translate-y-1 hover:translate-x-1 border-2 border-transparent hover:border-[#0B3C5D]"
            >
              Get Started
            </Button>
          </div>
          
          <button className="md:hidden text-white bg-primary p-2 sm:p-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)]">
            <Menu className="w-6 h-6 sm:w-8 sm:h-8" />
          </button>
        </div>
      </div>
    </header>
  );
}
