"use client";

import React, { useState } from "react";
import { motion as fm } from "framer-motion";
import { Building2, X, Shield, ArrowUpRight, Coins, Percent } from "lucide-react";
import Link from "next/link";

const buildings = [
  {
    id: "residential-lux",
    name: "Vila Q1 - Pipera",
    type: "Proprietate Deținută",
    valoare: "€320,000",
    randament: "5.2% Randament Net",
    asigurare: "PAD + All-Risk Generali (Activ)",
    details: "Proprietate rezidențială premium închiriată pe termen lung. Structură din beton armat, renovată în 2024.",
    svgPos: { x: 120, y: 150, width: 80, height: 160 },
    color: "fill-slate-800 hover:fill-slate-900"
  },
  {
    id: "investment-apartment",
    name: "Apartament D3 - Aviației",
    type: "Investiție Activă",
    valoare: "€160,000",
    randament: "6.1% Randament Net",
    asigurare: "Asigurare Bunuri + Răspundere Terți",
    details: "Apartament 2 camere, localizat strategic în hub-ul de business. Generare stabilă de cash flow lunar.",
    svgPos: { x: 260, y: 200, width: 60, height: 110 },
    color: "fill-blue-800 hover:fill-blue-900"
  },
  {
    id: "opportunity-office",
    name: "Clădire Birouri Boutique - Centru",
    type: "Oportunitate Curentă",
    valoare: "€1,200,000",
    randament: "7.8% Proiectat",
    asigurare: "Necesită Asigurare Construcție (Property & Casualty)",
    details: "Clădire istorică reconsolidată, pretabilă pentru birouri boutique sau clinică premium. Evaluată în Home Find.",
    svgPos: { x: 380, y: 80, width: 120, height: 230 },
    color: "fill-emerald-800 hover:fill-emerald-900"
  }
];

export function PropertyCityMap() {
  const [selected, setSelected] = useState<typeof buildings[0] | null>(null);

  return (
    <div className="w-full flex flex-col lg:flex-row gap-10 items-stretch min-h-[600px]">
      
      {/* CITY VISUALIZATION AREA */}
      <div className="w-full lg:w-8/12 border border-slate-100 bg-white rounded-[3rem] p-6 relative overflow-hidden flex items-center justify-center min-h-[500px] shadow-sm select-none">
        
        {/* Vector SVG City */}
        <svg 
          viewBox="0 0 600 400" 
          className="w-full h-full max-h-[400px] text-slate-300"
          style={{ overflow: "visible" }}
        >
          {/* Ground Line */}
          <line x1="20" y1="310" x2="580" y2="310" stroke="#e2e8f0" strokeWidth="4" strokeLinecap="round" />
          
          {/* Grid Layout Line */}
          <line x1="20" y1="330" x2="580" y2="330" stroke="#f1f5f9" strokeWidth="2" strokeDasharray="5,5" />

          {/* Interactive Buildings */}
          {buildings.map((b) => (
            <g key={b.id} className="cursor-pointer" onClick={() => setSelected(b)}>
              {/* Main Building Body */}
              <rect
                x={b.svgPos.x}
                y={b.svgPos.y}
                width={b.svgPos.width}
                height={b.svgPos.height}
                rx="8"
                className={`transition-colors duration-300 ${b.color} ${selected?.id === b.id ? "stroke-slate-900 stroke-2" : "stroke-transparent"}`}
              />
              {/* Windows Grid pattern simulated inside SVG */}
              <g opacity="0.15" fill="white">
                {Array.from({ length: Math.floor(b.svgPos.height / 30) }).map((_, rowIdx) => (
                  <g key={rowIdx}>
                    {Array.from({ length: Math.floor(b.svgPos.width / 20) }).map((_, colIdx) => (
                      <rect
                        key={colIdx}
                        x={b.svgPos.x + 8 + colIdx * 18}
                        y={b.svgPos.y + 12 + rowIdx * 25}
                        width="8"
                        height="12"
                        rx="1"
                      />
                    ))}
                  </g>
                ))}
              </g>
              {/* Building Label */}
              <text 
                x={b.svgPos.x + b.svgPos.width / 2} 
                y={b.svgPos.y - 12}
                textAnchor="middle" 
                className="fill-slate-800 text-[10px] font-bold"
              >
                {b.name.split(" - ")[0]}
              </text>
            </g>
          ))}

          {/* Simulated Decorative Map Elements */}
          {/* Trees */}
          <circle cx="80" cy="300" r="10" className="fill-slate-100" />
          <line x1="80" y1="300" x2="80" y2="310" stroke="#cbd5e1" strokeWidth="2" />
          <circle cx="230" cy="300" r="8" className="fill-slate-100" />
          <line x1="230" y1="300" x2="230" y2="310" stroke="#cbd5e1" strokeWidth="2" />
          <circle cx="530" cy="295" r="15" className="fill-slate-100" />
          <line x1="530" y1="295" x2="530" y2="310" stroke="#cbd5e1" strokeWidth="2" />

        </svg>

        {/* Legend Overlay */}
        <div className="absolute bottom-6 left-6 flex gap-4 text-xs font-bold text-slate-500 bg-slate-50/80 backdrop-blur border border-slate-100 rounded-2xl px-4 py-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-800" /> Deținute
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-800" /> Investiții
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-800" /> Oportunități
          </div>
        </div>

      </div>

      {/* PROPERTY DETAILS OVERLAY */}
      <div className="w-full lg:w-4/12 flex flex-col">
        <fm.div layout className="flex-grow">
          {selected ? (
            <fm.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass p-8 rounded-[3rem] border border-border bg-white shadow-xl flex flex-col justify-between h-full"
            >
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{selected.type}</span>
                    <h3 className="font-heading font-black text-2xl text-slate-900 mt-1">{selected.name}</h3>
                  </div>
                  <button onClick={() => setSelected(null)} className="w-10 h-10 rounded-full border border-border bg-white flex items-center justify-center text-slate-400 hover:text-foreground hover:border-slate-300 transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  {selected.details}
                </p>

                {/* Properties list */}
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-3">
                    <div className="p-2 bg-white rounded-full border border-border">
                      <Coins className="w-4 h-4 text-slate-500" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400">Valoare Estimată</span>
                      <p className="font-bold text-sm text-slate-900 mt-0.5">{selected.valoare}</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-3">
                    <div className="p-2 bg-white rounded-full border border-border">
                      <Percent className="w-4 h-4 text-slate-500" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400">Randament / Yield</span>
                      <p className="font-bold text-sm text-slate-900 mt-0.5">{selected.randament}</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-3">
                    <div className="p-2 bg-white rounded-full border border-border">
                      <Shield className="w-4 h-4 text-slate-500" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400">Status Asigurare</span>
                      <p className="font-bold text-xs text-slate-900 mt-0.5">{selected.asigurare}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Home Find Action */}
              <div className="border-t border-slate-100 pt-6 mt-6">
                <Link href="/home-find" className="w-full h-12 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors">
                  Analizează în Home Find <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>

            </fm.div>
          ) : (
            <div className="glass p-8 rounded-[3rem] border border-border bg-slate-50/50 flex flex-col items-center justify-center text-center h-full min-h-[300px]">
              <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-300 border border-slate-100 mb-4">
                <Building2 className="w-7 h-7" />
              </div>
              <h3 className="font-heading font-black text-xl text-slate-900 mb-2">Oraș Imobiliar 2D</h3>
              <p className="text-sm text-muted-foreground max-w-xs">Apasă pe oricare dintre clădirile vectoriale din hartă pentru a vizualiza datele imobiliare de investiție sau asigurare.</p>
            </div>
          )}
        </fm.div>
      </div>

    </div>
  );
}
