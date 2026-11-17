/**
 * Every label in the September diagrams (PRD "Diagram relabelling"). Change wording here; the components only lay it out.
 * Each diagram also has `alt`: the text a screen reader hears in place of the drawing.
 */

/** The three problems, in the order the cold emails use. */
export const threeProblems = [
  { id: "raid", short: "RAID logs nobody acts on", long: "RAID logs nobody acts on." },
  { id: "late-red", short: "Status that turns Red too late", long: "Status that turns Red too late." },
  { id: "forums", short: "Forums that cannot decide", long: "Governance forums that cannot actually decide." },
] as const;

export type ProblemId = (typeof threeProblems)[number]["id"];

/** PMO Health Map: the documents and forums a Health Check reads, with the three problems marked where they appear. */
export const healthMap = {
  eyebrow: "PMO Health Map",
  title: "Where the three problems show up",
  centreTitle: "Your PMO",
  centreSub: "WHAT WE READ AND WHERE IT BREAKS",
  nodes: [
    { id: "raid", title: "RAID log", sub: "Risks, actions, owners", problem: "raid" },
    { id: "status", title: "Status pack", sub: "Weekly status, RAG", problem: "late-red" },
    { id: "calendar", title: "Governance calendar", sub: "Forums, cadence", problem: null },
    { id: "plan", title: "Plan", sub: "Milestones, baseline", problem: null },
    { id: "forum", title: "Decision forum", sub: "Decisions, escalations", problem: "forums" },
  ],
  alt:
    "PMO Health Map. Your PMO sits in the centre, connected to five things a Health Check reads: the RAID log, the status pack, the governance calendar, the plan and the decision forum. Three problems are marked where they appear: RAID logs nobody acts on, on the RAID log; status that turns Red too late, on the status pack; and forums that cannot decide, on the decision forum.",
} as const;

/** "What we usually find" board: the three problems first, then five common signals. */
export const findingsBoard = {
  eyebrow: "What we usually find",
  count: "08 signals",
  problemsLabel: "The three problems",
  items: [
    { id: "01", label: "RAID logs nobody acts on", visual: "sheet", problem: true },
    { id: "02", label: "Status that turns Red too late", visual: "reactive", problem: true },
    { id: "03", label: "Governance forums that cannot actually decide", visual: "prep", problem: true },
    { id: "04", label: "Late escalation", visual: "late", problem: false },
    { id: "05", label: "Stale reporting", visual: "stale", problem: false },
    { id: "06", label: "No benefits tracking", visual: "cycle", problem: false },
    { id: "07", label: "Unclear decision rights", visual: "systems", problem: false },
    { id: "08", label: "Capacity conflicts", visual: "conflict", problem: false },
  ],
  alt:
    "What we usually find, eight signals. The three problems first: RAID logs nobody acts on, status that turns Red too late, and governance forums that cannot actually decide. Then late escalation, stale reporting, no benefits tracking, unclear decision rights and capacity conflicts.",
} as const;

export type FindingVisual = (typeof findingsBoard.items)[number]["visual"];

/** The Health Check in five working days. Wording matches the offer table (inputs, outputs, timing). */
export const healthCheckStrip = {
  eyebrow: "PMO Health Check",
  title: "Five working days after documents arrive",
  phases: [
    { name: "Documents in", output: "Your documents", detail: "Status pack, RAID log, governance calendar, plan", visual: "documents" },
    { name: "Interviews", output: "Three short interviews", detail: "Sponsor, PMO, delivery", visual: "interviews" },
    { name: "Scorecard", output: "PMO Health Scorecard", detail: "Filled in with evidence", visual: "scorecard" },
    { name: "Findings", output: "Top findings and 30-day fix plan", detail: "What to fix first, and who owns it", visual: "plan" },
    { name: "Readout", output: "45-minute readout", detail: "Findings walked through with you", visual: "readout" },
  ],
  alt:
    "The PMO Health Check in five working days after documents arrive. One: your documents come in: the status pack, RAID log, governance calendar and plan. Two: three short interviews. Three: the PMO Health Scorecard, filled in with evidence. Four: the top findings and a 30-day fix plan. Five: a 45-minute readout.",
} as const;

export type StripVisual = (typeof healthCheckStrip.phases)[number]["visual"];

/** The self-check's ten dimensions around the overall band. Dimension names come from content/pmoSelfCheck.ts. */
export const dimensionOrbit = {
  centreTitle: "Overall band",
  centreSub: "10 DIMENSIONS",
  caption: "PMO Health Scorecard",
  alt:
    "The PMO Health Scorecard: ten dimensions around one overall band. Governance and decision rights, portfolio prioritisation, benefits realisation, risk and RAID, reporting and data quality, resource and capacity, stakeholder engagement, methods and tooling, financial control, and PMO value perception.",
} as const;

/** Sample scorecard excerpt. Fictional: never a client. */
export const scorecardExcerpt = {
  label: "Sample. Fictional organisation.",
  eyebrow: "Scorecard excerpt",
  title: "PMO Health Scorecard",
  organisation: "Harbour Lane Services (fictional)",
  columns: { dimension: "Dimension", level: "Level", evidence: "Evidence seen" },
  rows: [
    { dimension: "Risk and RAID", level: "Emerging", status: "miss", evidence: "34 open actions; 21 past due; no owner on 9." },
    { dimension: "Reporting and data quality", level: "Emerging", status: "part", evidence: "Status Green for 7 weeks; milestones slipped in 4." },
    { dimension: "Governance and decision rights", level: "Defined", status: "part", evidence: "Steering meets monthly; 2 of 6 decisions recorded." },
  ],
  side: [
    { label: "Overall band", value: "Building consistency" },
    { label: "Flagged", value: "RAID, Reporting" },
    { label: "Fix plan", value: "30 days" },
  ],
  linkLabel: "See the full sample scorecard and 30-day fix plan",
  alt:
    "Sample PMO Health Scorecard excerpt for a fictional organisation. Risk and RAID at Emerging: 34 open actions, 21 past due, no owner on 9. Reporting and data quality at Emerging: status Green for 7 weeks while milestones slipped in 4. Governance and decision rights at Defined: steering meets monthly and 2 of 6 decisions are recorded. Overall band: Building consistency. Flagged: RAID and Reporting. A 30-day fix plan follows.",
} as const;

export type ScorecardStatus = "ok" | "part" | "miss";
