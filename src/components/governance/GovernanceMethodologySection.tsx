'use client';

import * as React from "react";
import { Section } from "../ui/Section";
import { SectionLabel } from "../ui/SectionLabel";
import { motion, useReducedMotion } from "framer-motion";

type PhaseProps = {
  color: "red" | "amber" | "green";
  icon: string;
  title: string;
  desc: string;
  duration: string;
  deliverable: string;
  delay: number;
};

export function GovernanceMethodologySection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <Section id="methodology">
      <div className="py-[110px] text-center text-[var(--color-text-primary)]">
        <SectionLabel color="cyan">REMEDIATION PROTOCOL</SectionLabel>
        <h2 className="text-h1 mb-4">
          From threat detection to governed operations.
        </h2>
        <p className="text-body mx-auto mb-[50px] max-w-[560px]">
          One engagement. Three phases. Complete control over your AI landscape
          and governance framework.
        </p>

        <div className="relative mx-auto flex max-w-[900px] flex-col gap-10 md:flex-row md:items-start md:gap-8">
          {/* Connecting line */}
          <div className="pointer-events-none absolute left-[8%] right-[8%] top-[96px] hidden h-px md:block">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{
                duration: prefersReducedMotion ? 0 : 1.2,
                ease: [0.16, 1, 0.3, 1],
              }}
              viewport={{ once: !prefersReducedMotion, margin: "-80px" }}
              className="h-px origin-left bg-gradient-to-r from-[var(--color-red)] via-[var(--color-amber)] to-[var(--color-green)]"
            />
          </div>

          <Phase
            color="red"
            icon="⚡"
            title="Detect"
            desc="Audit AI usage, map shadow tools, assess PMO maturity, identify governance gaps."
            duration="2–4 weeks"
            deliverable="AI & Governance Landscape Report with risk scores and priority recommendations."
            delay={0}
          />
          <Phase
            color="amber"
            icon="◆"
            title="Design"
            desc="Build AI governance framework and PMO operating model — tooling, policies, decision rights."
            duration="4–6 weeks"
            deliverable="ChisokuLab Unified Framework Document plus prioritized implementation roadmap."
            delay={0.4}
          />
          <Phase
            color="green"
            icon="✓"
            title="Deploy &amp; Sustain"
            desc="Implement alongside your teams, configure AI tools, operationalize governance, and stay through first governance cycle."
            duration="8–12 weeks"
            deliverable="Live systems, trained teams, and a self-sustaining governance engine."
            delay={0.8}
          />
        </div>
      </div>
    </Section>
  );
}

function Phase({
  color,
  icon,
  title,
  desc,
  duration,
  deliverable,
  delay,
}: PhaseProps) {
  const prefersReducedMotion = useReducedMotion();
  const colorMap: Record<
    PhaseProps["color"],
    { border: string; bg: string; text: string; accent: string }
  > = {
    red: {
      border: "var(--color-red)",
      bg: "var(--color-red-dim)",
      text: "var(--color-red)",
      accent: "var(--color-red-glow)",
    },
    amber: {
      border: "var(--color-amber)",
      bg: "var(--color-amber-dim)",
      text: "var(--color-amber)",
      accent: "var(--color-amber-glow)",
    },
    green: {
      border: "var(--color-green)",
      bg: "var(--color-green-dim)",
      text: "var(--color-green)",
      accent: "var(--color-green-glow)",
    },
  };

  const c = colorMap[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.6,
        delay: prefersReducedMotion ? 0 : delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      viewport={{ once: !prefersReducedMotion, margin: "-80px" }}
      className="flex-1 text-left md:text-center"
    >
      <div className="mb-4 flex items-center justify-center">
        <div
          className="flex h-[50px] w-[50px] items-center justify-center rounded-full border text-[20px]"
          style={{ borderColor: c.border, backgroundColor: c.bg, color: c.text }}
        >
          {icon}
        </div>
      </div>
      <h3 className="text-h3 mb-2 text-center">{title}</h3>
      <p className="text-body mb-3 text-[13px] text-[var(--color-text-secondary)]">
        {desc}
      </p>
      <p className="text-mono-sm mb-2 text-[10px] text-[var(--color-text-muted)]">
        Duration: {duration}
      </p>
      <div
        className="mt-3 border-l-2 pl-4 text-[12px] text-[var(--color-text-secondary)] md:border-l-0 md:border-t-2 md:pt-3 md:pl-0"
        style={{
          borderColor: c.border,
        }}
      >
        <span className="text-[11px] font-semibold text-[var(--color-text-primary)]">
          Deliverable:
        </span>{" "}
        {deliverable}
      </div>
    </motion.div>
  );
}

