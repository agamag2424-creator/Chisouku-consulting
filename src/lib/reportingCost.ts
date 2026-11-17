/**
 * "What your PMO reporting costs today" (September port PRD, Story 3.1). Computed in the browser; nothing is sent.
 * Hours per year = people x hours each per week x 48 weeks. Cost per year = hours x fully loaded hourly cost.
 * The currency switch changes the symbol only, never the arithmetic. No saving, reclaim or percentage is shown.
 */

export const WEEKS_PER_YEAR = 48;

export type Currency = "GBP" | "USD";

export type ReportingCostInputs = { people: number; hoursPerWeek: number; hourlyCost: number; currency: Currency };

export const reportingCostDefaults: ReportingCostInputs = { people: 2, hoursPerWeek: 8, hourlyCost: 75, currency: "GBP" };

export const reportingCostLimits = {
  people: { min: 1, max: 50, step: 1 },
  hoursPerWeek: { min: 1, max: 40, step: 1 },
  hourlyCost: { min: 10, max: 500, step: 5 },
} as const;

const symbols: Record<Currency, string> = { GBP: "£", USD: "$" };

/** A typed-in number, kept inside the field's limits. Empty or invalid input falls back to the minimum. */
export function clampInput(value: number, field: keyof typeof reportingCostLimits): number {
  const { min, max } = reportingCostLimits[field];
  if (!Number.isFinite(value)) return min;
  return Math.min(max, Math.max(min, Math.round(value)));
}

export function reportingCost({ people, hoursPerWeek, hourlyCost, currency }: ReportingCostInputs) {
  const hoursPerYear = people * hoursPerWeek * WEEKS_PER_YEAR;
  const costPerYear = hoursPerYear * hourlyCost;
  return {
    hoursPerYear,
    costPerYear,
    hoursLabel: hoursPerYear.toLocaleString("en-GB"),
    costLabel: `${symbols[currency]}${costPerYear.toLocaleString("en-GB")}`,
    symbol: symbols[currency],
  };
}
