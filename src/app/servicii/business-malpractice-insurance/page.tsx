import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ServicePageIntro } from "@/components/sections/service-page-intro";
import { ContactForm } from "@/components/sections/contact-form";
import { 
  Stethoscope, 
  Info, 
  Star, 
  Users2, 
  CheckCircle2, 
  AlertTriangle, 
  Scale, 
  Building2, 
  FileCheck2, 
  HeartPulse 
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Asigurare Malpraxis Medical (Medici, Cabinete, Clinici) | Cristian Văduva",
  description:
    "Consultanță de asigurare de răspundere civilă profesională medicală (Malpraxis). Acoperire pentru medici, stomatologi, asistenți, clinici și spitale private, incluzând cheltuieli de apărare juridică și expertize medico-legale.",
};

export default function BusinessMalpracticeInsurancePage() {
  return (
    <div className="min-h-screen bg-background flex flex-col selection:bg-blue-600 selection:text-white">
      <Navbar />
      <ServicePageIntro slug="business-malpractice-insurance" />
      
      <main className="flex-1 pt-32 pb-16">
        <div className="container mx-auto px-4 max-w-5xl">
          
          {/* 1. Hero Section */}
          <div className="mb-24 flex flex-col items-center text-center mx-auto">
            <div className="inline-flex p-5 rounded-2xl glass text-emerald-500 mb-8 border border-border bg-emerald-500/10">
              <Stethoscope className="w-12 h-12" />
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold mb-6 leading-tight text-foreground">
              Asigurarea de Răspundere Profesională Medicală (Malpraxis)
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-10 max-w-3xl">
              Actul medical implică o responsabilitate deontologică și juridică de cel mai înalt nivel. În contextul creșterii litigiilor civile și al complexității actului terapeutic, o poliță structurată corespunzător asigură atât apărarea profesională a medicului, cât și stabilitatea financiară a unității sanitare (CMI, SRL, clinică sau spital).
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="h-14 px-8 text-base font-semibold rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-xl" asChild>
                <Link href="#oferta">Solicită Ofertă Malpraxis</Link>
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-base rounded-full border-border hover:bg-muted" asChild>
                <Link href="/verifica-polita">
                  Audit Poliță Malpraxis
                </Link>
              </Button>
            </div>
          </div>

          {/* 2. Cadrul Legal & Distincția Medic vs. Unitate Sanitară */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
            <div className="glass rounded-[2.5rem] p-8 sm:p-10 border border-border/60 relative overflow-hidden">
              <h2 className="text-2xl font-heading font-bold mb-5 flex items-center gap-3 text-foreground">
                <HeartPulse className="text-emerald-500 w-7 h-7" />
                Polița Individuală a Personalului Medical
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
                Conform Titlului XV din Legea nr. 95/2006 privind reforma în domeniul sănătății, personalul medical (medici, medici stomatologi, farmaciști, asistenți medicali) are obligația legală de a încheia o asigurare de malpraxis pentru exercitarea profesiei.
              </p>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Polița individuală acoperă răspunderea civilă pentru prejudicii cauzate pacienților din eroare profesională, neglijență, imprudență sau cunoștințe medicale insuficiente în exercitarea specialității medicale înscrise în avizul de liberă practică.
              </p>
            </div>

            <div className="glass rounded-[2.5rem] p-8 sm:p-10 border border-border/60 relative overflow-hidden">
              <h2 className="text-2xl font-heading font-bold mb-5 flex items-center gap-3 text-foreground">
                <Building2 className="text-blue-500 w-7 h-7" />
                Polița Unității Sanitare (Clinici, CMI, Spitale)
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
                Unitățile sanitare furnizoare de servicii medicale poartă răspundere civilă proprie pentru prejudiciile cauzate pacienților, distinct de răspunderea individuală a medicilor angajați sau colaboratori.
              </p>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Răspunderea clinicii intervine în situații precum: infecții asociate asistenței medicale (infecții nosocomiale), defectarea dispozitivelor și aparaturii medicale utilizate, vicii de organizare a serviciilor, eliberarea neconformă a medicamentelor sau răspunderea comitentului pentru fapta prepusului.
              </p>
            </div>
          </div>

          {/* 3. Limite de Asigurare: Obligatoriu vs. Recomandat */}
          <div className="mb-24 p-8 rounded-3xl bg-card border border-border/60 space-y-4">
            <h3 className="text-xl font-heading font-bold text-foreground flex items-center gap-2">
              <Scale className="w-6 h-6 text-emerald-500" />
              Limitele Legale Minime vs. Realitatea Litigiilor Judiciare
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Legislația națională stabilește praguri minime obligatorii de asigurare în funcție de specialitate (de la specialități medicale fără intervenții invazive până la chirurgie, ATI sau obstetrică-ginecologie). Totuși, în practica judiciară actuală din România:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs sm:text-sm text-muted-foreground">
              <div className="p-4 rounded-xl bg-muted/40 border border-border/40">
                <span className="font-semibold text-foreground block mb-1">Pretențiile pentru Daune Morale:</span>
                Instanțele de judecată acordă frecvent daune morale substanțiale pentru vătămări corporale grave sau deces, sume care pot depăși considerabil plafoanele minime prevăzute de normele metodologice.
              </div>
              <div className="p-4 rounded-xl bg-muted/40 border border-border/40">
                <span className="font-semibold text-foreground block mb-1">Plafoane Suplimentare Voluntare:</span>
                Recomandăm medicilor din specialități invazive și clinicilor private suplimentarea limitelor minime cu sume asigurate voluntare adecvate (ex: 100.000 – 500.000+ EUR) pentru o protecție reală.
              </div>
            </div>
          </div>

          {/* 4. Ce Acoperă Polița & Cheltuieli Juridice */}
          <div className="mb-24 glass rounded-[2.5rem] p-8 sm:p-12 border border-border/60">
            <h2 className="text-3xl font-heading font-bold mb-4 text-center text-foreground">
              Obiectul Acoperirii & Structura Despăgubirilor
            </h2>
            <p className="text-muted-foreground text-center text-sm sm:text-base mb-10 max-w-2xl mx-auto">
              O poliță completă de malpraxis medical include următoarele componente fundamentale:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-card border border-border/60 space-y-3">
                <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-500 w-fit">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-foreground text-base">Despăgubiri Civile Pacienți</h4>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Compensarea prejudiciilor materiale (cheltuieli medicale, tratamente reparatorii, pierderi de venit) și a daunelor morale stabilite pe cale amiabilă sau prin hotărâre judecătorească definitivă.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-card border border-border/60 space-y-3">
                <div className="p-3 rounded-xl bg-blue-500/10 text-blue-500 w-fit">
                  <Scale className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-foreground text-base">Cheltuieli de Judecată & Apărare</h4>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Onorariile avocaților de apărare în procesele civile și penale, taxele judiciare de timbru și cheltuielile stabilite în sarcina asiguratului.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-card border border-border/60 space-y-3">
                <div className="p-3 rounded-xl bg-purple-500/10 text-purple-500 w-fit">
                  <FileCheck2 className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-foreground text-base">Expertize Medico-Legale</h4>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Costurile aferente rapoartelor de expertiză medico-legală (INML / Comisia Superioară Medico-Legală) necesare pentru clarificarea culpei medicale.
                </p>
              </div>
            </div>
          </div>

          {/* 5. Mecanisme Tehnice: Data Retroactivă & Excluderi */}
          <div className="mb-24 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-3xl bg-card border border-border/60 space-y-4">
              <h3 className="text-xl font-heading font-bold text-foreground flex items-center gap-2">
                <FileCheck2 className="w-6 h-6 text-emerald-500" />
                Data Retroactivă & Continuitatea Poliței
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Polițele de malpraxis sunt emise pe principiul 'Claims-Made' sau 'Occurrence'. La reînnoirea contractului sau schimbarea asiguratorului, este imperativ:
              </p>
              <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Să se preia <strong>data retroactivă inițială</strong> pentru a nu lăsa descoperite actele medicale efectuate în anii anteriori.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Să se evite orice perioadă de întrerupere între polițe.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Să se solicite o clauză de <strong>perioadă extinsă de notificare (Run-off)</strong> la pensionare sau încetarea activității medicale.</span>
                </li>
              </ul>
            </div>

            <div className="p-8 rounded-3xl bg-card border border-border/60 space-y-4">
              <h3 className="text-xl font-heading font-bold text-foreground flex items-center gap-2">
                <AlertTriangle className="w-6 h-6 text-amber-500" />
                Excluderi Specifice în Asigurarea de Malpraxis
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Asigurarea nu oferă acoperire în următoarele situații:
              </p>
              <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0" />
                  <span>Acte medicale efectuate în afara specialității, competențelor sau atestatelor autorizate oficial.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0" />
                  <span>Practicarea medicinei sub influența alcoolului, substanțelor psihoactive sau fără aviz valid de liberă practică.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0" />
                  <span>Proceduri experimentale neautorizate de comisiile de etică și autoritățile sanitare competente.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0" />
                  <span>Lipsa consimțământului informat scris al pacientului (cu excepția cazurilor de urgență vitală).</span>
                </li>
              </ul>
            </div>
          </div>

          {/* 6. Interlinks */}
          <div className="mb-24 p-8 rounded-3xl bg-muted/40 border border-border/60">
            <h3 className="text-lg font-heading font-bold mb-4 text-foreground">
              Soluții Complementare pentru Domeniul Medical
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
              <Link href="/servicii/business-cyber-insurance" className="p-4 rounded-xl bg-card border border-border/60 hover:border-border transition-colors block">
                <span className="font-semibold text-foreground block mb-1">Cyber Risk pentru Clinici &rarr;</span>
                <span className="text-muted-foreground">Protecția bazelor de date medicale și a fișelor pacienților.</span>
              </Link>
              <Link href="/servicii/business-directors-liability" className="p-4 rounded-xl bg-card border border-border/60 hover:border-border transition-colors block">
                <span className="font-semibold text-foreground block mb-1">D&O Manageri Spitale/Clinici &rarr;</span>
                <span className="text-muted-foreground">Răspunderea administratorilor și directorilor medicali.</span>
              </Link>
              <Link href="/verifica-polita" className="p-4 rounded-xl bg-card border border-border/60 hover:border-border transition-colors block">
                <span className="font-semibold text-foreground block mb-1">Verificare Poliță Malpraxis &rarr;</span>
                <span className="text-muted-foreground">Audit al sumelor asigurate și termenilor de despăgubire.</span>
              </Link>
            </div>
          </div>

          {/* 7. Formular Contact */}
          <div id="oferta" className="scroll-mt-24">
            <div className="text-center max-w-xl mx-auto mb-10">
              <h2 className="text-3xl font-heading font-bold mb-3 text-foreground">
                Solicită Ofertă Personalizată Malpraxis
              </h2>
              <p className="text-muted-foreground text-sm">
                Completează datele profesionale sau ale clinicii pentru o cotație optimizată conform specialității tale.
              </p>
            </div>
            <ContactForm target="Malpraxis Medical" />
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
