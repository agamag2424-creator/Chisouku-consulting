import assert from "node:assert/strict";
import { test } from "node:test";
import { getAppsScriptFailure } from "./apps-script";

test("accepts the documented Apps Script success body", async () => {
  const failure = await getAppsScriptFailure(
    new Response(JSON.stringify({ success: true })),
    "nomination",
  );

  assert.equal(failure, null);
});

test("rejects a documented Apps Script write failure", async () => {
  const failure = await getAppsScriptFailure(
    new Response(JSON.stringify({ success: false, error: "sheet locked" })),
    "nomination",
  );

  assert.equal(failure?.status, 502);
  assert.match(failure?.error ?? "", /did not confirm the write/);
  assert.match(failure?.error ?? "", /sheet locked/);
});

test("rejects malformed success confirmations", async () => {
  const failure = await getAppsScriptFailure(
    new Response("<html>ok</html>"),
    "nomination",
  );

  assert.equal(failure?.status, 502);
  assert.match(failure?.error ?? "", /malformed confirmation/);
});

test("maps upstream HTTP failures to a 502 response", async () => {
  const failure = await getAppsScriptFailure(
    new Response("", { status: 403 }),
    "nomination",
  );

  assert.equal(failure?.status, 502);
  assert.match(failure?.error ?? "", /rejected access/);
});
