/** Inputs to the slipped go-live estimate (PRD 9.11). All amounts in the configured currency. */
export type SlipInputs = {
  people: number;
  dayRate: number;
  weeks: number;
  parallelRunMonthly: number;
};

export type SlipResult = {
  weeklyRunRate: number;
  totalCost: number;
  /** Comparison price expressed as working days of run-rate, one decimal; null when there is no daily run-rate. */
  comparisonDays: number | null;
};

const WEEKS_PER_YEAR = 52;
const MONTHS_PER_YEAR = 12;

/** Negative or non-finite input counts as zero. */
function clean(value: number): number {
  return Number.isFinite(value) && value > 0 ? value : 0;
}

/**
 * Weekly run-rate = people × day rate × working days + monthly parallel-run cost × 12 ÷ 52.
 * Cost of the slip = weekly run-rate × weeks. Comparison = price ÷ (people × day rate).
 */
export function slipEstimate(
  inputs: SlipInputs,
  config: { workingDaysPerWeek: number; comparisonPrice: number },
): SlipResult {
  const people = clean(inputs.people);
  const dayRate = clean(inputs.dayRate);
  const weeks = clean(inputs.weeks);
  const parallelRunMonthly = clean(inputs.parallelRunMonthly);

  const dailyRunRate = people * dayRate;
  const weeklyRunRate = dailyRunRate * config.workingDaysPerWeek + (parallelRunMonthly * MONTHS_PER_YEAR) / WEEKS_PER_YEAR;
  const comparisonDays = dailyRunRate > 0 ? Math.round((config.comparisonPrice / dailyRunRate) * 10) / 10 : null;

  return { weeklyRunRate, totalCost: weeklyRunRate * weeks, comparisonDays };
}

/** "Cost of a 4-week slip", "Cost of an 8-week slip": "an" when the number is spoken with a vowel (8, 11, 18, 80s). */
export function slipLabel(weeks: number): string {
  const article = /^(8|11(?!\d)|18(?!\d))/.test(String(weeks)) ? "an" : "a";
  return `Cost of ${article} ${weeks}-week slip`;
}
