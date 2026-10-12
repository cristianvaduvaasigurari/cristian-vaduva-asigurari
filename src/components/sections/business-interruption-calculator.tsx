"use client";

import * as React from "react";
import { useState } from "react";
import { 
  Building2, 
  ActivitySquare, 
  TrendingDown, 
  ShieldCheck, 
  AlertTriangle, 
  Info,
  Calendar,
  Coins
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { WhatsAppCta } from "@/components/ui/whatsapp-cta";
import { calculateBusinessInterruption } from "@/lib/risk-verification";

export function BusinessInterruptionCalculator() {
  const [currency, setCurrency] = useState<"EUR" | "RON">("EUR");
  const [monthlyGrossProfit, setMonthlyGrossProfit] = useState<string>("25000"); // 25k/luna profit brut
  const [interruptionMonths, setInterruptionMonths] = useState<number>(6); // 6 luni pauza
  const [monthlyContinuingFixedExpenses, setMonthlyContinuingFixedExpenses] = useState<string>("12000"); // 12k/luna salarii/chirii

  const parsedProfit = Math.max(0, parseFloat(monthlyGrossProfit) || 0);
  const parsedExpenses = Math.max(0, parseFloat(monthlyContinuingFixedExpenses) || 0);

  const result = calculateBusinessInterruption({
    monthlyGrossProfit: parsedProfit,
    interruptionMonths,
    monthlyContinuingFixedExpenses: parsedExpenses,
  });

  const formatMoney = (val: number) => {
    return `${new Intl.NumberFormat("ro-RO").format(val)} ${currency}`;
  };

  return (
    <div className="space-y-8 bg-white border border-zinc-200/80 rounded-2xl p-6 sm:p-8 shadow-sm">
      {/* Header */}
      <div className="border-b border-zinc-200/80 pb-5">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold mb-2 border border-indigo-200">
          <ActivitySquare className="w-3.5 h-3.5" />
          Calculator Pierderi Financiare & Întrerupere Activitate (B.I.)
        </div>
        <h2 className="text-xl sm:text-2xl font-heading font-bold text-zinc-900">
          Ce Pierde Firma Ta în Luni de Zile în Care Nu Poate Produce sau Vinde?
        </h2>
        <p className="text-sm text-zinc-600 mt-1 max-w-3xl">
          Polița clasică de bunuri plătește doar cărămizile și utilajele arse. Dar reconstrucția durează 6-12 luni! 
          În acest timp, vânzările sunt 0, iar salariile angajaților cheie, chiriile și ratele bancare continuă să curgă. 
          Polița de Business Interruption compensează profitul brut nerealizat și cheltuielile fixe de supraviețuire.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Form Inputs */}
        <div className="lg:col-span-7 space-y-5">
          <div className="space-y-1.5 text-xs">
            <div className="flex justify-between items-center">
              <label className="font-semibold text-zinc-700 uppercase tracking-wider">
                Profit Brut Lunar Pierdut ({currency}) *
              </label>
              <span className="text-[11px] text-zinc-500 font-normal">Cifra de afaceri minus costuri variabile de marfă</span>
            </div>
            <Input
              type="number"
              min="0"
              value={monthlyGrossProfit}
              onChange={(e) => setMonthlyGrossProfit(e.target.value)}
              className="h-11 text-xs rounded-xl bg-zinc-50 font-bold text-zinc-900"
            />
          </div>

          <div className="space-y-1.5 text-xs">
            <div className="flex justify-between items-center">
              <label className="font-semibold text-zinc-700 uppercase tracking-wider">
                Durată Estimată a Opririi Operațiunilor:
              </label>
              <span className="font-bold text-indigo-600 text-sm">{interruptionMonths} Luni</span>
            </div>
            <input
              type="range"
              min="1"
              max="24"
              step="1"
              value={interruptionMonths}
              onChange={(e) => setInterruptionMonths(Number(e.target.value))}
              className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-indigo-600 mt-2"
            />
            <div className="flex justify-between text-[10px] text-zinc-400">
              <span>1 Lună (incident local)</span>
              <span>6 Luni (avarie utilaj critic)</span>
              <span>12 Luni (incendiu hală)</span>
              <span>24 Luni (daună totală)</span>
            </div>
          </div>

          <div className="space-y-1.5 text-xs pt-2 border-t border-zinc-100">
            <div className="flex justify-between items-center">
              <label className="font-semibold text-zinc-700 uppercase tracking-wider">
                Cheltuieli Fixe Lunare care Continuă să Curgă ({currency}) *
              </label>
              <span className="text-[11px] text-zinc-500 font-normal">Salarii personal de bază, chirii, rate leasing/credite</span>
            </div>
            <Input
              type="number"
              min="0"
              value={monthlyContinuingFixedExpenses}
              onChange={(e) => setMonthlyContinuingFixedExpenses(e.target.value)}
              className="h-11 text-xs rounded-xl bg-zinc-50 text-zinc-900"
            />
          </div>

          {/* Educational Definitions Box */}
          <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-xl text-xs text-zinc-600 space-y-2">
            <div className="font-semibold text-zinc-900 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-blue-600" />
              Clarificare Contabilă Esențială:
            </div>
            <ul className="space-y-1 pl-3 list-disc">
              <li><strong>Cifra de afaceri:</strong> Nu se asigură integral, deoarece la oprirea producției nu mai consumi materii prime și energie variabilă.</li>
              <li><strong>Profitul brut (Gross Profit):</strong> Este măsura standard în asigurări: Vânzări minus costuri variabile directe economisite pe durata pauzei.</li>
              <li><strong>Cheltuieli fixe de menținere:</strong> Plățile obligatorii pentru a nu pierde specialiștii și sediul operațional.</li>
            </ul>
          </div>
        </div>

        {/* Results Card */}
        <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-zinc-900 text-white shadow-md space-y-6">
          <div className="space-y-4">
            <span className="text-xs uppercase tracking-widest text-indigo-400 font-bold block">
              EXPUNERE ESTIMATĂ DIN PAUZĂ FORȚATĂ
            </span>

            <div className="space-y-1">
              <div className="text-xs text-zinc-400">Pierdere financiară totală ({interruptionMonths} luni):</div>
              <div className="text-2xl sm:text-3xl font-heading font-black text-white">
                {formatMoney(result.totalInterruptionExposure)}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-zinc-800/80 border border-zinc-700/80 space-y-2 text-xs">
              <div className="flex justify-between items-center text-zinc-300">
                <span>Profit brut pierdut:</span>
                <strong className="text-white">{formatMoney(result.lostProfitExposure)}</strong>
              </div>
              <div className="flex justify-between items-center text-zinc-300">
                <span>Cheltuieli fixe obligatorii:</span>
                <strong className="text-white">{formatMoney(result.continuingExpensesExposure)}</strong>
              </div>
              <div className="flex justify-between items-center text-indigo-300 pt-2 border-t border-zinc-700 font-bold">
                <span>Sumă minimă de asigurat B.I.:</span>
                <span className="text-base text-indigo-400">{formatMoney(result.totalInterruptionExposure)}</span>
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-3 border-t border-zinc-800 text-[11px] text-zinc-400">
            <p>
              * Scenariu indicativ matematic. Despăgubirea efectivă este calculată de experți lichidatori contabili pe baza registrelor financiare din ultimii 2 ani de activitate comparativă.
            </p>
          </div>
        </div>
      </div>

      {/* Primary Conversion CTA */}
      <div className="pt-4 border-t border-zinc-200 flex flex-col sm:flex-row items-center justify-between gap-4 bg-zinc-50 p-5 rounded-xl">
        <div className="text-xs text-zinc-600">
          <strong className="text-zinc-900 block text-sm">Vrei să atașezi o clauză de Business Interruption la polița de bunuri a firmei?</strong>
          Scrie-mi pe WhatsApp pentru o evaluare a marjelor de profit brut și stabilirea perioadei optime de indemnizare (12 vs 24 luni).
        </div>
        <WhatsAppCta
          toolName="Calculator Business Interruption"
          contextSummary="Consultanță acoperire întreruperea activității și pierdere de profit"
          label="Scrie-mi pe WhatsApp pentru Asigurare B.I."
          size="md"
        />
      </div>
    </div>
  );
}
