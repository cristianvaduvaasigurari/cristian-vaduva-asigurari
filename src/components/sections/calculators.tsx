"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Home, Heart, Car, Briefcase, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function CalculatorsSection() {
  const [activeTab, setActiveTab] = useState<"home" | "life" | "casco" | "imm">("home");

  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-16 max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6 tracking-tight">
          Estimări <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Inteligente</span>
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Folosește calculatoarele noastre pentru a obține o estimare orientativă a costurilor de protecție. Valorile sunt pur informative și reflectă o medie a pieței.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {[
          { id: "home", icon: Home, label: "Locuință" },
          { id: "life", icon: Heart, label: "Viață" },
          { id: "casco", icon: Car, label: "CASCO" },
          { id: "imm", icon: Briefcase, label: "Business IMM" }
        ].map((tab) => (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? "default" : "glass"}
            className={cn("rounded-full px-6 gap-2", activeTab === tab.id && "bg-foreground text-background hover:bg-foreground/90")}
            onClick={() => setActiveTab(tab.id as "home" | "life" | "casco" | "imm")}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </Button>
        ))}
      </div>

      <div className="max-w-xl mx-auto glass p-8 md:p-12 rounded-[3rem] border border-border relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
        
        {activeTab === "home" && <HomeCalculator />}
        {activeTab === "life" && <LifeCalculator />}
        {activeTab === "casco" && <CascoCalculator />}
        {activeTab === "imm" && <ImmCalculator />}
      </div>
    </div>
  );
}

function HomeCalculator() {
  const [value, setValue] = useState("");
  const [area, setArea] = useState("");
  const [result, setResult] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const calculate = () => {
    setError("");
    const val = parseFloat(value);
    const sq = parseFloat(area);
    if (!val || !sq) {
      setError("Te rugăm să completezi valoarea și suprafața.");
      return;
    }
    
    setIsLoading(true);
    setResult(null);
    setTimeout(() => {
      setResult(Math.round((val * 0.001) + (sq * 0.5)));
      setIsLoading(false);
    }, 800);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 relative z-10">
      <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
        <Home className="text-blue-500" /> Asigurare Locuință
      </h3>
      <div className="space-y-4">
        <div>
          <label className="text-sm text-muted-foreground mb-2 block">Valoare Proprietate (€)</label>
          <Input type="number" placeholder="ex: 150000" value={value} onChange={(e) => setValue(e.target.value)} className="h-14 rounded-2xl bg-background border-border" />
        </div>
        <div>
          <label className="text-sm text-muted-foreground mb-2 block">Suprafață utilă (mp)</label>
          <Input type="number" placeholder="ex: 85" value={area} onChange={(e) => setArea(e.target.value)} className="h-14 rounded-2xl bg-background border-border" />
        </div>
        <div>
          <label className="text-sm text-muted-foreground mb-2 block">Tip proprietate</label>
          <select className="w-full h-14 rounded-2xl bg-background border border-border px-4 text-foreground focus:outline-none focus:ring-1 focus:ring-primary appearance-none">
            <option value="apartament">Apartament</option>
            <option value="casa">Casă / Vilă</option>
          </select>
        </div>
      </div>
      {error && <p className="text-red-400 text-sm mt-2 text-center">{error}</p>}
      <Button className="w-full h-14 rounded-2xl text-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-70" onClick={calculate} disabled={isLoading}>
        {isLoading ? "Se calculează..." : "Calculează Estimarea"}
      </Button>
      {result !== null && <ResultCard value={result} title="Primă Anuală Estimată" />}
    </motion.div>
  );
}

function LifeCalculator() {
  const [age, setAge] = useState("");
  const [capital, setCapital] = useState("");
  const [result, setResult] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const calculate = () => {
    setError("");
    const a = parseInt(age);
    const c = parseInt(capital);
    if (!a || !c) {
      setError("Te rugăm să completezi vârsta și capitalul dorit.");
      return;
    }
    
    setIsLoading(true);
    setResult(null);
    setTimeout(() => {
      const factor = a > 40 ? 0.003 : 0.0015;
      setResult(Math.round(c * factor));
      setIsLoading(false);
    }, 800);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 relative z-10">
      <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
        <Heart className="text-red-500" /> Asigurare de Viață
      </h3>
      <div className="space-y-4">
        <div>
          <label className="text-sm text-muted-foreground mb-2 block">Vârstă (ani)</label>
          <Input type="number" placeholder="ex: 35" value={age} onChange={(e) => setAge(e.target.value)} className="h-14 rounded-2xl bg-background border-border" />
        </div>
        <div>
          <label className="text-sm text-muted-foreground mb-2 block">Capital asigurat dorit (€)</label>
          <Input type="number" placeholder="ex: 100000" value={capital} onChange={(e) => setCapital(e.target.value)} className="h-14 rounded-2xl bg-background border-border" />
        </div>
        <div>
          <label className="text-sm text-muted-foreground mb-2 block">Perioadă de acoperire</label>
          <select className="w-full h-14 rounded-2xl bg-background border border-border px-4 text-foreground focus:outline-none focus:ring-1 focus:ring-primary appearance-none">
            <option value="10">10 ani</option>
            <option value="20">20 ani</option>
            <option value="30">30 ani</option>
          </select>
        </div>
      </div>
      {error && <p className="text-red-400 text-sm mt-2 text-center">{error}</p>}
      <Button className="w-full h-14 rounded-2xl text-lg bg-red-600 hover:bg-red-700 disabled:opacity-70" onClick={calculate} disabled={isLoading}>
        {isLoading ? "Se calculează..." : "Calculează Estimarea"}
      </Button>
      {result !== null && <ResultCard value={result} title="Cost Anual Estimat" />}
    </motion.div>
  );
}

function CascoCalculator() {
  const [val, setVal] = useState("");
  const [year, setYear] = useState("");
  const [result, setResult] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const calculate = () => {
    setError("");
    const v = parseInt(val);
    const y = parseInt(year);
    if (!v || !y) {
      setError("Te rugăm să completezi valoarea și anul fabricației.");
      return;
    }
    
    setIsLoading(true);
    setResult(null);
    setTimeout(() => {
      const currentYear = new Date().getFullYear();
      const age = currentYear - y;
      const factor = age > 3 ? 0.05 : 0.04;
      setResult(Math.round(v * factor));
      setIsLoading(false);
    }, 800);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 relative z-10">
      <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
        <Car className="text-amber-500" /> CASCO Auto
      </h3>
      <div className="space-y-4">
        <div>
          <label className="text-sm text-muted-foreground mb-2 block">Marcă / Model</label>
          <Input type="text" placeholder="ex: BMW X5" className="h-14 rounded-2xl bg-background border-border" />
        </div>
        <div>
          <label className="text-sm text-muted-foreground mb-2 block">Valoare de piață (€)</label>
          <Input type="number" placeholder="ex: 45000" value={val} onChange={(e) => setVal(e.target.value)} className="h-14 rounded-2xl bg-background border-border" />
        </div>
        <div>
          <label className="text-sm text-muted-foreground mb-2 block">An fabricație</label>
          <Input type="number" placeholder="ex: 2021" value={year} onChange={(e) => setYear(e.target.value)} className="h-14 rounded-2xl bg-background border-border" />
        </div>
      </div>
      {error && <p className="text-red-400 text-sm mt-2 text-center">{error}</p>}
      <Button className="w-full h-14 rounded-2xl text-lg bg-amber-600 hover:bg-amber-700 disabled:opacity-70" onClick={calculate} disabled={isLoading}>
        {isLoading ? "Se calculează..." : "Calculează Estimarea"}
      </Button>
      {result !== null && <ResultCard value={result} title="Primă CASCO Estimată" />}
    </motion.div>
  );
}

function ImmCalculator() {
  const [ca, setCa] = useState("");
  const [emp, setEmp] = useState("");
  const [result, setResult] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const calculate = () => {
    setError("");
    const c = parseInt(ca);
    const e = parseInt(emp);
    if (!c || !e) {
      setError("Te rugăm să completezi cifra de afaceri și numărul de angajați.");
      return;
    }
    
    setIsLoading(true);
    setResult(null);
    setTimeout(() => {
      setResult(Math.round((c * 0.002) + (e * 20)));
      setIsLoading(false);
    }, 800);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 relative z-10">
      <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
        <Briefcase className="text-purple-500" /> Business IMM
      </h3>
      <div className="space-y-4">
        <div>
          <label className="text-sm text-muted-foreground mb-2 block">Domeniu de activitate</label>
          <select className="w-full h-14 rounded-2xl bg-background border border-border px-4 text-foreground focus:outline-none focus:ring-1 focus:ring-primary appearance-none">
            <option value="it">IT & Servicii</option>
            <option value="comert">Comerț / Retail</option>
            <option value="productie">Producție</option>
            <option value="constructii">Construcții</option>
          </select>
        </div>
        <div>
          <label className="text-sm text-muted-foreground mb-2 block">Cifră de afaceri estimată (€)</label>
          <Input type="number" placeholder="ex: 500000" value={ca} onChange={(e) => setCa(e.target.value)} className="h-14 rounded-2xl bg-background border-border" />
        </div>
        <div>
          <label className="text-sm text-muted-foreground mb-2 block">Număr angajați</label>
          <Input type="number" placeholder="ex: 15" value={emp} onChange={(e) => setEmp(e.target.value)} className="h-14 rounded-2xl bg-background border-border" />
        </div>
      </div>
      {error && <p className="text-red-400 text-sm mt-2 text-center">{error}</p>}
      <Button className="w-full h-14 rounded-2xl text-lg bg-purple-600 hover:bg-purple-700 disabled:opacity-70" onClick={calculate} disabled={isLoading}>
        {isLoading ? "Se calculează..." : "Calculează Estimarea"}
      </Button>
      {result !== null && <ResultCard value={result} title="Pachet IMM Estimat (Anual)" />}
    </motion.div>
  );
}

function ResultCard({ value, title }: { value: number, title: string }) {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mt-8 p-6 rounded-2xl bg-muted/50 border border-border text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-white/50 to-transparent pointer-events-none" />
      <p className="text-sm text-muted-foreground mb-2">{title}</p>
      <div className="text-4xl font-heading font-bold mb-4 flex items-center justify-center gap-2">
        <Calculator className="w-6 h-6 text-muted-foreground" />
        {value} <span className="text-xl text-muted-foreground">€</span>
      </div>
      <p className="text-xs text-muted-foreground mb-6">Aceasta este doar o estimare. Analiza exactă necesită un audit de risc.</p>
      <Button variant="outline" className="rounded-full w-full bg-foreground text-background hover:bg-foreground/90" asChild>
        <Link href="/contact">Solicită Oferta Personalizată</Link>
      </Button>
    </motion.div>
  );
}
