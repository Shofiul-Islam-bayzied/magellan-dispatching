import { Link } from "wouter";
import { Compass, ArrowLeft } from "lucide-react";

export default function Privacy() {
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
          <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tighter text-[#0B3C5D] mb-2">Privacy Policy</h1>
          <p className="text-sm text-gray-500 font-bold uppercase tracking-widest">Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
        </div>

        <div className="prose max-w-none space-y-8 text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-xl font-black text-[#0B3C5D] uppercase tracking-tight mb-3 border-l-4 border-primary pl-4">1. Information We Collect</h2>
            <p>When you use our website or contact us, we may collect the following types of information:</p>
            <ul className="mt-3 space-y-2 list-none pl-0">
              {[
                "Name, email address, and phone number provided through contact forms or booking requests",
                "Information about your trucking operation (truck type, lanes, fleet size) shared during consultations",
                "Technical data such as IP address, browser type, and pages visited via analytics tools",
                "Communications you send to us by email or through the website",
              ].map((item, i) => (
                <li key={i} className="flex gap-3 items-start">
                  <span className="mt-1.5 w-2 h-2 bg-primary flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-black text-[#0B3C5D] uppercase tracking-tight mb-3 border-l-4 border-primary pl-4">2. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul className="mt-3 space-y-2 list-none pl-0">
              {[
                "Respond to inquiries and schedule consultations",
                "Provide and improve our truck dispatching services",
                "Send service-related communications and updates",
                "Analyze website performance and user experience",
                "Comply with legal obligations",
              ].map((item, i) => (
                <li key={i} className="flex gap-3 items-start">
                  <span className="mt-1.5 w-2 h-2 bg-primary flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-black text-[#0B3C5D] uppercase tracking-tight mb-3 border-l-4 border-primary pl-4">3. Sharing Your Information</h2>
            <p>We do not sell, rent, or trade your personal information to third parties. We may share your information only in the following circumstances:</p>
            <ul className="mt-3 space-y-2 list-none pl-0">
              {[
                "With service providers who assist in operating our website or business (e.g., Calendly for scheduling)",
                "When required by law, regulation, or legal process",
                "To protect the rights, property, or safety of Magellan Dispatching or others",
              ].map((item, i) => (
                <li key={i} className="flex gap-3 items-start">
                  <span className="mt-1.5 w-2 h-2 bg-primary flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-black text-[#0B3C5D] uppercase tracking-tight mb-3 border-l-4 border-primary pl-4">4. Cookies & Analytics</h2>
            <p>Our website may use cookies and third-party analytics services (such as Google Analytics, Facebook Pixel, or Microsoft Clarity) to understand how visitors interact with our site. You may disable cookies in your browser settings, though some functionality may be affected. By using our website, you consent to the use of these tools.</p>
          </section>

          <section>
            <h2 className="text-xl font-black text-[#0B3C5D] uppercase tracking-tight mb-3 border-l-4 border-primary pl-4">5. Data Security</h2>
            <p>We implement reasonable technical and organizational measures to protect your information against unauthorized access, loss, or misuse. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.</p>
          </section>

          <section>
            <h2 className="text-xl font-black text-[#0B3C5D] uppercase tracking-tight mb-3 border-l-4 border-primary pl-4">6. Your Rights</h2>
            <p>Depending on your location, you may have the right to:</p>
            <ul className="mt-3 space-y-2 list-none pl-0">
              {[
                "Access and receive a copy of the personal data we hold about you",
                "Request correction of inaccurate data",
                "Request deletion of your personal data",
                "Opt out of marketing communications at any time",
              ].map((item, i) => (
                <li key={i} className="flex gap-3 items-start">
                  <span className="mt-1.5 w-2 h-2 bg-primary flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4">To exercise any of these rights, please contact us at <a href="mailto:info@magellandispatching.com" className="text-primary font-bold hover:underline">info@magellandispatching.com</a>.</p>
          </section>

          <section>
            <h2 className="text-xl font-black text-[#0B3C5D] uppercase tracking-tight mb-3 border-l-4 border-primary pl-4">7. Third-Party Links</h2>
            <p>Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of those sites. We encourage you to review their privacy policies.</p>
          </section>

          <section>
            <h2 className="text-xl font-black text-[#0B3C5D] uppercase tracking-tight mb-3 border-l-4 border-primary pl-4">8. Changes to This Policy</h2>
            <p>We reserve the right to update this Privacy Policy at any time. Changes will be posted on this page with an updated date. Continued use of our website after changes constitutes acceptance of the revised policy.</p>
          </section>

          <section>
            <h2 className="text-xl font-black text-[#0B3C5D] uppercase tracking-tight mb-3 border-l-4 border-primary pl-4">9. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us:</p>
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
