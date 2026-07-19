import * as React from "react";
import type { Metadata } from "next";
import { PersonalDashboardWall } from "@/components/sections/personal-dashboard-wall";

export const metadata: Metadata = {
  title: "Personal Dashboard Wall | Cristian Văduva",
  description: "Vizualizează centralizat activele, asigurările și planurile tale financiare într-un ecran premium.",
};

export default function PersonalDashboardPage() {
  return (
    <main className="min-h-screen bg-[#fafafa] pt-32 pb-24">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-800 font-bold text-xs mb-6 uppercase tracking-widest border border-slate-200">
            Client Console
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-black mb-6 text-foreground tracking-tight">
            AiX Personal Dashboard Wall
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Un perete complet de control. Aici ai vizibilitate absolută asupra elementelor de portofoliu imobiliar, securitate familială și de business, ordonate logic.
          </p>
        </div>

        {/* Dashboard Wall */}
        <PersonalDashboardWall />

      </div>
    </main>
  );
}
