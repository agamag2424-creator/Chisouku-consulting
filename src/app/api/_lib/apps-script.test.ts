import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { verifyAppsScriptSave } from "./apps-script";

describe("verifyAppsScriptSave", () => {
  it("accepts an explicit Apps Script success confirmation", async () => {
    const result = await verifyAppsScriptSave(
      new Response(JSON.stringify({ success: true }), { status: 200 }),
    );

    assert.deepEqual(result, { success: true });
  });

  it("rejects HTTP 200 responses when Apps Script reports a write failure", async () => {
    const result = await verifyAppsScriptSave(
      new Response(
        JSON.stringify({ success: false, error: "sheet append failed" }),
        { status: 200 },
      ),
    );

    assert.equal(result.success, false);
    assert.match(result.error, /did not confirm the save/);
    assert.match(result.error, /sheet append failed/);
  });

  it("rejects non-JSON responses because they do not confirm persistence", async () => {
    const result = await verifyAppsScriptSave(
      new Response("OK", { status: 200 }),
    );

    assert.equal(result.success, false);
    assert.match(result.error, /valid save confirmation/);
  });

  it("rejects non-OK Apps Script responses", async () => {
    const result = await verifyAppsScriptSave(
      new Response(JSON.stringify({ success: true }), { status: 403 }),
    );

    assert.equal(result.success, false);
    assert.match(result.error, /rejected access/);
  });
});
