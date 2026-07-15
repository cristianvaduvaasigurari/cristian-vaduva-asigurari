"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Shield, Car, Home, Baby, Building2, TrendingUp, Plane, CheckCircle2, ChevronRight, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

const scenarios = [
  { id: "house", icon: <Home className="w-5 h-5" />, label: "Cumpăr o casă" },
  { id: "second_property", icon: <Building2 className="w-5 h-5" />, label: "A doua proprietate" },
  { id: "married", icon: <CheckCircle2 className="w-5 h-5" />, label: "Mă căsătoresc" },
  { id: "child", icon: <Baby className="w-5 h-5" />, label: "Apar copii" },
  { id: "business", icon: <Activity className="w-5 h-5" />, label: "Deschid o afacere" },
  { id: "luxury_car", icon: <Car className="w-5 h-5" />, label: "Mașină premium" },
  { id: "abroad", icon: <Plane className="w-5 h-5" />, label: "Mă mut în străinătate" },
  { id: "retire", icon: <TrendingUp className="w-5 h-5" />, label: "Mă pensionez anticipat" }
];

export function LifeSimulator() {
  // Sliders State
  const [age, setAge] = useState(30);
  const [income, setIncome] = useState(3000);
  const [savings, setSavings] = useState(10000);
  const [investments, setInvestments] = useState(5000);
  const [propertyValue, setPropertyValue] = useState(0);
  const [mortgage, setMortgage] = useState(0);
  const [children, setChildren] = useState(0);
  const [businessRev, setBusinessRev] = useState(0);
  const [cars, setCars] = useState(1);

  // Active Scenarios
  const [activeScenarios, setActiveScenarios] = useState<string[]>([]);

  // Logic Engine - Computed during render (No useEffect)
  let baseScore = 40;
  if (savings > income * 6) baseScore += 20; // Emergency fund
  if (investments > 20000) baseScore += 10;
  if (mortgage > propertyValue * 0.8) baseScore -= 15; // High leverage
  if (children > 0 && savings < 5000) baseScore -= 20;

  const currentRisk = (mortgage > 100000 && income < 4000) ? "Ridicat" : (mortgage > 0 || children > 0) ? "Mediu" : "Scăzut";
  
  // Future Impact (Simulated)
  let fScore = baseScore;
  let riskLevel = currentRisk;

  if (activeScenarios.includes("house")) {
    fScore -= 15; // Debt increases
    riskLevel = income < 5000 ? "Ridicat" : "Mediu";
  }
  if (activeScenarios.includes("second_property")) {
    fScore -= 10;
    riskLevel = "Ridicat"; // Exposure to tenant / real estate risks
  }
  if (activeScenarios.includes("child")) {
    fScore -= 25; // Massive dependency increase
    if (riskLevel !== "Ridicat") riskLevel = "Mediu";
  }
  if (activeScenarios.includes("business")) {
    fScore -= 20; // Unpredictable income
    riskLevel = "Ridicat";
  }
  if (activeScenarios.includes("retire")) {
    if (investments + savings < 500000) {
      fScore -= 30; // Not ready
      riskLevel = "Critic";
    } else {
      fScore += 20;
    }
  }

  const currentScore = Math.max(10, Math.min(100, baseScore));
  const futureScore = Math.max(10, Math.min(100, fScore));
  const futureRisk = riskLevel;

  const toggleScenario = (id: string) => {
    setActiveScenarios(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
      
      {/* LEFT: Controls (Sliders & Scenarios) */}
      <div className="w-full lg:w-5/12 glass p-8 rounded-[3rem] border border-border shadow-lg bg-white/80 overflow-y-auto max-h-[800px] no-scrollbar">
        <h3 className="text-2xl font-bold font-heading mb-8 flex items-center gap-2 text-foreground tracking-tight">
          <Activity className="w-6 h-6 text-blue-600" /> Parametrii Curenți
        </h3>

        <div className="space-y-6 mb-12">
          {/* Slider 1 */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Vârsta ta</label>
              <span className="font-bold text-sm">{age} ani</span>
            </div>
            <input type="range" min="18" max="80" value={age} onChange={e => setAge(Number(e.target.value))} className="w-full accent-blue-600 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer" />
          </div>
          {/* Slider 2 */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Venit Lunar Net</label>
              <span className="font-bold text-sm">€{income.toLocaleString()}</span>
            </div>
            <input type="range" min="500" max="25000" step="500" value={income} onChange={e => setIncome(Number(e.target.value))} className="w-full accent-emerald-600 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer" />
          </div>
          {/* Slider 3 */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Economii</label>
              <span className="font-bold text-sm">€{savings.toLocaleString()}</span>
            </div>
            <input type="range" min="0" max="250000" step="1000" value={savings} onChange={e => setSavings(Number(e.target.value))} className="w-full accent-blue-600 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer" />
          </div>
          {/* Slider 4 */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Investiții Portofoliu</label>
              <span className="font-bold text-sm">€{investments.toLocaleString()}</span>
            </div>
            <input type="range" min="0" max="1000000" step="5000" value={investments} onChange={e => setInvestments(Number(e.target.value))} className="w-full accent-purple-600 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer" />
          </div>
          {/* Slider 5 */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Valoare Imobiliare</label>
              <span className="font-bold text-sm">€{propertyValue.toLocaleString()}</span>
            </div>
            <input type="range" min="0" max="2000000" step="10000" value={propertyValue} onChange={e => setPropertyValue(Number(e.target.value))} className="w-full accent-indigo-600 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer" />
          </div>
          {/* Slider 6 */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Sold Credit Ipotecar</label>
              <span className="font-bold text-sm">€{mortgage.toLocaleString()}</span>
            </div>
            <input type="range" min="0" max="500000" step="5000" value={mortgage} onChange={e => setMortgage(Number(e.target.value))} className="w-full accent-rose-600 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer" />
          </div>
          {/* Slider 7 */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Număr Copii</label>
              <span className="font-bold text-sm">{children}</span>
            </div>
            <input type="range" min="0" max="5" step="1" value={children} onChange={e => setChildren(Number(e.target.value))} className="w-full accent-amber-600 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer" />
          </div>
          {/* Slider 8 */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Venit Business (Anual)</label>
              <span className="font-bold text-sm">€{businessRev.toLocaleString()}</span>
            </div>
            <input type="range" min="0" max="1000000" step="10000" value={businessRev} onChange={e => setBusinessRev(Number(e.target.value))} className="w-full accent-emerald-600 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer" />
          </div>
          {/* Slider 9 */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Autoturisme Deținute</label>
              <span className="font-bold text-sm">{cars}</span>
            </div>
            <input type="range" min="0" max="10" step="1" value={cars} onChange={e => setCars(Number(e.target.value))} className="w-full accent-slate-600 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer" />
          </div>
        </div>

        <h3 className="text-2xl font-bold font-heading mb-6 text-foreground tracking-tight border-t border-border pt-8">
          Adaugă Scenarii de Viață
        </h3>
        
        <div className="grid grid-cols-2 gap-3">
          {scenarios.map(s => (
            <button
              key={s.id}
              onClick={() => toggleScenario(s.id)}
              className={`p-4 rounded-2xl flex flex-col items-start gap-3 transition-all duration-300 border text-left ${
                activeScenarios.includes(s.id) 
                  ? 'bg-slate-900 text-white border-slate-900 shadow-lg scale-[1.02]' 
                  : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'
              }`}
            >
              <div className={`p-2 rounded-full ${activeScenarios.includes(s.id) ? 'bg-white/20' : 'bg-slate-100'}`}>
                {s.icon}
              </div>
              <span className="font-bold text-sm leading-tight">{s.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* RIGHT: Results & Dashboard */}
      <div className="w-full lg:w-7/12 flex flex-col gap-6">
        
        <div className="grid grid-cols-2 gap-6">
          {/* Current Status */}
          <div className="glass p-8 rounded-[3rem] border border-border shadow-sm flex flex-col justify-center bg-white relative overflow-hidden">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2 block">Situația Curentă</span>
            <div className="flex items-end gap-2 mb-4">
              <span className="text-5xl font-heading font-black text-slate-900">{currentScore}%</span>
            </div>
            <p className="text-sm font-medium text-slate-500">Scor Protecție</p>
            <div className="mt-6 p-4 rounded-2xl bg-slate-50 border border-slate-100 flex justify-between items-center">
              <span className="text-xs font-bold uppercase text-slate-500">Risc Curent</span>
              <span className={`text-sm font-bold ${currentRisk === 'Scăzut' ? 'text-emerald-600' : currentRisk === 'Mediu' ? 'text-amber-600' : 'text-rose-600'}`}>
                {currentRisk}
              </span>
            </div>
          </div>

          {/* Future Status */}
          <div className="glass p-8 rounded-[3rem] border border-border shadow-xl flex flex-col justify-center relative overflow-hidden bg-slate-900 text-white transition-all duration-500">
            <span className="text-xs font-bold uppercase tracking-widest text-white/50 mb-2 block">După Scenariile Alese</span>
            <div className="flex items-end gap-2 mb-4">
              <span className={`text-5xl font-heading font-black transition-all duration-1000 ${futureScore < currentScore ? 'text-rose-400' : futureScore > currentScore ? 'text-emerald-400' : 'text-white'}`}>
                {futureScore}%
              </span>
            </div>
            <p className="text-sm font-medium text-white/70">Noul Scor de Protecție</p>
            
            <div className="mt-6 p-4 rounded-2xl bg-white/10 border border-white/10 flex justify-between items-center backdrop-blur-md">
              <span className="text-xs font-bold uppercase text-white/70">Noul Risc</span>
              <span className={`text-sm font-bold ${futureRisk === 'Scăzut' ? 'text-emerald-400' : futureRisk === 'Mediu' ? 'text-amber-400' : 'text-rose-400'}`}>
                {futureRisk}
              </span>
            </div>

            {/* Difference indicator */}
            {futureScore !== currentScore && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                key={futureScore}
                className="absolute top-8 right-8"
              >
                <div className={`px-3 py-1 rounded-full text-xs font-bold ${futureScore < currentScore ? 'bg-rose-500/20 text-rose-300' : 'bg-emerald-500/20 text-emerald-300'}`}>
                  {futureScore < currentScore ? '-' : '+'}{Math.abs(futureScore - currentScore)}%
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Dynamic Recommendations */}
        <div className="glass p-8 md:p-10 rounded-[3rem] border border-border shadow-xl flex-grow flex flex-col bg-white">
          <h3 className="text-2xl font-bold font-heading mb-8 flex items-center gap-2 text-foreground">
            <Shield className="w-6 h-6 text-emerald-600" /> Planul de Protecție Necesar
          </h3>

          <div className="space-y-4 flex-grow">
            <AnimatePresence mode="popLayout">
              {activeScenarios.includes("child") && (
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, scale: 0.9 }} className="p-5 rounded-2xl border border-rose-100 bg-rose-50/50 flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center shrink-0">
                    <Baby className="w-5 h-5 text-rose-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-lg">Asigurare de Viață Majorată</h4>
                    <p className="text-slate-600 text-sm mt-1 leading-relaxed">Apariția unui copil generează o dependență financiară pe ~20 de ani. Capitalul asigurat de bază ar trebui setat la minim €{(income * 12 * 10).toLocaleString()} (venitul tău pe 10 ani).</p>
                  </div>
                </motion.div>
              )}

              {activeScenarios.includes("house") && (
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, scale: 0.9 }} className="p-5 rounded-2xl border border-blue-100 bg-blue-50/50 flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                    <Home className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-lg">Poliță All-Risk pentru Casă Nouă</h4>
                    <p className="text-slate-600 text-sm mt-1 leading-relaxed">Nu lăsa banca să facă doar polița cesionată la valoarea creditului. Ai nevoie de o evaluare a valorii reale de reconstrucție pentru a acoperi finisajele noi.</p>
                  </div>
                </motion.div>
              )}

              {activeScenarios.includes("business") && (
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, scale: 0.9 }} className="p-5 rounded-2xl border border-amber-100 bg-amber-50/50 flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                    <Activity className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-lg">Business Interruption & D&O</h4>
                    <p className="text-slate-600 text-sm mt-1 leading-relaxed">Asigurarea afacerii și a răspunderii tale ca administrator este esențială. Risc ridicat de a atrage patrimoniul personal în falimentul firmei dacă nu ești izolat juridic.</p>
                  </div>
                </motion.div>
              )}

              {activeScenarios.includes("retire") && (
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, scale: 0.9 }} className="p-5 rounded-2xl border border-purple-100 bg-purple-50/50 flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center shrink-0">
                    <TrendingUp className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-lg">Restructurarea Portofoliului</h4>
                    <p className="text-slate-600 text-sm mt-1 leading-relaxed">Pentru pensionare anticipată sigură, polițele de viață tip unit-linked trebuiesc maturate, iar expunerea pe risc sistemic redusă.</p>
                  </div>
                </motion.div>
              )}

              {activeScenarios.length === 0 && (
                <div className="flex flex-col items-center justify-center h-40 text-slate-400">
                  <Activity className="w-12 h-12 mb-4 opacity-20" />
                  <p className="font-medium text-sm">Selectează un scenariu din stânga pentru a simula viitorul tău.</p>
                </div>
              )}
            </AnimatePresence>
          </div>

          <div className="mt-8 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground font-medium flex items-center gap-1">
              <AlertTriangle className="w-4 h-4" /> Aceasta este o simulare matematică live. Rezultatele sunt informative.
            </p>
            <Button className="h-14 rounded-full bg-slate-900 text-white font-bold px-8 hover:bg-slate-800" asChild>
              <a href="/contact">Discută Scenariile cu Consultantul <ChevronRight className="w-5 h-5 ml-2" /></a>
            </Button>
          </div>

        </div>

      </div>
    </div>
  );
}
