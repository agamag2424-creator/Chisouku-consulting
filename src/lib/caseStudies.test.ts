import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  getPublishedCaseStudies,
  getPublishedCaseStudyBySlug,
} from "./caseStudies";

describe("published case-study helpers", () => {
  it("exclude unpublished case studies from public lookups", async () => {
    const publishedStudies = await getPublishedCaseStudies();
    const unpublishedStudy = await getPublishedCaseStudyBySlug(
      "uber-ai-adoption-question",
    );

    assert.equal(unpublishedStudy, null);
    assert.equal(
      publishedStudies.every((caseStudy) => caseStudy.published),
      true,
    );
  });
});
