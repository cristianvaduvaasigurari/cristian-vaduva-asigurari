import * as React from "react";
import { Suspense } from "react";
import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { HomePurchaseJourney } from "@/components/sections/home-purchase-journey";
import { Home, ShieldCheck, FileCheck2, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Ai găsit casa? Pregătește-i protecția | Asigurare Achiziție Imobil — Cristian Văduva",
  description:
    "Pregătește asigurarea obligatorie PAD, polița facultativă și cesiunea pentru bancă într-un singur loc, înainte de semnarea notarială a noii tale locuințe.",
  keywords: [
    "asigurare cumparare casa",
    "asigurare credit ipotecar",
    "cesiune polita locuinta banca",
    "pad si facultativa apartament",
    "asigurare locuinta notar",
    "homefind asigurari",
  ],
  alternates: {
    canonical: "https://insurance.cristianvaduva.com/cumpar-casa",
  },
  openGraph: {
    title: "Ai găsit casa? Pregătește-i protecția într-un singur loc — Cristian Văduva",
    description:
      "Analizăm asigurarea locuinței, cerințele băncii și opțiunile de protecție financiară pentru noua ta proprietate.",
    url: "https://insurance.cristianvaduva.com/cumpar-casa",
    type: "website",
  },
};

export default function CumparCasaPage() {
  return (
    <div className="min-h-screen bg-[#0b0d10] text-zinc-100 flex flex-col selection:bg-blue-600 selection:text-white">
      <Navbar />

      <main className="flex-1 pt-36 pb-24 relative overflow-hidden">
        {/* Subtle Ambient Glow */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-600/10 rounded-full blur-[160px] pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-5xl">
          {/* Header Intro */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase tracking-widest mb-6">
              <Home className="w-3.5 h-3.5" />
              Home Purchase Protection
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-white tracking-tight leading-[1.1] mb-6">
              Ai găsit casa? <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-blue-400">
                Pregătește-i protecția într-un singur loc.
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-zinc-300 font-light leading-relaxed max-w-2xl mx-auto">
              Analizăm asigurarea locuinței, cerințele băncii și opțiunile de protecție financiară, astfel încât să poți pregăti documentele din timp, înainte de semnare.
            </p>
          </div>

          {/* Interactive Form with Suspense for URL search params */}
          <Suspense fallback={<div className="text-center py-12 text-zinc-500">Se încarcă formularul...</div>}>
            <HomePurchaseJourney />
          </Suspense>

          {/* Internal Cross Links */}
          <div className="mt-16 pt-12 border-t border-zinc-800/80 flex flex-wrap items-center justify-between gap-4 text-xs text-zinc-500">
            <div className="space-x-4">
              <span>Alte soluții patrimoniale:</span>
              <Link href="/servicii/home-insurance" className="text-zinc-400 hover:text-white underline underline-offset-4">
                Asigurare Locuință Facultativă
              </Link>
              <span>•</span>
              <Link href="/verifica-polita" className="text-zinc-400 hover:text-white underline underline-offset-4">
                Verifică o Poliță Existentă
              </Link>
              <span>•</span>
              <Link href="/proprietari-inchirieri" className="text-zinc-400 hover:text-white underline underline-offset-4">
                Protecție Proprietăți Închiriate
              </Link>
            </div>
            <Link href="/stiri/asigurarea-obligatorie-pad-vs-facultativa-protectie-completa-locuinte" className="text-blue-400 hover:text-blue-300 inline-flex items-center gap-1">
              <span>Ghid: PAD vs. Asigurarea Facultativă</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
