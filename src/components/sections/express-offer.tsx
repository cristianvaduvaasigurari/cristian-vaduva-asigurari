"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2, Building, User, Car, ShieldAlert } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { submitLead } from "@/lib/actions";

const steps = [
  { id: "type", title: "Ce dorești să protejezi?" },
  { id: "details", title: "Numele Tău" },
  { id: "contact", title: "Număr de Telefon" }
];

export function ExpressOffer() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({ type: "", name: "", phone: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus input on step change
  useEffect(() => {
    if (step > 0 && inputRef.current) {
      inputRef.current.focus();
    }
  }, [step]);

  const handleNext = async () => {
    if (step < 2) {
      setStep(step + 1);
    } else {
      await handleSubmit();
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    const data = new FormData();
    data.append("name", formData.name);
    data.append("phone", formData.phone);
    data.append("service", formData.type);
    data.append("source", "Express Offer Form");
    data.append("message", "Lead rapid generat în 30s.");
    
    const res = await submitLead(data);
    setIsSubmitting(false);
    
    if (res.success) {
      setIsSuccess(true);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      if (step === 1 && formData.name.length > 2) handleNext();
      if (step === 2 && formData.phone.length >= 10) handleNext();
    }
  };

  if (isSuccess) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-lg mx-auto p-10 glass rounded-[3rem] border border-emerald-100 bg-emerald-50/50 text-center"
      >
        <CheckCircle2 className="w-16 h-16 text-emerald-600 mx-auto mb-6" />
        <h2 className="text-3xl font-bold font-heading mb-4 text-emerald-900">Perfect!</h2>
        <p className="text-emerald-700/80 mb-8 text-lg">
          Am primit datele. Un expert te va suna pe numărul {formData.phone} în cel mai scurt timp pentru a-ți oferi cotația exactă.
        </p>
        <Button className="w-full rounded-full bg-emerald-600 hover:bg-emerald-700 text-white h-12" onClick={() => window.location.href = '/'}>
          Înapoi la Site
        </Button>
      </motion.div>
    );
  }

  const progress = ((step) / steps.length) * 100;

  return (
    <div className="w-full max-w-xl mx-auto relative">
      {/* Progress */}
      <div className="absolute -top-12 left-0 right-0 flex justify-between items-end">
        <div className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Pasul {step + 1}/3</div>
        <div className="w-32 h-1.5 bg-muted rounded-full overflow-hidden">
          <motion.div className="h-full bg-foreground" initial={{ width: 0 }} animate={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="glass p-8 md:p-12 rounded-[3rem] border border-border shadow-2xl min-h-[400px] flex flex-col justify-center relative overflow-hidden bg-white">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            <h2 className="text-3xl font-bold font-heading mb-8 text-foreground text-center">
              {steps[step].title}
            </h2>

            {step === 0 && (
              <div className="grid grid-cols-2 gap-4">
                <button onClick={() => { setFormData({ ...formData, type: "Asigurare Auto / Flote" }); handleNext(); }} className="flex flex-col items-center justify-center p-6 rounded-3xl border-2 border-border hover:border-blue-600 hover:bg-blue-50 transition-all gap-4 group">
                  <Car className="w-8 h-8 text-muted-foreground group-hover:text-blue-600" />
                  <span className="font-bold text-sm">Auto & Flote</span>
                </button>
                <button onClick={() => { setFormData({ ...formData, type: "Asigurare Casă / Patrimoniu" }); handleNext(); }} className="flex flex-col items-center justify-center p-6 rounded-3xl border-2 border-border hover:border-amber-500 hover:bg-amber-50 transition-all gap-4 group">
                  <Building className="w-8 h-8 text-muted-foreground group-hover:text-amber-500" />
                  <span className="font-bold text-sm">Patrimoniu Imobiliar</span>
                </button>
                <button onClick={() => { setFormData({ ...formData, type: "Viață & Sănătate" }); handleNext(); }} className="flex flex-col items-center justify-center p-6 rounded-3xl border-2 border-border hover:border-rose-500 hover:bg-rose-50 transition-all gap-4 group">
                  <User className="w-8 h-8 text-muted-foreground group-hover:text-rose-500" />
                  <span className="font-bold text-sm">Viață & Sănătate</span>
                </button>
                <button onClick={() => { setFormData({ ...formData, type: "Business / IMM" }); handleNext(); }} className="flex flex-col items-center justify-center p-6 rounded-3xl border-2 border-border hover:border-indigo-600 hover:bg-indigo-50 transition-all gap-4 group">
                  <ShieldAlert className="w-8 h-8 text-muted-foreground group-hover:text-indigo-600" />
                  <span className="font-bold text-sm">Business / IMM</span>
                </button>
              </div>
            )}

            {step === 1 && (
              <div className="flex flex-col items-center max-w-sm mx-auto">
                <Input 
                  ref={inputRef}
                  type="text" 
                  placeholder="Ex: Ion Popescu"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  onKeyDown={handleKeyDown}
                  className="h-16 text-center text-xl font-bold rounded-2xl border-2 focus-visible:ring-0 focus:border-foreground mb-6"
                />
                <Button 
                  onClick={handleNext}
                  disabled={formData.name.length < 3}
                  className="w-full h-14 rounded-full bg-foreground text-background text-lg font-bold"
                >
                  Continuă <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            )}

            {step === 2 && (
              <div className="flex flex-col items-center max-w-sm mx-auto">
                <Input 
                  ref={inputRef}
                  type="tel" 
                  placeholder="07XX XXX XXX"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  onKeyDown={handleKeyDown}
                  className="h-16 text-center text-xl font-bold rounded-2xl border-2 focus-visible:ring-0 focus:border-foreground mb-6"
                />
                <Button 
                  onClick={handleNext}
                  disabled={formData.phone.length < 10 || isSubmitting}
                  className="w-full h-14 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold"
                >
                  {isSubmitting ? "Trimitem..." : "Cere Oferta Acum"} <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <p className="text-xs text-muted-foreground text-center mt-4">Nu trimitem SPAM. Te vom suna doar pentru oferta cerută.</p>
              </div>
            )}

          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
