import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AEVA 30-60-90 Day Governance Plan",
  description:
    "A governance deployment roadmap built on AEVA — board-visible AI governance in 90 days without disrupting delivery velocity.",
  keywords: [
    "AEVA framework",
    "AI governance framework",
    "enterprise AI governance",
  ],
};

type Phase = {
  color: string;
  icon: string;
  label: string;
  title: string;
  objectives: string[];
  deliverableIcon: string;
  deliverableName: string;
  deliverableBullets: string[];
  deliverableFooter?: string;
};

const phases: Phase[] = [
  {
    color: "#00d4ff",
    icon: "🔍",
    label: "DAYS 1–30",
    title: "Discovery and AI Governance Baseline",
    objectives: [
      "Conduct full AI tool inventory across all departments — surfacing sanctioned and unsanctioned usage simultaneously",
      "Run stakeholder interviews at three levels: C-suite (strategic risk appetite), team leads (delivery reality), individual contributors (actual usage patterns)",
      "Score the organisation's DCI profile across active delivery workstreams — establishing where human judgment is genuinely irreplaceable vs where AI can execute safely",
      "Identify the three highest-priority Shadow AI risk areas",
      "Assess existing policies (if any) against actual usage patterns — the gap is always larger than leadership expects",
    ],
    deliverableIcon: "📋",
    deliverableName: "AI Governance Baseline Report",
    deliverableBullets: [
      "Single board-ready document — executives align on one authoritative snapshot",
      "Current AI tool usage & risk tier distribution mapped end-to-end",
      "Shadow AI exposure surfaced with evidence, not anecdotes",
      "Top three governance priorities ranked for immediate action",
      "DCI profile baseline — where human judgment is irreplaceable vs where AI can execute safely",
      "Most organisations do not have this artefact before AEVA — it is the foundation everything else builds on",
    ],
  },
  {
    color: "#f59e0b",
    icon: "⚙️",
    label: "DAYS 31–60",
    title: "Governance Layer Implementation",
    objectives: [
      "Deploy Precision Backlog Refinement into active delivery teams — introducing Functional-Technical AC Taxonomy and DCI scoring",
      "Launch Increment Delivery Charter across all active Increments — sanctioned tools, data classification, output accountability",
      "Introduce DataRetro as replacement for existing sprint retrospectives — beginning the shift from opinion-based to evidence-based improvement",
      "Establish Feature Clearance gates — Gate 1 (technical completion + AI Output Validator sign-off) and Gate 2 (governance log, max 10 minutes)",
      "Build first version of AI Governance Dashboard — board-ready, one page, showing risk exposure and mitigation status",
    ],
    deliverableIcon: "🧩",
    deliverableName: "AEVA Governance Framework v1",
    deliverableBullets: [
      "Increment Delivery Charter — sanctioned tools, data boundaries, output accountability per Increment",
      "Feature Clearance protocol — both gates defined; Gate 2 capped at 10 minutes",
      "DCI scoring guide — consistent estimation & tiering across teams",
      "DataRetro ceremony design — evidence-first retrospectives",
      "AI tool registry — live inventory tied to risk & ownership",
      "The complete governance infrastructure for your delivery environment — not slides, operating machinery",
    ],
  },
  {
    color: "#22c55e",
    icon: "📈",
    label: "DAYS 61–90",
    title: "Scale, Board Reporting, and Cadence",
    objectives: [
      "Extend AEVA governance framework to all delivery teams — not just pilot workstreams",
      "Produce first board-level AI Governance Report: risk exposure, mitigation actions taken, DCI calibration data, Shadow AI incident rate, governance compliance rate",
      "Address Identity Crisis signals surfaced in Days 31-60 — senior practitioners showing resistance patterns get the New Crown reframe proactively",
      "Connect AI tool usage data to regulatory requirements as applicable (DPDP for India, GDPR for EU/UK, EU AI Act for European operations)",
      "Define ongoing governance cadence — monthly AI Governance Dashboard, quarterly DCI calibration review, annual policy refresh",
    ],
    deliverableIcon: "📊",
    deliverableName: "AI Governance Board Report",
    deliverableBullets: [
      "One page — designed for board attention, not binder volume",
      "Risk exposure across all teams in one view",
      "Mitigation actions completed & traceable",
      "Governance compliance rates & forward cadence spelled out",
      "Leadership sees the complete picture — many for the first time",
    ],
  },
];

function PlanPageHero() {
  const horizons = phases.map((p) => ({
    label: p.label,
    caption: p.title,
    color: p.color,
  }));

  return (
    <div className="relative mb-10 overflow-hidden rounded-[24px] border border-[#1a2d45] bg-[#050a12] md:mb-12">
      <div className="pointer-events-none absolute inset-0 opacity-[0.95]">
        <div className="absolute inset-0 animate-[aevaGradientShift_22s_ease_infinite] bg-[radial-gradient(circle_at_18%_18%,rgba(0,212,255,0.22),transparent_42%),radial-gradient(circle_at_88%_22%,rgba(245,158,11,0.12),transparent_48%),radial-gradient(circle_at_72%_88%,rgba(34,197,94,0.1),transparent_45%),linear-gradient(155deg,#050a12,#071422,#050a12)] [background-size:180%_180%]" />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[#050a12]/20 to-[#050a12]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)`,
          backgroundSize: "44px 44px",
        }}
      />

      <div className="relative z-10 px-5 py-9 md:px-9 md:py-11 lg:px-11 lg:py-12">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-stretch lg:justify-between lg:gap-14">
          <div className="min-w-0 flex-1">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#00d4ff]/35 bg-[#00d4ff]/[0.07] px-3.5 py-1.5 shadow-[0_0_24px_rgba(0,212,255,0.12)]">
              <span
                className="relative flex h-2 w-2 rounded-full bg-[#00d4ff]"
                style={{ boxShadow: "0 0 14px #00d4ff" }}
              >
                <span className="absolute inset-0 animate-ping rounded-full bg-[#00d4ff] opacity-40" />
              </span>
              <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#7ee9ff]">
                Governance roadmap
              </span>
            </div>

            <h1 className="mt-6 max-w-[22ch] text-display font-semibold leading-[1.08] tracking-[-0.02em] text-[#dde6f0] md:max-w-none">
              What the first{" "}
              <span className="bg-gradient-to-r from-[#7dd3fc] via-[#a5f3fc] to-[#22d3ee] bg-clip-text text-transparent">
                90 days
              </span>{" "}
              of AI Governance looks like
            </h1>

            <p className="mt-6 max-w-2xl border-l-2 border-[#00d4ff]/35 pl-5 text-[17px] leading-relaxed text-[#9eb6d2] md:text-[18px]">
              A governance deployment roadmap built on AEVA — designed to move
              an enterprise from AI governance gap to structured, board-visible
              governance in 90 days without disrupting delivery velocity.
            </p>
          </div>

          <aside className="flex w-full shrink-0 flex-col justify-between rounded-[18px] border border-[#1a2d45]/90 bg-[#060d15]/75 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-md lg:max-w-[320px]">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#6b8aaa]">
                90-day arc
              </p>
              <p className="mt-1 text-[12px] leading-snug text-[#8aa4bf]">
                Three phases — each detailed below.
              </p>
            </div>
            <ul className="mt-5 space-y-3">
              {horizons.map((h) => (
                <li
                  key={h.label}
                  className="flex items-center gap-3 rounded-[12px] border border-[#1a2d45]/80 bg-[#050a12]/65 py-2.5 pl-2.5 pr-3"
                >
                  <span
                    className="h-10 w-1 shrink-0 rounded-full"
                    style={{
                      background: `linear-gradient(180deg, ${h.color}, ${h.color}66)`,
                      boxShadow: `0 0 16px ${h.color}44`,
                    }}
                  />
                  <div className="min-w-0">
                    <p
                      className="text-[10px] font-bold uppercase tracking-[0.14em]"
                      style={{ color: h.color }}
                    >
                      {h.label}
                    </p>
                    <p className="text-[13px] leading-snug text-[#c5d7ea]">
                      {h.caption}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </aside>
        </div>

        <div className="relative mt-9 overflow-hidden rounded-[16px] border border-[#f59e0b]/35 bg-gradient-to-br from-[#f59e0b]/[0.11] via-[#f59e0b]/[0.04] to-transparent p-5 md:mt-10 md:flex md:items-start md:gap-5 md:p-6">
          <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#f59e0b]/15 blur-2xl" />
          <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#f59e0b]/40 bg-[#f59e0b]/15 text-lg md:h-12 md:w-12">
            ✦
          </div>
          <p className="relative mt-4 text-[15px] leading-relaxed text-[#f5d9a8] md:mt-0 md:text-[15.5px]">
            This plan adapts per engagement. The structure is consistent. The
            specifics change based on your organisation&apos;s AI maturity, DCI
            profile, industry, and regulatory context.
          </p>
        </div>
      </div>
    </div>
  );
}

function ObjectivesBlock({
  color,
  objectives,
}: {
  color: string;
  objectives: string[];
}) {
  return (
    <div className="relative mt-6 overflow-hidden rounded-[18px] border border-dashed border-[#2a4058]/90 bg-[linear-gradient(165deg,rgba(8,15,24,0.95)_0%,rgba(5,10,18,0.6)_100%)] p-5 md:p-7">
      <div
        className="pointer-events-none absolute -right-16 top-0 h-48 w-48 rounded-full opacity-[0.07] blur-2xl"
        style={{ backgroundColor: color }}
      />

      <div className="relative flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#7dd3fc]/90">
            Objectives
          </p>
          <p className="mt-1 max-w-xl text-[13px] leading-snug text-[#8aa4bf]">
            What teams execute in this window — the path from insight to
            operating governance.
          </p>
        </div>
        <span className="inline-flex w-fit items-center gap-1.5 rounded-lg border border-[#2a3f55] bg-[#050a12]/80 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#6b8aaa]">
          <span
            className="inline-block h-1.5 w-1.5 rounded-full"
            style={{ backgroundColor: color, boxShadow: `0 0 8px ${color}` }}
          />
          Execution lane
        </span>
      </div>

      <ol className="relative mt-7 list-none space-y-0 pl-0">
        {objectives.length > 1 ? (
          <div
            aria-hidden
            className="pointer-events-none absolute left-[17px] top-5 bottom-9 w-px md:left-[19px]"
            style={{
              background: `linear-gradient(180deg, ${color}00 0%, ${color}70 15%, ${color}40 50%, ${color}18 85%, ${color}00 100%)`,
            }}
          />
        ) : null}
        {objectives.map((objective, i) => (
          <li
            key={objective}
            className="relative flex gap-4 pb-8 last:pb-0 md:gap-5"
          >
            <div
              className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 bg-[#0a121c] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] md:h-10 md:w-10"
              style={{ borderColor: `${color}aa` }}
            >
              <span
                className="text-[12px] font-bold tabular-nums"
                style={{ color }}
              >
                {i + 1}
              </span>
            </div>
            <p className="min-w-0 flex-1 pt-1 text-[15px] leading-relaxed text-[#b4c9df] md:pt-1.5 md:text-[15.5px]">
              {objective}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}

function KeyDeliverableBlock({
  color,
  icon,
  name,
  bullets,
  footer,
}: {
  color: string;
  name: string;
  bullets: string[];
  footer?: string;
  icon: string;
}) {
  return (
    <div className="relative mt-8">
      <div
        className="pointer-events-none absolute -inset-px rounded-[22px] opacity-70 blur-sm"
        style={{
          background: `linear-gradient(135deg, ${color}35, transparent 55%, ${color}18)`,
        }}
      />
      <div
        className="relative overflow-hidden rounded-[20px] border border-solid bg-[#070f18]/95 p-6 md:p-8"
        style={{ borderColor: `${color}45` }}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.12]"
          style={{
            background: `radial-gradient(ellipse 80% 50% at 20% 0%, ${color}, transparent 55%)`,
          }}
        />

        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-start">
          <div className="flex gap-4">
            <div
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-2xl shadow-lg"
              style={{
                backgroundColor: `${color}18`,
                boxShadow: `0 0 40px ${color}22`,
                border: `1px solid ${color}44`,
              }}
            >
              {icon}
            </div>
            <div>
              <p
                className="text-[11px] font-bold uppercase tracking-[0.22em]"
                style={{ color }}
              >
                Key deliverable
              </p>
              <h3 className="mt-1 max-w-xl font-[650] leading-snug text-[#dde6f0] md:text-[1.35rem]">
                {name}
              </h3>
              <p className="mt-2 text-[12px] font-medium uppercase tracking-[0.14em] text-[#6b8aaa]">
                What you walk away with
              </p>
            </div>
          </div>
        </div>

        <ul className="relative mt-8 grid gap-3 sm:grid-cols-2">
          {bullets.map((item, i) => (
            <li
              key={`${name}-${i}`}
              className="flex gap-3 rounded-[14px] border border-[#1a2d45]/90 bg-[#050a12]/55 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition duration-200 hover:-translate-y-[1px] hover:border-[#2a405d] hover:bg-[#081018] hover:shadow-[0_8px_24px_rgba(0,0,0,0.35)] md:p-[18px]"
            >
              <span
                className="flex h-8 min-w-8 shrink-0 items-center justify-center rounded-lg text-[13px] font-bold tabular-nums text-[#050a12] shadow-inner"
                style={{
                  backgroundColor: color,
                  boxShadow: `inset 0 1px 0 rgba(255,255,255,0.25), 0 4px 14px ${color}35`,
                }}
              >
                {i + 1}
              </span>
              <span className="pt-0.5 text-[15px] leading-relaxed text-[#c8d9ea]">
                {item}
              </span>
            </li>
          ))}
        </ul>

        {footer ? (
          <p className="relative mt-6 rounded-[14px] border border-[#f59e0b]/25 bg-[#f59e0b]/[0.07] px-4 py-3 text-center text-[14px] italic leading-relaxed text-[#e8c49a]">
            {footer}
          </p>
        ) : null}
      </div>
    </div>
  );
}

export default function AevaNinetyDayPlanPage() {
  return (
    <section className="bg-[#050a12] py-[var(--section-padding-y-mobile)] md:py-[var(--section-padding-y)]">
      <div className="mx-auto w-full max-w-[var(--content-max-width)] px-[var(--content-padding-x-mobile)] md:px-[var(--content-padding-x)]">
        <PlanPageHero />

        <div className="mt-2 space-y-6 md:mt-0">
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

              <ObjectivesBlock color={phase.color} objectives={phase.objectives} />

              <KeyDeliverableBlock
                color={phase.color}
                icon={phase.deliverableIcon}
                name={phase.deliverableName}
                bullets={phase.deliverableBullets}
                footer={phase.deliverableFooter}
              />
            </article>
          ))}
        </div>

        <section className="mt-10 rounded-[20px] border border-[#1a2d45] bg-[#0c1620] p-6 md:p-8">
          <p className="text-body-lg text-[#dde6f0]">
            Want to walk through how this plan applies to your specific context?
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link
              href="/aeva/book"
              className="inline-flex items-center justify-center rounded-full bg-[#00d4ff] px-8 py-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#050a12]"
            >
              Book a call →
            </Link>
            <Link
              href="/aeva/framework"
              className="inline-flex items-center justify-center rounded-full border border-[#00d4ff] bg-transparent px-8 py-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#00d4ff]"
            >
              Read the framework →
            </Link>
          </div>
        </section>
      </div>
    </section>
  );
}
