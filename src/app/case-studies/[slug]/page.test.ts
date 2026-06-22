import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { generateMetadata, generateStaticParams } from "./page";

describe("case study detail publishing gate", () => {
  it("excludes unpublished case studies from static params", async () => {
    const params = await generateStaticParams();

    assert.equal(
      params.some((param) => param.slug === "uber-ai-adoption-question"),
      false,
    );
  });

  it("returns not-found metadata for unpublished case studies", async () => {
    const metadata = await generateMetadata({
      params: Promise.resolve({ slug: "uber-ai-adoption-question" }),
    });

    assert.equal(metadata.title, "Case Study Not Found");
  });
});
