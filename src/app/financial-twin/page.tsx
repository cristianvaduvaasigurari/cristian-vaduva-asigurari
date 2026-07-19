import * as React from "react";
import type { Metadata } from "next";
import { FinancialTwin } from "@/components/sections/financial-twin";

export const metadata: Metadata = {
  title: "AiX Financial Twin | Cristian Văduva",
  description: "Creează-ți profilul financiar digital pentru a identifica exact activele, pasivele și necesarul tău de protecție.",
};

export default function FinancialTwinPage() {
  return (
    <main className="min-h-screen bg-[#fafafa] pt-32 pb-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 font-medium text-xs mb-6 uppercase tracking-widest border border-blue-100">
            Analiză Patrimonială
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-foreground tracking-tight">
            AiX Financial Twin
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Nu poți proteja ceea ce nu măsori. Geamănul tău financiar digital este cel mai avansat sistem de onboarding pentru identificarea precisă a riscurilor.
          </p>
        </div>

        <FinancialTwin />
      </div>
    </main>
  );
}
