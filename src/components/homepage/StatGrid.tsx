'use client';

import * as React from "react";

type StatConfig = {
  id: string;
  final: string;
  label: string;
  source: string;
};

const stats: StatConfig[] = [
  {
    id: "stat-1",
    final: "78%",
    label: "employees using unapproved AI tools",
    source: "Salesforce / Microsoft",
  },
  {
    id: "stat-2",
    final: "$4.2M",
    label: "avg breach cost from ungoverned AI",
    source: "IBM Cost of Data Breach",
  },
  {
    id: "stat-3",
    final: "67%",
    label: "PMOs with no AI-aware frameworks",
    source: "PMI Pulse of Profession",
  },
  {
    id: "stat-4",
    final: "< 3%",
    label: "mid-market with formal AI governance",
    source: "Deloitte AI Institute",
  },
];

export function StatGrid() {
  const [values, setValues] = React.useState(
    stats.map((stat) => ({ id: stat.id, value: stat.final, locked: false })),
  );
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const timersRef = React.useRef<number[]>([]);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const resetTimers = () => {
      timersRef.current.forEach((id) => window.clearTimeout(id));
      timersRef.current = [];
    };

    const runAnimation = () => {
      if (prefersReduced) return;

      // reset values and locks
      setValues(
        stats.map((stat) => ({ id: stat.id, value: stat.final, locked: false })),
      );

      stats.forEach((stat, index) => {
        const startDelay = 150 + index * 150;
        const duration = 500;

        const timeoutId = window.setTimeout(() => {
          const intervalId = window.setInterval(() => {
            setValues((prev) =>
              prev.map((item) => {
                if (item.id !== stat.id || item.locked) return item;
                return {
                  ...item,
                  value: generateRandomLike(stat.final),
                };
              }),
            );
          }, 100);

          timersRef.current.push(intervalId);

          const lockId = window.setTimeout(() => {
            setValues((prev) =>
              prev.map((item) =>
                item.id === stat.id
                  ? { ...item, value: stat.final, locked: true }
                  : item,
              ),
            );
            window.clearInterval(intervalId);
          }, duration);

          timersRef.current.push(lockId);
        }, startDelay);

        timersRef.current.push(timeoutId);
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            resetTimers();
            runAnimation();
          } else {
            resetTimers();
          }
        });
      },
      { threshold: 0.3 },
    );

    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
      resetTimers();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="mt-14 rounded-[12px] bg-[var(--color-border-light)] p-px"
    >
      <div className="grid grid-cols-1 overflow-hidden rounded-[11px] bg-[var(--color-panel)] sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const current = values.find((v) => v.id === stat.id)?.value ?? stat.final;
          return (
            <div
              key={stat.id}
              className="border-[var(--color-border)] bg-[var(--color-panel)] p-6 text-center transition-colors duration-300 hover:bg-[var(--color-card)]"
              style={{ borderRightWidth: 1, borderBottomWidth: 1 }}
            >
              <div className="text-stat-lg mb-3">{current}</div>
              <div className="text-[11px] text-[var(--color-text-secondary)] mb-2">
                {stat.label}
              </div>
              <div className="text-[9px] italic text-[var(--color-text-muted)]">
                {stat.source}
              </div>
              {/* Simple scanline accent */}
              <div className="mt-3 h-px w-full bg-gradient-to-r from-transparent via-[rgba(0,212,255,0.25)] to-transparent opacity-40" />
            </div>
          );
        })}
      </div>
    </div>
  );
}

function generateRandomLike(template: string): string {
  if (template.endsWith("%")) {
    const base = parseInt(template.replace(/[^0-9]/g, ""), 10);
    const jitter = Math.floor(Math.random() * 90);
    return `${Math.max(1, (base + jitter) % 100)}%`;
  }

  if (template.startsWith("$")) {
    const millions = Math.random() * 8 + 0.5;
    return `$${millions.toFixed(1)}M`;
  }

  if (template.includes("<")) {
    return "< 3%";
  }

  return template;
}

