import * as React from "react";
import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { InsuranceEvidenceRegister } from "@/components/sections/insurance-evidence-register";
import { FileCheck, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Registru Documentare & Surse Asigurare | Cristian Văduva",
  description:
    "Organizează sursele documentare, extrasele de clauze, ofertele și clarificările scrise primite de la asiguratori. Identifică neconcordanțele și pregătește argumentele pentru revizuire.",
  keywords: [
    "registru documentare asigurare",
    "dovezi acoperire polita",
    "clarificari scrise asigurator",
    "conditii generale casco rca",
    "urmarire raspunsuri broker",
    "audit clauze asigurari",
    "cristian vaduva advisory",
  ],
  alternates: {
    canonical: "https://insurance.cristianvaduva.com/registru-documentare",
  },
  openGraph: {
    title: "Registru Documentare & Surse Asigurare — Cristian Văduva",
    description:
      "Instrument client-side pentru evidența surselor scrise, a paragrafelor de contract și a clarificărilor primite de la asiguratori. Descarcă raportul PDF structurat.",
    url: "https://insurance.cristianvaduva.com/registru-documentare",
    type: "website",
  },
};

export default function RegistruDocumentarePage() {
  return (
    <div className="min-h-screen bg-white text-zinc-900 flex flex-col selection:bg-blue-600 selection:text-white">
      <Navbar />

      <main className="flex-1 pt-36 pb-24 relative overflow-hidden bg-gradient-to-b from-zinc-50 via-white to-white">
        

        <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-6xl">
          {/* Header Intro */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 shadow-xs text-xs font-semibold uppercase tracking-widest mb-6">
              <FileCheck className="w-3.5 h-3.5" />
              Coverage Evidence & Source Register
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-zinc-900 tracking-tight leading-[1.1] mb-6">
              Unde scrie exact? <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700">
                Registrul surselor și clauzelor.
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-zinc-600 font-normal leading-relaxed max-w-2xl mx-auto">
              Asociază fiecare afirmație despre acoperirea ta cu documentul oficial, emailul sau oferta scrisă care o confirmă. Identifică rapid promisiunile verbale neverificate.
            </p>
          </div>

          {/* Core Interactive Component */}
          <InsuranceEvidenceRegister />

          {/* Internal Cross Links */}
          <div className="mt-16 pt-12 border-t border-zinc-200 flex flex-wrap items-center justify-between gap-4 text-xs text-zinc-500">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <span className="text-zinc-400 font-medium">Instrumente conexe:</span>
              <Link href="/harta-asigurarilor" className="text-zinc-600 hover:text-blue-600 underline underline-offset-4">
                Harta Asigurărilor
              </Link>
              <span>•</span>
              <Link href="/compara-polite" className="text-zinc-600 hover:text-blue-600 underline underline-offset-4">
                Comparație Polițe
              </Link>
              <span>•</span>
              <Link href="/analiza-reinnoire" className="text-zinc-600 hover:text-blue-600 underline underline-offset-4">
                Analiză Reînnoire
              </Link>
              <span>•</span>
              <Link href="/planificare-revizuire" className="text-zinc-600 hover:text-blue-600 underline underline-offset-4">
                Planificare Revizuire
              </Link>
              <span>•</span>
              <Link href="/dosar-asigurare" className="text-zinc-600 hover:text-blue-600 underline underline-offset-4">
                Dosar Documente
              </Link>
            </div>
            <Link href="/verifica-polita" className="text-blue-600 hover:text-blue-700 inline-flex items-center gap-1 font-semibold font-medium">
              <span>Auditează documentele gratuit</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
