import type { Metadata } from "next";
import { AevaHero } from "./components/AevaHero";
import { AevaProblem } from "./components/AevaProblem";
import { AevaDimensions } from "./components/AevaDimensions";
import { AevaProofStrip } from "./components/AevaProofStrip";
import { AevaFinalCTA } from "./components/AevaFinalCTA";

export const metadata: Metadata = {
  title: "AEVA Framework — AI Governance for the Enterprise",
  description:
    "AEVA is a patent-pending framework that governs AI proliferation, orchestrates agentic workflows, and aligns AI delivery with enterprise risk policy.",
  keywords: [
    "AEVA framework",
    "AI governance framework",
    "enterprise AI governance",
  ],
};

export default function AevaPage() {
  return (
    <>
      <AevaHero />
      <AevaProblem />
      <AevaDimensions />
      <AevaProofStrip />
      <AevaFinalCTA />
    </>
  );
}
