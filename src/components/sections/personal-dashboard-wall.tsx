"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Shield, Sparkles, Home, TrendingUp, Users, Briefcase, 
  ChevronRight, Calendar, ArrowRight, ShieldAlert 
} from "lucide-react";
import Link from "next/link";

const wallSections = [
  {
    id: "protection",
    title: "My Protection",
    status: "92% Protejat",
    statusColor: "text-emerald-600",
    icon: <Shield className="w-6 h-6 text-blue-600" />,
    summary: "Asigurări de viață active, CASCO optimizat și polițe property.",
    details: {
      activePolicies: [
        { name: "Asigurare Viață Termen", provider: "Generali", limit: "€250,000" },
        { name: "Poliță CASCO beneficiu", provider: "Generali", limit: "€45,000" },
        { name: "Locuință All-Risk", provider: "Generali", limit: "€120,000" }
      ],
      recommendation: "Încheierea unei polițe complementare de răspundere civilă legală."
    },
    actionText: "Deschide Gap Analyzer",
    actionLink: "/gap-analyzer"
  },
  {
    id: "assets",
    title: "My Assets",
    status: "€120,000 Valoare",
    statusColor: "text-slate-900",
    icon: <Sparkles className="w-6 h-6 text-amber-500" />,
    summary: "Bunuri de lux, ceasuri, artă și mașină personală.",
    details: {
      activePolicies: [
        { name: "Artă & Colecții", provider: "Generali Private", limit: "€50,000" },
        { name: "Ceasuri & Bijuterii", provider: "Generali Private", limit: "€25,000" }
      ],
      recommendation: "Efectuarea unui nou raport de evaluare pentru colecția de artă."
    },
    actionText: "Administrează acces rapid pentru tine Garage",
    actionLink: "/serviciu avansat pentru tine-garage"
  },
  {
    id: "realestate",
    title: "My Real Estate",
    status: "€480,000 Portofoliu",
    statusColor: "text-slate-900",
    icon: <Home className="w-6 h-6 text-emerald-600" />,
    summary: "Proprietăți piperate rezidențiale active și investiții.",
    details: {
      activePolicies: [
        { name: "Vila Pipera Q1", status: "Chiriat", yield: "5.2%" },
        { name: "Apt Aviației D3", status: "Chiriat", yield: "6.1%" }
      ],
      recommendation: "Securizarea chiriilor neplătite pentru apartamentul din Aviației."
    },
    actionText: "Deschide RE Analyzer",
    actionLink: "/investitii-imobiliare/analyzer"
  },
  {
    id: "investments",
    title: "My Investments",
    status: "€85,000 Total",
    statusColor: "text-slate-900",
    icon: <TrendingUp className="w-6 h-6 text-purple-600" />,
    summary: "Fonduri Unit-Linked de economisire și acțiuni active.",
    details: {
      activePolicies: [
        { name: "Fond Dinamic Unit-Linked", balance: "€60,000" },
        { name: "Portofoliu Titluri de Stat", balance: "€25,000" }
      ],
      recommendation: "Creșterea ratei lunare de alocare în fondul dinamic cu 15%."
    },
    actionText: "Raporul strategic",
    actionLink: "/raport-strategic"
  },
  {
    id: "family",
    title: "My Family",
    status: "3 Dependenți",
    statusColor: "text-slate-500",
    icon: <Users className="w-6 h-6 text-rose-500" />,
    summary: "Asigurări de viață cu capitalizare și sănătate privat.",
    details: {
      activePolicies: [
        { name: "Asigurare Sănătate Familie", status: "Activ", limit: "€15,000/an" },
        { name: "Plan Junior Studii", status: "Activ", limit: "€20,000" }
      ],
      recommendation: "Adăugarea clauzei de invaliditate permanentă pentru copii."
    },
    actionText: "Deschide Family Planner",
    actionLink: "/family-planner"
  },
  {
    id: "business",
    title: "My Business",
    status: "Risc Mediu",
    statusColor: "text-amber-500",
    icon: <Briefcase className="w-6 h-6 text-cyan-600" />,
    summary: "Date financiare și protecție active firmă comercială.",
    details: {
      activePolicies: [
        { name: "Răspundere Civilă IMM", limit: "€100,000" },
        { name: "Asigurare Clădire Sediu", limit: "€150,000" }
      ],
      recommendation: "Absența poliței D&O (Răspundere Directori) ridică expunerea."
    },
    actionText: "Consultă Asigurări IMM",
    actionLink: "/servicii/imm-insurance"
  },
  {
    id: "future",
    title: "My Future",
    status: "Plan Activ",
    statusColor: "text-indigo-600",
    icon: <Calendar className="w-6 h-6 text-indigo-600" />,
    summary: "Pensionare anticipată și obiective strategice stabilite.",
    details: {
      activePolicies: [
        { name: "Obiectiv Pensionare (55 ani)", target: "€500,000" },
        { name: "Fond Urgențe 6 Luni", target: "€24,000" }
      ],
      recommendation: "Monitorizează evoluția averii prin Life Simulator."
    },
    actionText: "Deschide Life Simulator",
    actionLink: "/simulator"
  }
];

export function PersonalDashboardWall() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="w-full flex flex-col gap-6">
      
      {/* Visual Command Wall */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
        {wallSections.map((sec) => {
          const isExpanded = expandedId === sec.id;

          return (
            <motion.div
              layout
              key={sec.id}
              className={`glass p-8 rounded-[2.5rem] border bg-white shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between ${
                isExpanded ? "md:col-span-2 border-slate-900 shadow-2xl" : "border-border"
              }`}
            >
              <div>
                {/* Header Block */}
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-full bg-slate-50 border border-slate-100 shadow-sm shrink-0">
                      {sec.icon}
                    </div>
                    <div>
                      <h3 className="font-heading font-black text-xl text-slate-900 leading-tight">{sec.title}</h3>
                      <span className={`text-[10px] font-bold uppercase tracking-widest ${sec.statusColor}`}>
                        {sec.status}
                      </span>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => toggleExpand(sec.id)}
                    className="w-10 h-10 rounded-full border border-border bg-white flex items-center justify-center text-slate-400 hover:text-foreground hover:border-slate-300 transition-colors shrink-0"
                  >
                    <ChevronRight className={`w-5 h-5 transition-transform duration-300 ${isExpanded ? 'rotate-90' : ''}`} />
                  </button>
                </div>

                <p className="text-xs text-slate-500 leading-relaxed mb-6 font-medium">
                  {sec.summary}
                </p>

                {/* Expanded Details Panels */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden border-t border-slate-100 pt-6 mt-6 space-y-6"
                    >
                      {/* Sub-Items active list */}
                      <div>
                        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">Elemente Active în Portofoliu</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {Object.values(sec.details.activePolicies).map((policy: Record<string, string>, idx) => (
                            <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col justify-between">
                              <span className="font-bold text-xs text-slate-800">{policy.name}</span>
                              <span className="text-[10px] font-semibold text-slate-400 mt-1.5">
                                {policy.provider ? `Limita: ${policy.limit} • ${policy.provider}` : policy.yield ? `Randament: ${policy.yield} • ${policy.status}` : policy.balance ? `Sold: ${policy.balance}` : `Țintă: ${policy.target}`}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* AI recommendations */}
                      <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-100 flex gap-3 items-start">
                        <ShieldAlert className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                        <div>
                          <span className="text-[9px] font-bold text-amber-800 uppercase tracking-widest">Sfat Diagnostic</span>
                          <p className="text-xs text-slate-700 font-semibold mt-0.5 leading-relaxed">{sec.details.recommendation}</p>
                        </div>
                      </div>

                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Action trigger footer */}
              <div className="mt-8 border-t border-slate-50 pt-6">
                <Link 
                  href={sec.actionLink}
                  className="w-full h-12 rounded-full border border-border bg-slate-50 hover:bg-slate-100 hover:border-slate-300 font-bold text-xs flex items-center justify-center gap-2 text-slate-800 transition-all"
                >
                  {sec.actionText} <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

            </motion.div>
          );
        })}
      </div>

    </div>
  );
}
