import React from "react";
import type { Metadata } from "next";
import { TrustCenterInfo } from "@/components/sections/trust-center-info";

export const metadata: Metadata = {
  title: "AiX Trust Center | Cristian Văduva",
  description: "Află mai multe despre transparența, securitatea și filozofia de consultanță a lui Cristian Văduva.",
};

export default function TrustCenterPage() {
  return (
    <main className="min-h-screen bg-[#fafafa] pt-32 pb-24">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-800 font-bold text-xs mb-6 uppercase tracking-widest border border-slate-200">
            Trust &amp; Transparency
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-black mb-6 text-foreground tracking-tight">
            AiX Trust Center
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Standardele noastre de confidențialitate, principiile de protecție a datelor și modelul integrat de consultanță cu liderul pieței Generali România.
          </p>
        </div>

        {/* Trust Center Panel */}
        <TrustCenterInfo />

      </div>
    </main>
  );
}
