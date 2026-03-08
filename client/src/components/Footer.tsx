import { Truck } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#111111] text-white pt-20 pb-10 border-t-8 border-primary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-primary rounded-none flex items-center justify-center">
                <Truck className="w-8 h-8 text-white" />
              </div>
              <span className="text-3xl font-black tracking-tighter text-white uppercase">
                Dispatch<span className="text-primary">Pro</span>
              </span>
            </div>
            <p className="text-gray-400 font-sans max-w-sm mb-8 leading-relaxed">
              Premium dispatching services designed exclusively for independent owner-operators and small fleets. We handle the office, you handle the road.
            </p>
          </div>
          
          <div>
            <h4 className="font-display font-bold text-xl uppercase tracking-widest mb-6 text-white">Quick Links</h4>
            <ul className="space-y-4 font-sans text-gray-400">
              <li><a href="#how-it-works" className="hover:text-primary transition-colors">How It Works</a></li>
              <li><a href="#solution" className="hover:text-primary transition-colors">Our Services</a></li>
              <li><a href="#benefits" className="hover:text-primary transition-colors">Why Choose Us</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-xl uppercase tracking-widest mb-6 text-white">Contact</h4>
            <ul className="space-y-4 font-sans text-gray-400">
              <li><a href="mailto:info@dispatchpro.com" className="hover:text-primary transition-colors">info@dispatchpro.com</a></li>
              <li><a href="tel:+18005550199" className="hover:text-primary transition-colors">(800) 555-0199</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-sm font-sans">
          <p className="uppercase tracking-widest font-bold">© {new Date().getFullYear()} DispatchPro Solutions.</p>
          <div className="flex gap-6 uppercase tracking-widest font-bold">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
