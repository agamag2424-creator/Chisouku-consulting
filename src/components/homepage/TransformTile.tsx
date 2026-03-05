import * as React from "react";
import Link from "next/link";
import { SeverityTag } from "../ui/SeverityTag";

export function TransformTile() {
  return (
    <Link
      href="/ai-solutions"
      className="group flex flex-col overflow-hidden rounded-[20px] border border-[var(--color-border)] bg-[var(--color-panel)] cursor-pointer transition-all duration-400 hover:-translate-y-1 hover:border-[rgba(0,255,136,0.25)] hover:shadow-[0_0_60px_rgba(0,255,136,0.06)]"
    >
      {/* Visual area */}
      <div className="relative h-[220px] bg-gradient-to-br from-[var(--color-card)] to-[rgba(0,255,136,0.03)] flex items-center justify-center">
        {/* Outer workflow box */}
        <div className="relative flex items-center justify-center rounded-[16px] border border-[rgba(0,255,136,0.25)] bg-[rgba(5,15,22,0.9)] px-6 py-4 shadow-[0_16px_40px_rgba(0,0,0,0.7)]">
          <div className="flex items-center justify-center gap-6">
            <Node label="Input" icon="📧" tone="cyan" />
            <Arrow />
            <Node label="AI Engine" icon="⚡" tone="green" floating />
            <Arrow />
            <Node label="Output" icon="📊" tone="amber" />
          </div>
        </div>

        {/* Data particles */}
        <div className="pointer-events-none absolute inset-x-[12%] top-1/2 h-[2px] -translate-y-1/2 overflow-hidden">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="absolute h-[2px] w-[20px] rounded-full"
              style={{
                background:
                  i % 2 === 0
                    ? "linear-gradient(90deg, rgba(0,212,255,0.6), transparent)"
                    : "linear-gradient(90deg, rgba(0,255,136,0.6), transparent)",
                animation: `flow 3s linear ${i * 0.8}s infinite`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Content area */}
      <div className="px-7 py-7 space-y-4">
        <SeverityTag level="resolved" className="tracking-[0.16em]">
          TRANSFORM
        </SeverityTag>
        <h3 className="text-h3">
          Build AI Solutions That Actually Deliver Value
        </h3>
        <p className="text-[13px] leading-relaxed text-[var(--color-text-secondary)]">
          Email intelligence. Operations bots. Document automation. Custom AI
          solutions designed for your specific business problems — with
          governance built in.
        </p>
        <div className="mt-2 flex flex-wrap gap-2 text-[9px] font-semibold tracking-[0.08em] uppercase">
          {[
            "Email Analyst",
            "HR & Ops Bot",
            "Meeting Intelligence",
            "Document Automation",
            "Custom Solutions",
          ].map((pill) => (
            <span
              key={pill}
              className="rounded-full border border-[var(--color-border)] px-[10px] py-[4px] text-[var(--color-text-muted)] transition-colors duration-200 group-hover:border-[var(--color-green)] group-hover:text-[var(--color-green)]"
            >
              {pill}
            </span>
          ))}
        </div>
        <div className="mt-3 text-[12px] font-semibold text-[var(--color-green)] tracking-[0.06em] uppercase">
          <span className="inline-flex items-center gap-1 transition-transform duration-200 group-hover:translate-x-1">
            Explore AI Solutions →
          </span>
        </div>
      </div>
    </Link>
  );
}

type NodeProps = {
  label: string;
  icon: string;
  tone: "cyan" | "green" | "amber";
  floating?: boolean;
};

function Node({ label, icon, tone, floating }: NodeProps) {
  const borderColor =
    tone === "cyan"
      ? "rgba(0,212,255,0.3)"
      : tone === "green"
      ? "rgba(0,255,136,0.3)"
      : "rgba(255,184,0,0.3)";
  const bgColor =
    tone === "cyan"
      ? "var(--color-cyan-dim)"
      : tone === "green"
      ? "var(--color-green-dim)"
      : "var(--color-amber-dim)";
  const iconColor =
    tone === "cyan"
      ? "var(--color-cyan)"
      : tone === "green"
      ? "var(--color-green)"
      : "var(--color-amber)";

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="flex h-[44px] w-[44px] items-center justify-center rounded-[10px] border text-[16px]"
        style={{
          borderColor,
          backgroundColor: bgColor,
          color: iconColor,
          animation: floating ? "float-node 4s ease-in-out infinite" : undefined,
        }}
      >
        {icon}
      </div>
      <span className="text-label text-[8px] text-[var(--color-text-muted)]">
        {label}
      </span>
    </div>
  );
}

function Arrow() {
  return (
    <span className="text-[14px] text-[var(--color-text-muted)] opacity-60">
      →
    </span>
  );
}

