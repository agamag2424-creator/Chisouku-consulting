// A5: the API records consent only when the field is boolean true, and the email carries a timestamp.
import assert from "node:assert/strict";
import { test } from "node:test";
import { contactEmailText, hasContactConsent } from "../src/lib/contactConsent.ts";

test("consent is accepted only as boolean true", () => {
  assert.equal(hasContactConsent(undefined), false);
  assert.equal(hasContactConsent(false), false);
  assert.equal(hasContactConsent("true"), false);
  assert.equal(hasContactConsent("yes"), false);
  assert.equal(hasContactConsent(1), false);
  assert.equal(hasContactConsent(true), true);
});

test("the notification email records consent with a UTC timestamp", () => {
  const text = contactEmailText(
    {
      requestLabel: "Free readiness brief",
      name: "Test Person",
      email: "test@example.com",
      company: "Acme",
      country: "UAE",
      role: "",
      platform: "",
      decisionMonth: "",
      message: "Testing",
    },
    new Date("2026-10-24T10:15:00Z"),
  );
  assert.match(text, /Consent: yes, 2026-10-24T10:15:00Z/);
});
