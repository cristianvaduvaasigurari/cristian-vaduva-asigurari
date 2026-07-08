import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ContactForm } from "@/components/sections/contact-form";
import { Globe, Diamond, Plane, Briefcase } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "AiXLuxury | Premium Lifestyle & Investments",
  description: "Selecție exclusivistă de proprietăți de lux și oportunități investiționale high-end.",
};

export default function AiXLuxuryPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-24 text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-heading font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-orange-500">
              AiXLuxury
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-10">
              Pentru cei care cer doar ce este mai bun. Oportunități imobiliare de lux, lifestyle premium și investiții cu randamente exclusive la nivel internațional.
            </p>
            <Button size="lg" variant="outline" className="rounded-full" asChild>
              <Link href="https://aixluxury.com" target="_blank">
                Vizitează AiXLuxury.com
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24 max-w-6xl mx-auto">
            {[
              { icon: Diamond, title: "Luxury Real Estate", desc: "Vile, penthouse-uri și reședințe exclusiviste în cele mai râvnite locații." },
              { icon: Briefcase, title: "Investments", desc: "Acces la active high-yield rezervate doar pentru investitori acreditați." },
              { icon: Globe, title: "International Opportunities", desc: "Portofoliu global: de la Dubai la Miami și Monaco." },
              { icon: Plane, title: "Premium Lifestyle", desc: "Servicii de concierge, aviație privată și wealth management." }
            ].map((item, i) => (
              <div key={i} className="glass p-10 rounded-[3rem] border border-amber-500/20">
                <item.icon className="w-10 h-10 text-amber-500 mb-6" />
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <ContactForm />
      </main>
      
      <Footer />
    </div>
  );
}
