"use client";

import * as React from "react";
import { useState } from "react";
import { 
  Truck, 
  Package, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Info,
  Scale,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { WhatsAppCta } from "@/components/ui/whatsapp-cta";
import { calculateCmrVsCargo } from "@/lib/risk-verification";

export function CmrCargoCalculator() {
  const [invoiceValueEur, setInvoiceValueEur] = useState<string>("80000"); // 80.000 EUR
  const [weightKg, setWeightKg] = useState<string>("600"); // 600 kg
  const [sdrRate, setSdrRate] = useState<string>("1.25"); // 1 SDR = 1.25 EUR reference

  const parsedValue = Math.max(0, parseFloat(invoiceValueEur) || 0);
  const parsedWeight = Math.max(0, parseFloat(weightKg) || 0);
  const parsedSdrRate = Math.max(0.1, parseFloat(sdrRate) || 1.25);

  const result = calculateCmrVsCargo({
    cargoInvoiceValueEur: parsedValue,
    cargoGrossWeightKg: parsedWeight,
    sdrToEurRate: parsedSdrRate,
  });

  const formatEur = (val: number) => {
    return `${new Intl.NumberFormat("ro-RO").format(val)} €`;
  };

  const setPreset = (type: "electronics" | "pharma" | "machinery") => {
    if (type === "electronics") {
      setInvoiceValueEur("120000");
      setWeightKg("500");
    } else if (type === "pharma") {
      setInvoiceValueEur("250000");
      setWeightKg("800");
    } else {
      setInvoiceValueEur("60000");
      setWeightKg("4500");
    }
  };

  return (
    <div className="space-y-8 bg-white border border-zinc-200/80 rounded-2xl p-6 sm:p-8 shadow-sm">
      {/* Header */}
      <div className="border-b border-zinc-200/80 pb-5">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold mb-2 border border-emerald-200">
          <Truck className="w-3.5 h-3.5" />
          Calculator Răspundere CMR Transportator vs Asigurare Marfă Cargo
        </div>
        <h2 className="text-xl sm:text-2xl font-heading font-bold text-zinc-900">
          De ce CMR-ul Transportatorului NU Îți Acoperă Marfa la Valoarea Reală?
        </h2>
        <p className="text-sm text-zinc-600 mt-1 max-w-3xl">
          Cea mai periculoasă iluzie în transporturi: <em>„Nu fac asigurare, are cărăușul poliță CMR!”</em>. 
          Prin Convenția internațională CMR, transportatorul este răspunzător doar în limita legală de <strong>8,33 DST per kilogram brut</strong> (valoarea în euro se calculează la cotația oficială FMI a DST la data plății). 
          Dacă transporți bunuri de valoare mare și greutate mică (electronice, farmaceutice, modă, utilaje compacte), poți pierde peste 90% din valoarea facturii dacă nu închei o poliță proprie Cargo.
        </p>
      </div>

      {/* Preset Buttons */}
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="text-zinc-500 font-semibold mr-1">Exemple tipice:</span>
        <button
          type="button"
          onClick={() => setPreset("electronics")}
          className="px-3 py-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-800 font-medium transition-colors"
        >
          Electronice & IT (120.000 € • 500 kg)
        </button>
        <button
          type="button"
          onClick={() => setPreset("pharma")}
          className="px-3 py-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-800 font-medium transition-colors"
        >
          Medicamente & Farma (250.000 € • 800 kg)
        </button>
        <button
          type="button"
          onClick={() => setPreset("machinery")}
          className="px-3 py-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-800 font-medium transition-colors"
        >
          Utilaje industriale (60.000 € • 4.500 kg)
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Form Inputs */}
        <div className="lg:col-span-7 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-zinc-700 uppercase tracking-wider mb-1.5">
                Valoare Factură Marfă (€) *
              </label>
              <Input
                type="number"
                min="0"
                value={invoiceValueEur}
                onChange={(e) => setInvoiceValueEur(e.target.value)}
                className="h-11 text-xs rounded-xl bg-zinc-50 font-bold text-zinc-900"
              />
              <span className="text-[11px] text-zinc-500 mt-1 block">Valoarea comercială declarată</span>
            </div>

            <div>
              <label className="block font-semibold text-zinc-700 uppercase tracking-wider mb-1.5">
                Greutate Brută Totală (Kg) *
              </label>
              <Input
                type="number"
                min="0"
                value={weightKg}
                onChange={(e) => setWeightKg(e.target.value)}
                className="h-11 text-xs rounded-xl bg-zinc-50 font-bold text-zinc-900"
              />
              <span className="text-[11px] text-zinc-500 mt-1 block">Inclusiv paleți și ambalaj</span>
            </div>

            <div>
              <label className="block font-semibold text-zinc-700 uppercase tracking-wider mb-1.5">
                Curs Ilustrativ 1 DST (€)
              </label>
              <Input
                type="number"
                step="0.01"
                min="0.1"
                value={sdrRate}
                onChange={(e) => setSdrRate(e.target.value)}
                className="h-11 text-xs rounded-xl bg-zinc-50 font-medium text-zinc-900"
              />
              <span className="text-[11px] text-zinc-500 mt-1 block">Ipoteză configurabilă (1,25 € implicit, neactualizat live)</span>
            </div>
          </div>

          <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-xl text-xs text-zinc-600 space-y-2">
            <div className="font-semibold text-zinc-900 flex items-center gap-1.5">
              <Scale className="w-3.5 h-3.5 text-blue-600" />
              Baza Legală a Convenției CMR (Geneva, 1956 & Protocolul 1978):
            </div>
            <p className="leading-relaxed">
              Conform <strong>Articolului 23 alin. (3) din Convenția CMR</strong> (modificată prin Protocolul din 1978), despăgubirea datorată de transportator pentru pierderea totală sau parțială a mărfii este plafonată imperativ la <strong>8,33 Drepturi Speciale de Tragere (DST / SDR)</strong> per kilogram de greutate brută lipsă. 
              Plafonul este stabilit exclusiv în DST (activ de rezervă FMI); valoarea în euro este strict orientativă și depinde de cotația oficială a FMI de la data decontării daunei. La ipoteza ilustrativă utilizată de <strong>1 DST = {parsedSdrRate} €</strong>, rezultă un echivalent de <strong>{(8.33 * parsedSdrRate).toFixed(2)} €/kg</strong>.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 bg-rose-50/70 border border-rose-200 rounded-xl space-y-1 text-rose-900">
              <strong className="block text-rose-800">Limita Răspunderii CMR a Cărăușului:</strong>
              <p>Despăgubire strict pe kilogram în limita a 8,33 DST/kg. Cărăușul este exonerat în caz de forță majoră, jaf armat neimputabil sau vicii de ambalare.</p>
            </div>

            <div className="p-3.5 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-1 text-emerald-900">
              <strong className="block text-emerald-800">Polița Asigurare Marfă Cargo (All Risks):</strong>
              <p>Despăgubește 100% din valoarea facturii comerciale + opțional 10% profit sperat și costul transportului asigurat, indiferent de greutatea mărfii.</p>
            </div>
          </div>
        </div>

        {/* Results Card */}
        <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-zinc-900 text-white shadow-md space-y-6">
          <div className="space-y-4">
            <span className="text-xs uppercase tracking-widest text-emerald-400 font-bold block">
              DIAGNOSTIC COMPARATIV ÎN CAZ DE DAUNĂ TOTALĂ
            </span>

            <div className="space-y-1">
              <div className="text-xs text-zinc-400">Valoare factură marfă:</div>
              <div className="text-2xl sm:text-3xl font-heading font-black text-white">
                {formatEur(result.cargoInvoiceValueEur)}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-zinc-800/80 border border-zinc-700/80 space-y-3 text-xs">
              <div className="space-y-1 text-rose-300">
                <div className="flex justify-between items-center">
                  <span>Plafon Legal Obligatoriu CMR (8,33 DST × {result.cargoGrossWeightKg} kg):</span>
                  <strong className="text-sm text-rose-300 font-mono">{result.cmrStatutoryCapSdr.toLocaleString("ro-RO")} DST</strong>
                </div>
                <div className="flex justify-between items-center text-[11px] text-zinc-400">
                  <span>Echivalent orientativ Euro (la curs ilustrativ 1 DST = {parsedSdrRate} €):</span>
                  <strong className="text-rose-400">{formatEur(result.cmrStatutoryCapEur)}</strong>
                </div>
              </div>

              <div className="flex justify-between items-center text-emerald-300 pt-2 border-t border-zinc-700">
                <span>Despăgubire Plătită prin Polița Cargo:</span>
                <strong className="text-sm text-emerald-400">{formatEur(result.cargoPolicyIndemnityEur)}</strong>
              </div>

              <div className="flex justify-between items-center text-amber-300 pt-2 border-t border-zinc-700 font-bold">
                <span>Pierdere Neacoperită dacă te bazezi pe CMR:</span>
                <span className="text-base text-amber-400">
                  {formatEur(result.uncompensatedLossEur)} ({result.uncompensatedLossPct}%)
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-3 border-t border-zinc-800 text-[11px] text-zinc-400">
            <p>
              * Calculul legal se efectuează prioritar în DST (8,33 DST/kg, Art. 23 alin. 3 CMR Protocol 1978). Cursul DST/EUR nu este preluat automat live; valoarea de 1,25 EUR reprezintă un curs ilustrativ configurabil manual, iar echivalentul în euro are caracter pur orientativ. Polița Cargo elimină complet riscul plafonării CMR acoperind valoarea comercială declarată.
            </p>
          </div>
        </div>
      </div>

      {/* Primary Conversion CTA */}
      <div className="pt-4 border-t border-zinc-200 flex flex-col sm:flex-row items-center justify-between gap-4 bg-zinc-50 p-5 rounded-xl">
        <div className="text-xs text-zinc-600">
          <strong className="text-zinc-900 block text-sm">Trimiți sau imporți mărfuri și vrei să elimini riscul de transport?</strong>
          Scrie-mi pe WhatsApp pentru o cotație Cargo pe cursă individuală sau abonament anual cu cost de doar 0,08% – 0,25% din valoarea mărfii.
        </div>
        <WhatsAppCta
          toolName="Calculator CMR vs Cargo"
          contextSummary="Consultanță comparativă răspundere CMR cărăuș vs poliță Cargo marfă"
          label="Scrie-mi pe WhatsApp pentru Asigurare Cargo"
          size="md"
        />
      </div>
    </div>
  );
}
