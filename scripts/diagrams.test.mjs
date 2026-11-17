// Diagram labels (September port PRD, Epic 2): every label lives in src/content/diagrams.ts and uses no retired term.
import assert from "node:assert/strict";
import { test } from "node:test";
import * as diagrams from "../src/content/diagrams.ts";
import { dimensions } from "../src/content/pmoSelfCheck.ts";
import { findHits } from "./lib/retiredTerms.mjs";

const allText = (value) =>
  typeof value === "string" ? [value] : Array.isArray(value) ? value.flatMap(allText) : value && typeof value === "object" ? Object.values(value).flatMap(allText) : [];

test("no retired term, em dash or claim appears in any diagram label", () => {
  const text = [...allText(diagrams), ...allText(dimensions)].join("\n");
  assert.deepEqual(findHits(text), []);
});

test("every diagram has a text alternative for screen readers", () => {
  for (const key of ["healthMap", "findingsBoard", "healthCheckStrip", "dimensionOrbit", "scorecardExcerpt"]) {
    assert.ok(diagrams[key].alt.length > 80, `${key} has a full text alternative`);
  }
});

test("the three problems come first on the findings board, in the email order", () => {
  const items = diagrams.findingsBoard.items;
  assert.equal(items.length, 8);
  assert.deepEqual(items.slice(0, 3).map((i) => i.problem), [true, true, true]);
  assert.equal(items[0].label, "RAID logs nobody acts on");
  assert.equal(items[1].label, "Status that turns Red too late");
  assert.equal(items[2].label, "Governance forums that cannot actually decide");
  assert.ok(items.slice(3).every((i) => !i.problem));
});

test("the Health Check strip matches the offer: documents, three interviews, scorecard, findings and plan, 45-minute readout", () => {
  const outputs = diagrams.healthCheckStrip.phases.map((p) => p.output);
  assert.deepEqual(outputs, [
    "Your documents",
    "Three short interviews",
    "PMO Health Scorecard",
    "Top findings and 30-day fix plan",
    "45-minute readout",
  ]);
  assert.equal(diagrams.healthCheckStrip.title, "Five working days after documents arrive");
});

test("the orbit has the ten scorecard dimensions; the sample is labelled fictional", () => {
  assert.equal(dimensions.length, 10);
  assert.equal(new Set(dimensions.map((d) => d.id)).size, 10);
  assert.equal(diagrams.scorecardExcerpt.label, "Sample. Fictional organisation.");
});
