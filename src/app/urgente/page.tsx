import React from "react";
import type { Metadata } from "next";
import { EmergencyCenter } from "@/components/sections/emergency-center";

export const metadata: Metadata = {
  title: "Centru de Urgențe | Cristian Văduva",
  description: "Ghid pas-cu-pas în caz de urgență. Află exact ce trebuie să faci în caz de accident, incendiu sau inundație.",
};

export default function UrgentePage() {
  return (
    <main className="min-h-screen bg-[#fafafa] pt-32 pb-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 text-rose-600 font-bold text-xs mb-6 uppercase tracking-widest border border-rose-100 animate-pulse">
            EMERGENCY PROTOCOL
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-foreground tracking-tight">
            Centru de Daune & Urgențe
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Păstrează-ți calmul. Selectează tipul incidentului de mai jos și urmează cu strictețe pașii pentru a te asigura că ești în siguranță și că polița ta va acoperi despăgubirile.
          </p>
        </div>

        <EmergencyCenter />
      </div>
    </main>
  );
}
