import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { hasAppsScriptConfirmedSave } from "@/app/api/course-waitlist/apps-script-result";

describe("hasAppsScriptConfirmedSave", () => {
  it("accepts an explicit boolean success confirmation", () => {
    assert.equal(hasAppsScriptConfirmedSave({ success: true }), true);
  });

  it("rejects explicit failure responses", () => {
    assert.equal(hasAppsScriptConfirmedSave({ success: false }), false);
  });

  it("rejects missing or string success values", () => {
    assert.equal(hasAppsScriptConfirmedSave({}), false);
    assert.equal(hasAppsScriptConfirmedSave({ success: "true" }), false);
    assert.equal(hasAppsScriptConfirmedSave(null), false);
  });
});
