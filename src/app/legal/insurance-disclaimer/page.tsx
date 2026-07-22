import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Metadata } from "next";
import Link from "next/link";
import { ShieldAlert, BookOpen, Scale } from "lucide-react";

export const metadata: Metadata = {
  title: "Limitare Răspundere Asigurări - Cristian Văduva",
  description: "Exonerarea de răspundere cu privire la ofertele de asigurări, cotațiile indicative și termenii partenerului autorizat Generali România.",
  alternates: {
    canonical: "https://cristianvaduva.com/legal/insurance-disclaimer",
  },
  openGraph: {
    title: "Limitare Răspundere Asigurări - Cristian Văduva",
    description: "Exonerarea de răspundere cu privire la ofertele de asigurări, cotațiile indicative și termenii partenerului autorizat Generali România.",
    url: "https://cristianvaduva.com/legal/insurance-disclaimer",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Limitare Răspundere Asigurări - Cristian Văduva",
    description: "Exonerarea de răspundere cu privire la ofertele de asigurări, cotațiile indicative și termenii partenerului autorizat Generali România.",
  },
};

export default function InsuranceDisclaimerPage() {
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
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Limitare Răspundere Asigurări</h1>
            <p className="text-muted-foreground">Informații importante referitoare la contractele de asigurare, cotații și termenii generali de subscriere.</p>
          </div>

          <div className="prose prose-invert max-w-none space-y-10 text-muted-foreground leading-relaxed">
            <section className="bg-white/5 border border-white/10 p-6 rounded-2xl">
              <div className="flex items-center gap-3 mb-4">
                <ShieldAlert className="text-blue-500 shrink-0" size={24} />
                <h2 className="text-xl font-bold text-white m-0">1. Relația cu Asigurătorii Licențiați</h2>
              </div>
              <p className="text-sm">
                Cristian Văduva activează în calitate de consultant, intermediar și partener de reprezentare pentru asigurătorul licențiat <strong>Generali România Asigurare Reasigurare S.A.</strong> Toate polițele de asigurare (RCA, CASCO, Viață, Sănătate, IMM, etc.) sunt emise în mod oficial și legal direct de către societatea de asigurare, sub incidența legilor românești și a reglementărilor Autorității de Supraveghere Financiară (ASF).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold font-heading text-white">2. Prevalența Condițiilor Contractuale</h2>
              <p className="mt-4">
                Orice prezentare generală a serviciilor, beneficiilor sau riscurilor acoperite pe cristianvaduva.com are un caracter pur rezumativ și simplificat. 
              </p>
              <div className="bg-amber-950/20 border border-amber-900/30 p-6 rounded-2xl mt-4">
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen className="text-amber-500" size={20} />
                  <h3 className="text-lg font-bold text-white m-0">Termenii Asigurătorului Prevalează</h3>
                </div>
                <p className="text-sm m-0">
                  Condițiile contractuale de asigurare, excluderile, limitele de despăgubire și clauzele specifice din documentația oficială primită la emiterea poliței (Condiții Generale și Speciale de Asigurare) sunt singurele care au forță juridică. În caz de discrepanțe între textele de pe acest website și documentele contractului de asigurare, termenii asigurătorului vor prevala întotdeauna.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold font-heading text-white">3. Caracterul Indicativ al Cotațiilor și Simulărilor</h2>
              <p className="mt-4">
                Calculatoarele de asigurări și simulatoarele de preț încorporate în platformă sunt unelte orientative dezvoltate pentru a oferi o aproximare rapidă a costurilor. 
                Oferta fermă și finală este generată numai după introducerea completă a datelor reale în sistemul de ofertare al asigurătorului, validarea CNP/CUI-ului și efectuarea analizei de risc de către departamentul de subscriere al companiei de asigurări. Cotațiile se pot modifica în funcție de istoricul de daune (sistemul Bonus-Malus), starea de sănătate a asiguratului sau evaluarea fizică a bunurilor.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold font-heading text-white">4. Underwriting (Procesul de Subscriere)</h2>
              <p className="mt-4">
                Aprobarea solicitărilor de asigurare depinde în mod direct de îndeplinirea criteriilor interne de subscriere (underwriting) ale Generali România. Cristian Văduva nu poate garanta emiterea automată a oricărei polițe sau acceptarea riscului, refuzul de subscriere rămânând la latitudinea asigurătorului, în conformitate cu normele tehnice de risc.
              </p>
            </section>

            <section className="bg-white/5 border border-white/10 p-6 rounded-2xl">
              <div className="flex items-center gap-3 mb-4">
                <Scale className="text-blue-500 shrink-0" size={24} />
                <h2 className="text-xl font-bold text-white m-0">5. Conformitate și Transparență</h2>
              </div>
              <p className="text-sm m-0">
                Toate activitățile de promovare și prezentare a polițelor de asigurare respectă cu strictețe normele de etică, legislația IDD (Directiva privind Distribuția în Asigurări) și regulile de protecție a consumatorilor. Pentru orice detalii suplimentare despre confidențialitatea datelor prelucrate în procesul de ofertare, te invităm să citești <Link href="/legal/privacy-policy" className="text-blue-400 hover:underline">Politica de Confidențialitate & GDPR Notice</Link>.
              </p>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
