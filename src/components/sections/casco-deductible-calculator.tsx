"use client";

import * as React from "react";
import { useState } from "react";
import { 
  CarFront, 
  ShieldAlert, 
  CheckCircle2, 
  Info, 
  AlertTriangle,
  RotateCcw,
  Scale
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { WhatsAppCta } from "@/components/ui/whatsapp-cta";
import { 
  calculateCascoDeductible, 
  CascoDeductibleType 
} from "@/lib/risk-verification";

export function CascoDeductibleCalculator() {
  const [currency, setCurrency] = useState<"EUR" | "RON">("EUR");
  const [damageAmount, setDamageAmount] = useState<string>("20000");
  const [insuredSum, setInsuredSum] = useState<string>("35000");
  const [deductibleType, setDeductibleType] = useState<CascoDeductibleType>("percentage_damage");
  const [deductibleValue, setDeductibleValue] = useState<string>("10"); // 10%
  const [minimumThreshold, setMinimumThreshold] = useState<string>("100"); // min 100 EUR
  const [totalLossThresholdPct, setTotalLossThresholdPct] = useState<string>("75"); // illustrative contractual convention

  const parsedDamage = Math.max(0, parseFloat(damageAmount) || 0);
  const parsedSumInsured = Math.max(0, parseFloat(insuredSum) || 0);
  const parsedDeductibleVal = Math.max(0, parseFloat(deductibleValue) || 0);
  const parsedMinThreshold = Math.max(0, parseFloat(minimumThreshold) || 0);
  const parsedThresholdPct = Math.max(1, Math.min(100, parseFloat(totalLossThresholdPct) || 75));

  const result = calculateCascoDeductible({
    damageAmount: parsedDamage,
    deductibleType,
    deductibleValue: parsedDeductibleVal,
    insuredSum: parsedSumInsured,
    minimumThreshold: parsedMinThreshold,
    totalLossThresholdPct: parsedThresholdPct,
  });

  // Example comparison scenario: 20.000 damage with 100 fixed vs 10%
  const scenarioFixed100 = calculateCascoDeductible({
    damageAmount: 20000,
    deductibleType: "fixed",
    deductibleValue: 100,
    insuredSum: 35000,
    minimumThreshold: 0,
  });

  const scenarioPercent10 = calculateCascoDeductible({
    damageAmount: 20000,
    deductibleType: "percentage_damage",
    deductibleValue: 10,
    insuredSum: 35000,
    minimumThreshold: 100,
  });

  const formatMoney = (val: number) => {
    return `${new Intl.NumberFormat("ro-RO").format(val)} ${currency}`;
  };

  const setPreset = (type: "minor-dent" | "serious-accident" | "total-loss") => {
    if (type === "minor-dent") {
      setDamageAmount("1200");
      setDeductibleType("fixed");
      setDeductibleValue("100");
      setMinimumThreshold("0");
    } else if (type === "serious-accident") {
      setDamageAmount("20000");
      setDeductibleType("percentage_damage");
      setDeductibleValue("10");
      setMinimumThreshold("100");
    } else {
      setDamageAmount("32000");
      setInsuredSum("35000");
      setDeductibleType("percentage_damage");
      setDeductibleValue("10");
      setMinimumThreshold("100");
    }
  };

  return (
    <div className="space-y-8 bg-white border border-zinc-200/80 rounded-2xl p-6 sm:p-8 shadow-sm">
      {/* Header */}
      <div className="border-b border-zinc-200/80 pb-5">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-2 border border-blue-200">
          <CarFront className="w-3.5 h-3.5" />
          Calculator Matematic Franșiză CASCO
        </div>
        <h2 className="text-xl sm:text-2xl font-heading font-bold text-zinc-900">
          Cât Plătești Tu vs Cât Plătește Asigurătorul la o Daună Auto?
        </h2>
        <p className="text-sm text-zinc-600 mt-1 max-w-3xl">
          Franșiza este partea din daună suportată de asigurat. Diferența dintre o franșiză fixă (ex. 100 €) și una procentuală (ex. 10%) poate însemna mii de euro plătiți din buzunarul tău la o daună majoră. Simulează impactul exact înainte de a semna polița.
        </p>
      </div>

      {/* Preset Buttons */}
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="text-zinc-500 font-semibold mr-1">Scenarii rapide:</span>
        <button
          type="button"
          onClick={() => setPreset("minor-dent")}
          className="px-3 py-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-800 font-medium transition-colors"
        >
          Avarie ușoară (1.200 € • franșiză fixă 100 €)
        </button>
        <button
          type="button"
          onClick={() => setPreset("serious-accident")}
          className="px-3 py-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-800 font-medium transition-colors"
        >
          Accident grav (20.000 € • franșiză 10%)
        </button>
        <button
          type="button"
          onClick={() => setPreset("total-loss")}
          className="px-3 py-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-800 font-medium transition-colors"
        >
          Daună Totală / Epavă (32.000 €)
        </button>
      </div>

      {/* Form Inputs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-zinc-700 uppercase tracking-wider mb-1.5">
                Valoare Estimată Daună *
              </label>
              <Input
                type="number"
                min="0"
                value={damageAmount}
                onChange={(e) => setDamageAmount(e.target.value)}
                className="h-11 text-xs rounded-xl bg-zinc-50 font-bold text-zinc-900"
              />
              <span className="text-[11px] text-zinc-500 mt-1 block">Cost reparație deviz service</span>
            </div>

            <div>
              <label className="block font-semibold text-zinc-700 uppercase tracking-wider mb-1.5">
                Suma Asigurată a Mașinii *
              </label>
              <Input
                type="number"
                min="0"
                value={insuredSum}
                onChange={(e) => setInsuredSum(e.target.value)}
                className="h-11 text-xs rounded-xl bg-zinc-50 text-zinc-900"
              />
              <span className="text-[11px] text-zinc-500 mt-1 block">Valoarea de catalog / poliță</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs pt-2 border-t border-zinc-100">
            <div>
              <label className="block font-semibold text-zinc-700 uppercase tracking-wider mb-1.5">
                Tip Franșiză Contractuală
              </label>
              <select
                value={deductibleType}
                onChange={(e) => setDeductibleType(e.target.value as CascoDeductibleType)}
                className="w-full h-11 bg-zinc-50 border border-zinc-300 rounded-xl px-3 text-xs text-zinc-900 font-semibold focus:ring-2 focus:ring-blue-600 focus:outline-none"
              >
                <option value="fixed">Sumă Fixă (ex. 100 €)</option>
                <option value="percentage_damage">% din Daună (ex. 10%)</option>
                <option value="percentage_insured_sum">% din Suma Asigurată (ex. 2%)</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-zinc-700 uppercase tracking-wider mb-1.5">
                Valoare Franșiză ({deductibleType === "fixed" ? currency : "%"})
              </label>
              <Input
                type="number"
                min="0"
                value={deductibleValue}
                onChange={(e) => setDeductibleValue(e.target.value)}
                className="h-11 text-xs rounded-xl bg-zinc-50 font-bold text-zinc-900"
              />
            </div>

            <div>
              <label className="block font-semibold text-zinc-700 uppercase tracking-wider mb-1.5">
                Prag Minim ({currency})
              </label>
              <Input
                type="number"
                min="0"
                value={minimumThreshold}
                onChange={(e) => setMinimumThreshold(e.target.value)}
                placeholder="ex. 100"
                className="h-11 text-xs rounded-xl bg-zinc-50 text-zinc-900"
              />
              <span className="text-[10px] text-zinc-500 mt-1 block">Clauză min. X {currency}</span>
            </div>

            <div>
              <label className="block font-semibold text-zinc-700 uppercase tracking-wider mb-1.5">
                Prag Daună Totală (%)
              </label>
              <Input
                type="number"
                min="1"
                max="100"
                value={totalLossThresholdPct}
                onChange={(e) => setTotalLossThresholdPct(e.target.value)}
                placeholder="75"
                className="h-11 text-xs rounded-xl bg-zinc-50 text-zinc-900 font-medium"
              />
              <span className="text-[10px] text-zinc-500 mt-1 block">Ipoteză uzuală (75-80%)</span>
            </div>
          </div>

          <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-200 text-xs text-zinc-600 space-y-1.5">
            <div className="font-semibold text-zinc-900 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-blue-600" />
              Formula Transparentă & Ipoteze Aplicabile:
            </div>
            <p>
              {deductibleType === "fixed" && `Franșiză = ${parsedDeductibleVal} ${currency} fix (plafonat la valoarea daunei).`}
              {deductibleType === "percentage_damage" && `Franșiză = MAX(${parsedDeductibleVal}% × Daună, Prag Minim ${parsedMinThreshold} ${currency}) = MAX(${((parsedDamage * parsedDeductibleVal) / 100).toFixed(0)} ${currency}, ${parsedMinThreshold} ${currency}).`}
              {deductibleType === "percentage_insured_sum" && `Franșiză = MAX(${parsedDeductibleVal}% × Sumă Asigurată, Prag Minim) = MAX(${((parsedSumInsured * parsedDeductibleVal) / 100).toFixed(0)} ${currency}, ${parsedMinThreshold} ${currency}).`}
            </p>
            <p className="text-[11px] text-zinc-500 italic pt-1 border-t border-zinc-200/60">
              Notă metodologică: Pragul de daună totală economică ({parsedThresholdPct}%) este o ipoteză contractuală ilustrativă configurabilă. În România, fiecare asigurător își stabilește propriul procent (uzual 70% - 85% din valoarea asigurată) în condițiile generale de poliță; nu există un prag impus prin lege.
            </p>
          </div>
        </div>

        {/* Results Card */}
        <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-zinc-900 text-white shadow-md space-y-6">
          <div className="space-y-4">
            <span className="text-xs uppercase tracking-widest text-emerald-400 font-bold block">
              DEFALCARE FINANCIARĂ REPARAȚIE
            </span>

            <div className="space-y-1">
              <div className="text-xs text-zinc-400">Total deviz reparație:</div>
              <div className="text-2xl sm:text-3xl font-heading font-black text-white">
                {formatMoney(result.totalDamage)}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-zinc-800/80 border border-zinc-700/80 space-y-3 text-xs">
              <div className="flex justify-between items-center text-rose-300">
                <span className="font-semibold">Partea Ta (Franșiză suportată):</span>
                <strong className="text-base text-rose-400">{formatMoney(result.policyholderShare)}</strong>
              </div>

              <div className="flex justify-between items-center text-emerald-300 pt-2 border-t border-zinc-700">
                <span className="font-semibold">Despăgubire Asigurător:</span>
                <strong className="text-base text-emerald-400">{formatMoney(result.insurerShare)}</strong>
              </div>
            </div>

            {result.isTotalLoss && (
              <div className="p-3 bg-red-950/60 border border-red-500/50 rounded-xl text-xs text-red-200 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Atenție: Prag de Daună Totală Economică depășit ({result.totalLossThresholdPctUsed}%)!</strong> Devizul ({formatMoney(result.totalDamage)}) atinge sau depășește pragul contractual simulat de {result.totalLossThresholdPctUsed}% din suma asigurată ({formatMoney((parsedSumInsured * result.totalLossThresholdPctUsed) / 100)}). Asigurătorul poate decide declanșarea procedurii de daună totală economică cu deducerea valorii epavei.
                </span>
              </div>
            )}
          </div>

          <div className="space-y-3 pt-3 border-t border-zinc-800 text-[11px] text-zinc-400">
            <p>
              * Calcul orientativ simplificat. În caz de accident în care vinovat este un terț identificat, poți recupera franșiza prin regres CASCO de la asigurătorul RCA al vinovatului.
            </p>
          </div>
        </div>
      </div>

      {/* Real-World Scenario Comparison Table */}
      <div className="p-5 bg-slate-50 border border-slate-200/80 rounded-xl space-y-3 text-xs">
        <div className="font-bold text-zinc-900 text-sm flex items-center gap-2">
          <Scale className="w-4 h-4 text-blue-600" />
          Comparație Reală: Daună de 20.000 € (Fixed vs Procent)
        </div>
        <p className="text-zinc-600 text-xs">
          Iată de ce clauza de franșiză contează enorm la negocierea contractului CASCO:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
          <div className="p-4 bg-white border border-emerald-200 rounded-xl space-y-2">
            <span className="font-bold text-emerald-800 text-xs block">Varianta A: Franșiză Fixă de 100 €</span>
            <div className="text-zinc-700 space-y-1">
              <div className="flex justify-between">
                <span>Tu plătești:</span>
                <strong className="text-emerald-700">100 €</strong>
              </div>
              <div className="flex justify-between">
                <span>Asigurătorul plătește:</span>
                <strong>19.900 €</strong>
              </div>
            </div>
            <p className="text-[11px] text-zinc-500 pt-1">Ideală pentru mașini noi sau de valoare ridicată.</p>
          </div>

          <div className="p-4 bg-white border border-amber-200 rounded-xl space-y-2">
            <span className="font-bold text-amber-800 text-xs block">Varianta B: Franșiză 10% din Daună</span>
            <div className="text-zinc-700 space-y-1">
              <div className="flex justify-between">
                <span>Tu plătești:</span>
                <strong className="text-amber-800">2.000 €</strong>
              </div>
              <div className="flex justify-between">
                <span>Asigurătorul plătește:</span>
                <strong>18.000 €</strong>
              </div>
            </div>
            <p className="text-[11px] text-zinc-500 pt-1">Diferență din buzunarul tău: +1.900 € la același eveniment!</p>
          </div>
        </div>
      </div>

      {/* Primary Conversion CTA */}
      <div className="pt-4 border-t border-zinc-200 flex flex-col sm:flex-row items-center justify-between gap-4 bg-zinc-50 p-5 rounded-xl">
        <div className="text-xs text-zinc-600">
          <strong className="text-zinc-900 block text-sm">Vrei o ofertă CASCO cu franșiză 0 sau fixă mică?</strong>
          Trimite-mi marca, anul și valoarea mașinii pe WhatsApp pentru a compara clauzele de la Generali și asigurătorii de top.
        </div>
        <WhatsAppCta
          toolName="Calculator Franșiză CASCO"
          contextSummary="Consultanță optimizare franșiză și clauze contractuale CASCO"
          label="Scrie-mi pe WhatsApp pentru Cotație CASCO"
          size="md"
        />
      </div>
    </div>
  );
}
