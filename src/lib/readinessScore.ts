/** Yes / Partly / No for one readiness question. */
export type Choice = "yes" | "partly" | "no";

/** Band for a total out of 12. Scores move in steps of 0.5, so each total lands in one band. */
export type BandId = "not_ready" | "partly_ready" | "ready";

export const choiceScore: Record<Choice, number> = {
  yes: 1,
  partly: 0.5,
  no: 0,
};

export const AREA_COUNT = 6;
export const QUESTIONS_PER_AREA = 2;
export const QUESTION_COUNT = AREA_COUNT * QUESTIONS_PER_AREA;

/** Analytics value when every area scores 2 and the weakest-area line is hidden. */
export const NO_WEAKEST_AREA = "none";

export type ReadinessScore = {
  areaScores: number[];
  total: number;
  band: BandId;
  /** Earliest area with the lowest score, or null when every area scores 2. */
  weakestAreaIndex: number | null;
};

/** "6", "0.5", "1.5". Halves are the only fractional scores. */
export function formatScore(score: number): string {
  return Number.isInteger(score) ? String(score) : score.toFixed(1);
}

/** 0–5 not ready, 5.5–8.5 partly ready, 9–12 ready to evidence. */
export function bandForTotal(total: number): BandId {
  if (total <= 5) return "not_ready";
  if (total >= 9) return "ready";
  return "partly_ready";
}

/**
 * Lowest area score. Ties stay with the earlier area (order 1–6).
 * Null when every area scores 2 out of 2.
 */
export function weakestAreaIndex(areaScores: readonly number[]): number | null {
  if (areaScores.length === 0 || areaScores.every((score) => score === 2)) return null;
  let weakest = 0;
  for (let index = 1; index < areaScores.length; index += 1) {
    if (areaScores[index] < areaScores[weakest]) weakest = index;
  }
  return weakest;
}

/** Twelve answers in area order. Each area is the sum of its two questions (max 2). Total max 12. */
export function scoreAnswers(answers: readonly Choice[]): ReadinessScore {
  if (answers.length !== QUESTION_COUNT) {
    throw new Error(`Expected ${QUESTION_COUNT} answers, received ${answers.length}`);
  }

  const areaScores: number[] = [];
  for (let area = 0; area < AREA_COUNT; area += 1) {
    const start = area * QUESTIONS_PER_AREA;
    areaScores.push(choiceScore[answers[start]] + choiceScore[answers[start + 1]]);
  }

  const total = areaScores.reduce((sum, score) => sum + score, 0);
  return {
    areaScores,
    total,
    band: bandForTotal(total),
    weakestAreaIndex: weakestAreaIndex(areaScores),
  };
}
