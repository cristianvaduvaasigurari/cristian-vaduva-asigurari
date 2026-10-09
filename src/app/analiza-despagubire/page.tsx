import * as React from "react";
import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ClaimSettlementAnalyzer } from "@/components/sections/claim-settlement-analyzer";
import { Calculator, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Analiză Ofertă Despăgubire Daună | Cristian Văduva",
  description:
    "Compară oferta de despăgubire a asiguratorului cu devizul propriu de reparație sau înlocuire. Reconciliază franșizele, uzura aplicată și pozițiile neacoperite.",
  keywords: [
    "analiza oferta despagubire",
    "reconciliere dauna casco rca",
    "contestatie oferta asigurator",
    "diferenta deviz asigurare",
    "uzura piese casco",
    "regie proprie despagubire",
    "cristian vaduva daune",
  ],
  alternates: {
    canonical: "https://insurance.cristianvaduva.com/analiza-despagubire",
  },
  openGraph: {
    title: "Analiză Ofertă Despăgubire Daună — Cristian Văduva",
    description:
      "Instrument client-side pentru reconcilierea cifrelor din dosarul de daună. Calculează diferențele de deviz, identifică deducerile și descarcă raportul PDF.",
    url: "https://insurance.cristianvaduva.com/analiza-despagubire",
    type: "website",
  },
};

export default function AnalizaDespagubirePage() {
  return (
    <div className="min-h-screen bg-[#0b0d10] text-zinc-100 flex flex-col selection:bg-blue-600 selection:text-white">
      <Navbar />

      <main className="flex-1 pt-36 pb-24 relative overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-600/10 rounded-full blur-[160px] pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-6xl">
          {/* Header Intro */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase tracking-widest mb-6">
              <Calculator className="w-3.5 h-3.5" />
              Claim Settlement Offer Analyzer
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-white tracking-tight leading-[1.1] mb-6">
              Este corectă despăgubirea? <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-blue-400">
                Reconciliază oferta și devizul.
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-zinc-300 font-light leading-relaxed max-w-2xl mx-auto">
              Analizează deducerile de franșiză, uzură sau piese aplicate de asigurator. Compară transparent oferta netă cu devizul tău de reparație înainte de a semna acordul de despăgubire.
            </p>
          </div>

          {/* Core Interactive Component */}
          <ClaimSettlementAnalyzer />

          {/* Internal Cross Links */}
          <div className="mt-16 pt-12 border-t border-zinc-800/80 flex flex-wrap items-center justify-between gap-4 text-xs text-zinc-500">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <span className="text-zinc-400 font-medium">Instrumente conexe:</span>
              <Link href="/urmarire-dauna" className="text-zinc-400 hover:text-white underline underline-offset-4">
                Urmărire Daună
              </Link>
              <span>•</span>
              <Link href="/generator-dosar-dauna" className="text-zinc-400 hover:text-white underline underline-offset-4">
                Generator Dosar Daună
              </Link>
              <span>•</span>
              <Link href="/dosar-asigurare" className="text-zinc-400 hover:text-white underline underline-offset-4">
                Dosar Documente
              </Link>
              <span>•</span>
              <Link href="/registru-documentare" className="text-zinc-400 hover:text-white underline underline-offset-4">
                Registru Surse & Clauze
              </Link>
              <span>•</span>
              <Link href="/compara-polite" className="text-zinc-400 hover:text-white underline underline-offset-4">
                Comparație Polițe
              </Link>
            </div>
            <Link href="/verifica-polita" className="text-blue-400 hover:text-blue-300 inline-flex items-center gap-1 font-medium">
              <span>Consultanță gratuită pe dosar</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
