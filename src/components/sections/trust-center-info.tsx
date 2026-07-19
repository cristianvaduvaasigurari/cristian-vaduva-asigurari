"use client";

import * as React from "react";
import { Lock, Award, Heart, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const pillars = [
  {
    title: "Abordarea Profesională",
    desc: "Nu vindem polițe, ci structurăm siguranță. Analizăm fiecare expunere patrimonială la virgulă, folosind indicatori matematici preciși și parteneriate de reasigurare exclusive.",
    icon: <Award className="w-5 h-5 text-blue-600" />
  },
  {
    title: "Filozofia de Consultanță",
    desc: "Credem în independență și transparență. Clientul privat primește un diagnostic obiectiv al activelor și are control complet asupra structurii contractuale.",
    icon: <Heart className="w-5 h-5 text-rose-600" />
  },
  {
    title: "Securitate și Confidențialitate",
    desc: "Datele portofoliului tău sunt criptate local prin AiX OS. Nu partajăm informațiile tale financiare cu terți neautorizați, menținând cel mai înalt standard bancar.",
    icon: <Lock className="w-5 h-5 text-slate-700" />
  }
];

const ecosystemItems = [
  { name: "Colaborare Generali România", desc: "Polițe premium negociate direct cu departamentul de underwriting specializat al Generali pentru clienți High-Net-Worth." },
  { name: "Ecosistemul Real Estate", desc: "Integrare nativă cu brokeri imobiliari parteneri și acces la oportunități rezidențiale premium." },
  { name: "AiX OS & Home Find", desc: "Tehnologie proprietară de analiză off-market și management digital al întregului portofoliu de protecție." }
];

export function TrustCenterInfo() {
  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-16">
      
      {/* Introduction Narrative */}
      <div className="glass p-8 md:p-12 rounded-[3rem] border border-border bg-white shadow-sm grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block mb-3">Fondator &amp; Filozofie</span>
          <h3 className="font-heading font-black text-2xl md:text-3xl text-slate-900 mb-6 tracking-tight">Despre Cristian Văduva</h3>
          <p className="text-sm text-slate-600 leading-relaxed mb-4">
            Cu o experiență acumulată în managementul riscurilor și planificarea patrimonială privată, am fondat această platformă pentru a elimina birocrația și opacitatea din industria asigurărilor și imobiliarelor din România.
          </p>
          <p className="text-sm text-slate-600 leading-relaxed">
            Misiunea mea este de a structura un ecosistem integrat în care activele tale rezidențiale, afacerile și protecția familiei sunt asigurate sub un singur acoperiș tehnologic.
          </p>
        </div>
        <div className="bg-slate-50/50 border border-slate-100 rounded-[2.5rem] p-8 flex flex-col justify-between">
          <div>
            <h4 className="font-bold text-slate-800 text-sm uppercase tracking-wider mb-4">Principiile Protecției Clientului</h4>
            <ul className="space-y-3.5">
              {[
                "Auditare gratuită a tuturor contractelor existente.",
                "Zero comisioane ascunse în oferte.",
                "Asistență personală rapidă în caz de daune majoră.",
                "Actualizare periodică a valorilor asigurate."
              ].map((text, i) => (
                <li key={i} className="text-xs font-semibold text-slate-800 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> {text}
                </li>
              ))}
            </ul>
          </div>
          <div className="border-t border-slate-100 pt-6 mt-6">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Parteneriat Oficial</span>
            <p className="text-xs text-slate-950 font-bold mt-1">Generali România • Partener Brokerage Autorizat</p>
          </div>
        </div>
      </div>

      {/* Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {pillars.map((p, idx) => (
          <div key={idx} className="glass p-8 rounded-[2.5rem] border border-border bg-white shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col gap-4">
            <div className="p-3 rounded-full bg-slate-50 border border-slate-100 self-start">
              {p.icon}
            </div>
            <h4 className="font-heading font-black text-lg text-slate-900">{p.title}</h4>
            <p className="text-xs text-slate-500 leading-relaxed font-medium">{p.desc}</p>
          </div>
        ))}
      </div>

      {/* Ecosystem Partnerships */}
      <div className="glass p-8 md:p-12 rounded-[3.5rem] border border-border bg-white shadow-sm">
        <h3 className="font-heading font-black text-2xl text-slate-900 mb-8 tracking-tight text-center">Parteneriate &amp; Integrare Ecosistem</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ecosystemItems.map((item, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col justify-between">
              <div>
                <h4 className="font-bold text-xs text-slate-800 uppercase tracking-wider mb-2">{item.name}</h4>
                <p className="text-[11px] text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Strong Call to Action */}
      <div className="glass p-10 rounded-[3rem] border border-slate-900 bg-slate-900 text-white text-center shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        <h3 className="font-heading font-black text-3xl mb-4">Construiește-ți scutul financiar astăzi</h3>
        <p className="text-slate-300 text-sm max-w-lg mx-auto mb-8 leading-relaxed">
          Programează un audit de protecție a activelor cu Cristian Văduva și obține acces la consolele inteligente de monitorizare AiX.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <Button className="h-14 rounded-full bg-white text-slate-900 font-bold px-8 hover:bg-slate-50 transition-colors flex items-center gap-1.5" asChild>
            <Link href="/smart-forms">Solicită Audit Privat <ArrowRight className="w-4 h-4 text-slate-900" /></Link>
          </Button>
          <Button variant="outline" className="h-14 rounded-full border-white/20 text-white hover:bg-white/10 font-bold px-8 text-xs" asChild>
            <Link href="/contact">Programează Consultanță</Link>
          </Button>
        </div>
      </div>

    </div>
  );
}
