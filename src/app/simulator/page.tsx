import * as React from "react";
import type { Metadata } from "next";
import { LifeSimulator } from "@/components/sections/life-simulator";

export const metadata: Metadata = {
  title: "AiX Life Simulator | Cristian Văduva",
  description: "Simulează impactul deciziilor tale majore de viață asupra stabilității tale financiare. Calculează scorul tău de protecție live.",
};

export default function SimulatorPage() {
  return (
    <main className="min-h-screen bg-[#fafafa] pt-32 pb-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 font-bold text-xs mb-6 uppercase tracking-widest border border-blue-100">
            Advanced Tooling
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-foreground tracking-tight">
            AiX Life Simulator
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Joacă-te cu variabilele financiare și adaugă evenimente majore din viitorul tău (nuntă, copil, casă) pentru a vedea instant cum îți este afectat nivelul de securitate.
          </p>
        </div>

        <LifeSimulator />
      </div>
    </main>
  );
}
