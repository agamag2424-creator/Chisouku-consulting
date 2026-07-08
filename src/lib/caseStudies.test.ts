import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  getAllCaseStudies,
  getPublishedCaseStudies,
  getPublishedCaseStudyBySlug,
} from "./caseStudies";

describe("case study publication gates", () => {
  it("excludes unpublished studies from public detail access", async () => {
    const allStudies = await getAllCaseStudies();
    const unpublishedStudy = allStudies.find((study) => !study.published);

    assert.ok(unpublishedStudy, "expected at least one unpublished fixture");
    assert.equal(
      await getPublishedCaseStudyBySlug(unpublishedStudy.slug),
      null,
    );
  });

  it("only returns published studies for public route generation", async () => {
    const publicStudies = await getPublishedCaseStudies();

    assert.ok(publicStudies.every((study) => study.published));
  });
});
