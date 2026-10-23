import type { BandId, Choice } from "../lib/readinessScore";

/**
 * Wording for /readiness. Verbatim from the approved en-GB copy.
 * Components read these strings; they do not write their own.
 */

export const title = "Go-live readiness check";

export const subtitle =
  "Independent go-live decision assurance for ERP and core-platform programmes in the UAE and Saudi Arabia.";

export const intro =
  "Your programme reports Green. These 12 questions test whether the evidence agrees. Answer for where your programme is today; it takes 6–8 minutes, and you get a score out of 12, your weakest area and one next step for it.";

export const startButton = "Start the readiness check";

export function progressLabel(n: number): string {
  return `Question ${n} of 12`;
}

export const helperLine = "Pick the answer closest to today. Partly means started but not finished.";

export const answerOptions: readonly { choice: Choice; label: string; help: string }[] = [
  { choice: "yes", label: "Yes", help: "done, and you could show the evidence today." },
  { choice: "partly", label: "Partly", help: "started but not finished." },
  { choice: "no", label: "No", help: "not started, or you are not sure." },
];

export const scorePrefix = "Your score:";
export const scoreSuffix = "out of 12";

export function scoreLine(total: string): string {
  return `${scorePrefix} ${total} ${scoreSuffix}`;
}

export function scoreOfTwo(score: string): string {
  return `${score} / 2`;
}

export function areaLine(area: string, score: string): string {
  return `${area}: ${scoreOfTwo(score)}`;
}

export function areaProgress(answered: number): string {
  return `${answered} of 2`;
}

export const smallPrint = "Based only on your 12 answers. Not a benchmark or an audit.";

export const selfAssessment = "A self-assessment, not a go-live recommendation.";

export function weakestAreaLine(area: string): string {
  return `Your weakest area: ${area}`;
}

export const supportingLine = "Want a second view on these areas? Talk it through with us.";

export const bookButton = "Book a 30-minute call";

export const briefButton = "Request a free readiness brief";

export const controls = {
  back: "Back",
  next: "Next",
  startAgain: "Start again",
} as const;

export const bands: Record<BandId, { label: string; range: string; text: string }> = {
  not_ready: {
    label: "Not ready yet",
    range: "0–5",
    text: "Several of the basics behind a go-live decision are not yet in place or not yet evidenced. A go-live date set now rests on plans rather than proof. Start with your weakest area below.",
  },
  partly_ready: {
    label: "Partly ready",
    range: "5.5–8.5",
    text: "Some of the evidence is in place, but there are gaps a steering committee would be right to ask about. Closing your weakest area first gives the decision a firmer base.",
  },
  ready: {
    label: "Ready to evidence",
    range: "9–12",
    text: "On your own answers, most of what a go-live decision needs is in place. The next test is whether the evidence holds up when someone outside the programme reads it. Check your weakest area before the decision is signed.",
  },
};

export const bandOrder: readonly BandId[] = ["not_ready", "partly_ready", "ready"];

export type JargonId = "sit" | "uat" | "mockLoads" | "hypercare" | "cutover";

export const jargon: Record<JargonId, { term: string; hint: string }> = {
  sit: {
    term: "SIT",
    hint: "testing that the new system works with the other systems it connects to.",
  },
  uat: {
    term: "UAT",
    hint: "testing by the business that the system supports their real work.",
  },
  mockLoads: {
    term: "Mock loads",
    hint: "practice runs of moving your data into the new system.",
  },
  hypercare: {
    term: "Hypercare",
    hint: "the period of extra support straight after go-live.",
  },
  cutover: {
    term: "Cutover",
    hint: "the planned steps for switching from the old system to the new one.",
  },
};

export type ReadinessQuestion = {
  id: string;
  text: string;
  /** Shown under this question: the first use of each term. */
  jargon: readonly JargonId[];
};

export type ReadinessArea = {
  id: string;
  name: string;
  nextStep: string;
  questions: readonly ReadinessQuestion[];
};

export const areas: readonly ReadinessArea[] = [
  {
    id: "scope",
    name: "Scope and go-live date",
    nextStep: "Next step: list every open change request and decide which go after go-live.",
    questions: [
      { id: "q1", text: "Can the go-live date move if readiness is not proven?", jargon: [] },
      { id: "q2", text: "Is scope frozen?", jargon: [] },
    ],
  },
  {
    id: "testing",
    name: "Testing evidence",
    nextStep:
      "Next step: agree written exit criteria for testing (SIT and UAT), then record the result against each one.",
    questions: [
      {
        id: "q3",
        text: "Are the exit criteria for system integration testing (SIT) and user acceptance testing (UAT) written down and agreed?",
        jargon: ["sit", "uat"],
      },
      {
        id: "q4",
        text: "Is there recorded evidence that those exit criteria have been met?",
        jargon: [],
      },
    ],
  },
  {
    id: "data",
    name: "Data migration",
    nextStep: "Next step: reconcile the latest trial load against the source and get the data owner to sign it.",
    questions: [
      {
        id: "q5",
        text: "Have your trial data loads (mock loads) been reconciled against the source system?",
        jargon: ["mockLoads"],
      },
      {
        id: "q6",
        text: "Has the business signed off the reconciled results of those trial loads?",
        jargon: [],
      },
    ],
  },
  {
    id: "cutover",
    name: "Cutover and rollback",
    nextStep: "Next step: run one full cutover rehearsal, including a rollback, and time each step.",
    questions: [
      { id: "q7", text: "Has the cutover plan been rehearsed end to end?", jargon: ["cutover"] },
      { id: "q8", text: "Has the rollback been tested, not just documented?", jargon: [] },
    ],
  },
  {
    id: "people",
    name: "People and support",
    nextStep: "Next step: name your hypercare team and check each role has had task-based training.",
    questions: [
      {
        id: "q9",
        text: "Have the people who will use the new system been trained on their own day-to-day tasks?",
        jargon: [],
      },
      {
        id: "q10",
        text: "Is the post-go-live support team (hypercare) named and staffed for the first weeks?",
        jargon: ["hypercare"],
      },
    ],
  },
  {
    id: "governance",
    name: "Governance",
    nextStep: "Next step: name the go-live signatory and write down the evidence they need to see.",
    questions: [
      { id: "q11", text: "Is one named person accountable for signing the go-live decision?", jargon: [] },
      {
        id: "q12",
        text: "Have you agreed in advance what evidence that person needs to see before signing?",
        jargon: [],
      },
    ],
  },
];

export type FlatQuestion = ReadinessQuestion & {
  number: number;
  areaIndex: number;
};

export const questions: readonly FlatQuestion[] = areas.flatMap((area, areaIndex) =>
  area.questions.map((question, indexInArea) => ({
    ...question,
    number: areaIndex * 2 + indexInArea + 1,
    areaIndex,
  })),
);
