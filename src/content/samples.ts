/**
 * The sample PMO Health Scorecard and 30-day fix plan on /see-it-first (PRD change 8). Fictional: never a client.
 * The excerpt in content/diagrams.ts shows three of these rows; keep the two in step.
 */
import type { DimensionId } from "./pmoSelfCheck";

export const sampleLabel = "Sample. Fictional organisation.";

export const sampleOrganisation = {
  name: "Harbour Lane Services (fictional)",
  context: "A UK services business with 14 live projects, a central PMO of three and a monthly steering committee.",
};

export type SampleRow = {
  dimension: DimensionId;
  /** Level on the five-level scale, 1 to 5. */
  level: 1 | 2 | 3 | 4 | 5;
  status: "ok" | "part" | "miss";
  evidence: string;
  finding: string;
};

export const sampleScorecard: readonly SampleRow[] = [
  { dimension: "A", level: 3, status: "part", evidence: "Steering meets monthly; 2 of 6 decisions recorded.", finding: "Decision rights are written down, but most decisions are not recorded." },
  { dimension: "B", level: 3, status: "part", evidence: "One intake form; ranking criteria exist but are not applied to 5 of 14 projects.", finding: "A third of the portfolio skipped the ranking." },
  { dimension: "C", level: 3, status: "part", evidence: "Benefits listed with owners on 9 of 14 business cases.", finding: "No check after closure yet." },
  { dimension: "D", level: 2, status: "miss", evidence: "34 open actions; 21 past due; no owner on 9.", finding: "The RAID log is kept, not acted on." },
  { dimension: "E", level: 2, status: "miss", evidence: "Status Green for 7 weeks; milestones slipped in 4.", finding: "Status turns Red too late: no written rule for Amber or Red." },
  { dimension: "F", level: 3, status: "part", evidence: "Shared view of key roles, updated monthly.", finding: "Capacity is not checked before new work is approved." },
  { dimension: "G", level: 3, status: "part", evidence: "Sponsor duties written; 3 of 5 sponsors attended the last steering.", finding: "Sponsors attend, but escalations wait for the next meeting." },
  { dimension: "H", level: 3, status: "ok", evidence: "One method with a lighter route for small projects; most follow it.", finding: "Proportionate and used." },
  { dimension: "I", level: 3, status: "part", evidence: "Budgets and monthly forecasts on every significant project.", finding: "Forecasts are not combined at portfolio level." },
  { dimension: "J", level: 3, status: "part", evidence: "Written PMO mandate; no customer feedback collected.", finding: "The PMO does not yet know how its customers see it." },
];

export const sampleSummary = {
  band: "Building consistency",
  overall: "2.8",
  flagged: ["Risk and RAID", "Reporting and data quality"],
  headline:
    "Two of the three problems are present: RAID logs nobody acts on, and status that turns Red too late. Steering meets, but records few decisions.",
};

export type SampleAction = { when: string; action: string; owner: string; evidence: string };

export const sampleFixPlan: readonly SampleAction[] = [
  {
    when: "Week 1",
    action: "Give every open RAID action an owner and a due date; close or archive the 9 with no owner.",
    owner: "PMO lead",
    evidence: "RAID log export with every open action owned and dated.",
  },
  {
    when: "Week 1 to 2",
    action: "Write down what makes a status Amber or Red, tied to milestones and spend.",
    owner: "PMO lead, agreed with sponsors",
    evidence: "Status rules page in the next status pack.",
  },
  {
    when: "Week 2",
    action: "Re-baseline the 4 slipped milestones and report them Red until they are.",
    owner: "Programme managers",
    evidence: "Next status pack.",
  },
  {
    when: "Week 2 to 3",
    action: "Record each steering decision with its reason and the data used.",
    owner: "Steering chair",
    evidence: "Decision log for the next two meetings.",
  },
  {
    when: "Week 4",
    action: "Review: are actions closing, did status move earlier, did steering decide?",
    owner: "Executive sponsor",
    evidence: "A 45-minute review against this plan.",
  },
];
