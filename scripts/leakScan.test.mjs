// Unit tests for scripts/leak-scan.mjs. Run: npm run test:unit
import assert from "node:assert/strict";
import { test } from "node:test";
import { scan } from "./leak-scan.mjs";

test("finds forbidden terms whole-word and case-insensitively, including inside URLs and hyphenated names", () => {
  assert.deepEqual(scan("Our PMO Reporting pack").map((hit) => hit.term), ["PMO Reporting"]);
  assert.deepEqual(scan("https://example.com/agam-agrawwal-cv").map((hit) => hit.term.toLowerCase()), ["agam", "agrawwal"]);
  assert.deepEqual(scan("https://calendly.com/agam-agrawwal").map((hit) => hit.term.toLowerCase()), ["agam", "agrawwal"]);
  assert.equal(scan("https://calendly.com/chisokulabs/discovery-call").length, 0);
  assert.equal(scan(".drag-slider { }").length, 1);
  assert.equal(scan("dragon fruit").length, 0);
});

test("reviewed phrases are allowed: the role address passes, the old address is flagged, and negations of guarantee pass", () => {
  assert.equal(scan("Email hello@chisokulabs.com today").length, 0);
  assert.deepEqual(scan("Email agam@chisokulabs.com today").map((hit) => hit.term.toLowerCase()), ["agam"]);
  assert.equal(scan("The review does not guarantee go-live success.").length, 0);
  assert.equal(scan('{"id":"guarantee"} and \\"guarantee\\"').length, 0);
  assert.equal(scan("We guarantee success.").length, 1);
});
