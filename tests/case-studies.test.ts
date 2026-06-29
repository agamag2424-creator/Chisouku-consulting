import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  getAllCaseStudies,
  getPublishedCaseStudies,
  getPublishedCaseStudyBySlug,
} from "@/lib/caseStudies";

describe("case study publishing helpers", () => {
  it("keeps draft studies out of published detail lookups", async () => {
    const allStudies = await getAllCaseStudies();
    const draft = allStudies.find((study) => !study.published);

    assert.ok(draft, "expected at least one draft case study fixture");
    assert.equal(await getPublishedCaseStudyBySlug(draft.slug), null);
  });

  it("returns only published studies for generated routes", async () => {
    const publishedStudies = await getPublishedCaseStudies();

    assert.ok(publishedStudies.every((study) => study.published));
  });
});
