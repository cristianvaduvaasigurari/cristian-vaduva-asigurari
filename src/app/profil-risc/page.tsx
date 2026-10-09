import * as React from "react";
import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { RiskProfileEngine } from "@/components/sections/risk-profile-engine";
import { ShieldAlert, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Profil de Risc & Evaluare Protecție | Cristian Văduva Asigurări",
  description:
    "Evaluează expunerile tale de patrimoniu, sănătate, familie, afacere și active de lux. Chestionar ghidat, estimator deficit de protecție (worksheet) și raport PDF descărcabil.",
  keywords: [
    "profil de risc asigurari",
    "evaluare deficit protectie",
    "protection gap calculator",
    "analiza riscuri patrimoniu",
    "audit asigurari familie",
    "audit asigurari business",
  ],
  alternates: {
    canonical: "https://insurance.cristianvaduva.com/profil-risc",
  },
  openGraph: {
    title: "Profil de Risc & Evaluare Protecție — Cristian Văduva",
    description:
      "Chestionar educațional și inventar de risc pentru persoane fizice, proprietari și companii. Identifică lacunele de protecție și descarcă raportul PDF privat.",
    url: "https://insurance.cristianvaduva.com/profil-risc",
    type: "website",
  },
};

export default function ProfilRiscPage() {
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
              <ShieldAlert className="w-3.5 h-3.5" />
              Personal & Business Risk Profile
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-white tracking-tight leading-[1.1] mb-6">
              Care este profilul tău de risc? <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-blue-400">
                Inventar transparent al expunerilor.
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-zinc-300 font-light leading-relaxed max-w-2xl mx-auto">
              Descoperă unde ai o protecție adecvată și unde există vulnerabilități neacoperite (locuință, familie, vehicule, business sau bunuri de valoare). 100% privat în browser.
            </p>
          </div>

          {/* Core Risk Profile Engine */}
          <RiskProfileEngine />

          {/* Internal Cross Links */}
          <div className="mt-16 pt-12 border-t border-zinc-800/80 flex flex-wrap items-center justify-between gap-4 text-xs text-zinc-500">
            <div className="space-x-4">
              <span>Instrumente conexe:</span>
              <Link href="/verifica-polita" className="text-zinc-400 hover:text-white underline underline-offset-4">
                Audit Poliță Existentă
              </Link>
              <span>•</span>
              <Link href="/compara-polite" className="text-zinc-400 hover:text-white underline underline-offset-4">
                Comparație Oferte (Side-by-Side)
              </Link>
              <span>•</span>
              <Link href="/calendar-asigurari" className="text-zinc-400 hover:text-white underline underline-offset-4">
                Calendar Reînnoiri
              </Link>
              <span>•</span>
              <Link href="/calculator-asigurare" className="text-zinc-400 hover:text-white underline underline-offset-4">
                Calculator Asigurare
              </Link>
              <span>•</span>
              <Link href="/urgente" className="text-zinc-400 hover:text-white underline underline-offset-4">
                Centru Urgențe (112)
              </Link>
            </div>
            <Link href="/verifica-polita" className="text-blue-400 hover:text-blue-300 inline-flex items-center gap-1">
              <span>Solicită audit profesionist</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
