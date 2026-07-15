import React from "react";
import type { Metadata } from "next";
import { ResourcesList } from "@/components/sections/resources-list";

export const metadata: Metadata = {
  title: "Resurse beneficiu | Ghiduri Financiare & Asigurări",
  description: "Descarcă gratuit ghidurile și checklist-urile create de Cristian Văduva pentru optimizarea patrimoniului tău.",
};

export default function ResursePage() {
  return (
    <main className="min-h-screen bg-[#fafafa] pt-32 pb-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-600 font-medium text-xs mb-6 uppercase tracking-widest border border-slate-200">
            Librărie Digitală
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-foreground tracking-tight">
            Resurse beneficiu
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Educația financiară este prima formă de protecție. Am sintetizat decenii de experiență în ghiduri PDF clare, acționabile, pe care le poți descărca gratuit.
          </p>
        </div>

        <ResourcesList />
      </div>
    </main>
  );
}
