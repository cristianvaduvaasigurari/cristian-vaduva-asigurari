import * as React from "react";
import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { VerificareRiscuriClient } from "./client";

export const metadata: Metadata = {
  title: "Verificare Riscuri & Audit Asigurări | Cristian Văduva",
  description:
    "Platformă integrată de verificare a riscurilor pentru Casă, Mașină, Familie și Firmă. Calculatoare transparente, date oficiale și consultanță directă.",
  keywords: [
    "verificare riscuri",
    "audit asigurari",
    "risc seismic bucuresti",
    "calculator casco",
    "necesar asigurare viata",
    "audit riscuri imm",
    "cmr vs cargo",
    "nis2 romania",
  ],
  alternates: {
    canonical: "https://insurance.cristianvaduva.com/verificare-riscuri",
  },
  openGraph: {
    title: "Verificare Riscuri — Casă, Mașină, Familie, Firmă | Cristian Văduva",
    description:
      "Descoperă expunerea ta reală la risc prin instrumente matematice independente și date verificate oficial.",
    url: "https://insurance.cristianvaduva.com/verificare-riscuri",
    type: "website",
  },
};

export default function VerificareRiscuriPage() {
  return (
    <div className="min-h-screen bg-white text-zinc-900 flex flex-col selection:bg-blue-600 selection:text-white">
      <Navbar />
      <main className="flex-1 pt-32 pb-24 bg-gradient-to-b from-zinc-50 via-white to-white">
        <VerificareRiscuriClient />
      </main>
      <Footer />
    </div>
  );
}
