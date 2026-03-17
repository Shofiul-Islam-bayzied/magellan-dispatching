import { Link } from "wouter";
import { Compass, ArrowLeft } from "lucide-react";

export default function Terms() {
  return (
    <div className="min-h-screen bg-white text-[#1a1a1a]">
      {/* Header */}
      <header className="bg-[#0B3C5D] border-b-4 border-primary py-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link href="/">
            <a className="flex items-center gap-2 sm:gap-3">
              <div className="w-10 h-10 bg-primary flex items-center justify-center transform -skew-x-12">
                <Compass className="w-6 h-6 text-white transform skew-x-12" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tighter text-white uppercase leading-none">Magellan</span>
                <span className="text-[10px] text-primary font-bold tracking-[0.2em] uppercase leading-none mt-1">Dispatching</span>
              </div>
            </a>
          </Link>
          <Link href="/">
            <a className="flex items-center gap-2 text-white/80 hover:text-white text-sm font-bold uppercase tracking-widest transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </a>
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 max-w-4xl">
        <div className="mb-10">
          <div className="inline-flex items-center px-4 py-1 mb-4 bg-[#0B3C5D] text-white font-bold text-sm tracking-widest uppercase transform -skew-x-12">
            <span className="transform skew-x-12 block">Legal</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tighter text-[#0B3C5D] mb-2">Terms of Service</h1>
          <p className="text-sm text-gray-500 font-bold uppercase tracking-widest">Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
        </div>

        <div className="prose max-w-none space-y-8 text-gray-700 leading-relaxed">
          <section>
            <p>By accessing or using the Magellan Dispatching website and services, you agree to be bound by these Terms of Service. Please read them carefully before using our services.</p>
          </section>

          <section>
            <h2 className="text-xl font-black text-[#0B3C5D] uppercase tracking-tight mb-3 border-l-4 border-primary pl-4">1. Services</h2>
            <p>Magellan Dispatching provides truck dispatching services to independent owner-operators and small fleet owners. Our services include load sourcing, rate negotiation, broker credit checks, paperwork management, and route planning. Specific service terms will be outlined in a separate service agreement between Magellan Dispatching and the client.</p>
          </section>

          <section>
            <h2 className="text-xl font-black text-[#0B3C5D] uppercase tracking-tight mb-3 border-l-4 border-primary pl-4">2. Eligibility</h2>
            <p>Our services are available to licensed motor carriers with valid operating authority (MC/DOT numbers), appropriate insurance coverage, and equipment meeting DOT standards. We reserve the right to decline or terminate service at our discretion.</p>
          </section>

          <section>
            <h2 className="text-xl font-black text-[#0B3C5D] uppercase tracking-tight mb-3 border-l-4 border-primary pl-4">3. No Forced Dispatch</h2>
            <p>Magellan Dispatching operates on a no-forced-dispatch policy. Clients retain full authority over which loads they accept or decline. We act as your agent in sourcing and negotiating freight, but all final decisions remain with the carrier.</p>
          </section>

          <section>
            <h2 className="text-xl font-black text-[#0B3C5D] uppercase tracking-tight mb-3 border-l-4 border-primary pl-4">4. Fees & Payment</h2>
            <p>Service fees are outlined in your individual service agreement. Fees are typically calculated as a percentage of the gross load revenue. Payment terms, invoicing schedules, and acceptable payment methods are specified in the service agreement. Magellan Dispatching does not charge upfront fees for consultations or onboarding assessments.</p>
          </section>

          <section>
            <h2 className="text-xl font-black text-[#0B3C5D] uppercase tracking-tight mb-3 border-l-4 border-primary pl-4">5. Client Responsibilities</h2>
            <p>As a client, you agree to:</p>
            <ul className="mt-3 space-y-2 list-none pl-0">
              {[
                "Maintain valid operating authority, insurance, and DOT compliance at all times",
                "Provide accurate and up-to-date information about your equipment and availability",
                "Communicate promptly regarding load acceptances, issues, or schedule changes",
                "Honor accepted load commitments and rate confirmations",
                "Pay all fees in accordance with the service agreement",
              ].map((item, i) => (
                <li key={i} className="flex gap-3 items-start">
                  <span className="mt-1.5 w-2 h-2 bg-primary flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-black text-[#0B3C5D] uppercase tracking-tight mb-3 border-l-4 border-primary pl-4">6. Limitation of Liability</h2>
            <p>Magellan Dispatching acts as a dispatch agent and is not liable for: cargo damage or loss, delays caused by weather, traffic, or mechanical issues, broker non-payment (though we conduct credit checks), or any indirect, incidental, or consequential damages. Our liability is limited to the fees paid for the specific dispatch service in question.</p>
          </section>

          <section>
            <h2 className="text-xl font-black text-[#0B3C5D] uppercase tracking-tight mb-3 border-l-4 border-primary pl-4">7. Confidentiality</h2>
            <p>Both parties agree to keep confidential any proprietary information, rate details, broker relationships, and business strategies shared during the course of the service relationship. This obligation survives termination of the service agreement.</p>
          </section>

          <section>
            <h2 className="text-xl font-black text-[#0B3C5D] uppercase tracking-tight mb-3 border-l-4 border-primary pl-4">8. Termination</h2>
            <p>Either party may terminate the service relationship with written notice as specified in the service agreement. Upon termination, all outstanding fees become immediately due. Magellan Dispatching may terminate service immediately for breach of these terms, non-payment, or loss of operating authority.</p>
          </section>

          <section>
            <h2 className="text-xl font-black text-[#0B3C5D] uppercase tracking-tight mb-3 border-l-4 border-primary pl-4">9. Website Use</h2>
            <p>The content on this website is provided for informational purposes only. You may not reproduce, distribute, or create derivative works from our website content without written permission. We reserve the right to modify or discontinue any aspect of the website at any time without notice.</p>
          </section>

          <section>
            <h2 className="text-xl font-black text-[#0B3C5D] uppercase tracking-tight mb-3 border-l-4 border-primary pl-4">10. Governing Law</h2>
            <p>These Terms of Service shall be governed by and construed in accordance with the laws of the United States. Any disputes arising from these terms or our services shall be resolved through binding arbitration.</p>
          </section>

          <section>
            <h2 className="text-xl font-black text-[#0B3C5D] uppercase tracking-tight mb-3 border-l-4 border-primary pl-4">11. Changes to These Terms</h2>
            <p>We reserve the right to update these Terms of Service at any time. Updated terms will be posted on this page with a revised date. Continued use of our services after any changes constitutes acceptance of the new terms.</p>
          </section>

          <section>
            <h2 className="text-xl font-black text-[#0B3C5D] uppercase tracking-tight mb-3 border-l-4 border-primary pl-4">12. Contact Us</h2>
            <p>Questions about these Terms of Service? Contact us:</p>
            <div className="mt-4 bg-gray-50 border-l-4 border-primary p-5">
              <p className="font-black text-[#0B3C5D] uppercase tracking-wider mb-1">Magellan Dispatching</p>
              <p>Email: <a href="mailto:info@magellandispatching.com" className="text-primary font-bold hover:underline">info@magellandispatching.com</a></p>
            </div>
          </section>
        </div>
      </main>

      <footer className="bg-[#111111] border-t-4 border-primary py-8 text-center text-gray-500 text-sm font-sans">
        <p className="uppercase tracking-widest font-bold">© {new Date().getFullYear()} Magellan Dispatching. All rights reserved.</p>
      </footer>
    </div>
  );
}
