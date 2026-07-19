import * as React from "react";
import type { Metadata } from "next";
import { RiskSimulator } from "@/components/sections/risk-simulator";

export const metadata: Metadata = {
  title: "AiX Risk Simulator | Cristian Văduva",
  description: "Evaluează consecințele financiare ale evenimentelor neprevăzute. Vizualizează statusul cu și fără protecție.",
};

export default function RiskSimulatorPage() {
  return (
    <main className="min-h-screen bg-[#fafafa] pt-32 pb-24">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-800 font-bold text-xs mb-6 uppercase tracking-widest border border-slate-200">
            Risk Analysis
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-black mb-6 text-foreground tracking-tight">
            AiX Risk Simulator
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Configurează-ți profilul financiar și simulează impactul imediat al accidentelor, pierderii venitului sau dezastrelor naturale pentru a-ți vizualiza vulnerabilitatea netă.
          </p>
        </div>

        {/* Risk Simulator */}
        <RiskSimulator />

      </div>
    </main>
  );
}
