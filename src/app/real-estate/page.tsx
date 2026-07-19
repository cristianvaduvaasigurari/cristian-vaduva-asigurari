import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Metadata } from "next";
import { Building2, Key, Search, Gem, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ContactForm } from "@/components/sections/contact-form";

export const metadata: Metadata = {
  title: "Real Estate | Cristian Văduva",
  description: "Luxury Real Estate, Buyer & Seller Representation, Off-market properties și Investment Advisory.",
};

export default function RealEstatePage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-16">
        {/* Hero Section */}
        <div className="container mx-auto px-4 text-center max-w-4xl mb-24">
          <span className="inline-block px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-400 font-heading text-sm font-bold tracking-widest uppercase mb-6 border border-emerald-500/20">
            Powered by AiXLuxury & Home Find
          </span>
          <h1 className="text-5xl md:text-7xl font-heading font-bold mb-8 leading-tight tracking-tight">
            Luxury Real Estate & <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">Investment Advisory.</span>
          </h1>
          <p className="text-xl font-light text-muted-foreground mb-10">
            Acces exclusiv la proprietăți off-market, reprezentare la cele mai înalte standarde și strategii de achiziție bazate pe randament.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="rounded-full bg-emerald-600 hover:bg-emerald-700 text-white px-8" asChild>
              <Link href="https://aixluxury.com" target="_blank">Explorează AiXLuxury</Link>
            </Button>
            <Button size="lg" variant="outline" className="rounded-full border-border bg-white hover:bg-muted text-foreground px-8" asChild>
              <Link href="https://homefind.cristianvaduva.com" target="_blank">Platforma Home Find</Link>
            </Button>
          </div>
        </div>

        {/* Services Grid */}
        <div className="container mx-auto px-4 max-w-6xl mb-32">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="glass premium-card p-10 rounded-[2rem] border border-border group">
              <Key className="w-12 h-12 text-emerald-600 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-bold font-heading mb-4 text-foreground">Buyer Representation</h3>
              <p className="text-muted-foreground leading-relaxed">
                Reprezentăm exclusiv interesele cumpărătorului. Analizăm piața, filtrăm zgomotul și negociem agresiv pentru a securiza proprietatea ideală la cel mai corect preț. Fără conflicte de interese.
              </p>
            </div>

            <div className="glass premium-card p-10 rounded-[2rem] border border-border group">
              <Building2 className="w-12 h-12 text-blue-600 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-bold font-heading mb-4 text-foreground">Seller Representation</h3>
              <p className="text-muted-foreground leading-relaxed">
                Marketing premium pentru proprietăți de lux. Prin rețeaua noastră privată și platformele AiXLuxury / Home Find, targetăm direct cumpărătorii calificați, reducând timpul petrecut pe piață.
              </p>
            </div>

            <div className="glass premium-card p-10 rounded-[2rem] border border-border group">
              <Search className="w-12 h-12 text-purple-600 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-bold font-heading mb-4 text-foreground">Off-Market Properties</h3>
              <p className="text-muted-foreground leading-relaxed">
                Cele mai valoroase proprietăți nu ajung niciodată pe site-urile publice. Oferim acces confidențial la tranzacții off-market, dedicat investitorilor discreți și fondurilor private.
              </p>
            </div>

            <div className="glass premium-card p-10 rounded-[2rem] border border-border group lg:col-span-1">
              <Gem className="w-12 h-12 text-amber-600 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-bold font-heading mb-4 text-foreground">Luxury Real Estate</h3>
              <p className="text-muted-foreground leading-relaxed">
                De la penthouse-uri exclusiviste la vile istorice. Filtrăm portofoliul pentru a garanta calitatea absolută a asset-ului, verificând atât aspectele juridice cât și potențialul arhitectural.
              </p>
            </div>

            <div className="glass premium-card p-10 rounded-[2rem] border border-border group lg:col-span-2">
              <ShieldCheck className="w-12 h-12 text-cyan-600 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-bold font-heading mb-4 text-foreground">Investment Advisory & Strategy</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Nu cumperi doar cărămizi, cumperi randament și siguranță. Oferim analiză detaliată ROI (Return on Investment), yield estimation și planificare de exit strategy. Ne asigurăm că orice achiziție își găsește locul perfect în ecosistemul tău financiar.
              </p>
              <Button variant="outline" className="rounded-full border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10" asChild>
                <Link href="/contact">Solicită un plan de investiții</Link>
              </Button>
            </div>
          </div>
        </div>

        <ContactForm customTitle="Cauți o proprietate specifică?" />
      </main>
      
      <Footer />
    </div>
  );
}
