import * as React from "react";
import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { RentalProtectionJourney } from "@/components/sections/rental-protection-journey";
import { Building2, Key, ShieldCheck, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Închiriezi o proprietate? Analizează riscurile | Asigurare Proprietari — Cristian Văduva",
  description:
    "Ghid și soluții de asigurare pentru proprietari și investitori imobiliari: acoperirea clădirilor închiriate, bunurilor și răspunderii civile față de vecini.",
  keywords: [
    "asigurare apartament inchiriat",
    "asigurare proprietari chiriasi",
    "raspundere civila proprietar vecini",
    "asigurare airbnb booking romania",
    "protectie investitii imobiliare",
  ],
  alternates: {
    canonical: "https://insurance.cristianvaduva.com/proprietari-inchirieri",
  },
  openGraph: {
    title: "Închiriezi o proprietate? Analizează riscurile înainte să apară o daună — Cristian Văduva",
    description:
      "Protecția clădirii, a bunurilor și răspunderea civilă față de terți pentru proprietari și investitori în real estate.",
    url: "https://insurance.cristianvaduva.com/proprietari-inchirieri",
    type: "website",
  },
};

export default function ProprietariInchirieriPage() {
  return (
    <div className="min-h-screen bg-[#0b0d10] text-zinc-100 flex flex-col selection:bg-blue-600 selection:text-white">
      <Navbar />

      <main className="flex-1 pt-36 pb-24 relative overflow-hidden">
        {/* Ambient Subtle Glow */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-amber-600/10 rounded-full blur-[160px] pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-5xl">
          {/* Header Intro */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-widest mb-6">
              <Key className="w-3.5 h-3.5" />
              Landlord & Rental Property Protection
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-white tracking-tight leading-[1.1] mb-6">
              Închiriezi o proprietate? <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-amber-400">
                Analizează riscurile înainte să apară o daună.
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-zinc-300 font-light leading-relaxed max-w-2xl mx-auto">
              O analiză pentru proprietari care vor să înțeleagă protecția clădirii, bunurilor și răspunderea față de terți, în funcție de modul în care este folosită proprietatea.
            </p>
          </div>

          {/* Interactive Calculator and Lead Form */}
          <RentalProtectionJourney />

          {/* Internal Cross Links */}
          <div className="mt-16 pt-12 border-t border-zinc-800/80 flex flex-wrap items-center justify-between gap-4 text-xs text-zinc-500">
            <div className="space-x-4">
              <span>Alte soluții pentru patrimoniu:</span>
              <Link href="/cumpar-casa" className="text-zinc-400 hover:text-white underline underline-offset-4">
                Achiziție Locuință Nouă
              </Link>
              <span>•</span>
              <Link href="/servicii/home-insurance" className="text-zinc-400 hover:text-white underline underline-offset-4">
                Asigurare Locuință Facultativă
              </Link>
              <span>•</span>
              <Link href="/verifica-polita" className="text-zinc-400 hover:text-white underline underline-offset-4">
                Audit Poliță Existentă
              </Link>
            </div>
            <Link href="/stiri/asigurarea-obligatorie-pad-vs-facultativa-protectie-completa-locuinte" className="text-amber-400 hover:text-amber-300 inline-flex items-center gap-1">
              <span>Ghid: Clauze & Răspundere Civile Locuință</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
