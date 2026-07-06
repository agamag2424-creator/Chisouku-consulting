import assert from "node:assert/strict";
import test from "node:test";
import { POST as postCourseWaitlist } from "./course-waitlist/route";
import { POST as postInsightsWaitlist } from "./insights-waitlist/route";

const originalFetch = globalThis.fetch;
const originalAppsScriptUrl = process.env.GOOGLE_APPS_SCRIPT_WAITLIST_URL;

test.afterEach(() => {
  globalThis.fetch = originalFetch;
  if (originalAppsScriptUrl === undefined) {
    delete process.env.GOOGLE_APPS_SCRIPT_WAITLIST_URL;
  } else {
    process.env.GOOGLE_APPS_SCRIPT_WAITLIST_URL = originalAppsScriptUrl;
  }
});

function mockFetch(response: Response) {
  globalThis.fetch = (() => Promise.resolve(response)) as typeof fetch;
}

function requestWithJson(path: string, body: Record<string, unknown>) {
  return new Request(`https://chisokulabs.com${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

const validCoursePayload = {
  fullName: "Ada Lovelace",
  workEmail: "ada@example.com",
  phone: "+1 555 0101",
  company: "Analytical Engines Ltd",
  role: "Director",
  country: "UK",
  experienceYears: "10",
  whyJoining: "I need stronger AI governance.",
  consent: true,
  optInFutureModules: true,
  optInFreeTemplates: false,
  website: "",
};

test("course waitlist rejects Apps Script success false responses", async () => {
  process.env.GOOGLE_APPS_SCRIPT_WAITLIST_URL =
    "https://script.google.com/macros/s/id/exec";
  mockFetch(
    new Response(
      JSON.stringify({ success: false, error: "Sheet append failed" }),
      { status: 200 },
    ),
  );

  const response = await postCourseWaitlist(
    requestWithJson("/api/course-waitlist", validCoursePayload),
  );
  const body = (await response.json()) as { error?: string };

  assert.equal(response.status, 502);
  assert.match(body.error ?? "", /Sheet append failed/);
});

test("course waitlist rejects honeypot-filled submissions", async () => {
  process.env.GOOGLE_APPS_SCRIPT_WAITLIST_URL =
    "https://script.google.com/macros/s/id/exec";

  const response = await postCourseWaitlist(
    requestWithJson("/api/course-waitlist", {
      ...validCoursePayload,
      website: "filled-by-autofill.example",
    }),
  );
  const body = (await response.json()) as { error?: string };

  assert.equal(response.status, 400);
  assert.equal(body.error, "Invalid submission.");
});

test("insights waitlist rejects Apps Script success false responses", async () => {
  process.env.GOOGLE_APPS_SCRIPT_WAITLIST_URL =
    "https://script.google.com/macros/s/id/exec";
  mockFetch(
    new Response(
      JSON.stringify({ success: false, error: "Sheet append failed" }),
      { status: 200 },
    ),
  );

  const response = await postInsightsWaitlist(
    requestWithJson("/api/insights-waitlist", {
      email: "reader@example.com",
    }),
  );
  const body = (await response.json()) as { error?: string };

  assert.equal(response.status, 502);
  assert.match(body.error ?? "", /Sheet append failed/);
});
