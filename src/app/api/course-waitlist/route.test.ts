import assert from "node:assert/strict";
import { afterEach, test } from "node:test";

import { POST } from "./route";

const originalFetch = globalThis.fetch;
const originalWaitlistUrl = process.env.GOOGLE_APPS_SCRIPT_WAITLIST_URL;

afterEach(() => {
  globalThis.fetch = originalFetch;
  if (originalWaitlistUrl === undefined) {
    delete process.env.GOOGLE_APPS_SCRIPT_WAITLIST_URL;
  } else {
    process.env.GOOGLE_APPS_SCRIPT_WAITLIST_URL = originalWaitlistUrl;
  }
});

test("rejects Apps Script 200 responses that report failure", async () => {
  process.env.GOOGLE_APPS_SCRIPT_WAITLIST_URL =
    "https://script.google.com/macros/s/test/exec";
  globalThis.fetch = async () =>
    new Response(JSON.stringify({ success: false, error: "sheet missing" }), {
      status: 200,
    });

  const response = await POST(createRequest());
  const body = (await response.json()) as { error?: string };

  assert.equal(response.status, 502);
  assert.match(body.error ?? "", /Failed to save nomination/);
  assert.match(body.error ?? "", /sheet missing/);
});

test("rejects Apps Script 200 responses without a confirmed success body", async () => {
  process.env.GOOGLE_APPS_SCRIPT_WAITLIST_URL =
    "https://script.google.com/macros/s/test/exec";
  globalThis.fetch = async () => new Response("ok", { status: 200 });

  const response = await POST(createRequest());
  const body = (await response.json()) as { error?: string };

  assert.equal(response.status, 502);
  assert.match(body.error ?? "", /Apps Script returned an unexpected response/);
});

test("requires explicit boolean consent before forwarding", async () => {
  process.env.GOOGLE_APPS_SCRIPT_WAITLIST_URL =
    "https://script.google.com/macros/s/test/exec";
  let called = false;
  globalThis.fetch = async () => {
    called = true;
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  };

  const response = await POST(
    createRequest({ consent: "false" as unknown as boolean }),
  );
  const body = (await response.json()) as { error?: string };

  assert.equal(response.status, 400);
  assert.equal(body.error, "Consent is required.");
  assert.equal(called, false);
});

test("returns success only after Apps Script confirms persistence", async () => {
  process.env.GOOGLE_APPS_SCRIPT_WAITLIST_URL =
    "https://script.google.com/macros/s/test/exec";
  globalThis.fetch = async () =>
    new Response(JSON.stringify({ success: true }), { status: 200 });

  const response = await POST(createRequest());
  const body = (await response.json()) as { success?: boolean };

  assert.equal(response.status, 200);
  assert.equal(body.success, true);
});

function createRequest(overrides: Partial<WaitlistTestPayload> = {}) {
  return new Request("https://chisokulabs.com/api/course-waitlist", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(createPayload(overrides)),
  });
}

function createPayload(overrides: Partial<WaitlistTestPayload> = {}) {
  return {
    fullName: "Ada Lovelace",
    workEmail: "ada@example.com",
    phone: "+15551234567",
    company: "Analytical Engines Ltd",
    role: "CTO",
    country: "UK",
    experienceYears: "8",
    whyJoining: "We need governance training.",
    consent: true,
    optInFutureModules: false,
    optInFreeTemplates: false,
    website: "",
    ...overrides,
  };
}

type WaitlistTestPayload = {
  fullName: string;
  workEmail: string;
  phone: string;
  company: string;
  role: string;
  country: string;
  experienceYears: string;
  whyJoining: string;
  consent: boolean;
  optInFutureModules: boolean;
  optInFreeTemplates: boolean;
  website: string;
};
