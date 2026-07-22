import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Metadata } from "next";
import Link from "next/link";
import { Scale, AlertCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Termeni de Utilizare - Cristian Văduva",
  description: "Termenii și condițiile oficiale de utilizare a platformei Cristian Văduva. Citește clauzele de exonerare de răspundere pentru asigurări, imobiliare, credite și inteligență artificială.",
  alternates: {
    canonical: "https://cristianvaduva.com/legal/terms-of-use",
  },
  openGraph: {
    title: "Termeni de Utilizare - Cristian Văduva",
    description: "Termenii și condițiile oficiale de utilizare a platformei Cristian Văduva. Citește clauzele de exonerare de răspundere pentru asigurări, imobiliare, credite și inteligență artificială.",
    url: "https://cristianvaduva.com/legal/terms-of-use",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Termeni de Utilizare - Cristian Văduva",
    description: "Termenii și condițiile oficiale de utilizare a platformei Cristian Văduva. Citește clauzele de exonerare de răspundere pentru asigurări, imobiliare, credite și inteligență artificială.",
  },
};

export default function TermsOfUsePage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-24 relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute inset-0 z-0 bg-background pointer-events-none" aria-hidden="true">
          <div className="absolute top-[10%] right-[-10%] w-[50%] h-[50%] bg-blue-500/10 rounded-full blur-[140px] mix-blend-screen"></div>
          <div className="absolute bottom-[10%] left-[-10%] w-[50%] h-[50%] bg-purple-500/10 rounded-full blur-[140px] mix-blend-screen"></div>
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-4xl">
          <div className="mb-12 border-b border-white/10 pb-8">
            <Link href="/legal" className="text-sm font-semibold text-blue-500 hover:text-blue-400 transition-colors flex items-center gap-2 mb-6">
              <span>← Înapoi la Centrul Legal</span>
            </Link>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Termeni de Utilizare</h1>
            <p className="text-muted-foreground">Ultima actualizare: 22 Iulie 2026</p>
          </div>

          <div className="prose prose-invert max-w-none space-y-10 text-muted-foreground leading-relaxed">
            <section className="bg-white/5 border border-white/10 p-6 rounded-2xl">
              <div className="flex items-center gap-3 mb-4">
                <Scale className="text-blue-500 shrink-0" size={24} />
                <h2 className="text-xl font-bold text-white m-0">1. Acceptarea Termenilor</h2>
              </div>
              <p className="text-sm">
                Prin accesarea și utilizarea website-ului cristianvaduva.com (denumit în continuare „Platforma”), confirmi că ai citit, înțeles și ești de acord să respecți acești Termeni de Utilizare, precum și toate legile și reglementările aplicabile. Dacă nu ești de acord cu oricare dintre acești termeni, te rugăm să încetezi imediat utilizarea Platformei.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold font-heading text-white">2. Utilizarea Platformei și Serviciile Oferite</h2>
              <p className="mt-4">
                Această platformă este un ecosistem digital premium ce reunește și prezintă oportunități și servicii de consultanță oferite de Cristian Văduva în domenii precum:
              </p>
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li><strong>Asigurări:</strong> Intermediere și consultanță pentru polițe de asigurare emise de Generali România.</li>
                <li><strong>Imobiliare:</strong> Prezentare proprietăți de lux și asistență prin intermediul serviciului Home Find și a sistemului AiX OS.</li>
                <li><strong>Investiții & Credite:</strong> Analize financiare, simulatoare de rate și conexiuni cu brokeri ipotecari acreditați.</li>
                <li><strong>Educație Financiară:</strong> Distribuire de ghiduri premium, articole, cursuri și instrumente educaționale.</li>
              </ul>
            </section>

            <section className="bg-red-950/20 border border-red-900/30 p-6 rounded-2xl">
              <div className="flex items-center gap-3 mb-4">
                <AlertCircle className="text-red-500 shrink-0" size={24} />
                <h2 className="text-xl font-bold text-white m-0">3. Exonerare de Răspundere (Disclaimers)</h2>
              </div>
              <div className="space-y-4 text-sm">
                <p>
                  <strong>Disclaimer Asigurări:</strong> Produsele de asigurare depind în totalitate de criteriile de subscriere ale asigurătorului licențiat (Generali România). Cotațiile afișate de calculatoare sau simulatoare sunt pur orientative. Pentru detalii complete, accesează <Link href="/legal/insurance-disclaimer" className="text-blue-400 hover:underline">Limitarea de Răspundere Asigurări</Link>.
                </p>
                <p>
                  <strong>Disclaimer Imobiliare:</strong> Informațiile referitoare la proprietăți (prețuri, disponibilitate, suprafețe) pot fi modificate fără preaviz. O relație de reprezentare imobiliară se naște exclusiv în baza unui contract semnat de ambele părți. Detalii la <Link href="/legal/real-estate-disclaimer" className="text-blue-400 hover:underline">Limitarea de Răspundere Imobiliare</Link>.
                </p>
                <p>
                  <strong>Disclaimer Credite & Ipoteci:</strong> Cristian Văduva nu este instituție bancară sau de credit. Criteriile de aprobare aparțin creditorilor, iar simularile de rate au doar rol informativ. Detalii la <Link href="/legal/mortgage-disclaimer" className="text-blue-400 hover:underline">Limitarea de Răspundere Credite</Link>.
                </p>
                <p>
                  <strong>Disclaimer Investiții:</strong> Informațiile referitoare la oportunități de investiții imobiliare sau financiare au caracter strict educativ și informativ. Performanțele din trecut nu garantează profituri viitoare. Orice investiție implică riscul pierderii parțiale sau totale a capitalului. Detalii la <Link href="/legal/investment-disclaimer" className="text-blue-400 hover:underline">Limitarea de Răspundere Investiții</Link>.
                </p>
                <p>
                  <strong>Disclaimer Inteligență Artificială (AiX OS):</strong> Sistemul AiX OS, asistenții virtuali AI, calculatoarele și analizele automate reprezintă instrumente orientative și nu înlocuiesc verificarea umană și opinia experților. Nicio decizie majoră nu ar trebui luată exclusiv în baza datelor furnizate de AI. Detalii la <Link href="/legal/ai-disclaimer" className="text-blue-400 hover:underline">Limitarea de Răspundere AI</Link>.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold font-heading text-white">4. Proprietate Intelectuală</h2>
              <p className="mt-4">
                Toate materialele de pe Platformă, incluzând, dar fără a se limita la, designul, logo-urile, textele, elementele grafice, ghidurile descărcabile, articolele, structurile bazelor de date și codul sursă sunt proprietatea intelectuală exclusivă a lui Cristian Văduva sau a licențiatorilor săi și sunt protejate de legislația națională și internațională privind drepturile de autor.
              </p>
              <p className="mt-2">
                Pentru detalii privind drepturile de autor și permisiunile de reproducere, vizitează <Link href="/legal/copyright" className="text-blue-400 hover:underline">Proprietate Intelectuală & Copyright</Link>.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold font-heading text-white">5. Responsabilitățile Utilizatorului</h2>
              <p className="mt-4">
                În calitate de utilizator al Platformei, te angajezi:
              </p>
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li>Să nu folosești Platforma în scopuri ilegale, abuzive sau frauduloase;</li>
                <li>Să furnizezi informații reale, exacte și actuale în formularele de contact, cereri de cotație și lead-uri;</li>
                <li>Să nu utilizezi sisteme automate (roboti, spideri, extractoare de date) pentru a accesa, clona sau monitoriza resursele site-ului fără acordul nostru scris prealabil;</li>
                <li>Să nu încerci să spargi sau să ocolești măsurile de securitate ale Platformei.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold font-heading text-white">6. Limitarea Răspunderii</h2>
              <p className="mt-4">
                Cristian Văduva și partenerii săi nu vor fi răspunzători pentru niciun fel de daune directe, indirecte, incidentale, punitive sau de altă natură, rezultate din:
              </p>
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li>Imposibilitatea utilizării Platformei sau întreruperi în funcționarea acesteia;</li>
                <li>Inexactități, erori sau omisiuni din materialele educaționale, analize sau simulatoare;</li>
                <li>Decizii financiare sau de investiții luate de utilizator pe baza recomandărilor de pe site, fără consultanță umană dedicată;</li>
                <li>Probleme tehnice cauzate de servere, furnizorii de internet sau forța majoră.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold font-heading text-white">7. Servicii și Link-uri Terțe</h2>
              <p className="mt-4">
                Platforma poate conține link-uri către site-uri web gestionate de terți (ex. Generali România, bănci partenere, rețele de socializare). Aceste link-uri sunt oferite doar ca resursă adițională. Nu controlăm și nu ne asumăm responsabilitatea pentru conținutul, politicile de confidențialitate sau practicile site-urilor terțe.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold font-heading text-white">8. Legea Aplicabilă și Jurisdicția</h2>
              <p className="mt-4">
                Acești termeni sunt guvernați și interpretați în conformitate cu legile din România. Orice dispută care decurge din sau are legătură cu utilizarea Platformei și care nu poate fi rezolvată pe cale amiabilă va fi trimisă spre soluționare instanțelor judecătorești competente din București, România.
              </p>
            </section>

            <section className="border-t border-white/10 pt-10">
              <h2 className="text-2xl font-bold font-heading text-white">9. Modificări ale Termenilor</h2>
              <p className="mt-4">
                Ne rezervăm dreptul de a modifica acești termeni în orice moment pentru a reflecta schimbările legislative sau actualizările funcționale ale Platformei. Versiunea actualizată va intra în vigoare imediat după publicare. Continuarea utilizării site-ului reprezintă acceptul tău tacit.
              </p>
              <p className="mt-6 text-sm">
                Pentru orice întrebări referitoare la Termenii de Utilizare, te rugăm să ne contactezi prin intermediul paginii de <Link href="/legal/contact" className="text-blue-400 hover:underline">Contact Legal</Link>.
              </p>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
