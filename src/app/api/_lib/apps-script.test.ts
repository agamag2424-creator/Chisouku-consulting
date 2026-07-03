import assert from "node:assert/strict";
import test from "node:test";
import { readAppsScriptConfirmationText } from "./apps-script";

test("accepts explicit Apps Script success confirmations", () => {
  assert.deepEqual(readAppsScriptConfirmationText('{"success":true}'), {
    success: true,
  });
});

test("rejects explicit Apps Script failures", () => {
  assert.deepEqual(
    readAppsScriptConfirmationText('{"success":false,"error":"Sheet write failed"}'),
    {
      success: false,
      error: "Sheet write failed",
    },
  );
});

test("rejects malformed confirmations", () => {
  assert.deepEqual(readAppsScriptConfirmationText("<html>ok</html>"), {
    success: false,
    error: "Apps Script returned an invalid confirmation response.",
  });
});

test("rejects JSON that does not confirm the write", () => {
  assert.deepEqual(readAppsScriptConfirmationText('{"ok":true}'), {
    success: false,
    error: "Apps Script did not confirm the save.",
  });
});
