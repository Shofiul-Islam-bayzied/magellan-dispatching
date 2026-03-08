import Hero from "@/components/sections/Hero";
import Problems from "@/components/sections/Problems";
import Solutions from "@/components/sections/Solutions";
import Benefits from "@/components/sections/Benefits";
import HowItWorks from "@/components/sections/HowItWorks";
import VideoSection from "@/components/sections/VideoSection";
import Booking from "@/components/sections/Booking";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <Problems />
        <Solutions />
        <Benefits />
        <HowItWorks />
        <VideoSection />
        <Booking />
      </main>
      <Footer />
    </div>
  );
}
