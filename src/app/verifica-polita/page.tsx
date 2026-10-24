import * as React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { PolicyReviewJourney } from "@/components/sections/policy-review-journey";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ShieldCheck, FileSearch, Lock, CheckCircle2, AlertTriangle, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

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
    <div className="min-h-screen bg-white text-zinc-900 flex flex-col selection:bg-blue-600 selection:text-white">
      <Navbar />

      <main className="flex-1 pt-36 pb-24 relative overflow-hidden bg-gradient-to-b from-zinc-50 via-white to-white">
        <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-5xl">
          {/* HEADER INTRO */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold uppercase tracking-widest mb-6 shadow-sm">
              <FileSearch className="w-3.5 h-3.5 text-amber-700" />
              Înțelege ce ai de pierdut înainte să afli cât te costă
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-zinc-900 tracking-tight leading-[1.1] mb-6">
              Nu știu dacă sunt protejat. <br className="hidden sm:block" />
              <span className="text-zinc-600 font-normal text-3xl sm:text-4xl lg:text-5xl">Verifică dacă există lacune.</span>
            </h1>

            <p className="text-lg sm:text-xl text-zinc-600 font-normal leading-relaxed max-w-2xl mx-auto">
              Majoritatea asiguraților află despre excluderile și franșizele din contract abia în momentul producerii daunei. Transmite-ne documentele sau datele esențiale pentru a primi o verificare independentă a riscurilor reale.
            </p>
          </div>

          {/* EDITORIAL RISK WARNING BANNER */}
          <section className="mb-14 bg-zinc-950 text-white rounded-3xl p-6 sm:p-8 border border-zinc-800 shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-5 relative aspect-[16/11] rounded-2xl overflow-hidden border border-zinc-800 shadow-md">
                <Image
                  src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80"
                  alt="Dosare de audit contractual și litigii pentru daune financiare neacoperite din clauze restrictive"
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-md bg-zinc-950/85 backdrop-blur-xs text-white text-[11px] font-semibold tracking-wide border border-zinc-800">
                    Audit Independent
                  </span>
                </div>
              </div>

              <div className="md:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-950/80 text-red-400 text-xs font-semibold uppercase tracking-wider border border-red-800/80">
                  <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
                  Consecința lipsei unui audit
                </div>

                <h3 className="text-xl sm:text-2xl font-heading font-bold text-white tracking-tight leading-snug">
                  Cele mai costisitoare pierderi apar când ești convins că ești protejat
                </h3>

                <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed">
                  O clauză de subasigurare la o vilă, franșiza forfetară la un automobil de lux sau o excludere de inginerie socială la o poliță cyber pot transforma o daună de sute de mii de euro într-o pierdere suportată exclusiv din buzunarul tău.
                </p>

                <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold pt-1">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Audit preliminar confidențial — fără costuri și fără obligații comerciale.</span>
                </div>
              </div>
            </div>
          </section>

          {/* INTERACTIVE FORM COMPONENT */}
          <PolicyReviewJourney />

          {/* METHODOLOGY & TRUST CARDS */}
          <div className="mt-20 pt-16 border-t border-zinc-200 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-zinc-200/80 shadow-sm space-y-3">
              <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-blue-600 w-fit">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-zinc-900 text-lg">Independență Totală</h3>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                Nu suntem constrânși de o singură companie de asigurări. Analizăm termenii contractului tău raportat la toate alternativele disponibile pe piață.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-zinc-200/80 shadow-sm space-y-3">
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600 w-fit">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-zinc-900 text-lg">Confidențialitate Strictă</h3>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                Documentele și datele tale nu sunt stocate în baze de date publice și nu sunt transmise terților fără acordul tău explicit.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-zinc-200/80 shadow-sm space-y-3">
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 w-fit">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-zinc-900 text-lg">Fără Costuri Ascunse</h3>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                Evaluarea preliminară a contractului și identificarea riscurilor critice sunt asigurate gratuit în cadrul etapei de consultanță inițială.
              </p>
            </div>
          </div>

          {/* COMPATIBILITY LINKS (SAFE & ADDITIVE) */}
          <div className="mt-12 text-center text-xs text-zinc-500 space-x-4">
            <span>Alte instrumente utile:</span>
            <Link href="/gap-analyzer" className="text-zinc-600 hover:text-blue-600 underline underline-offset-4">
              Coverage Gap Analyzer
            </Link>
            <span>•</span>
            <Link href="/oferta-rapida" className="text-zinc-600 hover:text-blue-600 underline underline-offset-4">
              Ofertă Rapidă
            </Link>
            <span>•</span>
            <Link href="/urgente" className="text-zinc-600 hover:text-blue-600 underline underline-offset-4">
              Centru Urgențe
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
