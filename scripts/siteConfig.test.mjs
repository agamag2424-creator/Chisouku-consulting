// Unit tests for the price helpers in src/lib/siteConfig.ts.
// Run: npm run test:unit  (Node 22 strips the TypeScript types; no test dependency needed)
import assert from "node:assert/strict";
import { test } from "node:test";
import { formatPrice, foundingActive, isRouteLive, navLinks, offerPriceLabel, routeLive, routeRenders, siteConfig } from "../src/lib/siteConfig.ts";

test("formatPrice uses the configured currency and grouping", () => {
  assert.equal(formatPrice(12000), "USD 12,000");
});

test("offerPriceLabel shows the Health Check as one price and the Audit list and founding prices", () => {
  assert.deepEqual(offerPriceLabel("healthCheck", 3), { list: "USD 500", founding: null });
  assert.deepEqual(offerPriceLabel("healthAudit", 3), { list: "USD 5,000", founding: "USD 2,500" });
});

test("offerPriceLabel hides the Audit founding price when 0 places remain", () => {
  assert.deepEqual(offerPriceLabel("healthCheck", 0), { list: "USD 500", founding: null });
  assert.deepEqual(offerPriceLabel("healthAudit", 0), { list: "USD 5,000", founding: null });
});

test("defaults come from config", () => {
  assert.equal(foundingActive(), siteConfig.foundingSlotsRemaining > 0);
  assert.deepEqual(offerPriceLabel("healthAudit"), offerPriceLabel("healthAudit", siteConfig.foundingSlotsRemaining));
  assert.equal(siteConfig.offers.healthAudit.days, 5);
  assert.equal(siteConfig.offers.healthCheck.days, 5);
  assert.equal(siteConfig.feeCreditDays, 60);
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

test("the PMO self-check is live and listed; /readiness is a redirect, not a route", () => {
  assert.equal(routeLive["/pmo-self-check"], true);
  assert.equal(routeLive["/pmo-self-check/methodology"], true);
  assert.equal(isRouteLive("/pmo-self-check?utm_source=email"), true);
  assert.equal(routeRenders("/pmo-self-check", { NODE_ENV: "production" }), true);
  assert.equal("/readiness" in routeLive, false);
});

test("a route that is not live renders only in development and on previews (fails closed)", () => {
  assert.equal(routeRenders("/not-a-live-route", { NODE_ENV: "production", VERCEL_ENV: "production" }), false);
  assert.equal(routeRenders("/not-a-live-route", { NODE_ENV: "production" }), false);
  assert.equal(routeRenders("/not-a-live-route", {}), false);
  assert.equal(routeRenders("/not-a-live-route", { NODE_ENV: "production", VERCEL_ENV: "preview" }), true);
  assert.equal(routeRenders("/not-a-live-route", { NODE_ENV: "development" }), true);
  assert.equal(routeRenders("/pricing", { NODE_ENV: "production", VERCEL_ENV: "production" }), true);
});
