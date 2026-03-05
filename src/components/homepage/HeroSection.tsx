'use client';

import * as React from "react";
import { SectionLabel } from "../ui/SectionLabel";
import { GlowButton } from "../ui/GlowButton";
import { DashboardPanel } from "../ui/DashboardPanel";
import { DataRow } from "../ui/DataRow";
import { ThreatNetwork } from "../animations/ThreatNetwork";
import { scrollToSection } from "../../lib/utils";

export function HeroSection() {
  const [promptCount, setPromptCount] = React.useState(340);
  const [highlightIndex, setHighlightIndex] = React.useState<number | null>(
    null,
  );

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    const promptInterval = window.setInterval(() => {
      setPromptCount((prev) => {
        const next = prev + Math.floor(Math.random() * 3) + 1;
        if (next > 365) return 340;
        return next;
      });
    }, 3000);

    const highlightInterval = window.setInterval(() => {
      setHighlightIndex(Math.floor(Math.random() * 6));
      window.setTimeout(() => setHighlightIndex(null), 600);
    }, 4500);

    return () => {
      window.clearInterval(promptInterval);
      window.clearInterval(highlightInterval);
    };
  }, []);
  return (
    <main className="relative flex min-h-screen items-center bg-void text-[var(--color-text-primary)] overflow-hidden">
      <ThreatNetwork />
      <div className="relative z-[2] mx-auto flex w-full max-w-[var(--content-max-width)] flex-col px-[var(--content-padding-x-mobile)] pt-20 md:flex-row md:items-center md:gap-16 md:px-[var(--content-padding-x)]">
        {/* Left side — copy + CTAs */}
        <div className="max-w-[560px] space-y-6 md:flex-1">
          <SectionLabel color="cyan">
            THREAT DETECTED — AI GOVERNANCE GAP
          </SectionLabel>
          <h1 className="text-display">
            Your employees are already using AI.{" "}
            <span style={{ color: "var(--color-cyan)" }}>
              Who&apos;s governing it?
            </span>
          </h1>
          <p className="text-body max-w-[460px]">
            The AI revolution isn&apos;t coming — it&apos;s already inside your
            organization. The question isn&apos;t whether to adopt. It&apos;s
            whether you&apos;ll control what&apos;s already happening, and
            harness what comes next.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <GlowButton href="/contact" variant="primary" size="md">
              BOOK A DISCOVERY CALL
            </GlowButton>
            <button
              type="button"
              className="text-[12px] font-semibold uppercase tracking-[0.13em] text-[var(--color-text-secondary)] transition-colors duration-200 hover:text-[var(--color-text-primary)]"
              onClick={() => scrollToSection("shift")}
            >
              Explore below ↓
            </button>
          </div>
        </div>

        {/* Right side — live dashboard panel */}
        <div className="mt-12 hidden md:flex md:flex-1 md:justify-end md:mt-0">
          <div className="w-[420px] opacity-55">
            <DashboardPanel
              title="ORGANIZATION AI STATUS"
              statusColor="red"
              className="backdrop-blur-md"
            >
              <DataRow
                label="Unapproved AI tools detected"
                value="12"
                valueColor="red"
                className={highlightIndex === 0 ? "bg-[rgba(255,59,59,0.04)]" : ""}
              />
              <DataRow
                label="Departments using shadow AI"
                value="4 / 5"
                valueColor="red"
                className={highlightIndex === 1 ? "bg-[rgba(255,59,59,0.04)]" : ""}
              />
              <DataRow
                label="Data flowing to external models"
                value={`~${promptCount} prompts/day`}
                valueColor="amber"
                className={highlightIndex === 2 ? "bg-[rgba(255,184,0,0.05)]" : ""}
              />
              <DataRow
                label="Governance framework"
                value="None"
                valueColor="red"
                className={highlightIndex === 3 ? "bg-[rgba(255,59,59,0.04)]" : ""}
              />
              <DataRow
                label="AI solutions deployed officially"
                value="0"
                valueColor="red"
                className={highlightIndex === 4 ? "bg-[rgba(255,59,59,0.04)]" : ""}
              />
              <DataRow
                label="Competitive AI readiness"
                value="At risk"
                valueColor="amber"
                className={highlightIndex === 5 ? "bg-[rgba(255,184,0,0.05)]" : ""}
              />
            </DashboardPanel>
          </div>
        </div>
      </div>

      {/* Bottom strip */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-[2] border-t border-[var(--color-border)] bg-[rgba(5,10,18,0.92)]">
        <div className="mx-auto flex max-w-[var(--content-max-width)] flex-wrap items-center gap-4 px-[var(--content-padding-x-mobile)] py-[13px] md:flex-nowrap md:gap-9 md:px-[var(--content-padding-x)]">
          <span className="text-label text-[11px] text-[var(--color-text-muted)]">
            11+ years enterprise program management
          </span>
          <span className="text-label text-[11px] text-[var(--color-text-muted)]">
            $90M+ portfolio across 9+ countries
          </span>
          <span className="text-label text-[11px] text-[var(--color-text-muted)]">
            Governance + AI Solutions in one framework
          </span>
        </div>
      </div>
    </main>
  );
}

