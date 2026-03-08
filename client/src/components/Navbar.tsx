import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Truck } from "lucide-react";

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-md shadow-sm py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Truck className={`w-8 h-8 ${isScrolled ? "text-primary" : "text-primary"}`} />
            <span className={`text-2xl font-black tracking-tight ${isScrolled ? "text-secondary" : "text-white"}`}>
              Dispatch<span className="text-primary">Pro</span>
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            {["Solution", "How It Works"].map((item) => (
              <button 
                key={item}
                onClick={() => document.getElementById(item.toLowerCase().replace(/\s+/g, '-'))?.scrollIntoView({ behavior: 'smooth' })}
                className={`text-sm font-semibold uppercase tracking-wider hover:text-primary transition-colors ${
                  isScrolled ? "text-gray-600" : "text-white/90"
                }`}
              >
                {item}
              </button>
            ))}
          </nav>

          <div>
            <Button 
              onClick={scrollToBooking}
              className={`${
                isScrolled 
                  ? "bg-primary text-white hover:bg-primary/90" 
                  : "bg-white text-secondary hover:bg-gray-100"
              } font-bold px-6`}
            >
              Check Eligibility
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
