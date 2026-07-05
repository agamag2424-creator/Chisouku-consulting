import { describe, expect, it } from "vitest";
import {
  getAllCaseStudies,
  getCaseStudyBySlug,
  getPublishedCaseStudies,
  getPublishedCaseStudyBySlug,
} from "./caseStudies";

const DRAFT_CASE_STUDY_SLUG = "uber-ai-adoption-question";

describe("case study accessors", () => {
  it("keeps drafts available to listing data but not public detail routes", async () => {
    const allCaseStudies = await getAllCaseStudies();
    const publishedCaseStudies = await getPublishedCaseStudies();

    expect(await getCaseStudyBySlug(DRAFT_CASE_STUDY_SLUG)).not.toBeNull();
    expect(
      await getPublishedCaseStudyBySlug(DRAFT_CASE_STUDY_SLUG),
    ).toBeNull();
    expect(
      allCaseStudies.some((study) => study.slug === DRAFT_CASE_STUDY_SLUG),
    ).toBe(true);
    expect(
      publishedCaseStudies.some(
        (study) => study.slug === DRAFT_CASE_STUDY_SLUG,
      ),
    ).toBe(false);
  });
});
