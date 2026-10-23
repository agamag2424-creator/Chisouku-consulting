// A1: the founding-client terms come from one source, with the end date written in full.
import assert from "node:assert/strict";
import { test } from "node:test";
import { foundingClientStatement, foundingClientTerms, foundingPlacesRemaining } from "../src/content/founding.ts";

test("founding terms replace the case-study-only sentence and spell 31 January 2027", () => {
  const retired = ["in exchange for a named", "or anonymised case study"].join(" ");
  assert.equal(foundingClientTerms.toLowerCase().includes(retired), false);
  assert.match(foundingClientTerms, /31 January 2027/);
  assert.equal(foundingClientTerms.includes("31st"), false);
  assert.equal(foundingPlacesRemaining(3), "Founding-client places remaining: 3.");
  assert.equal(foundingClientStatement(3), `${foundingClientTerms} Founding-client places remaining: 3.`);
});
