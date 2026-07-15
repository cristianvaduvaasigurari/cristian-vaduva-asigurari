"use client";

import React from "react";
import { motion } from "framer-motion";
import { Car, Diamond, ShieldCheck, Ship, Camera, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const assets = [
  {
    id: "supercars",
    icon: <Car className="w-12 h-12 text-zinc-900" />,
    title: "Supercars & Exotic Fleet",
    desc: "Acoperire full CASCO beneficiu la valoarea pieței, protecție pentru circuit (dacă este cazul) și mașină la schimb de categorie echivalentă în caz de reparație."
  },
  {
    id: "yachts",
    icon: <Ship className="w-12 h-12 text-zinc-900" />,
    title: "Yachts & Private Boats",
    desc: "Asigurare Hull & Machinery, răspundere civilă navală și acoperire P&I (Protection and Indemnity) pe rute internaționale."
  },
  {
    id: "art",
    icon: <Camera className="w-12 h-12 text-zinc-900" />,
    title: "Colecții de Artă & Wine",
    desc: "Polițe de tip 'All-Risk' pentru artă plastică, antichități și vinuri fine. Acoperire pentru degradare în tranzit, furt sau controlul temperaturii."
  },
  {
    id: "jewelry",
    icon: <Diamond className="w-12 h-12 text-zinc-900" />,
    title: "Jewelry & valoare mare pentru tine Watchmaking",
    desc: "Asigurări specializate de la sindicate Lloyd's pentru colecții de ceasuri rare și bijuterii, cu acoperire globală inclusiv la purtare."
  },
  {
    id: "estates",
    icon: <Building2 className="w-12 h-12 text-zinc-900" />,
    title: "acces rapid pentru tine Estates",
    desc: "Nu limităm despăgubirile la evaluarea standard. Construim o poliță pe Valoarea Reală de Reconstrucție cu arhitect și materiale beneficiu."
  }
];

export default function beneficiuAssetsPage() {
  return (
    <main className="min-h-screen bg-white pt-32 pb-24 text-zinc-900 selection:bg-zinc-900 selection:text-white">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Hero */}
        <div className="max-w-4xl mx-auto text-center mb-32">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-100 text-zinc-800 font-bold text-xs uppercase tracking-[0.2em] mb-8"
          >
            <ShieldCheck className="w-4 h-4" /> AiX Private Wealth
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-7xl font-heading font-black mb-8 tracking-tighter leading-[1.1]"
          >
            Protecție pentru ceea ce nu poate fi înlocuit.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-zinc-500 font-medium leading-relaxed max-w-2xl mx-auto"
          >
            Polițele standard se opresc acolo unde începe patrimoniul tău. Oferim brokeraj de nișă pentru activele de lux prin sindicate internaționale.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto mb-32">
          {assets.map((asset, i) => (
            <motion.div
              key={asset.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`p-10 rounded-[2.5rem] bg-zinc-50 border border-zinc-100 hover:border-zinc-300 transition-colors duration-500 group ${i === 0 || i === 3 ? 'lg:col-span-2' : ''}`}
            >
              <div className="mb-8 transform group-hover:scale-110 transition-transform duration-500 origin-left">
                {asset.icon}
              </div>
              <h3 className="text-2xl font-bold font-heading mb-4 tracking-tight">{asset.title}</h3>
              <p className="text-zinc-500 font-medium leading-relaxed">{asset.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto bg-zinc-900 text-white rounded-[3rem] p-12 md:p-24 text-center overflow-hidden relative"
        >
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3"></div>
          
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-heading font-black mb-6 tracking-tight">
              Solicită un audit privat.
            </h2>
            <p className="text-xl text-zinc-400 mb-12 max-w-2xl mx-auto">
              Suntem parteneri de încredere pentru clienții valoare mare pentru tine-Net-Worth. Discreția și execuția ireproșabilă sunt garantate.
            </p>
            <Button className="h-16 rounded-full bg-white text-zinc-900 hover:bg-zinc-200 text-lg font-bold px-10" asChild>
              <a href="/contact">Programează o întâlnire</a>
            </Button>
          </div>
        </motion.div>

      </div>
    </main>
  );
}
