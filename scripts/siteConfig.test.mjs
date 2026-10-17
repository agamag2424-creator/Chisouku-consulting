// Unit tests for the price helpers in src/lib/siteConfig.ts.
// Run: npm run test:unit  (Node 22 strips the TypeScript types; no test dependency needed)
import assert from "node:assert/strict";
import { test } from "node:test";
import { formatPrice, foundingActive, isRouteLive, navLinks, offerPriceLabel, routeLive, siteConfig } from "../src/lib/siteConfig.ts";

test("formatPrice uses the configured currency and grouping", () => {
  assert.equal(formatPrice(12000), "USD 12,000");
});

test("offerPriceLabel shows list and founding prices while 3 places remain", () => {
  assert.deepEqual(offerPriceLabel("evidenceCheck", 3), { list: "USD 5,000", founding: "USD 2,500" });
  assert.deepEqual(offerPriceLabel("decisionReview", 3), { list: "USD 12,000", founding: "USD 6,000" });
  assert.deepEqual(offerPriceLabel("continuous", 3), {
    list: "From USD 6,000 / month",
    founding: "From USD 3,000 / month",
  });
});

test("offerPriceLabel hides founding prices when 0 places remain", () => {
  assert.deepEqual(offerPriceLabel("evidenceCheck", 0), { list: "USD 5,000", founding: null });
  assert.deepEqual(offerPriceLabel("continuous", 0), { list: "From USD 6,000 / month", founding: null });
});

test("defaults come from config", () => {
  assert.equal(foundingActive(), siteConfig.foundingSlotsRemaining > 0);
  assert.deepEqual(offerPriceLabel("decisionReview"), offerPriceLabel("decisionReview", siteConfig.foundingSlotsRemaining));
});

test("isRouteLive ignores query and hash, and rejects unknown paths", () => {
  assert.equal(isRouteLive("/contact?request=brief"), routeLive["/contact"]);
  assert.equal(isRouteLive("/see-it-first#sample-pack"), routeLive["/see-it-first"]);
  assert.equal(isRouteLive("/not-a-route"), false);
});

test("every nav link has a routeLive entry", () => {
  for (const link of navLinks) assert.ok(link.href in routeLive, link.href);
});

test("JSON-LD for a script tag escapes '<' so it cannot close the tag", async () => {
  const { stringifyJsonLd } = await import("../src/lib/safeJson.ts");
  const out = stringifyJsonLd({ name: "</script><script>alert(1)</script>" });
  assert.ok(!out.includes("<"));
  assert.deepEqual(JSON.parse(out), { name: "</script><script>alert(1)</script>" });
});
