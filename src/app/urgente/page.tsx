import * as React from "react";
import type { Metadata } from "next";
import { EmergencyCenter } from "@/components/sections/emergency-center";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "Centru de Urgențe | Emergency Hub — Cristian Văduva Asigurări",
  description:
    "Ghid de conduită în situații de urgență (Accident Auto, Medical, Incendiu, Inundație, Călătorii, Business). Apelează 112 pentru urgențe vitale și consultă pașii procedurali pentru dosarul de daună.",
  keywords: [
    "urgente asigurari",
    "numar urgenta 112",
    "dauna accident auto",
    "constatare amiabila",
    "dauna incendiu locuinta",
    "inundatie apartament despagubire",
    "urgenta medicala calatorie",
  ],
  openGraph: {
    title: "Centru de Urgențe | Emergency Hub — Cristian Văduva Asigurări",
    description:
      "Protocol de siguranță și pași procedurali în caz de urgență și daune. Prioritizează siguranța personală (112) și documentează corect evenimentul.",
    url: "https://insurance.cristianvaduva.com/urgente",
    type: "website",
  },
};

export default function UrgentePage() {
  return (
    <div className="min-h-screen bg-[#0b0d10] text-zinc-100 flex flex-col selection:bg-rose-600 selection:text-white">
      <Navbar />

      <main className="flex-1 pt-36 pb-24 relative overflow-hidden">
        {/* Subtle background emergency ambient glow */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-rose-600/10 rounded-full blur-[160px] pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-5xl">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 font-bold text-xs mb-6 uppercase tracking-widest">
              <AlertTriangle className="w-3.5 h-3.5" />
              Safety-First Emergency Hub
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold mb-6 text-white tracking-tight leading-[1.1]">
              Centru de Urgențe & Ghid de Conduită
            </h1>
            <p className="text-lg sm:text-xl text-zinc-300 font-light leading-relaxed max-w-2xl mx-auto">
              În caz de pericol iminent sau vătămări corporale, apelați imediat <strong>112</strong>. Pentru etapele ulterioare punerii în siguranță, urmați ghidul de mai jos pentru protejarea drepturilor din contractul de asigurare.
            </p>
          </div>

          <EmergencyCenter />
        </div>
      </main>

      <Footer />
    </div>
  );
}

