import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { verifyAppsScriptResponse } from "./apps-script-result";

describe("verifyAppsScriptResponse", () => {
  it("accepts an explicit Apps Script success response", async () => {
    const verification = await verifyAppsScriptResponse(
      new Response(JSON.stringify({ success: true }), { status: 200 }),
    );

    assert.deepEqual(verification, { ok: true });
  });

  it("rejects a logical Apps Script failure even when HTTP status is 200", async () => {
    const verification = await verifyAppsScriptResponse(
      new Response(
        JSON.stringify({ success: false, error: "Sheet append failed" }),
        { status: 200 },
      ),
    );

    if (verification.ok) assert.fail("Expected Apps Script failure");
    assert.match(
      verification.error,
      /Apps Script did not confirm the save\. Sheet append failed/,
    );
  });

  it("rejects non-JSON success responses", async () => {
    const verification = await verifyAppsScriptResponse(
      new Response("<html>not deployed</html>", { status: 200 }),
    );

    if (verification.ok) assert.fail("Expected invalid JSON failure");
    assert.match(verification.error, /invalid JSON/);
  });

  it("rejects non-2xx responses with deployment guidance", async () => {
    const verification = await verifyAppsScriptResponse(
      new Response(JSON.stringify({ success: false }), { status: 403 }),
    );

    if (verification.ok) assert.fail("Expected HTTP status failure");
    assert.match(verification.error, /rejected access/);
    assert.match(verification.error, /status: 403/);
  });
});
