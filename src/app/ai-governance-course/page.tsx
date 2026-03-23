import type { Metadata } from "next";
import { Section } from "../../components/ui/Section";
import { SectionLabel } from "../../components/ui/SectionLabel";
import { CourseWaitlistForm } from "../../components/course/CourseWaitlistForm";

export const metadata: Metadata = {
  title: "Unshakeable Decisions | Module 1 Waitlist",
  description:
    "Join the waitlist for Module 1 of ChisokuLab's Unshakeable Decisions program and get informed about upcoming modules in the pipeline.",
};

const moduleOneChapters = [
  "The 4pm Crisis - Why today feels impossible",
  "The Decision Explosion - What the data reveals",
  "The Three Types Framework - Your core sorting tool",
  "Operational & Mechanical Decisions - What to delegate and automate",
  "The Framework in Action - Real scenario walkthrough",
  "The Decision Audit Process - Track before you fix",
  "Calculating Your Recovery - Find your 6-8 hours",
  "The Energy Equation - Good vs depleting exhaustion",
  "Your Next Steps - Action items and downloads",
];

const moduleRoadmap = [
  "Module 02: The Clarity Filter Framework",
  "Module 03: The Energy Audit",
  "Module 04: The Detachment Principle",
  "Module 05: Building Decision Resilience",
  "Module 06: Human Decisions in an AI World",
  "Module 07: The Source - Ancient Wisdom for Modern Decisions",
];

export default function AiGovernanceCoursePage() {
  return (
    <main className="min-h-screen bg-void pt-14 text-[var(--color-text-primary)]">
      <Section>
        <div className="mx-auto max-w-[900px]">
          <SectionLabel color="cyan">PROGRAM WAITLIST</SectionLabel>
          <h1 className="text-display max-w-[760px]">
            Unshakeable Decisions
          </h1>
          <p className="text-body-lg mt-4 max-w-[760px]">
            Still your mind. Sharp your decisions. A practical leadership course
            for mid-level managers navigating AI-era complexity, decision fatigue,
            and strategic overload.
          </p>
          <div className="mt-6 grid gap-3 rounded-[12px] border border-[var(--color-border)] bg-[var(--color-panel)] p-4 md:grid-cols-3">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--color-green)]">
                NOW OPEN
              </p>
              <p className="mt-1 text-[12px] text-[var(--color-text-secondary)]">
                Module 01 waitlist (launching soon)
              </p>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--color-amber)]">
                IN PIPELINE
              </p>
              <p className="mt-1 text-[12px] text-[var(--color-text-secondary)]">
                Modules 02-07 roadmap
              </p>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--color-cyan)]">
                MEMBER VALUE
              </p>
              <p className="mt-1 text-[12px] text-[var(--color-text-secondary)]">
                Priority access + future updates
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section className="border-y border-[var(--color-border)] bg-[var(--color-panel)]">
        <div className="mx-auto max-w-[900px]">
          <SectionLabel>MODULE 01</SectionLabel>
          <h2 className="text-h1 mb-2">The Decision Fatigue Crisis</h2>
          <p className="text-body mb-5 max-w-[760px]">
            Understand why AI is making you more overwhelmed, not less. This is
            the only module currently open for waitlist onboarding.
          </p>
          <p className="mb-6 text-[12px] uppercase tracking-[0.1em] text-[var(--color-text-muted)]">
            Launching Soon | 43 min | 9 chapters
          </p>
          <div className="grid gap-3 md:grid-cols-2">
            {moduleOneChapters.map((chapter, index) => (
              <article
                key={chapter}
                className="rounded-[10px] border border-[var(--color-border)] bg-[var(--color-card)] px-4 py-3"
              >
                <p className="text-[11px] font-semibold text-[var(--color-cyan)]">
                  {index + 1}.
                </p>
                <p className="mt-1 text-[13px] text-[var(--color-text-secondary)]">
                  {chapter}
                </p>
              </article>
            ))}
          </div>
          <div className="mt-6 rounded-[10px] border border-[var(--color-cyan-dim)] bg-[rgba(0,212,255,0.04)] p-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--color-cyan)]">
              Included Deliverables
            </p>
            <p className="mt-2 text-[13px] text-[var(--color-text-secondary)]">
              Decision Audit Worksheet (8-page fillable PDF) and Three Types
              Framework Template (1-page quick reference).
            </p>
          </div>
        </div>
      </Section>

      <Section>
        <div className="mx-auto max-w-[900px]">
          <SectionLabel color="amber">UPCOMING ROADMAP</SectionLabel>
          <h2 className="text-h1 mb-4">Modules 02-07 in pipeline</h2>
          <div className="grid gap-3 md:grid-cols-2">
            {moduleRoadmap.map((title) => (
              <div
                key={title}
                className="rounded-[10px] border border-[var(--color-border)] bg-[var(--color-panel)] px-4 py-3"
              >
                <p className="text-[13px] font-medium text-[var(--color-text-primary)]">
                  {title}
                </p>
                <p className="mt-1 text-[11px] uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
                  Planned
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section>
        <div className="mx-auto grid max-w-[980px] gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <SectionLabel color="amber">WHO SHOULD APPLY</SectionLabel>
            <h2 className="text-h1 mb-4">
              For leaders accountable for AI outcomes
            </h2>
            <ul className="space-y-3 text-[13px] leading-relaxed text-[var(--color-text-secondary)]">
              <li>
                • Mid-level managers drowning in daily decision overload
              </li>
              <li>
                • Leaders who adopted AI tools but still feel more overwhelmed
              </li>
              <li>
                • Managers seeking practical, repeatable frameworks (not hacks)
              </li>
              <li>
                • Professionals wanting clarity between AI automation and human
                judgment
              </li>
            </ul>
            <p className="mt-6 text-[12px] italic text-[var(--color-text-muted)]">
              Waitlist members for Module 01 receive priority launch access and
              can opt in to no-cost updates for upcoming modules.
            </p>
          </div>

          <div className="rounded-[16px] border border-[var(--color-border)] bg-[var(--color-panel)] p-6">
            <SectionLabel color="green">NOMINATE YOURSELF</SectionLabel>
            <h3 className="text-h3 mb-4">Join Module 01 waitlist</h3>
            <CourseWaitlistForm />
          </div>
        </div>
      </Section>
    </main>
  );
}

