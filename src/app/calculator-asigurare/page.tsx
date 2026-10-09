import * as React from "react";
import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { InsuranceNeedsCalculator } from "@/components/sections/insurance-needs-calculator";
import { Calculator, ShieldCheck, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Calculator Asigurare: Cât Să Asiguri? | Cristian Văduva Asigurări",
  description:
    "Calculează costul estimat de reconstrucție pentru locuința ta și evaluează capitalul necesar pentru asigurarea de viață a familiei prin calculatoare transparente.",
  keywords: [
    "calculator asigurare locuinta",
    "cost reconstructie locuinta",
    "calculator asigurare viata",
    "necesar protectie financiara",
    "cat sa asiguri casa",
  ],
  alternates: {
    canonical: "https://insurance.cristianvaduva.com/calculator-asigurare",
  },
  openGraph: {
    title: "Calculator Asigurare: Cât Să Asiguri? — Cristian Văduva",
    description:
      "Estimator transparent pentru costul de reconstrucție al locuinței și deficitul de protecție la asigurarea de viață.",
    url: "https://insurance.cristianvaduva.com/calculator-asigurare",
    type: "website",
  },
};

export default function CalculatorAsigurarePage() {
  return (
    <div className="min-h-screen bg-[#0b0d10] text-zinc-100 flex flex-col selection:bg-blue-600 selection:text-white">
      <Navbar />

      <main className="flex-1 pt-36 pb-24 relative overflow-hidden">
        {/* Subtle Ambient Glow */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-600/10 rounded-full blur-[160px] pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-5xl">
          {/* Header Intro */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase tracking-widest mb-6">
              <Calculator className="w-3.5 h-3.5" />
              Insurance Needs Engine
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-white tracking-tight leading-[1.1] mb-6">
              Cât ar trebui să asiguri? <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-blue-400">
                Modele matematice transparente.
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-zinc-300 font-light leading-relaxed max-w-2xl mx-auto">
              Evită subasigurarea sau supraasigurarea. Folosește instrumentele noastre pentru a estima valoarea de reconstrucție a casei sau necesarul de protecție financiară al familiei.
            </p>
          </div>

          {/* Calculator Component */}
          <InsuranceNeedsCalculator />

          {/* Internal Cross Links */}
          <div className="mt-16 pt-12 border-t border-zinc-800/80 flex flex-wrap items-center justify-between gap-4 text-xs text-zinc-500">
            <div className="space-x-4">
              <span>Instrumente conexe:</span>
              <Link href="/generator-dosar-dauna" className="text-zinc-400 hover:text-white underline underline-offset-4">
                Generator Dosar Daună (PDF)
              </Link>
              <span>•</span>
              <Link href="/cumpar-casa" className="text-zinc-400 hover:text-white underline underline-offset-4">
                Protecție Achiziție Locuință
              </Link>
              <span>•</span>
              <Link href="/proprietari-inchirieri" className="text-zinc-400 hover:text-white underline underline-offset-4">
                Proprietari Închirieri
              </Link>
              <span>•</span>
              <Link href="/urgente" className="text-zinc-400 hover:text-white underline underline-offset-4">
                Centru Urgențe (112)
              </Link>
            </div>
            <Link href="/verifica-polita" className="text-blue-400 hover:text-blue-300 inline-flex items-center gap-1">
              <span>Auditează o poliță existentă</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
