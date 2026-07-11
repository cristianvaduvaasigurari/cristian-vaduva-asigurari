import React from "react";
import type { Metadata } from "next";
import { VoiceAiWidget } from "@/components/sections/voice-ai-widget";

export const metadata: Metadata = {
  title: "Voice AI Assistant | Cristian Văduva",
  description: "Discută vocal cu asistentul tău personal de protecție a activelor.",
};

export default function VoiceAssistantPage() {
  return (
    <main className="min-h-screen bg-[#fafafa] pt-32 pb-24">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-800 font-bold text-xs mb-6 uppercase tracking-widest border border-slate-200">
            Voice Command
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-black mb-6 text-foreground tracking-tight">
            Vorbeste cu AiX
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Folosește recunoașterea vocală nativă din browser pentru a obține navigare ghidată, asistență pentru polițe și strategii imobiliare rapide.
          </p>
        </div>

        {/* Voice AI Dashboard Widget */}
        <VoiceAiWidget />

      </div>
    </main>
  );
}
