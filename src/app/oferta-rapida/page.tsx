import * as React from "react";
import type { Metadata } from "next";
import { ExpressOffer } from "@/components/sections/express-offer";

export const metadata: Metadata = {
  title: "Ofertă Rapidă în 30s | Cristian Văduva",
  description: "Cere o ofertă premium de asigurare în mai puțin de 30 de secunde.",
};

export default function ExpressOfferPage() {
  return (
    <main className="min-h-screen bg-[#fafafa] flex items-center justify-center pt-24 pb-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4 text-foreground tracking-tight">
            Timpul tău e prețios.
          </h1>
          <p className="text-xl text-muted-foreground">
            Sari peste formularele interminabile. Spune-ne ce vrei să asiguri și te sunăm noi cu soluția gata pregătită. Maxim 30 de secunde.
          </p>
        </div>

        <ExpressOffer />
      </div>
    </main>
  );
}
