import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Metadata } from "next";
import Link from "next/link";
import { AlertOctagon, Scale } from "lucide-react";

export const metadata: Metadata = {
  title: "Limitare Răspundere Investiții - Cristian Văduva",
  description: "Exonerarea de răspundere privind investițiile imobiliare, estimările financiare și avertismentul de risc obligatoriu.",
  alternates: {
    canonical: "https://cristianvaduva.com/legal/investment-disclaimer",
  },
  openGraph: {
    title: "Limitare Răspundere Investiții - Cristian Văduva",
    description: "Exonerarea de răspundere privind investițiile imobiliare, estimările financiare și avertismentul de risc obligatoriu.",
    url: "https://cristianvaduva.com/legal/investment-disclaimer",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Limitare Răspundere Investiții - Cristian Văduva",
    description: "Exonerarea de răspundere privind investițiile imobiliare, estimările financiare și avertismentul de risc obligatoriu.",
  },
};

export default function InvestmentDisclaimerPage() {
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
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Limitare Răspundere Investiții</h1>
            <p className="text-muted-foreground">Informații critice privind riscurile financiare și imobiliare asociate oportunităților prezentate.</p>
          </div>

          <div className="prose prose-invert max-w-none space-y-10 text-muted-foreground leading-relaxed">
            <section className="bg-red-950/20 border border-red-900/30 p-6 rounded-2xl">
              <div className="flex items-center gap-3 mb-4">
                <AlertOctagon className="text-red-500 shrink-0" size={24} />
                <h2 className="text-xl font-bold text-white m-0">Avertisment privind Riscul de Capital</h2>
              </div>
              <p className="text-sm m-0">
                Toate formele de investiții (imobiliare, fonduri administrate, active premium sau afaceri) implică riscuri majore, inclusiv riscul pierderii parțiale sau integrale a capitalului investit. Nu investi bani pe care nu îți permiți să îi pierzi.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold font-heading text-white">1. Performanțele Anterioare Nu Garantează Rezultatele Viitoare</h2>
              <p className="mt-4">
                Orice randamente istorice, rate de profit, evoluții de portofoliu sau studii de caz menționate pe platforma cristianvaduva.com reprezintă date din trecut. Performanțele din trecut ale pieței imobiliare, fondurilor de investiții sau randamentelor obținute de alți clienți nu sunt și nu pot fi considerate o garanție pentru obținerea acelorași rezultate în viitor.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold font-heading text-white">2. Caracterul Pur Educativ al Oportunităților</h2>
              <p className="mt-4">
                Prezentarea oportunităților de investiții off-market (prin intermediul AiX OS sau Home Find), ghidurilor premium și resurselor educaționale au scop exclusiv educativ și informativ. 
                Niciun text de pe acest site nu reprezintă consultanță financiară individualizată, consultanță fiscală, recomandări specifice de tranzacționare sau oferte ferme din partea lui Cristian Văduva. Utilizatorii trebuie să facă propriile analize independente (due diligence) și să apeleze la consultanți financiari autorizați înainte de a lua decizii financiare majore.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold font-heading text-white">3. Riscurile Pieței Imobiliare</h2>
              <p className="mt-4">
                Investițiile imobiliare sunt afectate de riscuri specifice pieței locale și globale, printre care:
              </p>
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li>Fluctuațiile prețurilor de vânzare sau chirie;</li>
                <li>Lichiditatea scăzută (timpul necesar vânzării unui activ imobiliar poate fi ridicat);</li>
                <li>Modificările legislative sau ale regimului fiscal (impozitul pe dividende, chirii, modificări TVA imobiliar);</li>
                <li>Riscuri fizice ale construcțiilor sau degradării zonei urbane.</li>
              </ul>
            </section>

            <section className="bg-white/5 border border-white/10 p-6 rounded-2xl">
              <div className="flex items-center gap-3 mb-4">
                <Scale className="text-blue-500 shrink-0" size={24} />
                <h2 className="text-xl font-bold text-white m-0">4. Conformitate Legală</h2>
              </div>
              <p className="text-sm m-0">
                Toate activitățile de pe site respectă condițiile stabilite în <Link href="/legal/terms-of-use" className="text-blue-400 hover:underline">Termenii de Utilizare</Link>. Cristian Văduva nu oferă servicii reglementate de brokeraj bursier (ASF) sau management de fonduri financiare direct, ci acționează strict ca intermediar și consultant pentru parteneri imobiliari și asigurători licențiați.
              </p>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
