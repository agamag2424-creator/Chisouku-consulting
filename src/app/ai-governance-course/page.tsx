import type { Metadata } from "next";
import { Section } from "../../components/ui/Section";
import { SectionLabel } from "../../components/ui/SectionLabel";
import { CourseWaitlistForm } from "../../components/course/CourseWaitlistForm";

export const metadata: Metadata = {
  title: "AI Governance & Leadership Course",
  description:
    "Explore ChisokuLab's AI Governance & Leadership Course and nominate yourself for the next cohort waitlist.",
};

const modules = [
  {
    title: "Module 1: Shadow AI Reality Audit",
    summary:
      "Map real-world AI usage, risk exposure, and policy blind spots across your organization.",
  },
  {
    title: "Module 2: Governance Operating Model",
    summary:
      "Design practical governance structures, decision rights, and PMO modernization patterns.",
  },
  {
    title: "Module 3: Responsible Adoption Playbook",
    summary:
      "Build rollout standards, controls, and team enablement to scale AI safely and measurably.",
  },
  {
    title: "Module 4: Executive Leadership in AI Era",
    summary:
      "Lead transformation with confidence using strategic communication, metrics, and governance cadence.",
  },
];

export default function AiGovernanceCoursePage() {
  return (
    <main className="min-h-screen bg-void pt-14 text-[var(--color-text-primary)]">
      <Section>
        <div className="mx-auto max-w-[900px]">
          <SectionLabel color="cyan">PROGRAM WAITLIST</SectionLabel>
          <h1 className="text-display max-w-[760px]">
            AI Governance &amp; Leadership Course
          </h1>
          <p className="text-body-lg mt-4 max-w-[760px]">
            Built for leaders navigating AI adoption, policy risk, and operating
            model redesign. This course complements our consulting work with a
            structured leadership curriculum for sustainable execution.
          </p>
        </div>
      </Section>

      <Section className="border-y border-[var(--color-border)] bg-[var(--color-panel)]">
        <div className="mx-auto max-w-[900px]">
          <SectionLabel>COURSE STRUCTURE</SectionLabel>
          <h2 className="text-h1 mb-6">4-part executive curriculum</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {modules.map((module) => (
              <article
                key={module.title}
                className="rounded-[12px] border border-[var(--color-border)] bg-[var(--color-card)] p-5"
              >
                <h3 className="text-h3">{module.title}</h3>
                <p className="mt-2 text-body">{module.summary}</p>
              </article>
            ))}
          </div>
          <p className="mt-6 text-[12px] uppercase tracking-[0.1em] text-[var(--color-text-muted)]">
            Format: cohort-based | Duration: 6 weeks | Delivery: live + applied
            templates
          </p>
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
                • PMO and transformation leaders redesigning governance for AI
              </li>
              <li>
                • Operations leaders balancing speed, risk, and compliance
              </li>
              <li>
                • Department heads sponsoring AI initiatives across teams
              </li>
              <li>
                • Executives seeking practical frameworks beyond hype
              </li>
            </ul>
            <p className="mt-6 text-[12px] italic text-[var(--color-text-muted)]">
              Waitlist nominations are reviewed in order of strategic fit and
              cohort capacity.
            </p>
          </div>

          <div className="rounded-[16px] border border-[var(--color-border)] bg-[var(--color-panel)] p-6">
            <SectionLabel color="green">NOMINATE YOURSELF</SectionLabel>
            <h3 className="text-h3 mb-4">Join the next waitlist cohort</h3>
            <CourseWaitlistForm />
          </div>
        </div>
      </Section>
    </main>
  );
}

