"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Home, Briefcase, PiggyBank, ArrowRight, ShieldCheck, ChevronRight, CheckCircle2, ChevronLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { saveAssessment } from "@/lib/actions";

const steps = [
  { id: "intro", title: "Profil de Bază", icon: <User className="w-6 h-6" /> },
  { id: "assets", title: "Active (Assets)", icon: <Home className="w-6 h-6" /> },
  { id: "liabilities", title: "Pasive (Credite)", icon: <Briefcase className="w-6 h-6" /> },
  { id: "goals", title: "Obiective & Riscuri", icon: <PiggyBank className="w-6 h-6" /> }
];

export function FinancialTwin() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    name: "",
    age: "",
    income: "",
    propertyValue: "",
    investments: "",
    loans: "",
    dependents: "0",
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [twinId, setTwinId] = useState<string | null>(null);

  const handleNext = () => {
    if (step < steps.length - 1) setStep(s => s + 1);
    else generateTwin();
  };

  const handlePrev = () => {
    if (step > 0) setStep(s => s - 1);
  };

  const generateTwin = async () => {
    setIsProcessing(true);
    // Simulate complex AI calculation
    await new Promise(r => setTimeout(r, 3000));
    
    const res = await saveAssessment("Financial_Twin", data);
    if (res.success && res.id) {
      setTwinId(res.id);
    }
    setIsProcessing(false);
  };

  const calculateMetrics = () => {
    const assets = (Number(data.propertyValue) || 0) + (Number(data.investments) || 0);
    const liabilities = Number(data.loans) || 0;
    const netWorth = assets - liabilities;
    const recommendedProtection = (Number(data.income) || 0) * 12 * 5; // 5 years of income

    return { assets, liabilities, netWorth, recommendedProtection };
  };

  if (twinId) {
    const metrics = calculateMetrics();
    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-5xl mx-auto space-y-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 font-bold text-xs uppercase tracking-widest border border-emerald-100 mb-6">
            <CheckCircle2 className="w-4 h-4" /> Twin Generat cu Succes
          </div>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-4">
            Geamănul Tău Financiar
          </h2>
          <p className="text-muted-foreground">ID Unic de Evaluare: <span className="font-mono text-foreground font-bold">{twinId}</span></p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="glass p-8 rounded-3xl border border-emerald-100 bg-emerald-50/30">
            <p className="text-sm font-bold text-emerald-600 uppercase tracking-wider mb-2">Total Active</p>
            <p className="text-3xl font-heading font-bold text-foreground">€{metrics.assets.toLocaleString()}</p>
          </div>
          <div className="glass p-8 rounded-3xl border border-rose-100 bg-rose-50/30">
            <p className="text-sm font-bold text-rose-600 uppercase tracking-wider mb-2">Total Pasive</p>
            <p className="text-3xl font-heading font-bold text-foreground">€{metrics.liabilities.toLocaleString()}</p>
          </div>
          <div className="glass p-8 rounded-3xl border border-blue-100 bg-blue-50/30">
            <p className="text-sm font-bold text-blue-600 uppercase tracking-wider mb-2">Avere Netă</p>
            <p className="text-3xl font-heading font-bold text-foreground">€{metrics.netWorth.toLocaleString()}</p>
          </div>
        </div>

        <div className="glass p-10 rounded-[3rem] border border-border shadow-xl">
          <h3 className="text-2xl font-bold font-heading mb-8">Vulnerabilități Critice Identificate</h3>
          
          <div className="space-y-6">
            <div className="flex gap-4 p-6 rounded-2xl bg-slate-50 border border-slate-100 items-start">
              <ShieldCheck className="w-8 h-8 text-amber-500 shrink-0" />
              <div>
                <h4 className="font-bold text-lg mb-1">Decalaj de Protecție a Veniturilor</h4>
                <p className="text-muted-foreground text-sm">În caz de invaliditate sau deces, familia ta are nevoie de un buffer de <strong className="text-foreground">€{metrics.recommendedProtection.toLocaleString()}</strong> pentru a-și menține standardul de viață în următorii 5 ani, având în vedere datoriile curente de €{metrics.liabilities.toLocaleString()}.</p>
              </div>
            </div>

            <div className="flex gap-4 p-6 rounded-2xl bg-slate-50 border border-slate-100 items-start">
              <Home className="w-8 h-8 text-blue-500 shrink-0" />
              <div>
                <h4 className="font-bold text-lg mb-1">Expunere Patrimonială</h4>
                <p className="text-muted-foreground text-sm">Activele tale de €{metrics.assets.toLocaleString()} necesită o poliță facultativă extinsă. Asigurarea standard a băncii (dacă există) protejează exclusiv interesul băncii pentru restul de credit de €{metrics.liabilities.toLocaleString()}, nu și capitalul tău acumulat.</p>
              </div>
            </div>
          </div>
        </div>

      </motion.div>
    );
  }

  if (isProcessing) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center">
        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }} className="w-16 h-16 border-4 border-foreground/10 border-t-blue-600 rounded-full mb-8" />
        <h2 className="text-2xl font-bold font-heading mb-2">Construim Geamănul Tău Financiar</h2>
        <p className="text-muted-foreground">AiX analizează datele și corelează riscurile...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Progress */}
      <div className="flex justify-between items-center mb-12">
        {steps.map((s, i) => (
          <div key={s.id} className="flex flex-col items-center gap-2 relative z-10 w-1/4">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${step >= i ? 'bg-blue-600 text-white shadow-lg' : 'bg-white border-2 border-slate-200 text-slate-400'}`}>
              {s.icon}
            </div>
            <span className={`text-xs font-bold uppercase tracking-wider text-center hidden sm:block ${step >= i ? 'text-blue-600' : 'text-slate-400'}`}>{s.title}</span>
          </div>
        ))}
        {/* Line */}
        <div className="absolute top-6 left-[12.5%] right-[12.5%] h-1 bg-slate-200 z-0 hidden sm:block">
          <motion.div className="h-full bg-blue-600" initial={{ width: 0 }} animate={{ width: `${(step / (steps.length - 1)) * 100}%` }} />
        </div>
      </div>

      <div className="glass p-8 md:p-12 rounded-[3rem] border border-border shadow-xl bg-white relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {step === 0 && (
              <div className="space-y-6 max-w-md mx-auto">
                <h3 className="text-2xl font-bold font-heading text-center mb-8">Informații de Bază</h3>
                <div>
                  <label className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-2 block">Nume Complet</label>
                  <Input placeholder="Ex: Popescu Ion" value={data.name} onChange={e => setData({...data, name: e.target.value})} className="h-14 rounded-2xl" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-2 block">Vârstă</label>
                    <Input type="number" placeholder="Ani" value={data.age} onChange={e => setData({...data, age: e.target.value})} className="h-14 rounded-2xl" />
                  </div>
                  <div>
                    <label className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-2 block">Dependenți</label>
                    <Input type="number" placeholder="Copii/Părinți" value={data.dependents} onChange={e => setData({...data, dependents: e.target.value})} className="h-14 rounded-2xl" />
                  </div>
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-6 max-w-md mx-auto">
                <h3 className="text-2xl font-bold font-heading text-center mb-8">Active (Ce Deții)</h3>
                <div>
                  <label className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-2 block">Venit Lunar Net (EUR)</label>
                  <Input type="number" placeholder="Ex: 3000" value={data.income} onChange={e => setData({...data, income: e.target.value})} className="h-14 rounded-2xl" />
                </div>
                <div>
                  <label className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-2 block">Valoare Proprietăți (EUR)</label>
                  <Input type="number" placeholder="Ex: 150000" value={data.propertyValue} onChange={e => setData({...data, propertyValue: e.target.value})} className="h-14 rounded-2xl" />
                </div>
                <div>
                  <label className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-2 block">Investiții Curente (EUR)</label>
                  <Input type="number" placeholder="Ex: 20000" value={data.investments} onChange={e => setData({...data, investments: e.target.value})} className="h-14 rounded-2xl" />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6 max-w-md mx-auto">
                <h3 className="text-2xl font-bold font-heading text-center mb-8">Pasive (Ce Datorezi)</h3>
                <div>
                  <label className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-2 block">Total Credite Rămase (EUR)</label>
                  <Input type="number" placeholder="Ex: 80000" value={data.loans} onChange={e => setData({...data, loans: e.target.value})} className="h-14 rounded-2xl" />
                </div>
                <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 text-sm text-amber-800">
                  Calculăm diferența dintre activele care produc și datoriile curente pentru a identifica gradul real de expunere a familiei tale.
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6 max-w-md mx-auto text-center">
                <PiggyBank className="w-16 h-16 text-blue-600 mx-auto mb-6" />
                <h3 className="text-2xl font-bold font-heading mb-4">Gata de Analiză</h3>
                <p className="text-muted-foreground mb-8">
                  AiX va procesa datele pentru a genera profilul tău financiar complet și necesarul exact de protecție patrimonială.
                </p>
                <Button onClick={handleNext} className="w-full h-14 rounded-full bg-foreground text-background text-lg font-bold">
                  Generează Profilul <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {step < 3 && (
          <div className="mt-12 flex justify-between border-t border-border pt-6">
            <Button variant="ghost" onClick={handlePrev} disabled={step === 0} className="text-muted-foreground hover:text-foreground rounded-full">
              <ChevronLeft className="w-5 h-5 mr-1" /> Înapoi
            </Button>
            <Button onClick={handleNext} className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8">
              Următorul Pas <ChevronRight className="w-5 h-5 ml-1" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
