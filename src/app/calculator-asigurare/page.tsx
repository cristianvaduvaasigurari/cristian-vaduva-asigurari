import * as React from "react";
import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { InsuranceNeedsCalculator } from "@/components/sections/insurance-needs-calculator";
import { Calculator, ArrowRight } from "lucide-react";
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
    <div className="min-h-screen bg-white text-zinc-900 flex flex-col selection:bg-blue-600 selection:text-white">
      <Navbar />

      <main className="flex-1 pt-36 pb-24 relative overflow-hidden bg-gradient-to-b from-zinc-50 via-white to-white">
        <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-5xl">
          {/* Header Intro */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold uppercase tracking-widest mb-6 shadow-xs">
              <Calculator className="w-3.5 h-3.5" />
              Insurance Needs Engine
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-zinc-900 tracking-tight leading-[1.1] mb-6">
              Cât ar trebui să asiguri? <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700">
                Modele matematice transparente.
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-zinc-600 font-normal leading-relaxed max-w-2xl mx-auto">
              Evită subasigurarea sau supraasigurarea. Folosește instrumentele noastre pentru a estima valoarea de reconstrucție a casei sau necesarul de protecție financiară al familiei.
            </p>
          </div>

          {/* Calculator Component */}
          <InsuranceNeedsCalculator />

          {/* Internal Cross Links */}
          <div className="mt-16 pt-12 border-t border-zinc-200 flex flex-wrap items-center justify-between gap-4 text-xs text-zinc-500">
            <div className="space-x-4">
              <span className="text-zinc-600 font-medium">Instrumente conexe:</span>
              <Link href="/generator-dosar-dauna" className="text-zinc-600 hover:text-blue-600 underline underline-offset-4">
                Generator Dosar Daună (PDF)
              </Link>
              <span>•</span>
              <Link href="/cumpar-casa" className="text-zinc-600 hover:text-blue-600 underline underline-offset-4">
                Protecție Achiziție Locuință
              </Link>
              <span>•</span>
              <Link href="/proprietari-inchirieri" className="text-zinc-600 hover:text-blue-600 underline underline-offset-4">
                Proprietari Închirieri
              </Link>
              <span>•</span>
              <Link href="/urgente" className="text-zinc-600 hover:text-blue-600 underline underline-offset-4">
                Centru Urgențe (112)
              </Link>
            </div>
            <Link href="/verifica-polita" className="text-blue-600 hover:text-blue-700 inline-flex items-center gap-1 font-semibold">
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
