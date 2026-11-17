// Placeholder bank for /pmo-self-check. Run: npm run test:unit
import assert from "node:assert/strict";
import { test } from "node:test";
import { selfCheckAreas, selfCheckQuestions } from "../src/content/pmoSelfCheck.ts";

test("the self-check bank is empty slots, with no drafted question text", () => {
  assert.deepEqual(selfCheckAreas, ["governance", "raid", "reporting", "benefits", "resourcing", "stakeholders"]);
  assert.equal(selfCheckQuestions.length, selfCheckAreas.length);
  assert.deepEqual(
    selfCheckQuestions.map((question) => question.area),
    [...selfCheckAreas],
  );
  assert.ok(selfCheckQuestions.every((question) => question.text === ""));
});
