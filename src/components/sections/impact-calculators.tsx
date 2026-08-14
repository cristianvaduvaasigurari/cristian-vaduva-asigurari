"use client";

import * as React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Flame,
  Droplets,
  CarFront,
  Stethoscope,
  Factory,
  TrendingDown,
  ShieldCheck,
  ArrowRight,
  Home,
  ArrowLeft,
  Loader2,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { trackConversion } from "@/lib/analytics";
import Link from "next/link";

type CalculatorType = "fire" | "water" | "car" | "medical" | "business";

export function ImpactCalculators() {
  const [activeTab, setActiveTab] = useState<CalculatorType>("fire");
  const [value, setValue] = useState<number>(100000);
  const [selectedService, setSelectedService] = useState<string>("Asigurare Locuință");

  // Form states
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

  const getServiceForTab = (tab: CalculatorType) => {
    switch (tab) {
      case "fire":
      case "water":
        return "Asigurare Locuință";
      case "car":
        return "Asigurare Auto / CASCO";
      case "medical":
        return "Asigurare Sănătate";
      case "business":
        return "Asigurare Business";
      default:
        return "Asigurare Locuință";
    }
  };

  const handleTabChange = (id: CalculatorType) => {
    setActiveTab(id);
    setSelectedService(getServiceForTab(id));
    const tab = tabs.find(t => t.id === id);
    if (tab) setValue(tab.defaultVal);
    setIsSuccess(false);
    setError(null);
  };

  // Logic to calculate estimated premium and loss
  const getMetrics = () => {
    const loss = value;
    let premium = 0;
    let label = "";

    switch (activeTab) {
      case "fire":
        premium = value * 0.0015; // aprox 0.15% din valoare / an
        label = "Valoarea de reconstrucție a locuinței";
        break;
      case "water":
        premium = value * 0.003; // aprox 0.3% pt daune apă/bunuri
        label = "Valoarea daunelor estimative la interior";
        break;
      case "car":
        premium = value * 0.045; // aprox 4.5% din valoare pt CASCO
        label = "Valoarea de piață a mașinii";
        break;
      case "medical":
        premium = value > 100000 ? 1200 : 800; // cost fix anual aprox pt asigurare sănătate internațională
        label = "Costul estimat al tratamentului în străinătate";
        break;
      case "business":
        premium = value * 0.005; // aprox 0.5% din profitul brut asigurat
        label = "Pierdere Profit Brut / Costuri fixe pe perioada de pauză";
        break;
    }

    const lossPercentage = 100;
    const premiumPercentage = Math.max((premium / loss) * 100, 2);

    return { loss, premium, label, lossPercentage, premiumPercentage };
  };

  const metrics = getMetrics();
  const currentTab = tabs.find(t => t.id === activeTab);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const formData = new FormData(e.currentTarget);
      formData.append("source", "Financial Impact Calculator");
      formData.append(
        "metadata",
        JSON.stringify({
          tab: activeTab,
          tabLabel: currentTab?.label,
          valoareCalculata: formatCurrency(value),
          pierderePotentiala: formatCurrency(metrics.loss),
          costAsigurareEstimatAn: formatCurrency(metrics.premium),
        })
      );

      const response = await fetch('/api/lead', {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || "Eroare la salvarea datelor.");
      }

      setIsSuccess(true);
      trackConversion(`calculator_lead_submit_${activeTab}`);
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      console.error("Error submitting calculator lead:", err);
      setError(err instanceof Error ? err.message : "A apărut o eroare de rețea. Te rugăm să încerci din nou.");
    } finally {
      setIsSubmitting(false);
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
            className="glass premium-card p-8 md:p-10 rounded-[2.5rem] border border-border flex flex-col justify-center"
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

                {/* Premium Bar */}
                <div>
                  <div className="flex justify-between text-sm font-bold text-emerald-600 mb-2">
                    <span>Cost Asigurare (Pe An)</span>
                    <span>~{formatCurrency(metrics.premium)}</span>
                  </div>
                  <div className="w-full h-4 bg-emerald-100 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-emerald-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${metrics.premiumPercentage}%` }}
                      transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <p className="text-sm text-muted-foreground flex items-start gap-2 leading-relaxed">
              <TrendingDown className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
              Transferi un risc de {formatCurrency(metrics.loss)} către o companie de asigurări plătind doar {formatCurrency(metrics.premium)} anual. Matematic, este singura decizie financiară corectă.
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Right Side: CTA / Classic Lead Gen Form */}
        <div className="glass premium-card p-8 md:p-10 rounded-[2.5rem] border border-blue-100 bg-gradient-to-br from-blue-50/50 to-white flex flex-col justify-center">
          <div className="text-center mb-6">
            <ShieldCheck className="w-12 h-12 text-blue-600 mx-auto mb-3" />
            <h3 className="text-2xl font-bold font-heading mb-2">Obține Ofertă Exactă</h3>
            <p className="text-sm text-muted-foreground">
              Completează datele și Cristian Văduva îți va oferi cotația exactă adaptată nevoilor tale.
            </p>
          </div>

          {!isSuccess ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5 text-left">
                  <label htmlFor="name" className="text-xs font-semibold ml-1 text-foreground/80">
                    Nume Complet *
                  </label>
                  <Input
                    id="name"
                    name="name"
                    required
                    placeholder="Ion Popescu"
                    className="rounded-xl h-11 bg-white"
                  />
                </div>
                <div className="space-y-1.5 text-left">
                  <label htmlFor="phone" className="text-xs font-semibold ml-1 text-foreground/80">
                    Telefon *
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    required
                    type="tel"
                    placeholder="07xx xxx xxx"
                    className="rounded-xl h-11 bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5 text-left">
                  <label htmlFor="email" className="text-xs font-semibold ml-1 text-foreground/80">
                    Email *
                  </label>
                  <Input
                    id="email"
                    name="email"
                    required
                    type="email"
                    placeholder="ion@exemplu.ro"
                    className="rounded-xl h-11 bg-white"
                  />
                </div>
                <div className="space-y-1.5 text-left">
                  <label htmlFor="service_type" className="text-xs font-semibold ml-1 text-foreground/80">
                    Serviciu / Solicitare *
                  </label>
                  <div className="relative">
                    <select
                      id="service_type"
                      name="service"
                      required
                      value={selectedService}
                      onChange={(e) => setSelectedService(e.target.value)}
                      className="flex h-11 w-full rounded-xl border border-border bg-white px-3 py-2 text-xs shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary appearance-none pr-8 font-medium"
                    >
                      <option value="Asigurare Locuință">Asigurare Locuință</option>
                      <option value="Asigurare Auto / CASCO">Asigurare Auto / CASCO</option>
                      <option value="Asigurare Sănătate">Asigurare Sănătate</option>
                      <option value="Asigurare Business">Asigurare Business</option>
                      <option value="Generali Asigurări">Generali Asigurări</option>
                      <option value="Credite">Credite</option>
                      <option value="Altele">Altele</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground">
                      <svg className="fill-current h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-1.5 text-left">
                <label htmlFor="message" className="text-xs font-semibold ml-1 text-foreground/80">
                  Mesaj / Detalii (Opțional)
                </label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Spune-ne mai multe detalii despre solicitarea ta..."
                  className="rounded-xl min-h-[80px] text-xs bg-white"
                />
              </div>

              {error && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-2 text-red-500 text-xs font-medium text-left">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <p className="text-[11px] text-muted-foreground leading-relaxed text-left">
                Prin trimiterea acestui formular, confirmi că ai citit și ești de acord cu{" "}
                <Link href="/legal/privacy-policy" className="text-blue-500 hover:underline">
                  Politica de Confidențialitate & Notă GDPR
                </Link>{" "}
                și îți exprimi consimțământul pentru a fi contactat în legătură cu solicitarea ta.
              </p>

              <Button
                type="submit"
                size="lg"
                className="w-full text-base h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg transition-transform hover:-translate-y-0.5 font-bold"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Se trimite...
                  </>
                ) : (
                  <>
                    Obține Ofertă Exactă <ArrowRight className="w-5 h-5 ml-2" />
                  </>
                )}
              </Button>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-emerald-50 text-emerald-800 p-8 rounded-2xl border border-emerald-200 text-center flex flex-col items-center justify-center space-y-3"
            >
              <CheckCircle2 className="w-14 h-14 text-emerald-600" />
              <h4 className="font-bold text-2xl text-emerald-900">Cerere trimisă cu succes!</h4>
              <p className="text-sm text-emerald-700 leading-relaxed max-w-sm">
                Datele tale au fost trimise securizat. Cristian Văduva te va contacta telefonic sau prin email în cel mai scurt timp.
              </p>
              <Button
                variant="outline"
                className="mt-4 rounded-full border-emerald-300 text-emerald-800 hover:bg-emerald-100 font-semibold"
                onClick={() => setIsSuccess(false)}
              >
                Trimite altă solicitare
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

