import * as React from "react";
import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { RealWorldRiskScenarios } from "@/components/sections/real-world-risk-scenarios";

import { riskScenarios } from "@/data/riskScenariosData";

export const metadata: Metadata = {
  title: "Scenarii Reale de Risc — Ghid Practic de Prevenție & Protecție Financiară | Cristian Văduva",
  description: `Descoperă cele ${riskScenarios.length} de scenarii reale de risc din auto, locuință, sănătate, călătorii și business. Înțelege expunerea ta financiară și cum schimbă o asigurare ecuația pierderilor.`,
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
  alternates: {
    canonical: "https://insurance.cristianvaduva.com/scenarii-risc",
  },
  openGraph: {
    title: "Scenarii Reale de Risc — Ghid Practic de Prevenție & Protecție Financiară | Cristian Văduva",
    description: `Descoperă cele ${riskScenarios.length} de scenarii reale de risc din auto, locuință, sănătate, călătorii și business.`,
    url: "https://insurance.cristianvaduva.com/scenarii-risc",
    locale: "ro_RO",
    type: "article",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Scenarii Reale de Risc — Cristian Văduva Asigurări",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Scenarii Reale de Risc — Ghid Practic de Prevenție & Protecție Financiară | Cristian Văduva",
    description: `Descoperă cele ${riskScenarios.length} de scenarii reale de risc din auto, locuință, sănătate, călătorii și business.`,
    images: ["/twitter-image"],
  },
};

export default function RiskScenariosPage() {
  return (
    <div className="bg-[#07090E] text-white min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16 bg-[#07090E]">
        <RealWorldRiskScenarios />
      </main>
      <Footer />
    </div>
  );
}
