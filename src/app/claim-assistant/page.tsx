import React from "react";
import type { Metadata } from "next";
import { ClaimAssistant } from "@/components/sections/claim-assistant";

export const metadata: Metadata = {
  title: "AI Claim Assistant | Cristian Văduva",
  description: "Asistent virtual inteligent pentru evaluarea și centralizarea documentelor în caz de daună.",
};

export default function ClaimAssistantPage() {
  return (
    <main className="min-h-screen bg-[#fafafa] pt-32 pb-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-600 font-bold text-xs mb-6 uppercase tracking-widest border border-slate-200">
            Smart Claims
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-foreground tracking-tight">
            AI Claim Assistant
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Un instrument ajutător conceput să te ghideze pas cu pas în adunarea dovezilor și a documentelor necesare pentru deschiderea dosarului tău de daună.
          </p>
        </div>

        <ClaimAssistant />
      </div>
    </main>
  );
}
