import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ServicePageIntro } from "@/components/sections/service-page-intro";
import { ContactForm } from "@/components/sections/contact-form";
import { 
  FileText, 
  Info, 
  Star, 
  Users2, 
  CheckCircle2, 
  AlertTriangle, 
  Scale, 
  Code, 
  Compass, 
  Briefcase, 
  FileCheck2 
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Asigurare Răspundere Profesională (PI / E&O) | Cristian Văduva",
  description:
    "Consultanță de asigurare pentru răspundere profesională (Professional Indemnity / Errors & Omissions). Protecție împotriva prejudiciilor financiare cauzate de erori, omisiuni sau neglijență în IT, arhitectură, inginerie, contabilitate și consultanță.",
};

export default function BusinessProfessionalLiabilityPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col selection:bg-blue-600 selection:text-white">
      <Navbar />
      <ServicePageIntro slug="business-professional-liability" />
      
      <main className="flex-1 pt-32 pb-16">
        <div className="container mx-auto px-4 max-w-5xl">
          
          {/* 1. Hero Section */}
          <div className="mb-24 flex flex-col items-center text-center mx-auto">
            <div className="inline-flex p-5 rounded-2xl glass text-purple-500 mb-8 border border-border bg-purple-500/10">
              <FileText className="w-12 h-12" />
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold mb-6 leading-tight text-foreground">
              Răspunderea Profesională (PI / E&O)
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-10 max-w-3xl">
              Când activitatea ta constă în furnizarea de consultanță, expertiză tehnică, proiectare sau dezvoltare software, o eroare, o omisiune sau o întârziere neintenționată poate produce prejudicii financiare majore clienților tăi. Polița de Răspundere Profesională (Professional Indemnity) acoperă despăgubirile financiare și costurile de apărare juridică rezultate din exercitarea profesiei.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="h-14 px-8 text-base font-semibold rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-xl" asChild>
                <Link href="#oferta">Solicită Ofertă Răspundere Profesională</Link>
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-base rounded-full border-border hover:bg-muted" asChild>
                <Link href="/verifica-polita">
                  Audit Clauze PI
                </Link>
              </Button>
            </div>
          </div>

          {/* 2. Distincție Tehnică: General Liability vs. Professional Liability */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
            <div className="glass rounded-[2.5rem] p-8 sm:p-10 border border-border/60 relative overflow-hidden">
              <h2 className="text-2xl font-heading font-bold mb-5 flex items-center gap-3 text-foreground">
                <Briefcase className="text-blue-500 w-7 h-7" />
                Răspunderea Civilă Generală (General Liability)
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
                Acoperă daune corporale produse terților (accidente fizice la sediul firmei) și distrugeri materiale de bunuri fizice.
              </p>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                <strong>Nu acoperă:</strong> Pierderi financiare pure (pure financial loss), erori de calcul în proiecte de inginerie, bug-uri software în aplicații critice sau greșeli de raportare fiscală.
              </p>
            </div>

            <div className="glass rounded-[2.5rem] p-8 sm:p-10 border border-border/60 relative overflow-hidden">
              <h2 className="text-2xl font-heading font-bold mb-5 flex items-center gap-3 text-foreground">
                <FileCheck2 className="text-purple-500 w-7 h-7" />
                Răspunderea Profesională (Professional Indemnity)
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
                Polița PI / E&O (Errors & Omissions) este concepută special pentru a acoperi <strong>prejudiciile financiare pure</strong> cauzate clienților din cauza unei greșeli intelectuale, a unui sfat tehnic eronat sau a nerespectării specificațiilor contractuale.
              </p>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Include onorariile avocaților de apărare, expertizele tehnice independente și despăgubirile financiare datorate clientului prejudiciat.
              </p>
            </div>
          </div>

          {/* 3. Profesii Acoperite & Exemple de Risc */}
          <div className="mb-24 glass rounded-[2.5rem] p-8 sm:p-12 border border-border/60">
            <h2 className="text-3xl font-heading font-bold mb-4 text-center text-foreground">
              Domenii Profesionale & Profiluri Specifice de Risc
            </h2>
            <p className="text-muted-foreground text-center text-sm sm:text-base mb-10 max-w-2xl mx-auto">
              Fiecare profesie prezintă o dinamică specifică a răspunderii, necesitând clauze adaptate:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-card border border-border/60 space-y-3">
                <div className="p-3 rounded-xl bg-purple-500/10 text-purple-500 w-fit">
                  <Code className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-foreground text-base">IT, Dezvoltare Software & Cloud</h4>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Defecțiuni în codul sursă ce duc la oprirea sistemelor clientului, nerespectarea termenelor de livrare (Service Level Agreement), încălcarea drepturilor de proprietate intelectuală (IP infringement) sau pierderi de date.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-card border border-border/60 space-y-3">
                <div className="p-3 rounded-xl bg-blue-500/10 text-blue-500 w-fit">
                  <Compass className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-foreground text-base">Arhitectură & Inginerie de Structură</h4>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Erori de calcul structural, deficiențe în proiectarea tehnică a clădirilor sau instalațiilor, nerespectarea normativelor de construcție și întârzieri costisitoare pe șantier generate de revizuirea planurilor.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-card border border-border/60 space-y-3">
                <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-500 w-fit">
                  <Scale className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-foreground text-base">Contabilitate, Audit & Consultanță Fiscală</h4>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Erori în întocmirea declarațiilor fiscale sau a situațiilor financiare anuale, omisiuni de raportare ce atrag amenzi de la autoritățile fiscale și calcule greșite în procese de audit financiar.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-card border border-border/60 space-y-3">
                <div className="p-3 rounded-xl bg-amber-500/10 text-amber-500 w-fit">
                  <Briefcase className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-foreground text-base">Consultanță de Management & Afaceri</h4>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Recomandări strategice greșite, analize de piață eronate sau deficiențe în gestionarea proiectelor de transformare organizațională care produc pierderi financiare directe clientului.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-card border border-border/60 space-y-3">
                <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-500 w-fit">
                  <FileText className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-foreground text-base">Avocați & Servicii Juridice</h4>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Depășirea termenelor de decădere procedurală, erori în redactarea contractelor sau redactarea defectuoasă a actelor constitutive în tranzacții comerciale.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-card border border-border/60 space-y-3">
                <div className="p-3 rounded-xl bg-rose-500/10 text-rose-500 w-fit">
                  <Users2 className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-foreground text-base">Brokeraj Imobiliar & Evaluatori ANEVAR</h4>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Evaluări patrimoniale incorecte, omisiunea verificării sarcinilor din cartea funciară sau vicii de informare a părților în tranzacții imobiliare de mare valoare.
                </p>
              </div>
            </div>
          </div>

          {/* 4. Aspecte Contractuale & Condiții Cheie */}
          <div className="mb-24 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-3xl bg-card border border-border/60 space-y-4">
              <h3 className="text-xl font-heading font-bold text-foreground flex items-center gap-2">
                <FileCheck2 className="w-6 h-6 text-purple-500" />
                Corelarea Activității Declarate cu Contractele Reale
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Polița de răspundere profesională acoperă strict activitățile descrise în chestionarul de asigurare și specificate în contract.
              </p>
              <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>Descrierea activității:</strong> Dacă o firmă de IT oferă și consultanță hardware sau audit de securitate, aceste activități trebuie menționate expres în poliță.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>Acoperirea subcontractanților:</strong> Asigurarea poate fi extinsă pentru a acoperi răspunderea companiei pentru activitatea colaboratorilor independenți (freelanceri).</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>Limita teritorială și jurisdicția:</strong> Pentru contracte internaționale, este vitală extinderea la nivelul Uniunii Europene sau la nivel mondial (cu mențiuni specifice pentru SUA/Canada).</span>
                </li>
              </ul>
            </div>

            <div className="p-8 rounded-3xl bg-card border border-border/60 space-y-4">
              <h3 className="text-xl font-heading font-bold text-foreground flex items-center gap-2">
                <AlertTriangle className="w-6 h-6 text-amber-500" />
                Excluderi Standard în Polițele PI / E&O
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Aspecte care nu fac obiectul acoperirii:
              </p>
              <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0" />
                  <span>Neexecutarea cu intenție a contractului sau refuzul nejustificat de a livra serviciul contractat.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0" />
                  <span>Garanții comerciale nerealiste sau penalități contractuale punitive asumate voluntar peste cadrul legal.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0" />
                  <span>Depășiri de buget comercial asumate pe riscul propriu al prestatorului.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0" />
                  <span>Pretenții formulate pentru fapte cunoscute anterior datei retroactive specificate în poliță.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* 5. Interlinks */}
          <div className="mb-24 p-8 rounded-3xl bg-muted/40 border border-border/60">
            <h3 className="text-lg font-heading font-bold mb-4 text-foreground">
              Pachete Corporate Complementare
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
              <Link href="/servicii/business-cyber-insurance" className="p-4 rounded-xl bg-card border border-border/60 hover:border-border transition-colors block">
                <span className="font-semibold text-foreground block mb-1">Cyber Risk B2B &rarr;</span>
                <span className="text-muted-foreground">Acoperire dedicată pentru breșe de securitate și ransomware.</span>
              </Link>
              <Link href="/servicii/business-directors-liability" className="p-4 rounded-xl bg-card border border-border/60 hover:border-border transition-colors block">
                <span className="font-semibold text-foreground block mb-1">Răspunderea Administratorilor (D&O) &rarr;</span>
                <span className="text-muted-foreground">Protecția personală a managementului executiv.</span>
              </Link>
              <Link href="/verifica-polita" className="p-4 rounded-xl bg-card border border-border/60 hover:border-border transition-colors block">
                <span className="font-semibold text-foreground block mb-1">Audit Poliță PI &rarr;</span>
                <span className="text-muted-foreground">Verifică compatibilitatea poliței cu cerințele clienților tăi corporate.</span>
              </Link>
            </div>
          </div>

          {/* 6. Formular Contact */}
          <div id="oferta" className="scroll-mt-24">
            <div className="text-center max-w-xl mx-auto mb-10">
              <h2 className="text-3xl font-heading font-bold mb-3 text-foreground">
                Solicită o Ofertă de Răspundere Profesională
              </h2>
              <p className="text-muted-foreground text-sm">
                Completează specificul serviciilor prestate pentru o structurare corectă a limitelor de răspundere și a extinderilor teritoriale.
              </p>
            </div>
            <ContactForm target="Răspundere Profesională (PI/E&O)" />
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
