import React from "react";
import type { Metadata } from "next";
import { EcosystemMap } from "@/components/sections/ecosystem-map";

export const metadata: Metadata = {
  title: "Ecosistemul AiX | Cristian Văduva",
  description: "Descoperă modul în care Asigurările, Real Estate-ul și Tehnologia (AiX OS) lucrează împreună pentru tine.",
};

export default function EcosistemPage() {
  return (
    <main className="min-h-screen bg-[#fafafa] pt-32 pb-24 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 text-purple-600 font-medium text-xs mb-6 uppercase tracking-widest border border-purple-100">
            Arhitectura Viitorului
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 text-foreground tracking-tight">
            Ecosistemul <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">AiX</span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Nu oferim doar polițe de asigurare. Am construit un întreg ecosistem digital beneficiu în care protecția, creșterea capitalului și tehnologia se întrepătrund perfect pentru a-ți asigura succesul.
          </p>
        </div>

        <EcosystemMap />
      </div>
    </main>
  );
}
