"use client";

import * as React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Home,
  HeartPulse,
  RotateCcw,
  Info,
  ArrowRight,
  Building2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

function formatRon(val: number): string {
  return new Intl.NumberFormat("ro-RO", {
    style: "currency",
    currency: "RON",
    maximumFractionDigits: 0,
  }).format(val);
}

export function InsuranceNeedsCalculator() {
  const [activeTab, setActiveTab] = useState<"home" | "life">("home");

  // ==========================================
  // 3A. HOME RECONSTRUCTION ESTIMATOR STATE
  // ==========================================
  const [propertyType, setPropertyType] = useState<"apartment" | "house" | "duplex">("apartment");
  const [builtArea, setBuiltArea] = useState<string>("90"); // Suprafață construită desfășurată în mp
  const [costPerSqMeter, setCostPerSqMeter] = useState<string>("4200"); // Cost orientativ reconstrucție lei/mp
  const [finishesAllowance, setFinishesAllowance] = useState<string>("0"); // Supliment finisaje speciale (lei)
  const [additionalCosts, setAdditionalCosts] = useState<string>("15000"); // Demolare, moloz, avize, proiectare (lei)

  // ==========================================
  // 3B. LIFE INSURANCE NEEDS ESTIMATOR STATE
  // ==========================================
  const [annualIncome, setAnnualIncome] = useState<string>("96000"); // Venit anual net de protejat (lei)
  const [protectionYears, setProtectionYears] = useState<number>(5); // Ani de protecție venit
  const [debtsBalance, setDebtsBalance] = useState<string>("350000"); // Sold credite ipotecare / datorii (lei)
  const [otherObligations, setOtherObligations] = useState<string>("50000"); // Educație copii, fond urgență (lei)
  const [existingSavings, setExistingSavings] = useState<string>("40000"); // Economii lichide disponibile (lei)
  const [existingLifeInsurance, setExistingLifeInsurance] = useState<string>("0"); // Capital asigurare viață existentă (lei)

  // ==========================================
  // HOME CALCULATIONS
  // ==========================================
  const parsedArea = Math.max(0, parseFloat(builtArea) || 0);
  const parsedUnitCost = Math.max(0, parseFloat(costPerSqMeter) || 0);
  const parsedFinishes = Math.max(0, parseFloat(finishesAllowance) || 0);
  const parsedAdditional = Math.max(0, parseFloat(additionalCosts) || 0);

  const baseReconstruction = parsedArea * parsedUnitCost;
  const totalHomeReconstruction = baseReconstruction + parsedFinishes + parsedAdditional;

  const applyHomePreset = (type: "standard-apt" | "premium-apt" | "house") => {
    if (type === "standard-apt") {
      setPropertyType("apartment");
      setBuiltArea("75");
      setCostPerSqMeter("3800");
      setFinishesAllowance("0");
      setAdditionalCosts("10000");
    } else if (type === "premium-apt") {
      setPropertyType("apartment");
      setBuiltArea("110");
      setCostPerSqMeter("4800");
      setFinishesAllowance("35000");
      setAdditionalCosts("20000");
    } else {
      setPropertyType("house");
      setBuiltArea("160");
      setCostPerSqMeter("4500");
      setFinishesAllowance("50000");
      setAdditionalCosts("30000");
    }
  };

  const resetHomeCalc = () => {
    setPropertyType("apartment");
    setBuiltArea("90");
    setCostPerSqMeter("4200");
    setFinishesAllowance("0");
    setAdditionalCosts("15000");
  };

  // ==========================================
  // LIFE CALCULATIONS
  // ==========================================
  const parsedAnnualIncome = Math.max(0, parseFloat(annualIncome) || 0);
  const parsedDebts = Math.max(0, parseFloat(debtsBalance) || 0);
  const parsedObligations = Math.max(0, parseFloat(otherObligations) || 0);
  const parsedSavings = Math.max(0, parseFloat(existingSavings) || 0);
  const parsedExistingInsurance = Math.max(0, parseFloat(existingLifeInsurance) || 0);

  const incomeReplacementNeed = parsedAnnualIncome * protectionYears;
  const totalNeeds = incomeReplacementNeed + parsedDebts + parsedObligations;
  const totalDeductions = parsedSavings + parsedExistingInsurance;
  const lifeProtectionGap = Math.max(0, totalNeeds - totalDeductions);

  const resetLifeCalc = () => {
    setAnnualIncome("96000");
    setProtectionYears(5);
    setDebtsBalance("350000");
    setOtherObligations("50000");
    setExistingSavings("40000");
    setExistingLifeInsurance("0");
  };

  return (
    <div className="w-full space-y-12">
      {/* TAB SELECTOR */}
      <div className="flex justify-center">
        <div className="p-1.5 rounded-full bg-zinc-100 border border-zinc-200 inline-flex items-center gap-2 shadow-xs">
          <button
            type="button"
            onClick={() => setActiveTab("home")}
            className={`flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold transition-all ${
              activeTab === "home"
                ? "bg-blue-600 text-white shadow-sm"
                : "text-zinc-600 hover:text-zinc-900"
            }`}
          >
            <Home className="w-4 h-4" />
            <span>Cost Reconstrucție Locuință</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("life")}
            className={`flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold transition-all ${
              activeTab === "life"
                ? "bg-blue-600 text-white shadow-sm"
                : "text-zinc-600 hover:text-zinc-900"
            }`}
          >
            <HeartPulse className="w-4 h-4" />
            <span>Nevoie de Asigurare de Viață</span>
          </button>
        </div>
      </div>

      {/* 3A. HOME RECONSTRUCTION COST ESTIMATOR */}
      {activeTab === "home" && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-10 max-w-4xl mx-auto"
        >
          {/* Important Valuation Notice */}
          <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-3 shadow-xs">
            <Info className="w-5 h-5 shrink-0 mt-0.5 text-amber-700" />
            <div className="space-y-1">
              <strong className="block text-amber-950 font-semibold">
                Distincție Critică: Valoare de Reconstrucție vs. Valoare de Piață
              </strong>
              <p className="leading-relaxed text-amber-800">
                Suma asigurată pentru clădire trebuie să acopere costul refacerii structurii fizice la prețurile actuale ale materialelor și manoperei (inclusiv proiectare și demolare). <strong>Valoarea terenului nu se asigură</strong> și nu se include în suma de reconstrucție.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Input Controls */}
            <div className="lg:col-span-7 space-y-6 p-6 sm:p-8 rounded-3xl bg-white border border-zinc-200/80 shadow-sm">
              <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
                <h3 className="text-base font-bold text-zinc-900 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-blue-600" />
                  Parametrii Imobilului
                </h3>
                <button
                  type="button"
                  onClick={resetHomeCalc}
                  className="text-xs text-zinc-500 hover:text-zinc-900 flex items-center gap-1 font-medium transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Resetează
                </button>
              </div>

              {/* Preset quick buttons */}
              <div className="space-y-1.5">
                <label className="text-xs text-zinc-600 font-medium">Exemple ilustrative de pornire (editabile):</label>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => applyHomePreset("standard-apt")}
                    className="px-3 py-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-[11px] text-zinc-700 font-medium transition-colors"
                  >
                    Apartament Standard (75 mp)
                  </button>
                  <button
                    type="button"
                    onClick={() => applyHomePreset("premium-apt")}
                    className="px-3 py-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-[11px] text-zinc-700 font-medium transition-colors"
                  >
                    Apartament Finisaje Înalte (110 mp)
                  </button>
                  <button
                    type="button"
                    onClick={() => applyHomePreset("house")}
                    className="px-3 py-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-[11px] text-zinc-700 font-medium transition-colors"
                  >
                    Casă / Vilă (160 mp)
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs text-zinc-700 font-medium">Tip Proprietate</label>
                  <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value as "apartment" | "house" | "duplex")}
                    className="w-full h-11 px-3 rounded-xl bg-zinc-50 border border-zinc-300 text-zinc-900 text-xs focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="apartment">Apartament (Bloc)</option>
                    <option value="house">Casă / Vilă Individuală</option>
                    <option value="duplex">Duplex / Înșiruită</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs text-zinc-700 font-medium">
                    Suprafață Construită Desfășurată (mp) *
                  </label>
                  <Input
                    type="number"
                    min="10"
                    max="5000"
                    value={builtArea}
                    onChange={(e) => setBuiltArea(e.target.value)}
                    className="h-11 bg-zinc-50 border-zinc-300 text-zinc-900 text-xs rounded-xl"
                  />
                  <span className="text-[10px] text-zinc-500 block">Suprafața construită (uzual utilă × 1.2)</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs text-zinc-700 font-medium">
                    Cost Reconstrucție Structură (Lei / mp) *
                  </label>
                  <Input
                    type="number"
                    min="500"
                    max="20000"
                    value={costPerSqMeter}
                    onChange={(e) => setCostPerSqMeter(e.target.value)}
                    className="h-11 bg-zinc-50 border-zinc-300 text-zinc-900 text-xs rounded-xl"
                  />
                  <span className="text-[10px] text-zinc-500 block">Exemplu ilustrativ: 3.500–5.500 lei/mp</span>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs text-zinc-700 font-medium">
                    Adaos Finisaje & Instalații Speciale (Lei)
                  </label>
                  <Input
                    type="number"
                    min="0"
                    value={finishesAllowance}
                    onChange={(e) => setFinishesAllowance(e.target.value)}
                    className="h-11 bg-zinc-50 border-zinc-300 text-zinc-900 text-xs rounded-xl"
                  />
                  <span className="text-[10px] text-zinc-500 block">Încălzire în pardoseală, pompe căldură etc.</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-zinc-700 font-medium">
                  Cheltuieli Conexe Eligibile (Demolare, Moloz, Avize) (Lei)
                </label>
                <Input
                  type="number"
                  min="0"
                  value={additionalCosts}
                  onChange={(e) => setAdditionalCosts(e.target.value)}
                  className="h-11 bg-zinc-50 border-zinc-300 text-zinc-900 text-xs rounded-xl"
                />
                <span className="text-[10px] text-zinc-500 block">Costuri necesare curățării terenului și proiectării</span>
              </div>
            </div>

            {/* Results Card */}
            <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-zinc-900 text-white border border-zinc-800 shadow-md space-y-6">
              <div className="space-y-4">
                <span className="text-xs uppercase tracking-widest text-blue-400 font-bold block">
                  VALOARE ESTIMATĂ DE RECONSTRUCȚIE
                </span>

                <div className="space-y-1">
                  <div className="text-3xl sm:text-4xl font-heading font-black text-white">
                    {formatRon(totalHomeReconstruction)}
                  </div>
                  <p className="text-xs text-zinc-400">
                    Suma orientativă recomandată pentru asigurarea facultativă a clădirii (exclusiv bunuri și teren).
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-zinc-800/80 border border-zinc-700/60 space-y-2 text-xs">
                  <div className="flex justify-between text-zinc-300">
                    <span>Reconstrucție Structură ({parsedArea} mp × {parsedUnitCost} lei):</span>
                    <strong className="text-white">{formatRon(baseReconstruction)}</strong>
                  </div>
                  {parsedFinishes > 0 && (
                    <div className="flex justify-between text-zinc-300">
                      <span>Supliment Finisaje Speciale:</span>
                      <strong className="text-white">{formatRon(parsedFinishes)}</strong>
                    </div>
                  )}
                  {parsedAdditional > 0 && (
                    <div className="flex justify-between text-zinc-300">
                      <span>Cheltuieli Demolare & Proiectare:</span>
                      <strong className="text-white">{formatRon(parsedAdditional)}</strong>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-zinc-800">
                <div className="text-[11px] text-zinc-400 space-y-1">
                  <p>• Estimare matematică pur educațională. Nu constituie o evaluare ANEVAR sau cotație de primă.</p>
                  <p>• Pentru stabilirea exactă a sumei asigurate, vă recomandăm un audit gratuit al clauzelor.</p>
                </div>

                <Button asChild className="w-full rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-12 shadow-sm">
                  <Link href="/cumpar-casa">
                    Solicită Ofertă pe Baza Estimării <ArrowRight className="w-4 h-4 ml-1.5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* 3B. LIFE INSURANCE NEEDS ESTIMATOR */}
      {activeTab === "life" && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-10 max-w-4xl mx-auto"
        >
          {/* Life Planning Model Notice */}
          <div className="p-5 rounded-2xl bg-blue-50 border border-blue-200 text-blue-900 text-xs flex items-start gap-3 shadow-xs">
            <Info className="w-5 h-5 shrink-0 mt-0.5 text-blue-600" />
            <div className="space-y-1">
              <strong className="block text-blue-950 font-semibold">
                Modelul Deficitului de Protecție Financiară (Coverage Gap)
              </strong>
              <p className="leading-relaxed text-blue-800">
                Calculul estimează capitalul necesar pentru ca familia să poată stinge datoriile existente și să își mențină stilul de viață fără dificultăți financiare în cazul pierderii susținătorului principal de venit.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Inputs */}
            <div className="lg:col-span-7 space-y-6 p-6 sm:p-8 rounded-3xl bg-white border border-zinc-200/80 shadow-sm">
              <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
                <h3 className="text-base font-bold text-zinc-900 flex items-center gap-2">
                  <HeartPulse className="w-4 h-4 text-rose-600" />
                  Venituri & Obligații Familiale
                </h3>
                <button
                  type="button"
                  onClick={resetLifeCalc}
                  className="text-xs text-zinc-500 hover:text-zinc-900 flex items-center gap-1 font-medium transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Resetează
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs text-zinc-700 font-medium">
                    Venit Anual Net de Protejat (Lei) *
                  </label>
                  <Input
                    type="number"
                    min="0"
                    value={annualIncome}
                    onChange={(e) => setAnnualIncome(e.target.value)}
                    className="h-11 bg-zinc-50 border-zinc-300 text-zinc-900 text-xs rounded-xl"
                  />
                  <span className="text-[10px] text-zinc-500 block">Ex: 8.000 lei/lună = 96.000 lei/an</span>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs text-zinc-700 font-medium">
                    Orizont Ani Protecție Venit
                  </label>
                  <select
                    value={protectionYears}
                    onChange={(e) => setProtectionYears(Number(e.target.value))}
                    className="w-full h-11 px-3 rounded-xl bg-zinc-50 border border-zinc-300 text-zinc-900 text-xs focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  >
                    <option value={3}>3 Ani (Tranziție scurtă)</option>
                    <option value={5}>5 Ani (Recomandare standard)</option>
                    <option value={7}>7 Ani (Copii mici)</option>
                    <option value={10}>10 Ani (Protecție extinsă)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs text-zinc-700 font-medium">
                    Sold Credite Ipotecare / Datorii (Lei)
                  </label>
                  <Input
                    type="number"
                    min="0"
                    value={debtsBalance}
                    onChange={(e) => setDebtsBalance(e.target.value)}
                    className="h-11 bg-zinc-50 border-zinc-300 text-zinc-900 text-xs rounded-xl"
                  />
                  <span className="text-[10px] text-zinc-500 block">Pentru stingerea imediată a datoriilor</span>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs text-zinc-700 font-medium">
                    Alte Obligații / Educație Copii (Lei)
                  </label>
                  <Input
                    type="number"
                    min="0"
                    value={otherObligations}
                    onChange={(e) => setOtherObligations(e.target.value)}
                    className="h-11 bg-zinc-50 border-zinc-300 text-zinc-900 text-xs rounded-xl"
                  />
                  <span className="text-[10px] text-zinc-500 block">Fond facultate / cheltuieli neprevăzute</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-zinc-100">
                <div className="space-y-1.5">
                  <label className="text-xs text-zinc-700 font-medium">
                    Economii Lichide Disponibile (Lei)
                  </label>
                  <Input
                    type="number"
                    min="0"
                    value={existingSavings}
                    onChange={(e) => setExistingSavings(e.target.value)}
                    className="h-11 bg-zinc-50 border-zinc-300 text-zinc-900 text-xs rounded-xl"
                  />
                  <span className="text-[10px] text-zinc-500 block">Se deduc din necesarul total</span>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs text-zinc-700 font-medium">
                    Asigurare de Viață Existentă (Capital Asigurat)
                  </label>
                  <Input
                    type="number"
                    min="0"
                    value={existingLifeInsurance}
                    onChange={(e) => setExistingLifeInsurance(e.target.value)}
                    className="h-11 bg-zinc-50 border-zinc-300 text-zinc-900 text-xs rounded-xl"
                  />
                  <span className="text-[10px] text-zinc-500 block">Polițe de viață individuale active</span>
                </div>
              </div>
            </div>

            {/* Life Results Card */}
            <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-zinc-900 text-white border border-zinc-800 shadow-md space-y-6">
              <div className="space-y-4">
                <span className="text-xs uppercase tracking-widest text-emerald-400 font-bold block">
                  DEFICIT ESTIMAT DE PROTECȚIE (COVERAGE GAP)
                </span>

                <div className="space-y-1">
                  <div className="text-3xl sm:text-4xl font-heading font-black text-white">
                    {formatRon(lifeProtectionGap)}
                  </div>
                  <p className="text-xs text-zinc-400">
                    Suma asigurată indicativă recomandată pentru o poliță de viață la termen sau mixtă.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-zinc-800/80 border border-zinc-700/60 space-y-2 text-xs">
                  <div className="flex justify-between text-zinc-300">
                    <span>Înlocuire Venit ({protectionYears} ani):</span>
                    <strong className="text-white">{formatRon(incomeReplacementNeed)}</strong>
                  </div>
                  <div className="flex justify-between text-zinc-300">
                    <span>Stingere Datorii & Credite:</span>
                    <strong className="text-white">{formatRon(parsedDebts)}</strong>
                  </div>
                  {parsedObligations > 0 && (
                    <div className="flex justify-between text-zinc-300">
                      <span>Fond Educație / Urgențe:</span>
                      <strong className="text-white">{formatRon(parsedObligations)}</strong>
                    </div>
                  )}
                  {totalDeductions > 0 && (
                    <div className="flex justify-between text-emerald-400 pt-1 border-t border-zinc-700">
                      <span>Deduceri (Economii + Asigurare):</span>
                      <strong>- {formatRon(totalDeductions)}</strong>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-zinc-800">
                <div className="text-[11px] text-zinc-400 space-y-1">
                  <p>• Model simplificat de planificare financiară orientativă.</p>
                  <p>• Nu include inflația viitoare sau randamentele din investiții.</p>
                </div>

                <Button asChild className="w-full rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs h-12 shadow-sm">
                  <Link href="/verifica-polita">
                    Consultanță Structurare Asigurare Viață <ArrowRight className="w-4 h-4 ml-1.5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
