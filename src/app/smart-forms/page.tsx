import * as React from "react";
import type { Metadata } from "next";
import { ConversationalSmartForms } from "@/components/sections/conversational-smart-forms";

export const metadata: Metadata = {
  title: "AiX Smart Forms | Cristian Văduva",
  description: "Chestionare conversaționale inteligente pentru consultanță privată de asigurări și real estate.",
};

export default function SmartFormsPage() {
  return (
    <main className="min-h-screen bg-[#fafafa] pt-32 pb-24">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-800 font-bold text-xs mb-6 uppercase tracking-widest border border-slate-200">
            Smart Onboarding
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-black mb-6 text-foreground tracking-tight">
            Conversational Smart Forms
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Răspunde interactiv la chestionarul nostru inteligent. Fără câmpuri plictisitoare, doar un dialog structurat pentru identificarea rapidă a obiectivelor și a tipului de protecție necesar.
          </p>
        </div>

        {/* Conversational Forms */}
        <ConversationalSmartForms />

      </div>
    </main>
  );
}
