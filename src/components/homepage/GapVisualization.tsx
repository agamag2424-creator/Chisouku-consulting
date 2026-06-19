'use client';

import * as React from "react";

export function GapVisualization() {
  const [linesVisible, setLinesVisible] = React.useState(false);
  const [bridgeVisible, setBridgeVisible] = React.useState(false);
  const [labelVisible, setLabelVisible] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const timersRef = React.useRef<number[]>([]);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const clearTimers = () => {
      timersRef.current.forEach((id) => window.clearTimeout(id));
      timersRef.current = [];
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setLinesVisible(true);
            if (!prefersReduced) {
              clearTimers();
              timersRef.current.push(
                window.setTimeout(() => setBridgeVisible(true), 3500),
              );
              timersRef.current.push(
                window.setTimeout(() => setLabelVisible(true), 5000),
              );
            } else {
              setBridgeVisible(true);
              setLabelVisible(true);
            }
          } else {
            clearTimers();
            setLinesVisible(false);
            setBridgeVisible(false);
            setLabelVisible(false);
          }
        });
      },
      { threshold: 0.3 },
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => {
      observer.disconnect();
      clearTimers();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative mx-auto mt-12 h-[320px] max-w-[900px] overflow-hidden rounded-[16px] bg-gradient-to-b from-[rgba(5,10,18,1)] via-[rgba(10,18,32,0.95)] to-[rgba(5,10,18,1)] px-6"
    >
      {/* Top trajectory line */}
      <div
        className="absolute left-0 right-0 h-[2px] top-[60px] origin-left"
        style={{
          background:
            "linear-gradient(90deg, var(--color-cyan), var(--color-green))",
          boxShadow: "0 0 12px var(--color-cyan-glow)",
          transform: linesVisible ? "scaleX(1)" : "scaleX(0)",
          transition: "transform 2s var(--ease-out-expo)",
        }}
      />

      {/* Bottom trajectory line */}
      <div
        className="absolute left-0 right-0 top-[220px] hidden h-[2px] origin-left opacity-70 md:block"
        style={{
          background:
            "linear-gradient(90deg, var(--color-amber), var(--color-red))",
          boxShadow: "0 0 8px var(--color-red-glow)",
          transform: linesVisible ? "scaleX(1)" : "scaleX(0)",
          transition: "transform 2s var(--ease-out-expo)",
          transitionDelay: "0.3s",
        }}
      />

      {/* Trajectory labels (desktop only) */}
      <div className="hidden md:block">
        <div className="absolute right-4 top-[40px]">
          <span className="text-label text-[10px] text-[var(--color-cyan)]">
            WHERE AI IS HEADING →
          </span>
        </div>
        <div className="absolute right-4 top-[200px]">
          <span className="text-label text-[10px] text-[var(--color-red)]">
            WHERE MOST ORGANIZATIONS ARE →
          </span>
        </div>
      </div>

      {/* Floating tags (hidden on mobile) */}
      <div className="hidden md:block">
        <FloatingTag
          text="Autonomous workflows"
          color="cyan"
          style={{ top: 28, left: 80 }}
          delay={0}
        />
        <FloatingTag
          text="Predictive decisions"
          color="green"
          style={{ top: 10, left: 260 }}
          delay={0.5}
        />
        <FloatingTag
          text="AI-native operations"
          color="cyan"
          style={{ top: 40, left: 440 }}
          delay={1}
        />
        <FloatingTag
          text="Governed intelligence"
          color="green"
          style={{ top: 20, left: 640 }}
          delay={1.5}
        />

        <FloatingTag
          text="Shadow AI sprawl"
          color="red"
          style={{ top: 190, left: 60 }}
          delay={0.4}
        />
        <FloatingTag
          text="Manual reporting"
          color="amber"
          style={{ top: 205, left: 260 }}
          delay={0.8}
        />
        <FloatingTag
          text="Framework fatigue"
          color="red"
          style={{ top: 225, left: 450 }}
          delay={1.2}
        />
        <FloatingTag
          text="Governance theater"
          color="amber"
          style={{ top: 210, left: 645 }}
          delay={1.6}
        />
      </div>

      {/* Gap area */}
      <div
        className="absolute left-0 right-0"
        style={{
          top: 80,
          bottom: 80,
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 10px, rgba(255,59,59,0.02) 10px, rgba(255,59,59,0.02) 11px)",
        }}
      >
        <div className="flex h-full items-center justify-center">
          <span className="text-mono-sm text-[13px] tracking-[0.1em] text-[rgba(255,59,59,0.4)]">
            THE GAP IS WIDENING
          </span>
        </div>
      </div>

      {/* Bridge line */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          style={{
            width: 2,
            height: bridgeVisible ? "162px" : 0,
            background:
              "linear-gradient(180deg, var(--color-cyan), var(--color-green))",
            boxShadow: "0 0 16px var(--color-cyan-glow)",
            transition: "height 1.5s var(--ease-out-expo)",
          }}
        />
      </div>

      {/* Bridge label */}
      {labelVisible && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="mt-[-90px] rounded-full border border-[var(--color-cyan-dim)] bg-[var(--color-void)] px-6 py-2">
            <span className="text-label text-[10px] text-[var(--color-cyan)]">
              CHISOKULAB CLOSES THE GAP
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

type FloatingTagProps = {
  text: string;
  color: "cyan" | "green" | "red" | "amber";
  style: React.CSSProperties;
  delay?: number;
};

function FloatingTag({ text, color, style, delay = 0 }: FloatingTagProps) {
  const colorMap: Record<
    FloatingTagProps["color"],
    { border: string; bg: string; text: string }
  > = {
    cyan: {
      border: "rgba(0,212,255,0.3)",
      bg: "rgba(0,212,255,0.08)",
      text: "var(--color-cyan)",
    },
    green: {
      border: "rgba(0,255,136,0.3)",
      bg: "rgba(0,255,136,0.08)",
      text: "var(--color-green)",
    },
    red: {
      border: "rgba(255,59,59,0.3)",
      bg: "rgba(255,59,59,0.08)",
      text: "var(--color-red)",
    },
    amber: {
      border: "rgba(255,184,0,0.3)",
      bg: "rgba(255,184,0,0.08)",
      text: "var(--color-amber)",
    },
  };

  const c = colorMap[color];

  return (
    <div
      className="absolute rounded-full border px-3 py-1 text-[10px] font-medium"
      style={{
        ...style,
        borderColor: c.border,
        backgroundColor: c.bg,
        color: c.text,
        animation: `float-tag 4s ease-in-out ${delay}s infinite`,
      }}
    >
      {text}
    </div>
  );
}

