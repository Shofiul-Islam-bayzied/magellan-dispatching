import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, useRef } from "react";
import { useLocation } from "wouter";
import { CheckCircle2 } from "lucide-react";
import { fbTrack, gaTrack, clarityEvent } from "@/lib/fbtrack";
import { Button } from "@/components/ui/button";

const schema = z.object({
  name: z.string().min(2, "Full name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(7, "Phone number is required"),
  truckType: z.string().min(1, "Please select an option"),
  truckTypeOther: z.string().optional(),
  notRobot: z.boolean().refine((v) => v === true, { message: "Please confirm you're not a robot" }),
  // honeypot — must stay empty
  website: z.string().max(0).optional(),
}).refine(
  (d) => d.truckType !== "Other" || (d.truckTypeOther?.trim() ?? "").length > 0,
  { message: "Please describe your truck type", path: ["truckTypeOther"] }
);

type FormData = z.infer<typeof schema>;

export default function LeadForm() {
  const [, setLocation] = useLocation();
  const [submitting, setSubmitting] = useState(false);
  const formStarted = useRef(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const selectedTruckType = watch("truckType");

  // Track first field focus in GA4/Clarity only — not sent to Meta
  function handleFormStart() {
    if (formStarted.current) return;
    formStarted.current = true;
    gaTrack("form_start", { form_name: "Lead Form" });
    clarityEvent("form_start");
  }

  async function onSubmit(data: FormData) {
    // Honeypot check — silently drop bot submissions
    if (data.website) return;
    setSubmitting(true);

    const truckType =
      data.truckType === "Other" ? (data.truckTypeOther ?? "Other") : data.truckType;

    // Server handles both local save + Google Sheets forwarding
    await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: data.name, email: data.email, phone: data.phone, trucks: truckType }),
    }).catch(() => {});
    fbTrack("Lead", { content_name: "Website Lead Form", content_category: "Organic" });
    gaTrack("generate_lead", { method: "Website Form" });
    clarityEvent("lead_submitted");
    setLocation("/schedule");
  }

  // Track validation errors in GA4 only — not sent to Meta
  function onInvalidSubmit(validationErrors: typeof errors) {
    const errorFields = Object.keys(validationErrors).filter((k) => k !== "website");
    if (errorFields.length > 0) {
      gaTrack("form_error", { form_name: "Lead Form", error_fields: errorFields.join(",") });
    }
  }

  return (
    <section className="py-20 lg:py-28 bg-white relative overflow-hidden" id="lead-form">
      {/* Background */}
      <div className="absolute right-0 top-0 w-1/2 h-full bg-[#f8f9fa] z-0 hidden lg:block" />
      <div className="absolute top-0 right-0 w-64 h-full bg-primary/5 transform skew-x-12 z-0 hidden lg:block" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start max-w-7xl mx-auto">

          {/* Left: Copy */}
          <div className="w-full lg:w-5/12 pt-4 sm:pt-10">
            <div className="inline-flex items-center gap-3 px-4 py-1 mb-6 sm:mb-8 bg-[#0B3C5D] text-white font-display font-bold text-xs sm:text-sm tracking-widest uppercase transform -skew-x-12">
              <span className="transform skew-x-12 block">Get Started</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#2F2F2F] mb-6 sm:mb-8 uppercase tracking-tighter leading-[0.95] sm:leading-[0.9]">
              READY TO MAXIMIZE <span className="text-primary block mt-1 sm:mt-2">YOUR REVENUE?</span>
            </h2>

            <p className="text-lg sm:text-xl text-gray-600 font-sans mb-8 sm:mb-12 leading-relaxed border-l-4 border-primary pl-4 sm:pl-6">
              Tell us about your operation and we'll set up a free 30-minute call with our dispatch specialists to show you exactly how much you're leaving on the table.
            </p>

            <div className="space-y-4 sm:space-y-6 mb-10 sm:mb-12">
              {[
                "No commitment or upfront fees",
                "Find out if your truck qualifies",
                "Learn about our premium freight network",
                "Get set up to run within 24 hours",
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 sm:gap-4 bg-gray-50 p-3 sm:p-4 border-l-2 border-primary"
                >
                  <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-primary shrink-0" />
                  <span className="font-bold text-[#2F2F2F] uppercase tracking-wide text-sm sm:text-base">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <div className="w-full lg:w-7/12">
            <div className="bg-white shadow-[0_20px_50px_rgba(0,0,0,0.1)] border-4 border-[#0B3C5D] relative">
              <div className="absolute top-0 left-0 right-0 h-4 bg-primary z-10" />
              <div className="p-8 sm:p-10 mt-4">
                <h3 className="text-xl sm:text-2xl font-black text-[#2F2F2F] uppercase tracking-tight mb-1">
                  Claim Your Free Consultation
                </h3>
                <p className="text-gray-500 text-sm mb-8">
                  Takes less than 60 seconds. No credit card needed.
                </p>

                <form onSubmit={handleSubmit(onSubmit, onInvalidSubmit)} className="space-y-5">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-[#2F2F2F] mb-1">
                      Full Name *
                    </label>
                    <input
                      {...register("name")}
                      className="w-full border-2 border-gray-200 focus:border-primary outline-none px-4 py-3 text-sm font-medium transition-colors"
                      placeholder="John Smith"
                      onFocus={handleFormStart}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-[#2F2F2F] mb-1">
                      Email Address *
                    </label>
                    <input
                      {...register("email")}
                      type="email"
                      className="w-full border-2 border-gray-200 focus:border-primary outline-none px-4 py-3 text-sm font-medium transition-colors"
                      placeholder="john@example.com"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-[#2F2F2F] mb-1">
                      Phone Number *
                    </label>
                    <input
                      {...register("phone")}
                      type="tel"
                      className="w-full border-2 border-gray-200 focus:border-primary outline-none px-4 py-3 text-sm font-medium transition-colors"
                      placeholder="(555) 000-0000"
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
                    )}
                  </div>

                  {/* Truck Type */}
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-[#2F2F2F] mb-1">
                      What type of truck do you operate? *
                    </label>
                    <select
                      {...register("truckType")}
                      className="w-full border-2 border-gray-200 focus:border-primary outline-none px-4 py-3 text-sm font-medium transition-colors bg-white"
                    >
                      <option value="">Select...</option>
                      <option value="Dry Van">Dry Van</option>
                      <option value="Reefer">Reefer</option>
                      <option value="Flatbed">Flatbed</option>
                      <option value="Other">Other</option>
                    </select>
                    {errors.truckType && (
                      <p className="text-red-500 text-xs mt-1">{errors.truckType.message}</p>
                    )}
                    {selectedTruckType === "Other" && (
                      <div className="mt-3">
                        <input
                          {...register("truckTypeOther")}
                          placeholder="Please describe your truck type..."
                          className="w-full border-2 border-primary outline-none px-4 py-3 text-sm font-medium transition-colors"
                          autoFocus
                        />
                        {errors.truckTypeOther && (
                          <p className="text-red-500 text-xs mt-1">{errors.truckTypeOther.message}</p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Honeypot — hidden from humans, bots fill it */}
                  <div style={{ position: "absolute", left: "-9999px", opacity: 0, pointerEvents: "none" }} aria-hidden="true" tabIndex={-1}>
                    <input {...register("website")} type="text" tabIndex={-1} autoComplete="off" />
                  </div>

                  {/* Human verification checkbox */}
                  <div className="flex items-start gap-3 border-2 border-gray-200 px-4 py-4 bg-gray-50">
                    <input
                      {...register("notRobot")}
                      type="checkbox"
                      id="notRobot"
                      className="mt-0.5 w-5 h-5 accent-primary cursor-pointer shrink-0"
                    />
                    <label htmlFor="notRobot" className="text-sm font-bold text-[#2F2F2F] cursor-pointer select-none">
                      I'm not a robot
                    </label>
                  </div>
                  {errors.notRobot && (
                    <p className="text-red-500 text-xs -mt-3">{errors.notRobot.message}</p>
                  )}

                  <Button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-primary text-white hover:bg-[#0B3C5D] font-black py-6 rounded-none uppercase tracking-[0.2em] text-sm transition-all duration-300 shadow-[5px_5px_0px_0px_rgba(0,0,0,0.3)] hover:shadow-none hover:translate-y-1 hover:translate-x-1 mt-2"
                  >
                    {submitting ? "One moment..." : "Schedule My Free Call →"}
                  </Button>

                  <p className="text-center text-xs text-gray-400 font-medium">
                    🔒 Your information is 100% private. No spam, ever.
                  </p>
                </form>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
