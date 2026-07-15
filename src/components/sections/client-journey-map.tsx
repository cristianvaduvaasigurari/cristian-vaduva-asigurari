"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Eye, Compass, Shield, Coins, TrendingUp, 
  CheckCircle2, ChevronRight, UserCheck 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const stages = [
  {
    id: "discover",
    num: "01",
    label: "DISCOVER",
    icon: <Eye className="w-5 h-5" />,
    tagline: "Explorarea vulnerabilităților și înțelegerea expunerii",
    desc: "Primul pas în parteneriatul nostru este maparea completă a riscurilor personale. Analizăm activele curente și identificăm punctele vulnerabile care îți pot destabiliza planurile.",
    actions: [
      "Completarea auditului de bază prin AiX Advisor.",
      "Identificarea datoriilor active și a ratelor de dependență familială."
    ],
    recommendedServices: [
      { name: "AiX Advisor", link: "/advisor" },
      { name: "Risk Simulator", link: "/risk-simulator" }
    ]
  },
  {
    id: "analyze",
    num: "02",
    label: "ANALYZE",
    icon: <Compass className="w-5 h-5" />,
    tagline: "Cuantificarea decalajului de protecție (Protection Gap)",
    desc: "Transformăm riscurile în cifre exacte. Calculăm matematic deficitul tău de protecție pe baza veniturilor, economiilor și a datoriilor pe termen lung.",
    actions: [
      "Rularea profilului prin AiX Financial Twin.",
      "Analiza completă a portofoliului de asigurări curente."
    ],
    recommendedServices: [
      { name: "Financial Twin", link: "/financial-twin" },
      { name: "Coverage Gap", link: "/gap-analyzer" }
    ]
  },
  {
    id: "protect",
    num: "03",
    label: "PROTECT",
    icon: <Shield className="w-5 h-5" />,
    tagline: "Securizarea completă a activelor și familiei",
    desc: "Implementăm scutul de protecție. Transferăm riscurile evaluate către polițe de reasigurare beneficiu emise în parteneriat cu Generali România.",
    actions: [
      "Negocierea clauzelor All-Risk și a franșizelor optime.",
      "Securizarea bunurilor din acces rapid pentru tine Garage și a răspunderii de business."
    ],
    recommendedServices: [
      { name: "Asigurare Viață", link: "/servicii/life-insurance" },
      { name: "acces rapid pentru tine Assets", link: "/serviciu avansat pentru tine-assets" }
    ]
  },
  {
    id: "invest",
    num: "04",
    label: "INVEST",
    icon: <Coins className="w-5 h-5" />,
    tagline: "Diversificarea inteligentă în active fizice și financiare",
    desc: "Odată ce riscurile sunt blocate, direcționăm surplusul financiar către active cu randament controlat. Îți ghidăm alegerile imobiliare și de capital.",
    actions: [
      "Studiul randamentelor nete prin Real Estate Analyzer.",
      "Selectarea oportunităților rezidențiale beneficiu prin Home Find."
    ],
    recommendedServices: [
      { name: "Real Estate Analyzer", link: "/investitii-imobiliare/analyzer" },
      { name: "Home Find Match", link: "/home-find" }
    ]
  },
  {
    id: "grow",
    num: "05",
    label: "GROW",
    icon: <TrendingUp className="w-5 h-5" />,
    tagline: "Multiplicarea și transferul averii inter-generațional",
    desc: "Asigurăm sustenabilitatea pe termen lung. Planificăm pensionarea anticipată și construim mecanisme de succesiune a patrimoniului familial.",
    actions: [
      "Auditarea maturității fondurilor Unit-Linked.",
      "Emiterea și actualizarea periodică a pașaportului tău Wealth Passport."
    ],
    recommendedServices: [
      { name: "Wealth Passport", link: "/wealth-passport" },
      { name: "Life Simulator", link: "/simulator" }
    ]
  }
];

export function ClientJourneyMap() {
  const [activeStage, setActiveStage] = useState(stages[0]);

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col gap-12">
      
      {/* Călătoria Timeline Header (Apple Style Steps) */}
      <div className="w-full grid grid-cols-2 md:grid-cols-5 gap-3">
        {stages.map((stage) => {
          const isActive = activeStage.id === stage.id;
          return (
            <button
              key={stage.id}
              onClick={() => setActiveStage(stage)}
              className={`p-6 rounded-[2rem] border text-left flex flex-col justify-between min-h-[140px] transition-all duration-300 ${
                isActive 
                  ? 'bg-slate-900 text-white border-slate-900 shadow-xl scale-[1.02]' 
                  : 'bg-white text-slate-600 border-slate-100 hover:border-slate-300'
              }`}
            >
              <span className={`text-[10px] font-bold tracking-widest ${isActive ? 'text-white/40' : 'text-slate-400'}`}>
                STEP {stage.num}
              </span>
              <div className="mt-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${isActive ? 'bg-white/20' : 'bg-slate-50'}`}>
                  {stage.icon}
                </div>
                <h4 className="font-heading font-black text-sm uppercase tracking-wider">{stage.label}</h4>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Step Display Panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStage.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          className="glass p-8 md:p-12 rounded-[3.5rem] border border-border bg-white shadow-2xl flex flex-col md:flex-row gap-10"
        >
          {/* Main info text */}
          <div className="w-full md:w-7/12 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-800 font-bold text-[10px] mb-6 uppercase tracking-wider">
                Faza {activeStage.num} • {activeStage.label}
              </div>
              <h3 className="font-heading font-black text-2xl md:text-3xl text-slate-900 mb-4 tracking-tight">
                {activeStage.tagline}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-8">
                {activeStage.desc}
              </p>

              {/* Actions bullet list */}
              <div>
                <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">Obiective specifice etapei:</h5>
                <ul className="space-y-3">
                  {activeStage.actions.map((act, i) => (
                    <li key={i} className="text-xs font-semibold text-slate-800 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> {act}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Main Booking action */}
            <div className="mt-10 border-t border-slate-50 pt-6">
              <Button className="h-12 px-6 rounded-full bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors flex items-center gap-2" asChild>
                <Link href="/contact">Programează Întâlnire Privată <UserCheck className="w-4 h-4" /></Link>
              </Button>
            </div>
          </div>

          {/* Recommended services sidebar inside step card */}
          <div className="w-full md:w-5/12 bg-slate-50/50 border border-slate-100 rounded-[2.5rem] p-8 flex flex-col justify-between">
            <div>
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-6">Instrumente Recomandate</span>
              
              <div className="flex flex-col gap-3">
                {activeStage.recommendedServices.map((srv, idx) => (
                  <Link 
                    key={idx} 
                    href={srv.link}
                    className="p-5 rounded-2xl bg-white border border-slate-100 hover:border-slate-800 hover:shadow-md transition-all flex justify-between items-center group"
                  >
                    <span className="font-bold text-xs text-slate-800 group-hover:text-blue-600 transition-colors">{srv.name}</span>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                ))}
              </div>
            </div>

            <p className="text-[10px] text-muted-foreground leading-relaxed mt-6 font-semibold">
              * Toate instrumentele din această etapă folosesc securizarea datelor prin core-ul platformei.
            </p>
          </div>

        </motion.div>
      </AnimatePresence>

    </div>
  );
}
