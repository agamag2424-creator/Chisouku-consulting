import type { Metadata } from "next";
import { AevaHero } from "./components/AevaHero";
import { AevaProblem } from "./components/AevaProblem";
import { AevaDimensions } from "./components/AevaDimensions";
import { AevaProofStrip } from "./components/AevaProofStrip";
import { AevaFinalCTA } from "./components/AevaFinalCTA";

export const metadata: Metadata = {
  title: "AEVA Framework — AI Governance for the Enterprise",
  description:
    "AEVA is a patent-pending AI governance framework built to contain Shadow AI proliferation, govern agentic workflows, and align AI delivery with enterprise risk policy.",
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
