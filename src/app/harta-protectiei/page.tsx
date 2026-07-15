import React from "react";
import type { Metadata } from "next";
import { ProtectionMap } from "@/components/sections/protection-map";

export const metadata: Metadata = {
  title: "Harta Protecției | Cristian Văduva beneficiu",
  description: "Explorează interactiv zonele de vulnerabilitate financiară din viața ta și descoperă soluțiile de protecție.",
};

export default function ProtectionMapPage() {
  return (
    <main className="min-h-screen bg-[#fafafa] pt-32 pb-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 font-medium text-xs mb-6 uppercase tracking-widest border border-indigo-100">
            Vizualizare Interactivă
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-foreground tracking-tight">
            Harta Protecției Tale
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Interacționează cu harta de mai jos pentru a înțelege exact la ce riscuri ești expus în fiecare zonă importantă a vieții tale și cum le poți transfera eficient.
          </p>
        </div>

        <ProtectionMap />
      </div>
    </main>
  );
}
