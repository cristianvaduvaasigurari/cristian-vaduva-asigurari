import * as React from "react";
import type { Metadata } from "next";
import { PolicyReviewJourney } from "@/components/sections/policy-review-journey";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ShieldCheck, FileSearch, Lock, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Verifică Polița | Review My Policy — Cristian Văduva Asigurări",
  description:
    "Verifică polița ta de asigurare (Auto, Locuință, Sănătate, Business sau Private Client). Identifică franșize ascunse, riscuri neacoperite și clauze restrictive cu sprijinul unui consultant independent.",
  keywords: [
    "verificare polita asigurare",
    "review my policy",
    "audit polita casco",
    "analiza asigurare locuinta",
    "consultanta asigurari bucuresti",
    "second opinion asigurare",
  ],
  openGraph: {
    title: "Verifică Polița | Review My Policy — Cristian Văduva Asigurări",
    description:
      "Audit independent pentru polițele tale de asigurare. Identifică clauzele ambigue și obține o a doua opinie avizată.",
    url: "https://insurance.cristianvaduva.com/verifica-polita",
    type: "website",
  },
};

export default function VerificaPolitaPage() {
  return (
    <div className="min-h-screen bg-[#0b0d10] text-zinc-100 flex flex-col selection:bg-blue-600 selection:text-white">
      <Navbar />

      <main className="flex-1 pt-36 pb-24 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-600/10 rounded-full blur-[160px] pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-5xl">
          {/* HEADER INTRO */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-semibold uppercase tracking-widest mb-6">
              <FileSearch className="w-3.5 h-3.5 text-blue-400" />
              Second Opinion & Audit de Clauze
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-white tracking-tight leading-[1.1] mb-6">
              Verifică Polița de Asigurare
            </h1>

            <p className="text-lg sm:text-xl text-zinc-300 font-light leading-relaxed max-w-2xl mx-auto">
              Majoritatea asiguraților află despre excluderile din contract abia în momentul daunei. Transmite-ne ce dorești să verificăm pentru a primi o evaluare independentă și obiectivă.
            </p>
          </div>

          {/* INTERACTIVE FORM COMPONENT */}
          <PolicyReviewJourney />

          {/* METHODOLOGY & TRUST CARDS */}
          <div className="mt-20 pt-16 border-t border-zinc-800/80 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/70 space-y-3">
              <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 w-fit">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-white text-lg">Independență Totală</h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Nu suntem constrânși de o singură companie de asigurări. Analizăm termenii contractului tău raportat la toate alternativele disponibile pe piață.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/70 space-y-3">
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 w-fit">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-white text-lg">Confidențialitate Strictă</h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Documentele și datele tale nu sunt stocate în baze de date publice și nu sunt transmise terților fără acordul tău explicit.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/70 space-y-3">
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 w-fit">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-white text-lg">Fără Costuri Ascunse</h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Evaluarea preliminară a contractului și identificarea riscurilor critice sunt asigurate gratuit în cadrul etapei de consultanță inițială.
              </p>
            </div>
          </div>

          {/* COMPATIBILITY LINKS (SAFE & ADDITIVE) */}
          <div className="mt-12 text-center text-xs text-zinc-500 space-x-4">
            <span>Alte instrumente utile:</span>
            <Link href="/gap-analyzer" className="text-zinc-400 hover:text-white underline underline-offset-4">
              Coverage Gap Analyzer
            </Link>
            <span>•</span>
            <Link href="/oferta-rapida" className="text-zinc-400 hover:text-white underline underline-offset-4">
              Ofertă Rapidă
            </Link>
            <span>•</span>
            <Link href="/urgente" className="text-zinc-400 hover:text-white underline underline-offset-4">
              Centru Urgențe
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
