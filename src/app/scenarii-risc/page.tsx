import * as React from "react";
import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { RealWorldRiskScenarios } from "@/components/sections/real-world-risk-scenarios";

export const metadata: Metadata = {
  title: "Scenarii Reale de Risc — Când Neprevăzutul Devine Costisitor | Cristian Văduva",
  description: "Descoperă 37 de scenarii reale de risc din auto, locuință, sănătate, călătorii și business. Înțelege expunerea ta financiară și cum schimbă o asigurare ecuația pierderilor.",
  keywords: [
    "scenarii de risc",
    "asigurari generali",
    "risc auto casco",
    "inundatie locuinta",
    "urgenta medicala calatorie",
    "business interruption imm",
    "cyber risk",
    "raspundere manageriala dno",
    "cristian vaduva consultant"
  ],
  openGraph: {
    title: "Scenarii Reale de Risc | Cristian Văduva Insurance",
    description: "Explorează scenariile ilustrative de risc și calculează valoarea expusă la neprevăzut.",
    url: "https://insurance.cristianvaduva.com/scenarii-risc"
  }
};

export default function RiskScenariosPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-16">
        <RealWorldRiskScenarios />
      </main>
      <Footer />
    </>
  );
}
