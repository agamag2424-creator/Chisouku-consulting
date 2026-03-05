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
  title: "AI Governance & AI Solutions for Mid-Market Companies",
  description:
    "Homepage for ChisokuLab — a boutique partner that helps mid-market organizations govern AI safely and deploy high-impact AI solutions.",
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
