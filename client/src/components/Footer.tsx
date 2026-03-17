import { Compass } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import type { PublicSettings } from "@shared/schema";
import { fbTrack, gaTrack } from "@/lib/fbtrack";

export default function Footer() {
  const { data: settings } = useQuery<PublicSettings>({
    queryKey: ["/api/public/settings"],
    staleTime: 5 * 60 * 1000,
  });

  const email = settings?.contact?.email || "info@magellandispatching.com";
  const phone = settings?.contact?.phone || "(800) 555-0199";
  const address = settings?.contact?.address;

  return (
    <footer className="bg-[#111111] text-white pt-16 sm:pt-20 pb-8 sm:pb-10 border-t-8 border-primary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 mb-12 sm:mb-16">
          <div className="col-span-2">
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary rounded-none flex items-center justify-center">
                <Compass className="w-6 h-6 sm:w-8 sm:h-8 text-white" aria-label="Magellan Dispatching" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl sm:text-3xl font-black tracking-tighter text-white uppercase leading-none drop-shadow-md">
                  Magellan
                </span>
                <span className="text-[10px] sm:text-xs text-primary font-bold tracking-[0.3em] uppercase leading-none mt-1">Dispatching</span>
              </div>
            </div>
            <p className="text-sm sm:text-base text-gray-400 font-sans max-w-sm mb-6 sm:mb-8 leading-relaxed">
              Premium dispatching services designed exclusively for independent owner-operators and small fleets. We handle the office, you handle the road.
            </p>
          </div>

          <div>
            <h4 className="font-display font-bold text-lg sm:text-xl uppercase tracking-widest mb-4 sm:mb-6 text-white">Quick Links</h4>
            <ul className="space-y-3 sm:space-y-4 font-sans text-sm sm:text-base text-gray-400">
              <li><a href="#how-it-works" className="hover:text-primary transition-colors">How It Works</a></li>
              <li><a href="#solution" className="hover:text-primary transition-colors">Our Services</a></li>
              <li><a href="#benefits" className="hover:text-primary transition-colors">Why Choose Us</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-lg sm:text-xl uppercase tracking-widest mb-4 sm:mb-6 text-white">Contact</h4>
            <ul className="space-y-3 sm:space-y-4 font-sans text-sm sm:text-base text-gray-400">
              <li>
                <a
                  href={`mailto:${email}`}
                  className="hover:text-primary transition-colors break-all"
                  onClick={() => { fbTrack("Contact", { content_name: "Email" }); gaTrack("contact", { method: "Email" }); }}
                >
                  {email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${phone.replace(/\D/g, "")}`}
                  className="hover:text-primary transition-colors"
                  onClick={() => { fbTrack("Contact", { content_name: "Phone" }); gaTrack("contact", { method: "Phone" }); }}
                >
                  {phone}
                </a>
              </li>
              {address && (
                <li className="text-gray-500">{address}</li>
              )}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 sm:pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-xs sm:text-sm font-sans">
          <p className="uppercase tracking-widest font-bold text-center sm:text-left">© {new Date().getFullYear()} Magellan Dispatching.</p>
          <div className="flex gap-4 sm:gap-6 uppercase tracking-widest font-bold">
            <Link href="/privacy"><a className="hover:text-white transition-colors">Privacy</a></Link>
            <Link href="/terms"><a className="hover:text-white transition-colors">Terms</a></Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
