'use client';

import * as React from "react";
import { motion } from "framer-motion";
import { Section } from "../ui/Section";
import { SectionLabel } from "../ui/SectionLabel";
import { SeverityTag } from "../ui/SeverityTag";

type MetricProps = {
  label: string;
  value: string;
};

type CardProps = {
  title: string;
  severity: "critical" | "elevated";
  code: string;
  body: string;
  metrics: MetricProps[];
  from: "left" | "right";
  delay: number;
};

export function ThreatConsoleSection() {
  return (
    <Section id="threats">
      <div className="py-[100px]">
        <SectionLabel color="red">ACTIVE THREATS</SectionLabel>
        <h2 className="text-h1 mb-10">
          What&apos;s happening inside your organization right now.
        </h2>
        <div className="grid gap-5 md:grid-cols-2">
          <ThreatCard
            title="The Visibility Gap"
            severity="critical"
            code="SEV-1"
            body="Employees are using ChatGPT, Claude, Midjourney, Copilot, and dozens of niche tools. IT has no inventory. Compliance has no policy. Data is flowing into third-party models with zero oversight."
            metrics={[
              { label: "Unapproved tools", value: "12+" },
              { label: "Usage policies", value: "0" },
            ]}
            from="left"
            delay={0}
          />
          <ThreatCard
            title="The Compliance Time Bomb"
            severity="elevated"
            code="SEV-2"
            body="EU AI Act, SOC2, GDPR, HIPAA — regulations are catching up fast. Companies without documented AI governance are sitting on audit landmines."
            metrics={[
              { label: "AI policies documented", value: "0" },
              { label: "Audit exposure", value: "High" },
            ]}
            from="right"
            delay={0.25}
          />
          <ThreatCard
            title="Governance Theater"
            severity="elevated"
            code="SEV-2"
            body="Monthly steering committees, 40-slide status decks, RAG reports everyone ignores. The PMO produces artifacts but doesn't drive decisions."
            metrics={[
              { label: "Slides per status deck", value: "40+" },
              { label: "Decisions driven", value: "~5%" },
            ]}
            from="left"
            delay={0.5}
          />
          <ThreatCard
            title="The Relevance Crisis"
            severity="critical"
            code="SEV-1"
            body="Leadership is questioning the PMO's value. AI is automating the reporting function. If your PMO doesn't evolve, it will be dissolved."
            metrics={[
              { label: "PMOs lacking AI frameworks", value: "67%" },
              { label: "Dissolution risk", value: "Rising" },
            ]}
            from="right"
            delay={0.75}
          />
        </div>
      </div>
    </Section>
  );
}

function ThreatCard({
  title,
  severity,
  code,
  body,
  metrics,
  from,
  delay,
}: CardProps) {
  const [metricValues, setMetricValues] = React.useState(
    metrics.map((m) => ({ ...m, display: m.value })),
  );

  React.useEffect(() => {
    const timers: number[] = [];

    // count-up effect for metrics ~0.8s after card appears
    const t = window.setTimeout(() => {
      metrics.forEach((metric, idx) => {
        const original = metric.value;
        if (!/^\d/.test(original)) return;

        const target = parseInt(original.replace(/[^0-9]/g, ""), 10);
        let current = 0;

        const interval = window.setInterval(() => {
          current += Math.max(1, Math.floor(target / 15));
          if (current >= target) {
            current = target;
            window.clearInterval(interval);
          }
          setMetricValues((prev) =>
            prev.map((m, i) =>
              i === idx ? { ...m, display: `${current}${original.replace(/[0-9]/g, "")}` } : m,
            ),
          );
        }, 50);
        timers.push(interval);
      });
    }, (delay + 0.8) * 1000);

    timers.push(t);
    return () => {
      timers.forEach((id) => window.clearTimeout(id));
    };
  }, [delay, metrics]);

  const xInitial = from === "left" ? -40 : 40;

  return (
    <motion.article
      initial={{ opacity: 0, x: xInitial }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      viewport={{ once: false, margin: "-80px" }}
      className="rounded-[14px] border border-[var(--color-border)] bg-[var(--color-panel)] p-5 shadow-[0_18px_40px_rgba(0,0,0,0.6)]"
    >
      <header className="mb-3 flex items-center justify-between">
        <SeverityTag level={severity}>
          {severity === "critical" ? "CRITICAL" : "ELEVATED"}
        </SeverityTag>
        <span className="text-mono-sm text-[10px] text-[var(--color-text-muted)]">
          {code}
        </span>
      </header>
      <h3 className="text-h3 mb-2">{title}</h3>
      <p className="mb-4 text-[13px] leading-relaxed text-[var(--color-text-secondary)]">
        {body}
      </p>
      <div className="mt-3 flex items-center justify-between border-t border-[var(--color-border)] pt-3 text-[11px] text-[var(--color-text-secondary)]">
        {metricValues.map((m) => (
          <div key={m.label} className="flex flex-col items-start gap-0.5">
            <span className="text-[10px] text-[var(--color-text-muted)]">
              {m.label}
            </span>
            <span className="font-mono font-semibold text-[var(--color-amber)]">
              {m.display}
            </span>
          </div>
        ))}
      </div>
    </motion.article>
  );
}

