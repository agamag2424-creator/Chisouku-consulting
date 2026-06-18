import assert from "node:assert/strict";
import test from "node:test";
import {
  type AppsScriptVerification,
  verifyAppsScriptResponse,
} from "./apps-script";

function expectFailure(result: AppsScriptVerification) {
  if (result.ok) {
    assert.fail("Expected Apps Script verification to fail");
  }

  return result;
}

test("accepts explicit Apps Script success responses", async () => {
  const result = await verifyAppsScriptResponse(
    Response.json({ success: true }),
  );

  assert.deepEqual(result, { ok: true });
});

test("rejects Apps Script JSON failures sent with HTTP 200", async () => {
  const result = await verifyAppsScriptResponse(
    Response.json({ success: false, error: "Sheet append failed" }),
  );

  const failure = expectFailure(result);
  assert.match(failure.message, /did not confirm/);
  assert.match(failure.message, /Sheet append failed/);
});

test("rejects non-JSON success pages", async () => {
  const result = await verifyAppsScriptResponse(
    new Response("<html>Login required</html>", {
      headers: { "Content-Type": "text/html" },
      status: 200,
    }),
  );

  const failure = expectFailure(result);
  assert.match(failure.message, /non-JSON/);
});

test("rejects failed HTTP responses with deployment guidance", async () => {
  const result = await verifyAppsScriptResponse(
    Response.json({ error: "Forbidden" }, { status: 403 }),
  );

  const failure = expectFailure(result);
  assert.match(failure.message, /rejected access/);
  assert.match(failure.message, /status: 403/);
});
