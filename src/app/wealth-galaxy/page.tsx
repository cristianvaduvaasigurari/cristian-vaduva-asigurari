import React from "react";
import type { Metadata } from "next";
import { WealthGalaxyView } from "@/components/sections/wealth-galaxy-view";

export const metadata: Metadata = {
  title: "Wealth Galaxy | Cristian Văduva",
  description: "Vizualizează ecosistemul tău de protecție sub forma unei galaxii de active.",
};

export default function WealthGalaxyPage() {
  return (
    <main className="min-h-screen bg-[#fafafa] pt-32 pb-24">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-800 font-bold text-xs mb-6 uppercase tracking-widest border border-slate-200">
            Interactive Galaxy
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-black mb-6 text-foreground tracking-tight">
            AiX Wealth Galaxy
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            O hartă conceptuală orbitală a riscului și acoperirilor tale. Fiecare planetă reprezintă un domeniu critic al patrimoniului tău.
          </p>
        </div>

        {/* Galaxy */}
        <WealthGalaxyView />

      </div>
    </main>
  );
}
