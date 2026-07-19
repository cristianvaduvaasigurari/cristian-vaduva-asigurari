import * as React from "react";
import type { Metadata } from "next";
import { AdvisorWizard } from "@/components/sections/advisor-wizard";

export const metadata: Metadata = {
  title: "Recomandă-mi Asigurarea Potrivită | Consultanță Asigurări AI",
  description: "Află în 2 minute de ce tip de protecție ai nevoie prin asistentul nostru virtual AiX.",
};

export default function AdvisorPage() {
  return (
    <main className="min-h-screen bg-[#fafafa] pt-32 pb-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 font-medium text-xs mb-6 uppercase tracking-widest border border-blue-100">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Inteligență Artificială
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-foreground tracking-tight">
            Asistent pentru Alegerea Asigurării
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Un instrument inteligent, rapid și anonim pentru a descoperi cu exactitate care sunt verigile lipsă din protecția familiei și afacerii tale. Durează mai puțin de 2 minute.
          </p>
        </div>

        <AdvisorWizard />
      </div>
    </main>
  );
}
