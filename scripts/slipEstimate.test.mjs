// Unit tests for src/lib/slipEstimate.ts (E1.5). Run: npm run test:unit
import assert from "node:assert/strict";
import { test } from "node:test";
import { siteConfig } from "../src/lib/siteConfig.ts";
import { slipEstimate } from "../src/lib/slipEstimate.ts";

const config = {
  workingDaysPerWeek: siteConfig.slipEstimator.workingDaysPerWeek,
  comparisonPrice: siteConfig.offers.evidenceCheck.listPrice,
};

test("example values: USD 120,000 a week, 480,000 for 4 weeks, 0.2 working days for the Evidence Check", () => {
  const result = slipEstimate(siteConfig.slipEstimator.defaults, config);
  assert.equal(result.weeklyRunRate, 120000);
  assert.equal(result.totalCost, 480000);
  assert.equal(result.comparisonDays, 0.2);
});

test("zero people hides the comparison (no division by zero)", () => {
  const result = slipEstimate({ people: 0, dayRate: 600, weeks: 4, parallelRunMonthly: 0 }, config);
  assert.equal(result.comparisonDays, null);
  assert.equal(result.weeklyRunRate, 0);
});

test("monthly parallel-run cost adds × 12 ÷ 52 per week", () => {
  const base = slipEstimate({ people: 40, dayRate: 600, weeks: 1, parallelRunMonthly: 0 }, config);
  const withRun = slipEstimate({ people: 40, dayRate: 600, weeks: 1, parallelRunMonthly: 52000 }, config);
  assert.equal(withRun.weeklyRunRate - base.weeklyRunRate, 12000);
});

test("negative or non-numeric input counts as zero", () => {
  const result = slipEstimate({ people: -3, dayRate: Number.NaN, weeks: 2, parallelRunMonthly: -1 }, config);
  assert.deepEqual(result, { weeklyRunRate: 0, totalCost: 0, comparisonDays: null });
});
