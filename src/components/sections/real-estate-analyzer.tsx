"use client";

import * as React from "react"; import { useState } from "react";
import { Calculator, TrendingUp, ArrowRight, ShieldAlert, Activity } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { saveAssessment } from "@/lib/actions";

export function RealEstateAnalyzer() {
  const [data, setData] = useState({
    price: 150000,
    downPayment: 30000,
    interestRate: 6.5,
    rent: 850,
    maintenance: 50,
    taxes: 120, // anuale
    vacancy: 5, // %
    renovation: 10000
  });
  
  const [reportId, setReportId] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const calculateMetrics = () => {
    // Basic Investment Math
    const loanAmount = data.price - data.downPayment;
    const monthlyRate = data.interestRate / 100 / 12;
    const n = 30 * 12; // asume 30 years mortgage
    
    let monthlyMortgage = 0;
    if (loanAmount > 0 && monthlyRate > 0) {
      monthlyMortgage = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1);
    }
    
    const effectiveRent = data.rent * (1 - data.vacancy / 100);
    const monthlyTaxes = data.taxes / 12;
    const monthlyCashFlow = effectiveRent - monthlyMortgage - data.maintenance - monthlyTaxes;
    const annualCashFlow = monthlyCashFlow * 12;
    
    const totalInvestedCash = data.downPayment + data.renovation;
    const cashOnCashROI = totalInvestedCash > 0 ? (annualCashFlow / totalInvestedCash) * 100 : 0;
    const grossYield = (data.rent * 12) / data.price * 100;
    
    // Payback
    const paybackYears = totalInvestedCash > 0 && annualCashFlow > 0 ? totalInvestedCash / annualCashFlow : 0;
    
    let riskLevel = "Redus";
    if (cashOnCashROI < 3) riskLevel = "Ridicat";
    else if (cashOnCashROI < 7) riskLevel = "Mediu";

    return { monthlyMortgage, monthlyCashFlow, cashOnCashROI, grossYield, paybackYears, riskLevel, totalInvestedCash };
  };

  const metrics = calculateMetrics();

  const handleSave = async () => {
    setIsProcessing(true);
    await new Promise(r => setTimeout(r, 1500));
    const res = await saveAssessment("Real_Estate_Analyzer", { ...data, metrics });
    if (res.success && res.id) setReportId(res.id);
    setIsProcessing(false);
  };

  const handleChange = (field: keyof typeof data, value: string) => {
    setData({ ...data, [field]: Number(value) || 0 });
    setReportId(null);
  };

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row gap-8">
      {/* Inputs */}
      <div className="w-full lg:w-5/12 glass p-8 rounded-[2.5rem] border border-border shadow-sm space-y-6 bg-white">
        <h3 className="text-2xl font-bold font-heading mb-6 flex items-center gap-2">
          <Calculator className="w-6 h-6 text-amber-600" /> Parametrii Investiției
        </h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 block">Preț Achiziție (€)</label>
            <Input type="number" value={data.price || ''} onChange={e => handleChange('price', e.target.value)} className="h-12 font-bold" />
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 block">Avans Plătit (€)</label>
            <Input type="number" value={data.downPayment || ''} onChange={e => handleChange('downPayment', e.target.value)} className="h-12" />
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 block">Buget Renovare (€)</label>
            <Input type="number" value={data.renovation || ''} onChange={e => handleChange('renovation', e.target.value)} className="h-12" />
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 block">Dobândă Bancară (%)</label>
            <Input type="number" value={data.interestRate || ''} onChange={e => handleChange('interestRate', e.target.value)} className="h-12" />
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 block">Risc Neocupare (%)</label>
            <Input type="number" value={data.vacancy || ''} onChange={e => handleChange('vacancy', e.target.value)} className="h-12" />
          </div>
          <div className="col-span-2 border-t border-border pt-4 mt-2">
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 block">Chirie Estimată Lunar (€)</label>
            <Input type="number" value={data.rent || ''} onChange={e => handleChange('rent', e.target.value)} className="h-12 font-bold text-emerald-600" />
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 block">Mentenanță/Lunară (€)</label>
            <Input type="number" value={data.maintenance || ''} onChange={e => handleChange('maintenance', e.target.value)} className="h-12" />
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 block">Impozite Anuale (€)</label>
            <Input type="number" value={data.taxes || ''} onChange={e => handleChange('taxes', e.target.value)} className="h-12" />
          </div>
        </div>
      </div>

      {/* Outputs */}
      <div className="w-full lg:w-7/12 flex flex-col gap-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="glass p-6 rounded-3xl border border-emerald-100 bg-emerald-50/50 flex flex-col justify-center">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 mb-1">Cash on Cash</span>
            <span className="text-3xl font-heading font-bold text-emerald-600">{metrics.cashOnCashROI.toFixed(1)}%</span>
          </div>
          <div className="glass p-6 rounded-3xl border border-blue-100 bg-blue-50/50 flex flex-col justify-center">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-800 mb-1">Gross Yield</span>
            <span className="text-3xl font-heading font-bold text-blue-600">{metrics.grossYield.toFixed(1)}%</span>
          </div>
          <div className="glass p-6 rounded-3xl border border-amber-100 bg-amber-50/50 flex flex-col justify-center">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800 mb-1">Recuperare</span>
            <span className="text-3xl font-heading font-bold text-amber-600">{metrics.paybackYears > 0 ? metrics.paybackYears.toFixed(1) + " Ani" : "∞"}</span>
          </div>
          <div className="glass p-6 rounded-3xl border border-purple-100 bg-purple-50/50 flex flex-col justify-center">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-800 mb-1">Risc Estimativ</span>
            <span className="text-2xl font-heading font-bold text-purple-600">{metrics.riskLevel}</span>
          </div>
        </div>

        <div className="glass p-8 md:p-10 rounded-[3rem] border border-border shadow-xl flex-grow flex flex-col justify-center bg-white relative overflow-hidden">
          {/* Decorative background */}
          <div className="absolute -right-20 -top-20 opacity-5 pointer-events-none">
            <TrendingUp className="w-96 h-96" />
          </div>

          <h3 className="text-xl font-bold font-heading mb-6 flex items-center gap-2">
            <Activity className="w-5 h-5 text-blue-600" /> Raport Flux de Numerar
          </h3>

          <div className="space-y-4 mb-8 relative z-10">
            <div className="flex justify-between items-center py-2 border-b border-border">
              <span className="text-muted-foreground">Rată Bancară (IPOTETIC)</span>
              <span className="font-bold">€{metrics.monthlyMortgage.toFixed(0)} / lună</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border">
              <span className="text-muted-foreground">Total Cash Investit Inițial</span>
              <span className="font-bold">€{metrics.totalInvestedCash.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center py-3 bg-slate-50 px-4 rounded-xl mt-4">
              <span className="font-bold">Net Cash Flow Lunar (Profit real)</span>
              <span className={`text-xl font-bold ${metrics.monthlyCashFlow > 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                {metrics.monthlyCashFlow > 0 ? '+' : ''}€{metrics.monthlyCashFlow.toFixed(0)}
              </span>
            </div>
          </div>

          <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100 relative z-10 mb-8">
            <h4 className="font-bold flex items-center gap-2 text-amber-800 mb-2">
              <ShieldAlert className="w-5 h-5" /> Vulnerabilitate: Un singur incident distruge randamentul
            </h4>
            <p className="text-sm text-amber-700/80 leading-relaxed">
              O conductă spartă sau un chiriaș care provoacă daune de 5.000€ îți anulează Cash Flow-ul pe 1-2 ani. Protejează profitul cu o poliță &quot;Proprietar &amp; Chiriaș&quot; de ~80€/an.
            </p>
          </div>

          <div className="flex items-center gap-4 relative z-10">
            <Button onClick={handleSave} disabled={isProcessing || !!reportId} className="h-14 rounded-full bg-foreground text-background font-bold px-8 flex-grow">
              {isProcessing ? "Se salvează..." : reportId ? `Raport Salvat: ${reportId}` : "Salvează Evaluarea în our platform"}
            </Button>
            <Button variant="outline" className="h-14 w-14 rounded-full border-border p-0 flex items-center justify-center shrink-0" asChild>
              <a href="/contact"><ArrowRight className="w-5 h-5" /></a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
