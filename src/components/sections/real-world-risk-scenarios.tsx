"use client";

import * as React from "react";
import { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Car,
  Home,
  Users,
  Activity,
  Plane,
  Briefcase,
  UserCheck,
  Building,
  ShieldCheck,
  ShieldAlert,
  CloudRain,
  Key,
  Truck,
  HeartPulse,
  Droplets,
  Flame,
  CalendarX,
  Heart,
  Building2,
  Stethoscope,
  Globe,
  TrendingDown,
  Server,
  Shield,
  Zap,
  Scale,
  AlertTriangle,
  Wrench,
  Lock,
  CreditCard,
  FileText,
  Package,
  Compass,
  ArrowRight,
  X,
  ChevronRight
} from "lucide-react";
import {
  riskScenarios,
  RISK_CATEGORIES,
  ASSET_PERSONAS,
  RiskCategory,
  AssetPersona,
  RiskScenario
} from "@/data/riskScenariosData";
import { Button } from "@/components/ui/button";

const ICON_MAP: Record<string, React.ReactNode> = {
  Car: <Car className="w-4 h-4" aria-hidden="true" />,
  Home: <Home className="w-4 h-4" aria-hidden="true" />,
  Users: <Users className="w-4 h-4" aria-hidden="true" />,
  Activity: <Activity className="w-4 h-4" aria-hidden="true" />,
  Plane: <Plane className="w-4 h-4" aria-hidden="true" />,
  Briefcase: <Briefcase className="w-4 h-4" aria-hidden="true" />,
  UserCheck: <UserCheck className="w-4 h-4" aria-hidden="true" />,
  Building: <Building className="w-4 h-4" aria-hidden="true" />,
  ShieldCheck: <ShieldCheck className="w-4 h-4" aria-hidden="true" />,
  ShieldAlert: <ShieldAlert className="w-4 h-4" aria-hidden="true" />,
  CloudRain: <CloudRain className="w-4 h-4" aria-hidden="true" />,
  Key: <Key className="w-4 h-4" aria-hidden="true" />,
  Truck: <Truck className="w-4 h-4" aria-hidden="true" />,
  HeartPulse: <HeartPulse className="w-4 h-4" aria-hidden="true" />,
  Droplets: <Droplets className="w-4 h-4" aria-hidden="true" />,
  Flame: <Flame className="w-4 h-4" aria-hidden="true" />,
  CalendarX: <CalendarX className="w-4 h-4" aria-hidden="true" />,
  Heart: <Heart className="w-4 h-4" aria-hidden="true" />,
  Building2: <Building2 className="w-4 h-4" aria-hidden="true" />,
  Stethoscope: <Stethoscope className="w-4 h-4" aria-hidden="true" />,
  Globe: <Globe className="w-4 h-4" aria-hidden="true" />,
  TrendingDown: <TrendingDown className="w-4 h-4" aria-hidden="true" />,
  Server: <Server className="w-4 h-4" aria-hidden="true" />,
  Shield: <Shield className="w-4 h-4" aria-hidden="true" />,
  Zap: <Zap className="w-4 h-4" aria-hidden="true" />,
  Scale: <Scale className="w-4 h-4" aria-hidden="true" />,
  AlertTriangle: <AlertTriangle className="w-4 h-4" aria-hidden="true" />,
  Wrench: <Wrench className="w-4 h-4" aria-hidden="true" />,
  Lock: <Lock className="w-4 h-4" aria-hidden="true" />,
  CreditCard: <CreditCard className="w-4 h-4" aria-hidden="true" />,
  FileText: <FileText className="w-4 h-4" aria-hidden="true" />,
  Package: <Package className="w-4 h-4" aria-hidden="true" />,
  Compass: <Compass className="w-4 h-4" aria-hidden="true" />
};

interface RealWorldRiskScenariosProps {
  isHomePagePreview?: boolean;
}

export function RealWorldRiskScenarios({ isHomePagePreview = false }: RealWorldRiskScenariosProps) {
  const [selectedCategory, setSelectedCategory] = useState<RiskCategory | "all">("all");
  const [selectedPersona, setSelectedPersona] = useState<AssetPersona | "all">("all");
  const [activeScenario, setActiveScenario] = useState<RiskScenario | null>(null);
  
  // Exposure calculator state
  const [exposureAssetType, setExposureAssetType] = useState<"auto" | "home" | "income" | "business" | "project">("auto");
  const [assetValueEUR, setAssetValueEUR] = useState<number>(65000);

  const modalContainerRef = useRef<HTMLDivElement>(null);

  const formatCurrency = (val: number) => {
    if (isNaN(val) || val === null || val === undefined) return "0 €";
    return new Intl.NumberFormat("ro-RO", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0
    }).format(val);
  };

  // Lock body scroll when modal is open
  useEffect(() => {
    if (activeScenario) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeScenario]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && activeScenario) {
        setActiveScenario(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeScenario]);

  const filteredScenarios = useMemo(() => {
    const list = riskScenarios.filter((sc) => {
      const matchCategory = selectedCategory === "all" || sc.category === selectedCategory;
      const matchPersona = selectedPersona === "all" || sc.assetPersona.includes(selectedPersona);
      return matchCategory && matchPersona;
    });

    if (isHomePagePreview) {
      return list.slice(0, 6);
    }
    return list;
  }, [selectedCategory, selectedPersona, isHomePagePreview]);

  // Exposure calculation estimations (Educational Bloomberg Private Wealth model)
  const exposureDetails = useMemo(() => {
    switch (exposureAssetType) {
      case "auto":
        return {
          label: "Vehicul Premium / Fleet Auto",
          min: 15000,
          max: 300000,
          step: 5000,
          estimatedLossRatio: 0.12,
          impactLabel: "Reparație Daună Parțială Majoră sau Furt",
          ratioText: "Raport Poliță an vs. Risc Preluat ~ 1 : 25"
        };
      case "home":
        return {
          label: "Locuință, Interior & Bunuri",
          min: 50000,
          max: 1500000,
          step: 25000,
          estimatedLossRatio: 0.25,
          impactLabel: "Inundație Gravă, Incendiu Parțial sau Răspundere Vecini",
          ratioText: "Raport Poliță an vs. Risc Preluat ~ 1 : 350"
        };
      case "income":
        return {
          label: "Venit Anual Familie & Credite",
          min: 20000,
          max: 500000,
          step: 10000,
          estimatedLossRatio: 0.75,
          impactLabel: "Incapacitate de Muncă, Invaliditate sau Deces",
          ratioText: "Raport Poliță an vs. Risc Preluat ~ 1 : 400"
        };
      case "business":
        return {
          label: "Cifră de Afaceri / Valoare IMM",
          min: 100000,
          max: 3000000,
          step: 50000,
          estimatedLossRatio: 0.20,
          impactLabel: "Pauză de Business, Atac Cyber sau Eroare Profesională",
          ratioText: "Raport Poliță an vs. Risc Preluat ~ 1 : 150"
        };
      case "project":
        return {
          label: "Proiect Imobiliar / Șantier (CAR)",
          min: 150000,
          max: 5000000,
          step: 100000,
          estimatedLossRatio: 0.15,
          impactLabel: "Accident Structural, Avariere Vecinătăți sau Intemperii",
          ratioText: "Raport Poliță an vs. Risc Preluat ~ 1 : 200"
        };
    }
  }, [exposureAssetType]);

  const estimatedLossAmount = Math.round(assetValueEUR * exposureDetails.estimatedLossRatio);

  return (
    <section
      id="scenarii-risc"
      className="py-24 md:py-36 relative overflow-hidden bg-[#07090e] text-white font-sans border-t border-white/10"
      aria-label="Scenarii Reale de Risc"
    >
      {/* Editorial Luxury Lighting & Ambiance */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-blue-600/5 via-indigo-600/5 to-transparent blur-[160px] rounded-full" />
        <div className="absolute top-1/2 right-[-5%] w-[450px] h-[450px] bg-amber-500/[0.025] blur-[180px] rounded-full" />
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10 max-w-7xl">
        {/* Editorial Hero Header */}
        <div className="max-w-4xl mx-auto text-center mb-20 md:mb-28 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-slate-300 font-mono text-xs uppercase tracking-[0.2em]">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" aria-hidden="true" />
            Scenarii Reale de Risc • Evaluare Ilustrativă
          </div>

          <h2 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold tracking-tight text-white leading-[1.08]">
            Când neprevăzutul <br className="hidden sm:inline" />
            <span className="text-slate-400 font-light">devine costisitor.</span>
          </h2>

          <p className="text-base md:text-xl text-slate-300 max-w-2xl mx-auto font-light leading-relaxed pt-2">
            Asigurarea nu este o cheltuială. Este decizia din timp privind{" "}
            <strong className="text-white font-normal underline underline-offset-4 decoration-amber-400/40">
              cine preia impactul financiar
            </strong>.
          </p>
        </div>

        {/* Interactive Persona Selector ("Ce Vrei Să Protejezi?") */}
        <div className="mb-16 md:mb-20 bg-slate-900/60 border border-white/10 p-6 md:p-10 rounded-2xl backdrop-blur-xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <span className="text-xs uppercase tracking-widest text-slate-400 font-mono block mb-1">
                Personalizare Scenarii
              </span>
              <h3 className="text-xl md:text-2xl font-bold font-heading text-white flex items-center gap-2.5">
                Ce vrei să protejezi astăzi?
              </h3>
            </div>
            {selectedPersona !== "all" && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedPersona("all")}
                className="text-xs text-slate-300 hover:text-white hover:bg-white/10 rounded-lg h-8"
              >
                Resetează filtrul
              </Button>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {ASSET_PERSONAS.map((persona) => {
              const isActive = selectedPersona === persona.id;
              return (
                <button
                  key={persona.id}
                  type="button"
                  onClick={() => setSelectedPersona(isActive ? "all" : persona.id)}
                  className={`relative flex flex-col items-center justify-center p-4 rounded-xl border text-xs font-medium transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-[#161f33] border-amber-400/60 text-white shadow-xl scale-[1.02]"
                      : "bg-white/[0.03] border-white/10 text-slate-300 hover:bg-white/[0.07] hover:border-white/20 hover:text-white"
                  }`}
                >
                  {isActive && (
                    <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-amber-400" aria-hidden="true" />
                  )}
                  <span className={`mb-2.5 ${isActive ? "text-amber-400" : "text-slate-400"}`}>
                    {persona.id === "car" && <Car className="w-5 h-5" aria-hidden="true" />}
                    {persona.id === "home" && <Home className="w-5 h-5" aria-hidden="true" />}
                    {persona.id === "family" && <Users className="w-5 h-5" aria-hidden="true" />}
                    {persona.id === "health" && <Activity className="w-5 h-5" aria-hidden="true" />}
                    {persona.id === "travel" && <Plane className="w-5 h-5" aria-hidden="true" />}
                    {persona.id === "business" && <Briefcase className="w-5 h-5" aria-hidden="true" />}
                    {persona.id === "employees" && <UserCheck className="w-5 h-5" aria-hidden="true" />}
                    {persona.id === "projects" && <Building className="w-5 h-5" aria-hidden="true" />}
                  </span>
                  <span className="text-center line-clamp-1 font-heading">{persona.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Private Wealth Financial Exposure Calculator */}
        <div className="mb-20 md:mb-28 p-8 md:p-12 rounded-3xl bg-gradient-to-br from-slate-900/90 via-[#0b0f19] to-slate-950 border border-white/10 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Control Panel */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs uppercase tracking-widest text-slate-400 font-mono block mb-1">
                  Instrument Financiar de Calcul
                </span>
                <h3 className="text-2xl md:text-4xl font-bold font-heading text-white">
                  Calculează Expunerea Financiară
                </h3>
              </div>

              <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-light">
                Selectează categoria de patrimoniu și simulează nivelul de active protejate. Evaluează scara unei pierderi neprevăzute într-un singur incident.
              </p>

              {/* Asset Class Selector */}
              <div className="flex flex-wrap gap-2 pt-2">
                {[
                  { id: "auto", label: "Vehicul Auto" },
                  { id: "home", label: "Locuință & Bunuri" },
                  { id: "income", label: "Venit Familie" },
                  { id: "business", label: "Firma / IMM" },
                  { id: "project", label: "Proiect Șantier" }
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      const type = item.id as "auto" | "home" | "income" | "business" | "project";
                      setExposureAssetType(type);
                      if (type === "auto") setAssetValueEUR(65000);
                      if (type === "home") setAssetValueEUR(250000);
                      if (type === "income") setAssetValueEUR(120000);
                      if (type === "business") setAssetValueEUR(450000);
                      if (type === "project") setAssetValueEUR(750000);
                    }}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      exposureAssetType === item.id
                        ? "bg-slate-800 text-white border border-white/20 shadow-md"
                        : "bg-white/[0.03] text-slate-400 hover:bg-white/[0.08] hover:text-white border border-white/5"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Asset Value Slider */}
              <div className="space-y-4 pt-3">
                <div className="flex justify-between items-end">
                  <span className="text-xs text-slate-400 font-medium">{exposureDetails.label}</span>
                  <div className="text-2xl md:text-4xl font-bold font-mono text-white tracking-tight">
                    {formatCurrency(assetValueEUR)}
                  </div>
                </div>

                <input
                  type="range"
                  aria-label={exposureDetails.label}
                  min={exposureDetails.min}
                  max={exposureDetails.max}
                  step={exposureDetails.step}
                  value={assetValueEUR}
                  onChange={(e) => setAssetValueEUR(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
                />

                <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                  <span>{formatCurrency(exposureDetails.min)}</span>
                  <span>{formatCurrency(exposureDetails.max)}</span>
                </div>
              </div>
            </div>

            {/* Right Financial Display */}
            <div className="lg:col-span-5 bg-black/40 border border-white/10 p-6 md:p-8 rounded-2xl flex flex-col justify-between space-y-6">
              <div>
                <span className="text-[11px] uppercase tracking-widest text-slate-400 font-mono block">
                  Expunere Financiară Estimată (1 Incident)
                </span>
                <div className="text-3xl md:text-5xl font-bold text-rose-400 font-mono tracking-tight mt-3">
                  ~{formatCurrency(estimatedLossAmount)}
                </div>
                <p className="text-xs text-slate-300 mt-2 font-light leading-relaxed">
                  {exposureDetails.impactLabel}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-xs space-y-2.5 text-slate-300 font-sans">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Impact Fără Poliță:</span>
                  <span className="text-rose-400 font-semibold">Capital propriu</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Preluare Risc:</span>
                  <span className="text-emerald-400 font-semibold">Poliță Generali</span>
                </div>
                <div className="pt-2 border-t border-white/10 text-[11px] text-slate-400 font-mono">
                  {exposureDetails.ratioText}
                </div>
              </div>

              <p className="text-[11px] text-slate-400 italic leading-normal border-l-2 border-amber-400/40 pl-3">
                „Nu calculezi doar prima de asigurare, ci costul acoperirii unei pierderi din fondurile proprii.”
              </p>
            </div>
          </div>
        </div>

        {/* Category Navigation Bar */}
        {!isHomePagePreview && (
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-14 no-scrollbar scroll-smooth">
            {RISK_CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 flex items-center gap-2 border cursor-pointer ${
                    isActive
                      ? "bg-slate-800 text-white border-white/30 shadow-md scale-[1.02]"
                      : "bg-white/[0.03] border-white/10 text-slate-400 hover:bg-white/[0.08] hover:text-white"
                  }`}
                >
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-amber-400" aria-hidden="true" />}
                  <span>{cat.label}</span>
                  <span
                    className={`px-2 py-0.5 rounded-md text-[10px] font-mono ${
                      isActive ? "bg-slate-950 text-white" : "bg-white/10 text-slate-400"
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {/* Editorial Scenario Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {filteredScenarios.map((sc, index) => {
            const icon = ICON_MAP[sc.iconName] || <Shield className="w-4 h-4" aria-hidden="true" />;
            const formattedIndex = (index + 1).toString().padStart(2, "0");
            
            return (
              <div
                key={sc.id}
                tabIndex={0}
                role="button"
                aria-label={`Vezi detalii pentru scenariul: ${sc.title}`}
                onClick={() => setActiveScenario(sc)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActiveScenario(sc);
                  }
                }}
                className="group relative rounded-2xl p-7 bg-slate-900/50 border border-white/10 hover:border-white/25 transition-all duration-300 flex flex-col justify-between cursor-pointer hover:-translate-y-1 shadow-lg backdrop-blur-md overflow-hidden focus:outline-none focus:ring-2 focus:ring-amber-400"
              >
                {/* Card Header & Index */}
                <div>
                  <div className="flex justify-between items-center mb-5">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[11px] font-medium text-slate-300">
                      <span className="text-slate-400">{icon}</span>
                      {sc.categoryLabel}
                    </span>
                    <span className="text-xs font-mono text-slate-500 font-semibold">
                      #{formattedIndex}
                    </span>
                  </div>

                  <span className="text-[11px] text-slate-400 uppercase tracking-widest font-mono block mb-2">
                    {sc.eyebrow}
                  </span>

                  <h3 className="text-xl font-bold font-heading text-white group-hover:text-amber-300 transition-colors mb-3 leading-snug">
                    {sc.title}
                  </h3>

                  <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed font-light mb-6">
                    {sc.situation}
                  </p>
                </div>

                {/* Card Financial Exposure Footer */}
                <div>
                  <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 mb-5 flex justify-between items-center">
                    <span className="text-[11px] text-slate-400 font-medium font-mono">Expunere:</span>
                    <span className="text-sm font-bold font-mono text-white">
                      {sc.exposure.replace("Expunere financiară ilustrativă: ", "")}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs font-medium text-slate-300 group-hover:text-amber-300 transition-colors">
                    <span>Explorează scenariul</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Homepage Preview Navigation Button */}
        {isHomePagePreview && (
          <div className="text-center mb-20">
            <Button
              size="lg"
              className="text-sm md:text-base h-13 px-8 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-xl shadow-xl hover:scale-105 transition-transform"
              asChild
            >
              <Link href="/scenarii-risc">
                Explorează Toate cele 37 de Scenarii de Risc <ArrowRight className="w-5 h-5 ml-2" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        )}

        {/* Story Reader Modal / Drawer */}
        {activeScenario && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/85 backdrop-blur-2xl animate-in fade-in duration-200"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setActiveScenario(null);
              }
            }}
          >
            <div
              ref={modalContainerRef}
              className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#07090e] border border-white/15 rounded-3xl p-6 md:p-10 text-white shadow-2xl no-scrollbar focus:outline-none"
              tabIndex={-1}
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setActiveScenario(null)}
                className="absolute top-6 right-6 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
                aria-label="Închide scenariul"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>

              {/* Modal Category Badge */}
              <div className="flex items-center gap-2.5 mb-4">
                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300 text-xs font-mono uppercase tracking-wider flex items-center gap-2">
                  {ICON_MAP[activeScenario.iconName]}
                  {activeScenario.categoryLabel}
                </span>
                <span className="text-xs text-slate-400 font-mono">• Scenariu Ilustrativ</span>
              </div>

              <h3 id="modal-title" className="text-2xl md:text-3xl lg:text-4xl font-bold font-heading text-white mb-2 leading-tight">
                {activeScenario.title}
              </h3>
              <p className="text-xs md:text-sm text-slate-300 font-mono mb-8">{activeScenario.eyebrow}</p>

              {/* Step 1 to 5 Story Breakdown */}
              <div className="space-y-4 md:space-y-5 text-xs md:text-sm leading-relaxed mb-8 font-sans">
                {/* 01 - Normal Life */}
                <div className="p-5 rounded-xl bg-white/[0.03] border border-white/10">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 font-mono">
                    01 — Contextul Inițial (Cotidianul)
                  </div>
                  <p className="text-slate-200 font-light">{activeScenario.situation}</p>
                </div>

                {/* 02 - Interruption */}
                <div className="p-5 rounded-xl bg-amber-500/10 border border-amber-500/20">
                  <div className="text-[11px] font-bold text-amber-400 uppercase tracking-widest mb-1.5 font-mono">
                    02 — Întreruperea Neprevăzută
                  </div>
                  <p className="text-white font-light">{activeScenario.interruption}</p>
                </div>

                {/* 03 - Realization */}
                <div className="p-5 rounded-xl bg-white/[0.03] border border-white/10">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 font-mono">
                    03 — Momentul Conștientizării
                  </div>
                  <p className="text-slate-200 font-light">{activeScenario.realization}</p>
                </div>

                {/* 04 - Financial Exposure */}
                <div className="p-5 rounded-xl bg-rose-500/10 border border-rose-500/20">
                  <div className="text-[11px] font-bold text-rose-400 uppercase tracking-widest mb-1.5 font-mono">
                    04 — Impactul & Expunerea Financiară
                  </div>
                  <p className="text-rose-100 font-bold text-sm md:text-base">{activeScenario.exposure}</p>
                </div>

                {/* 05 - Protection Control */}
                <div className="p-5 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                  <div className="text-[11px] font-bold text-emerald-400 uppercase tracking-widest mb-1.5 font-mono">
                    05 — Controlul Oferit de Asigurare
                  </div>
                  <p className="text-emerald-100 font-light">{activeScenario.protection}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-white/10">
                <Button
                  size="lg"
                  className="w-full sm:w-auto text-sm md:text-base h-12 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-xl shadow-lg"
                  asChild
                >
                  <Link href={activeScenario.ctaHref}>
                    {activeScenario.ctaLabel} <ArrowRight className="w-5 h-5 ml-2" aria-hidden="true" />
                  </Link>
                </Button>
                
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto text-sm md:text-base h-12 border-white/20 text-white hover:bg-white/10 rounded-xl"
                  onClick={() => setActiveScenario(null)}
                >
                  Închide Scenariul
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Global Bottom Conversion Banner & Legal Disclaimer */}
        <div className="mt-16 p-8 md:p-14 rounded-3xl bg-gradient-to-r from-slate-900 via-[#0b0f19] to-slate-900 border border-white/15 text-center relative overflow-hidden">
          <div className="max-w-3xl mx-auto space-y-6">
            <ShieldCheck className="w-10 h-10 md:w-12 md:h-12 text-amber-400 mx-auto mb-2" aria-hidden="true" />
            <h3 className="text-2xl md:text-4xl font-bold font-heading text-white leading-tight">
              „Nu trebuie să asiguri totul. Trebuie doar să înțelegi ce te-ar durea să pierzi.”
            </h3>
            <p className="text-slate-300 text-sm md:text-base font-light max-w-xl mx-auto leading-relaxed">
              Programează o analiză discretă a portofoliului tău de riscuri. Cristian Văduva îți va identifica expunerile reale și îți va recomanda soluții optimizate Generali.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Button
                size="lg"
                className="w-full sm:w-auto text-sm md:text-base h-13 px-8 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-xl shadow-xl hover:scale-105 transition-transform"
                asChild
              >
                <Link href="/contact">
                  Solicită Analiză de Risc Personalizată <ArrowRight className="w-5 h-5 ml-2" aria-hidden="true" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto text-sm md:text-base h-13 px-8 border-white/20 text-white hover:bg-white/10 rounded-xl"
                asChild
              >
                <Link href="/servicii">
                  Vezi Toate Soluțiile de Asigurare
                </Link>
              </Button>
            </div>

            {/* Discreet Legal Compliance Notice */}
            <p className="text-[11px] text-slate-400 font-light pt-6 border-t border-white/10 leading-relaxed max-w-2xl mx-auto">
              Notă de conformitate: Scenariile prezentate sunt modele ilustrative de risc cu rol educativ și de conștientizare. Acoperirile, excluderile, limitele financiare și condițiile de eligibilitate depind strict de produsul de asigurare ales și de termenii contractuali agreați în polița emisă.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
