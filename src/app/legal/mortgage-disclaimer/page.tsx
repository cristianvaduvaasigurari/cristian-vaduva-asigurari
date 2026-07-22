import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Metadata } from "next";
import Link from "next/link";
import { Landmark, AlertTriangle, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Limitare Răspundere Credite Ipotecare - Cristian Văduva",
  description: "Exonerarea de răspundere cu privire la simulările de credite ipotecare, rate, dobânzi și aprobarea dosarelor bancare.",
  alternates: {
    canonical: "https://cristianvaduva.com/legal/mortgage-disclaimer",
  },
  openGraph: {
    title: "Limitare Răspundere Credite Ipotecare - Cristian Văduva",
    description: "Exonerarea de răspundere cu privire la simulările de credite ipotecare, rate, dobânzi și aprobarea dosarelor bancare.",
    url: "https://cristianvaduva.com/legal/mortgage-disclaimer",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Limitare Răspundere Credite Ipotecare - Cristian Văduva",
    description: "Exonerarea de răspundere cu privire la simulările de credite ipotecare, rate, dobânzi și aprobarea dosarelor bancare.",
  },
};

export default function MortgageDisclaimerPage() {
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
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Limitare Răspundere Credite</h1>
            <p className="text-muted-foreground">Informații esențiale cu privire la asistența pentru finanțare, simulări de credite și aprobări bancare.</p>
          </div>

          <div className="prose prose-invert max-w-none space-y-10 text-muted-foreground leading-relaxed">
            <section className="bg-white/5 border border-white/10 p-6 rounded-2xl">
              <div className="flex items-center gap-3 mb-4">
                <Landmark className="text-blue-500 shrink-0" size={24} />
                <h2 className="text-xl font-bold text-white m-0">1. Rolul de Intermediar și Consultanță</h2>
              </div>
              <p className="text-sm">
                Cristian Văduva oferă servicii de consultanță și facilitare a legăturilor cu brokeri de credite autorizați și instituții bancare din România. Platforma cristianvaduva.com nu este o bancă, nu este o instituție financiară nebancară (IFN) și nu acordă credite directe, finanțări sau garanții de împrumut.
              </p>
            </section>

            <section className="bg-amber-950/20 border border-amber-900/30 p-6 rounded-2xl">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="text-amber-500 shrink-0" size={24} />
                <h2 className="text-xl font-bold text-white m-0">2. Criterii de Eligibilitate și Aprobare Bancară</h2>
              </div>
              <p className="text-sm m-0">
                Aprobarea oricărui tip de finanțare (credit ipotecar, credit pentru construcții, Noua Casă sau refinanțări) depinde exclusiv de analiza profilului tău financiar de către departamentele de risc ale băncilor finanțatoare. Utilizarea calculatoarelor noastre nu garantează eligibilitatea sau aprobarea dosarului. Decizia finală de creditare aparține în mod unic și suveran băncii alese.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold font-heading text-white">3. Dobânzi, Indici și Schimbări de Rate</h2>
              <p className="mt-4">
                Valorile dobânzilor (variabile sau fixe), comisioanelor și indicilor de referință (IRCC, ROBOR) utilizate în exemplele de calcul de pe site pot varia zilnic sau trimestrial. 
                Simulările oferite pe platformă sunt orientative și calculate pe baza datelor de piață curente. Ratele reale pot fi diferite în momentul semnării contractului de credit, influențate de modificările de politică monetară, fluctuațiile indicilor oficiali și costurile asigurărilor obligatorii atașate creditului.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold font-heading text-white">4. Calculatoarele și Estimările Financiare</h2>
              <p className="mt-4">
                Formulele matematice utilizate în instrumentele noastre de simulare sunt simplificate pentru a oferi o viziune de ansamblu asupra efortului financiar lunar. Acestea nu includ comisioanele de analiză dosar ale băncii, costurile evaluării imobilului, taxele notariale ale tranzacției sau costul polițelor de asigurare de viață/locuință obligatorii, costuri care pot influența considerabil DAE (Dobânda Anuală Efectivă).
              </p>
            </section>

            <section className="bg-white/5 border border-white/10 p-6 rounded-2xl">
              <div className="flex items-center gap-3 mb-4">
                <ShieldCheck className="text-blue-500 shrink-0" size={24} />
                <h2 className="text-xl font-bold text-white m-0">5. Relația cu Datele Tale Financiare</h2>
              </div>
              <p className="text-sm m-0">
                Colectarea datelor financiare prin chestionarele de pre-analiză se face în condiții de maximă securitate. Nicio informație nu este transmisă băncilor fără acceptul tău scris prealabil. Pentru detalii referitoare la drepturile tale asupra acestor date, consultă <Link href="/legal/privacy-policy" className="text-blue-400 hover:underline">Politica de Confidențialitate & GDPR Notice</Link>.
              </p>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
