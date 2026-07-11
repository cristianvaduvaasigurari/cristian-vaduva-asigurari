import React from "react";
import type { Metadata } from "next";
import { SatellitePropertyView } from "@/components/sections/satellite-property-view";

export const metadata: Metadata = {
  title: "Satellite Property View | Cristian Văduva",
  description: "Evaluează proprietățile de interes direct prin instrumentul nostru satelitar inteligent.",
};

export default function SatelliteViewPage() {
  return (
    <main className="min-h-screen bg-[#fafafa] pt-32 pb-24">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-800 font-bold text-xs mb-6 uppercase tracking-widest border border-slate-200">
            Satellite Intel
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-black mb-6 text-foreground tracking-tight">
            AiX Satellite Property View
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Introdu o adresă pentru a obține o analiză completă de risc, randament investițional estimat și recomandări specifice de asigurări.
          </p>
        </div>

        {/* Satellite Map Simulator */}
        <SatellitePropertyView />

      </div>
    </main>
  );
}
