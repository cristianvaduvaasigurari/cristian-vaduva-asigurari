import * as React from "react";
import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ClientReviewPlanner } from "@/components/sections/client-review-planner";
import { CalendarCheck, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Planificator Ședință Revizuire Asigurări | Cristian Văduva",
  description:
    "Pregătește o ședință structurată de audit și revizuire a polițelor de asigurare. Consemnează schimbările recente de patrimoniu, agenda de întrebări, registrul deciziilor și generează raport PDF.",
  keywords: [
    "planificator revizuire asigurari",
    "sedinta audit polite",
    "agenda intalnire broker",
    "review anual asigurari",
    "evaluare schimbari patrimoniu",
    "registru decizii asigurare",
  ],
  alternates: {
    canonical: "https://insurance.cristianvaduva.com/planificare-revizuire",
  },
  openGraph: {
    title: "Planificator Ședință Revizuire Asigurări — Cristian Văduva",
    description:
      "Organizează ședința anuală de revizuire a portofoliului: schimbări în patrimoniu, întrebări cheie, registru de decizii și acțiuni convenite. 100% confidențial în memoria browserului.",
    url: "https://insurance.cristianvaduva.com/planificare-revizuire",
    type: "website",
  },
};

export default function PlanificareRevizuirePage() {
  return (
    <div className="min-h-screen bg-white text-zinc-900 flex flex-col selection:bg-blue-600 selection:text-white">
      <Navbar />

      <main className="flex-1 pt-36 pb-24 relative overflow-hidden bg-gradient-to-b from-zinc-50 via-white to-white">
        

        <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-5xl">
          {/* Header Intro */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 shadow-xs text-xs font-semibold uppercase tracking-widest mb-6">
              <CalendarCheck className="w-3.5 h-3.5" />
              Insurance Client Review Planner
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-zinc-900 tracking-tight leading-[1.1] mb-6">
              Pregătește ședința de revizuire. <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700">
                Agenda, decizii și următorii pași.
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-zinc-600 font-normal leading-relaxed max-w-2xl mx-auto">
              Structurează discuția cu brokerul tău: notează schimbările de patrimoniu, pregătește întrebările esențiale și ține evidența deciziilor convenite. 100% privat în sesiunea curentă.
            </p>
          </div>

          {/* Core Interactive Component */}
          <ClientReviewPlanner />

          {/* Internal Cross Links */}
          <div className="mt-16 pt-12 border-t border-zinc-200 flex flex-wrap items-center justify-between gap-4 text-xs text-zinc-500">
            <div className="space-x-4">
              <span>Instrumente conexe:</span>
              <Link href="/profil-risc" className="text-zinc-600 hover:text-blue-600 underline underline-offset-4">
                Profil de Risc
              </Link>
              <span>•</span>
              <Link href="/compara-polite" className="text-zinc-600 hover:text-blue-600 underline underline-offset-4">
                Comparație Oferte
              </Link>
              <span>•</span>
              <Link href="/calendar-asigurari" className="text-zinc-600 hover:text-blue-600 underline underline-offset-4">
                Calendar Reînnoiri
              </Link>
              <span>•</span>
              <Link href="/dosar-asigurare" className="text-zinc-600 hover:text-blue-600 underline underline-offset-4">
                Dosar Documente
              </Link>
              <span>•</span>
              <Link href="/private-client" className="text-zinc-600 hover:text-blue-600 underline underline-offset-4">
                Private Client
              </Link>
            </div>
            <Link href="/verifica-polita" className="text-blue-600 hover:text-blue-700 inline-flex items-center gap-1 font-semibold">
              <span>Programează o ședință de audit</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
