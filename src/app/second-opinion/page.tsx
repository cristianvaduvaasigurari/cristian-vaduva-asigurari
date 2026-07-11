import React from "react";
import type { Metadata } from "next";
import { SecondOpinionAnalyzer } from "@/components/sections/second-opinion-analyzer";

export const metadata: Metadata = {
  title: "AiX Second Opinion | Cristian Văduva",
  description: "Obține o analiză educațională rapidă asupra ofertelor de asigurare sau imobiliare primite.",
};

export default function SecondOpinionPage() {
  return (
    <main className="min-h-screen bg-[#fafafa] pt-32 pb-24">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-800 font-bold text-xs mb-6 uppercase tracking-widest border border-slate-200">
            Advisory Aid
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-black mb-6 text-foreground tracking-tight">
            AiX Second Opinion
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Ai primit o ofertă de la alt broker sau o propunere de contract imobiliar? Lipește textul mai jos pentru a primi o sinteză a clauzelor abuzive, riscurilor ascunse și întrebărilor pe care trebuie să le pui.
          </p>
        </div>

        {/* Opinion Analyzer */}
        <SecondOpinionAnalyzer />

      </div>
    </main>
  );
}
