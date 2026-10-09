import * as React from "react";
import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { RenewalOfferReview } from "@/components/sections/renewal-offer-review";
import { RotateCcw, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Analiză Ofertă Reînnoire Asigurare | Cristian Văduva",
  description:
    "Compară polița ta actuală cu oferta nouă de reînnoire. Identifică variațiile de primă, franșizele modificate, excluderile nou introduse și generează raport PDF comparativ.",
  keywords: [
    "analiza oferta reinnoire",
    "comparare reinnoire polita",
    "crestere pret asigurare",
    "verificare oferta casco",
    "reinnoire rca locuinta",
    "audit clauze reinnoire",
  ],
  alternates: {
    canonical: "https://insurance.cristianvaduva.com/analiza-reinnoire",
  },
  openGraph: {
    title: "Analiză Ofertă Reînnoire Asigurare — Cristian Văduva",
    description:
      "Instrument matematic și documentar pentru compararea ofertei de reînnoire cu polița curentă. Verifică franșizele, variația de primă și descarcă raportul PDF.",
    url: "https://insurance.cristianvaduva.com/analiza-reinnoire",
    type: "website",
  },
};

export default function AnalizaReinnoirePage() {
  return (
    <div className="min-h-screen bg-white text-zinc-900 flex flex-col selection:bg-blue-600 selection:text-white">
      <Navbar />

      <main className="flex-1 pt-36 pb-24 relative overflow-hidden bg-gradient-to-b from-zinc-50 via-white to-white">
        

        <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-5xl">
          {/* Header Intro */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 shadow-xs text-xs font-semibold uppercase tracking-widest mb-6">
              <RotateCcw className="w-3.5 h-3.5" />
              Insurance Renewal Readiness & Offer Review
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-zinc-900 tracking-tight leading-[1.1] mb-6">
              Merită oferta de reînnoire? <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700">
                Compară prețul și clauzele.
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-zinc-600 font-normal leading-relaxed max-w-2xl mx-auto">
              Analizează diferențele dintre contractul vechi și oferta primită de la asigurator. Verifică dacă majorarea de primă ascunde franșize mai mari sau clauze restrictive. 100% privat în browser.
            </p>
          </div>

          {/* Core Interactive Component */}
          <RenewalOfferReview />

          {/* Internal Cross Links */}
          <div className="mt-16 pt-12 border-t border-zinc-200 flex flex-wrap items-center justify-between gap-4 text-xs text-zinc-500">
            <div className="space-x-4">
              <span>Instrumente conexe:</span>
              <Link href="/compara-polite" className="text-zinc-600 hover:text-blue-600 underline underline-offset-4">
                Comparație Oferte
              </Link>
              <span>•</span>
              <Link href="/calendar-asigurari" className="text-zinc-600 hover:text-blue-600 underline underline-offset-4">
                Calendar Reînnoiri
              </Link>
              <span>•</span>
              <Link href="/planificare-revizuire" className="text-zinc-600 hover:text-blue-600 underline underline-offset-4">
                Planificare Ședință
              </Link>
              <span>•</span>
              <Link href="/dosar-asigurare" className="text-zinc-600 hover:text-blue-600 underline underline-offset-4">
                Dosar Documente
              </Link>
              <span>•</span>
              <Link href="/profil-risc" className="text-zinc-600 hover:text-blue-600 underline underline-offset-4">
                Profil de Risc
              </Link>
            </div>
            <Link href="/verifica-polita" className="text-blue-600 hover:text-blue-700 inline-flex items-center gap-1 font-semibold">
              <span>Auditează oferta gratuit</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
