import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { verifyAppsScriptSuccess } from "./apps-script";

describe("verifyAppsScriptSuccess", () => {
  it("accepts an explicit success confirmation", async () => {
    const result = await verifyAppsScriptSuccess(
      new Response(JSON.stringify({ success: true }), { status: 200 }),
    );

    assert.deepEqual(result, { success: true });
  });

  it("rejects application-level Apps Script failures", async () => {
    const result = await verifyAppsScriptSuccess(
      new Response(
        JSON.stringify({ success: false, error: "Sheet append failed" }),
        { status: 200 },
      ),
    );

    assert.equal(result.success, false);
    if (!result.success) {
      assert.match(result.error, /success: true/);
      assert.match(result.error, /Sheet append failed/);
    }
  });

  it("rejects non-json redirect or error pages", async () => {
    const result = await verifyAppsScriptSuccess(
      new Response("<html>Moved</html>", { status: 200 }),
    );

    assert.equal(result.success, false);
    if (!result.success) {
      assert.match(result.error, /did not return JSON/);
    }
  });

  it("rejects non-ok HTTP responses", async () => {
    const result = await verifyAppsScriptSuccess(
      new Response(JSON.stringify({ success: true }), { status: 403 }),
    );

    assert.equal(result.success, false);
    if (!result.success) {
      assert.match(result.error, /rejected access/);
      assert.match(result.error, /403/);
    }
  });
});
