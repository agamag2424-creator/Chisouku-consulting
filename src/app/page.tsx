import type { Metadata } from "next";
import { BootSequence } from "../components/layout/BootSequence";
import { HeroSection } from "../components/homepage/HeroSection";
import { ThreatLevelBar } from "../components/homepage/ThreatLevelBar";
import { IndustryShiftSection } from "../components/homepage/IndustryShiftSection";
import { WideningGapSection } from "../components/homepage/WideningGapSection";
import { TwoPathsSection } from "../components/homepage/TwoPathsSection";
import { PhilosophySection } from "../components/homepage/PhilosophySection";
import { TrustStripSection } from "../components/homepage/TrustStripSection";
import { FinalCtaSection } from "../components/homepage/FinalCtaSection";
import { GridColorScroll } from "../components/homepage/GridColorScroll";

export const metadata: Metadata = {
  title: "AI-Led PMO & Enterprise Transformation",
  description:
    "ChisokuLab helps enterprises embed AI into PMO operations and programme delivery — turning AI investment into measurable execution outcomes.",
  keywords: [
    "AI-led PMO",
    "AI project management",
    "AI enterprise transformation",
    "ChisokuLab",
  ],
};

export default function Home() {
  return (
    <BootSequence>
      <>
        <GridColorScroll />
        <HeroSection />
        <ThreatLevelBar />
        <IndustryShiftSection />
        <WideningGapSection />
        <TwoPathsSection />
        <PhilosophySection />
        <TrustStripSection />
        <FinalCtaSection />
      </>
    </BootSequence>
  );
}
