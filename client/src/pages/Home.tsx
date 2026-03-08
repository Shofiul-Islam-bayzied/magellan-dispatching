import Hero from "@/components/sections/Hero";
import TrustBanner from "@/components/sections/TrustBanner";
import Problems from "@/components/sections/Problems";
import Solutions from "@/components/sections/Solutions";
import Benefits from "@/components/sections/Benefits";
import HowItWorks from "@/components/sections/HowItWorks";
import VideoSection from "@/components/sections/VideoSection";
import Testimonials from "@/components/sections/Testimonials";
import Booking from "@/components/sections/Booking";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
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
        <Booking />
      </main>
      <Footer />
    </div>
  );
}
