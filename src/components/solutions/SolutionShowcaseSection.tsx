'use client';

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Section } from "../ui/Section";
import { SectionLabel } from "../ui/SectionLabel";

type SolutionCardProps = {
  tag: "INTELLIGENCE" | "AUTOMATION" | "CUSTOM";
  title: string;
  description: string;
  roi: string;
  visual: React.ReactNode;
  isCustom?: boolean;
};

const cards: SolutionCardProps[] = [
  {
    tag: "INTELLIGENCE",
    title: "Email Intelligence Analyst",
    description:
      "AI reads, prioritizes, and drafts responses for leadership team email. Surfaces what matters, drafts what's routine.",
    roi: "Saves ~15 hrs/week per executive",
    visual: null, // placeholder, built inline below
  },
  {
    tag: "AUTOMATION",
    title: "HR & Operations Bot",
    description:
      "Employees ask natural language questions about policies, shifts, leave balances, and get instant answers from company docs.",
    roi: "Reduces HR ticket volume by ~60%",
    visual: null,
  },
  {
    tag: "INTELLIGENCE",
    title: "Meeting Intelligence System",
    description:
      "Records, transcribes, and summarizes every meeting. Extracts action items and tracks completion across governance cycles.",
    roi: "Zero meetings without documented outcomes",
    visual: null,
  },
  {
    tag: "AUTOMATION",
    title: "Document & Proposal Generator",
    description:
      "Takes client briefs or RFPs and generates first-draft proposals from your templates, past wins, and capabilities.",
    roi: "Cuts proposal turnaround from 5 days to 5 hours",
    visual: null,
  },
  {
    tag: "INTELLIGENCE",
    title: "Customer Intelligence Dashboard",
    description:
      "Analyzes customer communications to surface churn risk, upsell opportunities, sentiment trends, and recurring issues.",
    roi: "Identifies revenue at risk before it churns",
    visual: null,
  },
  {
    tag: "AUTOMATION",
    title: "Compliance & Policy Monitor",
    description:
      "Continuously monitors communications and documents for compliance risks, policy violations, and regulatory exposure.",
    roi: "Governance meets automation — real-time compliance",
    visual: null,
  },
  {
    tag: "CUSTOM",
    title: "Your Custom AI Solution",
    description:
      "Don't see your exact need? Tell us your biggest operational bottleneck. We'll design and build a custom AI solution in weeks, not months.",
    roi: "Request a Custom Demo →",
    visual: null,
    isCustom: true,
  },
];

export function SolutionShowcaseSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <Section id="solutions">
      <div className="py-[100px]">
        <div className="mx-auto mb-8 max-w-[600px] text-center">
          <SectionLabel color="cyan">SOLUTION SHOWCASE</SectionLabel>
          <h2 className="text-h1 mb-4">
            AI solutions designed for mid-market operations.
          </h2>
          <p className="text-body">
            Each solution is built for real business impact — not AI for AI&apos;s
            sake. Click any solution to see what it does, how it works, and what
            it delivers.
          </p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, index) => (
            <motion.article
              key={card.title}
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 24 }}
              whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
              transition={
                prefersReducedMotion
                  ? undefined
                  : {
                      duration: 0.5,
                      delay: index * 0.1,
                      ease: [0.16, 1, 0.3, 1],
                    }
              }
              viewport={{ once: !prefersReducedMotion, margin: "-80px" }}
              className={`flex h-full flex-col overflow-hidden rounded-[16px] border bg-[var(--color-panel)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(0,212,255,0.04)] ${
                card.isCustom
                  ? "border-dashed border-[var(--color-border-light)] bg-[var(--color-card)]"
                  : "border-[var(--color-border)]"
              }`}
            >
              <div className="relative h-[140px] bg-[var(--color-card)]">
                {renderVisualFor(card.title, card.isCustom)}
              </div>
              <div className="flex flex-1 flex-col px-5 py-5">
                <span className="mb-2 inline-flex items-center rounded-full border border-[var(--color-border-light)] px-[10px] py-[4px] text-[9px] font-semibold tracking-[0.12em] uppercase text-[var(--color-text-muted)]">
                  {card.tag}
                </span>
                <h3 className="text-h3 mb-2">{card.title}</h3>
                <p className="mb-4 text-[12px] leading-relaxed text-[var(--color-text-secondary)]">
                  {card.description}
                </p>
                <div className="mt-auto text-[12px] font-mono font-semibold text-[var(--color-green)]">
                  {card.isCustom ? (
                    <span className="text-[var(--color-amber)]">
                      Request a Custom Demo →
                    </span>
                  ) : (
                    card.roi
                  )}
                </div>
                {!card.isCustom && (
                  <div className="mt-2 text-[12px] font-semibold text-[var(--color-cyan)]">
                    Learn more →
                  </div>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </Section>
  );
}

function renderVisualFor(title: string, isCustom?: boolean): React.ReactNode {
  if (isCustom) {
    return (
      <div className="flex h-full items-center justify-center bg-[var(--color-card)]">
        <div className="flex h-[56px] w-[56px] items-center justify-center rounded-full border border-[var(--color-amber)] bg-[rgba(255,184,0,0.08)] text-[26px] text-[var(--color-amber)] shadow-[0_0_22px_rgba(255,184,0,0.3)]">
          ?
        </div>
      </div>
    );
  }

  if (title === "Email Intelligence Analyst") {
    return (
      <div className="flex h-full items-center justify-center bg-[rgba(5,15,28,0.95)]">
        <div className="w-[90%] max-w-[260px] rounded-[10px] border border-[var(--color-border)] bg-[var(--color-panel)] p-3">
          {["Re: Q4 forecast", "New vendor inquiry", "Internal update"].map(
            (subject, i) => (
              <div
                key={subject}
                className={`mb-2 flex items-center justify-between rounded-[6px] px-2 py-1 ${
                  i === 1
                    ? "bg-[rgba(0,212,255,0.12)] shadow-[0_0_12px_rgba(0,212,255,0.25)]"
                    : ""
                }`}
              >
                <span className="text-[11px] text-[var(--color-text-secondary)]">
                  {subject}
                </span>
                {i === 1 && (
                  <span className="text-[9px] font-mono text-[var(--color-cyan)]">
                    AI
                  </span>
                )}
              </div>
            ),
          )}
        </div>
      </div>
    );
  }

  if (title === "HR & Operations Bot") {
    return (
      <div className="flex h-full items-center justify-center bg-[rgba(5,15,28,0.95)]">
        <div className="w-[90%] max-w-[260px] space-y-2">
          <div className="self-start rounded-[10px] bg-[var(--color-card)] px-3 py-2 text-left">
            <p className="text-[11px] text-[var(--color-text-secondary)]">
              What&apos;s my remaining leave balance?
            </p>
          </div>
          <div className="self-end rounded-[10px] bg-[rgba(0,255,136,0.12)] px-3 py-2 text-left">
            <p className="text-[11px] text-[var(--color-green)]">
              You have 7 days of annual leave remaining.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (title === "Meeting Intelligence System") {
    return (
      <div className="flex h-full items-center justify-center bg-[rgba(5,15,28,0.95)]">
        <div className="w-[90%] max-w-[260px] rounded-[10px] border border-[var(--color-border)] bg-[var(--color-panel)] p-3 text-left">
          <div className="mb-2 h-[6px] w-[40%] rounded-full bg-[var(--color-border-light)]" />
          <div className="space-y-1">
            {["Discuss Q2 OKRs", "Confirm launch date", "Assign owners"].map(
              (item) => (
                <div
                  key={item}
                  className="rounded-[4px] bg-[rgba(255,184,0,0.12)] px-2 py-1 text-[10px] text-[var(--color-amber)]"
                >
                  {item}
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    );
  }

  if (title === "Document & Proposal Generator") {
    return (
      <div className="flex h-full items-center justify-center bg-[rgba(5,15,28,0.95)]">
        <div className="flex w-[90%] max-w-[260px] items-center justify-between gap-4">
          <div className="h-[60px] w-[40%] rounded-[8px] border border-[var(--color-border)] bg-[var(--color-card)]" />
          <div className="h-[70px] w-[45%] rounded-[8px] border border-[var(--color-cyan)] bg-[rgba(0,212,255,0.06)]" />
        </div>
      </div>
    );
  }

  if (title === "Customer Intelligence Dashboard") {
    return (
      <div className="flex h-full items-center justify-center bg-[rgba(5,15,28,0.95)]">
        <div className="w-[90%] max-w-[260px] rounded-[10px] border border-[var(--color-border)] bg-[var(--color-panel)] p-3">
          <div className="mb-2 flex gap-1">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="flex-1 rounded-[3px] bg-[var(--color-cyan-dim)]"
                style={{ height: 10 + i * 6 }}
              />
            ))}
          </div>
          <div className="h-[2px] w-full rounded-full bg-gradient-to-r from-[var(--color-amber)] to-[var(--color-red)]" />
        </div>
      </div>
    );
  }

  if (title === "Compliance & Policy Monitor") {
    return (
      <div className="flex h-full items-center justify-center bg-[rgba(5,15,28,0.95)]">
        <div className="flex items-center gap-3">
          <div className="flex h-[32px] w-[32px] items-center justify-center rounded-full border border-[var(--color-amber)] bg-[rgba(255,184,0,0.1)] text-[16px] text-[var(--color-amber)]">
            🛡️
          </div>
          <div className="space-y-1">
            <div className="h-[6px] w-[60px] rounded-full bg-[var(--color-border-light)]" />
            <div className="h-[6px] w-[40px] rounded-full bg-[var(--color-border-light)]" />
          </div>
        </div>
      </div>
    );
  }

  return null;
}

