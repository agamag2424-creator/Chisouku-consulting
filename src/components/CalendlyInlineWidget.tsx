"use client";

import * as React from "react";

const CALENDLY_SCRIPT_SRC =
  "https://assets.calendly.com/assets/external/widget.js";
const CALENDLY_READY_TIMEOUT_MS = 10000;

type CalendlyApi = {
  initInlineWidget?: (options: {
    url: string;
    parentElement: HTMLElement;
  }) => void;
};

type WindowWithCalendly = Window & {
  Calendly?: CalendlyApi;
};

type CalendlyInlineWidgetProps = {
  url: string;
  className?: string;
  style?: React.CSSProperties;
};

function isCalendlyReady() {
  return Boolean(
    (window as WindowWithCalendly).Calendly?.initInlineWidget,
  );
}

function ensureCalendlyScript() {
  const existingScript = document.querySelector<HTMLScriptElement>(
    `script[src="${CALENDLY_SCRIPT_SRC}"]`,
  );

  if (existingScript) {
    return;
  }

  const script = document.createElement("script");
  script.src = CALENDLY_SCRIPT_SRC;
  script.async = true;
  document.body.appendChild(script);
}

function waitForCalendlyReady() {
  return new Promise<void>((resolve, reject) => {
    if (isCalendlyReady()) {
      resolve();
      return;
    }

    const startedAt = window.performance.now();
    const intervalId = window.setInterval(() => {
      if (isCalendlyReady()) {
        window.clearInterval(intervalId);
        resolve();
        return;
      }

      if (window.performance.now() - startedAt > CALENDLY_READY_TIMEOUT_MS) {
        window.clearInterval(intervalId);
        reject(new Error("Calendly widget script did not initialize."));
      }
    }, 50);
  });
}

export function CalendlyInlineWidget({
  url,
  className,
  style,
}: CalendlyInlineWidgetProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    let isMounted = true;

    ensureCalendlyScript();

    void waitForCalendlyReady()
      .then(() => {
        if (!isMounted || !containerRef.current) {
          return;
        }

        containerRef.current.replaceChildren();
        (window as WindowWithCalendly).Calendly?.initInlineWidget?.({
          url,
          parentElement: containerRef.current,
        });
      })
      .catch(() => {
        // Leave the external booking link visible if Calendly is blocked.
      });

    return () => {
      isMounted = false;
      containerRef.current?.replaceChildren();
    };
  }, [url]);

  return (
    <div
      ref={containerRef}
      className={className}
      data-url={url}
      style={style}
    >
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[13px] text-[var(--color-cyan)] underline-offset-2 hover:underline"
      >
        Open the scheduling page
      </a>
    </div>
  );
}
