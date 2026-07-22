import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Metadata } from "next";
import Link from "next/link";
import { AlertTriangle, CheckCircle, Scale } from "lucide-react";

export const metadata: Metadata = {
  title: "Exonerare de Răspundere AI (AiX OS) - Cristian Văduva",
  description: "Limitarea răspunderii legale pentru asistenții AI, estimări automate, calculatoare financiare și simulatoare încorporate în platforma cristianvaduva.com.",
  alternates: {
    canonical: "https://cristianvaduva.com/legal/ai-disclaimer",
  },
  openGraph: {
    title: "Exonerare de Răspundere AI (AiX OS) - Cristian Văduva",
    description: "Limitarea răspunderii legale pentru asistenții AI, estimări automate, calculatoare financiare și simulatoare încorporate în platforma cristianvaduva.com.",
    url: "https://cristianvaduva.com/legal/ai-disclaimer",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Exonerare de Răspundere AI (AiX OS) - Cristian Văduva",
    description: "Limitarea răspunderii legale pentru asistenții AI, estimări automate, calculatoare financiare și simulatoare încorporate în platforma cristianvaduva.com.",
  },
};

export default function AiDisclaimerPage() {
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
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Limitare Răspundere AI & AiX OS</h1>
            <p className="text-muted-foreground">Clarificări privind utilizarea sistemelor autonome de calcul, asistenților AI și instrumentelor de simulare.</p>
          </div>

          <div className="prose prose-invert max-w-none space-y-10 text-muted-foreground leading-relaxed">
            <section className="bg-amber-950/20 border border-amber-900/30 p-6 rounded-2xl">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="text-amber-500 shrink-0" size={24} />
                <h2 className="text-xl font-bold text-white m-0">Informații cu caracter Strict Informativ</h2>
              </div>
              <p className="text-sm m-0">
                Interacțiunile tale cu <strong>AiX OS</strong>, <strong>Asistentul Virtual AI</strong> (AiChatbot), simulatoarele de risc (Risk Simulator), simulatoarele de viață (Life Simulator) și toate calculatoarele din platformă au un caracter pur informativ și orientativ. Ele nu reprezintă și nu pot înlocui consultanța profesională specifică.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold font-heading text-white">1. Fără Consultanță Legală, Financiară sau de Investiții</h2>
              <p className="mt-4">
                Platforma Cristian Văduva utilizează algoritmi avansați și modele lingvistice mari pentru a structura date și a răspunde la întrebări. Totuși:
              </p>
              <ul className="list-none space-y-3 pl-0 mt-4">
                <li className="flex items-start gap-2">
                  <CheckCircle size={18} className="text-blue-500 shrink-0 mt-1" />
                  <span><strong>Fără sfaturi de investiții:</strong> Analizele automate privind imobiliarele, estimările de randamente și cotațiile de prețuri nu constituie oferte de vânzare, brokeraj de valori mobiliare sau sfaturi de investiții financiare.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={18} className="text-blue-500 shrink-0 mt-1" />
                  <span><strong>Fără consultanță legală:</strong> Răspunsurile referitoare la clauze de contracte, drepturi GDPR sau proceduri de asigurare sunt pur simplificate și nu țin locul unei opinii juridice avizate.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={18} className="text-blue-500 shrink-0 mt-1" />
                  <span><strong>Fără consultanță fiscală:</strong> Simulările creditelor ipotecare sau economiilor nu iau în calcul toate normele fiscale dinamice din România sau alte țări.</span>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold font-heading text-white">2. Recomandarea de Verificare Umană</h2>
              <p className="mt-4">
                Inteligența Artificială poate genera uneori date inexacte, învechite sau incomplete (fenomen cunoscut sub denumirea de halucinație AI). 
                Recomandăm insistent ca nicio tranzacție financiară, semnare de polițe sau achiziție imobiliară să nu fie efectuată bazându-se exclusiv pe recomandările generate de sistemele noastre AI sau de calculatoarele automate. 
                Pentru a obține o validare fermă, solicită întotdeauna o programare sau o analiză realizată direct de Cristian Văduva sau de experții autorizați din cadrul platformei.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold font-heading text-white">3. Protecția Datelor în conversația AI</h2>
              <p className="mt-4">
                Atunci când discuți cu Asistentul AI de pe cristianvaduva.com, te rugăm să eviți transmiterea de date sensibile, cum ar fi: parole, detalii complete ale cardurilor bancare, coduri numerice personale (CNP) sau informații medicale detaliate. 
                Deși mesajele sunt procesate prin canale securizate și criptate, transmiterea lor prin formularele publice de chat reprezintă un risc suplimentar.
              </p>
              <p className="mt-2">
                Pentru detalii suplimentare despre modul în care stocăm sesiunile de chat și interogările, accesează <Link href="/legal/privacy-policy" className="text-blue-400 hover:underline">Politica de Confidențialitate & GDPR Notice</Link>.
              </p>
            </section>

            <section className="bg-white/5 border border-white/10 p-6 rounded-2xl">
              <div className="flex items-center gap-3 mb-4">
                <Scale className="text-blue-500 shrink-0" size={24} />
                <h2 className="text-xl font-bold text-white m-0">4. Limitarea Răspunderii Tehnice</h2>
              </div>
              <p className="text-sm m-0">
                În măsura maximă permisă de lege, Cristian Văduva este exonerat de orice răspundere legată de eventualele daune, directe sau indirecte, pierderi financiare, pierderi de oportunități sau prejudicii ce pot surveni în urma încrederii acordate răspunsurilor oferite de asistenții noștri bazați pe inteligență artificială.
              </p>
            </section>

            <section className="border-t border-white/10 pt-10 text-center">
              <h2 className="text-xl font-bold font-heading text-white mb-4">Dorești o opinie profesională validată de un expert?</h2>
              <Link 
                href="/contact" 
                className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-full font-semibold transition-colors text-sm"
              >
                <span>Solicită Consultanță Personalizată</span>
              </Link>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
