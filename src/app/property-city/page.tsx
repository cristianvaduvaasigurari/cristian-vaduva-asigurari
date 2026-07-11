import React from "react";
import type { Metadata } from "next";
import { PropertyCityMap } from "@/components/sections/property-city-map";

export const metadata: Metadata = {
  title: "Digital Property City | Cristian Văduva",
  description: "Explorează activele imobiliare într-un mediu virtual integrat cu Home Find.",
};

export default function PropertyCityPage() {
  return (
    <main className="min-h-screen bg-[#fafafa] pt-32 pb-24">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-800 font-bold text-xs mb-6 uppercase tracking-widest border border-slate-200">
            Visual Environment
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-black mb-6 text-foreground tracking-tight">
            Digital Property City
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Harta ta personalizată imobiliară. Administrează clădirile din portofoliu sau evaluează noi achiziții prin instrumentele de asset management.
          </p>
        </div>

        {/* City Map */}
        <PropertyCityMap />

      </div>
    </main>
  );
}
