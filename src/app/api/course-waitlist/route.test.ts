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

function validPayload(overrides: Record<string, unknown> = {}) {
  return {
    fullName: "Test User",
    workEmail: "test@example.com",
    phone: "+911234567890",
    company: "Example Co",
    role: "Director",
    country: "India",
    experienceYears: "10",
    whyJoining: "Need better AI governance.",
    consent: true,
    optInFutureModules: false,
    optInFreeTemplates: false,
    website: "",
    ...overrides,
  };
}

function makeRequest(payload: Record<string, unknown>) {
  return new Request("https://chisokulabs.com/api/course-waitlist", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "user-agent": "node-test",
    },
    body: JSON.stringify(payload),
  });
}

test("POST reports success only after Apps Script confirms the write", async () => {
  process.env.GOOGLE_APPS_SCRIPT_WAITLIST_URL =
    "https://script.google.com/macros/s/test/exec";

  let forwardedBody: Record<string, unknown> | null = null;
  globalThis.fetch = (async (_input, init) => {
    forwardedBody = JSON.parse(String(init?.body));
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  }) as typeof fetch;

  const response = await POST(makeRequest(validPayload()));

  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { success: true });
  assert.equal(forwardedBody?.sourcePage, "/ai-governance-course");
  assert.equal(forwardedBody?.userAgent, "node-test");
});

test("POST surfaces Apps Script 200 responses that failed to save", async () => {
  process.env.GOOGLE_APPS_SCRIPT_WAITLIST_URL =
    "https://script.google.com/macros/s/test/exec";

  globalThis.fetch = (async () =>
    new Response(
      JSON.stringify({ success: false, error: "Sheet quota exceeded" }),
      { status: 200 },
    )) as typeof fetch;

  const response = await POST(makeRequest(validPayload()));
  const payload = (await response.json()) as { error?: string };

  assert.equal(response.status, 502);
  assert.match(payload.error ?? "", /Sheet quota exceeded/);
});

test("POST rejects invalid Apps Script confirmation payloads", async () => {
  process.env.GOOGLE_APPS_SCRIPT_WAITLIST_URL =
    "https://script.google.com/macros/s/test/exec";

  globalThis.fetch = (async () =>
    new Response("not json", { status: 200 })) as typeof fetch;

  const response = await POST(makeRequest(validPayload()));
  const payload = (await response.json()) as { error?: string };

  assert.equal(response.status, 502);
  assert.match(payload.error ?? "", /invalid confirmation response/);
});

test("POST requires explicit boolean consent", async () => {
  process.env.GOOGLE_APPS_SCRIPT_WAITLIST_URL =
    "https://script.google.com/macros/s/test/exec";

  let fetchCalled = false;
  globalThis.fetch = (async () => {
    fetchCalled = true;
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  }) as typeof fetch;

  const response = await POST(makeRequest(validPayload({ consent: "true" })));

  assert.equal(response.status, 400);
  assert.equal(fetchCalled, false);
});
