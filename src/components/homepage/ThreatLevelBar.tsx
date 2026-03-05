'use client';

import * as React from "react";

export function ThreatLevelBar() {
  const [percent, setPercent] = React.useState(0);

  React.useEffect(() => {
    let frame: number;
    const start = performance.now();
    const duration = 1500;
    const target = 78;

    const animate = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const value = Math.round(eased * target);
      setPercent(value);
      if (t < 1) {
        frame = requestAnimationFrame(animate);
      }
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="relative z-[2] -mt-8 flex w-full justify-center">
      <div className="flex w-full max-w-[var(--content-max-width)] items-center gap-6 rounded-[999px] border border-[var(--color-border)] bg-[rgba(10,18,32,0.96)] px-[24px] py-[10px] text-[11px]">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center rounded-full bg-[var(--color-red-dim)] px-[10px] py-[4px] text-[9px] font-semibold tracking-[0.18em] text-[var(--color-red)]">
            THREAT LEVEL
          </span>
          <span className="text-[11px] text-[var(--color-text-secondary)]">
            Shadow AI exposure across your organization
          </span>
        </div>
        <div className="flex flex-1 items-center gap-3">
          <div className="relative h-[8px] flex-1 overflow-hidden rounded-full bg-[rgba(255,59,59,0.12)]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[var(--color-amber)] via-[var(--color-red)] to-[var(--color-red)]"
              style={{ width: `${percent}%`, transition: "width 0.15s linear" }}
            />
            {/* Alert markers */}
            {[25, 50, 75].map((mark) => (
              <div
                key={mark}
                className="absolute top-0 h-full w-[2px] bg-[rgba(255,255,255,0.3)]"
                style={{ left: `${mark}%` }}
              />
            ))}
          </div>
          <span className="text-mono-sm text-[10px] text-[var(--color-text-secondary)]">
            {percent}%
          </span>
        </div>
      </div>
    </div>
  );
}

