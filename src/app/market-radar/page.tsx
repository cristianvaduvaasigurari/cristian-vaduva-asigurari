import React from "react";
import type { Metadata } from "next";
import { MarketRadarFeed } from "@/components/sections/market-radar-feed";

export const metadata: Metadata = {
  title: "Live Market Radar | Cristian Văduva",
  description: "Urmărește semnalele pieței imobiliare și noutățile economice majore din România.",
};

export default function MarketRadarPage() {
  return (
    <main className="min-h-screen bg-[#fafafa] pt-32 pb-24">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-800 font-bold text-xs mb-6 uppercase tracking-widest border border-slate-200">
            Market Signals
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-black mb-6 text-foreground tracking-tight">
            AiX Live Market Radar
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Diagnosticul macroeconomic pe piața asigurărilor, dobânzilor bancare și oportunităților imobiliare rezidențiale din România, procesat de inteligența artificială.
          </p>
        </div>

        {/* Market Feed */}
        <MarketRadarFeed />

      </div>
    </main>
  );
}
