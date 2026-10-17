// Unit tests for the price helpers in src/lib/siteConfig.ts.
// Run: npm run test:unit  (Node 22 strips the TypeScript types; no test dependency needed)
import assert from "node:assert/strict";
import { test } from "node:test";
import { formatPrice, foundingActive, offerPriceLabel, siteConfig } from "../src/lib/siteConfig.ts";

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
