import React from "react";
import type { Metadata } from "next";
import { StrategyReport } from "@/components/sections/strategy-report";

export const metadata: Metadata = {
  title: "Raport Strategic | Cristian Văduva",
  description: "Executive summary și arhitectura de protecție pentru portofoliul tău.",
};

export default function RaportStrategicPage() {
  return (
    <main className="min-h-screen bg-slate-100 pt-32 pb-24 print:bg-white print:pt-0 print:pb-0">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-12 print:hidden">
          <h1 className="text-4xl font-heading font-bold mb-4 text-slate-900 tracking-tight">
            Raportul Tău Strategic
          </h1>
          <p className="text-lg text-slate-500">
            Acesta este documentul final generat în urma analizelor tale. Folosește butonul de print pentru a-l salva ca PDF sau a-l discuta în întâlnirea cu consultantul tău.
          </p>
        </div>

        <StrategyReport />
      </div>
    </main>
  );
}
