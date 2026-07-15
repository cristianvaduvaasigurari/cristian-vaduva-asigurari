"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Shield, Home, TrendingUp, Sparkles, Users, Briefcase, Cpu, Search, 
  Globe, Rss, FileText, ArrowUpRight 
} from "lucide-react";
import Link from "next/link";

const modules = [
  {
    id: "protection",
    title: "Protection Hub",
    metric: "92% Score",
    desc: "Monitorizează asigurările curente și deficitul de acoperire.",
    icon: <Shield className="w-6 h-6 text-blue-600" />,
    link: "/gap-analyzer",
    color: "bg-blue-50/50 border-blue-100"
  },
  {
    id: "real-estate",
    title: "Real Estate Portfolio",
    metric: "€480K Valoare",
    desc: "Vizualizează activele imobiliare active și oportunitățile.",
    icon: <Home className="w-6 h-6 text-emerald-600" />,
    link: "/investitii-imobiliare/analyzer",
    color: "bg-emerald-50/50 border-emerald-100"
  },
  {
    id: "investments",
    title: "Investments Tracker",
    metric: "+12.4% YTD",
    desc: "Bilanțul randamentelor portofoliului tău strategic.",
    icon: <TrendingUp className="w-6 h-6 text-purple-600" />,
    link: "/financial-twin",
    color: "bg-purple-50/50 border-purple-100"
  },
  {
    id: "luxury",
    title: "Luxury Assets",
    metric: "3 Bunuri Premium",
    desc: "Protecție exclusivistă pentru supercars, artă și yacht-uri.",
    icon: <Sparkles className="w-6 h-6 text-amber-600" />,
    link: "/luxury-assets",
    color: "bg-amber-50/50 border-amber-100"
  },
  {
    id: "family",
    title: "Family Protection",
    metric: "4 Dependenți Securizați",
    desc: "Capitalul asigurat optim pentru stabilitatea celor dragi.",
    icon: <Users className="w-6 h-6 text-rose-600" />,
    link: "/family-planner",
    color: "bg-rose-50/50 border-rose-100"
  },
  {
    id: "business",
    title: "Business Shield",
    metric: "1 Companie Activă",
    desc: "Reducerea riscurilor comerciale și răspunderii manageriale.",
    icon: <Briefcase className="w-6 h-6 text-cyan-600" />,
    link: "/servicii/imm-insurance",
    color: "bg-cyan-50/50 border-cyan-100"
  },
  {
    id: "aixos",
    title: "AiX OS",
    metric: "Core V2.4 Active",
    desc: "Sistemul tău de operare financiar personal și securizat.",
    icon: <Cpu className="w-6 h-6 text-slate-700" />,
    link: "/aixos",
    color: "bg-slate-50/50 border-slate-200"
  },
  {
    id: "homefind",
    title: "Home Find Match",
    metric: "2 Alerte Off-Market",
    desc: "Identifică proprietăți rezidențiale prin algoritmi inteligenți.",
    icon: <Search className="w-6 h-6 text-indigo-600" />,
    link: "/home-find",
    color: "bg-indigo-50/50 border-indigo-100"
  }
];

const mainTools = [
  { name: "Wealth Galaxy", icon: <Globe className="w-5 h-5" />, href: "/wealth-galaxy", desc: "Orbitează activele tale" },
  { name: "Market Radar", icon: <Rss className="w-5 h-5" />, href: "/market-radar", desc: "Dobânzi și analize live" },
  { name: "Wealth Passport", icon: <FileText className="w-5 h-5" />, href: "/wealth-passport", desc: "Documentul tău de elită" }
];

export function MissionControlDashboard() {
  return (
    <div className="w-full flex flex-col gap-10">
      
      {/* Top Banner with Quick Actions */}
      <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {mainTools.map((tool, idx) => (
          <Link key={idx} href={tool.href} className="group p-5 rounded-[2rem] border border-border bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-start gap-4">
            <div className="p-3 rounded-full bg-slate-50 group-hover:bg-slate-900 group-hover:text-white transition-colors">
              {tool.icon}
            </div>
            <div>
              <h4 className="font-bold text-sm text-foreground">{tool.name}</h4>
              <p className="text-xs text-muted-foreground mt-1">{tool.desc}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Grid containing Core Modules */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {modules.map((m, idx) => (
          <motion.div 
            key={m.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
            className={`p-8 rounded-[2.5rem] border ${m.color} bg-white shadow-sm flex flex-col justify-between hover:shadow-xl transition-all duration-300 relative group overflow-hidden`}
          >
            {/* Top Row */}
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 rounded-full bg-white border border-border shadow-sm">
                {m.icon}
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground bg-white/80 border border-slate-100 px-3 py-1 rounded-full">{m.metric}</span>
            </div>

            {/* Content */}
            <div className="mt-4">
              <h3 className="text-xl font-bold tracking-tight text-foreground mb-2">{m.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">{m.desc}</p>
            </div>

            {/* Bottom Row */}
            <Link href={m.link} className="inline-flex items-center text-xs font-bold text-slate-800 hover:text-blue-600 transition-colors gap-1.5 self-start bg-white border border-border px-4 py-2.5 rounded-full shadow-sm hover:shadow">
              Accesează <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>

            {/* Subtle interactive grid background */}
            <div className="absolute inset-0 bg-grid-pattern opacity-0 group-hover:opacity-5 pointer-events-none transition-opacity duration-300" />
          </motion.div>
        ))}
      </div>

    </div>
  );
}
