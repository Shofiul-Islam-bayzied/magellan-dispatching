import { useEffect } from "react";
import Analytics from "@/components/Analytics";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LeadForm from "@/components/sections/LeadForm";
import { fbTrack, gaTrack } from "@/lib/fbtrack";
import { useScrollDepth } from "@/lib/useScrollDepth";

export default function GetStarted() {
  useScrollDepth("GetStarted");

  useEffect(() => {
    // ViewContent — user is on the lead form page, showing intent
    fbTrack("ViewContent", {
      content_name: "Get Started – Lead Form",
      content_category: "Lead Form",
    });
    gaTrack("view_item", { item_name: "Get Started – Lead Form" });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Analytics />
      <Navbar />
      <main className="pt-24 sm:pt-28">
        <LeadForm />
      </main>
      <Footer />
    </div>
  );
}
