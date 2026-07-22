import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Metadata } from "next";
import Link from "next/link";
import { Copyright, ShieldAlert, Award } from "lucide-react";

export const metadata: Metadata = {
  title: "Proprietate Intelectuală & Copyright - Cristian Văduva",
  description: "Drepturile de autor și proprietatea intelectuală asupra brandului, ghidurilor, logo-ului și materialelor de pe cristianvaduva.com.",
  alternates: {
    canonical: "https://cristianvaduva.com/legal/copyright",
  },
  openGraph: {
    title: "Proprietate Intelectuală & Copyright - Cristian Văduva",
    description: "Drepturile de autor și proprietatea intelectuală asupra brandului, ghidurilor, logo-ului și materialelor de pe cristianvaduva.com.",
    url: "https://cristianvaduva.com/legal/copyright",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Proprietate Intelectuală & Copyright - Cristian Văduva",
    description: "Drepturile de autor și proprietatea intelectuală asupra brandului, ghidurilor, logo-ului și materialelor de pe cristianvaduva.com.",
  },
};

export default function CopyrightPage() {
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
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Proprietate Intelectuală & Copyright</h1>
            <p className="text-muted-foreground">Informații privind proprietatea materialelor, logo-urilor, asistenților și textelor publicate pe Platformă.</p>
          </div>

          <div className="prose prose-invert max-w-none space-y-10 text-muted-foreground leading-relaxed">
            <section className="bg-white/5 border border-white/10 p-6 rounded-2xl">
              <div className="flex items-center gap-3 mb-4">
                <Copyright className="text-blue-500 shrink-0" size={24} />
                <h2 className="text-xl font-bold text-white m-0">Protecția Drepturilor de Autor</h2>
              </div>
              <p className="text-sm">
                Întregul conținut al platformei web cristianvaduva.com, incluzând designul, codul sursă, textele legale, articolele din blog, ghidurile PDF premium descărcabile, imaginile, logo-urile brandului Cristian Văduva și soluțiile software de calcul încorporate (precum AiX OS) sunt protejate în baza Legii nr. 8/1996 privind dreptul de autor și drepturile conexe, aparținând în exclusivitate lui Cristian Văduva sau partenerilor săi licențiatori.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold font-heading text-white">1. Utilizarea Limitată a Resurselor</h2>
              <p className="mt-4">
                Vizitatorilor Platformei le este acordată o licență limitată, neexclusivă și revocabilă de a accesa paginile web și de a descărca ghidurile educaționale premium strict în scopuri personale, necomerciale. 
                Este strict interzisă:
              </p>
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li>Copierea, multiplicarea, distribuirea sau revânzarea ghidurilor premium sub orice alt brand sau autor;</li>
                <li>Razuirea de date (data scraping) sau clonarea designului Apple-inspired al interfeței în alte proiecte comerciale;</li>
                <li>Utilizarea codului sursă sau a scripturilor simulatoarelor fără acordul scris explicit al proprietarului.</li>
              </ul>
            </section>

            <section className="bg-white/5 border border-white/10 p-6 rounded-2xl">
              <div className="flex items-center gap-3 mb-4">
                <Award className="text-blue-500 shrink-0" size={24} />
                <h2 className="text-xl font-bold text-white m-0">2. Mărci Înregistrate și Brandul</h2>
              </div>
              <p className="text-sm m-0">
                Numele „Cristian Văduva”, elementul vizual distinctiv al punctului albastru/roșu asociat, precum și denumirile sistemelor comerciale proprii (ex: <strong>AiX OS</strong>, <strong>Home Find</strong>, <strong>AiX Academy</strong>, <strong>Wealth Passport</strong>) sunt mărci și denumiri protejate. Utilizarea lor fără autorizare prealabilă scrisă constituie o încălcare a legii mărcilor și poate atrage răspunderea juridică civilă și penală.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold font-heading text-white">3. Conținut AI-Generated</h2>
              <p className="mt-4">
                Sistemele de asistență bazate pe inteligență artificială prezente pe site pot genera răspunsuri text sau fișiere temporare de analiză. 
                Deși structura logică și algoritmii asistentului aparțin în exclusivitate platformei, drepturile de autor asupra textelor specifice generate în timp real de AI se supun reglementărilor furnizorilor de tehnologie AI și normelor internaționale aplicabile conținutului computațional. Aceste răspunsuri sunt destinate doar ghidării tale și nu pot fi vândute sau publicate ca opinii de specialitate sub alt nume.
              </p>
            </section>

            <section className="bg-amber-950/20 border border-amber-900/30 p-6 rounded-2xl">
              <div className="flex items-center gap-3 mb-4">
                <ShieldAlert className="text-amber-500 shrink-0" size={24} />
                <h2 className="text-xl font-bold text-white m-0">Sesizări privind Încălcarea Drepturilor</h2>
              </div>
              <p className="text-sm m-0">
                Dacă consideri că un material publicat pe site-ul nostru încalcă un drept de autor deținut de tine sau de un terț, te rugăm să ne trimiți o notificare formală de încălcare la adresa de e-mail <a href="mailto:contact@cristianvaduva.com" className="text-blue-400 hover:underline">contact@cristianvaduva.com</a> pentru ca echipa noastră să poată investiga și elimina conținutul în cel mai scurt timp.
              </p>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
