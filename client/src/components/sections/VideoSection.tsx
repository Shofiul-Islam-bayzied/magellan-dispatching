import { useState, useRef, useCallback } from "react";
import { Play, Volume2, VolumeX, Maximize } from "lucide-react";

export default function VideoSection() {
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Call play() directly inside the click handler — iOS requires play() to be
  // called synchronously within a user gesture, not in a useEffect/setTimeout.
  function handlePlay() {
    const video = videoRef.current;
    if (!video) return;
    setPlaying(true);
    video.muted = true;
    setMuted(true);
    video.play().catch(() => setPlaying(false));
  }

  // Guard flag — prevents two simultaneous play() calls (e.g. stalled + toggleMute race)
  const resumingRef = useRef(false);

  function safePlay(video: HTMLVideoElement, onFail?: () => void) {
    if (resumingRef.current) return;
    resumingRef.current = true;
    video.play()
      .catch(() => onFail?.())
      .finally(() => { resumingRef.current = false; });
  }

  function toggleMute() {
    const video = videoRef.current;
    if (!video) return;
    const next = !video.muted;
    video.muted = next;
    setMuted(next);
    // Some browsers (notably iOS) pause the video when muted state changes.
    // Use requestAnimationFrame so the browser settles before we check paused —
    // this avoids a race with onStalled that would cause duplicate play() calls.
    requestAnimationFrame(() => {
      if (!video.paused) return; // already playing — nothing to do
      safePlay(video, () => {
        // Audio unblock failed — fall back to muted
        video.muted = true;
        setMuted(true);
        safePlay(video);
      });
    });
  }

  function toggleFullscreen() {
    const video = videoRef.current;
    if (!video) return;
    if (video.requestFullscreen) {
      video.requestFullscreen();
    } else if ((video as any).webkitEnterFullscreen) {
      (video as any).webkitEnterFullscreen();
    }
  }

  // Only resume on genuine stalls, not normal suspend events
  const handleStalled = useCallback(() => {
    const video = videoRef.current;
    if (video && video.paused && !video.ended) {
      safePlay(video);
    }
  }, []);

  return (
    <section className="py-20 lg:py-28 bg-[#071D2B] relative overflow-hidden" id="video-section">
      <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9IiNmZmYiLz48L3N2Zz4=')] z-0" />
      <div className="absolute -left-40 -top-40 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
      <div className="absolute -right-40 -bottom-40 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-3 px-4 py-1 mb-4 sm:mb-6 bg-primary text-white font-display font-bold text-xs sm:text-sm tracking-widest uppercase transform -skew-x-12">
            <span className="transform skew-x-12 block">See Inside</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4 sm:mb-6 uppercase tracking-tighter leading-tight">
            Watch How We <span className="text-primary block sm:inline mt-1 sm:mt-0">Scale</span> Your Business
          </h2>
          <p className="text-base sm:text-lg text-gray-300 font-sans px-2 sm:px-0 leading-relaxed">
            Take 90 seconds to see exactly how our dedicated dispatchers operate to keep your trucks moving and your revenue growing.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="relative bg-black aspect-video shadow-[0_0_50px_rgba(0,0,0,0.6)] border-4 border-black overflow-hidden group">

            {/* Video — always in the DOM so the ref is available when handlePlay fires */}
            <video
              ref={videoRef}
              src="/video/magellan-dispatch.mp4"
              poster="/video/magellan-poster.jpg"
              preload="metadata"
              playsInline
              muted
              controls={false}
              className={`w-full h-full object-contain bg-black ${playing ? "block" : "hidden"}`}
              onEnded={() => setPlaying(false)}
              onVolumeChange={() => {
                if (videoRef.current) setMuted(videoRef.current.muted);
              }}
              onStalled={handleStalled}
            />

            {/* Poster / click-to-play overlay */}
            {!playing && (
              <button
                onClick={handlePlay}
                aria-label="Play video"
                className="absolute inset-0 w-full h-full z-20 cursor-pointer"
              >
                <img
                  src="/video/magellan-poster.jpg"
                  alt="Magellan Dispatching — watch how we scale your business"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                  width="1280"
                  height="720"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 sm:w-28 sm:h-28 bg-primary text-white flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_40px_rgba(249,115,22,0.6)]">
                    <Play className="w-8 h-8 sm:w-12 sm:h-12 ml-1 sm:ml-2 fill-current" />
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 sm:bottom-8 sm:left-8 bg-primary px-4 py-2 sm:px-6 sm:py-3 text-white font-bold uppercase tracking-[0.1em] text-xs sm:text-sm z-20">
                  Magellan Dispatching
                </div>
              </button>
            )}

            {/* Controls — mute/unmute + fullscreen only, shown while playing */}
            {playing && (
              <div className="absolute bottom-0 left-0 right-0 flex items-center justify-end px-4 py-3 bg-gradient-to-t from-black/80 to-transparent z-30 gap-2">
                <button
                  onClick={toggleMute}
                  aria-label={muted ? "Unmute" : "Mute"}
                  className="w-11 h-11 flex items-center justify-center text-white hover:text-primary transition-colors"
                >
                  {muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </button>
                <button
                  onClick={toggleFullscreen}
                  aria-label="Fullscreen"
                  className="w-11 h-11 flex items-center justify-center text-white hover:text-primary transition-colors"
                >
                  <Maximize className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
