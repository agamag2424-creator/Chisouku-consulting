/**
 * Drop-in question bank for /pmo-self-check.
 * TODO: replace the placeholder entries with the researched question bank.
 * Do not draft question text, scores or band wording in this file.
 */

export const selfCheckAreas = [
  "governance",
  "raid",
  "reporting",
  "benefits",
  "resourcing",
  "stakeholders",
] as const;

export type SelfCheckAreaId = (typeof selfCheckAreas)[number];

export type SelfCheckQuestion = {
  id: string;
  area: SelfCheckAreaId;
  /** TODO: researched question text. Empty until that bank is dropped in. */
  text: string;
};

/** One empty slot per area. The researched bank replaces this list (expected 8 to 12 questions). */
export const selfCheckQuestions: readonly SelfCheckQuestion[] = [
  { id: "governance", area: "governance", text: "" },
  { id: "raid", area: "raid", text: "" },
  { id: "reporting", area: "reporting", text: "" },
  { id: "benefits", area: "benefits", text: "" },
  { id: "resourcing", area: "resourcing", text: "" },
  { id: "stakeholders", area: "stakeholders", text: "" },
];
