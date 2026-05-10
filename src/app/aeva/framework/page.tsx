import type { Metadata } from "next";
import Link from "next/link";
import { DimensionCard } from "./components/DimensionCard";

export const metadata: Metadata = {
  title: "How AEVA Works",
  description:
    "Fourteen original intellectual contributions across four dimensions — ceremony restructuring, lean AI-era teams, velocity recalibration, and five transition risks.",
};

const ceremoniesDim1 = [
  {
    title: "PRECISION BACKLOG REFINEMENT",
    replaces: "Backlog Refinement",
    bullets: [
      "Core innovation: Functional-Technical AC Taxonomy — original IP",
      "Functional AC: written by PO, describes WHAT the system does, human-authored, non-negotiable",
      "Technical AC: AI-generated from Functional AC, human-reviewed by AC Architect",
      "Hallucination boundary: when Functional AC is ambiguous, AI fills the gap incorrectly. The governance solution is airtight Functional AC — not more capable AI.",
      "Pre-meeting: AI decomposes epic, generates Technical AC, scores DCI. During meeting: humans verify correctness and AC precision only. Duration: dramatically reduced.",
    ],
  },
  {
    title: "INCREMENT PLANNING",
    replaces: "Sprint Planning",
    bullets: [
      "Dual-Track Capacity Model: Track 1 (DCI 4-6, AI-Executable) — bounded by QA review bandwidth, not coding velocity. Track 2 (DCI 11-16, Human) — traditional capacity calculation.",
      "New formula: Available QA review bandwidth ÷ Average AI output review time = Maximum AI-executable features per Increment",
      "Traditional: 2-4 hours estimation debate. AEVA: 45 minutes commitment and sequencing.",
      "Governance enforced upstream as infrastructure — never debated in the meeting.",
    ],
  },
  {
    title: "PULSE SYNC",
    replaces: "Daily Standup",
    bullets: [
      "Layer 1 — AI Pulse (async, pre-meeting): automated dashboard — AI completion status, burn rate, blockers, QA backlog. AI generates it. Nobody presents it. Removes all status reporting from human conversation.",
      "Layer 2 — Human Sync (8 minutes synchronous): decisions required today, cross-functional collaboration, human energy signals no dashboard captures.",
      "Traditional: 15 minutes, primarily status reporting. Pulse Sync: 8 minutes, exclusively decisions and cohesion.",
    ],
  },
  {
    title: "DATRETRO",
    replaces: "Sprint Retrospective",
    bullets: [
      "Phase 1: LLM pre-analyses Increment data — commit logs, velocity, blockers, defect patterns, Feature Clearance compliance rates. Generates evidence-based responses to the three retrospective questions.",
      "Phase 2: humans make decisions on evidence. \"The data shows X — why did that happen, and what do we own as humans to fix it?\"",
      "Explicitly includes AI output quality as a retrospective variable — no traditional retrospective does this.",
    ],
  },
  {
    title: "INCREMENT GOVERNANCE REVIEW",
    replaces: "Sprint Review",
    bullets: [
      "Two-tier model: Tier 1 — continuous Human Acceptance Gate (PO reviews features as they complete, no ceremony, CI/CD principle applied to human intent validation). Tier 2 — formal 60-90 minute ceremony at Increment end.",
      "Four Tier 2 objectives: integration verification, business alignment, AI governance posture review (what did AI decide autonomously, what did humans override), DCI calibration signal.",
      "Governing principle: review cadence is human-paced, not AI-paced.",
    ],
  },
  {
    title: "FEATURE CLEARANCE",
    replaces: "Definition of Done",
    bullets: [
      "Governance unit shifts: Stories are execution units. Features are governance units.",
      "Gate 1 — Technical Completion (Tech Lead + AI Output Validator): stories complete, hallucination check documented and cleared, Functional AC compliance confirmed, deployed to staging.",
      "Gate 2 — Governance Log (AI Delivery Orchestrator, max 10 minutes): DCI audit trail, AI vs human decision summary, regulated domain flag.",
      "Progressive Governance Lightening: Feature Clearance is the lightest ceremony by design — all governance work done upstream.",
      "Non-negotiable: nothing enters production without both gates cleared.",
    ],
  },
];

const roleEvolution = [
  {
    from: "Product Owner",
    to: "Value Governance Lead",
    detail:
      "absorbs BA function with AI, owns Functional AC quality, defines AI autonomy boundaries",
  },
  {
    from: "Scrum Master",
    to: "AI Delivery Orchestrator",
    detail: "manages human-AI collaboration, owns Feature Clearance Gate 2",
  },
  {
    from: "Tech Lead",
    to: "AI Execution Architect",
    detail:
      "prompt engineering standards, DCI 7-10 decisions, architecture review",
  },
  {
    from: "Senior Developer",
    to: "AI Orchestrator Senior",
    detail: "directs AI agents, validates output at architecture level",
  },
  {
    from: "Junior Developer",
    to: "AI Orchestrator Entry",
    detail:
      "executes at dramatically higher effective velocity using AI tools",
  },
  {
    from: "QA Engineer",
    to: "AI Output Validator",
    detail:
      "hallucination detection, Functional AC compliance — Increment capacity ceiling",
  },
  {
    from: "Business Analyst",
    to: "Absorbed into PO role",
    detail: "Eliminated as standalone role.",
  },
  {
    from: "Technical Architect",
    to: "DCI Governance Lead",
    detail: "shared across teams, owns DCI calibration",
  },
];

const fourNewRoles = [
  {
    title: "AI Output Validator",
    body: "does not exist in any current enterprise job architecture. Specialised QA function whose primary competency is distinguishing AI output that correctly implements human intent from output that is technically plausible but functionally incorrect. The Increment capacity ceiling for the AI Execution Track.",
  },
  {
    title: "AI Delivery Orchestrator",
    body: "manages AI Pulse dashboard, facilitates DCI scoring, owns Feature Clearance Gate 2, primary escalation point for AI output anomalies.",
  },
  {
    title: "AI Governance Lead",
    body: "organisation-level role (not team-level). Owns EU AI Act compliance, internal AI policy, Increment Delivery Charter. Reports to CDO or CTO.",
  },
  {
    title: "Acceptance Criteria Architect",
    body: "ensures Functional AC is sufficiently precise to prevent AI hallucination at the execution boundary.",
  },
];

const scoringAxes = [
  {
    label: "A: Ambiguity Level",
    range: "1=crystal clear → 4=fundamentally unclear, discovery required",
  },
  {
    label: "B: Stakeholder Politics",
    range: "1=single team decision → 4=multi-stakeholder negotiation",
  },
  {
    label: "C: Domain Expertise Required",
    range: "1=generic logic → 4=regulatory/compliance critical",
  },
  {
    label: "D: Risk Consequence",
    range: "1=easily reversible → 4=compliance/legal/financial consequence",
  },
];

const executionTiers = [
  {
    range: "DCI 4-6",
    label: "AI-Executable",
    detail: "5-8x speed multiplier realistic",
  },
  {
    range: "DCI 7-10",
    label: "AI-Assisted",
    detail: "2-3x speed multiplier realistic (80/20 human-AI collaboration)",
  },
  {
    range: "DCI 11-13",
    label: "Human-Led",
    detail: "1.2-1.5x speed multiplier realistic",
  },
  {
    range: "DCI 14-16",
    label: "Human-Only",
    detail: "1.2x speed multiplier realistic",
  },
];

const governanceShieldLayers = [
  "Layer 1: Blind multi-scorer consensus — Tech Architect, PO, and AI Delivery Orchestrator score simultaneously without visibility of others' scores. High variance triggers mandatory public justification.",
  "Layer 2: AI independent audit score — AI scores same story independently. Variance >4 points triggers Scoring Variance Alert. Team must resolve publicly before story enters Increment.",
  "Layer 3: Historical calibration tracking — patterns of consistent score inflation across Increments trigger Scoring Pattern Inconsistency flag. Bias does not survive longitudinal delivery data.",
];

const transitionRisks = [
  {
    name: "GOVERNANCE LAG",
    definition:
      "The systematic selective interpretation of AEVA governance elements — retaining efficiency-generating components while discarding governance-intensive ones. Creates a facade of AI delivery maturity without the substance.",
    extraLabel: "Early warning",
    extra:
      "\"That gate is optional for our context.\" Feature Clearance compliance falling below 100%.",
    mitigation:
      "Feature Clearance gates structurally tied to Increment continuation — not advisory. Gate removal requires documented decision reviewed by AI Governance Lead.",
  },
  {
    name: "GOVERNANCE DRAG",
    definition:
      "The paradox where governance infrastructure designed to enable safe AI delivery becomes the primary bottleneck — eliminating AI efficiency gains entirely.",
    extraLabel: "Key insight",
    extra:
      "AI can generate governance documentation at machine speed. Requiring more documentation creates overhead that humans review at human speed. The bottleneck worsens, not improves.",
    mitigation:
      "Governance time ceilings as misconfiguration signals. Feature Clearance Gate 2: 10 minutes maximum. Proportionality Rule: governance intensity proportional to DCI risk score.",
  },
  {
    name: "SHADOW AI PROLIFERATION",
    definition:
      "The parallel ungoverned AI delivery stream where employees use unsanctioned AI tools on uncleared data — undermining every governance mechanism from the inside.",
    extraLabel: "Directly observed",
    extra:
      "Yamaha Motor Solutions India. Employees using ChatGPT via personal devices on uncleared data with no governance. Leadership projecting purposeful AI adoption externally. The gap was structural.",
    mitigation:
      "Process-Level Immunity — precise Functional AC as a universal quality gate. Any output must comply with Functional AC to pass Feature Clearance, regardless of which tool generated it. Governance is output-focused, not tool-focused.",
  },
  {
    name: "THE IDENTITY CRISIS",
    definition:
      "Systematic quiet resistance to AI adoption by experienced practitioners whose professional identity is built on skills AI has disrupted. Manifests not as open objection but as invisible obstruction indistinguishable from diligence.",
    extraLabel: "Pattern",
    extra:
      "Technical Architect consistently scores every story DCI 14-16. Senior developer insists on personally reviewing all AI output creating a single-point bottleneck. Deniable. Rational. Quietly catastrophic.",
    mitigation:
      "New Crown Reframe: Old identity — \"I build things others cannot\" (threatened by AI). New identity — \"I govern what AI builds. I make decisions AI cannot make. I am the reason AI output is safe, intentional, and auditable\" (made more valuable by AI).",
  },
  {
    name: "STRATEGIC BLINDNESS",
    definition:
      "Structural misalignment between technology and governance leadership — producing AI adoption decisions that are technically plausible but strategically incoherent, creating liability at scale while appearing to create value.",
    extraLabel: "Root cause",
    extra:
      "tech leadership optimises for delivery velocity. Governance leadership optimises for risk reduction. Structurally opposed. AI widens the gap to breaking point.",
    mitigation: "",
    highlight:
      "AI capability without governance infrastructure is not digital transformation. It is liability creation at scale. Investment sequence: (1) governance framework, (2) team training, (3) AI tool deployment, (4) scale. Never inverted.",
  },
];

const credentials = [
  {
    title: "Provisional Patent Pending",
    body: "Filed with the Indian Patent Office, 2026. Fourteen claims covering ceremony architecture, DCI framework, DCI Governance Shield, team structure, financial model, and Five Transition Risk taxonomy.",
    icon: "📜",
  },
  {
    title: "Copyright Registration",
    body: "Copyright Diary No. LD-14934/2026-CO. Registered under Agam Agrawwal, 2026. Reproduction prohibited without written consent.",
    icon: "📄",
  },
  {
    title: "Production Deployment",
    body: "AEVA is not theoretical. It has been deployed in production enterprise environments across manufacturing (Yamaha Motor Solutions India) and aviation (Etihad Airways, Dubai Airports).",
    icon: "✈️",
  },
];

function FrameworkPageHero() {
  const pillars = [
    {
      num: "01",
      label: "Ceremony restructuring",
      color: "#4A90D9",
    },
    {
      num: "02",
      label: "Lean AI-era team structure",
      color: "#E8902A",
    },
    {
      num: "03",
      label: "Velocity & financial model",
      color: "#5BBF8A",
    },
    {
      num: "04",
      label: "Five transition risks",
      color: "#C96DD8",
    },
  ];

  return (
    <div className="relative mb-10 overflow-hidden rounded-[24px] border border-[#1a2d45] bg-[#050a12] md:mb-14">
      <div className="pointer-events-none absolute inset-0 opacity-[0.92]">
        <div className="absolute inset-0 animate-[aevaGradientShift_24s_ease_infinite] bg-[radial-gradient(circle_at_15%_20%,rgba(74,144,217,0.18),transparent_45%),radial-gradient(circle_at_92%_18%,rgba(232,144,42,0.12),transparent_48%),radial-gradient(circle_at_78%_85%,rgba(200,109,216,0.14),transparent_50%),linear-gradient(158deg,#050a12,#081624,#050a12)] [background-size:180%_180%]" />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[#050a12]/25 to-[#050a12]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative z-10 px-5 py-9 md:px-9 md:py-11 lg:px-11 lg:py-12">
        <nav className="text-[11px] uppercase tracking-[0.12em] text-[#6b8aaa]">
          <Link href="/" className="transition-colors hover:text-[#dde6f0]">
            ChisokuLab
          </Link>{" "}
          →{" "}
          <Link href="/aeva" className="transition-colors hover:text-[#dde6f0]">
            AEVA
          </Link>{" "}
          → <span className="text-[#dde6f0]">Framework</span>
        </nav>

        <div className="mt-8 flex flex-col gap-10 lg:mt-10 lg:flex-row lg:items-stretch lg:justify-between lg:gap-14">
          <div className="min-w-0 flex-1">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#00d4ff]/35 bg-[#00d4ff]/[0.07] px-3.5 py-1.5 shadow-[0_0_28px_rgba(0,212,255,0.14)]">
              <span
                className="relative flex h-2 w-2 rounded-full bg-[#00d4ff]"
                style={{ boxShadow: "0 0 14px #00d4ff" }}
              >
                <span className="absolute inset-0 animate-ping rounded-full bg-[#00d4ff] opacity-35" />
              </span>
              <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#7ee9ff]">
                Methodology
              </span>
            </div>

            <h1 className="mt-6 max-w-[20ch] text-display font-semibold leading-[1.06] tracking-[-0.02em] text-[#dde6f0] md:max-w-none lg:max-w-[18ch]">
              How{" "}
              <span className="bg-gradient-to-r from-[#7dd3fc] via-[#a5f3fc] to-[#22d3ee] bg-clip-text text-transparent">
                AEVA
              </span>{" "}
              Works
            </h1>

            <p className="mt-6 max-w-2xl border-l-2 border-[#00d4ff]/35 pl-5 text-[17px] leading-relaxed text-[#9eb6d2] md:text-[18px]">
              Fourteen original intellectual contributions across four dimensions —
              developed from eleven years of field observation across nine countries
              and four industry verticals. Every element is implementable by a
              delivery team without requiring external consultancy to interpret.
            </p>
          </div>

          <aside className="flex w-full shrink-0 flex-col justify-between rounded-[18px] border border-[#1a2d45]/90 bg-[#060d15]/80 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-md lg:max-w-[320px]">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#6b8aaa]">
                Four dimensions
              </p>
              <p className="mt-1 text-[12px] leading-snug text-[#8aa4bf]">
                Scroll for full depth on each — ceremonies through risks.
              </p>
            </div>
            <ul className="mt-5 space-y-2.5">
              {pillars.map((p) => (
                <li
                  key={p.num}
                  className="flex items-center gap-3 rounded-[12px] border border-[#1a2d45]/85 bg-[#050a12]/70 py-2 pl-2.5 pr-3"
                >
                  <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-[11px] font-bold tabular-nums text-[#050a12]"
                    style={{
                      backgroundColor: p.color,
                      boxShadow: `0 4px 18px ${p.color}40`,
                    }}
                  >
                    {p.num}
                  </span>
                  <span className="text-[13px] font-medium leading-snug text-[#c5d7ea]">
                    {p.label}
                  </span>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default function AevaFrameworkPage() {
  return (
    <section className="bg-[#050a12] py-[var(--section-padding-y-mobile)] md:py-[var(--section-padding-y)]">
      <div className="mx-auto w-full max-w-[var(--content-max-width)] px-[var(--content-padding-x-mobile)] md:px-[var(--content-padding-x)]">
        <FrameworkPageHero />

        <div className="space-y-8 md:space-y-10">
          {/* Dimension 01 */}
          <DimensionCard
            dimensionNumber="01"
            color="#4A90D9"
            title="Ceremony Restructuring"
          >
            <p className="text-body text-[#6b8aaa]">
              Six core Agile ceremonies evolved into AI-era equivalents. Each has
              an original name — original AEVA intellectual property not existing
              in any prior methodology framework. The primary delivery unit
              shifts from Sprint to Increment — scope-defined, not time-defined.
            </p>
            <div className="space-y-5">
              {ceremoniesDim1.map((c) => (
                <div
                  key={c.title}
                  className="rounded-[16px] border border-[#1a2d45] bg-[#050a12]/50 p-5"
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#00d4ff]">
                    {c.title}
                  </p>
                  <p className="mt-1 text-[11px] text-[#6b8aaa]">
                    Replaces {c.replaces}
                  </p>
                  <ul className="mt-4 space-y-2 text-body text-[#6b8aaa]">
                    {c.bullets.map((b) => (
                      <li key={b}>- {b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </DimensionCard>

          {/* Dimension 02 */}
          <DimensionCard
            dimensionNumber="02"
            color="#E8902A"
            title="Lean AI-Era Team Structure"
          >
            <p className="text-body text-[#6b8aaa]">
              Every traditional Agile role assessed against a four-question Lean
              Test. The goal: maximum judgment per headcount — not maximum
              headcount managing AI. Result: approximately 40% headcount
              reduction at equivalent or superior output.
            </p>
            <div>
              <p className="text-label text-[#00d4ff]">Role evolution</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {roleEvolution.map((row) => (
                  <article
                    key={row.from}
                    className="rounded-[16px] border border-[#1a2d45] bg-[#050a12]/50 p-4"
                  >
                    <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#dde6f0]">
                      {row.from}
                      <span className="text-[#6b8aaa]"> → </span>
                      {row.to}
                    </p>
                    <p className="mt-2 text-body text-[#6b8aaa]">
                      {row.detail}
                    </p>
                  </article>
                ))}
              </div>
            </div>
            <div>
              <p className="text-label text-[#00d4ff]">
                Four new roles (original IP)
              </p>
              <ul className="mt-4 space-y-4 text-body text-[#6b8aaa]">
                {fourNewRoles.map((r, i) => (
                  <li key={r.title}>
                    <span className="font-semibold text-[#dde6f0]">
                      {i + 1}. {r.title}
                    </span>{" "}
                    — {r.body}
                  </li>
                ))}
              </ul>
            </div>
            <blockquote className="rounded-[16px] border border-[#f59e0b]/35 bg-[#f59e0b]/10 p-5 text-body text-[#dde6f0]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#f59e0b]">
                Junior-Senior Hierarchy Inversion
              </p>
              <p className="mt-3 text-[#dde6f0]">
                AI-assisted coding enables junior AI Orchestrators to execute at
                effective senior velocity on DCI 4-6 stories. Senior talent
                migrates to DCI 11-16 work where AI cannot substitute.
                Enterprises that recognise this early build higher-output teams
                at lower cost. This is not a future projection — it is an
                observable current reality.
              </p>
            </blockquote>
          </DimensionCard>

          {/* Dimension 03 */}
          <DimensionCard
            dimensionNumber="03"
            color="#5BBF8A"
            title="Velocity Recalibration and Financial Model"
          >
            <p className="text-body text-[#6b8aaa]">
              The primary financial frame is per-project cost — not annual team
              cost. AI compresses project duration. The annual comparison
              describes availability cost, not delivery cost.
            </p>
            <div>
              <p className="text-label text-[#00d4ff]">
                Decision Complexity Index
              </p>
              <p className="mt-2 text-body text-[#6b8aaa]">
                The DCI replaces story points as the primary estimation framework.
                Story points measure human cognitive effort. The DCI measures
                irreplaceable human judgment — the only production variable AI
                cannot substitute.
              </p>
            </div>
            <div>
              <p className="text-label text-[#00d4ff]">
                Four scoring dimensions
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {scoringAxes.map((ax) => (
                  <article
                    key={ax.label}
                    className="rounded-[16px] border border-[#1a2d45] bg-[#050a12]/50 p-4"
                  >
                    <p className="text-[11px] font-semibold text-[#dde6f0]">
                      {ax.label}
                    </p>
                    <p className="mt-2 text-body text-[#6b8aaa]">{ax.range}</p>
                  </article>
                ))}
              </div>
            </div>
            <div>
              <p className="text-label text-[#00d4ff]">Execution tiers</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {executionTiers.map((t) => (
                  <article
                    key={t.range}
                    className="rounded-[16px] border border-[#1a2d45] bg-[#050a12]/50 p-4"
                  >
                    <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#00d4ff]">
                      {t.range}: {t.label}
                    </p>
                    <p className="mt-2 text-body text-[#6b8aaa]">
                      {t.detail}
                    </p>
                  </article>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#a855f7]">
                Original IP — DCI Governance Shield
              </p>
              <p className="mt-2 text-body text-[#6b8aaa]">
                Three-layer architecture preventing gaming of DCI scores:
              </p>
              <ul className="mt-3 space-y-2 text-body text-[#6b8aaa]">
                {governanceShieldLayers.map((layer) => (
                  <li key={layer}>- {layer}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-label text-[#00d4ff]">Financial model</p>
              <div className="mt-4 rounded-[16px] border border-[#1a2d45] bg-[#050a12]/50 p-5">
                <ul className="space-y-2 text-body text-[#6b8aaa]">
                  <li>- Traditional team, 6 months: £332,500</li>
                  <li>- AEVA lean team, ~1 month: £38,220</li>
                  <li>- Per-project saving: 88% reduction</li>
                  <li>
                    - Annual project capacity (same team): 2 traditional → up to
                    12 AEVA
                  </li>
                  <li>
                    - Annual revenue capacity at £500K fee: £1M → £6M
                  </li>
                </ul>
              </div>
            </div>
          </DimensionCard>

          {/* Dimension 04 */}
          <DimensionCard
            dimensionNumber="04"
            color="#C96DD8"
            title="Five Transition Risks"
          >
            <p className="text-body text-[#6b8aaa]">
              The predictable, near-universal failure patterns that destroy
              enterprise AI adoption programmes before they reach production
              scale. Not technology failures — governance, behaviour, and
              leadership failures. Named, defined, and mitigated in AEVA.
            </p>
            <div className="space-y-5">
              {transitionRisks.map((risk) => (
                <article
                  key={risk.name}
                  className="rounded-[16px] border border-[#1a2d45] bg-[#050a12]/50 p-5"
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#c96dd8]">
                    Risk — {risk.name}
                  </p>
                  <p className="mt-3 text-body text-[#6b8aaa]">
                    <span className="font-semibold text-[#dde6f0]">
                      Definition:
                    </span>{" "}
                    {risk.definition}
                  </p>
                  <p className="mt-3 text-body text-[#6b8aaa]">
                    <span className="font-semibold text-[#dde6f0]">
                      {risk.extraLabel}:
                    </span>{" "}
                    {risk.extra}
                  </p>
                  {risk.mitigation ? (
                    <p className="mt-3 text-body text-[#6b8aaa]">
                      <span className="font-semibold text-[#dde6f0]">
                        Mitigation:
                      </span>{" "}
                      {risk.mitigation}
                    </p>
                  ) : null}
                  {"highlight" in risk && risk.highlight ? (
                    <div className="mt-4 rounded-[14px] border border-[#00d4ff]/35 bg-[#00d4ff]/10 p-4 text-body text-[#dde6f0]">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#00d4ff]">
                        Strategic Adoption Principle
                      </p>
                      <p className="mt-2">{risk.highlight}</p>
                    </div>
                  ) : null}
                </article>
              ))}
            </div>
          </DimensionCard>
        </div>

        <section className="relative mt-16 overflow-hidden rounded-[24px] border border-[#1a2d45] bg-[#070f18] md:mt-20">
          <div className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-[#a855f7]/12 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -right-16 h-64 w-64 rounded-full bg-[#00d4ff]/10 blur-3xl" />

          <div className="relative px-6 py-10 md:px-10 md:py-12">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
              <h2 className="text-h1 text-[#dde6f0]">Intellectual Property</h2>
              <p className="max-w-xl text-body-lg leading-relaxed text-[#6b8aaa] lg:max-w-[28rem] lg:text-right">
                Fourteen original IP claims across ceremony architecture,
                governance systems, team structure, financial modelling, and risk
                taxonomy. Filed under provisional patent protection.
              </p>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {credentials.map((credential) => (
                <article
                  key={credential.title}
                  className="group relative overflow-hidden rounded-[18px] border border-[#1a2d45] bg-[#0c1620]/95 p-5 transition duration-200 hover:-translate-y-[3px] hover:border-[#334e6b] hover:shadow-[0_20px_48px_rgba(0,0,0,0.38)] md:p-6"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#1a2d45] bg-[#050a12] text-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition group-hover:border-[#00d4ff]/35">
                    {credential.icon}
                  </div>
                  <h3 className="mt-5 text-h3 text-[#dde6f0]">
                    {credential.title}
                  </h3>
                  <p className="mt-2 text-body text-[#6b8aaa]">
                    {credential.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="relative mt-14 overflow-hidden rounded-[24px] border border-[#00d4ff]/35 md:mt-16">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#00d4ff]/[0.12] via-[#050a12] to-[#a855f7]/[0.08]" />
          <div className="pointer-events-none absolute -right-12 -top-12 h-56 w-56 rounded-full bg-[#00d4ff]/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 -left-8 h-48 w-48 rounded-full bg-[#a855f7]/15 blur-3xl" />

          <div className="relative flex flex-col gap-8 p-8 md:flex-row md:items-center md:justify-between md:gap-12 md:p-10">
            <h2 className="max-w-xl text-balance text-h1 leading-[1.12] text-[#dde6f0]">
              See how AEVA applies to your delivery environment
            </h2>
            <div className="flex shrink-0 flex-wrap gap-4">
              <Link
                href="/aeva/case-studies"
                className="inline-flex items-center justify-center rounded-full bg-[#00d4ff] px-8 py-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#050a12] shadow-[0_8px_28px_rgba(0,212,255,0.35)] transition hover:-translate-y-px hover:brightness-110"
              >
                View Deployment Evidence →
              </Link>
              <Link
                href="/aeva/book"
                className="inline-flex items-center justify-center rounded-full border border-[#00d4ff] bg-[#050a12]/40 px-8 py-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#00d4ff] backdrop-blur-sm transition hover:bg-[#00d4ff]/10"
              >
                Book a Call →
              </Link>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
