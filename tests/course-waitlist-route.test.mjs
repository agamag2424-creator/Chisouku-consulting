import assert from "node:assert/strict";
import { test } from "node:test";

const { confirmAppsScriptWrite } = await import(
  "../src/app/api/course-waitlist/apps-script-result.ts"
);

test("confirms Apps Script writes only when success is true", async () => {
  const result = await confirmAppsScriptWrite(
    Response.json({ success: true }, { status: 200 }),
  );

  assert.deepEqual(result, { confirmed: true });
});

test("rejects Apps Script 200 responses when the sheet write failed", async () => {
  const result = await confirmAppsScriptWrite(
    Response.json(
      { success: false, error: "Exception: Sheet is read only" },
      { status: 200 },
    ),
  );

  assert.deepEqual(result, {
    confirmed: false,
    error: "Exception: Sheet is read only",
  });
});

test("rejects Apps Script 200 responses without readable JSON confirmation", async () => {
  const result = await confirmAppsScriptWrite(
    new Response("saved", {
      status: 200,
      headers: { "Content-Type": "text/plain" },
    }),
  );

  assert.deepEqual(result, { confirmed: false, error: undefined });
});
