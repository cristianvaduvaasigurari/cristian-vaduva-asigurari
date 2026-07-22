import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Metadata } from "next";
import Link from "next/link";
import { Lock, ShieldCheck, Key, Server, RefreshCw } from "lucide-react";

export const metadata: Metadata = {
  title: "Securitatea Platformei - Cristian Văduva",
  description: "Cum îți protejăm datele pe platforma Cristian Văduva. Detalii despre criptare, certificate SSL, securitatea găzduirii și backup-uri.",
  alternates: {
    canonical: "https://cristianvaduva.com/legal/security",
  },
  openGraph: {
    title: "Securitatea Platformei - Cristian Văduva",
    description: "Cum îți protejăm datele pe platforma Cristian Văduva. Detalii despre criptare, certificate SSL, securitatea găzduirii și backup-uri.",
    url: "https://cristianvaduva.com/legal/security",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Securitatea Platformei - Cristian Văduva",
    description: "Cum îți protejăm datele pe platforma Cristian Văduva. Detalii despre criptare, certificate SSL, securitatea găzduirii și backup-uri.",
  },
};

export default function SecurityPage() {
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
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Securitatea Platformei</h1>
            <p className="text-muted-foreground">Standardele tehnice și măsurile organizatorice luate pentru a securiza datele tale pe cristianvaduva.com.</p>
          </div>

          <div className="prose prose-invert max-w-none space-y-10 text-muted-foreground leading-relaxed">
            <section className="bg-white/5 border border-white/10 p-6 rounded-2xl">
              <div className="flex items-center gap-3 mb-4">
                <ShieldCheck className="text-blue-500 shrink-0" size={24} />
                <h2 className="text-xl font-bold text-white m-0">Protecție de Nivel Enterprise</h2>
              </div>
              <p className="text-sm">
                Platforma Cristian Văduva a fost proiectată având securitatea ca prioritate fundamentală. Deoarece prelucrăm solicitări de asigurări, dosare de finanțare și bugete imobiliare, asigurăm mecanisme robuste pentru a preveni accesul neautorizat, scurgerile de informații și atacurile cibernetice.
              </p>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-white/10 p-5 rounded-xl bg-white/5">
                <div className="flex items-center gap-2 mb-3">
                  <Lock className="text-blue-400" size={20} />
                  <h3 className="text-base font-bold text-white m-0">1. Criptare Tranzit & Stocare</h3>
                </div>
                <p className="text-xs">
                  Toate conexiunile dintre browserul tău și serverele noastre sunt securizate prin protocoale HTTPS securizate cu certificate SSL/TLS pe 256 de biți. Datele sensibile sunt stocate criptat în bazele noastre de date partenere folosind algoritmi standard recunoscuți.
                </p>
              </div>

              <div className="border border-white/10 p-5 rounded-xl bg-white/5">
                <div className="flex items-center gap-2 mb-3">
                  <Key className="text-blue-400" size={20} />
                  <h3 className="text-base font-bold text-white m-0">2. Controlul Accesului</h3>
                </div>
                <p className="text-xs">
                  Accesul la datele tale cu caracter personal este strict restricționat și acordat exclusiv pe baza principiului dreptului minim necesar. Toți angajații sau partenerii autorizați care prelucrează dosare folosesc autentificare în doi pași (MFA) și au semnat clauze stricte de confidențialitate.
                </p>
              </div>

              <div className="border border-white/10 p-5 rounded-xl bg-white/5">
                <div className="flex items-center gap-2 mb-3">
                  <Server className="text-blue-400" size={20} />
                  <h3 className="text-base font-bold text-white m-0">3. Securitatea Găzduirii</h3>
                </div>
                <p className="text-xs">
                  Platforma este găzduită în centre de date securizate fizic și cibernetic din Uniunea Europeană (Supabase, Vercel). Infrastructura include sisteme de prevenire și detecție a intruziunilor (IDS/IPS), monitorizare în timp real 24/7 și protecție împotriva atacurilor DDoS.
                </p>
              </div>

              <div className="border border-white/10 p-5 rounded-xl bg-white/5">
                <div className="flex items-center gap-2 mb-3">
                  <RefreshCw className="text-blue-400" size={20} />
                  <h3 className="text-base font-bold text-white m-0">4. Backup-uri și Recuperare</h3>
                </div>
                <p className="text-xs">
                  Realizăm copii de siguranță automate periodice ale tuturor bazelor de date pentru a preveni pierderile accidentale de informații în cazul unor defecțiuni tehnice. Aceste backup-uri sunt stocate criptat în locații fizice diferite și izolate de rețeaua principală.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold font-heading text-white">Raportarea Vulnerabilităților</h2>
              <p className="mt-4">
                Dacă ești cercetător în securitate și ai descoperit o potențială vulnerabilitate pe platforma noastră, te rugăm să o raportezi în mod responsabil trimițându-ne un e-mail direct la <a href="mailto:contact@cristianvaduva.com" className="text-blue-400 hover:underline">contact@cristianvaduva.com</a>. Ne angajăm să analizăm și să rezolvăm orice breșă semnalată în cel mai scurt timp posibil.
              </p>
              <p className="mt-2">
                Pentru informații detaliate despre cum gestionăm confidențialitatea datelor conform legii, citește <Link href="/legal/privacy-policy" className="text-blue-400 hover:underline">Politica de Confidențialitate & GDPR Notice</Link>.
              </p>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
