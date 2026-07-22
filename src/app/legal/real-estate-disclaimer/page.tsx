import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Metadata } from "next";
import Link from "next/link";
import { Home, AlertTriangle, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Limitare Răspundere Imobiliare - Cristian Văduva",
  description: "Exonerarea de răspundere cu privire la listările imobiliare, serviciul Home Find și condițiile de reprezentare a clienților.",
  alternates: {
    canonical: "https://cristianvaduva.com/legal/real-estate-disclaimer",
  },
  openGraph: {
    title: "Limitare Răspundere Imobiliare - Cristian Văduva",
    description: "Exonerarea de răspundere cu privire la listările imobiliare, serviciul Home Find și condițiile de reprezentare a clienților.",
    url: "https://cristianvaduva.com/legal/real-estate-disclaimer",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Limitare Răspundere Imobiliare - Cristian Văduva",
    description: "Exonerarea de răspundere cu privire la listările imobiliare, serviciul Home Find și condițiile de reprezentare a clienților.",
  },
};

export default function RealEstateDisclaimerPage() {
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
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Limitare Răspundere Imobiliare</h1>
            <p className="text-muted-foreground">Informații privind proprietățile prezentate, tranzacțiile de reprezentare și serviciile de asistență imobiliară.</p>
          </div>

          <div className="prose prose-invert max-w-none space-y-10 text-muted-foreground leading-relaxed">
            <section className="bg-white/5 border border-white/10 p-6 rounded-2xl">
              <div className="flex items-center gap-3 mb-4">
                <Home className="text-blue-500 shrink-0" size={24} />
                <h2 className="text-xl font-bold text-white m-0">1. Disponibilitatea și Corectitudinea Datelor</h2>
              </div>
              <p className="text-sm">
                Informațiile prezentate pe cristianvaduva.com referitoare la proprietățile imobiliare (prețuri, localizare generală, randamente estimate, suprafețe, compartimentare sau finisaje) au caracter strict orientativ. 
                Deși depunem eforturi constante pentru a menține datele actualizate, disponibilitatea proprietăților pe piață nu este garantată, iar prețurile pot suferi modificări fără o notificare prealabilă, în conformitate cu dinamica pieței sau instrucțiunile proprietarilor/dezvoltatorilor.
              </p>
            </section>

            <section className="bg-amber-950/20 border border-amber-900/30 p-6 rounded-2xl">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="text-amber-500 shrink-0" size={24} />
                <h2 className="text-xl font-bold text-white m-0">2. Relația de Reprezentare Imobiliară</h2>
              </div>
              <p className="text-sm m-0">
                Simpla navigare pe site, completarea formularelor de contact, solicitarea de detalii suplimentare sau utilizarea serviciului <strong>Home Find</strong> și a algoritmilor <strong>AiX OS</strong> nu creează automat o relație de mandat, agenție sau reprezentare exclusivă imobiliară. 
                Relația oficială de reprezentare (fie pentru cumpărător, fie pentru vânzător) începe exclusiv din momentul semnării fizice sau digitale a unui Contract de Prestări Servicii (Reprezentare Imobiliară) agreat de ambele părți.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold font-heading text-white">3. Caracterul Informativ al Serviciului Home Find</h2>
              <p className="mt-4">
                Recomandările transmise prin serviciul de căutare imobiliară personalizată <strong>Home Find</strong> sunt bazate pe criterii algoritmice și baze de date partenere. Ele sunt oferite ca punct de plecare pentru cercetarea de piață a clientului și nu pot fi considerate promisiuni bilaterale de vânzare sau evaluări tehnice imobiliare obligatorii. Toate detaliile tehnice ale unei clădiri sau ale unui apartament trebuie verificate prin documentele oficiale (extras de carte funciară, releveu, certificat energetic) înainte de orice plată sau avans.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold font-heading text-white">4. Verificarea Documentelor și Due Diligence</h2>
              <p className="mt-4">
                Încurajăm toți clienții să realizeze propria analiză de conformitate (due diligence) cu ajutorul unui jurist sau notar public înainte de semnarea promisiunilor sau contractelor de vânzare-cumpărare. Cristian Văduva nu răspunde pentru viciile ascunse ale construcțiilor promovate de dezvoltatori sau proprietari terți pe platformă.
              </p>
            </section>

            <section className="bg-white/5 border border-white/10 p-6 rounded-2xl">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle className="text-blue-500 shrink-0" size={24} />
                <h2 className="text-xl font-bold text-white m-0">5. Securitatea și Legăturile Legale</h2>
              </div>
              <p className="text-sm m-0">
                Toate datele solicitate în cadrul căutărilor imobiliare sunt stocate și procesate în siguranță. Pentru detalii referitoare la drepturile tale de acces și ștergere a preferințelor imobiliare stocate, vizitează <Link href="/legal/privacy-policy" className="text-blue-400 hover:underline">Politica de Confidențialitate & GDPR Notice</Link>.
              </p>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
