"use client";

import React, { useState } from "react";
import { 
  AlertTriangle, Shield, Coins, AlertCircle 
} from "lucide-react";
import { Button } from "@/components/ui/button";

const scenariosList = [
  { id: "income-loss", label: "Pierderea Venitului", baseCost: 45000, desc: "Incapacitate de muncă pe 12 luni sau concediere." },
  { id: "medical", label: "Urgență Medicală Majoră", baseCost: 25000, desc: "Tratament medical privat sau intervenție chirurgicală." },
  { id: "accident", label: "Accident Auto / pentru tine", baseCost: 15000, desc: "Spitalizare lungă și avarierea totală a mașinii." },
  { id: "home-damage", label: "Incendiu / Inundație Casă", baseCost: 80000, desc: "Refacerea finisajelor și înlocuirea bunurilor arse." },
  { id: "disaster", label: "Cutremur major (Natural)", baseCost: 120000, desc: "Avarierea structurală gravă a clădirii rezidențiale." },
  { id: "biz-interruption", label: "Întrerupere Afacere", baseCost: 60000, desc: "Oprirea producției sau servicii nefuncționale pe 3 luni." },
  { id: "family-impact", label: "Decesul Susținătorului", baseCost: 200000, desc: "Șoc financiar major pentru acoperirea ratelor și traiului familiei." },
  { id: "travel-emergency", label: "Urgență în Străinătate", baseCost: 10000, desc: "Repatriere medicală sau spitalizare de urgență peste hotare." }
];

export function RiskSimulator() {
  const [age, setAge] = useState(35);
  const [income, setIncome] = useState(4000);
  const [savings, setSavings] = useState(15000);
  const [familyMembers, setFamilyMembers] = useState(3);
  const [propertyValue, setPropertyValue] = useState(120000);
  const [businessValue, setBusinessValue] = useState(0);
  
  // Selected scenarios
  const [selectedScenarios, setSelectedScenarios] = useState<string[]>(["income-loss", "home-damage"]);

  // Insurances active state
  const [hasLifeIns, setHasLifeIns] = useState(false);
  const [hasHealthIns, setHasHealthIns] = useState(false);
  const [hasHomeIns, setHasHomeIns] = useState(false);
  const [hasAutoIns, setHasAutoIns] = useState(false);
  const [hasBizIns, setHasBizIns] = useState(false);

  // Math logic for Risk Score & Financial Exposure
  let baseRisk = 30;
  if (age > 50) baseRisk += 5;
  if (familyMembers > 2) baseRisk += 5;

  // Scenarios impact
  let totalScenarioCost = 0;
  selectedScenarios.forEach(id => {
    const scen = scenariosList.find(s => s.id === id);
    if (scen) {
      totalScenarioCost += scen.baseCost;
      baseRisk += 10;
    }
  });

  // Asset values additions
  const totalAssets = propertyValue + businessValue;
  if (totalAssets > 500000) baseRisk += 10; // More assets, more potential loss exposure

  // Insurances mitigation
  let coveredCost = 0;
  if (hasLifeIns) {
    baseRisk -= 12;
    if (selectedScenarios.includes("family-impact")) coveredCost += 150000;
  }
  if (hasHealthIns) {
    baseRisk -= 10;
    if (selectedScenarios.includes("medical")) coveredCost += 20000;
  }
  if (hasHomeIns) {
    baseRisk -= 12;
    if (selectedScenarios.includes("home-damage")) coveredCost += 70000;
    if (selectedScenarios.includes("disaster")) coveredCost += 100000;
  }
  if (hasAutoIns) {
    baseRisk -= 8;
    if (selectedScenarios.includes("accident")) coveredCost += 12000;
  }
  if (hasBizIns) {
    baseRisk -= 10;
    if (selectedScenarios.includes("biz-interruption")) coveredCost += 50000;
  }

  // Savings buffer deduction
  const potentialLoss = Math.max(0, totalScenarioCost - savings - coveredCost);
  const protectionGap = Math.max(0, totalScenarioCost - coveredCost);
  const riskScore = Math.max(10, Math.min(95, baseRisk));

  const toggleScenario = (id: string) => {
    setSelectedScenarios(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
      
      {/* LEFT PANEL: INPUTS & CHECKBOXES */}
      <div className="w-full lg:w-5/12 glass p-8 rounded-[3rem] border border-border shadow-lg bg-white/80 overflow-y-auto max-h-[850px] no-scrollbar">
        <h3 className="text-xl font-bold font-heading mb-6 flex items-center gap-2 text-foreground tracking-tight">
          <Coins className="w-5 h-5 text-blue-600" /> Profilul tău Financiar
        </h3>

        <div className="space-y-6 mb-8">
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Vârstă</label>
              <span className="font-bold text-sm">{age} ani</span>
            </div>
            <input type="range" min="18" max="80" step="1" value={age} onChange={e => setAge(Number(e.target.value))} className="w-full accent-blue-600 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer" />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Membri Familie (Dependenți)</label>
              <span className="font-bold text-sm">{familyMembers} persoane</span>
            </div>
            <input type="range" min="1" max="10" step="1" value={familyMembers} onChange={e => setFamilyMembers(Number(e.target.value))} className="w-full accent-blue-600 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer" />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Venit Lunar Net</label>
              <span className="font-bold text-sm">€{income.toLocaleString()}</span>
            </div>
            <input type="range" min="1000" max="25000" step="500" value={income} onChange={e => setIncome(Number(e.target.value))} className="w-full accent-blue-600 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer" />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Lichiditate (Economii)</label>
              <span className="font-bold text-sm">€{savings.toLocaleString()}</span>
            </div>
            <input type="range" min="0" max="200000" step="2000" value={savings} onChange={e => setSavings(Number(e.target.value))} className="w-full accent-blue-600 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer" />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Valoare Casă / Imobile</label>
              <span className="font-bold text-sm">€{propertyValue.toLocaleString()}</span>
            </div>
            <input type="range" min="0" max="1000000" step="10000" value={propertyValue} onChange={e => setPropertyValue(Number(e.target.value))} className="w-full accent-blue-600 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer" />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Valoare Afacere (Val. Activă)</label>
              <span className="font-bold text-sm">€{businessValue.toLocaleString()}</span>
            </div>
            <input type="range" min="0" max="500000" step="10000" value={businessValue} onChange={e => setBusinessValue(Number(e.target.value))} className="w-full accent-blue-600 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer" />
          </div>
        </div>

        <h3 className="text-xl font-bold font-heading mb-4 text-foreground tracking-tight border-t border-border pt-6">
          Alege Scenariile de Risc
        </h3>
        <div className="flex flex-col gap-2.5 mb-8">
          {scenariosList.map(s => (
            <button
              key={s.id}
              onClick={() => toggleScenario(s.id)}
              className={`p-4 rounded-2xl flex items-center justify-between transition-all duration-300 border text-left ${
                selectedScenarios.includes(s.id) 
                  ? 'bg-slate-900 text-white border-slate-900 shadow-md' 
                  : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'
              }`}
            >
              <div>
                <span className="font-bold text-xs leading-none">{s.label}</span>
                <p className={`text-[10px] mt-1 ${selectedScenarios.includes(s.id) ? 'text-white/60' : 'text-slate-400'}`}>{s.desc}</p>
              </div>
              <span className={`text-xs font-bold ml-4 ${selectedScenarios.includes(s.id) ? 'text-rose-300' : 'text-rose-600'}`}>
                €{s.baseCost.toLocaleString()}
              </span>
            </button>
          ))}
        </div>

        <h3 className="text-xl font-bold font-heading mb-4 text-foreground tracking-tight border-t border-border pt-6">
          Asigurări Curente Active
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: "Viață", state: hasLifeIns, setState: setHasLifeIns },
            { label: "Sănătate", state: hasHealthIns, setState: setHasHealthIns },
            { label: "Locuință", state: hasHomeIns, setState: setHasHomeIns },
            { label: "Auto / CASCO", state: hasAutoIns, setState: setHasAutoIns },
            { label: "Business", state: hasBizIns, setState: setHasBizIns }
          ].map((ins, i) => (
            <button
              key={i}
              onClick={() => ins.setState(!ins.state)}
              className={`py-3 px-4 rounded-xl font-bold text-xs border text-center transition-all ${
                ins.state 
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm' 
                  : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
              }`}
            >
              {ins.label} {ins.state ? "✓" : ""}
            </button>
          ))}
        </div>
      </div>

      {/* RIGHT PANEL: SCENARIO COMPARISON (WITHOUT vs WITH PROTECTION) */}
      <div className="w-full lg:w-7/12 flex flex-col gap-6">
        
        {/* KPI Panel */}
        <div className="grid grid-cols-2 gap-4">
          <div className="glass p-6 rounded-[2.5rem] border border-border bg-white shadow-sm flex flex-col justify-center">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Scor Risc Curent</span>
            <p className={`text-4xl font-heading font-black mt-2 ${riskScore > 60 ? 'text-rose-600' : riskScore > 35 ? 'text-amber-500' : 'text-emerald-600'}`}>
              {riskScore}%
            </p>
          </div>
          <div className="glass p-6 rounded-[2.5rem] border border-border bg-white shadow-sm flex flex-col justify-center">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Protection Gap</span>
            <p className="text-4xl font-heading font-black text-slate-900 mt-2">
              €{protectionGap.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Dynamic Risk Analysis Title */}
        <div className="glass p-6 rounded-[2.5rem] border border-border bg-white shadow-sm flex items-center gap-3">
          <AlertCircle className="w-6 h-6 text-amber-500 shrink-0" />
          <p className="text-xs text-slate-600 leading-relaxed font-semibold">
            {potentialLoss > 0 
              ? `Atenție! Expunerea ta netă la daune (în caz de incidență) depășește economiile tale curente cu €${potentialLoss.toLocaleString()}. Activele tale pot fi vulnerabile executării silită.` 
              : "Felicitări! Economiile curente și polițele active pot atenua integral impactul imediat al scenariilor de risc selectate."}
          </p>
        </div>

        {/* COMPARISON CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          
          {/* Card A: WITHOUT PROTECTION */}
          <div className="glass p-8 rounded-[3rem] border border-rose-100 bg-rose-50/10 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="flex justify-between items-center mb-6">
                <span className="text-xs font-bold uppercase tracking-widest text-rose-600 bg-rose-50 px-3 py-1 rounded-full">Fără Protecție</span>
                <AlertTriangle className="w-5 h-5 text-rose-600" />
              </div>
              
              <h4 className="font-heading font-black text-xl text-slate-900 mb-4">Expunere Totală de Risc</h4>
              <p className="text-xs text-slate-600 leading-relaxed mb-6">
                În cazul producerii incidentelor selectate, ești obligat să suporți toate costurile direct din economiile tale sau prin lichidarea forțată a activelor.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-xs font-medium border-b border-slate-100 pb-2">
                  <span className="text-slate-500">Pierdere Patrimoniu</span>
                  <span className="font-bold text-rose-600">€{protectionGap.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-xs font-medium border-b border-slate-100 pb-2">
                  <span className="text-slate-500">Executare Active/Casă</span>
                  <span className="font-bold text-rose-600">{propertyValue > 0 && protectionGap > savings ? "Risc Ridicat" : "Risc Scăzut"}</span>
                </div>
                <div className="flex justify-between text-xs font-medium pb-2">
                  <span className="text-slate-500">Impact Familie</span>
                  <span className="font-bold text-rose-600">{familyMembers > 1 ? "Sever" : "Moderat"}</span>
                </div>
              </div>
            </div>

            <Button variant="outline" className="w-full rounded-full border-rose-200 text-rose-700 hover:bg-rose-50 text-xs font-bold" onClick={() => alert("Fără acoperire, ești propriul tău asigurator pe propriile active.")}>
              Asumare Risc Total
            </Button>
          </div>

          {/* Card B: WITH PROTECTION */}
          <div className="glass p-8 rounded-[3rem] border border-emerald-100 bg-emerald-50/10 shadow-xl flex flex-col justify-between hover:shadow-2xl transition-all duration-300">
            <div>
              <div className="flex justify-between items-center mb-6">
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">Cu Protecție</span>
                <Shield className="w-5 h-5 text-emerald-600" />
              </div>
              
              <h4 className="font-heading font-black text-xl text-slate-900 mb-4">Securitate Financiară</h4>
              <p className="text-xs text-slate-600 leading-relaxed mb-6">
                Prin transferul riscurilor către Generali România, capitalul tău rămâne intact. Toate costurile sunt decontate direct de partenerul asigurator.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-xs font-medium border-b border-slate-100 pb-2">
                  <span className="text-slate-500">Pierdere Patrimoniu</span>
                  <span className="font-bold text-emerald-600">€0 (Decontat complet)</span>
                </div>
                <div className="flex justify-between text-xs font-medium border-b border-slate-100 pb-2">
                  <span className="text-slate-500">Garanție de Reconstrucție</span>
                  <span className="font-bold text-emerald-600">100% Acoperit</span>
                </div>
                <div className="flex justify-between text-xs font-medium pb-2">
                  <span className="text-slate-500">Continuitate Venit</span>
                  <span className="font-bold text-emerald-600">Asigurată</span>
                </div>
              </div>
            </div>

            <Button className="w-full rounded-full bg-slate-900 text-white text-xs font-bold hover:bg-slate-800" asChild>
              <a href="/smart-forms">Solicită Protecție Ecosistem</a>
            </Button>
          </div>

        </div>

      </div>
    </div>
  );
}
