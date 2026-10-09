import * as React from "react";
import type { Metadata } from "next";
import { ImpactCalculators } from "@/components/sections/impact-calculators";

export const metadata: Metadata = {
  title: "Calculatoare Impact Financiar | Cristian Văduva",
  description: "Vizualizează pierderea potențială vs costul asigurării prin calculatoarele noastre interactive.",
};

export default function CalculatoarePage() {
  return (
    <main className="min-h-screen bg-[#fafafa] pt-32 pb-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 font-medium text-xs mb-6 uppercase tracking-widest border border-blue-100">
            Analiză Matematică
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-foreground tracking-tight">
            Impact Financiar
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Asigurările nu sunt o cheltuială, ci o unealtă matematică de transfer al riscului. Află exact ce înseamnă costul unei asigurări comparat cu o daună majoră neașteptată.
          </p>
        </div>

        <ImpactCalculators />

        {/* Extended Advisory & Calculations Ecosystem */}
        <div className="mt-24 pt-16 border-t border-zinc-200 max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-foreground tracking-tight mb-3">
              Catalog Complet de Instrumente & Calculatoare
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Toate instrumentele sunt proiectate pentru a funcționa 100% confidențial în browserul tău, oferind rapoarte PDF descărcabile și backup JSON.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Group 1: Audit & Analiză */}
            <div className="p-6 rounded-2xl bg-white border border-zinc-200/80 shadow-sm space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-blue-600">
                1. Audit & Analiză Polițe
              </div>
              <ul className="space-y-3 text-sm">
                <li>
                  <a href="/verifica-polita" className="font-semibold text-foreground hover:text-blue-600 flex items-center justify-between group">
                    <span>Audit Poliță Asigurare</span>
                    <span className="text-xs text-muted-foreground group-hover:text-blue-600">→</span>
                  </a>
                  <p className="text-xs text-muted-foreground mt-0.5">Analiză clauze, franșize și limite existente.</p>
                </li>
                <li>
                  <a href="/calculator-asigurare" className="font-semibold text-foreground hover:text-blue-600 flex items-center justify-between group">
                    <span>Calculator Asigurare & Reconstrucție</span>
                    <span className="text-xs text-muted-foreground group-hover:text-blue-600">→</span>
                  </a>
                  <p className="text-xs text-muted-foreground mt-0.5">Calcul estimativ cost reconstrucție și primă orientativă.</p>
                </li>
                <li>
                  <a href="/compara-polite" className="font-semibold text-foreground hover:text-blue-600 flex items-center justify-between group">
                    <span>Comparație Polițe & Oferte</span>
                    <span className="text-xs text-muted-foreground group-hover:text-blue-600">→</span>
                  </a>
                  <p className="text-xs text-muted-foreground mt-0.5">Compară clauzele a 2 sau mai multe oferte concurente.</p>
                </li>
                <li>
                  <a href="/profil-risc" className="font-semibold text-foreground hover:text-blue-600 flex items-center justify-between group">
                    <span>Profil de Risc & Audit Nevoi</span>
                    <span className="text-xs text-muted-foreground group-hover:text-blue-600">→</span>
                  </a>
                  <p className="text-xs text-muted-foreground mt-0.5">Identifică vulnerabilitățile financiare și prioritățile de acoperire.</p>
                </li>
                <li>
                  <a href="/gap-analyzer" className="font-semibold text-foreground hover:text-blue-600 flex items-center justify-between group">
                    <span>Coverage Gap Analyzer</span>
                    <span className="text-xs text-muted-foreground group-hover:text-blue-600">→</span>
                  </a>
                  <p className="text-xs text-muted-foreground mt-0.5">Detectează golurile neacoperite din polițele actuale.</p>
                </li>
              </ul>
            </div>

            {/* Group 2: Reînnoiri & Portofoliu */}
            <div className="p-6 rounded-2xl bg-white border border-zinc-200/80 shadow-sm space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                2. Portofoliu & Reînnoiri
              </div>
              <ul className="space-y-3 text-sm">
                <li>
                  <a href="/harta-asigurarilor" className="font-semibold text-foreground hover:text-indigo-600 flex items-center justify-between group">
                    <span>Harta Portofoliu Asigurări</span>
                    <span className="text-xs text-muted-foreground group-hover:text-indigo-600">→</span>
                  </a>
                  <p className="text-xs text-muted-foreground mt-0.5">Inventar complet al tuturor polițelor deținute.</p>
                </li>
                <li>
                  <a href="/calendar-asigurari" className="font-semibold text-foreground hover:text-indigo-600 flex items-center justify-between group">
                    <span>Calendar Expirări & Reînnoiri</span>
                    <span className="text-xs text-muted-foreground group-hover:text-indigo-600">→</span>
                  </a>
                  <p className="text-xs text-muted-foreground mt-0.5">Grafic calendaristic al scadențelor din portofoliu.</p>
                </li>
                <li>
                  <a href="/decizie-reinnoire" className="font-semibold text-foreground hover:text-indigo-600 flex items-center justify-between group">
                    <span>Fișă Decizie Reînnoire</span>
                    <span className="text-xs text-muted-foreground group-hover:text-indigo-600">→</span>
                  </a>
                  <p className="text-xs text-muted-foreground mt-0.5">Structurează argumentele înainte de a reînnoi sau schimba.</p>
                </li>
                <li>
                  <a href="/analiza-reinnoire" className="font-semibold text-foreground hover:text-indigo-600 flex items-center justify-between group">
                    <span>Analiză Oferte Reînnoire</span>
                    <span className="text-xs text-muted-foreground group-hover:text-indigo-600">→</span>
                  </a>
                  <p className="text-xs text-muted-foreground mt-0.5">Comparație detaliată poliță veche vs ofertă nouă.</p>
                </li>
                <li>
                  <a href="/termene-polite" className="font-semibold text-foreground hover:text-indigo-600 flex items-center justify-between group">
                    <span>Cronologie & Termene Polițe</span>
                    <span className="text-xs text-muted-foreground group-hover:text-indigo-600">→</span>
                  </a>
                  <p className="text-xs text-muted-foreground mt-0.5">Registru scadențe, preavize și confirmări scrise.</p>
                </li>
                <li>
                  <a href="/modificari-polite" className="font-semibold text-foreground hover:text-indigo-600 flex items-center justify-between group">
                    <span>Urmărire Modificări & Addendum</span>
                    <span className="text-xs text-muted-foreground group-hover:text-indigo-600">→</span>
                  </a>
                  <p className="text-xs text-muted-foreground mt-0.5">Monitorizează cererile de modificare a contractelor.</p>
                </li>
              </ul>
            </div>

            {/* Group 3: Daune & Pregătire */}
            <div className="p-6 rounded-2xl bg-white border border-zinc-200/80 shadow-sm space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                3. Daune & Pregătire Dosare
              </div>
              <ul className="space-y-3 text-sm">
                <li>
                  <a href="/verificare-documente-dauna" className="font-semibold text-foreground hover:text-emerald-600 flex items-center justify-between group">
                    <span>Verificare Documente Daună</span>
                    <span className="text-xs text-muted-foreground group-hover:text-emerald-600">→</span>
                  </a>
                  <p className="text-xs text-muted-foreground mt-0.5">Borderou completitudine acte înainte de depunerea dosarului.</p>
                </li>
                <li>
                  <a href="/generator-dosar-dauna" className="font-semibold text-foreground hover:text-emerald-600 flex items-center justify-between group">
                    <span>Generator Notificare Daună</span>
                    <span className="text-xs text-muted-foreground group-hover:text-emerald-600">→</span>
                  </a>
                  <p className="text-xs text-muted-foreground mt-0.5">Redactare avizare formală conform procedurilor legale.</p>
                </li>
                <li>
                  <a href="/urmarire-dauna" className="font-semibold text-foreground hover:text-emerald-600 flex items-center justify-between group">
                    <span>Urmărire Progres Daună</span>
                    <span className="text-xs text-muted-foreground group-hover:text-emerald-600">→</span>
                  </a>
                  <p className="text-xs text-muted-foreground mt-0.5">Jurnal cronologic al etapelor de lichidare a dosarului.</p>
                </li>
                <li>
                  <a href="/analiza-despagubire" className="font-semibold text-foreground hover:text-emerald-600 flex items-center justify-between group">
                    <span>Analiză Ofertă Despăgubire</span>
                    <span className="text-xs text-muted-foreground group-hover:text-emerald-600">→</span>
                  </a>
                  <p className="text-xs text-muted-foreground mt-0.5">Reconciliere sume propuse vs deviz și rețineri de fransiză.</p>
                </li>
                <li>
                  <a href="/dosar-asigurare" className="font-semibold text-foreground hover:text-emerald-600 flex items-center justify-between group">
                    <span>Dosar Pregătire Asigurare</span>
                    <span className="text-xs text-muted-foreground group-hover:text-emerald-600">→</span>
                  </a>
                  <p className="text-xs text-muted-foreground mt-0.5">Checklist documente preliminare pentru ofertare optimă.</p>
                </li>
                <li>
                  <a href="/planificare-revizuire" className="font-semibold text-foreground hover:text-emerald-600 flex items-center justify-between group">
                    <span>Planificare Revizuire cu Brokerul</span>
                    <span className="text-xs text-muted-foreground group-hover:text-emerald-600">→</span>
                  </a>
                  <p className="text-xs text-muted-foreground mt-0.5">Agendă de întrebări și decizii pentru întâlnirea de consultanță.</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
