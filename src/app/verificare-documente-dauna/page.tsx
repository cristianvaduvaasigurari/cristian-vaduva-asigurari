import * as React from "react";
import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ClaimEvidenceChecklist } from "@/components/sections/claim-evidence-checklist";
import { FileCheck, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Verificare Documente & Dovezi Daună | Cristian Văduva",
  description:
    "Borderou interactiv pentru verificarea completitudinii documentelor de daună: CASCO, RCA, Locuință, Sănătate sau Răspundere. Identifică actele lipsă și descarcă raportul PDF.",
  keywords: [
    "verificare documente dauna",
    "checklist dosar dauna",
    "documente necesare casco",
    "documente necesare dauna rca",
    "acte despagubire locuinta",
    "completitudine dosar daune",
    "borderou documente asigurare",
    "cristian vaduva advisory",
  ],
  alternates: {
    canonical: "https://insurance.cristianvaduva.com/verificare-documente-dauna",
  },
  openGraph: {
    title: "Verificare Documente & Dovezi Daună — Cristian Văduva",
    description:
      "Instrument client-side pentru verificarea documentelor și a dovezilor probatorii într-un dosar de daună. Structurează actele înainte de transmiterea către asigurător.",
    url: "https://insurance.cristianvaduva.com/verificare-documente-dauna",
    type: "website",
  },
};

export default function VerificareDocumenteDaunaPage() {
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
              <FileCheck className="w-3.5 h-3.5" />
              Claim Evidence & Document Checklist
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-white tracking-tight leading-[1.1] mb-6">
              Dosar Complet de Daună. <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-blue-400">
                Verifică actele înainte de depunere.
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-zinc-300 font-light leading-relaxed max-w-2xl mx-auto">
              Asigură-te că dosarul tău conține toate dovezile esențiale: formulare, devize, fotografii, procese verbale și rapoarte tehnice. Evită întârzierile cauzate de acte lipsă.
            </p>
          </div>

          {/* Core Interactive Component */}
          <ClaimEvidenceChecklist />

          {/* Internal Cross Links */}
          <div className="mt-16 pt-12 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <span className="text-zinc-400 font-medium">Instrumente daune conexe:</span>
              <Link
                href="/generator-dosar-dauna"
                className="text-zinc-400 hover:text-white underline underline-offset-4"
              >
                Generator Notificare Daună
              </Link>
              <span>•</span>
              <Link
                href="/urmarire-dauna"
                className="text-zinc-400 hover:text-white underline underline-offset-4"
              >
                Tracker Cronologic Daună
              </Link>
              <span>•</span>
              <Link
                href="/analiza-despagubire"
                className="text-zinc-400 hover:text-white underline underline-offset-4"
              >
                Analiză Ofertă Despăgubire
              </Link>
              <span>•</span>
              <Link
                href="/registru-documentare"
                className="text-zinc-400 hover:text-white underline underline-offset-4"
              >
                Registru Documentare
              </Link>
              <span>•</span>
              <Link
                href="/urgente"
                className="text-zinc-400 hover:text-white underline underline-offset-4"
              >
                Centru Urgențe
              </Link>
            </div>
            <Link
              href="/verifica-polita"
              className="text-blue-400 hover:text-blue-300 inline-flex items-center gap-1 font-medium"
            >
              <span>Consultanță Daune Complexe</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
