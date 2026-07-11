"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Home, Sparkles, TrendingUp, Users, Briefcase, X, ArrowRight, AlertCircle } from "lucide-react";
import Link from "next/link";

const galaxyItems = [
  {
    id: "real-estate",
    name: "Real Estate",
    icon: <Home className="w-6 h-6 text-emerald-600" />,
    value: "€480,000",
    risk: "Mediu (Leverage Ipotecar)",
    protection: "85% (PAD + Facultativă)",
    recommendations: [
      "Suplimentare asigurare răspundere chiriași.",
      "Re-evaluare valoare reconstructivă la cursul curent."
    ],
    relatedServices: [
      { name: "Asigurare Locuință", link: "/servicii/home-insurance" },
      { name: "Analyzer Imobiliar", link: "/investitii-imobiliare/analyzer" }
    ],
    orbitRadius: 180,
    angle: 0
  },
  {
    id: "luxury",
    name: "Luxury Assets",
    icon: <Sparkles className="w-6 h-6 text-amber-600" />,
    value: "€120,000",
    risk: "Scăzut (Garaj Securizat)",
    protection: "100% (CASCO Premium)",
    recommendations: [
      "Actualizare evaluare obiecte de artă din colecție.",
      "Asigurare dedicată ceasuri de lux off-site."
    ],
    relatedServices: [
      { name: "Luxury Assets Protection", link: "/luxury-assets" },
      { name: "Asigurare CASCO", link: "/servicii/casco-insurance" }
    ],
    orbitRadius: 240,
    angle: 60
  },
  {
    id: "insurance",
    name: "Insurance",
    icon: <Shield className="w-6 h-6 text-blue-600" />,
    value: "N/A (Suma Asigurată €350k)",
    risk: "Minim",
    protection: "92% (Scor Protecție General)",
    recommendations: [
      "Indexare primă de viață la inflația curentă.",
      "Re-configurare clauze decontare directă RCA."
    ],
    relatedServices: [
      { name: "Asigurare de Viață", link: "/servicii/life-insurance" },
      { name: "Coverage Gap", link: "/gap-analyzer" }
    ],
    orbitRadius: 120,
    angle: 120
  },
  {
    id: "investments",
    name: "Investments",
    icon: <TrendingUp className="w-6 h-6 text-purple-600" />,
    value: "€85,000",
    risk: "Mediu-Ridicat (Expunere BVB/Crypto)",
    protection: "60% (Fără asigurare de capital)",
    recommendations: [
      "Hedging prin polițe Unit-Linked cu capital garantat.",
      "Diversificare portofoliu în obligațiuni de stat."
    ],
    relatedServices: [
      { name: "Financial Twin", link: "/financial-twin" },
      { name: "AiX Advisor", link: "/advisor" }
    ],
    orbitRadius: 300,
    angle: 180
  },
  {
    id: "family",
    name: "Family Plan",
    icon: <Users className="w-6 h-6 text-rose-600" />,
    value: "N/A (4 Dependenți)",
    risk: "Mediu (Venit unic sustenabil)",
    protection: "75% (Planificator completat)",
    recommendations: [
      "Implementare asigurare de sănătate corporate.",
      "Creare fond junior pentru studii superioare."
    ],
    relatedServices: [
      { name: "Family Planner", link: "/family-planner" },
      { name: "Asigurare Sănătate", link: "/servicii/health-insurance" }
    ],
    orbitRadius: 150,
    angle: 240
  },
  {
    id: "business",
    name: "Business Shield",
    icon: <Briefcase className="w-6 h-6 text-cyan-600" />,
    value: "€150,000 Revenue",
    risk: "Ridicat (Răspundere Administrator)",
    protection: "50% (Lipsă poliță D&O)",
    recommendations: [
      "Încheiere imediată poliță de răspundere civilă profesională.",
      "Asigurare echipamente din sediul comercial."
    ],
    relatedServices: [
      { name: "Asigurare Business/IMM", link: "/servicii/imm-insurance" },
      { name: "D&O Liability", link: "/servicii/business-directors-liability" }
    ],
    orbitRadius: 210,
    angle: 300
  }
];

export function WealthGalaxyView() {
  const [selected, setSelected] = useState<typeof galaxyItems[0] | null>(null);

  return (
    <div className="w-full flex flex-col lg:flex-row gap-10 items-stretch min-h-[600px]">
      
      {/* GALAXY VISUALIZATION AREA */}
      <div className="w-full lg:w-7/12 border border-slate-100 bg-white rounded-[3rem] p-6 relative overflow-hidden flex items-center justify-center min-h-[500px] shadow-sm select-none">
        
        {/* Orbits Visual Guides */}
        {[120, 150, 180, 210, 240, 300].map((radius, idx) => (
          <div
            key={idx}
            className="absolute rounded-full border border-dashed border-slate-100 pointer-events-none"
            style={{
              width: radius * 2,
              height: radius * 2,
            }}
          />
        ))}

        {/* Central Element */}
        <motion.div 
          className="absolute z-10 w-36 h-36 rounded-full bg-slate-900 border border-slate-800 text-white flex flex-col items-center justify-center text-center p-4 shadow-2xl"
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        >
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Ecosistemul tău</span>
          <span className="font-heading font-black text-sm mt-1">Avere &amp; Protecție</span>
        </motion.div>

        {/* Orbiting Planets */}
        {galaxyItems.map((item, idx) => {
          // Compute orbital position
          const radians = (item.angle * Math.PI) / 180;
          const x = item.orbitRadius * Math.cos(radians);
          const y = item.orbitRadius * Math.sin(radians);

          return (
            <motion.button
              key={item.id}
              onClick={() => setSelected(item)}
              className="absolute z-20 w-14 h-14 rounded-full bg-white border border-border shadow-md flex items-center justify-center hover:scale-110 transition-transform cursor-pointer hover:border-slate-400 group"
              style={{ x, y }}
              animate={{
                y: [y - 4, y + 4, y - 4],
              }}
              transition={{
                repeat: Infinity,
                duration: 3 + idx,
                ease: "easeInOut",
              }}
            >
              <div className="relative">
                {item.icon}
                <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 bg-slate-900 text-white text-[10px] font-bold px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {item.name}
                </div>
              </div>
            </motion.button>
          );
        })}

      </div>

      {/* PLANET DETAIL DRAWER */}
      <div className="w-full lg:w-5/12 flex flex-col">
        <AnimatePresence mode="wait">
          {selected ? (
            <motion.div
              key={selected.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="glass p-8 rounded-[3rem] border border-border bg-white shadow-xl flex flex-col justify-between flex-grow h-full"
            >
              {/* Header */}
              <div>
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-full bg-slate-50 border border-slate-100">
                      {selected.icon}
                    </div>
                    <div>
                      <h3 className="font-heading font-black text-2xl text-slate-900">{selected.name}</h3>
                      <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Detaliu Planetă</p>
                    </div>
                  </div>
                  <button onClick={() => setSelected(null)} className="w-10 h-10 rounded-full border border-border bg-white flex items-center justify-center text-slate-400 hover:text-foreground hover:border-slate-300 transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-3 mb-8">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-center">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Valoare</span>
                    <p className="font-bold text-slate-900 mt-1 text-sm">{selected.value}</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-center">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Risc</span>
                    <p className="font-bold text-amber-600 mt-1 text-xs">{selected.risk}</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-center">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Protecție</span>
                    <p className="font-bold text-emerald-600 mt-1 text-xs">{selected.protection}</p>
                  </div>
                </div>

                {/* Recommendations */}
                <div className="mb-8">
                  <h4 className="font-bold text-slate-800 text-sm uppercase tracking-wider mb-4 flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4 text-amber-500" /> Recomandări Strategice
                  </h4>
                  <ul className="space-y-3">
                    {selected.recommendations.map((rec, idx) => (
                      <li key={idx} className="text-sm text-slate-600 pl-4 border-l-2 border-slate-200 leading-relaxed">
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Related Services */}
              <div className="border-t border-slate-100 pt-6">
                <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider mb-4">Servicii Conexe &amp; Aplicații</h4>
                <div className="grid grid-cols-2 gap-3">
                  {selected.relatedServices.map((srv, idx) => (
                    <Link key={idx} href={srv.link} className="flex justify-between items-center p-4 rounded-2xl border border-slate-100 hover:border-slate-900 hover:shadow-md transition-all bg-slate-50/50">
                      <span className="font-bold text-xs text-slate-800">{srv.name}</span>
                      <ArrowRight className="w-4 h-4 text-slate-400" />
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="glass p-8 rounded-[3rem] border border-border bg-slate-50/50 flex flex-col items-center justify-center text-center flex-grow min-h-[300px]">
              <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-300 border border-slate-100 mb-4">
                <Shield className="w-7 h-7" />
              </div>
              <h3 className="font-heading font-black text-xl text-slate-900 mb-2">Selectează un Segment</h3>
              <p className="text-sm text-muted-foreground max-w-xs">Apasă pe oricare dintre elementele orbitale din stânga pentru a încărca diagnosticul complet de protecție.</p>
            </div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}
