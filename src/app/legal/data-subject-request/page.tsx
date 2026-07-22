import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, ArrowRight, UserCheck, AlertCircle } from "lucide-react";
import { CONTACT } from "@/config/contact";

export const metadata: Metadata = {
  title: "Drepturile Tale GDPR - Cristian Văduva",
  description: "Află care sunt drepturile tale conform Regulamentului GDPR și cum poți face o solicitare de date (acces, ștergere, rectificare, portabilitate).",
  alternates: {
    canonical: "https://cristianvaduva.com/legal/data-subject-request",
  },
  openGraph: {
    title: "Drepturile Tale GDPR - Cristian Văduva",
    description: "Află care sunt drepturile tale conform Regulamentului GDPR și cum poți face o solicitare de date (acces, ștergere, rectificare, portabilitate).",
    url: "https://cristianvaduva.com/legal/data-subject-request",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Drepturile Tale GDPR - Cristian Văduva",
    description: "Află care sunt drepturile tale conform Regulamentului GDPR și cum poți face o solicitare de date (acces, ștergere, rectificare, portabilitate).",
  },
};

const gdprRights = [
  {
    title: "1. Dreptul de Acces",
    description: "Ai dreptul de a obține o confirmare din partea noastră că prelucrăm sau nu datele tale și, în caz afirmativ, de a primi acces la datele respective și la informații detaliate privind modul de prelucrare."
  },
  {
    title: "2. Dreptul la Rectificare",
    description: "Ai dreptul de a obține corectarea datelor tale cu caracter personal inexacte sau completarea celor care sunt incomplete, fără întârzieri nejustificate."
  },
  {
    title: "3. Dreptul la Ștergerea Datelor („Dreptul de a fi uitat”)",
    description: "Poți cere ștergerea datelor tale când acestea nu mai sunt necesare scopurilor pentru care au fost colectate, când îți retragi consimțământul sau când prelucrarea a fost ilegală."
  },
  {
    title: "4. Dreptul la Restricționarea Prelucrării",
    description: "Ai dreptul de a ne cere suspendarea temporară a prelucrării datelor tale în cazuri specifice (ex: dacă contești exactitatea datelor sau consideri prelucrarea ilegală)."
  },
  {
    title: "5. Dreptul la Portabilitatea Datelor",
    description: "Ai dreptul de a primi datele tale într-un format structurat, utilizat în mod curent și citibil automat, și de a le transmite altui operator, dacă tehnic este fezabil."
  },
  {
    title: "6. Dreptul la Opoziție",
    description: "Te poți opune în orice moment prelucrării datelor tale în scopuri de marketing direct (ex: newsletter) sau din motive legate de situația ta particulară când temeiul este interesul legitim."
  },
  {
    title: "7. Dreptul de Retragere a Consimțământului",
    description: "Dacă prelucrarea se bazează pe consimțământul tău, ai dreptul de a-l retrage în orice moment, fără a afecta legalitatea prelucrării efectuate înainte de retragere."
  },
];

export default function DataSubjectRequestPage() {
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
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Drepturile Tale GDPR</h1>
            <p className="text-muted-foreground">Ghid complet privind exercitarea drepturilor de persoană vizată sub Regulamentul UE 2016/679.</p>
          </div>

          <div className="prose prose-invert max-w-none space-y-8 text-muted-foreground leading-relaxed">
            <section className="bg-white/5 border border-white/10 p-6 rounded-2xl">
              <div className="flex items-center gap-3 mb-4">
                <ShieldCheck className="text-blue-500 shrink-0" size={24} />
                <h2 className="text-xl font-bold text-white m-0">Angajamentul Nostru privind Confidențialitatea</h2>
              </div>
              <p className="text-sm">
                Protecția datelor tale cu caracter personal este integrată în modul în care proiectăm serviciile noastre, de la securitatea asistentului AI AiX OS și până la managementul ofertelor de asigurare și imobiliare. Regulamentul GDPR garantează controlul complet asupra informațiilor tale.
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-bold font-heading text-white">Drepturile pe care le poți exercita</h2>
              <div className="grid grid-cols-1 gap-4">
                {gdprRights.map((right, idx) => (
                  <div key={idx} className="border border-white/10 p-5 rounded-xl bg-white/5">
                    <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                      <UserCheck size={18} className="text-blue-400" />
                      {right.title}
                    </h3>
                    <p className="text-sm text-muted-foreground m-0">
                      {right.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-white/5 border border-white/10 p-6 rounded-2xl">
              <div className="flex items-center gap-3 mb-4">
                <AlertCircle className="text-amber-500 shrink-0" size={24} />
                <h2 className="text-xl font-bold text-white m-0">8. Dreptul de a Depune o Plângere</h2>
              </div>
              <p className="text-sm">
                Dacă consideri că drepturile tale au fost încălcate, te încurajăm să ne contactezi mai întâi pentru a rezolva amiabil orice neînțelegere. Totuși, ai dreptul de a te adresa direct <strong>Autorității Naționale de Supraveghere a Prelucrării Datelor cu Caracter Personal (ANSPDCP)</strong> din România (B-dul G-ral. Gheorghe Magheru 28-30, Sector 1, București, e-mail: anspdcp@dataprotection.ro).
              </p>
            </section>

            {/* CTA Section */}
            <section className="bg-gradient-to-r from-blue-900/40 to-purple-900/40 border border-blue-500/25 p-8 rounded-2xl text-center">
              <h2 className="text-2xl font-bold font-heading text-white mb-3">Cum trimiți o solicitare GDPR?</h2>
              <p className="text-sm text-white/80 max-w-2xl mx-auto mb-6">
                Pentru a-ți exercita oricare dintre drepturile de mai sus, te rugăm să transmiți o cerere scrisă, datată și semnată la adresa noastra de e-mail sau să ne contactezi telefonic. Vom răspunde solicitării tale în termen de maximum 30 de zile.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a 
                  href={`mailto:${CONTACT.email.display}?subject=Solicitare%20GDPR%20-%20Drepturi%20Persoana%20Vizata`} 
                  className="inline-flex items-center justify-center gap-2 bg-white text-black hover:bg-white/90 px-6 py-3 rounded-full font-semibold transition-colors w-full sm:w-auto text-sm"
                >
                  <span>Trimite Solicitare pe E-mail</span>
                  <ArrowRight size={16} />
                </a>
                <Link 
                  href="/legal/contact" 
                  className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 px-6 py-3 rounded-full font-semibold text-white transition-colors w-full sm:w-auto text-sm"
                >
                  <span>Vezi Pagina de Contact</span>
                </Link>
              </div>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
