import { useEffect } from "react";
import { fbTrack, gaTrack } from "@/lib/fbtrack";
import { useScrollDepth, useTimeOnPage } from "@/lib/useScrollDepth";
import Hero from "@/components/sections/Hero";
import TrustBanner from "@/components/sections/TrustBanner";
import Problems from "@/components/sections/Problems";
import Solutions from "@/components/sections/Solutions";
import Benefits from "@/components/sections/Benefits";
import HowItWorks from "@/components/sections/HowItWorks";
import VideoSection from "@/components/sections/VideoSection";
import Testimonials from "@/components/sections/Testimonials";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Analytics from "@/components/Analytics";

export default function Home() {
  // Scroll depth + time on page tracking
  useScrollDepth("Home");
  useTimeOnPage("Home");

  useEffect(() => {
    // ViewContent — user is viewing the main offer page
    fbTrack("ViewContent", {
      content_name: "Magellan Dispatching Landing Page",
      content_category: "Trucking Dispatch",
    });
    gaTrack("view_item", { item_name: "Landing Page" });
  }, []);

  // Scroll to hash section when navigating from another page (e.g. /#problems)
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) return;
    const el = document.getElementById(hash);
    if (el) {
      setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 300);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Analytics />
      <Navbar />
      <main>
        <Hero />
        <TrustBanner />
        <Problems />
        <Solutions />
        <Benefits />
        <VideoSection />
        <HowItWorks />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}
