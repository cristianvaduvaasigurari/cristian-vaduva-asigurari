import * as React from "react";
import type { Metadata } from "next";
import { FamilyPlanner } from "@/components/sections/family-planner";

export const metadata: Metadata = {
  title: "Family Protection Planner | Cristian Văduva",
  description: "Calculează matematic expunerea financiară a familiei tale și descoperă capitalul necesar pentru protecția lor.",
};

export default function FamilyPlannerPage() {
  return (
    <main className="min-h-screen bg-[#fafafa] pt-32 pb-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 text-rose-600 font-medium text-xs mb-6 uppercase tracking-widest border border-rose-100">
            Analiză Demografică AiX
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-foreground tracking-tight">
            Planificatorul Familiei
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Asigurarea de viață nu este pentru tine, este pentru cei care rămân în urmă. Folosește planificatorul pentru a vizualiza riscul matematic la care îți supui familia dacă dispar veniturile tale.
          </p>
        </div>

        <FamilyPlanner />
      </div>
    </main>
  );
}
