"use client";

import * as React from "react";
import { track } from "../../lib/track";

/**
 * One listener for every CTA (PRD 11 `cta_click`): elements with `data-cta` report their id, the page, and where
 * they sit (nav, footer, or the section number in the page).
 */
export function CtaTracker() {
  React.useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = (event.target as Element | null)?.closest<HTMLElement>("[data-cta]");
      if (!target?.dataset.cta) return;
      const section = target.closest("main > section");
      const sections = Array.from(section?.parentElement?.children ?? []).filter((node) => node.tagName === "SECTION");
      const placement = target.closest("header, nav")
        ? "nav"
        : target.closest("footer")
          ? "footer"
          : section
            ? `section-${sections.indexOf(section) + 1}`
            : "page";
      track("cta_click", { id: target.dataset.cta, page: window.location.pathname, placement });
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);
  return null;
}
