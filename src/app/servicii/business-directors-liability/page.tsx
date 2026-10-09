import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ServicePageIntro } from "@/components/sections/service-page-intro";
import { ContactForm } from "@/components/sections/contact-form";
import { 
  ShieldAlert, 
  Info, 
  Star, 
  Users2, 
  CheckCircle2, 
  AlertTriangle, 
  Scale, 
  Briefcase, 
  FileText,
  ShieldCheck
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Asigurare D&O (Răspunderea Directorilor și Administratorilor) | Cristian Văduva",
  description:
    "Consultanță de asigurare pentru răspunderea managerială (Directors & Officers - D&O). Acoperire pentru cheltuieli de apărare juridică, investigații oficiale și pretenții civile formulate de acționari, creditori sau autorități.",
};

export default function BusinessDirectorsLiabilityPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col selection:bg-blue-600 selection:text-white">
      <Navbar />
      <ServicePageIntro slug="business-directors-liability" />
      
      <main className="flex-1 pt-32 pb-16">
        <div className="container mx-auto px-4 max-w-5xl">
          
          {/* 1. Hero Section */}
          <div className="mb-24 flex flex-col items-center text-center mx-auto">
            <div className="inline-flex p-5 rounded-2xl glass text-rose-500 mb-8 border border-border bg-rose-500/10">
              <ShieldAlert className="w-12 h-12" />
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold mb-6 leading-tight text-foreground">
              Răspunderea Directorilor & Administratorilor (D&O)
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-10 max-w-3xl">
              Deciziile strategice și operaționale ale echipei de conducere implică riscuri juridice substanțiale. Polița D&O (Directors & Officers Liability) este concepută pentru a acoperi costurile de apărare juridică și despăgubirile civile stabilite în sarcina administratorilor, directorilor executivi și membrilor consiliului de administrație pentru fapte culpabile sau decizii manageriale contestate, conform condițiilor contractuale.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="h-14 px-8 text-base font-semibold rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-xl" asChild>
                <Link href="#oferta">Solicită Structurare Poliță D&O</Link>
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-base rounded-full border-border hover:bg-muted" asChild>
                <Link href="/verifica-polita">
                  Audit Clauze D&O Existentă
                </Link>
              </Button>
            </div>
          </div>

          {/* 2. Structura Clasică D&O: Side A, Side B, Side C */}
          <div className="mb-24 glass rounded-[2.5rem] p-8 sm:p-12 border border-border/60">
            <h2 className="text-3xl font-heading font-bold mb-4 text-center text-foreground">
              Arhitectura de Protecție D&O: Side A, Side B și Side C
            </h2>
            <p className="text-muted-foreground text-center text-sm sm:text-base mb-10 max-w-2xl mx-auto">
              O poliță D&O structurată profesional integrează trei niveluri complementare de protecție pentru conducerea companiei și entitatea juridică:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-card border border-border/60 space-y-3">
                <div className="p-3 rounded-xl bg-rose-500/10 text-rose-500 w-fit">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-foreground text-lg">Side A: Protecție Directă Personală</h4>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Intervine atunci când compania <strong>nu poate sau nu are dreptul legal</strong> să despăgubească direct administratorul (ex: în caz de insolvență a societății sau când legislația interzice indemnizarea internă). Protejează direct persoana fizică a directorului.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-card border border-border/60 space-y-3">
                <div className="p-3 rounded-xl bg-blue-500/10 text-blue-500 w-fit">
                  <Briefcase className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-foreground text-lg">Side B: Rambursarea Companiei</h4>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Despăgubește <strong>societatea comercială</strong> atunci când aceasta a acoperit din fonduri proprii cheltuielile de judecată sau despăgubirile stabilite în sarcina unui director, în conformitate cu statutul și clauzele de indemnizare ale companiei.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-card border border-border/60 space-y-3">
                <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-500 w-fit">
                  <Scale className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-foreground text-lg">Side C: Răspunderea Entității</h4>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Pentru companiile listate la bursă sau societăți pe acțiuni, acoperă cererile de chemare în judecată formulate direct împotriva <strong>societății ca persoană juridică</strong> în legătură cu titlurile de valoare (Securities Entity Cover).
                </p>
              </div>
            </div>
          </div>

          {/* 3. Cine poate formula pretenții împotriva conducerii */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
            <div className="glass rounded-[2.5rem] p-8 sm:p-10 border border-border/60 relative overflow-hidden">
              <h2 className="text-2xl font-heading font-bold mb-5 flex items-center gap-3 text-foreground">
                <Users2 className="text-rose-500 w-7 h-7" />
                Surse Frecvente de Pretenții Civile
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Pretențiile împotriva directorilor pot proveni din multiple direcții comerciale și de reglementare:
              </p>
              <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 shrink-0" />
                  <span><strong>Acționari și asociați minoritari:</strong> Acuzații de gestionare defectuoasă, nerespectarea strategiei aprobate de AGA sau deprecierea valorii acțiunilor.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 shrink-0" />
                  <span><strong>Creditori și lichidatori judiciari:</strong> Cereri de atragere a răspunderii patrimoniale personale în cazul procedurilor de insolvență sau faliment (Legea 85/2014).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 shrink-0" />
                  <span><strong>Autorități de reglementare:</strong> Investigații oficiale (Consiliul Concurenței, ANAF, ASF, ANPC, ANSPDCP) privind conformitatea activității.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 shrink-0" />
                  <span><strong>Angajați:</strong> Litigii de muncă privind discriminarea, concedierea abuzivă sau hărțuirea (EPLI - Employment Practices Liability).</span>
                </li>
              </ul>
            </div>

            <div className="glass rounded-[2.5rem] p-8 sm:p-10 border border-border/60 relative overflow-hidden">
              <h2 className="text-2xl font-heading font-bold mb-5 flex items-center gap-3 text-foreground">
                <Scale className="text-blue-500 w-7 h-7" />
                Mecanismul 'Claims-Made' & Continuitatea
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Polițele D&O funcționează exclusiv pe principiul <strong>'Claims-Made'</strong> (cerere formulată și notificată în perioada de valabilitate a poliței), ceea ce impune atenție sporită la câteva clauze critice:
              </p>
              <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0" />
                  <span><strong>Data retroactivă (Retroactive Date):</strong> Trebuie menținută neîntreruptă la fiecare reînnoire sau schimbare de asigurator pentru a acoperi decizii din trecut.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0" />
                  <span><strong>Perioada Extinsă de Notificare (ERP / Run-Off):</strong> Esențială la retragerea din funcție, fuziuni sau achiziții (M&A), acoperind pretenții apărute ulterior pentru activitatea anterioară.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0" />
                  <span><strong>Obligația de notificare promptă:</strong> Orice circumstanță care ar putea genera o pretenție viitoare trebuie raportată în termenele stipulate în contract.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* 4. Excluderi & Limite Legale Importante */}
          <div className="mb-24 p-8 rounded-3xl bg-card border border-border/60">
            <h3 className="text-xl font-heading font-bold text-foreground mb-4 flex items-center gap-2">
              <AlertTriangle className="w-6 h-6 text-amber-500" />
              Ce NU Acoperă o Poliță D&O (Excluderi Standard & Limite Legale)
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-6">
              Pentru o înțelegere corectă și transparentă, este esențial de știut că nicio poliță D&O nu oferă imunitate absolută. Următoarele aspecte sunt excluse în mod universal:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-muted-foreground">
              <div className="p-4 rounded-xl bg-muted/40 border border-border/40">
                <span className="font-semibold text-foreground block mb-1">Frauda și Faptele Intenționate:</span>
                Actele dovedite judecătoresc ca fiind comise cu intenție directă, dol sau infracțiunile penale nu sunt asigurate.
              </div>
              <div className="p-4 rounded-xl bg-muted/40 border border-border/40">
                <span className="font-semibold text-foreground block mb-1">Profitul Personal Ilicit:</span>
                Pretențiile legate de obținerea unor avantaje financiare sau remunerații necuvenite la care directorul nu avea dreptul legal.
              </div>
              <div className="p-4 rounded-xl bg-muted/40 border border-border/40">
                <span className="font-semibold text-foreground block mb-1">Litigii și Circumstanțe Anterioare:</span>
                Procedurile legale începute sau împrejurările cunoscute înainte de data de începere a poliței.
              </div>
              <div className="p-4 rounded-xl bg-muted/40 border border-border/40">
                <span className="font-semibold text-foreground block mb-1">Daune Corporale sau Materiale:</span>
                Vătămările fizice sau distrugerile de bunuri sunt obiectul polițelor de Răspundere Civilă Generală, nu al D&O.
              </div>
            </div>
          </div>

          {/* 5. Interlinks */}
          <div className="mb-24 p-8 rounded-3xl bg-muted/40 border border-border/60">
            <h3 className="text-lg font-heading font-bold mb-4 text-foreground">
              Protecție Comercială Integrată
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
              <Link href="/servicii/business-cyber-insurance" className="p-4 rounded-xl bg-card border border-border/60 hover:border-border transition-colors block">
                <span className="font-semibold text-foreground block mb-1">Asigurare Cyber Risk &rarr;</span>
                <span className="text-muted-foreground">Protecție împotriva atacurilor ransomware și breșelor GDPR.</span>
              </Link>
              <Link href="/servicii/business-professional-liability" className="p-4 rounded-xl bg-card border border-border/60 hover:border-border transition-colors block">
                <span className="font-semibold text-foreground block mb-1">Răspundere Profesională (PI) &rarr;</span>
                <span className="text-muted-foreground">Erori și omisiuni în prestarea serviciilor profesionale.</span>
              </Link>
              <Link href="/verifica-polita" className="p-4 rounded-xl bg-card border border-border/60 hover:border-border transition-colors block">
                <span className="font-semibold text-foreground block mb-1">Verificare Poliță D&O &rarr;</span>
                <span className="text-muted-foreground">Audit independent al limitelor și clauzelor din contractul curent.</span>
              </Link>
            </div>
          </div>

          {/* 6. Formular Contact */}
          <div id="oferta" className="scroll-mt-24">
            <div className="text-center max-w-xl mx-auto mb-10">
              <h2 className="text-3xl font-heading font-bold mb-3 text-foreground">
                Solicită o Ofertă Confidențială D&O
              </h2>
              <p className="text-muted-foreground text-sm">
                Transmite-ne detaliile companiei pentru o analiză personalizată a structurii de conducere și a limitelor optime de răspundere.
              </p>
            </div>
            <ContactForm target="D&O / Răspunderea Managerilor" />
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
