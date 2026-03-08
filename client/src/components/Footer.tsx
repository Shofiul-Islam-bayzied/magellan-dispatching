import { Truck } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-6">
          <div className="flex items-center gap-2">
            <Truck className="w-8 h-8 text-primary" />
            <span className="text-2xl font-black tracking-tight text-white">
              Dispatch<span className="text-primary">Pro</span>
            </span>
          </div>
          
          <div className="flex gap-6 font-sans">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-sm font-sans">
          <p>© {new Date().getFullYear()} DispatchPro Solutions. All rights reserved.</p>
          <p>Designed for independent owner-operators and small fleets.</p>
        </div>
      </div>
    </footer>
  );
}
