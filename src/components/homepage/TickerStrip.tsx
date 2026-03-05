'use client';

import * as React from "react";

const items = [
  {
    value: "92%",
    text: "of Fortune 500 have active AI initiatives",
  },
  {
    value: "2026",
    text: "EU AI Act enforcement begins",
  },
  {
    value: "18-24mo",
    text: "mid-market AI adoption lag behind enterprise",
  },
  {
    value: "$4.2M",
    text: "avg cost of ungoverned AI data breach",
  },
  {
    value: "78%",
    text: "of employees use unapproved AI tools",
  },
  {
    value: "67%",
    text: "of PMOs lack AI-aware frameworks",
  },
];

export function TickerStrip() {
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <div className="w-full border-y border-[var(--color-border)] py-4 overflow-hidden bg-[rgba(5,10,24,0.9)]">
      <div
        className="flex min-w-max items-center gap-12 whitespace-nowrap"
        style={
          prefersReducedMotion
            ? undefined
            : {
                animation: "ticker-scroll 30s linear infinite",
              }
        }
      >
        {[...items, ...items].map((item, index) => (
          <div
            key={`${item.value}-${index}`}
            className="flex items-center gap-3 text-[12px]"
          >
            <span className="font-mono text-[16px] font-bold text-[var(--color-cyan)]">
              {item.value}
            </span>
            <span className="font-medium text-[var(--color-text-secondary)]">
              {item.text}
            </span>
            <span className="text-[10px] text-[var(--color-text-muted)]">•</span>
          </div>
        ))}
      </div>
    </div>
  );
}

