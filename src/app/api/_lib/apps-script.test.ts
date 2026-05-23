import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { verifyAppsScriptWrite } from "./apps-script";

describe("verifyAppsScriptWrite", () => {
  it("accepts explicit Apps Script success", async () => {
    const result = await verifyAppsScriptWrite(
      jsonResponse({ success: true }),
      "nomination",
    );

    assert.deepEqual(result, { ok: true });
  });

  it("rejects Apps Script logical failures sent with HTTP 200", async () => {
    const result = await verifyAppsScriptWrite(
      jsonResponse({ success: false, error: "Sheet quota exceeded" }),
      "nomination",
    );

    assert.equal(result.ok, false);
    if (!result.ok) {
      assert.match(result.error, /Failed to save nomination/);
      assert.match(result.error, /Sheet quota exceeded/);
    }
  });

  it("rejects empty HTTP 200 responses", async () => {
    const result = await verifyAppsScriptWrite(
      new Response("", { status: 200 }),
      "insights signup",
    );

    assert.equal(result.ok, false);
    if (!result.ok) {
      assert.match(result.error, /empty response/);
    }
  });

  it("rejects non-JSON HTTP 200 responses", async () => {
    const result = await verifyAppsScriptWrite(
      new Response("<html>Moved</html>", { status: 200 }),
      "nomination",
    );

    assert.equal(result.ok, false);
    if (!result.ok) {
      assert.match(result.error, /invalid response/);
    }
  });

  it("reports Apps Script HTTP failures", async () => {
    const result = await verifyAppsScriptWrite(
      jsonResponse({ error: "Forbidden" }, 403),
      "nomination",
    );

    assert.equal(result.ok, false);
    if (!result.ok) {
      assert.match(result.error, /rejected access/);
      assert.match(result.error, /status: 403/);
    }
  });
});

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
