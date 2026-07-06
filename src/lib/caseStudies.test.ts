import assert from "node:assert/strict";
import test from "node:test";
import {
  getAllCaseStudies,
  getPublishedCaseStudies,
  getPublishedCaseStudyBySlug,
} from "./caseStudies";
import {
  generateMetadata,
  generateStaticParams,
} from "../app/case-studies/[slug]/page";

test("published case-study helpers exclude unpublished drafts", async () => {
  const allStudies = await getAllCaseStudies();
  const draft = allStudies.find(
    (study) => study.slug === "uber-ai-adoption-question",
  );

  assert.equal(draft?.published, false);
  assert.deepEqual(await getPublishedCaseStudies(), []);
  assert.equal(
    await getPublishedCaseStudyBySlug("uber-ai-adoption-question"),
    null,
  );
});

test("case-study detail route does not statically expose drafts", async () => {
  assert.deepEqual(await generateStaticParams(), []);

  const metadata = await generateMetadata({
    params: Promise.resolve({ slug: "uber-ai-adoption-question" }),
  });

  assert.equal(metadata.title, "Case Study Not Found");
});
