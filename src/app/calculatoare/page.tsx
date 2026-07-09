import React from "react";
import type { Metadata } from "next";
import { ImpactCalculators } from "@/components/sections/impact-calculators";

export const metadata: Metadata = {
  title: "Calculatoare Impact Financiar | Cristian Văduva",
  description: "Vizualizează pierderea potențială vs costul asigurării prin calculatoarele noastre interactive.",
};

export default function CalculatoarePage() {
  return (
    <main className="min-h-screen bg-[#fafafa] pt-32 pb-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 font-medium text-xs mb-6 uppercase tracking-widest border border-blue-100">
            Analiză Matematică
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-foreground tracking-tight">
            Impact Financiar
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Asigurările nu sunt o cheltuială, ci o unealtă matematică de transfer al riscului. Află exact ce înseamnă costul unei asigurări comparat cu o daună majoră neașteptată.
          </p>
        </div>

        <ImpactCalculators />
      </div>
    </main>
  );
}
