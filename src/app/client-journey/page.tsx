import * as React from "react";
import type { Metadata } from "next";
import { ClientJourneyMap } from "@/components/sections/client-journey-map";

export const metadata: Metadata = {
  title: "AiX Client Journey | Cristian Văduva",
  description: "Descoperă călătoria ta de private advisory ghidată. De la analiză la multiplicare.",
};

export default function ClientJourneyPage() {
  return (
    <main className="min-h-screen bg-[#fafafa] pt-32 pb-24">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-800 font-bold text-xs mb-6 uppercase tracking-widest border border-slate-200">
            Advisory Process
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-black mb-6 text-foreground tracking-tight">
            Călătoria Clientului Premium
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Un parcurs structurat în 5 pași conceput pentru a asigura maparea riscurilor, eliminarea deficitului de capital, securizarea activelor și direcționarea eficientă a investițiilor.
          </p>
        </div>

        {/* Journey Map */}
        <ClientJourneyMap />

      </div>
    </main>
  );
}
