"use client";

import React, { useRef, useState } from "react";
import { CheckCircle2, AlertTriangle, TrendingUp, Shield, Activity, ArrowRight, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { generatePDFFromElement } from "@/lib/pdf-generator";

export function StrategyReport() {
  const documentRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handlePrint = async () => {
    if (!documentRef.current) return;
    setIsGenerating(true);
    await generatePDFFromElement(documentRef.current, "Raport-Strategic-AiX");
    setIsGenerating(false);
  };

  return (
    <div className="w-full max-w-[850px] mx-auto">
      {/* Utility Bar (Hidden on Print) */}
      <div className="flex justify-end gap-3 mb-6 print:hidden">
        <Button variant="outline" className="rounded-full bg-white font-bold" onClick={handlePrint} disabled={isGenerating}>
          <Printer className="w-4 h-4 mr-2" /> {isGenerating ? "Se generează..." : "Descarcă PDF"}
        </Button>
        <Button className="rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold" onClick={() => window.location.href='/contact'}>
          Programează Implementarea <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>

      {/* A4 Document Container */}
      <div ref={documentRef} className="bg-white p-8 md:p-16 rounded-[2rem] shadow-2xl print:shadow-none print:p-0 print:rounded-none">
        
        {/* Header */}
        <div className="border-b-4 border-slate-900 pb-8 mb-10 flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-heading font-black tracking-tight text-slate-900 mb-2 uppercase">Strategie Patrimonială</h1>
            <p className="text-lg text-slate-500 font-medium tracking-wide">Raport Confidențial AiX OS</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Data Evaluării</p>
            <p className="text-lg font-bold text-slate-900">{new Date().toLocaleDateString('ro-RO')}</p>
          </div>
        </div>

        {/* Executive Summary */}
        <section className="mb-12">
          <h2 className="text-xl font-bold font-heading text-slate-900 uppercase tracking-wider mb-6 flex items-center gap-2">
            <Activity className="w-5 h-5" /> Executive Summary
          </h2>
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 text-slate-700 leading-relaxed text-justify">
            În urma analizei profilului tău (AiX Financial Twin) și a obligațiilor curente, am identificat un patrimoniu net cu potențial excelent, dar expus unor riscuri majore pe pilonul de dependență familială și expunere pe real estate. Acest raport propune arhitectura de protecție necesară pentru a securiza veniturile și activele în următorii 10 ani.
          </div>
        </section>

        {/* Financial Snapshot */}
        <section className="mb-12">
          <h2 className="text-xl font-bold font-heading text-slate-900 uppercase tracking-wider mb-6 flex items-center gap-2">
            <TrendingUp className="w-5 h-5" /> Snapshot Financiar (Estimat)
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 border-l-4 border-emerald-500 bg-emerald-50">
              <p className="text-xs font-bold text-emerald-800 uppercase mb-1">Active Totale</p>
              <p className="text-2xl font-bold font-heading text-emerald-900">€350,000</p>
            </div>
            <div className="p-4 border-l-4 border-rose-500 bg-rose-50">
              <p className="text-xs font-bold text-rose-800 uppercase mb-1">Pasive (Credite)</p>
              <p className="text-2xl font-bold font-heading text-rose-900">€120,000</p>
            </div>
            <div className="p-4 border-l-4 border-blue-500 bg-blue-50">
              <p className="text-xs font-bold text-blue-800 uppercase mb-1">Valoare Netă</p>
              <p className="text-2xl font-bold font-heading text-blue-900">€230,000</p>
            </div>
            <div className="p-4 border-l-4 border-amber-500 bg-amber-50">
              <p className="text-xs font-bold text-amber-800 uppercase mb-1">Scor Protecție</p>
              <p className="text-2xl font-bold font-heading text-amber-900">45%</p>
            </div>
          </div>
        </section>

        {/* Gaps & Recommendations */}
        <section className="mb-12">
          <h2 className="text-xl font-bold font-heading text-slate-900 uppercase tracking-wider mb-6 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" /> Vulnerabilități & Soluții
          </h2>
          <div className="space-y-6">
            
            {/* Item 1 */}
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center shrink-0">
                <span className="text-rose-600 font-bold">1</span>
              </div>
              <div>
                <h3 className="font-bold text-lg text-slate-900">Expunerea Familiei la Dispariția Venitului</h3>
                <p className="text-sm text-rose-600 font-bold mb-2">Vulnerabilitate Critică</p>
                <p className="text-slate-600 mb-3 text-sm leading-relaxed">În lipsa venitului tău principal, familia nu ar putea susține rata la casă și cheltuielile curente mai mult de 4 luni. Gradul de dependență financiară este ridicat.</p>
                <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <div>
                    <p className="text-sm font-bold text-emerald-900">Soluție Recomandată</p>
                    <p className="text-sm text-emerald-800">Poliță de Viață cu protecție pură. Sumă asigurată recomandată: €150,000. Cost estimativ lunar: ~€40-€60.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Item 2 */}
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                <span className="text-amber-600 font-bold">2</span>
              </div>
              <div>
                <h3 className="font-bold text-lg text-slate-900">Sub-asigurarea Portofoliului Imobiliar</h3>
                <p className="text-sm text-amber-600 font-bold mb-2">Vulnerabilitate Medie</p>
                <p className="text-slate-600 mb-3 text-sm leading-relaxed">Polițele cesionate în favoarea băncii acoperă doar soldul creditului (€120,000), lăsând restul de valoare și bunurile personale (mobilier/electronice) total neprotejate la incendiu/inundație.</p>
                <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <div>
                    <p className="text-sm font-bold text-emerald-900">Soluție Recomandată</p>
                    <p className="text-sm text-emerald-800">Suplimentarea poliței obligatorii (PAD) cu o poliță Facultativă extinsă &quot;All Risks&quot; la valoarea reală de reconstrucție.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Next Steps */}
        <section className="bg-slate-900 text-white p-8 rounded-3xl print:bg-slate-100 print:text-slate-900 print:border print:border-slate-300">
          <h2 className="text-xl font-bold font-heading uppercase tracking-wider mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5" /> Planul de Acțiune
          </h2>
          <ol className="list-decimal pl-5 space-y-3 font-medium">
            <li>Revizuirea acestui raport împreună cu consultantul Cristian Văduva.</li>
            <li>Selectarea pachetelor de protecție (Viață + Locuință) și semnarea cererilor.</li>
            <li>Optimizarea viitoare a cash flow-ului pentru investiții imobiliare.</li>
          </ol>
          <div className="mt-8 pt-6 border-t border-white/20 print:border-slate-300 text-sm opacity-80">
            Document generat prin platforma AiX OS. Analiza reprezintă o simulare teoretică și devine operațională doar prin emiterea polițelor finale.
          </div>
        </section>

        {/* Contact Info & CTA Block (For PDF/Print) */}
        <section className="mt-8 p-6 bg-slate-50 border border-slate-200 rounded-3xl text-slate-800">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h4 className="font-heading font-bold text-sm text-slate-950 mb-1">PROGRAMEAZĂ O CONSULTANȚĂ PRIVATĂ</h4>
              <p className="text-xs text-slate-500 font-semibold uppercase">Consultant Premium: Cristian Văduva</p>
            </div>
            <div className="text-left sm:text-right text-xs space-y-1 font-mono font-bold text-slate-700">
              <p>Telefon: +40 767 110 439</p>
              <p>WhatsApp: +43 650 953 6345</p>
              <p>Email: contact@cristianvaduva.com</p>
              <p>Web: www.cristianvaduva.com</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
