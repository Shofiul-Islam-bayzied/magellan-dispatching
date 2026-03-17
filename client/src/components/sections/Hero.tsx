import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle2, PhoneCall, ShieldCheck, TrendingUp, ArrowRight, Volume2, VolumeX } from "lucide-react";
import { fbTrack, gaTrack } from "@/lib/fbtrack";
import heroTruckPoster from "@/assets/images/hero-truck.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

const BADGES = [
  { icon: ShieldCheck,  text: "Dedicated Agent"   },
  { icon: TrendingUp,   text: "Top Tier Rates"     },
  { icon: PhoneCall,    text: "24/7 Support"        },
  { icon: CheckCircle2, text: "No Forced Dispatch"  },
];

function HeroVideo({
  videoRef,
  muted,
  toggleMute,
  onEnded,
  isMobile = false,
}: {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  muted: boolean;
  toggleMute: () => void;
  onEnded: React.ReactEventHandler<HTMLVideoElement>;
  isMobile?: boolean;
}) {
  return (
    <div
      className="relative w-full aspect-video overflow-hidden"
      style={
        isMobile
          ? { border: "1px solid rgba(255,255,255,0.12)" }
          : { boxShadow: "0 0 0 3px #F97316, 0 0 40px rgba(249,115,22,0.2), 0 20px 50px rgba(0,0,0,0.7)" }
      }
    >
      <video
        ref={videoRef}
        src="/video/magellan-dispatch.mp4"
        poster="/video/magellan-poster.jpg"
        autoPlay muted playsInline preload="auto"
        className="w-full h-full object-cover"
        onEnded={onEnded}
      />

      {/* LIVE dot — top left */}
      <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 bg-black/60 px-2 py-1 z-20">
        <span className="relative flex w-1.5 h-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
          <span className="relative inline-flex rounded-full w-1.5 h-1.5 bg-red-500" />
        </span>
        <span className="text-white text-[8px] font-bold uppercase tracking-widest">Live</span>
      </div>

      {/* Mute toggle — top right, subtle */}
      <button
        onClick={toggleMute}
        className="absolute top-2.5 right-2.5 flex items-center justify-center w-7 h-7 bg-black/60 text-white/80 hover:text-white hover:bg-black/80 transition-colors z-20"
        aria-label={muted ? "Unmute video" : "Mute video"}
      >
        {muted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
      </button>

      {/* Desktop corner brackets only */}
      {!isMobile && (
        <>
          <div className="absolute top-0 left-0 w-7 h-7 border-t-[3px] border-l-[3px] border-primary z-20" />
          <div className="absolute top-0 right-0 w-7 h-7 border-t-[3px] border-r-[3px] border-primary z-20" />
          <div className="absolute bottom-0 left-0 w-7 h-7 border-b-[3px] border-l-[3px] border-primary z-20" />
          <div className="absolute bottom-0 right-0 w-7 h-7 border-b-[3px] border-r-[3px] border-primary z-20" />
        </>
      )}
    </div>
  );
}

export default function Hero() {
  // Single video ref — only ONE HeroVideo is ever mounted at a time.
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  // Track breakpoint in JS so we can conditionally render only one video element.
  // This is the only reliable way to guarantee no duplicate audio: two <video autoPlay>
  // elements in the DOM will both play even when one is CSS-hidden.
  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(min-width: 1024px)").matches
  );

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const handler = (e: MediaQueryListEvent) => {
      setIsDesktop(e.matches);
      // Reset mute state on breakpoint change so the newly mounted video starts muted.
      setMuted(true);
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Defined in Hero so setMuted is in scope. Passed down as a prop to HeroVideo.
  function handleVideoEnded(e: React.SyntheticEvent<HTMLVideoElement>) {
    const v = e.currentTarget;
    v.muted = true;
    setMuted(true);
    v.currentTime = 0;
    v.play().catch(() => {});
  }

  function toggleMute() {
    const newMuted = !muted;
    setMuted(newMuted);
    const v = videoRef.current;
    if (!v) return;
    v.muted = newMuted;
    // Some browsers (iOS) pause video when muted state changes — resume if needed.
    requestAnimationFrame(() => {
      if (!v.paused) return;
      v.play().catch(() => {
        v.muted = true;
        setMuted(true);
      });
    });
  }

  return (
    <section
      className="relative pt-[120px] pb-48 lg:pt-56 lg:pb-48 overflow-hidden bg-[#0B3C5D]"
      style={{ clipPath: "polygon(0 0, 100% 0, 100% 90%, 0% 100%)" }}
    >
      {/* ── Background ─────────────────────────────────────── */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[#0B3C5D]/65 z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B3C5D] via-[#0B3C5D]/80 to-transparent z-10" />
        <div
          className="absolute inset-0 opacity-[0.07] z-10"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='20' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='2' cy='2' r='1' fill='%23fff'/%3E%3C/svg%3E\")" }}
        />
        <img src={heroTruckPoster} alt="" className="w-full h-full object-cover" />
      </div>

      {/* ── Angled accent ───────────────────────────────────── */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-primary z-20" />

      <div className="container relative z-20 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:gap-12 items-start lg:items-center">

          {/* ── TEXT COLUMN ─────────────────────────────────── */}
          <div className="w-full lg:w-[55%] order-1">

            {/* Desktop-only badge */}
            <motion.div custom={0} variants={fadeUp} initial="hidden" animate="show" className="hidden lg:block mb-8">
              <div className="inline-flex items-center gap-2 px-5 py-2 bg-primary text-white font-bold text-sm tracking-[0.2em] uppercase transform -skew-x-12">
                <span className="transform skew-x-12 block">Premium Logistics</span>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              custom={1} variants={fadeUp} initial="hidden" animate="show"
              className="text-[2.1rem] leading-[0.93] sm:text-6xl lg:text-7xl xl:text-8xl font-black text-white mb-4 sm:mb-6 tracking-tighter uppercase"
            >
              WE KEEP YOUR TRUCK
              <span className="text-primary block mt-1">MOVING & EARNING.</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              custom={2} variants={fadeUp} initial="hidden" animate="show"
              className="text-sm sm:text-xl md:text-2xl text-white/70 mb-5 sm:mb-10 max-w-2xl font-sans border-l-2 border-primary/60 pl-3 sm:pl-5 leading-relaxed"
            >
              Stop fighting with brokers. Our dispatchers negotiate the highest rates so you can focus on the road.
            </motion.p>

            {/* ── Video — mobile only, between description and CTA ── */}
            {!isDesktop && (
              <motion.div custom={3} variants={fadeUp} initial="hidden" animate="show" className="mb-5">
                <HeroVideo videoRef={videoRef} muted={muted} toggleMute={toggleMute} onEnded={handleVideoEnded} isMobile />
              </motion.div>
            )}

            {/* CTA */}
            <motion.div custom={4} variants={fadeUp} initial="hidden" animate="show" className="mb-8 sm:mb-12">
              <Button
                size="lg"
                onClick={() => {
                  document.getElementById("calendly-widget")?.scrollIntoView({ behavior: "smooth" });
                  fbTrack("Lead", { content_name: "Hero CTA" });
                  gaTrack("generate_lead", { method: "Hero CTA" });
                }}
                className="w-full sm:w-auto text-sm sm:text-xl px-8 py-4 sm:px-10 sm:py-8 bg-primary text-white hover:bg-white hover:text-[#0B3C5D] rounded-none transition-all duration-300 font-bold tracking-[0.15em] uppercase group"
                style={{ boxShadow: "3px 3px 0 0 rgba(0,0,0,0.4)" }}
              >
                Book a Free Call
                <ArrowRight className="ml-2 w-4 h-4 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>

            {/* Feature badges */}
            <motion.div custom={5} variants={fadeUp} initial="hidden" animate="show" className="pt-5 sm:pt-8 border-t border-white/10">
              {/* Mobile: 2x2 grid */}
              <div className="grid grid-cols-2 gap-2 lg:hidden">
                {BADGES.map((badge, i) => (
                  <div key={i} className="flex items-center gap-2.5 py-2">
                    <badge.icon className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-[11px] font-bold text-white/80 uppercase tracking-wide leading-tight">{badge.text}</span>
                  </div>
                ))}
              </div>
              {/* Desktop: 2-col with icon boxes */}
              <div className="hidden lg:grid grid-cols-2 gap-5 max-w-xl">
                {BADGES.map((badge, i) => (
                  <div key={i} className="flex items-center gap-3 text-white group cursor-default">
                    <div className="p-2.5 bg-primary/20 border border-primary/40 group-hover:bg-primary transition-colors duration-300 transform -skew-x-6 flex-shrink-0">
                      <badge.icon className="w-5 h-5 text-primary group-hover:text-white transform skew-x-6 transition-colors duration-300" />
                    </div>
                    <span className="text-sm font-bold uppercase tracking-wider">{badge.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ── VIDEO COLUMN — desktop only ─────────────────── */}
          {isDesktop && (
            <div className="w-full lg:w-[45%] order-2">
              <HeroVideo videoRef={videoRef} muted={muted} toggleMute={toggleMute} onEnded={handleVideoEnded} />
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
