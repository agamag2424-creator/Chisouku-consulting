import * as React from "react";
import Link from "next/link";
import { SeverityTag } from "../ui/SeverityTag";

export function GovernTile() {
  return (
    <Link
      href="/ai-governance"
      className="group flex flex-col overflow-hidden rounded-[20px] border border-[var(--color-border)] bg-[var(--color-panel)] cursor-pointer transition-all duration-400 hover:-translate-y-1 hover:border-[rgba(0,212,255,0.25)] hover:shadow-[0_0_60px_rgba(0,212,255,0.06)]"
    >
      {/* Visual area */}
      <div className="relative h-[220px] bg-gradient-to-br from-[var(--color-card)] to-[var(--color-panel)] flex items-center justify-center">
        {/* Mini dashboard mockup */}
        <div className="scale-90 rounded-[14px] border border-[var(--color-border)] bg-[rgba(5,10,24,0.96)] px-4 py-3 w-[280px] shadow-[0_18px_40px_rgba(0,0,0,0.7)]">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-label text-[9px] text-[var(--color-text-secondary)]">
              GOVERNANCE DASHBOARD
            </span>
            <span className="h-[8px] w-[8px] rounded-full bg-[var(--color-red)] shadow-[0_0_10px_var(--color-red-glow)]" />
          </div>
          <div className="space-y-1.5 text-[11px] text-[var(--color-text-secondary)]">
            <Row label="Shadow AI tools" value="12" tone="red" />
            <Row label="Policies in place" value="0" tone="red" />
            <Row label="Compliance score" value="23%" tone="amber" />
            <Row label="PMO AI readiness" value="None" tone="red" />
          </div>
          {/* Meter bar */}
          <div className="mt-3 h-[6px] w-full rounded-full bg-[rgba(255,184,0,0.12)] overflow-hidden">
            <div className="h-full w-[78%] rounded-full bg-gradient-to-r from-[var(--color-amber)] to-[var(--color-red)] transition-all duration-700 group-hover:w-[82%]" />
          </div>
        </div>

        {/* Floating threat dots */}
        <Dot top="26%" left="18%" color="red" />
        <Dot top="18%" left="58%" color="amber" />
        <Dot top="68%" left="28%" color="amber" />
        <Dot top="70%" left="72%" color="red" />
        <Dot top="40%" left="85%" color="red" />
      </div>

      {/* Content area */}
      <div className="px-7 py-7 space-y-4">
        <SeverityTag level="info" className="tracking-[0.16em]">
          GOVERN
        </SeverityTag>
        <h3 className="text-h3">
          Control the AI Already Inside Your Organization
        </h3>
        <p className="text-[13px] leading-relaxed text-[var(--color-text-secondary)]">
          Shadow AI audit. Governance frameworks. PMO modernization.
          Compliance readiness. Turn ungoverned chaos into a controlled,
          measurable system.
        </p>
        <div className="mt-2 flex flex-wrap gap-2 text-[9px] font-semibold tracking-[0.08em] uppercase">
          {[
            "Shadow AI Mapping",
            "Policy Design",
            "Compliance",
            "Risk Assessment",
            "PMO Evolution",
          ].map((pill) => (
            <span
              key={pill}
              className="rounded-full border border-[var(--color-border)] px-[10px] py-[4px] text-[var(--color-text-muted)] transition-colors duration-200 group-hover:border-[var(--color-cyan)] group-hover:text-[var(--color-cyan)]"
            >
              {pill}
            </span>
          ))}
        </div>
        <div className="mt-3 text-[12px] font-semibold text-[var(--color-cyan)] tracking-[0.06em] uppercase">
          <span className="inline-flex items-center gap-1 transition-transform duration-200 group-hover:translate-x-1">
            Explore AI Governance →
          </span>
        </div>
      </div>
    </Link>
  );
}

type RowProps = {
  label: string;
  value: string;
  tone: "red" | "amber";
};

function Row({ label, value, tone }: RowProps) {
  const color =
    tone === "red" ? "var(--color-red)" : "var(--color-amber)";
  return (
    <div className="flex items-center justify-between">
      <span className="text-[10px] text-[var(--color-text-secondary)]">
        {label}
      </span>
      <span
        className="text-[11px] font-mono font-semibold"
        style={{ color }}
      >
        {value}
      </span>
    </div>
  );
}

type DotProps = {
  top: string;
  left: string;
  color: "red" | "amber";
};

function Dot({ top, left, color }: DotProps) {
  const bg =
    color === "red" ? "var(--color-red)" : "var(--color-amber)";
  const glow =
    color === "red" ? "var(--color-red-glow)" : "var(--color-amber-glow)";
  return (
    <span
      className="absolute h-[6px] w-[6px] rounded-full"
      style={{
        top,
        left,
        backgroundColor: bg,
        boxShadow: `0 0 16px ${glow}`,
        animation: "pulse 2.4s ease-in-out infinite",
      }}
    />
  );
}

