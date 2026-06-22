import assert from "node:assert/strict";
import { afterEach, describe, it } from "node:test";
import { POST } from "./route";

const waitlistUrl = "https://script.google.com/macros/s/test/exec";

const validPayload = {
  fullName: "Ada Lovelace",
  workEmail: "ada@example.com",
  phone: "+15555550100",
  company: "Analytical Engines Ltd",
  role: "CTO",
  country: "UK",
  experienceYears: "10",
  whyJoining: "Building safer AI governance practices.",
  consent: true,
  optInFutureModules: false,
  optInFreeTemplates: false,
  website: "",
};

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

function buildRequest(payload: unknown) {
  return new Request("https://chisokulabs.com/api/course-waitlist", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

describe("POST /api/course-waitlist", () => {
  it("rejects direct submissions without boolean consent", async () => {
    process.env.GOOGLE_APPS_SCRIPT_WAITLIST_URL = waitlistUrl;

    const response = await POST(
      buildRequest({ ...validPayload, consent: "false" }),
    );
    const body = (await response.json()) as { error?: string };

    assert.equal(response.status, 400);
    assert.equal(body.error, "Consent is required.");
  });

  it("does not acknowledge a 200 Apps Script failure as saved", async () => {
    process.env.GOOGLE_APPS_SCRIPT_WAITLIST_URL = waitlistUrl;
    globalThis.fetch = async () =>
      Response.json({ success: false, error: "sheet append failed" });

    const response = await POST(buildRequest(validPayload));
    const body = (await response.json()) as { error?: string };

    assert.equal(response.status, 502);
    assert.match(
      body.error ?? "",
      /Failed to save nomination\. Apps Script did not confirm the row was saved\. sheet append failed/,
    );
  });

  it("only forwards sanitized booleans after confirmed persistence", async () => {
    process.env.GOOGLE_APPS_SCRIPT_WAITLIST_URL = waitlistUrl;
    let forwardedBody: Record<string, unknown> | null = null;
    globalThis.fetch = async (_input, init) => {
      forwardedBody = JSON.parse(String(init?.body));
      return Response.json({ success: true });
    };

    const response = await POST(
      buildRequest({
        ...validPayload,
        optInFutureModules: "false",
        optInFreeTemplates: true,
      }),
    );
    const body = (await response.json()) as { success?: boolean };

    assert.equal(response.status, 200);
    assert.equal(body.success, true);
    assert.equal(forwardedBody?.optInFutureModules, false);
    assert.equal(forwardedBody?.optInFreeTemplates, true);
  });
});
