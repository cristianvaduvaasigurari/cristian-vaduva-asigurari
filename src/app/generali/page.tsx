import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ContactForm } from "@/components/sections/contact-form";
import { Shield, Building } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Generali România | Cristian Văduva",
  description: "Parteneriat de excelență cu Generali România pentru protecția completă a persoanelor fizice și juridice.",
};

export default function GeneraliPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-24 text-center max-w-4xl mx-auto">
            <div className="inline-flex px-4 py-1.5 rounded-full glass text-red-500 font-medium mb-8 uppercase tracking-widest text-sm">
              Parteneriat Oficial
            </div>
            <h1 className="text-5xl md:text-7xl font-heading font-bold mb-8">
              Generali România
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Stabilitate, încredere și soluții beneficiu de asigurare. Peste 190 de ani de experiență globală, acum disponibili prin excelența serviciilor noastre.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24 max-w-5xl mx-auto">
            <div className="glass beneficiu-card p-10 rounded-[3rem]">
              <Shield className="w-12 h-12 text-red-500 mb-6" />
              <h3 className="text-2xl font-bold mb-4">Persoane Fizice</h3>
              <p className="text-muted-foreground mb-6">Protecție completă pentru viața ta, familia ta și bunurile de valoare. De la asigurări de viață și sănătate la locuințe de lux.</p>
            </div>
            <div className="glass beneficiu-card p-10 rounded-[3rem]">
              <Building className="w-12 h-12 text-red-500 mb-6" />
              <h3 className="text-2xl font-bold mb-4">Soluții Corporate</h3>
              <p className="text-muted-foreground mb-6">Management avansat al riscului pentru companii. Răspunderi, flote auto, proprietăți comerciale și pachete de beneficii pentru angajați.</p>
            </div>
          </div>

          <div className="max-w-4xl mx-auto text-center mb-24 p-12 glass rounded-[3rem] border border-red-500/10">
            <h2 className="text-3xl font-heading font-bold mb-6">Un Parteneriat Bazat pe Încredere</h2>
            <p className="text-lg text-muted-foreground">
              Suntem mândri să reprezentăm Generali în România, oferind clienților noștri acces la un portofoliu vast de produse financiare și de protecție, cu asistență VIP și soluționare prioritară a daunelor.
            </p>
          </div>
        </div>
        <ContactForm />
      </main>
      
      <Footer />
    </div>
  );
}
