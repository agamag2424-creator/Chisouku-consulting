// Scoring for /readiness. Run: npm run test:unit
import assert from "node:assert/strict";
import { test } from "node:test";
import { answerOptions, areas, helperLine, questions } from "../src/content/readiness.ts";
import { formatScore, scoreAnswers } from "../src/lib/readinessScore.ts";

const fill = (choice) => Array.from({ length: 12 }, () => choice);

test("helper text describes today, with evidence for Yes, Partly and No", () => {
  assert.equal(helperLine, "Answer for where things stand today.");
  assert.deepEqual(
    answerOptions.map((option) => [option.choice, option.label, option.help]),
    [
      ["yes", "Yes", "it's done, and you could show the evidence today."],
      ["partly", "Partly", "some of it is in place, but you couldn't show full evidence yet."],
      ["no", "No", "it isn't in place, or you're not sure."],
    ],
  );
  const combined = `${helperLine} ${answerOptions.map((option) => option.help).join(" ")}`;
  assert.equal(combined.includes("Partly means started but not finished."), false);
});

test("the check is 6 areas of 2 questions, with jargon on first use", () => {
  assert.equal(areas.length, 6);
  assert.ok(areas.every((area) => area.questions.length === 2));
  assert.equal(questions.length, 12);
  assert.deepEqual(
    questions.map((question) => question.jargon),
    [[], [], ["sit", "uat"], [], ["mockLoads"], [], ["cutover"], [], [], ["hypercare"], [], []],
  );
});

test("all Yes scores 12 and has no weakest area", () => {
  const result = scoreAnswers(fill("yes"));
  assert.equal(result.total, 12);
  assert.deepEqual(result.areaScores, [2, 2, 2, 2, 2, 2]);
  assert.equal(result.band, "ready");
  assert.equal(result.weakestAreaIndex, null);
});

test("all No scores 0", () => {
  const result = scoreAnswers(fill("no"));
  assert.equal(result.total, 0);
  assert.deepEqual(result.areaScores, [0, 0, 0, 0, 0, 0]);
  assert.equal(result.band, "not_ready");
  assert.equal(result.weakestAreaIndex, 0);
});

test("all Partly scores 6, partly ready, and the tie goes to the first area", () => {
  const result = scoreAnswers(fill("partly"));
  assert.equal(result.total, 6);
  assert.deepEqual(result.areaScores, [1, 1, 1, 1, 1, 1]);
  assert.equal(result.band, "partly_ready");
  assert.equal(result.weakestAreaIndex, 0);
  assert.equal(areas[result.weakestAreaIndex].name, "Scope and go-live date");
});

test("band boundaries are 5, 5.5, 8.5 and 9", () => {
  const withTotal = (total) => {
    const answers = fill("no");
    const whole = Math.floor(total);
    for (let index = 0; index < whole; index += 1) answers[index] = "yes";
    if (total !== whole) answers[whole] = "partly";
    return scoreAnswers(answers);
  };

  assert.equal(withTotal(5).total, 5);
  assert.equal(withTotal(5).band, "not_ready");
  assert.equal(withTotal(5.5).total, 5.5);
  assert.equal(withTotal(5.5).band, "partly_ready");
  assert.equal(withTotal(8.5).total, 8.5);
  assert.equal(withTotal(8.5).band, "partly_ready");
  assert.equal(withTotal(9).total, 9);
  assert.equal(withTotal(9).band, "ready");
});

test("a tie keeps the earlier area", () => {
  const answers = [
    "yes", "no", // area 1 = 1
    "no", "no", // area 2 = 0
    "no", "no", // area 3 = 0
    "yes", "yes",
    "yes", "yes",
    "yes", "yes",
  ];
  const result = scoreAnswers(answers);
  assert.deepEqual(result.areaScores, [1, 0, 0, 2, 2, 2]);
  assert.equal(result.weakestAreaIndex, 1);
  assert.equal(areas[1].name, "Testing evidence");
});

test("mixed Partly answers sum per area", () => {
  const answers = [
    "partly", "yes", // 1.5
    "partly", "partly", // 1
    "no", "partly", // 0.5
    "yes", "no", // 1
    "partly", "no", // 0.5
    "yes", "partly", // 1.5
  ];
  const result = scoreAnswers(answers);
  assert.deepEqual(result.areaScores, [1.5, 1, 0.5, 1, 0.5, 1.5]);
  assert.equal(result.total, 6);
  assert.equal(result.band, "partly_ready");
  assert.equal(result.weakestAreaIndex, 2);
});

test("formatScore prints integers without a decimal and halves to one place", () => {
  assert.equal(formatScore(0), "0");
  assert.equal(formatScore(6), "6");
  assert.equal(formatScore(12), "12");
  assert.equal(formatScore(0.5), "0.5");
  assert.equal(formatScore(1.5), "1.5");
  assert.equal(formatScore(5.5), "5.5");
  assert.equal(formatScore(8.5), "8.5");
});

test("scoreAnswers rejects a partial set of answers", () => {
  assert.throws(() => scoreAnswers(fill("yes").slice(0, 11)), /Expected 12 answers/);
});
