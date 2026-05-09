import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AEVA 30-60-90 Day Governance Plan",
  description:
    "A practical 90-day roadmap to move from AI governance gaps to structured, board-visible governance.",
};

const phases = [
  {
    color: "#00d4ff",
    icon: "🔍",
    label: "DAYS 1-30",
    title: "Discovery and Inventory",
    objectives: [
      "Map every AI tool currently in use — sanctioned and unsanctioned",
      "Conduct stakeholder interviews across 3 levels: C-suite, team leads, individual contributors",
      "Assess current AI policy (if any) against actual usage patterns",
      "Identify top 3 Shadow AI risk areas",
      "Establish baseline metrics: number of tools, risk tier distribution, governance overhead per team",
    ],
    deliverable:
      "AI Governance Baseline Report — one document, board-ready, showing current state and top risks",
  },
  {
    color: "#f59e0b",
    icon: "⚙️",
    label: "DAYS 31-60",
    title: "Governance Layer Implementation",
    objectives: [
      "Deploy AEVA Agile Governance Layer into existing sprint ceremonies",
      "Launch AI tool registry and declaration process",
      "Draft and socialise AI usage policy — fast lane and standard lane",
      "Implement AI Risk Review in retrospectives across all active teams",
      "Build first version of AI Governance Dashboard",
    ],
    deliverable:
      "AI Governance Framework v1 — policy document, tool registry, dashboard, ceremony integration guide",
  },
  {
    color: "#22c55e",
    icon: "📈",
    label: "DAYS 61-90",
    title: "Scaling and Board Reporting",
    objectives: [
      "Scale governance framework to all departments",
      "Produce first board-level AI Governance Report",
      "Identify and close remaining Shadow AI gaps from Phase 1",
      "Connect AI tool usage data to regulatory requirements",
      "Define ongoing governance cadence — quarterly reviews, annual policy refresh",
    ],
    deliverable:
      "AI Governance Board Report — one page, showing risk exposure, mitigation actions, and forward governance plan",
  },
];

export default function AevaNinetyDayPlanPage() {
  return (
    <section className="bg-[#050a12] py-[var(--section-padding-y-mobile)] md:py-[var(--section-padding-y)]">
      <div className="mx-auto w-full max-w-[var(--content-max-width)] px-[var(--content-padding-x-mobile)] md:px-[var(--content-padding-x)]">
        <p className="text-label text-[#00d4ff]">GOVERNANCE ROADMAP</p>
        <h1 className="mt-4 text-display text-[#dde6f0]">
          What the first 90 days of AI Governance looks like
        </h1>
        <p className="mt-5 max-w-4xl text-body-lg text-[#6b8aaa]">
          A governance deployment roadmap built on AEVA — designed to move an
          enterprise from AI governance gap to structured, board-visible
          governance in 90 days without disrupting delivery.
        </p>
        <p className="mt-5 rounded-[12px] border border-[#f59e0b4d] bg-[#f59e0b14] p-4 text-body text-[#f5c978]">
          This plan adapts per engagement. Structure is consistent. Specifics
          change based on your organisation&apos;s AI maturity, industry, and
          risk profile.
        </p>

        <div className="mt-10 space-y-6">
          {phases.map((phase) => (
            <article
              key={phase.label}
              className="rounded-[20px] border border-[#1a2d45] bg-[#0c1620] p-6 md:p-8"
            >
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-xl">{phase.icon}</span>
                <span
                  className="rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.11em]"
                  style={{
                    borderColor: `${phase.color}66`,
                    backgroundColor: `${phase.color}1a`,
                    color: phase.color,
                  }}
                >
                  {phase.label}
                </span>
              </div>

              <h2 className="mt-4 text-h1 text-[#dde6f0]">{phase.title}</h2>

              <div className="mt-5">
                <p className="text-label text-[#00d4ff]">Objectives</p>
                <ul className="mt-2 space-y-2 text-body text-[#6b8aaa]">
                  {phase.objectives.map((objective) => (
                    <li key={objective}>- {objective}</li>
                  ))}
                </ul>
              </div>

              <div
                className="mt-6 rounded-[14px] border p-4"
                style={{
                  borderColor: `${phase.color}55`,
                  backgroundColor: `${phase.color}12`,
                }}
              >
                <p className="text-label" style={{ color: phase.color }}>
                  Key Deliverable
                </p>
                <p className="mt-2 text-body text-[#bdd0e1]">{phase.deliverable}</p>
              </div>
            </article>
          ))}
        </div>

        <section className="mt-10 rounded-[20px] border border-[#1a2d45] bg-[#0c1620] p-6 md:p-8">
          <p className="text-body-lg text-[#dde6f0]">
            Take this plan into your next leadership conversation
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link
              href="/aeva/book"
              className="inline-flex items-center justify-center rounded-full bg-[#00d4ff] px-8 py-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#050a12]"
            >
              Book a call to discuss →
            </Link>
            <Link
              href="/aeva/framework"
              className="inline-flex items-center justify-center rounded-full border border-[#00d4ff] bg-transparent px-8 py-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#00d4ff]"
            >
              View the full framework →
            </Link>
          </div>
        </section>
      </div>
    </section>
  );
}
