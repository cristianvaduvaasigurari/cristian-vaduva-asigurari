import React from "react";
import type { Metadata } from "next";
import { AiVideoAvatar } from "@/components/sections/ai-video-avatar";

export const metadata: Metadata = {
  title: "AI Video Concierge | Cristian Văduva",
  description: "Asistentul tău video digital pentru ghidare financiară beneficiu și asistență rapidă.",
};

export default function AvatarPage() {
  return (
    <main className="min-h-screen bg-[#fafafa] pt-32 pb-24">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-800 font-bold text-xs mb-6 uppercase tracking-widest border border-slate-200">
            Concierge Room
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-black mb-6 text-foreground tracking-tight">
            AiX AI Video Concierge
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Interacționează vizual cu asistentul tău. Pune întrebări, află cum funcționează ecosistemul și primește recomandări personalizate în timp real.
          </p>
        </div>

        {/* Avatar Area */}
        <AiVideoAvatar />

      </div>
    </main>
  );
}
