"use client";

import * as React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldAlert,
  User,
  Home,
  Car,
  Briefcase,
  Building2,
  Gem,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Download,
  RotateCcw,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Lock,
  Copy,
  Check,
  ExternalLink,
  DollarSign,
  Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  UserProfileType,
  PROFILE_OPTIONS,
  QuestionnaireAnswers,
  FinancialWorksheetData,
  RiskDomainAssessment,
  evaluateRiskProfile,
  calculateFinancialGaps,
  generateRiskProfilePdf,
  ProtectionStatus,
} from "@/lib/risk-profile";
import Link from "next/link";

export function RiskProfileEngine() {
  const [lang, setLang] = useState<"ro" | "en">("ro");
  const isRo = lang === "ro";

  // Active Wizard Step
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Selected Profiles (Multi-select)
  const [selectedProfiles, setSelectedProfiles] = useState<UserProfileType[]>([
    "individual",
    "homeowner",
    "vehicle",
  ]);

  // Answers State
  const [answers, setAnswers] = useState<QuestionnaireAnswers>({
    hasDependants: true,
    hasExistingLifePolicy: "no",
    hasPrivateHealth: "no",
    travelsInternationally: "frequent",
    hasTravelPolicy: "none",
    ownsProperty: "primary_home",
    knowsReconstructionValue: "pad_only",
    hasOptionalHomePolicy: "no",
    rentsToTenants: false,
    hasCasco: "rca_only",
    isSelfEmployed: false,
    handlesClientData: false,
    hasProfessionalIndemnity: "no",
    hasCyberPolicy: "no",
    hasBusinessInterruptionCoverage: "no",
    hasDirectorsLiability: "no",
    hasAgreedValueClause: "no",
  });

  // Financial Worksheet State
  const [worksheet, setWorksheet] = useState<FinancialWorksheetData>({
    estimatedReconstructionCost: 150000,
    currentHomeSumInsured: 20000,
    estimatedContentsValue: 30000,
    currentContentsSumInsured: 0,
    annualNetIncome: 35000,
    replacementYears: 5,
    currentLifeSumInsured: 0,
    annualBusinessExpenses: 50000,
    currentBiLimit: 0,
    currency: "EUR",
  });

  const [copiedQuestionIndex, setCopiedQuestionIndex] = useState<number | null>(null);

  // Toggle profile selection
  const toggleProfile = (id: UserProfileType) => {
    if (selectedProfiles.includes(id)) {
      if (selectedProfiles.length > 1) {
        setSelectedProfiles(selectedProfiles.filter((p) => p !== id));
      }
    } else {
      setSelectedProfiles([...selectedProfiles, id]);
    }
  };

  // Reset entire engine
  const handleReset = () => {
    setSelectedProfiles(["individual", "homeowner", "vehicle"]);
    setAnswers({
      hasDependants: false,
      hasExistingLifePolicy: "unclear",
      hasPrivateHealth: "unclear",
      travelsInternationally: "occasional",
      hasTravelPolicy: "none",
      ownsProperty: "none",
      knowsReconstructionValue: "no",
      hasOptionalHomePolicy: "unclear",
      rentsToTenants: false,
      hasCasco: "none",
      isSelfEmployed: false,
      handlesClientData: false,
      hasProfessionalIndemnity: "unclear",
      hasCyberPolicy: "unclear",
      hasBusinessInterruptionCoverage: "unclear",
      hasDirectorsLiability: "unclear",
      hasAgreedValueClause: "unclear",
    });
    setWorksheet({
      estimatedReconstructionCost: undefined,
      currentHomeSumInsured: undefined,
      estimatedContentsValue: undefined,
      currentContentsSumInsured: undefined,
      annualNetIncome: undefined,
      replacementYears: 5,
      currentLifeSumInsured: undefined,
      annualBusinessExpenses: undefined,
      currentBiLimit: undefined,
      currency: "EUR",
    });
    setCurrentStep(1);
  };

  // Evaluated Assessments & Gaps
  const assessments = evaluateRiskProfile(selectedProfiles, answers);
  const gaps = calculateFinancialGaps(worksheet);

  // PDF Export
  const handleDownloadPdf = () => {
    const doc = generateRiskProfilePdf(selectedProfiles, assessments, worksheet, gaps, lang);
    doc.save(`profil-risc-${Date.now()}.pdf`);
  };

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedQuestionIndex(idx);
    setTimeout(() => setCopiedQuestionIndex(null), 2000);
  };

  const getStatusBadge = (status: ProtectionStatus) => {
    switch (status) {
      case "exposure_identified":
        return <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/30 font-semibold">{isRo ? "Expunere Identificată" : "Exposure Identified"}</span>;
      case "needs_review":
        return <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 font-semibold">{isRo ? "Verificare Clauze" : "Review Terms"}</span>;
      case "specialist_clarification":
        return <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/30 font-semibold">{isRo ? "Clarificare Specialist" : "Clarification Needed"}</span>;
      case "existing_reported":
        return <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-semibold">{isRo ? "Protecție Raportată" : "Reported Covered"}</span>;
      default:
        return <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-zinc-800 text-zinc-400 border border-zinc-700 font-semibold">{isRo ? "Informație Lipsă" : "Missing Info"}</span>;
    }
  };

  return (
    <div className="w-full space-y-8 max-w-5xl mx-auto">
      {/* 1. TOP WIZARD HEADER & TOOLBAR */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 sm:p-5 rounded-3xl bg-zinc-900/80 border border-zinc-800">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 text-xs">
          {[
            { num: 1, labelRo: "1. Profile", labelEn: "1. Profiles" },
            { num: 2, labelRo: "2. Chestionar", labelEn: "2. Questions" },
            { num: 3, labelRo: "3. Worksheet", labelEn: "3. Worksheet" },
            { num: 4, labelRo: "4. Rezultate", labelEn: "4. Results" },
          ].map((s) => (
            <button
              key={s.num}
              type="button"
              onClick={() => setCurrentStep(s.num)}
              className={`px-3 py-1.5 rounded-xl font-medium transition-all shrink-0 ${
                currentStep === s.num
                  ? "bg-blue-600 text-white shadow-md font-bold"
                  : "bg-zinc-950 text-zinc-400 hover:text-white border border-zinc-800"
              }`}
            >
              {isRo ? s.labelRo : s.labelEn}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-3 text-xs border-t sm:border-t-0 pt-3 sm:pt-0 border-zinc-800">
          <Button
            type="button"
            variant="outline"
            onClick={handleDownloadPdf}
            className="rounded-full border-zinc-800 hover:bg-zinc-800 text-zinc-300 h-9 px-3.5 flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5 text-blue-400" />
            <span>PDF Raport</span>
          </Button>

          <button
            type="button"
            onClick={handleReset}
            className="text-zinc-500 hover:text-zinc-300 transition-colors flex items-center gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{isRo ? "Resetează" : "Reset"}</span>
          </button>

          <div className="flex items-center gap-1 p-1 rounded-full bg-zinc-950 border border-zinc-800">
            <button
              type="button"
              onClick={() => setLang("ro")}
              className={`px-2.5 py-0.5 rounded-full font-medium ${lang === "ro" ? "bg-blue-600 text-white" : "text-zinc-400 hover:text-white"}`}
            >
              RO
            </button>
            <button
              type="button"
              onClick={() => setLang("en")}
              className={`px-2.5 py-0.5 rounded-full font-medium ${lang === "en" ? "bg-blue-600 text-white" : "text-zinc-400 hover:text-white"}`}
            >
              EN
            </button>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* STEP 1: PROFILE SELECTOR (MULTI-SELECT) */}
      {/* ======================================================== */}
      {currentStep === 1 && (
        <div className="p-6 sm:p-8 rounded-[2.5rem] bg-zinc-950 border border-zinc-800 shadow-xl space-y-6">
          <div className="space-y-1 pb-4 border-b border-zinc-800">
            <span className="text-[10px] uppercase font-bold text-blue-400 tracking-wider">
              {isRo ? "PASUL 1 DIN 4: SELECȚIE PROFILURI" : "STEP 1 OF 4: PROFILE SELECTION"}
            </span>
            <h3 className="text-xl font-heading font-bold text-white">
              {isRo ? "Ce categorii de patrimoniu sau activitate dorești să evaluezi?" : "Which risk and asset categories apply to you?"}
            </h3>
            <p className="text-xs text-zinc-400">
              {isRo
                ? "Poți selecta multiple profiluri concomitent (ex: Familie + Proprietar Imobil + Auto)."
                : "You can select multiple profiles simultaneously (e.g. Household + Homeowner + Auto)."}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PROFILE_OPTIONS.map((opt) => {
              const isSelected = selectedProfiles.includes(opt.id);
              return (
                <div
                  key={opt.id}
                  onClick={() => toggleProfile(opt.id)}
                  className={`cursor-pointer p-5 rounded-2xl border transition-all space-y-2 ${
                    isSelected
                      ? "bg-blue-600/10 border-blue-500 shadow-lg"
                      : "bg-zinc-900/40 border-zinc-800/80 hover:border-zinc-700"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-heading font-bold text-sm text-white">
                      {isRo ? opt.titleRo : opt.titleEn}
                    </span>
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center border text-xs ${
                        isSelected
                          ? "bg-blue-600 border-blue-600 text-white"
                          : "border-zinc-700 bg-zinc-800 text-transparent"
                      }`}
                    >
                      ✓
                    </div>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {isRo ? opt.descRo : opt.descEn}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="flex justify-end pt-4 border-t border-zinc-800">
            <Button
              type="button"
              onClick={() => setCurrentStep(2)}
              className="rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-11 px-6 flex items-center gap-2"
            >
              <span>{isRo ? "Continuă spre Chestionar" : "Proceed to Questions"}</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* STEP 2: ADAPTIVE QUESTIONNAIRE */}
      {/* ======================================================== */}
      {currentStep === 2 && (
        <div className="p-6 sm:p-8 rounded-[2.5rem] bg-zinc-950 border border-zinc-800 shadow-xl space-y-8">
          <div className="space-y-1 pb-4 border-b border-zinc-800">
            <span className="text-[10px] uppercase font-bold text-blue-400 tracking-wider">
              {isRo ? "PASUL 2 DIN 4: CHESTIONAR DE EXPUNERE" : "STEP 2 OF 4: EXPOSURE QUESTIONNAIRE"}
            </span>
            <h3 className="text-xl font-heading font-bold text-white">
              {isRo ? "Răspunde la întrebările relevante pentru profilurile alese" : "Answer questions relevant to your selected profiles"}
            </h3>
            <p className="text-xs text-zinc-400">
              {isRo
                ? "Fără date personale sau numere de poliță. Poți lăsa necompletat dacă nu cunoști răspunsul."
                : "No personal data or policy numbers required. Skip any question if unsure."}
            </p>
          </div>

          <div className="space-y-6 text-xs">
            {/* INDIVIDUAL SECTION */}
            {selectedProfiles.includes("individual") && (
              <div className="p-5 rounded-2xl bg-zinc-900/50 border border-zinc-800 space-y-4">
                <h4 className="text-sm font-bold text-blue-400 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{isRo ? "Persoană Fizică & Familie" : "Individual & Family"}</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-zinc-300 font-medium">Ai persoane în întreținere (copii / părinți)?</label>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setAnswers({ ...answers, hasDependants: true })}
                        className={`flex-1 py-2 rounded-xl border text-xs ${answers.hasDependants ? "bg-blue-600 text-white border-blue-600" : "bg-zinc-900 text-zinc-400 border-zinc-800"}`}
                      >
                        {isRo ? "Da" : "Yes"}
                      </button>
                      <button
                        type="button"
                        onClick={() => setAnswers({ ...answers, hasDependants: false })}
                        className={`flex-1 py-2 rounded-xl border text-xs ${!answers.hasDependants ? "bg-blue-600 text-white border-blue-600" : "bg-zinc-900 text-zinc-400 border-zinc-800"}`}
                      >
                        {isRo ? "Nu" : "No"}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-zinc-300 font-medium">Deții o asigurare de viață activă?</label>
                    <select
                      value={answers.hasExistingLifePolicy}
                      onChange={(e) => setAnswers({ ...answers, hasExistingLifePolicy: e.target.value as "yes" | "no" | "unclear" })}
                      className="w-full h-10 px-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none"
                    >
                      <option value="yes">{isRo ? "Da, dețin o poliță de viață" : "Yes, I have life insurance"}</option>
                      <option value="no">{isRo ? "Nu dețin" : "No"}</option>
                      <option value="unclear">{isRo ? "Doar poliță atașată la credit (bancară)" : "Only bank loan policy"}</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-zinc-300 font-medium">Deții asigurare privată de sănătate (spitalizare)?</label>
                    <select
                      value={answers.hasPrivateHealth}
                      onChange={(e) => setAnswers({ ...answers, hasPrivateHealth: e.target.value as "yes" | "no" | "unclear" })}
                      className="w-full h-10 px-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none"
                    >
                      <option value="yes">{isRo ? "Da, cu spitalizare inclusă" : "Yes, with inpatient surgery"}</option>
                      <option value="no">{isRo ? "Nu dețin (doar abonament clinică/CASS)" : "No (only outpatient subscription)"}</option>
                      <option value="unclear">{isRo ? "Nu sunt sigur de acoperiri" : "Unsure about coverage"}</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-zinc-300 font-medium">Frecvență călătorii în străinătate:</label>
                    <select
                      value={answers.travelsInternationally}
                      onChange={(e) => setAnswers({ ...answers, travelsInternationally: e.target.value as "frequent" | "occasional" | "rare" })}
                      className="w-full h-10 px-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none"
                    >
                      <option value="frequent">{isRo ? "Frecvent (3+ ieșiri pe an)" : "Frequent (3+ trips/year)"}</option>
                      <option value="occasional">{isRo ? "Ocazional (1-2 vacanțe pe an)" : "Occasional (1-2 trips/year)"}</option>
                      <option value="rare">{isRo ? "Rar / Deloc" : "Rare / Never"}</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* HOMEOWNER SECTION */}
            {selectedProfiles.includes("homeowner") && (
              <div className="p-5 rounded-2xl bg-zinc-900/50 border border-zinc-800 space-y-4">
                <h4 className="text-sm font-bold text-amber-400 flex items-center gap-2">
                  <Home className="w-4 h-4" />
                  <span>{isRo ? "Proprietate Imobiliară & Locuință" : "Home & Property"}</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-zinc-300 font-medium">Ce asigurare de locuință deții în prezent?</label>
                    <select
                      value={answers.knowsReconstructionValue}
                      onChange={(e) => setAnswers({ ...answers, knowsReconstructionValue: e.target.value as "yes" | "no" | "pad_only" })}
                      className="w-full h-10 px-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none"
                    >
                      <option value="yes">{isRo ? "Facultativă completă + PAD" : "Comprehensive + PAD"}</option>
                      <option value="pad_only">{isRo ? "Doar PAD obligatoriu (max 20.000 EUR)" : "Only mandatory PAD (20k EUR cap)"}</option>
                      <option value="no">{isRo ? "Niciuna / Expirată" : "None / Expired"}</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-zinc-300 font-medium">Închiriezi imobilul către chiriași?</label>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setAnswers({ ...answers, rentsToTenants: true })}
                        className={`flex-1 py-2 rounded-xl border text-xs ${answers.rentsToTenants ? "bg-amber-600 text-white border-amber-600" : "bg-zinc-900 text-zinc-400 border-zinc-800"}`}
                      >
                        {isRo ? "Da, este închiriat" : "Yes, rented out"}
                      </button>
                      <button
                        type="button"
                        onClick={() => setAnswers({ ...answers, rentsToTenants: false })}
                        className={`flex-1 py-2 rounded-xl border text-xs ${!answers.rentsToTenants ? "bg-amber-600 text-white border-amber-600" : "bg-zinc-900 text-zinc-400 border-zinc-800"}`}
                      >
                        {isRo ? "Nu, locuință proprie" : "No, primary home"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* VEHICLE SECTION */}
            {selectedProfiles.includes("vehicle") && (
              <div className="p-5 rounded-2xl bg-zinc-900/50 border border-zinc-800 space-y-4">
                <h4 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                  <Car className="w-4 h-4" />
                  <span>{isRo ? "Vehicule & Mobilitate Auto" : "Vehicles & Mobility"}</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-zinc-300 font-medium">Nivel protecție CASCO actual:</label>
                    <select
                      value={answers.hasCasco}
                      onChange={(e) => setAnswers({ ...answers, hasCasco: e.target.value as "all_risk" | "basic" | "rca_only" | "none" })}
                      className="w-full h-10 px-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none"
                    >
                      <option value="all_risk">{isRo ? "CASCO All-Risk complet" : "CASCO All-Risk"}</option>
                      <option value="basic">{isRo ? "CASCO Economic / Avarii majore" : "Basic CASCO"}</option>
                      <option value="rca_only">{isRo ? "Doar RCA obligatoriu" : "RCA only"}</option>
                      <option value="none">{isRo ? "Fără poliță auto" : "None"}</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* PROFESSIONAL SECTION */}
            {selectedProfiles.includes("professional") && (
              <div className="p-5 rounded-2xl bg-zinc-900/50 border border-zinc-800 space-y-4">
                <h4 className="text-sm font-bold text-purple-400 flex items-center gap-2">
                  <Briefcase className="w-4 h-4" />
                  <span>{isRo ? "Profesii Liberale & Consultanță" : "Professional & Consulting"}</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-zinc-300 font-medium">Deții asigurare de răspundere profesională (E&O)?</label>
                    <select
                      value={answers.hasProfessionalIndemnity}
                      onChange={(e) => setAnswers({ ...answers, hasProfessionalIndemnity: e.target.value as "yes" | "no" | "unclear" })}
                      className="w-full h-10 px-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none"
                    >
                      <option value="yes">{isRo ? "Da, activă" : "Yes, active"}</option>
                      <option value="no">{isRo ? "Nu dețin" : "No"}</option>
                      <option value="unclear">{isRo ? "Doar poliță obligatorie (limită minimă)" : "Mandatory minimum only"}</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-zinc-300 font-medium">Gestionezi baze de date sau sisteme IT ale clienților?</label>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setAnswers({ ...answers, handlesClientData: true })}
                        className={`flex-1 py-2 rounded-xl border text-xs ${answers.handlesClientData ? "bg-purple-600 text-white border-purple-600" : "bg-zinc-900 text-zinc-400 border-zinc-800"}`}
                      >
                        {isRo ? "Da" : "Yes"}
                      </button>
                      <button
                        type="button"
                        onClick={() => setAnswers({ ...answers, handlesClientData: false })}
                        className={`flex-1 py-2 rounded-xl border text-xs ${!answers.handlesClientData ? "bg-purple-600 text-white border-purple-600" : "bg-zinc-900 text-zinc-400 border-zinc-800"}`}
                      >
                        {isRo ? "Nu" : "No"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* BUSINESS SECTION */}
            {selectedProfiles.includes("business") && (
              <div className="p-5 rounded-2xl bg-zinc-900/50 border border-zinc-800 space-y-4">
                <h4 className="text-sm font-bold text-sky-400 flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  <span>{isRo ? "Companie & IMM" : "Business & SME"}</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-zinc-300 font-medium">Deții clauză de Pierderi Financiare (Business Interruption)?</label>
                    <select
                      value={answers.hasBusinessInterruptionCoverage}
                      onChange={(e) => setAnswers({ ...answers, hasBusinessInterruptionCoverage: e.target.value as "yes" | "no" | "unclear" })}
                      className="w-full h-10 px-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none"
                    >
                      <option value="yes">{isRo ? "Da, acoperă salariile și profitul nerealizat" : "Yes, covers payroll & profit"}</option>
                      <option value="no">{isRo ? "Nu dețin" : "No"}</option>
                      <option value="unclear">{isRo ? "Doar asigurare simplă de clădiri/utilaje" : "Only property policy"}</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-zinc-300 font-medium">Deții poliță D&O (Răspunderea Administratorilor)?</label>
                    <select
                      value={answers.hasDirectorsLiability}
                      onChange={(e) => setAnswers({ ...answers, hasDirectorsLiability: e.target.value as "yes" | "no" | "unclear" })}
                      className="w-full h-10 px-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none"
                    >
                      <option value="yes">{isRo ? "Da, activă" : "Yes, active"}</option>
                      <option value="no">{isRo ? "Nu dețin" : "No"}</option>
                      <option value="unclear">{isRo ? "Nu știu" : "Unsure"}</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* PRIVATE CLIENT SECTION */}
            {selectedProfiles.includes("private_client") && (
              <div className="p-5 rounded-2xl bg-zinc-900/50 border border-zinc-800 space-y-4">
                <h4 className="text-sm font-bold text-rose-400 flex items-center gap-2">
                  <Gem className="w-4 h-4" />
                  <span>{isRo ? "Private Client & Active de Lux" : "Private Client & Luxury Assets"}</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-zinc-300 font-medium">Deții clauză de Valoare Agreată (Agreed Value) pe baza evaluării?</label>
                    <select
                      value={answers.hasAgreedValueClause}
                      onChange={(e) => setAnswers({ ...answers, hasAgreedValueClause: e.target.value as "yes" | "no" | "unclear" })}
                      className="w-full h-10 px-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none"
                    >
                      <option value="yes">{isRo ? "Da, valoare agreată fără depreciere" : "Yes, agreed value without depreciation"}</option>
                      <option value="no">{isRo ? "Nu, polițe standard de serie" : "No, standard off-the-shelf policies"}</option>
                      <option value="unclear">{isRo ? "Nu sunt sigur" : "Unsure"}</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-between pt-4 border-t border-zinc-800">
            <Button
              type="button"
              variant="outline"
              onClick={() => setCurrentStep(1)}
              className="rounded-full border-zinc-800 text-zinc-300 text-xs h-11 px-5 flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{isRo ? "Înapoi la Profile" : "Back to Profiles"}</span>
            </Button>

            <Button
              type="button"
              onClick={() => setCurrentStep(3)}
              className="rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-11 px-6 flex items-center gap-2"
            >
              <span>{isRo ? "Mergi la Worksheet Financiar" : "Proceed to Worksheet"}</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* STEP 3: FINANCIAL GAP WORKSHEET (OPTIONAL) */}
      {/* ======================================================== */}
      {currentStep === 3 && (
        <div className="p-6 sm:p-8 rounded-[2.5rem] bg-zinc-950 border border-zinc-800 shadow-xl space-y-6">
          <div className="space-y-1 pb-4 border-b border-zinc-800">
            <span className="text-[10px] uppercase font-bold text-blue-400 tracking-wider">
              {isRo ? "PASUL 3 DIN 4: ESTIMATOR DEFICIT FINANCIAR (OPȚIONAL)" : "STEP 3 OF 4: FINANCIAL GAP WORKSHEET (OPTIONAL)"}
            </span>
            <h3 className="text-xl font-heading font-bold text-white">
              {isRo ? "Compară valorile estimate cu limitele actuale din polițe" : "Compare estimated asset values with current insured sums"}
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              {isRo
                ? "Calculele de mai jos folosesc formule matematice transparente pentru a evidenția potențiala subasigurare sau deficitul de protecție."
                : "The calculations below compare user estimates using explicit formulas to highlight underinsurance or coverage gaps."}
            </p>
          </div>

          <div className="space-y-6 text-xs">
            {/* PROPERTY RECONSTRUCTION GAP */}
            <div className="p-5 rounded-2xl bg-zinc-900/50 border border-zinc-800 space-y-4">
              <h4 className="font-bold text-white flex items-center justify-between">
                <span>{isRo ? "1. Clădire & Locuință (Cost Reconstrucție vs. Sumă Asigurată)" : "1. Property Reconstruction Gap"}</span>
                <span className="text-xs text-blue-400 font-mono">{worksheet.currency}</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-zinc-400">Cost estimat de reconstrucție (de nou):</label>
                  <Input
                    type="number"
                    value={worksheet.estimatedReconstructionCost || ""}
                    onChange={(e) => setWorksheet({ ...worksheet, estimatedReconstructionCost: e.target.value ? parseFloat(e.target.value) : undefined })}
                    className="h-10 bg-zinc-900 border-zinc-800 text-white rounded-xl"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-zinc-400">Sumă asigurată curentă pe clădire:</label>
                  <Input
                    type="number"
                    value={worksheet.currentHomeSumInsured || ""}
                    onChange={(e) => setWorksheet({ ...worksheet, currentHomeSumInsured: e.target.value ? parseFloat(e.target.value) : undefined })}
                    className="h-10 bg-zinc-900 border-zinc-800 text-white rounded-xl"
                  />
                </div>
              </div>

              {gaps.homeGap && (
                <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-300 font-mono text-[11px] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span>{gaps.homeGap.formula}</span>
                  <span className={`font-bold px-2 py-0.5 rounded-full ${gaps.homeGap.status === "underinsured" ? "bg-rose-500/10 text-rose-400 border border-rose-500/20" : "bg-emerald-500/10 text-emerald-400"}`}>
                    {gaps.homeGap.status === "underinsured" ? isRo ? "Subasigurare Detectată" : "Underinsured" : isRo ? "Acoperire Adecvată" : "Adequate"}
                  </span>
                </div>
              )}
            </div>

            {/* LIFE / INCOME GAP */}
            <div className="p-5 rounded-2xl bg-zinc-900/50 border border-zinc-800 space-y-4">
              <h4 className="font-bold text-white flex items-center justify-between">
                <span>{isRo ? "2. Protecție Venit Familie (Venit Anual × Ani vs. Asigurare Viață)" : "2. Family Income Protection Gap"}</span>
                <span className="text-xs text-blue-400 font-mono">{worksheet.currency}</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-zinc-400">Venit net anual de protejat:</label>
                  <Input
                    type="number"
                    value={worksheet.annualNetIncome || ""}
                    onChange={(e) => setWorksheet({ ...worksheet, annualNetIncome: e.target.value ? parseFloat(e.target.value) : undefined })}
                    className="h-10 bg-zinc-900 border-zinc-800 text-white rounded-xl"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-zinc-400">Orizont protecție (Ani):</label>
                  <select
                    value={worksheet.replacementYears}
                    onChange={(e) => setWorksheet({ ...worksheet, replacementYears: parseInt(e.target.value, 10) })}
                    className="w-full h-10 px-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none"
                  >
                    <option value={3}>3 Ani</option>
                    <option value={5}>5 Ani (Recomandat)</option>
                    <option value={10}>10 Ani</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-zinc-400">Sumă asigurată de viață curentă:</label>
                  <Input
                    type="number"
                    value={worksheet.currentLifeSumInsured || ""}
                    onChange={(e) => setWorksheet({ ...worksheet, currentLifeSumInsured: e.target.value ? parseFloat(e.target.value) : undefined })}
                    className="h-10 bg-zinc-900 border-zinc-800 text-white rounded-xl"
                  />
                </div>
              </div>

              {gaps.lifeGap && (
                <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-300 font-mono text-[11px] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span>{gaps.lifeGap.formula}</span>
                  <span className={`font-bold px-2 py-0.5 rounded-full ${gaps.lifeGap.status === "gap" ? "bg-rose-500/10 text-rose-400 border border-rose-500/20" : "bg-emerald-500/10 text-emerald-400"}`}>
                    {gaps.lifeGap.status === "gap" ? isRo ? `Deficit: ${Math.abs(gaps.lifeGap.difference)} ${worksheet.currency}` : `Gap: ${Math.abs(gaps.lifeGap.difference)} ${worksheet.currency}` : isRo ? "Acoperit" : "Adequate"}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-between pt-4 border-t border-zinc-800">
            <Button
              type="button"
              variant="outline"
              onClick={() => setCurrentStep(2)}
              className="rounded-full border-zinc-800 text-zinc-300 text-xs h-11 px-5 flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{isRo ? "Înapoi la Chestionar" : "Back to Questions"}</span>
            </Button>

            <Button
              type="button"
              onClick={() => setCurrentStep(4)}
              className="rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-11 px-6 flex items-center gap-2"
            >
              <span>{isRo ? "Vezi Raportul & Rezultatele" : "View Results & Report"}</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* STEP 4: RESULTS & ACTION PLAN */}
      {/* ======================================================== */}
      {currentStep === 4 && (
        <div className="space-y-8">
          <div className="p-6 sm:p-8 rounded-[2.5rem] bg-zinc-950 border border-zinc-800 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold text-blue-400 tracking-wider">
                  {isRo ? "REZULTATE EVALUARE RISCURI" : "RISK ASSESSMENT RESULTS"}
                </span>
                <h3 className="text-xl font-heading font-bold text-white">
                  {isRo ? "Inventar Expuneri & Recomandări de Verificare" : "Exposure Inventory & Review Recommendations"}
                </h3>
              </div>
              <Button
                type="button"
                variant="outline"
                onClick={handleDownloadPdf}
                className="rounded-full border-zinc-800 hover:bg-zinc-800 text-zinc-300 text-xs h-10 px-4 flex items-center gap-1.5 shrink-0"
              >
                <Download className="w-4 h-4 text-blue-400" />
                <span>{isRo ? "Descarcă Raport PDF" : "Download PDF Report"}</span>
              </Button>
            </div>

            {/* DOMAIN ASSESSMENT CARDS */}
            <div className="space-y-4 text-xs">
              {assessments.map((item) => (
                <div
                  key={item.id}
                  className="p-5 rounded-2xl bg-zinc-900/50 border border-zinc-800/80 space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <h4 className="text-sm font-heading font-bold text-white">
                      {isRo ? item.titleRo : item.titleEn}
                    </h4>
                    <div>{getStatusBadge(item.status)}</div>
                  </div>

                  <p className="text-zinc-300 leading-relaxed text-xs">
                    {isRo ? item.triggerReasonRo : item.triggerReasonEn}
                  </p>

                  <div className="p-3.5 rounded-xl bg-zinc-950/80 border border-zinc-800 space-y-1.5">
                    <span className="text-[10px] font-bold uppercase text-blue-400 tracking-wider block">
                      {isRo ? "Întrebare Recomandată pentru Broker:" : "Suggested Question for Advisor:"}
                    </span>
                    <div className="flex items-start justify-between gap-2 text-zinc-200">
                      <p className="italic">{isRo ? item.suggestedQuestionRo : item.suggestedQuestionEn}</p>
                      <button
                        type="button"
                        onClick={() => handleCopy(isRo ? item.suggestedQuestionRo : item.suggestedQuestionEn, 99)}
                        className="p-1.5 text-zinc-400 hover:text-white rounded-lg bg-zinc-900 border border-zinc-800 shrink-0"
                        title={isRo ? "Copiază" : "Copy"}
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {item.relatedLink && (
                    <div className="pt-2 flex justify-end">
                      <Link
                        href={item.relatedLink.url}
                        className="text-blue-400 hover:text-blue-300 inline-flex items-center gap-1 font-semibold text-[11px]"
                      >
                        <span>{isRo ? item.relatedLink.labelRo : item.relatedLink.labelEn}</span>
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* ADVISORY CTA */}
            <div className="p-6 rounded-3xl bg-blue-600/10 border border-blue-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <h4 className="text-sm font-bold text-white">
                  {isRo ? "Dorești un audit profesionist al polițelor tale?" : "Want a professional audit of your existing policies?"}
                </h4>
                <p className="text-xs text-zinc-400">
                  {isRo ? "Trimite polițele pentru o verificare independentă a excluderilor și franșizelor." : "Submit your contracts for an independent terms and deductible audit."}
                </p>
              </div>
              <Button asChild className="rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-11 px-6 shrink-0">
                <Link href="/verifica-polita">
                  {isRo ? "Auditează Polițele &rarr;" : "Audit Policies &rarr;"}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* 2. PRIVACY GUARANTEE */}
      <div className="p-6 rounded-3xl bg-zinc-900/40 border border-zinc-800 space-y-2 text-xs text-zinc-400">
        <div className="flex items-center gap-2 text-zinc-300 font-bold">
          <Lock className="w-4 h-4 text-emerald-400" />
          <span>{isRo ? "Confidențialitate Totală & Stocare Volatilă" : "Total Privacy & In-Memory Execution"}</span>
        </div>
        <p className="leading-relaxed">
          {isRo
            ? "Datele din acest chestionar sunt procesate exclusiv în memoria locală a browserului tău. Nu se transmit automat către baze de date, servere sau terți. Descarcă raportul PDF înainte de a părăsi pagina."
            : "This assessment runs strictly in browser memory. No information is transmitted to databases or third parties. Download your PDF report before leaving."}
        </p>
      </div>
    </div>
  );
}
