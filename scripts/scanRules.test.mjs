// The site scan's tone and style rules (changes 2 to 4, 17 Nov 2026). scripts/scanSite.mjs uses these on every page.
import assert from "node:assert/strict";
import { test } from "node:test";
import { findHits, headingsWithStops, withoutCurrencySwitch } from "./lib/retiredTerms.mjs";

const labels = (text) => findHits(text).map((hit) => hit.label);

test("the scan fails on USD, GBP before a number, Book a 20-minute call, About Us and 08 signals", () => {
  assert.deepEqual(labels("Health Check USD 500"), ["USD (prices are in pounds)"]);
  assert.deepEqual(labels("Prices are in US dollars"), ["USD (prices are in pounds)"]);
  assert.deepEqual(labels("GBP 395"), ["GBP before a number (write £395)"]);
  assert.deepEqual(labels("Book a 20-minute call"), ["Book a 20-minute call (write Arrange)"]);
  assert.deepEqual(labels("About Us"), ["About Us (write About)"]);
  assert.deepEqual(labels("08 SIGNALS"), ["08 signals"]);
  assert.deepEqual(labels("£395. Arrange a 20-minute call. About. Prices are in pounds sterling (GBP)."), []);
});

test("USD is allowed only inside the calculator's currency switch", () => {
  const html = '<p>Reporting cost</p><div role="radiogroup" data-currency-switch><button>GBP</button><button>USD</button></div><p>£395</p>';
  assert.deepEqual(labels(withoutCurrencySwitch(html)), []);
  assert.ok(labels(withoutCurrencySwitch(html + "<p>USD 395</p>")).includes("USD (prices are in pounds)"));
});

test("the scan fails on any h1 to h3 that ends in a full stop", () => {
  const html = '<h1 class="t-h1">Find what your PMO is <em>missing</em>.</h1><h2>Who does the work</h2><h3>What happens next?</h3><h4>Note.</h4>';
  assert.deepEqual(headingsWithStops(html), ["Find what your PMO is missing ."]);
  assert.deepEqual(headingsWithStops("<h2>Who does the work</h2>"), []);
});
