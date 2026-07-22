import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Metadata } from "next";
import Link from "next/link";
import { Cookie, Settings } from "lucide-react";

export const metadata: Metadata = {
  title: "Politică de Cookie-uri - Cristian Văduva",
  description: "Cum utilizăm cookie-urile pentru a oferi o experiență de navigare premium. Află mai multe despre tipurile de cookie-uri și cum le poți gestiona.",
  alternates: {
    canonical: "https://cristianvaduva.com/legal/cookie-policy",
  },
  openGraph: {
    title: "Politică de Cookie-uri - Cristian Văduva",
    description: "Cum utilizăm cookie-urile pentru a oferi o experiență de navigare premium. Află mai multe despre tipurile de cookie-uri și cum le poți gestiona.",
    url: "https://cristianvaduva.com/legal/cookie-policy",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Politică de Cookie-uri - Cristian Văduva",
    description: "Cum utilizăm cookie-urile pentru a oferi o experiență de navigare premium. Află mai multe despre tipurile de cookie-uri și cum le poți gestiona.",
  },
};

export default function CookiePolicyPage() {
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
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Politică de Cookie-uri</h1>
            <p className="text-muted-foreground">Ultima actualizare: 22 Iulie 2026</p>
          </div>

          <div className="prose prose-invert max-w-none space-y-10 text-muted-foreground leading-relaxed">
            <section className="bg-white/5 border border-white/10 p-6 rounded-2xl">
              <div className="flex items-center gap-3 mb-4">
                <Cookie className="text-blue-500 shrink-0" size={24} />
                <h2 className="text-xl font-bold text-white m-0">1. Ce este un Cookie?</h2>
              </div>
              <p className="text-sm">
                Un cookie este un fișier text de mici dimensiuni pe care un site web îl stochează pe computerul sau dispozitivul tău mobil atunci când îl vizitezi. Datorită cookie-urilor, site-ul poate reține acțiunile și preferințele tale (cum ar fi limba, dimensiunea fontului sau starea consimțământului) pe o perioadă limitată de timp, astfel încât nu trebuie să le reintroduci de fiecare dată când revii sau navighezi de pe o pagină pe alta.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold font-heading text-white">2. Categorii de Cookie-uri Utilizate</h2>
              <p className="mt-4">
                Pe platforma cristianvaduva.com utilizăm module cookie organizate pe următoarele niveluri de utilitate:
              </p>
              
              <div className="space-y-6 mt-6">
                <div className="border border-white/10 p-5 rounded-xl bg-white/5">
                  <h3 className="text-lg font-bold text-white mb-2">A. Cookie-uri Necesare (Tehnice)</h3>
                  <p className="text-sm">
                    Sunt indispensabile pentru funcționarea corectă a Platformei. Acestea îți permit să navighezi pe pagini și să accesezi secțiunile securizate. Fără aceste cookie-uri, site-ul nu ar putea reține, de exemplu, preferința ta privind acceptarea sau respingerea altor module cookie. Ele nu colectează date personale pentru scopuri de marketing.
                  </p>
                  <p className="text-xs text-blue-400 mt-2">Păstrare: sesiune sau până la 12 luni.</p>
                </div>

                <div className="border border-white/10 p-5 rounded-xl bg-white/5">
                  <h3 className="text-lg font-bold text-white mb-2">B. Cookie-uri Funcționale</h3>
                  <p className="text-sm">
                    Permit site-ului să ofere funcționalități avansate și personalizate (ex. reținerea limbii selectate sau setările din widget-urile de simulare a riscurilor și creditelor). Pot fi setate de noi sau de furnizori terți ale căror servicii le-am adăugat pe paginile noastre.
                  </p>
                  <p className="text-xs text-blue-400 mt-2">Păstrare: până la 6 luni.</p>
                </div>

                <div className="border border-white/10 p-5 rounded-xl bg-white/5">
                  <h3 className="text-lg font-bold text-white mb-2">C. Cookie-uri Analitice (de Performanță)</h3>
                  <p className="text-sm">
                    Ne ajută să înțelegem modul în care vizitatorii interacționează cu site-ul prin colectarea și raportarea de informații în mod anonim (cum ar fi Google Analytics). Monitorizăm numărul de vizite, paginile cele mai vizualizate și sursele de trafic, cu scopul exclusiv de a optimiza performanța și viteza Platformei.
                  </p>
                  <p className="text-xs text-blue-400 mt-2">Păstrare: până la 2 ani (în funcție de politica Google Analytics).</p>
                </div>

                <div className="border border-white/10 p-5 rounded-xl bg-white/5">
                  <h3 className="text-lg font-bold text-white mb-2">D. Cookie-uri de Marketing & Terțe Părți</h3>
                  <p className="text-sm">
                    Sunt utilizate pentru a urmări utilizatorii de la un site la altul cu scopul de a afișa reclame relevante și atractive (ex. prin Meta Pixel sau LinkedIn Insight Tag). De asemenea, ele permit funcționarea widget-urilor externe cum ar fi hărțile Google Maps sau videoclipurile YouTube încorporate.
                  </p>
                  <p className="text-xs text-blue-400 mt-2">Păstrare: de la sesiune până la 180 de zile.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold font-heading text-white">3. Module Cookie de la Terțe Părți</h2>
              <p className="mt-4">
                Unele secțiuni ale site-ului pot afișa conținut aparținând unor furnizori externi (de exemplu, YouTube, Google Maps, rețele sociale, sisteme de chat). Pentru a vizualiza acest conținut, trebuie mai întâi să le accepți termenii și condițiile specifice, inclusiv politicile de cookie-uri, asupra cărora nu avem control direct.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold font-heading text-white">4. Perioade de Retenție a Datelor</h2>
              <p className="mt-4">
                Perioada de reținere a cookie-urilor variază în funcție de tip:
              </p>
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li><strong>Cookie-uri de sesiune:</strong> Sunt temporare și sunt șterse automat când închizi browserul web.</li>
                <li><strong>Cookie-uri persistente:</strong> Rămân stocate pe dispozitivul tău până când expiră (de la câteva zile până la maximum 2 ani) sau până le ștergi manual.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold font-heading text-white">5. Administrarea și Controlul Cookie-urilor</h2>
              <div className="bg-white/5 border border-white/10 p-6 rounded-2xl mt-4">
                <div className="flex items-center gap-3 mb-3">
                  <Settings className="text-blue-500" size={20} />
                  <h3 className="text-lg font-bold text-white m-0">Cum poți modifica opțiunile?</h3>
                </div>
                <p className="text-sm mb-4">
                  Îți poți exprima consimțământul sau modifica preferințele direct prin intermediul bannerului nostru de consimțământ (Cookie Banner) disponibil la prima accesare a site-ului sau accesând butonul dedicat din josul paginii.
                </p>
                <p className="text-sm m-0">
                  De asemenea, poți configura browserul tău web să refuze sau să șteargă cookie-urile existente. Pentru a face acest lucru, urmează instrucțiunile specifice ale browserului tău (Chrome, Safari, Edge, Firefox). Reține că dezactivarea cookie-urilor necesare poate afecta buna funcționare a anumitor pagini.
                </p>
              </div>
            </section>

            <section className="border-t border-white/10 pt-10">
              <h2 className="text-2xl font-bold font-heading text-white">6. Legături Utile</h2>
              <p className="mt-4">
                Pentru detalii extinse despre cum îți protejăm confidențialitatea și cum prelucrăm datele tale personale, te rugăm să consulți <Link href="/legal/privacy-policy" className="text-blue-400 hover:underline">Politica de Confidențialitate & GDPR Notice</Link>.
              </p>
              <p className="mt-2">
                Dacă dorești să trimiți o solicitare formală cu privire la datele tale, folosește pagina de <Link href="/legal/data-subject-request" className="text-blue-400 hover:underline">Drepturi GDPR</Link> sau contactează-ne direct la <Link href="/legal/contact" className="text-blue-400 hover:underline">Contact Legal</Link>.
              </p>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
