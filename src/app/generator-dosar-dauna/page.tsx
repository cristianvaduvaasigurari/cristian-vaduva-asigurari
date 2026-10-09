import * as React from "react";
import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ClaimFileGenerator } from "@/components/sections/claim-file-generator";
import { FileText, ShieldCheck, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Generator Dosar de Daună | Checklist Descărcabil PDF — Cristian Văduva",
  description:
    "Generează instant un checklist PDF personalizat pentru dosarul tău de daună (Accident Auto, Inundație, Furt). Etape de urgență, acte necesare și spațiu pentru notițe.",
  keywords: [
    "generator dosar dauna",
    "checklist accident auto pdf",
    "acte dosar dauna inundatie",
    "descarca checklist daune",
    "procedura despagubire asigurari",
  ],
  alternates: {
    canonical: "https://insurance.cristianvaduva.com/generator-dosar-dauna",
  },
  openGraph: {
    title: "Generator Dosar de Daună | Checklist Descărcabil PDF — Cristian Văduva",
    description:
      "Ghid pas-cu-pas și checklist descărcabil în format PDF pentru gestionarea corectă a daunelor auto, locuință și furt.",
    url: "https://insurance.cristianvaduva.com/generator-dosar-dauna",
    type: "website",
  },
};

export default function GeneratorDosarDaunaPage() {
  return (
    <div className="min-h-screen bg-white text-zinc-900 flex flex-col selection:bg-blue-600 selection:text-white">
      <Navbar />

      <main className="flex-1 pt-36 pb-24 relative overflow-hidden bg-gradient-to-b from-zinc-50 via-white to-white">
        {/* Subtle Ambient Glow */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-rose-600/10 rounded-full blur-[160px] pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-5xl">
          {/* Header Intro */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 shadow-xs text-xs font-semibold uppercase tracking-widest mb-6">
              <FileText className="w-3.5 h-3.5" />
              Claim File Engine & PDF Generator
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-zinc-900 tracking-tight leading-[1.1] mb-6">
              Generator Dosar de Daună <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-rose-400">
                Checklist operațional & PDF descărcabil.
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-zinc-600 font-normal leading-relaxed max-w-2xl mx-auto">
              Selectează incidentul pentru a previzualiza și descărca ghidul structurat de acțiune și lista documentelor necesare pentru deschiderea dosarului de despăgubire.
            </p>
          </div>

          {/* Interactive Claim Generator Component */}
          <ClaimFileGenerator />

          {/* Internal Cross Links */}
          <div className="mt-16 pt-12 border-t border-zinc-200 flex flex-wrap items-center justify-between gap-4 text-xs text-zinc-500">
            <div className="space-x-4">
              <span>Instrumente și ghiduri conexe:</span>
              <Link href="/urgente" className="text-zinc-600 hover:text-blue-600 underline underline-offset-4">
                Centru de Urgențe (112)
              </Link>
              <span>•</span>
              <Link href="/calculator-asigurare" className="text-zinc-600 hover:text-blue-600 underline underline-offset-4">
                Calculator Asigurare
              </Link>
              <span>•</span>
              <Link href="/verifica-polita" className="text-zinc-600 hover:text-blue-600 underline underline-offset-4">
                Verifică o Poliță Existentă
              </Link>
            </div>
            <Link href="/stiri/digitalizare-constatare-amiabila-baar-amiabila-romania" className="text-blue-600 hover:text-blue-700 inline-flex items-center gap-1 font-semibold">
              <span>Ghid: Constatarea Amiabilă Digitală</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
