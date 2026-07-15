import React from "react";
import type { Metadata } from "next";
import { RealEstateAnalyzer } from "@/components/sections/real-estate-analyzer";

export const metadata: Metadata = {
  title: "Real Estate Investment Analyzer | Cristian Văduva",
  description: "Evaluează matematic randamentul investițiilor imobiliare și descoperă strategiile de protecție a cash flow-ului.",
};

export default function RealEstateAnalyzerPage() {
  return (
    <main className="min-h-screen bg-[#fafafa] pt-32 pb-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-600 font-medium text-xs mb-6 uppercase tracking-widest border border-amber-100">
            Wealth Management AiX
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-foreground tracking-tight">
            Investment Analyzer
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Un instrument beneficiu pentru evaluarea investițiilor imobiliare. Calculează randamentul exact, expunerea de risc și timpul de recuperare al investiției înainte de a semna actele.
          </p>
        </div>

        <RealEstateAnalyzer />
      </div>
    </main>
  );
}
