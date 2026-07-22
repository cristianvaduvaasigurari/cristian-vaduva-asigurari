import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Metadata } from "next";
import Link from "next/link";
import { Mail, Phone, MessageSquare, MapPin, Shield } from "lucide-react";
import { CONTACT } from "@/config/contact";

export const metadata: Metadata = {
  title: "Contact Legal & GDPR - Cristian Văduva",
  description: "Datele oficiale de contact ale platformei Cristian Văduva pentru solicitări juridice, drepturi GDPR, conformitate și protecția datelor.",
  alternates: {
    canonical: "https://cristianvaduva.com/legal/contact",
  },
  openGraph: {
    title: "Contact Legal & GDPR - Cristian Văduva",
    description: "Datele oficiale de contact ale platformei Cristian Văduva pentru solicitări juridice, drepturi GDPR, conformitate și protecția datelor.",
    url: "https://cristianvaduva.com/legal/contact",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Legal & GDPR - Cristian Văduva",
    description: "Datele oficiale de contact ale platformei Cristian Văduva pentru solicitări juridice, drepturi GDPR, conformitate și protecția datelor.",
  },
};

export default function LegalContactPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-24 relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute inset-0 z-0 bg-background pointer-events-none" aria-hidden="true">
          <div className="absolute top-[10%] left-[-10%] w-[50%] h-[50%] bg-blue-500/10 rounded-full blur-[140px] mix-blend-screen"></div>
          <div className="absolute bottom-[10%] right-[-10%] w-[50%] h-[50%] bg-purple-500/10 rounded-full blur-[140px] mix-blend-screen"></div>
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-4xl">
          <div className="mb-12 border-b border-white/10 pb-8">
            <Link href="/legal" className="text-sm font-semibold text-blue-500 hover:text-blue-400 transition-colors flex items-center gap-2 mb-6">
              <span>← Înapoi la Centrul Legal</span>
            </Link>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Contact Legal</h1>
            <p className="text-muted-foreground">Pentru solicitări de conformitate GDPR, drepturi de autor, sesizări juridice și întrebări administrative.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white/5 border border-white/10 p-8 rounded-2xl flex flex-col justify-between">
              <div>
                <div className="h-12 w-12 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center mb-6">
                  <Mail size={24} />
                </div>
                <h3 className="text-xl font-bold font-heading text-white mb-2">E-mail Oficial</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Adresa de contact directă pentru transmiterea solicitărilor formale GDPR sau întrebărilor de reglementare legală.
                </p>
              </div>
              <a 
                href={CONTACT.email.href} 
                className="text-lg font-bold text-white hover:text-blue-400 transition-colors"
              >
                {CONTACT.email.display}
              </a>
            </div>

            <div className="bg-white/5 border border-white/10 p-8 rounded-2xl flex flex-col justify-between">
              <div>
                <div className="h-12 w-12 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center mb-6">
                  <Phone size={24} />
                </div>
                <h3 className="text-xl font-bold font-heading text-white mb-2">Telefon Asistență</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Telefon de asistență pentru clienți premium, disponibil de luni până vineri între orele 09:00 și 18:00.
                </p>
              </div>
              <a 
                href={CONTACT.phone.href} 
                className="text-lg font-bold text-white hover:text-blue-400 transition-colors"
              >
                {CONTACT.phone.display}
              </a>
            </div>

            <div className="bg-white/5 border border-white/10 p-8 rounded-2xl flex flex-col justify-between">
              <div>
                <div className="h-12 w-12 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center mb-6">
                  <MessageSquare size={24} />
                </div>
                <h3 className="text-xl font-bold font-heading text-white mb-2">WhatsApp Business</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Canal de suport rapid și mesagerie criptată securizat pentru asistență imobiliară și credite.
                </p>
              </div>
              <a 
                href={CONTACT.whatsapp.href} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-lg font-bold text-white hover:text-blue-400 transition-colors"
              >
                {CONTACT.whatsapp.display}
              </a>
            </div>

            <div className="bg-white/5 border border-white/10 p-8 rounded-2xl flex flex-col justify-between">
              <div>
                <div className="h-12 w-12 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center mb-6">
                  <MapPin size={24} />
                </div>
                <h3 className="text-xl font-bold font-heading text-white mb-2">Sediu Profesional</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Locația fizică oficială pentru întâlniri contractuale stabilite în prealabil și comunicări oficiale.
                </p>
              </div>
              <span className="text-sm font-bold text-white">
                Clădirea Globalworth, Et. 15, București, România
              </span>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 p-8 rounded-2xl">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="text-blue-500 shrink-0" size={24} />
              <h2 className="text-xl font-bold text-white m-0">Drepturile Tale GDPR Direct Accesibile</h2>
            </div>
            <p className="text-sm text-muted-foreground mb-6">
              Dacă dorești să transmiți o solicitare oficială pentru a beneficia de dreptul de acces, rectificare, ștergere (uitare) sau restricționare a prelucrării datelor tale, te rugăm să vizitezi secțiunea noastră specială de asistență pentru drepturile de persoană vizată.
            </p>
            <Link 
              href="/legal/data-subject-request" 
              className="inline-flex items-center gap-2 bg-white text-black hover:bg-white/90 px-6 py-3 rounded-full font-semibold transition-colors text-sm"
            >
              <span>Mergi la Solicitări GDPR</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
