import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  parseAppsScriptResponse,
  validateAppsScriptUrl,
} from "./apps-script";

describe("parseAppsScriptResponse", () => {
  it("accepts only explicit success confirmations", async () => {
    const result = await parseAppsScriptResponse(
      new Response(JSON.stringify({ success: true }), { status: 200 }),
    );

    assert.deepEqual(result, { success: true });
  });

  it("rejects Apps Script HTTP 200 responses with success false", async () => {
    const result = await parseAppsScriptResponse(
      new Response(
        JSON.stringify({ success: false, error: "Sheet append failed" }),
        { status: 200 },
      ),
    );

    assert.equal(result.success, false);
    if (!result.success) {
      assert.match(result.error, /Sheet append failed/);
    }
  });

  it("rejects invalid confirmation bodies", async () => {
    const result = await parseAppsScriptResponse(
      new Response("<html>not json</html>", { status: 200 }),
    );

    assert.equal(result.success, false);
    if (!result.success) {
      assert.match(result.error, /invalid confirmation/);
    }
  });

  it("rejects non-2xx Apps Script responses", async () => {
    const result = await parseAppsScriptResponse(
      new Response(JSON.stringify({ success: true }), { status: 403 }),
    );

    assert.equal(result.success, false);
    if (!result.success) {
      assert.match(result.error, /rejected access/i);
      assert.match(result.error, /status: 403/);
    }
  });
});

describe("validateAppsScriptUrl", () => {
  it("requires a configured /exec URL", () => {
    assert.equal(
      validateAppsScriptUrl(undefined, "Waitlist"),
      "Waitlist endpoint is not configured.",
    );
    assert.equal(
      validateAppsScriptUrl("https://script.google.com/macros/s/abc/dev", "Waitlist"),
      "Waitlist endpoint looks invalid. Use the Apps Script Web App URL ending with /exec.",
    );
    assert.equal(
      validateAppsScriptUrl("https://script.google.com/macros/s/abc/exec", "Waitlist"),
      null,
    );
  });
});
