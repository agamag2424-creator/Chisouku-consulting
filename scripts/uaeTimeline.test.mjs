// A2: the UAE date switch follows 31 October 2026 00:00 Gulf Standard Time (UTC+4).
import assert from "node:assert/strict";
import { afterEach, mock, test } from "node:test";
import { aspAppointmentCard, aspDeadlinePassed, homepageAed50Clause } from "../src/lib/uaeTimeline.ts";

afterEach(() => {
  mock.timers.reset();
});

function at(iso) {
  mock.timers.enable({ apis: ["Date"], now: Date.parse(iso) });
}

test("before 31 October 2026 00:00 GST the ASP deadline has not passed", () => {
  at("2026-10-30T23:59:59+04:00");
  assert.equal(aspDeadlinePassed(), false);
  assert.equal(aspAppointmentCard().title, "Appoint an e-invoicing Accredited Service Provider (ASP)");
  assert.match(homepageAed50Clause(), /appoint an ASP by 30 Oct 2026/);
});

test("from 31 October 2026 00:00 GST the deadline-passed wording is shown", () => {
  at("2026-10-31T00:00:00+04:00");
  assert.equal(aspDeadlinePassed(), true);
  assert.equal(aspAppointmentCard().title, "ASP appointment deadline passed");
  assert.match(aspAppointmentCard().text, /was 30 October 2026/);
  assert.equal(homepageAed50Clause(), "AED 50m+ businesses go live by 1 Jan 2027");
});

test("20:00 UTC on 30 October 2026 is already 31 October in GST", () => {
  at("2026-10-30T19:59:59Z");
  assert.equal(aspDeadlinePassed(), false);
  mock.timers.reset();
  at("2026-10-30T20:00:00Z");
  assert.equal(aspDeadlinePassed(), true);
});
