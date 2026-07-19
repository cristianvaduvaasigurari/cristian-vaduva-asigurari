import * as React from "react";
import type { Metadata } from "next";
import { InsightsList } from "@/components/sections/insights-list";

export const metadata: Metadata = {
  title: "AiX Insights | Știri și Analize Asigurări",
  description: "Cele mai noi tendințe din piețele de asigurări, investiții și real estate, procesate și analizate de AiX OS.",
};

export default function InsightsPage() {
  return (
    <main className="min-h-screen bg-[#fafafa] pt-32 pb-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-600 font-medium text-xs mb-6 uppercase tracking-widest border border-slate-200">
            Arhitectură Pregătită pentru AI service / RSS
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-foreground tracking-tight">
            AiX <span className="text-blue-600">Insights</span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Informația înseamnă protecție. Rămâi la curent cu analizele pieței financiare, evoluțiile legislative și noutățile din tehnologia asigurărilor.
          </p>
        </div>

        <InsightsList />
      </div>
    </main>
  );
}
