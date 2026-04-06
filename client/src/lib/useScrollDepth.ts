import { useEffect, useRef } from "react";
import { gaTrack, clarityEvent } from "./fbtrack";

/**
 * Fires scroll depth events at 25%, 50%, 75%, and 100% page scroll.
 * GA4 + Clarity only — Meta doesn't use scroll depth for lead optimization.
 */
export function useScrollDepth(pageName: string) {
  const fired = useRef(new Set<number>());

  useEffect(() => {
    fired.current.clear();

    function onScroll() {
      const scrolled = window.scrollY + window.innerHeight;
      const total = document.documentElement.scrollHeight;
      const pct = Math.round((scrolled / total) * 100);

      for (const milestone of [25, 50, 75, 100]) {
        if (pct >= milestone && !fired.current.has(milestone)) {
          fired.current.add(milestone);
          gaTrack("scroll_depth", { page: pageName, depth: milestone });
          clarityEvent(`scroll_${milestone}`);
        }
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pageName]);
}

/**
 * Fires time-on-page milestones: 15s, 30s, 60s.
 * GA4 + Clarity only — Meta doesn't use time-on-page for lead optimization.
 */
export function useTimeOnPage(pageName: string) {
  useEffect(() => {
    const milestones = [15, 30, 60];
    const timers = milestones.map((seconds) =>
      setTimeout(() => {
        gaTrack("time_on_page", { page: pageName, seconds });
      }, seconds * 1000)
    );
    return () => timers.forEach(clearTimeout);
  }, [pageName]);
}
