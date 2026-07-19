"use client";

import * as React from "react"; import { useRef, useState } from "react";
import { Shield, Printer, User, AlertTriangle, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { generatePDFFromElement } from "@/lib/pdf-generator";

export function WealthPassportDocument() {
  const documentRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handlePrint = async () => {
    if (!documentRef.current) return;
    setIsGenerating(true);
    await generatePDFFromElement(documentRef.current, "Wealth-Passport-AiX");
    setIsGenerating(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-8">
      
      {/* Print Trigger bar */}
      <div className="flex justify-between items-center print:hidden">
        <p className="text-xs text-muted-foreground font-medium">
          * Salvează sau printează acest pașaport digital pentru utilizare oficială.
        </p>
        <Button onClick={handlePrint} disabled={isGenerating} className="h-11 rounded-full bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors flex items-center gap-2 shadow-sm">
          <Printer className="w-4 h-4" /> {isGenerating ? "Se generează..." : "Descarcă / Printează PDF"}
        </Button>
      </div>

      {/* LUXURY PASSPORT CONTAINER */}
      <div 
        ref={documentRef}
        className="bg-white border-8 border-double border-slate-900 rounded-[3rem] p-12 md:p-16 shadow-2xl relative overflow-hidden print:border-0 print:p-0 print:shadow-none"
      >
        {/* Subtle Luxury Pattern Background Overlay */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />

        {/* Decorative Gold Seal / Compass Accent */}
        <div className="absolute top-10 right-10 opacity-20 pointer-events-none print:opacity-10">
          <Award className="w-24 h-24 text-slate-800" />
        </div>

        {/* Header Passport Title */}
        <div className="border-b-2 border-slate-900 pb-10 mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400 block mb-2">OFFICIAL DIGITAL PLATFORM</span>
            <h2 className="font-heading font-black text-3xl md:text-4xl text-slate-950 tracking-tighter">AiX WEALTH PASSPORT</h2>
            <p className="text-xs font-semibold text-slate-500 mt-1 uppercase tracking-wider">CRISTIAN VĂDUVA • PRIVATE CLIENT PLATFORM</p>
          </div>
          <div className="text-left md:text-right shrink-0">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">Passport Serial</span>
            <span className="font-mono text-xs font-bold text-slate-900 bg-slate-100 px-3 py-1 rounded mt-1 inline-block">AWP-9021-CX</span>
          </div>
        </div>

        {/* Holder Personal Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10 border-b border-slate-100 pb-10">
          <div className="flex gap-4 items-start col-span-2">
            <div className="w-20 h-24 bg-slate-100 border border-slate-200 rounded-xl flex items-center justify-center shrink-0 text-slate-400">
              <User className="w-10 h-10" />
            </div>
            <div className="space-y-3">
              <div>
                <span className="text-[9px] font-bold text-slate-400 uppercase block">Deținător Pașaport</span>
                <span className="font-bold text-base text-slate-900">PRIVATE CLIENT</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[9px] font-bold text-slate-400 uppercase block">Status Profil</span>
                  <span className="font-bold text-xs text-slate-900">Verificat AiX</span>
                </div>
                <div>
                  <span className="text-[9px] font-bold text-slate-400 uppercase block">Scor Protecție</span>
                  <span className="font-bold text-xs text-emerald-600 flex items-center gap-1">
                    <Shield className="w-3.5 h-3.5" /> 92% Optim
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Secure QR-Code simulator */}
          <div className="flex flex-col items-start md:items-end justify-center">
            <div className="w-20 h-20 border border-slate-200 rounded p-1.5 bg-slate-50">
              {/* SVG Mock QR Code */}
              <svg viewBox="0 0 100 100" className="w-full h-full fill-slate-900">
                <rect x="0" y="0" width="20" height="20" />
                <rect x="80" y="0" width="20" height="20" />
                <rect x="0" y="80" width="20" height="20" />
                <rect x="30" y="30" width="40" height="40" opacity="0.3" />
                <rect x="40" y="10" width="10" height="10" />
                <rect x="60" y="70" width="10" height="15" />
                <rect x="10" y="50" width="15" height="10" />
              </svg>
            </div>
            <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-2">QR SECURIZAT VERIFICABIL</span>
          </div>
        </div>

        {/* Assets & Portfolio Overview */}
        <div className="space-y-8 mb-10 border-b border-slate-100 pb-10">
          <h3 className="font-heading font-bold text-lg text-slate-950 border-l-2 border-slate-900 pl-3">I. BILANȚ GENERAL ACTIVE (ESTIMATIV)</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-[9px] font-bold text-slate-400 uppercase block">Portofoliu Imobiliar</span>
              <p className="font-bold text-base text-slate-900 mt-1">€480,000</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-[9px] font-bold text-slate-400 uppercase block">Bunuri de Lux</span>
              <p className="font-bold text-base text-slate-900 mt-1">€120,000</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-[9px] font-bold text-slate-400 uppercase block">Investiții Active</span>
              <p className="font-bold text-base text-slate-900 mt-1">€85,000</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-[9px] font-bold text-slate-400 uppercase block">Capital Asigurat</span>
              <p className="font-bold text-base text-slate-900 mt-1">€350,000</p>
            </div>
          </div>
        </div>

        {/* Protection & Risks Profiling */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10 border-b border-slate-100 pb-10">
          <div>
            <h3 className="font-heading font-bold text-lg text-slate-950 border-l-2 border-slate-900 pl-3 mb-4">II. EXPOZITIE RISCURI</h3>
            <ul className="space-y-3">
              <li className="text-xs text-slate-600 flex justify-between items-center py-1.5 border-b border-slate-50">
                <span>Risc Seismic Locuințe</span>
                <span className="font-bold text-slate-900">Scăzut (Zona C)</span>
              </li>
              <li className="text-xs text-slate-600 flex justify-between items-center py-1.5 border-b border-slate-50">
                <span>Răspundere Civilă Profesională</span>
                <span className="font-bold text-rose-600 flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" /> Neacoperit
                </span>
              </li>
              <li className="text-xs text-slate-600 flex justify-between items-center py-1.5 border-b border-slate-50">
                <span>Vulnerabilitate Capital Personal</span>
                <span className="font-bold text-slate-900">Mediu (Levier Ipotecar)</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-bold text-lg text-slate-950 border-l-2 border-slate-900 pl-3 mb-4">III. RECOMANDĂRI STRATEGICE</h3>
            <ul className="space-y-3">
              <li className="text-xs text-slate-600 leading-relaxed">
                • Contractarea unei polițe de tip <strong>D&O (Răspundere Administrator)</strong> pentru reducerea expunerii personale.
              </li>
              <li className="text-xs text-slate-600 leading-relaxed">
                • Indexarea sumei asigurate pe viață pentru acoperirea totală a soldului ipotecar curent.
              </li>
            </ul>
          </div>
        </div>

        {/* Contact Info & CTA Block (For PDF/Print) */}
        <section className="mb-10 p-6 bg-slate-50 border border-slate-200 rounded-lg text-slate-800">
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

        {/* Signatures & Certification footer */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 pt-6 text-xs text-muted-foreground font-semibold">
          <div>
            <p>Platformă autorizată: cristianvaduva.com</p>
            <p className="text-[10px] text-slate-400 mt-1">Generat automat prin core-ul securizat AiX OS</p>
          </div>
          <div className="text-left md:text-right shrink-0">
            <p className="text-[9px] font-bold text-slate-400 uppercase">Semnătură Autorizată</p>
            <span className="font-serif italic text-base text-slate-900 mt-1 inline-block">Cristian Văduva</span>
          </div>
        </div>

      </div>

    </div>
  );
}
