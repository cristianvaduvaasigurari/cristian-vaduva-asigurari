"use client";

import * as React from "react";
import { useState } from "react";
import { 
  Users2, 
  ShieldCheck, 
  AlertTriangle, 
  Scale, 
  TrendingUp, 
  Building2,
  Info,
  Briefcase
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { WhatsAppCta } from "@/components/ui/whatsapp-cta";
import { calculateKeyPersonExposure } from "@/lib/risk-verification";

export function KeyPersonExposure() {
  const [equityValueEur, setEquityValueEur] = useState<string>("250000"); // 250k valoare parti sociale
  const [coSignedLiabilitiesEur, setCoSignedLiabilitiesEur] = useState<string>("120000"); // 120k credite garantate
  const [annualTurnoverEur, setAnnualTurnoverEur] = useState<string>("600000"); // 600k cifra afaceri
  const [keyPersonContributionPct, setKeyPersonContributionPct] = useState<number>(40); // 40% generat de el
  const [replacementCostEur, setReplacementCostEur] = useState<string>("50000"); // cost recrutare/continuitate
  const [existingReservesEur, setExistingReservesEur] = useState<string>("40000"); // rezerve disponibile

  const parsedEquity = Math.max(0, parseFloat(equityValueEur) || 0);
  const parsedLiabilities = Math.max(0, parseFloat(coSignedLiabilitiesEur) || 0);
  const parsedTurnover = Math.max(0, parseFloat(annualTurnoverEur) || 0);
  const parsedReplacement = Math.max(0, parseFloat(replacementCostEur) || 0);
  const parsedReserves = Math.max(0, parseFloat(existingReservesEur) || 0);

  const result = calculateKeyPersonExposure({
    equityValueEur: parsedEquity,
    coSignedLiabilitiesEur: parsedLiabilities,
    annualTurnoverEur: parsedTurnover,
    keyPersonContributionPct,
    replacementCostEur: parsedReplacement,
    existingReservesEur: parsedReserves,
  });

  const formatEur = (val: number) => {
    return `${new Intl.NumberFormat("ro-RO").format(val)} €`;
  };

  return (
    <div className="space-y-8 bg-white border border-zinc-200/80 rounded-2xl p-6 sm:p-8 shadow-sm">
      {/* Header */}
      <div className="border-b border-zinc-200/80 pb-5">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-2 border border-blue-200">
          <Briefcase className="w-3.5 h-3.5" />
          Protecție Continuitate Afacere & Convenție Între Asociați
        </div>
        <h2 className="text-xl sm:text-2xl font-heading font-bold text-zinc-900">
          Calculator Expunere Asociați & Oameni Cheie (Key Person)
        </h2>
        <p className="text-sm text-zinc-600 mt-1 max-w-3xl">
          Dacă un asociat sau un director cheie suferă un accident grav sau deces, cine răscumpără părțile sociale de la moștenitori? 
          Cine preia garanțiile bancare semnate personal? Și cine acoperă contractele pierdute în primele 12 luni? 
          Simulează scenariul de risc pentru a proteja atât firma, cât și familiile asociaților.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Form Inputs */}
        <div className="lg:col-span-7 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-zinc-700 uppercase tracking-wider mb-1.5">
                Valoare Estimată Cotă Părți Sociale (€) *
              </label>
              <Input
                type="number"
                min="0"
                value={equityValueEur}
                onChange={(e) => setEquityValueEur(e.target.value)}
                className="h-11 text-xs rounded-xl bg-zinc-50 font-bold text-zinc-900"
              />
              <span className="text-[11px] text-zinc-500 mt-1 block">Pentru răscumpărare de la moștenitori</span>
            </div>

            <div>
              <label className="block font-semibold text-zinc-700 uppercase tracking-wider mb-1.5">
                Credite Firmei Garantate Personal (€) *
              </label>
              <Input
                type="number"
                min="0"
                value={coSignedLiabilitiesEur}
                onChange={(e) => setCoSignedLiabilitiesEur(e.target.value)}
                className="h-11 text-xs rounded-xl bg-zinc-50 font-bold text-zinc-900"
              />
              <span className="text-[11px] text-zinc-500 mt-1 block">Garanții ipotecare sau fideiusiuni</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2 border-t border-zinc-100">
            <div>
              <label className="block font-semibold text-zinc-700 uppercase tracking-wider mb-1.5">
                Cifră de Afaceri Anuală (€)
              </label>
              <Input
                type="number"
                min="0"
                value={annualTurnoverEur}
                onChange={(e) => setAnnualTurnoverEur(e.target.value)}
                className="h-11 text-xs rounded-xl bg-zinc-50 text-zinc-900"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="font-semibold text-zinc-700 uppercase tracking-wider">
                  Dependență Vânzări / Relații:
                </label>
                <span className="font-bold text-blue-600">{keyPersonContributionPct}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={keyPersonContributionPct}
                onChange={(e) => setKeyPersonContributionPct(Number(e.target.value))}
                className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-blue-600 mt-2"
              />
              <span className="text-[11px] text-zinc-500 mt-1 block">Cota din afaceri generată direct de omul cheie</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2 border-t border-zinc-100">
            <div>
              <label className="block font-semibold text-zinc-700 uppercase tracking-wider mb-1.5">
                Costuri Recrutare & Continuitate (€)
              </label>
              <Input
                type="number"
                min="0"
                value={replacementCostEur}
                onChange={(e) => setReplacementCostEur(e.target.value)}
                className="h-11 text-xs rounded-xl bg-zinc-50 text-zinc-900"
              />
              <span className="text-[11px] text-zinc-500 mt-1 block">Headhunting, onboarding, bonus tranziție</span>
            </div>

            <div>
              <label className="block font-semibold text-zinc-700 uppercase tracking-wider mb-1.5">
                Rezerve Financiare Disponibile (€)
              </label>
              <Input
                type="number"
                min="0"
                value={existingReservesEur}
                onChange={(e) => setExistingReservesEur(e.target.value)}
                className="h-11 text-xs rounded-xl bg-zinc-50 text-zinc-900"
              />
              <span className="text-[11px] text-zinc-500 mt-1 block">Fond de urgență existent în companie</span>
            </div>
          </div>

          {/* Legal Structure Explainer */}
          <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-xl text-xs text-zinc-600 space-y-2">
            <div className="font-semibold text-zinc-900 flex items-center gap-1.5">
              <Scale className="w-3.5 h-3.5 text-blue-600" />
              Mecanismul Juridic: Acordul Buy-Sell Finanțat prin Asigurare
            </div>
            <p className="leading-relaxed">
              O convenție între asociați stipulează că asociații rămași au dreptul exclusiv de a cumpăra acțiunile asociatului decedat la un preț prestabilit. 
              Polița de viață reciprocă (Key Person / Cross-Purchase) plătește instant lichiditatea necesară, împiedicând blocarea companiei sau intrarea forțată a moștenitorilor nepregătiți în conducere.
            </p>
          </div>
        </div>

        {/* Results Card */}
        <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-zinc-900 text-white shadow-md space-y-6">
          <div className="space-y-4">
            <span className="text-xs uppercase tracking-widest text-emerald-400 font-bold block">
              EXPUNERE FINANCIARĂ DE CONTINUITATE
            </span>

            <div className="space-y-1">
              <div className="text-xs text-zinc-400">Necesar brut de protecție:</div>
              <div className="text-2xl sm:text-3xl font-heading font-black text-white">
                {formatEur(result.totalGrossExposureEur)}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-zinc-800/80 border border-zinc-700/80 space-y-2 text-xs">
              <div className="flex justify-between items-center text-zinc-300">
                <span>Răscumpărare Părți Sociale:</span>
                <strong className="text-white">{formatEur(result.equityValueEur)}</strong>
              </div>
              <div className="flex justify-between items-center text-zinc-300">
                <span>Datorii Garantate Personal:</span>
                <strong className="text-white">{formatEur(result.coSignedLiabilitiesEur)}</strong>
              </div>
              <div className="flex justify-between items-center text-zinc-300">
                <span>Risc Pierdere Vânzări:</span>
                <strong className="text-white">{formatEur(result.annualTurnoverAtRiskEur)}</strong>
              </div>
              <div className="flex justify-between items-center text-zinc-300">
                <span>Cost Tranziție Management:</span>
                <strong className="text-white">{formatEur(parsedReplacement)}</strong>
              </div>
              {parsedReserves > 0 && (
                <div className="flex justify-between items-center text-emerald-300 pt-1 border-t border-zinc-700">
                  <span>Rezerve Existente:</span>
                  <strong>- {formatEur(parsedReserves)}</strong>
                </div>
              )}
              <div className="flex justify-between items-center text-emerald-300 pt-2 border-t border-zinc-700 font-bold">
                <span>Deficit Net de Asigurat:</span>
                <span className="text-base text-emerald-400">{formatEur(result.netProtectionNeedEur)}</span>
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-3 border-t border-zinc-800 text-[11px] text-zinc-400">
            <p>
              * Model educațional simplificat. O structură validă necesită asistență juridică pentru actul constitutiv și consultanță fiscală privind deductibilitatea primelor.
            </p>
          </div>
        </div>
      </div>

      {/* Primary Conversion CTA */}
      <div className="pt-4 border-t border-zinc-200 flex flex-col sm:flex-row items-center justify-between gap-4 bg-zinc-50 p-5 rounded-xl">
        <div className="text-xs text-zinc-600">
          <strong className="text-zinc-900 block text-sm">Vrei să structurezi o asigurare Key Person sau Buy-Sell pentru asociați?</strong>
          Scrie-mi pe WhatsApp pentru o discuție confidențială privind protecția patrimoniului și continuitatea afacerii tale.
        </div>
        <WhatsAppCta
          toolName="Protecție Asociați & Key Person"
          contextSummary="Consultanță protecție continuitate firmă și asociați (Key Person)"
          label="Scrie-mi pe WhatsApp pentru Protecție Asociați"
          size="md"
        />
      </div>
    </div>
  );
}
