import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ServicePageIntro } from "@/components/sections/service-page-intro";
import { ContactForm } from "@/components/sections/contact-form";
import { 
  Shield, 
  Info, 
  Star, 
  Users2, 
  CheckCircle2, 
  AlertTriangle, 
  Lightbulb, 
  PhoneCall, 
  Lock, 
  FileCheck2, 
  ArrowRight,
  Server,
  Scale
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CONTACT } from "@/config/contact";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Asigurare Cyber Risk & Conformitate NIS2 B2B | Cristian Văduva",
  description:
    "Consultanță de asigurare pentru riscuri cibernetice (Cyber Risk), atacuri ransomware, breșe de date GDPR și întreruperea afacerii. Clarificarea distincției dintre transferul de risc prin asigurare și obligațiile de conformitate NIS2.",
};

export default function BusinessCyberInsurancePage() {
  return (
    <div className="min-h-screen bg-background flex flex-col selection:bg-blue-600 selection:text-white">
      <Navbar />
      <ServicePageIntro slug="business-cyber-insurance" />
      
      <main className="flex-1 pt-32 pb-16">
        <div className="container mx-auto px-4 max-w-5xl">
          
          {/* 1. Hero Section */}
          <div className="mb-24 flex flex-col items-center text-center mx-auto">
            <div className="inline-flex p-5 rounded-2xl glass text-cyan-500 mb-8 border border-border bg-cyan-500/10">
              <Shield className="w-12 h-12" />
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold mb-6 leading-tight text-foreground">
              Asigurarea Riscurilor Cibernetice (Cyber Risk)
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-10 max-w-3xl">
              Incidentele de securitate cibernetică reprezintă riscuri operaționale, financiare, juridice și reputaționale majore. De la atacuri ransomware și breșe de date confidențiale, până la întreruperea activității comerciale (Business Interruption), o poliță dedicată de Cyber Risk oferă transfer financiar de risc și asistență specializată în gestionarea crizei.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="h-14 px-8 text-base font-semibold rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-xl" asChild>
                <Link href="#oferta">Solicită Evaluare Cyber Risk</Link>
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-base rounded-full border-border hover:bg-muted" asChild>
                <Link href="/verifica-polita">
                  Audit Poliță Existentă
                </Link>
              </Button>
            </div>
          </div>

          {/* 2. NIS2 COMPLIANCE MANDATORY NOTICE (CRITICAL LEGAL DISTINCTION) */}
          <div className="mb-20 p-8 rounded-3xl bg-blue-950/20 border border-blue-500/30 text-card-foreground relative overflow-hidden">
            <div className="flex items-start gap-4">
              <Scale className="w-8 h-8 text-blue-400 shrink-0 mt-1" />
              <div className="space-y-3">
                <h3 className="text-xl font-heading font-bold text-foreground flex items-center gap-2">
                  Directiva NIS2 vs. Asigurarea Cyber Risk: Distincție Juridică Esențială
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <strong>Polița de asigurare Cyber Risk nu înlocuiește conformitatea cu Directiva Europeană NIS2</strong> (transpusă în legislația națională privind securitatea rețelelor și a sistemelor informatice) și nu exonerează compania de obligațiile legale de implementare a măsurilor tehnice și organizatorice obligatorii.
                </p>
                <ul className="text-xs sm:text-sm text-muted-foreground space-y-1.5 pl-4 list-disc">
                  <li><strong>NIS2 este o obligație legală și operațională de securitate:</strong> Impune audituri, politici stricte de gestionare a incidentelor, criptare, autentificare multi-factor (MFA) și raportare obligatorie către autoritățile competente (ex: DNSC / CSIRT).</li>
                  <li><strong>Cyber Insurance este un instrument financiar de transfer al riscului rezidual:</strong> Acoperă pierderile financiare proprii, costurile de investigație forensic, apărarea juridică și răspunderea civilă față de terți, sub rezerva termenilor și condițiilor din contractul de asigurare.</li>
                  <li><strong>Nicio poliță de asigurare nu poate garanta conformitatea reglementară</strong> și nu poate acoperi amenzi administrative sau sancțiuni penale acolo unde legea interzice expres asigurarea acestora.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 3. Tipuri de Incidente & Natura Riscului */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
            <div className="glass rounded-[2.5rem] p-8 sm:p-10 border border-border/60 relative overflow-hidden">
              <h2 className="text-2xl font-heading font-bold mb-5 flex items-center gap-3 text-foreground">
                <Server className="text-cyan-500 w-7 h-7" />
                Natura Riscurilor Digitale Moderne
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
                Polițele tradiționale de bunuri corporale (incendiu, trăsnet, explozie) exclud în mod explicit activele intangibile și daunele produse de atacuri informatice. Dacă un atac de tip Phishing sau Malware criptează bazele de date sau blochează serverele ERP, dauna este exclusiv digitală și operațională.
              </p>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Polița Cyber Risk intervine punctual atunci când vectorul incidentului este un cod malițios, un atac de negare a serviciului (DDoS), o eroare umană internă de operare sau o intruziune neautorizată în rețeaua IT.
              </p>
            </div>

            <div className="glass rounded-[2.5rem] p-8 sm:p-10 border border-border/60 relative overflow-hidden">
              <h2 className="text-2xl font-heading font-bold mb-5 flex items-center gap-3 text-foreground">
                <Lock className="text-amber-500 w-7 h-7" />
                Răspunderea Legală & GDPR
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
                În cazul unei breșe de securitate în care datele cu caracter personal ale clienților, partenerilor sau angajaților sunt compromise ori exfiltrate, compania intră sub incidența Regulamentului General privind Protecția Datelor (GDPR / Regulamentul UE 2016/679).
              </p>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Polița Cyber pune la dispoziție o echipă de intervenție de urgență (Incident Response Team): experți în investigații digitale (IT Forensics) pentru izolarea breșei, consultanți juridici pentru notificarea autorității de supraveghere (ANSPDCP) în termenul legal de 72 de ore și specialiști în comunicare de criză.
              </p>
            </div>
          </div>

          {/* 4. Spectru de Acoperire & Module de Protecție */}
          <div className="mb-24 glass rounded-[2.5rem] p-8 sm:p-12 border border-border/60">
            <h2 className="text-3xl font-heading font-bold mb-4 text-center text-foreground">
              Module Principale de Acoperire Cyber Risk
            </h2>
            <p className="text-muted-foreground text-center text-sm sm:text-base mb-10 max-w-2xl mx-auto">
              Structura acoperirii depinde de profilul companiei, controalele de securitate existente și formularea specifică a poliței emise de asigurator:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-card border border-border/60 space-y-3">
                <div className="p-3 rounded-xl bg-blue-500/10 text-blue-500 w-fit">
                  <Shield className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-foreground text-base">Cheltuieli de Răspuns la Incident</h4>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Onorariile experților IT Forensics, costurile de restaurare a datelor din copii de siguranță (back-up), consultanță juridică specializată și servicii de relații publice.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-card border border-border/60 space-y-3">
                <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-500 w-fit">
                  <Server className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-foreground text-base">Întreruperea Afacerii (Business Interruption)</h4>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Compensarea pierderii de profit net și a cheltuielilor fixe de funcționare (salarii, chirii) pe durata indisponibilității sistemelor IT, după expirarea perioadei de așteptare agreate (Waiting Period).
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-card border border-border/60 space-y-3">
                <div className="p-3 rounded-xl bg-amber-500/10 text-amber-500 w-fit">
                  <Lock className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-foreground text-base">Șantaj & Extorcare Cibernetică</h4>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Consultanță de negociere de criză și rambursarea costurilor de atenuare a extorcării, exclusiv în limitele și condițiile permise de cadrul legal aplicabil.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-card border border-border/60 space-y-3">
                <div className="p-3 rounded-xl bg-purple-500/10 text-purple-500 w-fit">
                  <Scale className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-foreground text-base">Răspundere Civilă Față de Terți</h4>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Despăgubiri și cheltuieli de apărare juridică pentru cererile de despăgubire formulate de clienți sau parteneri afectați de transmiterea involuntară de malware sau de scurgerea de date.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-card border border-border/60 space-y-3">
                <div className="p-3 rounded-xl bg-rose-500/10 text-rose-500 w-fit">
                  <FileCheck2 className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-foreground text-base">Investigații Administrative & Amenzi</h4>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Acoperirea costurilor de asistență juridică în cadrul investigațiilor desfășurate de autoritățile de protecție a datelor, în măsura în care legea permite asigurarea acestor costuri.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-card border border-border/60 space-y-3">
                <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-500 w-fit">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-foreground text-base">Fraudă Electronică & Social Engineering</h4>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Extindere opțională pentru transferul neautorizat de fonduri cauzat de tehnici de tip 'Fake President Fraud' sau interceptare de facturi prin email (Business Email Compromise).
                </p>
              </div>
            </div>
          </div>

          {/* 5. Clauze Tehnice & Condiții Critice de Verificat */}
          <div className="mb-24 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-3xl bg-card border border-border/60 space-y-4">
              <h3 className="text-xl font-heading font-bold text-foreground flex items-center gap-2">
                <FileCheck2 className="w-6 h-6 text-blue-500" />
                Condiții de Subscriere & Eligibilitate Tehnică
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Asiguratorii analizează maturitatea măsurilor de securitate cibernetică înainte de emiterea unei oferte. Cerințele uzuale includ:
              </p>
              <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Autentificare multi-factor (MFA) obligatorie pentru acces la distanță, VPN și conturi administrative.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Copii de siguranță (Backup) offline sau imutabile, testate periodic pentru restaurare rapidă.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Soluții de protecție Endpoint Detection & Response (EDR) pe toate stațiile și serverele.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Instruirea periodică a angajaților împotriva tentativelor de phishing și inginerie socială.</span>
                </li>
              </ul>
            </div>

            <div className="p-8 rounded-3xl bg-card border border-border/60 space-y-4">
              <h3 className="text-xl font-heading font-bold text-foreground flex items-center gap-2">
                <AlertTriangle className="w-6 h-6 text-amber-500" />
                Excluderi și Limite Comune în Polițele Cyber
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Aspecte care trebuie verificate în formularea exactă a contractului:
              </p>
              <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0" />
                  <span><strong>Data retroactivă (Retroactive Date):</strong> Incidentele inițiate înainte de data retroactivă specificată în contract sunt excluse.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0" />
                  <span><strong>Perioada de așteptare (Waiting Period):</strong> Întreruperea afacerii se despăgubește doar după un număr minim de ore de indisponibilitate (uzual 8–12 ore).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0" />
                  <span><strong>Război cibernetic și atacuri sponsorizate de state (Cyber Warfare):</strong> Clauzele de excludere a războiului sunt adesea supuse unor formulări specifice ale pieței internaționale.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0" />
                  <span><strong>Sisteme neactualizate (End-of-Life / Unpatched):</strong> Sisteme de operare nesuportate oficial pentru care nu s-au aplicat corecții de securitate.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* 6. Interlinks to other business areas */}
          <div className="mb-24 p-8 rounded-3xl bg-muted/40 border border-border/60">
            <h3 className="text-lg font-heading font-bold mb-4 text-foreground">
              Polițe Complementare de Răspundere Comercială
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
              <Link href="/servicii/business-directors-liability" className="p-4 rounded-xl bg-card border border-border/60 hover:border-border transition-colors block">
                <span className="font-semibold text-foreground block mb-1">Răspunderea Managerilor (D&O) &rarr;</span>
                <span className="text-muted-foreground">Protecția deciziilor executive și a patrimoniului personal al administratorilor.</span>
              </Link>
              <Link href="/servicii/business-professional-liability" className="p-4 rounded-xl bg-card border border-border/60 hover:border-border transition-colors block">
                <span className="font-semibold text-foreground block mb-1">Răspundere Profesională (PI/E&O) &rarr;</span>
                <span className="text-muted-foreground">Erori și omisiuni în servicii IT, consultanță sau arhitectură.</span>
              </Link>
              <Link href="/verifica-polita" className="p-4 rounded-xl bg-card border border-border/60 hover:border-border transition-colors block">
                <span className="font-semibold text-foreground block mb-1">Audit Poliță Business &rarr;</span>
                <span className="text-muted-foreground">Verifică franșizele și termenii din contractul tău curent de asigurare.</span>
              </Link>
            </div>
          </div>

          {/* 7. Formular Contact */}
          <div id="oferta" className="scroll-mt-24">
            <div className="text-center max-w-xl mx-auto mb-10">
              <h2 className="text-3xl font-heading font-bold mb-3 text-foreground">
                Solicită o Ofertă Personalizată Cyber Risk
              </h2>
              <p className="text-muted-foreground text-sm">
                Completează datele companiei pentru o analiză confidențială a expunerii digitale și a opțiunilor disponibile de asigurare.
              </p>
            </div>
            <ContactForm target="Cyber Risk B2B" />
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
