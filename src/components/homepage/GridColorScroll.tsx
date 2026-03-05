'use client';

import * as React from "react";

export function GridColorScroll() {
  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) return;

    let ticking = false;

    const updateGridColor = () => {
      const doc = document.documentElement;
      const scrollTop = window.scrollY || doc.scrollTop || 0;
      const docHeight = doc.scrollHeight - window.innerHeight || 1;
      const progress = Math.min(1, Math.max(0, scrollTop / docHeight));

      let color: string;
      if (progress < 0.2) {
        // Act 1 (Hero) — faint red
        color = "rgba(255, 59, 59, 0.015)";
      } else if (progress < 0.5) {
        // Act 1.5–2 — amber
        color = "rgba(255, 184, 0, 0.018)";
      } else if (progress < 0.75) {
        // Act 3 — cyan (default)
        color = "rgba(0, 212, 255, 0.018)";
      } else {
        // Act 4 — faint green
        color = "rgba(0, 255, 136, 0.015)";
      }

      doc.style.setProperty("--grid-color", color);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(updateGridColor);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    // initial set
    updateGridColor();

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return null;
}

