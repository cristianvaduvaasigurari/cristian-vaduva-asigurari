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
    <div className="min-h-screen bg-white text-zinc-900 flex flex-col selection:bg-blue-600 selection:text-white">
      <Navbar />

      <main className="flex-1 pt-36 pb-24 relative overflow-hidden bg-gradient-to-b from-zinc-50 via-white to-white">
        

        <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-5xl">
          {/* Header Intro */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 shadow-xs text-xs font-semibold uppercase tracking-widest mb-6">
              <ShieldAlert className="w-3.5 h-3.5" />
              Personal & Business Risk Profile
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-zinc-900 tracking-tight leading-[1.1] mb-6">
              Care este profilul tău de risc? <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700">
                Inventar transparent al expunerilor.
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-zinc-600 font-normal leading-relaxed max-w-2xl mx-auto">
              Descoperă unde ai o protecție adecvată și unde există vulnerabilități neacoperite (locuință, familie, vehicule, business sau bunuri de valoare). 100% privat în browser.
            </p>
          </div>

          {/* Core Risk Profile Engine */}
          <RiskProfileEngine />

          {/* Internal Cross Links */}
          <div className="mt-16 pt-12 border-t border-zinc-200 flex flex-wrap items-center justify-between gap-4 text-xs text-zinc-500">
            <div className="space-x-4">
              <span>Instrumente conexe:</span>
              <Link href="/verifica-polita" className="text-zinc-600 hover:text-blue-600 underline underline-offset-4">
                Audit Poliță Existentă
              </Link>
              <span>•</span>
              <Link href="/compara-polite" className="text-zinc-600 hover:text-blue-600 underline underline-offset-4">
                Comparație Oferte (Side-by-Side)
              </Link>
              <span>•</span>
              <Link href="/calendar-asigurari" className="text-zinc-600 hover:text-blue-600 underline underline-offset-4">
                Calendar Reînnoiri
              </Link>
              <span>•</span>
              <Link href="/calculator-asigurare" className="text-zinc-600 hover:text-blue-600 underline underline-offset-4">
                Calculator Asigurare
              </Link>
              <span>•</span>
              <Link href="/urgente" className="text-zinc-600 hover:text-blue-600 underline underline-offset-4">
                Centru Urgențe (112)
              </Link>
            </div>
            <Link href="/verifica-polita" className="text-blue-600 hover:text-blue-700 inline-flex items-center gap-1 font-semibold">
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
