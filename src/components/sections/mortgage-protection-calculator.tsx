"use client";

import * as React from "react";
import { useState } from "react";
import { 
  Building, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Info,
  ArrowRight,
  TrendingUp,
  Landmark
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { WhatsAppCta } from "@/components/ui/whatsapp-cta";
import { calculateMortgageProtection } from "@/lib/risk-verification";
import Link from "next/link";

export function MortgageProtectionCalculator() {
  const [currency, setCurrency] = useState<"EUR" | "RON">("EUR");
  const [loanBalance, setLoanBalance] = useState<string>("85000"); // 85.000 EUR sold
  const [monthlyInstalment, setMonthlyInstalment] = useState<string>("620"); // 620 EUR rată
  const [scenarioMonths, setScenarioMonths] = useState<12 | 24>(24);
  const [existingCover, setExistingCover] = useState<string>("0");

  const parsedBalance = Math.max(0, parseFloat(loanBalance) || 0);
  const parsedMonthly = Math.max(0, parseFloat(monthlyInstalment) || 0);
  const parsedExisting = Math.max(0, parseFloat(existingCover) || 0);

  const result = calculateMortgageProtection({
    outstandingLoanBalance: parsedBalance,
    monthlyInstalment: parsedMonthly,
    scenarioMonths,
    existingLifeInsurance: parsedExisting,
  });

  const formatMoney = (val: number) => {
    return `${new Intl.NumberFormat("ro-RO").format(val)} ${currency}`;
  };

  return (
    <div className="space-y-8 bg-white border border-zinc-200/80 rounded-2xl p-6 sm:p-8 shadow-sm">
      {/* Header */}
      <div className="border-b border-zinc-200/80 pb-5">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-2 border border-blue-200">
          <Landmark className="w-3.5 h-3.5" />
          Calculator Protecție Credite Ipotecare & Rate Bancare
        </div>
        <h2 className="text-xl sm:text-2xl font-heading font-bold text-zinc-900">
          Ce se Întâmplă cu Creditul Familiei în Caz de Accident sau Pierdere a Venitului?
        </h2>
        <p className="text-sm text-zinc-600 mt-1 max-w-3xl">
          Banca îți cere o poliță de viață de grup cesionată la credit, dar știai că acea poliță protejează doar banca, nu și siguranța financiară a familiei tale? 
          Simulează expunerea exactă pe soldul datorat și pe un fond de rezervă pentru ratele lunare pe 12 sau 24 de luni.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Form Inputs */}
        <div className="lg:col-span-7 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-zinc-700 uppercase tracking-wider mb-1.5">
                Sold Rămas Credit Ipotecar *
              </label>
              <Input
                type="number"
                min="0"
                value={loanBalance}
                onChange={(e) => setLoanBalance(e.target.value)}
                className="h-11 text-xs rounded-xl bg-zinc-50 font-bold text-zinc-900"
              />
              <span className="text-[11px] text-zinc-500 mt-1 block">Suma datorată principală</span>
            </div>

            <div>
              <label className="block font-semibold text-zinc-700 uppercase tracking-wider mb-1.5">
                Rată Lunară Curentă *
              </label>
              <Input
                type="number"
                min="0"
                value={monthlyInstalment}
                onChange={(e) => setMonthlyInstalment(e.target.value)}
                className="h-11 text-xs rounded-xl bg-zinc-50 font-bold text-zinc-900"
              />
              <span className="text-[11px] text-zinc-500 mt-1 block">Principal + dobândă lunară</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2 border-t border-zinc-100">
            <div>
              <label className="block font-semibold text-zinc-700 uppercase tracking-wider mb-1.5">
                Scenariu Rezervă Rate (Incapacitate Temporară)
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setScenarioMonths(12)}
                  className={`h-11 rounded-xl font-bold border transition-all text-xs cursor-pointer ${
                    scenarioMonths === 12
                      ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                      : "bg-zinc-50 border-zinc-200 text-zinc-700 hover:bg-zinc-100"
                  }`}
                >
                  12 Luni de Rezervă
                </button>
                <button
                  type="button"
                  onClick={() => setScenarioMonths(24)}
                  className={`h-11 rounded-xl font-bold border transition-all text-xs cursor-pointer ${
                    scenarioMonths === 24
                      ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                      : "bg-zinc-50 border-zinc-200 text-zinc-700 hover:bg-zinc-100"
                  }`}
                >
                  24 Luni de Rezervă
                </button>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-zinc-700 uppercase tracking-wider mb-1.5">
                Poliță de Viață Activă Existentă ({currency})
              </label>
              <Input
                type="number"
                min="0"
                value={existingCover}
                onChange={(e) => setExistingCover(e.target.value)}
                placeholder="0"
                className="h-11 text-xs rounded-xl bg-zinc-50 text-zinc-900"
              />
              <span className="text-[11px] text-zinc-500 mt-1 block">Capital asigurat pe viață deja activ</span>
            </div>
          </div>

          {/* Educational Difference Box */}
          <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-xl text-xs text-zinc-600 space-y-2">
            <div className="font-semibold text-zinc-900 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-blue-600" />
              Polița Băncii vs O Poliță Individuală Independentă:
            </div>
            <p className="leading-relaxed">
              Polița de grup a băncii scade odată cu soldul creditului, iar beneficiarul este 100% banca. 
              Dacă închei o poliță de viață individuală, suma asigurată rămâne constantă (sau crește prin indexare), iar surplusul peste creditul achitat este virat familiei tale pentru cheltuieli curente.
            </p>
          </div>
        </div>

        {/* Results Card */}
        <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-zinc-900 text-white shadow-md space-y-6">
          <div className="space-y-4">
            <span className="text-xs uppercase tracking-widest text-emerald-400 font-bold block">
              EXPUNERE FINANCIARĂ CALCULATĂ
            </span>

            <div className="space-y-1">
              <div className="text-xs text-zinc-400">Sold total de protejat:</div>
              <div className="text-2xl sm:text-3xl font-heading font-black text-white">
                {formatMoney(result.totalExposure)}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-zinc-800/80 border border-zinc-700/80 space-y-2.5 text-xs">
              <div className="flex justify-between items-center text-zinc-300">
                <span>Fond rate pentru {scenarioMonths} luni:</span>
                <strong className="text-white">{formatMoney(result.temporaryInstalmentExposure)}</strong>
              </div>
              {parsedExisting > 0 && (
                <div className="flex justify-between items-center text-emerald-300">
                  <span>Acoperire existentă dedusă:</span>
                  <strong>- {formatMoney(parsedExisting)}</strong>
                </div>
              )}
              <div className="flex justify-between items-center text-amber-300 pt-2 border-t border-zinc-700">
                <span className="font-semibold">Deficit Net Neacoperit:</span>
                <strong className="text-base text-amber-400">{formatMoney(result.remainingUncoveredExposure)}</strong>
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-3 border-t border-zinc-800 text-[11px] text-zinc-400">
            <p>
              * Calcul orientativ. Nicio poliță nu preia automat ratele bancare fără dovedirea evenimentului asigurat (deces, invaliditate permanentă sau incapacitate temporară de muncă).
            </p>
          </div>
        </div>
      </div>

      {/* Internal link to Credite Ecosystem */}
      <div className="p-4 bg-blue-50/60 border border-blue-200/80 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-blue-900">
        <div className="flex items-center gap-2">
          <Building className="w-4 h-4 text-blue-700 shrink-0" />
          <span>Cauți refinanțare sau un credit ipotecar nou cu cele mai bune dobânzi din piață?</span>
        </div>
        <Link
          href="/credite/credit-ipotecar"
          className="text-blue-700 hover:text-blue-900 font-bold inline-flex items-center gap-1 shrink-0 underline"
        >
          <span>Explorează Credite Ipotecare</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Primary Conversion CTA */}
      <div className="pt-4 border-t border-zinc-200 flex flex-col sm:flex-row items-center justify-between gap-4 bg-zinc-50 p-5 rounded-xl">
        <div className="text-xs text-zinc-600">
          <strong className="text-zinc-900 block text-sm">Ai un credit ipotecar și vrei o poliță de viață cesionată optim?</strong>
          Scrie-mi pe WhatsApp pentru a structura acoperirea corectă acceptată de bancă la costuri corecte.
        </div>
        <WhatsAppCta
          toolName="Protecție Credite Ipotecare"
          contextSummary="Consultanță protecție credit ipotecar și continuitate rate"
          label="Scrie-mi pe WhatsApp pentru Protecție Credit"
          size="md"
        />
      </div>
    </div>
  );
}
