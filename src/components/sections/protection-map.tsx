"use client";

import * as React from "react"; import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Home, Car, Briefcase, Plane, Heart, ArrowRight, ShieldAlert, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const hotspots = [
  {
    id: "person",
    label: "Viață & Familie",
    icon: <User className="w-6 h-6" />,
    color: "bg-blue-600",
    position: { top: "20%", left: "50%" },
    risks: ["Accidente", "Boli Grave", "Deces prematur"],
    benefits: ["Protecția veniturilor familiei", "Capital garantat", "Rente de studii pentru copii"],
    link: "/servicii/life-insurance"
  },
  {
    id: "home",
    label: "Patrimoniu",
    icon: <Home className="w-6 h-6" />,
    color: "bg-amber-500",
    position: { top: "45%", left: "25%" },
    risks: ["Incendiu", "Cutremur", "Inundații", "Furt", "Răspundere civilă"],
    benefits: ["Reconstrucție la valoarea de nou", "Înlocuire bunuri", "Cazare temporară"],
    link: "/servicii/home-insurance"
  },
  {
    id: "car",
    label: "Mobilitate",
    icon: <Car className="w-6 h-6" />,
    color: "bg-slate-700",
    position: { top: "45%", left: "75%" },
    risks: ["Daună totală", "Furt auto", "Accidente rutiere"],
    benefits: ["Mașină la schimb", "Decontare directă", "Reparații în reprezentanță"],
    link: "/servicii/casco-insurance"
  },
  {
    id: "business",
    label: "Afacere",
    icon: <Briefcase className="w-6 h-6" />,
    color: "bg-indigo-600",
    position: { top: "75%", left: "35%" },
    risks: ["Întreruperea activității", "Răspundere profesională", "Cyber Atacuri", "Daune la clădire"],
    benefits: ["Acoperirea profitului pierdut", "Protecție juridică", "Înlocuire echipamente"],
    link: "/servicii/imm-insurance"
  },
  {
    id: "health",
    label: "Sănătate",
    icon: <Heart className="w-6 h-6" />,
    color: "bg-rose-500",
    position: { top: "35%", left: "35%" },
    risks: ["Spitalizare", "Intervenții chirurgicale complexe", "Cancer"],
    benefits: ["Tratament internațional (Second Opinion)", "Decontare directă la clinici private", "Medicamente compensate"],
    link: "/servicii/health-insurance-individual"
  },
  {
    id: "travel",
    label: "Călătorii",
    icon: <Plane className="w-6 h-6" />,
    color: "bg-sky-500",
    position: { top: "35%", left: "65%" },
    risks: ["Urgente medicale externe", "Zboruri anulate", "Bagaje pierdute", "Accidente la schi"],
    benefits: ["Repatriere", "Tratament de urgență gratuit", "Asistență 24/7 internațională"],
    link: "/servicii/travel-insurance"
  }
];

export function ProtectionMap() {
  const [activeId, setActiveId] = useState<string | null>("person");

  const activeHotspot = hotspots.find(h => h.id === activeId);

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left: The Visual Map */}
        <div className="relative w-full aspect-square md:aspect-[4/3] lg:aspect-square bg-slate-50 rounded-[3rem] border border-border p-8 overflow-hidden shadow-inner flex items-center justify-center">
          {/* Abstract SVG Background Map */}
          <svg viewBox="0 0 400 400" className="absolute inset-0 w-full h-full opacity-10 pointer-events-none">
            <path d="M 200 50 C 300 50 350 150 350 200 C 350 300 250 350 200 350 C 100 350 50 300 50 200 C 50 100 100 50 200 50 Z" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="10 10" />
            <circle cx="200" cy="200" r="100" fill="none" stroke="currentColor" strokeWidth="1" />
            <line x1="200" y1="50" x2="200" y2="350" stroke="currentColor" strokeWidth="1" />
            <line x1="50" y1="200" x2="350" y2="200" stroke="currentColor" strokeWidth="1" />
          </svg>

          {/* Central Core */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white rounded-full shadow-2xl flex items-center justify-center z-10 border-4 border-blue-50">
            <div className="text-center">
              <span className="font-bold font-heading text-lg block leading-none">Tu</span>
              <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Nucleul</span>
            </div>
          </div>

          {/* Hotspots */}
          {hotspots.map((hotspot) => {
            const isActive = activeId === hotspot.id;
            return (
              <motion.button
                key={hotspot.id}
                onClick={() => setActiveId(hotspot.id)}
                className="absolute z-20"
                style={{ top: hotspot.position.top, left: hotspot.position.left }}
                animate={{
                  scale: isActive ? 1.2 : 1,
                  x: "-50%",
                  y: "-50%",
                }}
                whileHover={{ scale: 1.15 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className={`relative flex flex-col items-center gap-2 group`}>
                  {/* Pulse ring when active */}
                  {isActive && (
                    <span className={`absolute inset-0 rounded-full ${hotspot.color} opacity-40 animate-ping`} style={{ padding: '24px', top: '-12px', left: '-12px' }} />
                  )}
                  
                  <div className={`p-4 rounded-full text-white shadow-xl transition-colors duration-300 ${isActive ? hotspot.color : 'bg-slate-300 hover:bg-slate-400'}`}>
                    {hotspot.icon}
                  </div>
                  <span className={`text-xs font-bold uppercase tracking-wider px-2 py-1 rounded bg-white/90 backdrop-blur shadow-sm whitespace-nowrap transition-opacity duration-300 ${isActive ? 'opacity-100 text-foreground' : 'opacity-0 group-hover:opacity-100 text-muted-foreground'}`}>
                    {hotspot.label}
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Right: Info Panel */}
        <div className="h-full flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {activeHotspot && (
              <motion.div
                key={activeHotspot.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="glass rounded-[3rem] p-10 md:p-14 border border-border shadow-xl bg-white"
              >
                <div className={`p-4 rounded-2xl inline-flex text-white mb-8 ${activeHotspot.color}`}>
                  {activeHotspot.icon}
                </div>
                
                <h2 className="text-3xl md:text-4xl font-bold font-heading mb-8">
                  {activeHotspot.label}
                </h2>

                <div className="space-y-8 mb-10">
                  {/* Risks */}
                  <div className="bg-rose-50 p-6 rounded-2xl border border-rose-100">
                    <h3 className="font-bold text-rose-800 mb-4 flex items-center gap-2">
                      <ShieldAlert className="w-5 h-5" /> Riscuri Majore
                    </h3>
                    <ul className="space-y-2">
                      {activeHotspot.risks.map((risk, i) => (
                        <li key={i} className="text-rose-700/80 text-sm font-medium flex items-start gap-2">
                          <span className="mt-1 w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0" />
                          {risk}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Benefits */}
                  <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100">
                    <h3 className="font-bold text-emerald-800 mb-4 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5" /> Soluții & Beneficii
                    </h3>
                    <ul className="space-y-2">
                      {activeHotspot.benefits.map((benefit, i) => (
                        <li key={i} className="text-emerald-700/80 text-sm font-medium flex items-start gap-2">
                          <span className="mt-1 w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <Button className="w-full md:w-auto rounded-full text-white font-bold px-8 h-14 text-lg" style={{ backgroundColor: activeHotspot.color.replace('bg-', '') }} asChild>
                  <Link href={activeHotspot.link}>
                    Vezi Soluția Completă <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
