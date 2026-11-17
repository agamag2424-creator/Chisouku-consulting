/**
 * PMO self-check content, verbatim from the research file `pmo-self-check-research.md` (17 Nov 2026).
 * The ten dimensions are the PMO Health Scorecard: the free self-check scores them from one person's answers, and the
 * paid PMO Health Check fills the same ten in with evidence. Question and level wording is our own (research 5.1).
 * Assumptions (research 3.1, 3.2): equal weighting per dimension, round band cut-offs not calibrated on any dataset.
 */

export const dimensionIds = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"] as const;

export type DimensionId = (typeof dimensionIds)[number];

export type Dimension = {
  id: DimensionId;
  name: string;
  /** Short label for diagrams. */
  short: string;
};

export const dimensions: readonly Dimension[] = [
  { id: "A", name: "Governance and decision rights", short: "Governance" },
  { id: "B", name: "Portfolio prioritisation", short: "Prioritisation" },
  { id: "C", name: "Benefits realisation", short: "Benefits" },
  { id: "D", name: "Risk and RAID", short: "RAID" },
  { id: "E", name: "Reporting and data quality", short: "Reporting" },
  { id: "F", name: "Resource and capacity", short: "Capacity" },
  { id: "G", name: "Stakeholder engagement", short: "Stakeholders" },
  { id: "H", name: "Methods and tooling", short: "Methods" },
  { id: "I", name: "Financial control", short: "Finance" },
  { id: "J", name: "PMO value perception", short: "PMO value" },
];

/** Our own level labels (research 2, design notes). Score = position + 1. */
export const levels = ["Ad hoc", "Emerging", "Defined", "Measured", "Improving"] as const;

export const notSureLabel = "Not sure";

export type Question = {
  id: string;
  dimension: DimensionId;
  text: string;
  /** Five observable-practice descriptors, level 1 to 5. */
  options: readonly [string, string, string, string, string];
};

export const questions: readonly Question[] = [
  {
    id: "Q1",
    dimension: "A",
    text: "When a project needs to start, change course or stop, who decides, and how?",
    options: [
      "Nobody is clearly in charge of these calls. Decisions happen in corridors or by escalation.",
      "Some large projects have a sponsor or board. Others do not. Decision rights vary by person.",
      "Every project above a set size has a named sponsor and a decision forum. Who decides what is written down.",
      "Decisions are logged with the reason and the data used. We check that forums meet and decide on time.",
      "We review our decision rules at least yearly and change them based on what slowed us down or went wrong.",
    ],
  },
  {
    id: "Q2",
    dimension: "A",
    text: "Do projects pass through review points where they can really be stopped or re-scoped?",
    options: [
      "There are no review points. Projects run until they finish or fade out.",
      "Review points exist on paper for some projects, but they are rarely used to stop or reshape work.",
      "All significant projects have defined review points with clear criteria. Projects are sometimes stopped or re-scoped.",
      "We track review outcomes (continue, change, stop) across the portfolio. Stopping a weak project is seen as good governance.",
      "We use what we learn from review outcomes to adjust the criteria and the points themselves.",
    ],
  },
  {
    id: "Q3",
    dimension: "B",
    text: "How is new work chosen and ranked against other work?",
    options: [
      "Work starts when someone senior asks for it. There is no comparison with other work.",
      "There is a list of projects, and some ranking happens, but it is mostly by who shouts loudest.",
      "All proposed work goes through one intake route and is ranked against written criteria linked to strategy.",
      "Ranking uses consistent data (value, cost, risk, capacity). Leaders can see why one item ranks above another.",
      "We check whether our ranking predicted real value and refine the criteria.",
    ],
  },
  {
    id: "Q4",
    dimension: "B",
    text: "When priorities or budgets change, how does the portfolio respond?",
    options: [
      "New work is added on top. Nothing is paused or stopped.",
      "Some reshuffling happens, but it is informal and slow.",
      "There is a regular portfolio review (for example quarterly) where work can be paused, stopped or added.",
      "Changes are decided with a view of their knock-on effect on capacity, cost and benefits.",
      "The portfolio is rebalanced as conditions change, and we review how well past rebalancing decisions worked.",
    ],
  },
  {
    id: "Q5",
    dimension: "C",
    text: "Before a project is approved, are its expected benefits defined and owned?",
    options: [
      'Benefits are not written down, or are vague ("improve efficiency").',
      "Some business cases list benefits, but without measures or owners.",
      "Approved projects list benefits with a measure, a baseline and a named business owner.",
      "Benefits are checked at review points, and projects whose benefits fall away are challenged.",
      "We compare forecast with actual benefits across projects and use the gap to improve future estimates.",
    ],
  },
  {
    id: "Q6",
    dimension: "C",
    text: "After a project closes, does anyone check whether the benefits arrived?",
    options: [
      "No. Once delivered, the project is forgotten.",
      "Occasionally, for high-profile projects, often as a one-off exercise.",
      "There is a defined point after closure when the business owner reports on benefits.",
      "Realised benefits are tracked and reported to leadership alongside delivery status.",
      "Benefit results feed back into how we rank and approve new work.",
    ],
  },
  {
    id: "Q7",
    dimension: "D",
    text: "How are risks, assumptions, issues and dependencies (RAID) managed, and do they reach the people who can act?",
    options: [
      "Risks are discussed when something goes wrong. There is no log.",
      "Some projects keep a RAID log, but it is rarely updated or reviewed.",
      "All significant projects keep a current RAID log with owners and actions, reviewed at a set rhythm.",
      "Major risks and cross-project dependencies are rolled up to portfolio level and escalated against clear thresholds.",
      "We review which risks actually happened and refine how we identify and rate them.",
    ],
  },
  {
    id: "Q8",
    dimension: "E",
    text: "How much do leaders trust the project status they receive?",
    options: [
      "Status is mostly green until it suddenly turns red. Leaders rely on side conversations.",
      "Reports exist, but formats differ and the data is often out of date.",
      "One standard report format and one cut-off date. Status rules (what makes amber or red) are written down.",
      "Reports come from one source of data. Status is checked against evidence such as milestones and spend.",
      "We test how well our reports predicted problems and improve the measures and the data.",
    ],
  },
  {
    id: "Q9",
    dimension: "E",
    text: "Are portfolio reports used to make decisions, or just to inform?",
    options: [
      "Reports are produced but rarely read.",
      "Reports are read, but decisions are mostly made elsewhere.",
      "Reports go to a defined forum and some decisions are taken on them.",
      "Each report leads to recorded decisions or actions, and they are followed up.",
      "Leaders ask for changes to reports because they rely on them, and we adapt them.",
    ],
  },
  {
    id: "Q10",
    dimension: "F",
    text: "Do you know whether you have the people to deliver the work you have committed to?",
    options: [
      "No. People are assigned as work arrives and overload is found late.",
      "Each team knows its own load, but there is no shared view across projects.",
      "There is a shared view of key roles and their commitments, updated regularly.",
      "New work is approved only after checking capacity for key roles and skills.",
      "We compare planned and actual effort and use it to improve how we plan capacity and skills.",
    ],
  },
  {
    id: "Q11",
    dimension: "G",
    text: "How actively do sponsors and senior stakeholders take part?",
    options: [
      "Sponsors are named but rarely involved.",
      "Some sponsors are active; many only appear when things go wrong.",
      "Sponsor duties are written down, and most sponsors attend reviews and make decisions.",
      "Sponsor and stakeholder engagement is planned and checked, with gaps raised and fixed.",
      "We ask sponsors and stakeholders for feedback and improve how we work with them.",
    ],
  },
  {
    id: "Q12",
    dimension: "G",
    text: "Is someone at executive level accountable for how the organisation runs its projects and portfolio?",
    options: [
      "No. The PMO, if any, reports to someone without real influence over priorities.",
      "An executive is nominally responsible but rarely engages.",
      "A named executive owns the portfolio and attends portfolio reviews.",
      "That executive uses portfolio data to steer the organisation and backs the PMO's challenge.",
      "Executive ownership is reviewed as the organisation changes, so it stays effective.",
    ],
  },
  {
    id: "Q13",
    dimension: "H",
    text: "Are your methods and tools proportionate and actually used?",
    options: [
      "Each project manager uses their own approach and tools.",
      "There is a method or template set, but it is either too heavy or widely ignored.",
      "A standard approach exists with clear rules on how to scale it to project size and type. Most projects follow it.",
      "Tool use is consistent enough that data can be combined across projects. Compliance is checked lightly.",
      "We gather feedback from project teams and retire or simplify steps that do not add value.",
    ],
  },
  {
    id: "Q14",
    dimension: "I",
    text: "How well are project costs forecast and controlled?",
    options: [
      "Costs are known only after the fact, if at all.",
      "Budgets are set, but forecasts are rarely updated and overspends are found late.",
      "Every significant project has a budget, a regular forecast and a named person accountable for cost.",
      "Cost forecasts are combined at portfolio level and drive decisions on funding and priorities.",
      "We review forecast accuracy and improve how we estimate.",
    ],
  },
  {
    id: "Q15",
    dimension: "J",
    text: "Does the PMO have a clear offer, and do the people it serves value it?",
    options: [
      "There is no PMO, or its role is unclear and it is seen mainly as admin or overhead.",
      "The PMO runs reporting and templates. Some people find it useful; others see it as bureaucracy.",
      "The PMO has a written mandate and a defined list of services agreed with leadership.",
      "The PMO measures its services and asks its customers for feedback at least yearly.",
      "The PMO changes its services based on that feedback and can show how it helps the organisation decide and deliver.",
    ],
  },
];

export type BandId = "starting-out" | "building-consistency" | "defined" | "measured-improving";

export type Band = {
  id: BandId;
  name: string;
  /** Lowest overall score in the band (raw score, not rounded). */
  from: number;
  range: string;
  meaning: string;
  examineNext: string;
};

/** Research 3.2. "Self-assessments tend to score generously" is phrased as "worth checking with evidence" (3.2 note). */
export const bands: readonly Band[] = [
  {
    id: "starting-out",
    name: "Starting out",
    from: 1,
    range: "1.0 to 1.9",
    meaning:
      "Project work is mostly run person by person. Decisions, priorities and status depend on who is involved. This is common where a PMO is new or absent. It is a starting point, not a failure.",
    examineNext:
      "Who actually makes start, stop and priority calls today. Whether there is one list of all work. The two or three lowest dimensions, and what a minimum governance setup would look like.",
  },
  {
    id: "building-consistency",
    name: "Building consistency",
    from: 2,
    range: "2.0 to 2.9",
    meaning:
      "Good practice exists in places, often in larger projects or teams with strong managers, but it is not consistent. Reports and decisions may not line up.",
    examineNext:
      "Where practice varies and why. Evidence review of a sample of status reports, RAID logs and business cases. Whether the PMO's role is agreed with leadership. Flagged weak dimensions.",
  },
  {
    id: "defined",
    name: "Defined",
    from: 3,
    range: "3.0 to 3.9",
    meaning:
      "There is a defined, mostly followed way of running projects and the portfolio. The next question is whether it informs decisions and shows value, rather than just being followed.",
    examineNext:
      "Whether reports drive decisions. Whether benefits are tracked after closure. Whether capacity is checked before approval. How the PMO's customers see it.",
  },
  {
    id: "measured-improving",
    name: "Measured and improving",
    from: 4,
    range: "4.0 to 5.0",
    meaning:
      "Your answers describe data-led governance and active improvement. That is worth checking with evidence and a second view.",
    examineNext:
      "Evidence check of a few high-scoring answers. Views from sponsors and delivery teams, not only the PMO. Any flagged dimension. Where effort could be reduced without losing control.",
  },
];

/** What every result says it does not mean (research 3.3). */
export const doesNotMean =
  "This is a self-reported snapshot from one person. It does not compare you with other organisations, and it is not an official or accredited assessment.";

/** The link between the free check and the paid one (PRD change 3). */
export const sameScorecardLine =
  "The PMO Health Check fills in this same scorecard, all ten dimensions, with evidence from your documents and three short interviews.";

/** Footer on the main page: no framework names there (PRD Story 5.4). */
export const selfCheckFooter =
  "This self-check is a quick, self-reported snapshot. It is informed by public material on PMO and portfolio maturity. It is not an official or accredited assessment.";

/** More than this many "Not sure" answers makes the result provisional (research 3.1, rule 4). */
export const provisionalAfter = 3;

/** A dimension at or below this score is flagged, whatever the band (research 3.1, rule 5). */
export const weakAt = 2.0;
