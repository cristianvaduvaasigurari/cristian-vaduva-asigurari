import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Services } from "@/components/sections/services";
import { ContactForm } from "@/components/sections/contact-form";

export const metadata: Metadata = {
  title: "Servicii de Asigurare și Protecție Financiară",
  description: "Explorează serviciile de asigurare pentru persoane, familii, auto, călătorii și companii. Recomandări clare, orientate spre risc, timp economisit și costuri controlate.",
  alternates: {
    canonical: "/servicii",
  },
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 pt-32">
        <section className="container mx-auto px-4 md:px-6 mb-12 max-w-4xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-blue-600 mb-4">Servicii</p>
          <h1 className="text-4xl md:text-6xl font-heading font-bold tracking-tight mb-6">
            Asigurări alese după risc, nu după prețul cel mai mic.
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Fiecare pagină de serviciu explică problema rezolvată, pentru cine este potrivită, ce timp și bani economisești, ce riscuri dispar și când merită să ceri consultanță.
          </p>
        </section>
        <Services />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}
