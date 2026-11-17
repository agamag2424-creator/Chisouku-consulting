// PMO self-check content and scoring (September port PRD, Epic 5; research file sections 2 and 3).
import assert from "node:assert/strict";
import { test } from "node:test";
import { registerHooks } from "node:module";

// src/lib imports "../content/pmoSelfCheck" without an extension (the app's convention); resolve it to .ts here.
registerHooks({
  resolve(specifier, context, next) {
    const fromSource = (context.parentURL ?? "").includes("/src/");
    if (fromSource && specifier.startsWith(".") && !/\.[cm]?[jt]sx?$/.test(specifier)) return next(`${specifier}.ts`, context);
    return next(specifier, context);
  },
});

const content = await import("../src/content/pmoSelfCheck.ts");
const { scoreSelfCheck, formatScore, bandFor } = await import("../src/lib/pmoScoring.ts");
const { findHits } = await import("./lib/retiredTerms.mjs");

const all = (value) => Object.fromEntries(content.questions.map((q) => [q.id, value]));

test("15 questions across 10 dimensions, five levels each, plus Not sure", () => {
  assert.equal(content.questions.length, 15);
  assert.equal(content.dimensions.length, 10);
  assert.deepEqual([...new Set(content.questions.map((q) => q.dimension))].sort(), [...content.dimensionIds]);
  assert.ok(content.questions.every((q) => q.options.length === 5 && q.options.every((o) => o.length > 10)));
  assert.deepEqual([...content.levels], ["Ad hoc", "Emerging", "Defined", "Measured", "Improving"]);
  assert.equal(content.notSureLabel, "Not sure");
});

test("no retired term, framework name or claim in the self-check content", () => {
  const text = JSON.stringify(content);
  assert.deepEqual(findHits(text), []);
  assert.doesNotMatch(text, /P3M3|P3O|PRINCE2|PMBOK|OPM3|CMMI|ISO\s*21|percentile/i);
});

test("all 5s: every dimension 5.0, overall 5.0, Measured and improving, nothing flagged", () => {
  const r = scoreSelfCheck(all(5));
  assert.equal(r.overall, 5);
  assert.equal(r.band.name, "Measured and improving");
  assert.deepEqual(r.flagged, []);
  assert.equal(r.provisional, false);
});

test("all 1s: overall 1.0, Starting out, every dimension flagged", () => {
  const r = scoreSelfCheck(all(1));
  assert.equal(r.overall, 1);
  assert.equal(r.band.name, "Starting out");
  assert.equal(r.flagged.length, 10);
});

test("mixed: dimension = mean of its questions; overall = equal-weight mean of dimensions", () => {
  // A: Q1=4, Q2=2 -> 3.0. D (one question): Q7=1 -> 1.0. Others 3.
  const answers = { ...all(3), Q1: 4, Q2: 2, Q7: 1 };
  const r = scoreSelfCheck(answers);
  assert.equal(r.dimensions.find((d) => d.id === "A").score, 3);
  assert.equal(r.dimensions.find((d) => d.id === "D").score, 1);
  // Dimensions: A3 B3 C3 D1 E3 F3 G3 H3 I3 J3 -> 28 / 10 = 2.8 (not weighted by question count).
  assert.equal(r.overall, 2.8);
  assert.equal(r.band.name, "Building consistency");
  assert.deepEqual(r.flagged, ["D"]);
});

test("Not sure answers are excluded from the averages and listed", () => {
  const r = scoreSelfCheck({ ...all(4), Q1: "unsure", Q8: "unsure" });
  assert.equal(r.dimensions.find((d) => d.id === "A").score, 4); // Q2 only
  assert.deepEqual(r.unsure, ["Q1", "Q8"]);
  assert.equal(r.overall, 4);
});

test("a dimension with every answer Not sure is not scored and left out of the overall", () => {
  const r = scoreSelfCheck({ ...all(2), Q7: "unsure" });
  const d = r.dimensions.find((x) => x.id === "D");
  assert.equal(d.score, null);
  assert.equal(formatScore(d.score), "Not scored");
  assert.equal(r.overall, 2);
});

test("provisional only when more than 3 answers are Not sure", () => {
  assert.equal(scoreSelfCheck({ ...all(3), Q1: "unsure", Q3: "unsure", Q5: "unsure" }).provisional, false);
  assert.equal(scoreSelfCheck({ ...all(3), Q1: "unsure", Q3: "unsure", Q5: "unsure", Q8: "unsure" }).provisional, true);
});

test("a dimension at exactly 2.0 is flagged; 2.5 is not; bands use the raw score", () => {
  const r = scoreSelfCheck({ ...all(3), Q1: 2, Q2: 2, Q3: 2, Q4: 3 });
  assert.equal(r.dimensions.find((d) => d.id === "A").score, 2);
  assert.ok(r.flagged.includes("A"));
  assert.ok(!r.flagged.includes("B")); // 2.5
  assert.equal(bandFor(1.99).name, "Starting out");
  assert.equal(bandFor(2).name, "Building consistency");
  assert.equal(bandFor(3.95).name, "Defined");
  assert.equal(bandFor(4).name, "Measured and improving");
  assert.equal(formatScore(2.04), "2.0");
});

test("every answer Not sure: no overall and no band", () => {
  const r = scoreSelfCheck(all("unsure"));
  assert.equal(r.overall, null);
  assert.equal(r.band, null);
  assert.equal(r.provisional, true);
});
