import * as React from "react";
import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { RenewalDecisionBrief } from "@/components/sections/renewal-decision-brief";
import { FileCheck2, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Fișă Decizie Reînnoire Asigurare | Cristian Văduva",
  description:
    "Organizează toate informațiile necesare înainte de a lua o decizie privind reînnoirea poliței tale de asigurare. Compară opțiunile, stabilește agenda de discuție și descarcă raportul PDF.",
  keywords: [
    "decizie reinnoire asigurare",
    "fisa decizie polita",
    "comparare optiuni reinnoire",
    "agenda discutie broker",
    "reinnoire casco rca locuinta",
    "plan actiune asigurari",
    "cristian vaduva advisory",
  ],
  alternates: {
    canonical: "https://insurance.cristianvaduva.com/decizie-reinnoire",
  },
  openGraph: {
    title: "Fișă Decizie Reînnoire Asigurare — Cristian Văduva",
    description:
      "Instrument client-side pentru fundamentarea deciziei de reînnoire. Documentează modificările de risc, compară ofertele, pregătește întrebările și exportă raportul PDF.",
    url: "https://insurance.cristianvaduva.com/decizie-reinnoire",
    type: "website",
  },
};

export default function DecizieReinnoirePage() {
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
              <FileCheck2 className="w-3.5 h-3.5" />
              Insurance Renewal Decision Brief
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-white tracking-tight leading-[1.1] mb-6">
              Reînnoiești sau schimbi? <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-blue-400">
                Fundamentează decizia ta.
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-zinc-300 font-light leading-relaxed max-w-2xl mx-auto">
              Structurează într-un singur loc tot ce știi despre contractul vechi, ce schimbări au avut loc, ce conține noua ofertă și ce întrebări trebuie să adresezi înainte de a semna.
            </p>
          </div>

          {/* Core Interactive Component */}
          <RenewalDecisionBrief />

          {/* Internal Cross Links */}
          <div className="mt-16 pt-12 border-t border-zinc-800/80 flex flex-wrap items-center justify-between gap-4 text-xs text-zinc-500">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <span className="text-zinc-400 font-medium">Instrumente conexe:</span>
              <Link href="/analiza-reinnoire" className="text-zinc-400 hover:text-white underline underline-offset-4">
                Analiză Reînnoire
              </Link>
              <span>•</span>
              <Link href="/planificare-revizuire" className="text-zinc-400 hover:text-white underline underline-offset-4">
                Planificare Revizuire
              </Link>
              <span>•</span>
              <Link href="/compara-polite" className="text-zinc-400 hover:text-white underline underline-offset-4">
                Comparație Polițe
              </Link>
              <span>•</span>
              <Link href="/registru-documentare" className="text-zinc-400 hover:text-white underline underline-offset-4">
                Registru Documentare
              </Link>
              <span>•</span>
              <Link href="/modificari-polite" className="text-zinc-400 hover:text-white underline underline-offset-4">
                Urmărire Modificări
              </Link>
              <span>•</span>
              <Link href="/calendar-asigurari" className="text-zinc-400 hover:text-white underline underline-offset-4">
                Calendar Reînnoiri
              </Link>
            </div>
            <Link href="/verifica-polita" className="text-blue-400 hover:text-blue-300 inline-flex items-center gap-1 font-medium">
              <span>Auditează oferta gratuit</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
