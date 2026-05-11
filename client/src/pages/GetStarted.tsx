import { useEffect } from "react";
import Analytics from "@/components/Analytics";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LeadForm from "@/components/sections/LeadForm";
import { fbTrack, gaTrack } from "@/lib/fbtrack";
import { useScrollDepth } from "@/lib/useScrollDepth";
import { usePageMeta } from "@/lib/usePageMeta";

export default function GetStarted() {
  usePageMeta({
    title: "Get Started — Free Truck Dispatch Consultation | Northline Dispatching",
    description:
      "Free 30-minute consultation with our dispatch specialists. No commitment, no upfront fees. See how much revenue you're leaving on the table.",
    canonical: "https://northlinedispatching.com/get-started",
    ogTitle: "Get Started with Northline Dispatching — Free 30-Min Call",
    ogDescription:
      "Book a free consultation. Find out if your truck qualifies and how Northline gets owner-operators higher paying loads with zero forced dispatch.",
    ogUrl: "https://northlinedispatching.com/get-started",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      name: "Get Started with Northline Dispatching",
      description:
        "Free consultation request form for owner-operators and small fleets interested in truck dispatching services.",
      url: "https://northlinedispatching.com/get-started",
      inLanguage: "en-US",
      isPartOf: {
        "@type": "WebSite",
        name: "Northline Dispatching",
        url: "https://northlinedispatching.com",
      },
    },
  });

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
