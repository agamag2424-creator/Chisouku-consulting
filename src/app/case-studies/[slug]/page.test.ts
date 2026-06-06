import assert from "node:assert/strict";
import { describe, it } from "node:test";
import CaseStudyDetailPage, {
  generateMetadata,
  generateStaticParams,
} from "./page";

const unpublishedSlug = "uber-ai-adoption-question";

describe("case study detail route", () => {
  it("excludes unpublished case studies from static params", async () => {
    const params = await generateStaticParams();

    assert.deepEqual(params, []);
  });

  it("does not expose metadata for unpublished case studies", async () => {
    const metadata = await generateMetadata({
      params: Promise.resolve({ slug: unpublishedSlug }),
    });

    assert.equal(metadata.title, "Case Study Not Found");
    assert.equal(metadata.description, undefined);
  });

  it("404s direct requests for unpublished case studies", async () => {
    await assert.rejects(
      () =>
        CaseStudyDetailPage({
          params: Promise.resolve({ slug: unpublishedSlug }),
        }),
      (error) =>
        typeof error === "object" &&
        error !== null &&
        "digest" in error &&
        String(error.digest).includes("NEXT_HTTP_ERROR_FALLBACK;404"),
    );
  });
});
