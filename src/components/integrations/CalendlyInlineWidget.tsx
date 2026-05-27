"use client";

import * as React from "react";

const CALENDLY_SCRIPT_SRC =
  "https://assets.calendly.com/assets/external/widget.js";

type CalendlyWindow = Window & {
  Calendly?: {
    initInlineWidget?: (options: {
      url: string;
      parentElement: HTMLElement;
    }) => void;
  };
};

type CalendlyInlineWidgetProps = {
  url: string;
  height: number;
  className?: string;
};

let calendlyScriptPromise: Promise<void> | null = null;

function getCalendly() {
  return (window as CalendlyWindow).Calendly;
}

function loadCalendlyScript() {
  if (getCalendly()?.initInlineWidget) {
    return Promise.resolve();
  }

  if (calendlyScriptPromise) {
    return calendlyScriptPromise;
  }

  calendlyScriptPromise = new Promise((resolve, reject) => {
    const existingScript = document.querySelector<HTMLScriptElement>(
      'script[src*="calendly.com/assets/external/widget.js"]',
    );

    const script = existingScript ?? document.createElement("script");

    script.addEventListener("load", () => resolve(), { once: true });
    script.addEventListener("error", () => reject(), { once: true });

    if (!existingScript) {
      script.src = CALENDLY_SCRIPT_SRC;
      script.async = true;
      document.body.appendChild(script);
    }
  });

  return calendlyScriptPromise;
}

export function CalendlyInlineWidget({
  url,
  height,
  className,
}: CalendlyInlineWidgetProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    let cancelled = false;

    loadCalendlyScript()
      .then(() => {
        if (cancelled) return;

        const parentElement = containerRef.current;
        const calendly = getCalendly();
        if (!parentElement || !calendly?.initInlineWidget) return;

        parentElement.innerHTML = "";
        calendly.initInlineWidget({ url, parentElement });
      })
      .catch(() => {
        // The visible email fallback on contact still gives users a way through.
      });

    return () => {
      cancelled = true;
    };
  }, [url]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ minWidth: 320, height }}
    />
  );
}
