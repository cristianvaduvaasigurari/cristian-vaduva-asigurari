"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Building, TrendingUp, Cpu, Home, ArrowRight } from "lucide-react";

const nodes = [
  {
    id: "insurance",
    title: "Cristian Văduva Asigurări",
    subtitle: "Fundația: Protecția",
    icon: <ShieldCheck className="w-8 h-8 text-blue-600" />,
    color: "bg-blue-50 border-blue-200 text-blue-900",
    desc: "Totul începe cu siguranța financiară. Nu poți construi avere pe o fundație de nisip. Asigurăm viața, sănătatea, afacerea și patrimoniul tău."
  },
  {
    id: "realestate",
    title: "Cristian Văduva Real Estate",
    subtitle: "Pilon 1: Creșterea Patrimoniului",
    icon: <Building className="w-8 h-8 text-amber-600" />,
    color: "bg-amber-50 border-amber-200 text-amber-900",
    desc: "Odată protejat, capitalul tău poate fi plasat în active tangibile sigure. Oferim consultanță premium pentru imobiliare de lux și cu randament ridicat."
  },
  {
    id: "investments",
    title: "AiXLuxury Investments",
    subtitle: "Pilon 2: Multiplicarea",
    icon: <TrendingUp className="w-8 h-8 text-emerald-600" />,
    color: "bg-emerald-50 border-emerald-200 text-emerald-900",
    desc: "Pentru un viitor lipsit de griji, accesăm piețele de capital prin fonduri mutuale și asigurări unit-linked administrate profesionist."
  },
  {
    id: "aixos",
    title: "AiX OS",
    subtitle: "Inovația: Tehnologia",
    icon: <Cpu className="w-8 h-8 text-purple-600" />,
    color: "bg-purple-50 border-purple-200 text-purple-900",
    desc: "Sistemul nostru de operare de business. Digitalizează, automatizează și folosește inteligența artificială pentru a oferi clienților cea mai rapidă experiență."
  },
  {
    id: "homefind",
    title: "Home Find",
    subtitle: "Destinația: Căutarea Inteligentă",
    icon: <Home className="w-8 h-8 text-rose-600" />,
    color: "bg-rose-50 border-rose-200 text-rose-900",
    desc: "Platforma revoluționară susținută de AiX OS care transformă modul în care găsești proprietatea perfectă, conectând automat cererea cu oferta optimă."
  }
];

export function EcosystemMap() {
  const [activeNode, setActiveNode] = useState<string>("insurance");

  return (
    <div className="w-full max-w-6xl mx-auto py-12">
      <div className="flex flex-col lg:flex-row gap-12 items-center">
        
        {/* Left: Interactive Tree/Map */}
        <div className="w-full lg:w-1/2 relative min-h-[600px] flex flex-col justify-between py-10 items-center">
          {/* Central Line connecting them all */}
          <div className="absolute top-[10%] bottom-[10%] left-1/2 -translate-x-1/2 w-1 bg-gradient-to-b from-blue-300 via-emerald-300 to-rose-300 rounded-full z-0 opacity-50" />
          
          {nodes.map((node, idx) => (
            <motion.div
              key={node.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              onClick={() => setActiveNode(node.id)}
              className={`relative z-10 w-full max-w-xs cursor-pointer group transition-all duration-300 ${activeNode === node.id ? "scale-105" : "scale-100 hover:scale-[1.02] opacity-70 hover:opacity-100"}`}
            >
              {/* Connector line for alternating sides if we wanted to offset them, but keeping them centered is cleaner */}
              <div className={`p-6 rounded-3xl border-2 flex items-center gap-4 bg-white/90 backdrop-blur shadow-sm ${activeNode === node.id ? 'border-foreground shadow-xl' : 'border-border'}`}>
                <div className={`p-3 rounded-2xl ${node.color} shrink-0`}>
                  {node.icon}
                </div>
                <div>
                  <h4 className="font-bold text-lg font-heading text-foreground">{node.title}</h4>
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{node.subtitle}</p>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Animated particles flowing down the line */}
          <motion.div 
            animate={{ top: ["10%", "90%"], opacity: [0, 1, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-white shadow-[0_0_15px_rgba(0,0,0,0.5)] z-20 pointer-events-none"
          />
        </div>

        {/* Right: Detail View */}
        <div className="w-full lg:w-1/2">
          <AnimatePresence mode="wait">
            {nodes.map(
              (node) =>
                activeNode === node.id && (
                  <motion.div
                    key={node.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className={`p-10 md:p-14 rounded-[3rem] border ${node.color} bg-white/50 backdrop-blur shadow-2xl relative overflow-hidden`}
                  >
                    {/* Decorative large icon background */}
                    <div className="absolute -right-10 -bottom-10 opacity-5 pointer-events-none scale-[5]">
                      {node.icon}
                    </div>

                    <div className={`p-4 rounded-3xl inline-flex mb-8 ${node.color} bg-white`}>
                      {node.icon}
                    </div>
                    
                    <h3 className="text-sm font-bold uppercase tracking-widest mb-3 opacity-80">{node.subtitle}</h3>
                    <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">{node.title}</h2>
                    <p className="text-xl leading-relaxed opacity-90 mb-10">
                      {node.desc}
                    </p>
                    
                    <button className="flex items-center gap-2 font-bold hover:gap-4 transition-all duration-300 border-b-2 pb-1 border-current opacity-80 hover:opacity-100">
                      Află mai multe <ArrowRight className="w-5 h-5" />
                    </button>
                  </motion.div>
                )
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
