import assert from "node:assert/strict";
import test from "node:test";
import {
  getAllCaseStudies,
  getPublishedCaseStudies,
  getPublishedCaseStudyBySlug,
} from "./caseStudies";

test("published case-study helpers exclude draft studies", async () => {
  const allStudies = await getAllCaseStudies();
  const publishedStudies = await getPublishedCaseStudies();
  const draftStudy = allStudies.find((study) => study.published === false);

  assert.ok(draftStudy, "fixture should contain a draft case study");
  assert.equal(
    publishedStudies.some((study) => study.slug === draftStudy.slug),
    false,
  );
  assert.equal(await getPublishedCaseStudyBySlug(draftStudy.slug), null);
});
