import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class VercelAnalyticsService {
  constructor() {}

  trackPageview(url: string) {
    const w = window as any;

    // Dispatch a generic custom event any analytics snippet can listen to
    try {
      window.dispatchEvent(new CustomEvent('vc:pageview', { detail: { url } }));
    } catch (e) {
      // ignore
    }

    // Common hooks: try calling likely global trackers if present
    if (typeof w?.vercelAnalytics === 'function') {
      try { w.vercelAnalytics('pageview', { url }); } catch (e) {}
    }

    if (w?.vercelAnalytics?.page) {
      try { w.vercelAnalytics.page(url); } catch (e) {}
    }

    // Fallback: call plausible/gtag/_paq if present (harmless if not)
    if (typeof (w as any).plausible === 'function') {
      try { (w as any).plausible('pageview'); } catch (e) {}
    }

    if (typeof (w as any).gtag === 'function') {
      try { (w as any).gtag('event', 'page_view', { page_path: url }); } catch (e) {}
    }
  }
}
