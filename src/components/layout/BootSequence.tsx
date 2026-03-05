"use client";

import * as React from "react";

const BOOT_KEY = "chisokulab-booted";

type BootSequenceProps = {
  children: React.ReactNode;
};

export function BootSequence({ children }: BootSequenceProps) {
  const [showOverlay, setShowOverlay] = React.useState(false);
  const [showLine, setShowLine] = React.useState(false);
  const [fadeOverlay, setFadeOverlay] = React.useState(false);
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const hasBooted = window.sessionStorage.getItem(BOOT_KEY) === "true";

    if (prefersReduced || hasBooted) {
      setReady(true);
      return;
    }

    setShowOverlay(true);

    const timers: number[] = [];

    // Step 2: horizontal line appears and expands
    timers.push(
      window.setTimeout(() => {
        setShowLine(true);
      }, 200),
    );

    // Step 3: line fades, background transitions
    timers.push(
      window.setTimeout(() => {
        setFadeOverlay(true);
      }, 400),
    );

    // Step 4/5: remove overlay and reveal content
    timers.push(
      window.setTimeout(() => {
        setShowOverlay(false);
        setReady(true);
        window.sessionStorage.setItem(BOOT_KEY, "true");
      }, 800),
    );

    return () => {
      timers.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  return (
    <div
      className={`relative min-h-screen transition-all duration-500`}
      style={{
        opacity: ready ? 1 : 0,
        transform: ready ? "translateY(0px)" : "translateY(24px)",
      }}
    >
      {children}

      {showOverlay && (
        <div
          className="pointer-events-none fixed inset-0 z-[9998]"
          style={{
            backgroundColor: fadeOverlay ? "rgba(0,0,0,0)" : "#000000",
            transition:
              "background-color var(--duration-normal) var(--ease-out-expo)",
          }}
        >
          <div className="relative flex h-full w-full items-center justify-center">
            <div
              style={{
                height: 1,
                backgroundColor: "var(--color-cyan)",
                boxShadow: "0 0 20px var(--color-cyan-glow)",
                transformOrigin: "center",
                transform: showLine ? "scaleX(1)" : "scaleX(0)",
                transition: `transform var(--duration-normal) var(--ease-out-expo), opacity var(--duration-normal) var(--ease-out-expo)`,
                opacity: fadeOverlay ? 0 : 1,
                width: "100vw",
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

