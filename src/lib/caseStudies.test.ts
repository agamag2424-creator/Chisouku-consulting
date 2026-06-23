import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  getAllCaseStudies,
  getPublishedCaseStudies,
  getPublishedCaseStudyBySlug,
} from "./caseStudies";

describe("published case studies", () => {
  it("excludes draft studies from published collections", async () => {
    const allStudies = await getAllCaseStudies();
    const publishedStudies = await getPublishedCaseStudies();

    assert.ok(
      allStudies.some((study) => study.slug === "uber-ai-adoption-question"),
    );
    assert.equal(
      publishedStudies.some(
        (study) => study.slug === "uber-ai-adoption-question",
      ),
      false,
    );
  });

  it("does not resolve unpublished studies by slug", async () => {
    const study = await getPublishedCaseStudyBySlug("uber-ai-adoption-question");

    assert.equal(study, null);
  });
});
