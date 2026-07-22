import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Metadata } from "next";
import Link from "next/link";
import { Shield, Lock, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Politică de Confidențialitate & GDPR Notice - Cristian Văduva",
  description: "Politică de confidențialitate detaliată și conformă GDPR pentru platforma premium Cristian Văduva (cristianvaduva.com). Află cum îți protejăm datele.",
  alternates: {
    canonical: "https://cristianvaduva.com/legal/privacy-policy",
  },
  openGraph: {
    title: "Politică de Confidențialitate & GDPR Notice - Cristian Văduva",
    description: "Politică de confidențialitate detaliată și conformă GDPR pentru platforma premium Cristian Văduva (cristianvaduva.com). Află cum îți protejăm datele.",
    url: "https://cristianvaduva.com/legal/privacy-policy",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Politică de Confidențialitate & GDPR Notice - Cristian Văduva",
    description: "Politică de confidențialitate detaliată și conformă GDPR pentru platforma premium Cristian Văduva (cristianvaduva.com). Află cum îți protejăm datele.",
  },
};

export default function PrivacyPolicyPage() {
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
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Politică de Confidențialitate & Notă GDPR</h1>
            <p className="text-muted-foreground">Ultima actualizare: 22 Iulie 2026</p>
          </div>

          <div className="prose prose-invert max-w-none space-y-10 text-muted-foreground leading-relaxed">
            <section className="bg-white/5 border border-white/10 p-6 rounded-2xl">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="text-blue-500 shrink-0" size={24} />
                <h2 className="text-xl font-bold text-white m-0">1. Operatorul de Date</h2>
              </div>
              <p className="text-sm">
                Operatorul de date cu caracter personal colectate prin intermediul acestei platforme este <strong>Cristian Văduva</strong>, cu sediul profesional în București, România (Clădirea Globalworth, Et. 15), e-mail: <a href="mailto:contact@cristianvaduva.com" className="text-blue-400 hover:underline">contact@cristianvaduva.com</a>, telefon: <a href="tel:+40767110439" className="text-blue-400 hover:underline">+40 767 110 439</a>. 
                Ne asigurăm că toate operațiunile de procesare sunt efectuate în strictă conformitate cu Regulamentul General privind Protecția Datelor (GDPR - Regulamentul UE 2016/679).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold font-heading text-white">2. Categorii de Date și Scopurile Procesării</h2>
              <p className="mt-4">
                Colectăm și procesăm date cu caracter personal în funcție de interacțiunea ta cu platforma cristianvaduva.com. Aceste interacțiuni includ:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="bg-white/5 border border-white/10 p-5 rounded-xl">
                  <h3 className="text-lg font-bold text-white mb-2">Asigurări (RCA, CASCO, Viață, Sănătate, etc.)</h3>
                  <p className="text-xs">
                    Colectăm date de identificare (nume, prenume, CNP, serie/număr buletin), date de contact (telefon, e-mail), date despre bunurile de asigurat (număr înmatriculare, serie șasiu auto, detalii locuință) și date medicale sau financiare, exclusiv pentru obținerea de cotații de la partenerul nostru licențiat Generali România și emiterea polițelor de asigurare solicitate.
                  </p>
                </div>
                <div className="bg-white/5 border border-white/10 p-5 rounded-xl">
                  <h3 className="text-lg font-bold text-white mb-2">Servicii Imobiliare & Home Find</h3>
                  <p className="text-xs">
                    Pentru Reprezentarea Cumpărătorului sau Vânzătorului, asistență în tranzacții și recomandări personalizate prin serviciul Home Find sau platforma AiX OS, colectăm date de identificare, detalii privind bugetul, preferințele de locuire și date financiare pentru a stabili profilul de cumpărare.
                  </p>
                </div>
                <div className="bg-white/5 border border-white/10 p-5 rounded-xl">
                  <h3 className="text-lg font-bold text-white mb-2">Interacțiune AI, Live Chat & Urgențe</h3>
                  <p className="text-xs">
                    Conversațiile purtate cu asistenții noștri AI, solicitările trimise prin Centrul de Urgențe, sau interacțiunile prin WhatsApp și apeluri telefonice pot fi procesate pentru a răspunde prompt solicitărilor tale tehnice și de consultanță.
                  </p>
                </div>
                <div className="bg-white/5 border border-white/10 p-5 rounded-xl">
                  <h3 className="text-lg font-bold text-white mb-2">Formulare, Descărcări Ghiduri & Newsletter</h3>
                  <p className="text-xs">
                    Colectăm nume, e-mail și opțiunile de abonare la newsletter sau descărcare de ghiduri premium. Trimiterea acestor materiale se bazează pe acordul tău explicit și interesul legitim de a primi educație financiară premium.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold font-heading text-white">3. Temeiul Juridic al Prelucrării</h2>
              <p className="mt-4">
                Prelucrăm datele tale în baza următoarelor temeiuri legale:
              </p>
              <ul className="list-none space-y-3 pl-0 mt-4">
                <li className="flex items-start gap-2">
                  <CheckCircle size={18} className="text-blue-500 shrink-0 mt-1" />
                  <span><strong>Executarea unui contract:</strong> Colectarea datelor necesare pentru emiterea polițelor de asigurare sau acordurilor de reprezentare imobiliară.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={18} className="text-blue-500 shrink-0 mt-1" />
                  <span><strong>Consimțământul tău explicit:</strong> Pentru acțiuni de marketing, newsletter, cookie-uri non-esențiale și procesarea anumitor categorii speciale de date (ex. date de sănătate în asigurările de viață).</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={18} className="text-blue-500 shrink-0 mt-1" />
                  <span><strong>Obligații legale:</strong> Raportări către autorități de supraveghere sau conformarea cu normele fiscale și de prevenire a spălării banilor.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={18} className="text-blue-500 shrink-0 mt-1" />
                  <span><strong>Interes legitim:</strong> Optimizarea serviciilor platformei, securizarea rețelelor împotriva atacurilor cibernetice și asistență generală pre-contractuală.</span>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold font-heading text-white">4. Destinatarii Datelor cu Caracter Personal</h2>
              <p className="mt-4">
                Datele tale pot fi transmise partenerilor noștri contractuali strict în vederea îndeplinirii scopurilor menționate:
              </p>
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li>Partenerului nostru de asigurări autorizat: <strong>Generali România Asigurare Reasigurare S.A.</strong>;</li>
                <li>Furnizori de servicii cloud securizate și servicii IT (găzduire web, baze de date);</li>
                <li>Instituții bancare și brokeri de credite autorizați, pentru dosarele de finanțare ipotecară;</li>
                <li>Autorități publice, în baza solicitărilor legale exprese.</li>
              </ul>
              <p className="mt-4">
                Nu vindem și nu închiriem bazele noastre de date către terți pentru activități comerciale sau de spam.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold font-heading text-white">5. Cookie-uri și Tehnologii de Urmărire</h2>
              <p className="mt-4">
                Platforma utilizează cookie-uri pentru a îmbunătăți performanța și a oferi o navigare intuitivă. Pentru detalii complete despre fișierele plasate, scopul lor și modul în care le poți bloca sau șterge, accesează <Link href="/legal/cookie-policy" className="text-blue-400 hover:underline">Politica de Cookie-uri</Link>.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold font-heading text-white">6. Securitatea Datelor și Transferuri Internaționale</h2>
              <div className="bg-white/5 border border-white/10 p-6 rounded-2xl mt-4">
                <div className="flex items-center gap-3 mb-3">
                  <Lock className="text-green-500" size={20} />
                  <h3 className="text-lg font-bold text-white m-0">Standarde Înalte de Protecție</h3>
                </div>
                <p className="text-sm m-0">
                  Implementăm măsuri tehnice și organizatorice avansate (criptare SSL/TLS, token-uri de autentificare, acces restricționat pe baza principiului nevoii de a cunoaște) pentru a proteja datele împotriva pierderii sau accesului neautorizat. Datele sunt stocate în principal pe servere din Uniunea Europeană. Orice transfer în afara SEE se realizează doar cu garanții adecvate (Clauze Contractuale Standard aprobate de Comisia Europeană).
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold font-heading text-white">7. Perioada de Păstrare a Datelor</h2>
              <p className="mt-4">
                Păstrăm datele cu caracter personal doar atât timp cât este necesar pentru îndeplinirea scopurilor descrise:
              </p>
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li><strong>Datele contractelor de asigurare:</strong> Pe perioada valabilității poliței plus termenul legal de arhivare aplicabil asigurărilor (de regulă 5-10 ani);</li>
                <li><strong>Datele formularelor de contact și lead-uri:</strong> Până la 36 de luni de la ultima interacțiune, dacă nu se concretizează într-un contract;</li>
                <li><strong>Datele de marketing (ghiduri, newsletter):</strong> Până la retragerea consimțământului tău (dezabonare).</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold font-heading text-white">8. Drepturile Tale GDPR</h2>
              <p className="mt-4">
                Conform Regulamentului GDPR, beneficiezi de drepturi extinse privind datele tale personale: accesul la date, rectificarea datelor inexacte, ștergerea datelor (dreptul de a fi uitat), restricționarea prelucrării, portabilitatea datelor și dreptul de opoziție.
              </p>
              <p className="mt-2">
                Pentru a afla detalii complete sau pentru a depune o solicitare formală de date, vizitează secțiunea noastră dedicată: <Link href="/legal/data-subject-request" className="text-blue-400 hover:underline">Drepturile Tale GDPR</Link>.
              </p>
            </section>

            <section className="border-t border-white/10 pt-10">
              <h2 className="text-2xl font-bold font-heading text-white">9. Contact și Autoritatea de Supraveghere</h2>
              <p className="mt-4">
                Dacă ai întrebări, îngrijorări sau dorești să îți guvernezi datele prelucrate de noi, te rugăm să ne contactezi direct la adresa de e-mail <a href="mailto:contact@cristianvaduva.com" className="text-blue-400 hover:underline">contact@cristianvaduva.com</a> sau să accesezi pagina de <Link href="/legal/contact" className="text-blue-400 hover:underline">Contact Legal</Link>.
              </p>
              <p className="mt-4">
                De asemenea, ai dreptul de a depune o plângere la autoritatea națională de supraveghere din România:
                <br />
                <strong>Autoritatea Națională de Supraveghere a Prelucrării Datelor cu Caracter Personal (ANSPDCP)</strong>
                <br />
                B-dul G-ral. Gheorghe Magheru 28-30, Sector 1, cod poștal 010336, București, România, e-mail: anspdcp@dataprotection.ro, web: www.dataprotection.ro.
              </p>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
