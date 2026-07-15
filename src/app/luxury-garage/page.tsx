import React from "react";
import type { Metadata } from "next";
import { LuxuryGarageConfigurator } from "@/components/sections/luxury-garage-configurator";

export const metadata: Metadata = {
  title: "AiX Luxury Garage | Cristian Văduva",
  description: "Monitorizează și asiguri bunurile tale de lux: supercars, yachts, ceasuri scumpe și artă.",
};

export default function LuxuryGaragePage() {
  return (
    <main className="min-h-screen bg-[#fafafa] pt-32 pb-24">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-800 font-bold text-xs mb-6 uppercase tracking-widest border border-slate-200">
            Luxury Assets
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-black mb-6 text-foreground tracking-tight">
            AiX Luxury Garage
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Consolă dedicată clienților de elită pentru administrarea riscurilor asociate bunurilor High-Net-Worth. Configurare fină a soluțiilor de reasigurare.
          </p>
        </div>

        {/* Garage Configurator */}
        <LuxuryGarageConfigurator />

      </div>
    </main>
  );
}
