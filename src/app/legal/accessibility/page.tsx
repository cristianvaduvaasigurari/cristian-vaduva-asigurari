import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Metadata } from "next";
import Link from "next/link";
import { Heart, Info } from "lucide-react";

export const metadata: Metadata = {
  title: "Declarație de Accesibilitate - Cristian Văduva",
  description: "Declarație de accesibilitate web pentru platforma Cristian Văduva. Angajamentul nostru de a respecta standardele WCAG.",
  alternates: {
    canonical: "https://cristianvaduva.com/legal/accessibility",
  },
  openGraph: {
    title: "Declarație de Accesibilitate - Cristian Văduva",
    description: "Declarație de accesibilitate web pentru platforma Cristian Văduva. Angajamentul nostru de a respecta standardele WCAG.",
    url: "https://cristianvaduva.com/legal/accessibility",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Declarație de Accesibilitate - Cristian Văduva",
    description: "Declarație de accesibilitate web pentru platforma Cristian Văduva. Angajamentul nostru de a respecta standardele WCAG.",
  },
};

export default function AccessibilityPage() {
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
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Declarație de Accesibilitate</h1>
            <p className="text-muted-foreground">Angajamentul nostru de a asigura accesibilitatea digitală a platformei cristianvaduva.com pentru toți utilizatorii.</p>
          </div>

          <div className="prose prose-invert max-w-none space-y-10 text-muted-foreground leading-relaxed">
            <section className="bg-white/5 border border-white/10 p-6 rounded-2xl">
              <div className="flex items-center gap-3 mb-4">
                <Heart className="text-blue-500 shrink-0" size={24} />
                <h2 className="text-xl font-bold text-white m-0">Respect și Incluziune</h2>
              </div>
              <p className="text-sm">
                Credem că internetul ar trebui să fie disponibil și accesibil pentru oricine. Ne angajăm să oferim un site web care să respecte nevoile persoanelor cu dizabilități, indiferent de circumstanțe și de abilități, asigurându-ne că platforma cristianvaduva.com este o resursă utilă pentru educație financiară, asigurări și imobiliare.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold font-heading text-white">1. Standardul de Referință (WCAG)</h2>
              <p className="mt-4">
                Pentru a asigura un nivel premium de accesibilitate, platforma noastră aplică ghidurile stabilite de consorțiul international W3C: <strong>Web Content Accessibility Guidelines 2.1 (WCAG 2.1)</strong> la nivelul AA. 
                Aceste ghiduri explică modul de optimizare a conținutului web pentru a fi mai prietenos cu utilizatorii care suferă de deficiențe de vedere, auz, mobilitate sau cognitive.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold font-heading text-white">2. Măsuri Tehnice Implementate</h2>
              <p className="mt-4">
                Platforma cristianvaduva.com include o serie de facilități tehnice destinate îmbunătățirii accesibilității, cum ar fi:
              </p>
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li><strong>Compatibilitate cu cititoarele de ecran:</strong> Utilizarea etichetelor semantice HTML5 și atributelor ARIA pentru elementele interactive;</li>
                <li><strong>Contrast premium:</strong> Asigurarea unui raport optim de contrast de culoare între text și fundal;</li>
                <li><strong>Navigare prin tastatură:</strong> Permiterea navigării complete prin intermediul tastei TAB și menținerea unui contur focusabil clar;</li>
                <li><strong>Scalabilitate fonturi:</strong> Suport nativ pentru zoom-ul din browser fără distorsionarea layout-ului;</li>
                <li><strong>Design receptiv:</strong> Structură fluidă adaptată perfect pentru telefoane mobile, tablete și desktop-uri.</li>
              </ul>
            </section>

            <section className="bg-white/5 border border-white/10 p-6 rounded-2xl">
              <div className="flex items-center gap-3 mb-4">
                <Info className="text-blue-500 shrink-0" size={24} />
                <h2 className="text-xl font-bold text-white m-0">3. Îmbunătățire Continuă</h2>
              </div>
              <p className="text-sm m-0">
                În ciuda tuturor eforturilor noastre de a securiza o accesibilitate perfectă pe toate paginile și în asistenții virtuali, pot exista în continuare pagini, widget-uri sau fișiere descărcabile (cum ar fi anumite ghiduri PDF istorice) care nu sunt complet optimizate. Ne revizuim periodic tehnologia și lucrăm continuu la remedierea acestor detalii.
              </p>
            </section>

            <section className="border-t border-white/10 pt-10 text-center">
              <h2 className="text-xl font-bold font-heading text-white mb-4">Ai întâmpinat o problemă de accesibilitate?</h2>
              <p className="text-sm max-w-2xl mx-auto mb-6">
                Părerea ta contează pentru noi. Dacă ai întâmpinat dificultăți în utilizarea platformei, te rugăm să ne trimiți un e-mail la <a href="mailto:contact@cristianvaduva.com" className="text-blue-400 hover:underline">contact@cristianvaduva.com</a> cu detalii despre problemă și dispozitivul folosit.
              </p>
              <Link 
                href="/legal/contact" 
                className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-full font-semibold transition-colors text-sm"
              >
                <span>Accesează Contact Legal</span>
              </Link>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
