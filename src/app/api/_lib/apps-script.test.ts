import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { parseAppsScriptConfirmation } from "./apps-script";

describe("parseAppsScriptConfirmation", () => {
  it("accepts explicit Apps Script save confirmations", () => {
    assert.deepEqual(parseAppsScriptConfirmation('{"success":true}'), {
      ok: true,
    });
  });

  it("rejects explicit Apps Script failures", () => {
    assert.deepEqual(
      parseAppsScriptConfirmation('{"success":false,"error":"Sheet quota exceeded"}'),
      {
        ok: false,
        reason: "Sheet quota exceeded",
      },
    );
  });

  it("rejects malformed or missing confirmations", () => {
    assert.deepEqual(parseAppsScriptConfirmation(""), {
      ok: false,
      reason: "Apps Script returned an invalid confirmation payload.",
    });
    assert.deepEqual(parseAppsScriptConfirmation("{}"), {
      ok: false,
      reason: "Apps Script did not confirm the save.",
    });
  });
});
