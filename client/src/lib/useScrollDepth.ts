import { useEffect, useRef } from "react";
import { fbCustomTrack, gaTrack, clarityEvent } from "./fbtrack";

/**
 * Fires scroll depth events at 25%, 50%, 75%, and 100% page scroll.
 * Each milestone fires only once per page load.
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
          fbCustomTrack("ScrollDepth", { page: pageName, depth: `${milestone}%` });
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
 * Each fires only once per page load.
 */
export function useTimeOnPage(pageName: string) {
  useEffect(() => {
    const milestones = [15, 30, 60];
    const timers = milestones.map((seconds) =>
      setTimeout(() => {
        fbCustomTrack("TimeOnPage", { page: pageName, seconds });
        gaTrack("time_on_page", { page: pageName, seconds });
      }, seconds * 1000)
    );
    return () => timers.forEach(clearTimeout);
  }, [pageName]);
}
