import React from "react";
import type { Metadata } from "next";
import { MissionControlDashboard } from "@/components/sections/mission-control-dashboard";

export const metadata: Metadata = {
  title: "AiX Mission Control | Cristian Văduva",
  description: "Panoul central inteligent de management al patrimoniului tău personal.",
};

export default function MissionControlPage() {
  return (
    <main className="min-h-screen bg-[#fafafa] pt-32 pb-24">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-800 font-bold text-xs mb-6 uppercase tracking-widest border border-slate-200">
            Control Center
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-black mb-6 text-foreground tracking-tight">
            AiX Mission Control
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Consola centrală pentru monitorizarea activelor, pasivelor, asistenților virtuali și scorului tău de protecție. Totul într-un ecran intuitiv și rapid.
          </p>
        </div>

        {/* Dashboard */}
        <MissionControlDashboard />

      </div>
    </main>
  );
}
