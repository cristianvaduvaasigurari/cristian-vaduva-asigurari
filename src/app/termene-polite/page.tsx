import * as React from "react";
import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PolicyDeadlineTimeline } from "@/components/sections/policy-deadline-timeline";
import { CalendarDays, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cronologie & Termene Polițe de Asigurare | Cristian Văduva",
  description:
    "Organizează și monitorizează datele importante ale polițelor tale de asigurare: expirare, primire ofertă de reînnoire, termen de decizie, notificări de reziliere, rate de primă și follow-up-uri.",
  keywords: [
    "termene polite asigurare",
    "cronologie asigurare",
    "scadenta polita casco",
    "termen notificare reziliere",
    "oferta reinnoire asigurare",
    "registru termene contractuale",
    "urmarire polite asigurari",
    "cristian vaduva advisory",
  ],
  alternates: {
    canonical: "https://insurance.cristianvaduva.com/termene-polite",
  },
  openGraph: {
    title: "Cronologie & Termene Polițe de Asigurare — Cristian Văduva",
    description:
      "Instrument client-side pentru evidența termenelor și a acțiunilor legate de polițele de asigurare. Monitorizează scadențele, notificările și comunicările oficiale.",
    url: "https://insurance.cristianvaduva.com/termene-polite",
    type: "website",
  },
};

export default function TermenePolitePage() {
  return (
    <div className="min-h-screen bg-white text-zinc-900 flex flex-col selection:bg-blue-600 selection:text-white">
      <Navbar />

      <main className="flex-1 pt-36 pb-24 relative overflow-hidden bg-gradient-to-b from-zinc-50 via-white to-white">
        

        <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-6xl">
          {/* Header Intro */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 shadow-xs text-xs font-semibold uppercase tracking-widest mb-6">
              <CalendarDays className="w-3.5 h-3.5" />
              Insurance Policy Renewal & Cancellation Timeline
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-zinc-900 tracking-tight leading-[1.1] mb-6">
              Cronologie & Termene Polițe. <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700">
                Păstrează controlul scadențelor.
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-zinc-600 font-normal leading-relaxed max-w-2xl mx-auto">
              Evidență completă pentru datele de intrare în vigoare, expirare, primirea ofertelor de reînnoire, transmiterea notificărilor, ratele scadente și follow-up-urile necesare.
            </p>
          </div>

          {/* Core Interactive Component */}
          <PolicyDeadlineTimeline />

          {/* Internal Cross Links */}
          <div className="mt-16 pt-12 border-t border-zinc-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <span className="text-zinc-400 font-medium">Instrumente conexe:</span>
              <Link
                href="/calendar-asigurari"
                className="text-zinc-600 hover:text-blue-600 underline underline-offset-4"
              >
                Calendar Reînnoiri
              </Link>
              <span>•</span>
              <Link
                href="/decizie-reinnoire"
                className="text-zinc-600 hover:text-blue-600 underline underline-offset-4"
              >
                Decizie Reînnoire
              </Link>
              <span>•</span>
              <Link
                href="/analiza-reinnoire"
                className="text-zinc-600 hover:text-blue-600 underline underline-offset-4"
              >
                Analiză Reînnoire
              </Link>
              <span>•</span>
              <Link
                href="/planificare-revizuire"
                className="text-zinc-600 hover:text-blue-600 underline underline-offset-4"
              >
                Planificare Revizuire
              </Link>
              <span>•</span>
              <Link
                href="/modificari-polite"
                className="text-zinc-600 hover:text-blue-600 underline underline-offset-4"
              >
                Modificări Polițe
              </Link>
              <span>•</span>
              <Link
                href="/registru-documentare"
                className="text-zinc-600 hover:text-blue-600 underline underline-offset-4"
              >
                Registru Documentare
              </Link>
            </div>
            <Link
              href="/verifica-polita"
              className="text-blue-600 hover:text-blue-700 inline-flex items-center gap-1 font-semibold font-medium"
            >
              <span>Audit Poliță Asigurare</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
