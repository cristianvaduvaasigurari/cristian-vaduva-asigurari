import React from "react";
import type { Metadata } from "next";
import { WealthPassportDocument } from "@/components/sections/wealth-passport-document";

export const metadata: Metadata = {
  title: "Wealth Passport | Cristian Văduva",
  description: "Descarcă pașaportul tău digital securizat pentru protecția averii.",
};

export default function WealthPassportPage() {
  return (
    <main className="min-h-screen bg-[#fafafa] pt-32 pb-24">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 print:hidden">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-800 font-bold text-xs mb-6 uppercase tracking-widest border border-slate-200">
            Diplomatic Document
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-black mb-6 text-foreground tracking-tight">
            AiX Wealth Passport
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Certificarea ta de elită în protecția activelor și administrarea riscurilor personale. Un raport de sinteză formatat pentru siguranță și printare.
          </p>
        </div>

        {/* Passport Document */}
        <WealthPassportDocument />

      </div>
    </main>
  );
}
