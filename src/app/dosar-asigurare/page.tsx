import * as React from "react";
import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { InsuranceReviewDossier } from "@/components/sections/insurance-review-dossier";
import { FolderOpen, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Dosar Pregătire Asigurare & Checklist Documente | Cristian Văduva",
  description:
    "Organizează documentele necesare înainte de auditul sau reînnoirea polițelor. Checklist structurat pe obiective (Locuință, Auto, Sănătate, Business, Private Client) și descărcare dosar PDF.",
  keywords: [
    "dosar asigurare",
    "checklist documente asigurari",
    "pregatire reinnoire polita",
    "documente necesare casco",
    "audit polite asigurare",
    "dosar asigurari premium",
  ],
  alternates: {
    canonical: "https://insurance.cristianvaduva.com/dosar-asigurare",
  },
  openGraph: {
    title: "Dosar Pregătire Asigurare & Checklist Documente — Cristian Văduva",
    description:
      "Instrument de organizare documentară înainte de întâlnirea cu consultantul de asigurări. Checklist adaptiv, generator de întrebări și descărcare PDF.",
    url: "https://insurance.cristianvaduva.com/dosar-asigurare",
    type: "website",
  },
};

export default function DosarAsigurarePage() {
  return (
    <div className="min-h-screen bg-[#0b0d10] text-zinc-100 flex flex-col selection:bg-blue-600 selection:text-white">
      <Navbar />

      <main className="flex-1 pt-36 pb-24 relative overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-600/10 rounded-full blur-[160px] pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-5xl">
          {/* Header Intro */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase tracking-widest mb-6">
              <FolderOpen className="w-3.5 h-3.5" />
              Insurance Review Dossier & Checklist
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-white tracking-tight leading-[1.1] mb-6">
              Pregătește dosarul de asigurare. <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-blue-400">
                Fără documente lipsă.
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-zinc-300 font-light leading-relaxed max-w-2xl mx-auto">
              Centralizează toate actele necesare pentru audit, reînnoire sau daune într-un checklist clar. Generează dosarul complet în format PDF pentru o discuție eficientă cu brokerul.
            </p>
          </div>

          {/* Interactive Dossier Component */}
          <InsuranceReviewDossier />

          {/* Internal Cross Links */}
          <div className="mt-16 pt-12 border-t border-zinc-800/80 flex flex-wrap items-center justify-between gap-4 text-xs text-zinc-500">
            <div className="space-x-4">
              <span>Instrumente conexe:</span>
              <Link href="/verifica-polita" className="text-zinc-400 hover:text-white underline underline-offset-4">
                Audit Poliță Existentă
              </Link>
              <span>•</span>
              <Link href="/compara-polite" className="text-zinc-400 hover:text-white underline underline-offset-4">
                Comparație Oferte
              </Link>
              <span>•</span>
              <Link href="/calendar-asigurari" className="text-zinc-400 hover:text-white underline underline-offset-4">
                Calendar Reînnoiri
              </Link>
              <span>•</span>
              <Link href="/profil-risc" className="text-zinc-400 hover:text-white underline underline-offset-4">
                Profil de Risc
              </Link>
              <span>•</span>
              <Link href="/generator-dosar-dauna" className="text-zinc-400 hover:text-white underline underline-offset-4">
                Generator Dosar Daună
              </Link>
            </div>
            <Link href="/verifica-polita" className="text-blue-400 hover:text-blue-300 inline-flex items-center gap-1">
              <span>Trimite dosarul spre audit</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
