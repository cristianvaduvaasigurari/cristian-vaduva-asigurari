import * as React from "react";
import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PortfolioRenewalPlanner } from "@/components/sections/portfolio-renewal-planner";
import { CalendarDays, ShieldCheck, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Calendar Asigurări & Planificator Reînnoiri | Cristian Văduva",
  description:
    "Organizează-ți portofoliul de asigurări 100% confidențial în browser. Monitorizează scadențele RCA, CASCO, Locuință, Sănătate și exportă alerte în calendarul tău personal (.ics).",
  keywords: [
    "calendar asigurari",
    "scadenta rca",
    "reinnoire casco",
    "organizare polite asigurare",
    "export calendar asigurari",
    "planificator reinnoiri",
  ],
  alternates: {
    canonical: "https://insurance.cristianvaduva.com/calendar-asigurari",
  },
  openGraph: {
    title: "Calendar Asigurări & Portofoliu Personal — Cristian Văduva",
    description:
      "Planificator privat de reînnoiri pentru asigurări. Salvare locală securizată, export iCalendar (.ics) și checklist complet de pregătire a reînnoirii.",
    url: "https://insurance.cristianvaduva.com/calendar-asigurari",
    type: "website",
  },
};

export default function CalendarAsigurariPage() {
  return (
    <div className="min-h-screen bg-[#0b0d10] text-zinc-100 flex flex-col selection:bg-blue-600 selection:text-white">
      <Navbar />

      <main className="flex-1 pt-36 pb-24 relative overflow-hidden">
        {/* Subtle Ambient Glow */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-600/10 rounded-full blur-[160px] pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-5xl">
          {/* Header Intro */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase tracking-widest mb-6">
              <CalendarDays className="w-3.5 h-3.5" />
              Private Insurance Portfolio & Renewal Planner
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-white tracking-tight leading-[1.1] mb-6">
              Calendarul tău de asigurări. <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-blue-400">
                100% confidențial, stocat local.
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-zinc-300 font-light leading-relaxed max-w-2xl mx-auto">
              Centralizează toate polițele familiei sau ale companiei într-un singur loc. Fără conturi obligatorii, fără transfer de date pe servere externe — cu posibilitate de export direct în Google Calendar / Apple Calendar.
            </p>
          </div>

          {/* Core Interactive Component */}
          <PortfolioRenewalPlanner />

          {/* Internal Cross Links */}
          <div className="mt-16 pt-12 border-t border-zinc-800/80 flex flex-wrap items-center justify-between gap-4 text-xs text-zinc-500">
            <div className="space-x-4">
              <span>Instrumente conexe:</span>
              <Link href="/verifica-polita" className="text-zinc-400 hover:text-white underline underline-offset-4">
                Audit Poliță Existentă
              </Link>
              <span>•</span>
              <Link href="/calculator-asigurare" className="text-zinc-400 hover:text-white underline underline-offset-4">
                Calculator Asigurare
              </Link>
              <span>•</span>
              <Link href="/generator-dosar-dauna" className="text-zinc-400 hover:text-white underline underline-offset-4">
                Generator Dosar Daună
              </Link>
              <span>•</span>
              <Link href="/urgente" className="text-zinc-400 hover:text-white underline underline-offset-4">
                Centru Urgențe (112)
              </Link>
            </div>
            <Link href="/verifica-polita" className="text-blue-400 hover:text-blue-300 inline-flex items-center gap-1">
              <span>Solicită audit înainte de reînnoire</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
