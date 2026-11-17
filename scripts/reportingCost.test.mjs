// "What your PMO reporting costs today" calculator (September port PRD, Story 3.1).
import assert from "node:assert/strict";
import { test } from "node:test";
import { clampInput, reportingCost, reportingCostDefaults } from "../src/lib/reportingCost.ts";

test("the defaults give 768 hours a year (2 people x 8 hours x 48 weeks) and £57,600", () => {
  const r = reportingCost(reportingCostDefaults);
  assert.equal(r.hoursPerYear, 768);
  assert.equal(r.costPerYear, 57600);
  assert.equal(r.hoursLabel, "768");
  assert.equal(r.costLabel, "£57,600");
});

test("each input change recomputes", () => {
  assert.equal(reportingCost({ ...reportingCostDefaults, people: 3 }).hoursPerYear, 1152);
  assert.equal(reportingCost({ ...reportingCostDefaults, hoursPerWeek: 10 }).hoursPerYear, 960);
  assert.equal(reportingCost({ ...reportingCostDefaults, hourlyCost: 100 }).costPerYear, 76800);
  assert.equal(reportingCost({ people: 5, hoursPerWeek: 12, hourlyCost: 90, currency: "GBP" }).costLabel, "£259,200");
});

test("the currency switch changes the symbol, not the arithmetic", () => {
  const gbp = reportingCost(reportingCostDefaults);
  const usd = reportingCost({ ...reportingCostDefaults, currency: "USD" });
  assert.equal(usd.costPerYear, gbp.costPerYear);
  assert.equal(usd.costLabel, "$57,600");
});

test("typed numbers are kept inside the limits", () => {
  assert.equal(clampInput(0, "people"), 1);
  assert.equal(clampInput(999, "hoursPerWeek"), 40);
  assert.equal(clampInput(Number.NaN, "hourlyCost"), 10);
  assert.equal(clampInput(7.6, "people"), 8);
});
