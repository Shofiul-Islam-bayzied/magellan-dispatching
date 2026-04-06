/** Safe Facebook Pixel — standard event (PageView, Lead, Schedule, etc.) */
export function fbTrack(event: string, params?: Record<string, unknown>) {
  try {
    const fbq = (window as any).fbq;
    if (typeof fbq === "function") {
      params ? fbq("track", event, params) : fbq("track", event);
    }
  } catch {
    // silently ignore if pixel isn't loaded
  }
}

/** Safe Facebook Pixel — custom event (trackCustom) */
export function fbCustomTrack(event: string, params?: Record<string, unknown>) {
  try {
    const fbq = (window as any).fbq;
    if (typeof fbq === "function") {
      params ? fbq("trackCustom", event, params) : fbq("trackCustom", event);
    }
  } catch {
    // silently ignore
  }
}

/** Fire a GA4 event if gtag is present. */
export function gaTrack(eventName: string, params?: Record<string, unknown>) {
  try {
    const gtag = (window as any).gtag;
    if (typeof gtag === "function") {
      gtag("event", eventName, params ?? {});
    }
  } catch {
    // silently ignore
  }
}

/** Push an event to GTM dataLayer if present. */
export function gtmPush(data: Record<string, unknown>) {
  try {
    const dl = (window as any).dataLayer;
    if (Array.isArray(dl)) {
      dl.push(data);
    }
  } catch {
    // silently ignore
  }
}

/** Fire a Microsoft Clarity custom event if Clarity is loaded. */
export function clarityEvent(eventName: string) {
  try {
    const clarity = (window as any).clarity;
    if (typeof clarity === "function") {
      clarity("event", eventName);
    }
  } catch {
    // silently ignore
  }
}

/** Fire the same event across FB + GA4 + Clarity simultaneously. */
export function trackAll(
  fbEvent: string,
  gaEvent: string,
  params?: Record<string, unknown>
) {
  fbTrack(fbEvent, params);
  gaTrack(gaEvent, params);
  clarityEvent(gaEvent);
}
