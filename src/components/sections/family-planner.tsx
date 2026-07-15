"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Plus, Trash2, ShieldAlert, HeartPulse, ShieldCheck, ArrowRight, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { saveAssessment } from "@/lib/clientActions";

type Member = {
  id: string;
  role: "Partener" | "Copil" | "Părinte" | "Partener Afaceri";
  age: string;
  dependencyYears: string;
  monthlyCost: string;
};

export function FamilyPlanner() {
  const [members, setMembers] = useState<Member[]>([]);
  const [role, setRole] = useState<Member["role"]>("Copil");
  const [age, setAge] = useState("");
  const [depYears, setDepYears] = useState("");
  const [cost, setCost] = useState("");
  const [isAnalyzed, setIsAnalyzed] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [reportId, setReportId] = useState<string | null>(null);

  const addMember = () => {
    if (!age || !depYears || !cost) return;
    setMembers([...members, { id: Math.random().toString(), role, age, dependencyYears: depYears, monthlyCost: cost }]);
    setAge(""); setDepYears(""); setCost("");
  };

  const removeMember = (id: string) => {
    setMembers(members.filter(m => m.id !== id));
  };

  const analyze = async () => {
    if (members.length === 0) return;
    setIsProcessing(true);
    await new Promise(r => setTimeout(r, 2000));
    
    const res = await saveAssessment("Family_Planner", { members });
    if (res.success && res.id) setReportId(res.id);

    setIsProcessing(false);
    setIsAnalyzed(true);
  };

  if (isAnalyzed) {
    const totalMonthly = members.reduce((acc, m) => acc + Number(m.monthlyCost), 0);
    const maxYears = Math.max(...members.map(m => Number(m.dependencyYears)), 0);
    const totalExposure = members.reduce((acc, m) => acc + (Number(m.monthlyCost) * 12 * Number(m.dependencyYears)), 0);

    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full max-w-5xl mx-auto space-y-12">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Activity className="w-8 h-8" />
          </div>
          <h2 className="text-4xl font-heading font-bold mb-4">Arhitectura de Protecție a Familiei</h2>
          <p className="text-muted-foreground text-lg">
            AiX a calculat expunerea matematică a dependenților tăi. Acesta este capitalul necesar pentru ca nivelul lor de trai să rămână neschimbat.
          </p>
          {reportId && <p className="text-sm font-mono mt-4 text-blue-600">ID Analiză: {reportId}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 rounded-3xl glass border border-rose-100 bg-rose-50/50">
            <h3 className="font-bold text-rose-800 uppercase tracking-wider text-sm mb-2">Cost Lunar Curent</h3>
            <p className="text-4xl font-bold font-heading text-rose-600">€{totalMonthly}</p>
          </div>
          <div className="p-8 rounded-3xl glass border border-amber-100 bg-amber-50/50">
            <h3 className="font-bold text-amber-800 uppercase tracking-wider text-sm mb-2">Perioadă Maximă Risc</h3>
            <p className="text-4xl font-bold font-heading text-amber-600">{maxYears} Ani</p>
          </div>
          <div className="p-8 rounded-3xl glass border border-blue-100 bg-blue-50/50">
            <h3 className="font-bold text-blue-800 uppercase tracking-wider text-sm mb-2">Capital Necesar Total</h3>
            <p className="text-4xl font-bold font-heading text-blue-600">€{totalExposure.toLocaleString()}</p>
          </div>
        </div>

        <div className="glass p-10 rounded-[3rem] border border-border shadow-xl">
          <h3 className="text-2xl font-bold font-heading mb-8 flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-blue-600" /> Soluția Recomandată
          </h3>
          <p className="text-lg text-foreground mb-6 leading-relaxed">
            Pentru a acoperi expunerea de <strong>€{totalExposure.toLocaleString()}</strong>, ai nevoie de o poliță de viață cu componentă majoră de protecție. 
          </p>
          <div className="space-y-4 mb-8">
            {members.map(m => (
              <div key={m.id} className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                <div>
                  <span className="font-bold block">{m.role} (Vârstă: {m.age})</span>
                  <span className="text-sm text-muted-foreground">Dependent încă {m.dependencyYears} ani.</span>
                </div>
                <div className="text-right font-bold text-rose-600">
                  Risc asumat: €{(Number(m.monthlyCost) * 12 * Number(m.dependencyYears)).toLocaleString()}
                </div>
              </div>
            ))}
          </div>

          <Button className="w-full h-14 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg" onClick={() => window.location.href='/contact'}>
            Discută cu Cristian Văduva <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col md:flex-row gap-8">
      {/* Left: Input Form */}
      <div className="w-full md:w-1/2 glass p-8 rounded-[2.5rem] border border-border shadow-sm">
        <h3 className="text-2xl font-bold font-heading mb-6 text-foreground">Adaugă Dependent</h3>
        <div className="space-y-4">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 block">Cine depinde de tine?</label>
            <div className="grid grid-cols-2 gap-2">
              {["Partener", "Copil", "Părinte", "Partener Afaceri"].map(r => (
                <button
                  key={r}
                  onClick={() => setRole(r as Member["role"])}
                  className={`p-3 text-sm font-bold rounded-xl border-2 transition-colors ${role === r ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-border text-muted-foreground hover:border-slate-300'}`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 block">Vârsta Lui</label>
              <Input type="number" value={age} onChange={e => setAge(e.target.value)} placeholder="Ani" className="h-12 rounded-xl" />
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 block">Dependent TImp de (Ani)</label>
              <Input type="number" value={depYears} onChange={e => setDepYears(e.target.value)} placeholder="Ani estimati" className="h-12 rounded-xl" />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 block">Contribuția Ta Lunara (EUR)</label>
            <Input type="number" value={cost} onChange={e => setCost(e.target.value)} placeholder="Ex: 500" className="h-12 rounded-xl" />
          </div>

          <Button onClick={addMember} disabled={!age || !depYears || !cost} className="w-full h-12 rounded-xl mt-4 bg-foreground text-background font-bold gap-2">
            <Plus className="w-5 h-5" /> Adaugă în Analiză
          </Button>
        </div>
      </div>

      {/* Right: List & Analyze */}
      <div className="w-full md:w-1/2 flex flex-col justify-between">
        <div className="space-y-4 mb-8">
          <h3 className="text-xl font-bold font-heading mb-4 text-foreground flex items-center gap-2">
            <Users className="w-6 h-6 text-blue-600" /> Profilul Familiei
          </h3>
          <AnimatePresence>
            {members.length === 0 ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-8 text-center border-2 border-dashed border-border rounded-[2rem] text-muted-foreground text-sm font-medium">
                Adaugă membrii familiei sau partenerii care se bazează pe veniturile tale pentru a genera harta riscurilor.
              </motion.div>
            ) : (
              members.map((m) => (
                <motion.div 
                  key={m.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="p-4 bg-white border border-border shadow-sm rounded-2xl flex justify-between items-center"
                >
                  <div className="flex items-center gap-3">
                    <HeartPulse className="w-8 h-8 text-rose-500 bg-rose-50 p-1.5 rounded-full" />
                    <div>
                      <p className="font-bold text-foreground text-sm">{m.role} ({m.age} ani)</p>
                      <p className="text-xs text-muted-foreground">Depinde: {m.dependencyYears} ani | €{m.monthlyCost}/luna</p>
                    </div>
                  </div>
                  <button onClick={() => removeMember(m.id)} className="text-slate-400 hover:text-rose-600 transition-colors p-2">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

        <Button 
          onClick={analyze} 
          disabled={members.length === 0 || isProcessing} 
          className="w-full h-16 rounded-[1.5rem] bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg shadow-xl"
        >
          {isProcessing ? "AiX Calculează..." : "Generează Harta Riscului"} <ShieldAlert className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </div>
  );
}
