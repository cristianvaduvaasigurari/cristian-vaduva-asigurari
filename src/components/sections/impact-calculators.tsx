"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, Droplets, CarFront, Stethoscope, Factory, TrendingDown, ShieldCheck, ArrowRight, Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import Link from "next/link";

type CalculatorType = "fire" | "water" | "car" | "medical" | "business";

export function ImpactCalculators() {
  const [activeTab, setActiveTab] = useState<CalculatorType>("fire");
  const [value, setValue] = useState<number>(100000);
  
  // Lead Form
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("ro-RO", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(val);
  };

  const tabs = [
    { id: "fire", label: "Incendiu Casă", icon: <Flame className="w-5 h-5" />, defaultVal: 150000, min: 50000, max: 2000000, step: 10000 },
    { id: "water", label: "Inundație Apă", icon: <Droplets className="w-5 h-5" />, defaultVal: 20000, min: 5000, max: 100000, step: 5000 },
    { id: "car", label: "Daună Totală Auto", icon: <CarFront className="w-5 h-5" />, defaultVal: 35000, min: 10000, max: 300000, step: 5000 },
    { id: "medical", label: "Urgență Medicală", icon: <Stethoscope className="w-5 h-5" />, defaultVal: 50000, min: 10000, max: 500000, step: 10000 },
    { id: "business", label: "Pauză Business", icon: <Factory className="w-5 h-5" />, defaultVal: 250000, min: 50000, max: 5000000, step: 50000 },
  ];

  const handleTabChange = (id: CalculatorType) => {
    setActiveTab(id);
    const tab = tabs.find(t => t.id === id);
    if (tab) setValue(tab.defaultVal);
    setIsSuccess(false);
  };

  // Logic to calculate estimated beneficiu and loss
  const getMetrics = () => {
    const loss = value;
    let acoperirePentruTine = 0;
    let label = "";

    switch (activeTab) {
      case "fire":
        acoperirePentruTine = value * 0.0015; // aprox 0.15% din valoare / an
        label = "Valoarea de reconstrucție a locuinței";
        break;
      case "water":
        acoperirePentruTine = value * 0.003; // aprox 0.3% pt daune apă/bunuri
        label = "Valoarea daunelor estimative la interior";
        break;
      case "car":
        acoperirePentruTine = value * 0.045; // aprox 4.5% din valoare pt CASCO
        label = "Valoarea de piață a mașinii";
        break;
      case "medical":
        acoperirePentruTine = value > 100000 ? 1200 : 800; // cost fix anual aprox pt asigurare sănătate internațională
        label = "Costul estimat al tratamentului în străinătate";
        break;
      case "business":
        acoperirePentruTine = value * 0.005; // aprox 0.5% din profitul brut asigurat
        label = "Pierdere Profit Brut / Costuri fixe pe perioada de pauză";
        break;
    }

    // Procente pt vizualizare în bar chart
    const lossPercentage = 100;
    const beneficiuPercentage = Math.max((acoperirePentruTine / loss) * 100, 2); // minim 2% pt a se vedea pe grafic

    return { loss, acoperirePentruTine, label, lossPercentage, beneficiuPercentage };
  };

  const metrics = getMetrics();
  const currentTab = tabs.find(t => t.id === activeTab);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) return;
    
    setIsSubmitting(true);
    setError(null);
    const formData = new FormData();
    formData.append("name", "Lead Calculator");
    formData.append("phone", phone);
    formData.append("service", `Calculator ${activeTab}`);
    formData.append("source", "Financial Impact Calculator");
    formData.append("metadata", JSON.stringify({ tab: activeTab, valueCalculated: value, estimatedbeneficiu: metrics.acoperirePentruTine }));

    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();
      setIsSubmitting(false);
      if (result.success) {
        setIsSuccess(true);
      } else {
        setError(result.error || "A apărut o eroare la salvare.");
      }
    } catch {
      setIsSubmitting(false);
      setError("A apărut o eroare de rețea. Te rugăm să încerci din nou.");
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-6">
      {/* Form Navigation Bar */}
      <div className="flex gap-2 justify-start px-2">
        <Button type="button" variant="outline" size="sm" className="rounded-full gap-1 text-[11px] h-8" asChild>
          <Link href="/"><Home className="w-3.5 h-3.5" /> Home</Link>
        </Button>
        <Button type="button" variant="outline" size="sm" className="rounded-full gap-1 text-[11px] h-8" onClick={() => window.history.back()}>
          <ArrowLeft className="w-3.5 h-3.5" /> Înapoi
        </Button>
        <Button type="button" variant="ghost" size="sm" className="rounded-full text-muted-foreground text-[11px] h-8" onClick={() => window.location.href = '/'}>
          Renunță
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 mb-12">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id as CalculatorType)}
            className={`flex items-center gap-2 px-4 md:px-6 py-3 rounded-full text-sm md:text-base font-bold transition-all duration-300 ${
              activeTab === tab.id
                ? "bg-foreground text-background shadow-lg scale-105"
                : "bg-white text-muted-foreground border border-border hover:border-foreground/30 hover:text-foreground"
            }`}
          >
            {tab.icon}
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Side: Inputs */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="glass coverage-card p-8 md:p-10 rounded-[2.5rem] border border-border flex flex-col justify-center"
          >
            <h3 className="text-2xl font-bold font-heading mb-6">{metrics.label}</h3>
            
            <div className="mb-12">
              <div className="text-4xl font-bold text-blue-600 mb-6 font-heading">
                {formatCurrency(value)}
              </div>
              <input
                type="range"
                min={currentTab?.min}
                max={currentTab?.max}
                step={currentTab?.step}
                value={value}
                onChange={(e) => setValue(Number(e.target.value))}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-3 font-medium">
                <span>{formatCurrency(currentTab?.min || 0)}</span>
                <span>{formatCurrency(currentTab?.max || 0)}</span>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 mb-8">
              <h4 className="font-bold text-sm text-slate-500 uppercase tracking-wider mb-4">Impact Financiar Estimativ</h4>
              
              <div className="space-y-6">
                {/* Loss Bar */}
                <div>
                  <div className="flex justify-between text-sm font-bold text-rose-600 mb-2">
                    <span>Pierdere Potențială (Fără Asigurare)</span>
                    <span>{formatCurrency(metrics.loss)}</span>
                  </div>
                  <div className="w-full h-4 bg-rose-100 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-rose-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${metrics.lossPercentage}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    />
                  </div>
                </div>

                {/* beneficiu Bar */}
                <div>
                  <div className="flex justify-between text-sm font-bold text-emerald-600 mb-2">
                    <span>Cost Asigurare (Pe An)</span>
                    <span>~{formatCurrency(metrics.acoperirePentruTine)}</span>
                  </div>
                  <div className="w-full h-4 bg-emerald-100 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-emerald-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${metrics.beneficiuPercentage}%` }}
                      transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <p className="text-sm text-muted-foreground flex items-start gap-2 leading-relaxed">
              <TrendingDown className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
              Transferi un risc de {formatCurrency(metrics.loss)} către o companie de asigurări plătind doar {formatCurrency(metrics.acoperirePentruTine)} anual. Matematic, este singura decizie financiară corectă.
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Right Side: CTA / Lead Gen */}
        <div className="glass coverage-card p-8 md:p-10 rounded-[2.5rem] border border-blue-100 bg-gradient-to-br from-blue-50/50 to-white flex flex-col justify-center text-center">
          <ShieldCheck className="w-16 h-16 text-blue-600 mx-auto mb-6" />
          <h3 className="text-3xl font-bold font-heading mb-4">Protejează-ți Viitorul Acum</h3>
          <p className="text-muted-foreground mb-8 text-lg">
            Acestea sunt estimări matematice. Cere un cost exact și condițiile specifice pentru cazul tău.
          </p>

          {!isSuccess ? (
            <form onSubmit={handleSubmit} className="w-full max-w-sm mx-auto flex flex-col gap-4">
              <Input 
                type="tel" 
                placeholder="Numărul tău de telefon..." 
                value={phone} 
                onChange={(e) => setPhone(e.target.value)}
                className="h-14 text-lg text-center rounded-full border-blue-200 focus:border-blue-600 bg-white"
                required
              />
              <Button 
                type="submit" 
                disabled={isSubmitting || !phone}
                className="h-14 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold w-full"
              >
                {isSubmitting ? "Se trimite..." : "Obține Ofertă Exactă"} <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              {error && (
                <p className="text-sm font-bold text-red-500 mt-2">{error}</p>
              )}
              <p className="text-xs text-muted-foreground mt-2">Un consultant beneficiu te va contacta rapid.</p>
            </form>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-emerald-50 text-emerald-800 p-6 rounded-2xl border border-emerald-200"
            >
              <h4 className="font-bold text-lg mb-2">Cerere trimisă cu succes!</h4>
              <p className="text-sm">Analizăm piața pentru valorile introduse și revenim la tine pe numărul furnizat.</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
