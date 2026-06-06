import assert from "node:assert/strict";
import { afterEach, describe, it } from "node:test";
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

describe("POST /api/insights-waitlist", () => {
  it("does not report success when Apps Script returns success false", async () => {
    process.env.GOOGLE_APPS_SCRIPT_WAITLIST_URL =
      "https://script.google.com/macros/s/test/exec";
    globalThis.fetch = async () =>
      new Response(
        JSON.stringify({ success: false, error: "quota exceeded" }),
        { status: 200 },
      );

    const response = await POST(makeRequest({ email: "ada@example.com" }));
    const body = (await response.json()) as { error?: string };

    assert.equal(response.status, 502);
    assert.match(body.error ?? "", /Failed to save subscription/);
    assert.match(body.error ?? "", /quota exceeded/);
  });

  it("forwards a valid email with the insights source page", async () => {
    process.env.GOOGLE_APPS_SCRIPT_WAITLIST_URL =
      "https://script.google.com/macros/s/test/exec";
    let forwardedBody: Record<string, unknown> | undefined;
    globalThis.fetch = async (_url, init) => {
      forwardedBody = JSON.parse(String(init?.body)) as Record<string, unknown>;
      return new Response(JSON.stringify({ success: true }), { status: 200 });
    };

    const response = await POST(makeRequest({ email: "ada@example.com" }));
    const body = (await response.json()) as { success?: boolean };

    assert.equal(response.status, 200);
    assert.equal(body.success, true);
    assert.equal(forwardedBody?.sourcePage, "/insights");
    assert.equal(forwardedBody?.workEmail, "ada@example.com");
  });
});

function makeRequest(payload: Record<string, unknown>) {
  return new Request("http://localhost/api/insights-waitlist", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}
