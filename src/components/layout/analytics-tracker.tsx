"use client";

import { useEffect, useCallback } from "react";

export function AnalyticsTracker() {
  const trackEvent = useCallback(async (eventType: string, page: string, metadata?: Record<string, string>) => {
    try {
      await fetch("/api/analytics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventType, page, metadata }),
      });
    } catch {
      // Silently fail - analytics should never break the site
    }
  }, []);

  // Track page views
  useEffect(() => {
    trackEvent("page_view", window.location.pathname, {
      referrer: document.referrer || "direct",
    });
  }, [trackEvent]);

  // Track button clicks globally
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const button = target.closest("a, button");
      if (!button) return;

      const label =
        button.getAttribute("data-track") ||
        button.getAttribute("aria-label") ||
        button.textContent?.trim().slice(0, 50) ||
        "unknown";

      trackEvent("button_click", window.location.pathname, {
        label,
        href: button.getAttribute("href") || "",
      });
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [trackEvent]);

  return null;
}
