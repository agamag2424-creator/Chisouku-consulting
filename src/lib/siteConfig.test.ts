import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { siteConfig } from "./siteConfig";

describe("siteConfig booking URLs", () => {
  it("points calendlyUrl at the live discovery-call event", () => {
    assert.equal(
      siteConfig.calendlyUrl,
      "https://calendly.com/agam-agrawwal/discovery-call",
    );
  });

  it("does not use the dead chisokulab calendly slug", () => {
    assert.equal(
      siteConfig.calendlyUrl.includes("calendly.com/chisokulab/"),
      false,
    );
  });
});
