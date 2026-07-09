import React from "react";
import type { Metadata } from "next";
import { GapAnalyzer } from "@/components/sections/gap-analyzer";

export const metadata: Metadata = {
  title: "Coverage Gap Analyzer | Audit Financiar",
  description: "Află care sunt verigile lipsă din protecția ta financiară prin Coverage Gap Analyzer.",
};

export default function GapAnalyzerPage() {
  return (
    <main className="min-h-screen bg-[#fafafa] pt-32 pb-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-600 font-medium text-xs mb-6 uppercase tracking-widest border border-amber-100">
            Audit Financiar
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-foreground tracking-tight">
            Coverage Gap Analyzer
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Majoritatea oamenilor cred că sunt asigurați, până când au cu adevărat o daună. Răspunde onest la următoarele 4 scenarii dure pentru a-ți descoperi vulnerabilitățile.
          </p>
        </div>

        <GapAnalyzer />
      </div>
    </main>
  );
}
