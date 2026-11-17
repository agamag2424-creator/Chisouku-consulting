/**
 * PMO self-check scoring (research file, section 3.1). Pure functions; runs in the browser only.
 * - Each answered question scores 1 to 5. "Not sure" is excluded from every average and listed.
 * - Dimension score = mean of its answered questions. A dimension with no answered question is "not scored".
 * - Overall score = equal-weight mean of the scored dimensions.
 * - More than `provisionalAfter` "Not sure" answers makes the result provisional.
 * - Any dimension at `weakAt` or below is flagged, whatever the band. Bands and flags use the raw scores;
 *   one decimal place is for display only.
 */
import {
  bands,
  dimensions,
  provisionalAfter,
  questions,
  weakAt,
  type Band,
  type DimensionId,
} from "../content/pmoSelfCheck";

/** 1 to 5, or "unsure". Questions not in the map are unanswered. */
export type Answer = 1 | 2 | 3 | 4 | 5 | "unsure";
export type Answers = Partial<Record<string, Answer>>;

export type DimensionResult = { id: DimensionId; name: string; score: number | null; flagged: boolean };

export type SelfCheckResult = {
  dimensions: DimensionResult[];
  overall: number | null;
  band: Band | null;
  flagged: DimensionId[];
  unsure: string[];
  provisional: boolean;
};

const mean = (values: number[]) => values.reduce((sum, v) => sum + v, 0) / values.length;

/** One decimal place for display ("2.0"); never used for banding or flags. */
export const formatScore = (score: number | null) => (score === null ? "Not scored" : score.toFixed(1));

export function bandFor(overall: number): Band {
  return [...bands].reverse().find((band) => overall >= band.from) ?? bands[0];
}

export function scoreSelfCheck(answers: Answers): SelfCheckResult {
  const dimensionResults = dimensions.map((d) => {
    const scores = questions
      .filter((q) => q.dimension === d.id)
      .map((q) => answers[q.id])
      .filter((a): a is 1 | 2 | 3 | 4 | 5 => typeof a === "number");
    const score = scores.length ? mean(scores) : null;
    return { id: d.id, name: d.name, score, flagged: score !== null && score <= weakAt };
  });
  const scored = dimensionResults.filter((d) => d.score !== null).map((d) => d.score as number);
  const overall = scored.length ? mean(scored) : null;
  const unsure = questions.filter((q) => answers[q.id] === "unsure").map((q) => q.id);
  return {
    dimensions: dimensionResults,
    overall,
    band: overall === null ? null : bandFor(overall),
    flagged: dimensionResults.filter((d) => d.flagged).map((d) => d.id),
    unsure,
    provisional: unsure.length > provisionalAfter,
  };
}
