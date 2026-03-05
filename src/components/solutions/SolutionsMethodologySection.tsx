'use client';

import * as React from "react";
import { Section } from "../ui/Section";
import { SectionLabel } from "../ui/SectionLabel";
import { motion, useReducedMotion } from "framer-motion";

type StepProps = {
  color: "cyan" | "amber" | "green";
  icon: string;
  title: string;
  desc: string;
  duration: string;
  delay: number;
};

export function SolutionsMethodologySection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <Section id="process">
      <div className="py-[100px] text-center text-[var(--color-text-primary)]">
        <SectionLabel color="green">HOW WE BUILD</SectionLabel>
        <h2 className="text-h1 mb-4">
          From your pain point to a working solution.
        </h2>
        <p className="text-body mx-auto mb-[48px] max-w-[560px]">
          Every solution follows the same proven process — but customized for
          your specific business context, data, and team.
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
              className="h-px origin-left bg-gradient-to-r from-[var(--color-cyan)] via-[var(--color-amber)] to-[var(--color-green)]"
            />
          </div>

          <Step
            color="cyan"
            icon="🔍"
            title="Discover"
            desc="Identify the business problem, map data sources, interview stakeholders, define success metrics."
            duration="1–2 weeks"
            delay={0}
          />
          <Step
            color="amber"
            icon="⚡"
            title="Prototype"
            desc="Build a working proof-of-concept, demo to stakeholders, iterate based on feedback."
            duration="2–3 weeks"
            delay={0.4}
          />
          <Step
            color="green"
            icon="🚀"
            title="Deploy"
            desc="Production deployment, integration with existing systems, team training, documentation."
            duration="2–4 weeks"
            delay={0.8}
          />
          <Step
            color="cyan"
            icon="📈"
            title="Optimize"
            desc="Monitor performance, gather usage data, fine-tune models, expand capabilities."
            duration="Ongoing"
            delay={1.2}
          />
        </div>
      </div>
    </Section>
  );
}

function Step({
  color,
  icon,
  title,
  desc,
  duration,
  delay,
}: StepProps) {
  const prefersReducedMotion = useReducedMotion();
  const colorMap: Record<
    StepProps["color"],
    { border: string; bg: string; text: string }
  > = {
    cyan: {
      border: "var(--color-cyan)",
      bg: "var(--color-cyan-dim)",
      text: "var(--color-cyan)",
    },
    amber: {
      border: "var(--color-amber)",
      bg: "var(--color-amber-dim)",
      text: "var(--color-amber)",
    },
    green: {
      border: "var(--color-green)",
      bg: "var(--color-green-dim)",
      text: "var(--color-green)",
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
          style={{
            borderColor: c.border,
            backgroundColor: c.bg,
            color: c.text,
          }}
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
    </motion.div>
  );
}

