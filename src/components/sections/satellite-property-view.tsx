"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, AlertCircle, Shield, Coins, CheckCircle, Info } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface NearbyPOI {
  name: string;
  dist: string;
}

interface SatelliteData {
  address: string;
  overview: string;
  nearby: NearbyPOI[];
  investment: {
    score: string;
    capRate: string;
    appreciation: string;
    notes: string;
  };
  risk: {
    seismic: string;
    flood: string;
    theft: string;
  };
  insurance: {
    recommended: string;
    estimatedCoverage: string;
    deductible: string;
  };
}

export function SatellitePropertyView() {
  const [address, setAddress] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [results, setResults] = useState<SatelliteData | null>(null);

  const handleScan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!address) return;
    setIsScanning(true);
    setResults(null);

    // Simulate satellite scanner
    setTimeout(() => {
      setIsScanning(false);
      setResults({
        address: address,
        overview: "Proprietate rezidențială aflată în zonă cu accesibilitate ridicată. Risc seismic clasa 4 (Scăzut). Sol fertil, structură solidă din beton.",
        nearby: [
          { name: "Metrou Pipera", dist: "850m" },
          { name: "Centrul Comercial Promenada", dist: "1.8km" },
          { name: "Parcul Herăstrău", dist: "3.2km" }
        ],
        investment: {
          score: "85/100",
          capRate: "5.8% - 6.2%",
          appreciation: "Mediu (+4.2% anual estimat)",
          notes: "Zonă cu cerere ridicată pentru închirieri office/corporate. Ideal pentru investitori conservatori."
        },
        risk: {
          seismic: "Risc Scăzut (Zona C)",
          flood: "Risc Minim (Fără istoric inundații)",
          theft: "Risc Redus (Cartier rezidențial păzit)"
        },
        insurance: {
          recommended: "Poliță Facultativă beneficiu + Clauză Răspundere Civică Chiriași",
          estimatedCoverage: "€150 - €220 / an",
          deductible: "€100 standard per eveniment"
        }
      });
    }, 2500);
  };

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-8">
      
      {/* Search Input Bar */}
      <form onSubmit={handleScan} className="glass p-6 md:p-8 rounded-[3rem] border border-border shadow-sm bg-white relative z-10 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-grow w-full">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <Input 
            value={address}
            onChange={e => setAddress(e.target.value)}
            placeholder="Introdu adresa proprietății (ex: Calea Floreasca 169, București)..."
            className="h-16 pl-14 pr-6 rounded-full border-2 bg-slate-50 focus-visible:ring-0 focus-visible:border-slate-300 text-base md:text-lg shadow-inner w-full"
            disabled={isScanning}
          />
        </div>
        <Button 
          type="submit" 
          disabled={isScanning || !address} 
          className="h-16 px-10 rounded-full bg-slate-900 text-white font-bold text-base hover:bg-slate-800 transition-colors w-full md:w-auto shrink-0"
        >
          {isScanning ? "Se scanează..." : "Scanează Proprietatea"}
        </Button>
      </form>

      {/* SCANNING STATE ANIMS */}
      {isScanning && (
        <div className="glass p-12 rounded-[3rem] border border-border bg-white text-center flex flex-col items-center justify-center min-h-[300px]">
          <div className="w-20 h-20 rounded-full border-4 border-slate-100 border-t-slate-900 animate-spin mb-6" />
          <h3 className="font-heading font-black text-2xl text-slate-900 mb-2">Localizare prin Satelit...</h3>
          <p className="text-sm text-muted-foreground max-w-xs">Interconectăm coordonatele geografice cu bazele de date ANCPI, hărțile de risc seismic și indicii imobiliari locali.</p>
        </div>
      )}

      {/* RESULTS DISPLAY */}
      <AnimatePresence>
        {results && !isScanning && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col gap-6"
          >
            
            {/* Top Overview & Satellite Map Simulation */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Map Simulator */}
              <div className="md:col-span-2 border border-slate-100 bg-white rounded-[3rem] p-6 relative overflow-hidden min-h-[280px] shadow-sm flex items-center justify-center">
                {/* Visual grid simulating radar/satellite view */}
                <div className="absolute inset-0 bg-slate-100 opacity-20 bg-grid-pattern" />
                <div className="absolute w-24 h-24 rounded-full border border-dashed border-blue-500 animate-ping opacity-30" />
                <div className="relative text-center z-10">
                  <div className="w-14 h-14 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center mx-auto mb-4 text-blue-600 shadow">
                    <MapPin className="w-6 h-6 animate-bounce" />
                  </div>
                  <h4 className="font-bold text-slate-800 text-sm">Vizualizare Satelit Activă</h4>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mt-1">Sistemul de hărți este gata pentru integrarea Google Maps API</p>
                </div>
              </div>

              {/* Location General Overview */}
              <div className="glass p-8 rounded-[3rem] border border-border bg-white shadow-sm flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-slate-800 text-sm uppercase tracking-wider mb-4 flex items-center gap-1.5">
                    <Info className="w-4.5 h-4.5 text-slate-400" /> Prezentare Locație
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {results.overview}
                  </p>
                </div>
                
                <div className="border-t border-slate-100 pt-6 mt-6">
                  <h5 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-3">Puncte de interes apropiate:</h5>
                  <ul className="space-y-2">
                    {results.nearby.map((poi, i: number) => (
                      <li key={i} className="text-xs text-slate-600 flex justify-between">
                        <span>{poi.name}</span>
                        <span className="font-bold text-slate-800">{poi.dist}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>

            {/* Three Pillar Analytics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Pillar 1: Investment Considerations */}
              <div className="glass p-8 rounded-[3rem] border border-border bg-white shadow-sm flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-emerald-800 text-sm uppercase tracking-wider mb-6 flex items-center gap-1.5">
                    <Coins className="w-4.5 h-4.5 text-emerald-600" /> Analiză Investiție
                  </h4>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b border-slate-50">
                      <span className="text-xs text-slate-500">Scor Investițional</span>
                      <span className="font-bold text-sm text-slate-800">{results.investment.score}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-slate-50">
                      <span className="text-xs text-slate-500">Cap Rate Estimativ</span>
                      <span className="font-bold text-sm text-slate-800">{results.investment.capRate}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-slate-50">
                      <span className="text-xs text-slate-500">Apreciere Zone</span>
                      <span className="font-bold text-sm text-slate-800">{results.investment.appreciation}</span>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-6 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                  {results.investment.notes}
                </p>
              </div>

              {/* Pillar 2: Risk Considerations */}
              <div className="glass p-8 rounded-[3rem] border border-border bg-white shadow-sm flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-rose-800 text-sm uppercase tracking-wider mb-6 flex items-center gap-1.5">
                    <AlertCircle className="w-4.5 h-4.5 text-rose-600" /> Factori de Risc
                  </h4>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b border-slate-50">
                      <span className="text-xs text-slate-500">Risc Seismic</span>
                      <span className="font-bold text-sm text-slate-800">{results.risk.seismic}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-slate-50">
                      <span className="text-xs text-slate-500">Pericol Inundație</span>
                      <span className="font-bold text-sm text-slate-800">{results.risk.flood}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-slate-50">
                      <span className="text-xs text-slate-500">Securitate Zonă</span>
                      <span className="font-bold text-sm text-slate-800">{results.risk.theft}</span>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-6 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-100 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" /> Zona nu prezintă alunecări de teren active.
                </p>
              </div>

              {/* Pillar 3: Insurance Considerations */}
              <div className="glass p-8 rounded-[3rem] border border-border bg-white shadow-sm flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-blue-800 text-sm uppercase tracking-wider mb-6 flex items-center gap-1.5">
                    <Shield className="w-4.5 h-4.5 text-blue-600" /> Recomandare Asigurare
                  </h4>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b border-slate-50">
                      <span className="text-xs text-slate-500">Primă Estimată</span>
                      <span className="font-bold text-sm text-slate-800">{results.insurance.estimatedCoverage}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-slate-50">
                      <span className="text-xs text-slate-500">Franșiză standard</span>
                      <span className="font-bold text-sm text-slate-800">{results.insurance.deductible}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">Acoperire Propunere:</span>
                  <p className="text-xs text-slate-600 leading-relaxed font-semibold bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                    {results.insurance.recommended}
                  </p>
                </div>
              </div>

            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
