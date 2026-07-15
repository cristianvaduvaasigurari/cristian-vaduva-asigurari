"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Shield, Home, TrendingUp, Sparkles, 
  ChevronRight, CheckCircle2, User, Mail, Phone, ArrowLeft 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { saveAssessment } from "@/lib/clientActions";
import Link from "next/link";

const steps = [
  {
    id: "consultation-type",
    question: "Ce tip de consultanță privată dorești să inițiezi?",
    options: [
      { id: "insurance", label: "Consultanță Asigurări", desc: "Viață, sănătate, auto, bunuri fine", icon: <Shield className="w-5 h-5" /> },
      { id: "real-estate", label: "Consultanță Imobiliară", desc: "Achiziții, analize randament, Home Find", icon: <Home className="w-5 h-5" /> },
      { id: "investment", label: "Consultanță Investiții", desc: "Unit-Linked, economisire, strategii active", icon: <TrendingUp className="w-5 h-5" /> },
      { id: "private-client", label: "Private Client Request", desc: "Audit complet de patrimoniu (HNW)", icon: <Sparkles className="w-5 h-5" /> }
    ]
  },
  {
    id: "protect-priority",
    question: "Ce anume dorești să protejezi în mod prioritar?",
    options: [
      { id: "family", label: "Familia și viitorul copiilor", desc: "Asigurarea venitului și protecție medicală" },
      { id: "assets", label: "Activele fizice (Casă, Mașini)", desc: "Polițe de asigurare All-Risk" },
      { id: "business", label: "Afacerea și răspunderea civilă", desc: "Asigurări IMM, Cyber și D&O" },
      { id: "liquidity", label: "Lichiditatea și economiile", desc: "Garanția capitalului împotriva inflației" }
    ]
  },
  {
    id: "active-assets",
    question: "Ce active deții sau intenționezi să achiziționezi în prezent?",
    options: [
      { id: "realestate", label: "Proprietăți imobiliare active", desc: "Apartamente pentru chirie sau locuințe" },
      { id: "luxury-assets", label: "Bunuri de lux / Colecții", desc: "Ceasuri, supercars, yachturi, artă" },
      { id: "cash-stocks", label: "Economii sau portofoliu de acțiuni", desc: "Cash flow disponibil pentru optimizare" },
      { id: "none", label: "Fără active majore în prezent", desc: "Sunt la începutul acumulării" }
    ]
  },
  {
    id: "main-goal",
    question: "Care este cel mai important obiectiv financiar pe termen lung?",
    options: [
      { id: "independence", label: "Independența financiară (FIRE)", desc: "Construirea de venit pasiv sustenabil" },
      { id: "protection", label: "Protecția totală a familiei", desc: "Zero vulnerabilitate financiară la neprevăzut" },
      { id: "estate-transfer", label: "Succesiunea / Transferul averii", desc: "Mecanisme de transfer inter-generațional" },
      { id: "grow-portfolio", label: "Scalarea și multiplicarea capitalului", desc: "Plasamente imobiliare cu randament" }
    ]
  }
];

export function ConversationalSmartForms() {
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [selections, setSelections] = useState<Record<string, string>>({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<{ success: boolean; id?: string; error?: string } | null>(null);

  const handleOptionSelect = (optionId: string) => {
    const currentStep = steps[currentStepIdx];
    setSelections(prev => ({
      ...prev,
      [currentStep.id]: optionId
    }));

    // Auto-advance to next step
    if (currentStepIdx < steps.length - 1) {
      setCurrentStepIdx(prev => prev + 1);
    } else {
      // Go to contact collection step (represented by index steps.length)
      setCurrentStepIdx(steps.length);
    }
  };

  const handleBack = () => {
    if (currentStepIdx > 0) {
      setCurrentStepIdx(prev => prev - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) return;

    setIsSubmitting(true);
    
    const payload = {
      name,
      email,
      phone,
      ...selections
    };

    const response = await saveAssessment("SmartForm", payload);
    setIsSubmitting(false);
    setSubmissionResult(response);
  };

  const currentStep = steps[currentStepIdx];

  return (
    <div className="w-full max-w-3xl mx-auto min-h-[500px] flex flex-col justify-center gap-4">
      {/* Form Navigation Bar */}
      <div className="flex gap-2 justify-start mb-2 px-2">
        <Button type="button" variant="outline" size="sm" className="rounded-full gap-1 text-[11px] h-8" asChild>
          <Link href="/"><Home className="w-3.5 h-3.5" /> Home</Link>
        </Button>
        <Button 
          type="button" 
          variant="outline" 
          size="sm" 
          className="rounded-full gap-1 text-[11px] h-8" 
          onClick={() => {
            if (currentStepIdx > 0) {
              handleBack();
            } else {
              window.history.back();
            }
          }}
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Înapoi
        </Button>
        <Button type="button" variant="ghost" size="sm" className="rounded-full text-muted-foreground text-[11px] h-8" onClick={() => window.location.href = '/'}>
          Renunță
        </Button>
      </div>
      
      <AnimatePresence mode="wait">
        {submissionResult ? (
          // Final Success State
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="glass p-8 md:p-12 rounded-[3rem] border border-border bg-white text-center shadow-xl flex flex-col items-center justify-center"
          >
            <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 mb-6">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-heading font-black text-2xl md:text-3xl text-slate-900 mb-4 tracking-tight">
              Solicitare Înregistrată
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed max-w-md mx-auto mb-8">
              Datele tale au fost transmise securizat în baza de date Supabase a consultantului Cristian Văduva. Te vom contacta în cel mai scurt timp pentru planificarea auditului privat.
            </p>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 font-mono text-xs font-bold text-slate-700">
              Assessment ID: {submissionResult.id || "N/A"}
            </div>
          </motion.div>
        ) : currentStepIdx === steps.length ? (
          // Contact Details Input Step
          <motion.div
            key="contact-step"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="glass p-8 md:p-10 rounded-[3rem] border border-border bg-white shadow-xl flex flex-col justify-between"
          >
            <div className="mb-8">
              <button onClick={handleBack} className="text-xs font-bold text-slate-400 hover:text-slate-950 flex items-center gap-1.5 mb-6">
                <ArrowLeft className="w-4 h-4" /> Înapoi
              </button>
              <h3 className="font-heading font-black text-2xl text-slate-900 mb-2">Perfect. Pentru a finaliza solicitarea, introdu datele de contact:</h3>
              <p className="text-xs text-muted-foreground">Vom structura auditul în baza răspunsurilor oferite.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input 
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Numele tău complet..."
                  className="h-12 pl-12 rounded-xl border-2 bg-slate-50 focus-visible:ring-0"
                  required
                />
              </div>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input 
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Adresa de email..."
                  className="h-12 pl-12 rounded-xl border-2 bg-slate-50 focus-visible:ring-0"
                  required
                />
              </div>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input 
                  type="tel"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="Număr de telefon..."
                  className="h-12 pl-12 rounded-xl border-2 bg-slate-50 focus-visible:ring-0"
                  required
                />
              </div>

              <Button 
                type="submit" 
                disabled={isSubmitting || !name || !email || !phone}
                className="w-full h-14 rounded-full bg-slate-900 text-white font-bold hover:bg-slate-800 transition-colors mt-6 text-sm flex items-center justify-center gap-1.5"
              >
                {isSubmitting ? "Se trimite..." : "Trimite Solicitarea de Audit"}
              </Button>
            </form>
          </motion.div>
        ) : (
          // Conversational Steps
          <motion.div
            key={currentStep.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="glass p-8 md:p-10 rounded-[3rem] border border-border bg-white shadow-xl flex flex-col justify-between"
          >
            <div>
              {/* Back Button / Progress indicators */}
              <div className="flex justify-between items-center mb-6">
                {currentStepIdx > 0 ? (
                  <button onClick={handleBack} className="text-xs font-bold text-slate-400 hover:text-slate-950 flex items-center gap-1.5">
                    <ArrowLeft className="w-4 h-4" /> Înapoi
                  </button>
                ) : (
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Start chestionar</span>
                )}
                <span className="text-xs font-bold text-slate-500 bg-slate-50 px-3 py-1 rounded-full border border-slate-100">
                  Pasul {currentStepIdx + 1} din {steps.length}
                </span>
              </div>

              <h3 className="font-heading font-black text-xl md:text-2xl text-slate-900 mb-8 tracking-tight">
                {currentStep.question}
              </h3>

              {/* Step Options List */}
              <div className="flex flex-col gap-3">
                {currentStep.options.map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => handleOptionSelect(opt.id)}
                    className="w-full text-left p-5 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:border-slate-800 hover:shadow-md transition-all flex justify-between items-center group"
                  >
                    <div className="flex items-center gap-3">
                      {("icon" in opt) && (
                        <div className="p-2.5 bg-slate-100 rounded-full group-hover:bg-slate-900 group-hover:text-white transition-colors shrink-0">
                          {opt.icon}
                        </div>
                      )}
                      <div>
                        <span className="font-bold text-sm text-slate-800 block leading-tight">{opt.label}</span>
                        <span className="text-[10px] text-slate-400 mt-1 block">{opt.desc}</span>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                ))}
              </div>
            </div>

            {/* Simulated footer decoration */}
            <div className="mt-8 border-t border-slate-50 pt-4 flex justify-between items-center text-[9px] font-bold text-slate-400 uppercase tracking-widest">
              <span>Conversational Smart Forms</span>
              <span>AiX OS Client Journey</span>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
