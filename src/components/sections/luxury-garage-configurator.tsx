"use client";

import * as React from "react"; import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Car, Shield, Sparkles, AlertCircle, Anchor, 
  Watch, Star, Award, ArrowUpRight 
} from "lucide-react";
import { Button } from "@/components/ui/button";

const luxuryAssets = [
  {
    id: "supercars",
    name: "Porsche 911 GT3 RS",
    category: "Supercars",
    icon: <Car className="w-5 h-5" />,
    value: "€275,000",
    risk: "Mediu-Ridicat (Viteză & Circuit)",
    protectionStatus: "CASCO All-Risk Activ (Franșiză €500)",
    recommendation: "Poliță dedicată Track-Day cu acoperire extinsă pe circuite europene autorizate.",
    specs: [
      { k: "An Fabricație", v: "2024" },
      { k: "Cai Putere", v: "525 CP" },
      { k: "Asigurator", v: "Generali Private Client" }
    ]
  },
  {
    id: "yachts",
    name: "Azimut Atlantis 45",
    category: "Yachts & Ambarcațiuni",
    icon: <Anchor className="w-5 h-5" />,
    value: "€650,000",
    risk: "Scăzut (Ancorat Port Securizat)",
    protectionStatus: "Poliță Casco Ambarcațiuni Activă",
    recommendation: "Clauză adițională pentru transport rutier pe peridoc în extrasezon.",
    specs: [
      { k: "Lungime", v: "14.6 m" },
      { k: "Locație Port", v: "Marina Limanu" },
      { k: "Tip Poliță", v: "Yacht Comprehensive" }
    ]
  },
  {
    id: "watches",
    name: "Patek Philippe Nautilus 5711/1A",
    category: "Ceasuri & Colecții",
    icon: <Watch className="w-5 h-5" />,
    value: "€110,000",
    risk: "Ridicat (Purtare publică / Risc furt)",
    protectionStatus: "Asigurare Bunuri Fine Activă (Seif)",
    recommendation: "Clauză specială Out-of-Safe pentru purtare în deplasări de afaceri externe.",
    specs: [
      { k: "Material", v: "Oțel" },
      { k: "Păstrare", v: "Seif Bancar Clasa III" },
      { k: "Evaluare Curentă", v: "Certificat 2025" }
    ]
  },
  {
    id: "art",
    name: "Tablou Semnat - Artă Contemporană",
    category: "Colecții de Artă",
    icon: <Sparkles className="w-5 h-5" />,
    value: "€85,000",
    risk: "Scăzut (Microclimat controlat)",
    protectionStatus: "Poliță Fine Art Generali Activă",
    recommendation: "Actualizare anuală a certificatului de autenticitate și a indicilor de piață.",
    specs: [
      { k: "Tip Operă", v: "Pictură Ulei" },
      { k: "Senzori Mediu", v: "Umiditate & Temp active" },
      { k: "Asigurat la", v: "Valoare de piață agreată" }
    ]
  }
];

export function LuxuryGarageConfigurator() {
  const [selectedAsset, setSelectedAsset] = useState(luxuryAssets[0]);

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 items-stretch">
      
      {/* LEFT: Configurator Selector (Luxury watch style list) */}
      <div className="w-full lg:w-4/12 flex flex-col gap-3">
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 block mb-2 px-2">Garajul tău Digital</span>
        
        <div className="flex flex-col gap-2">
          {luxuryAssets.map(asset => {
            const isSelected = selectedAsset.id === asset.id;
            return (
              <button
                key={asset.id}
                onClick={() => setSelectedAsset(asset)}
                className={`p-6 rounded-[2rem] text-left border flex items-center justify-between transition-all duration-300 ${
                  isSelected 
                    ? 'bg-slate-900 text-white border-slate-900 shadow-xl scale-[1.02]' 
                    : 'bg-white text-slate-600 border-slate-100 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-full ${isSelected ? 'bg-white/20' : 'bg-slate-50 border border-slate-100'}`}>
                    {asset.icon}
                  </div>
                  <div>
                    <h4 className="font-heading font-black text-sm">{asset.name}</h4>
                    <p className={`text-[10px] mt-0.5 font-bold uppercase tracking-wider ${isSelected ? 'text-white/60' : 'text-slate-400'}`}>
                      {asset.category}
                    </p>
                  </div>
                </div>
                <span className="text-xs font-bold">{asset.value}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* RIGHT: Selected Asset Detail Display (Automotive configurator style) */}
      <div className="w-full lg:w-8/12 flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedAsset.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="glass p-8 md:p-10 rounded-[3rem] border border-border bg-white shadow-2xl flex flex-col justify-between flex-grow h-full relative overflow-hidden"
          >
            
            {/* Background design accents */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full blur-3xl pointer-events-none -z-10 translate-x-1/3 -translate-y-1/3" />

            <div>
              <div className="flex justify-between items-start mb-8 pb-6 border-b border-slate-50">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{selectedAsset.category}</span>
                  <h3 className="font-heading font-black text-3xl text-slate-900 mt-1 tracking-tight">{selectedAsset.name}</h3>
                </div>
                <div className="p-3 bg-slate-900 text-white rounded-2xl flex items-center justify-center shrink-0 shadow-lg">
                  {selectedAsset.icon}
                </div>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {selectedAsset.specs.map((spec, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col justify-center">
                    <span className="text-[9px] font-bold text-slate-400 uppercase">{spec.k}</span>
                    <p className="font-bold text-sm text-slate-900 mt-1">{spec.v}</p>
                  </div>
                ))}
              </div>

              {/* Status Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-500" /> Nivel de Risc
                  </span>
                  <p className="font-bold text-slate-800 text-sm mt-1.5">{selectedAsset.risk}</p>
                </div>
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                    <Shield className="w-3.5 h-3.5 text-emerald-500" /> Status Protecție
                  </span>
                  <p className="font-bold text-emerald-600 text-sm mt-1.5">{selectedAsset.protectionStatus}</p>
                </div>
              </div>

              {/* Recommendations */}
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-amber-500" /> Recomandare Asigurare Privată
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                  {selectedAsset.recommendation}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-10 pt-6 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-4">
              <span className="text-[10px] text-muted-foreground font-semibold flex items-center gap-1.5">
                <Award className="w-4 h-4 text-slate-400" /> Cotație oferită exclusiv în regim Private Banking.
              </span>
              <Button className="h-12 px-8 rounded-full bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors flex items-center gap-1.5 self-stretch md:self-auto" asChild>
                <a href="/smart-forms">Solicită Underwriting Privat <ArrowUpRight className="w-4 h-4" /></a>
              </Button>
            </div>

          </motion.div>
        </AnimatePresence>
      </div>

    </div>
  );
}
