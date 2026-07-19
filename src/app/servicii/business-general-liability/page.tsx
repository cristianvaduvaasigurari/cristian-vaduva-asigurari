import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ServicePageIntro } from "@/components/sections/service-page-intro";
import { ContactForm } from "@/components/sections/contact-form";
import { Scale, Info, Star, Users2, CheckCircle2, AlertTriangle, Lightbulb, MessageCircle, PhoneCall } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CONTACT } from "@/config/contact";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Asigurare Răspundere Civilă Generală | Cristian Văduva",
  description: "Scutul juridic al afacerii tale. Acoperă despăgubirile solicitate în instanță dacă activitatea ta a provocat răniri sau pagube materiale terților.",
};

export default function BusinessGeneralLiabilityPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <ServicePageIntro slug="business-general-liability" />
      
      <main className="flex-1 pt-32 pb-16">
        <div className="container mx-auto px-4 max-w-5xl">
          
          {/* 1. Hero Section */}
          <div className="mb-24 flex flex-col items-center text-center mx-auto">
            <div className="inline-flex p-5 rounded-lg glass text-slate-700 mb-8 border border-border bg-slate-50">
              <Scale className="w-12 h-12" />
            </div>
            <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6 leading-tight">
              Asigurarea de Răspundere Civilă Față de Terți
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-10 max-w-3xl">
              Când un client intră în magazinul tău, cade din cauza podelei umede și rămâne paralizat, cine îi plătește despăgubirile colosale cerute de avocați? "RCA-ul Afacerilor" transferă responsabilitatea civilă legală (și potențialul tău faliment în instanță) către compania de asigurări.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-xl" asChild>
                <Link href="#oferta">Construiește Scutul Juridic</Link>
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full border-border hover:bg-muted" asChild>
                <a href={CONTACT.whatsapp.href} target="_blank" rel="noopener noreferrer">
                  Discută Expunerea Legală
                </a>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
            {/* 2. Ce este această asigurare */}
            <div className="glass rounded-[3rem] p-10 border border-border/50 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-slate-500/5 rounded-full blur-[80px] -z-10" />
              <h2 className="text-3xl font-heading font-bold mb-6 flex items-center gap-3">
                <Info className="text-slate-500 w-8 h-8" />
                Mecanismul de Funcționare
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                Polița de Clădire despăgubește "pereții", cea de Bunuri despăgubește "marfa", însă Asigurarea de Răspundere (Liability) nu protejează NIMIC fizic din ce deții tu. Ea protejează exclusiv <strong>banii din conturile firmei tale</strong> de asaltul proceselor deschise de "Terți" (clienți, vizitatori, vecini).
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Legislația civilă spune clar: "Cel care cauzează altuia un prejudiciu dintr-o culpă sau neglijență, este obligat să îl repare". O greșeală stupidă a angajaților tăi poate genera vătămări corporale unui client sau daune majore proprietății unui vecin. Polița aceasta preia amenda civilă (plata daunelor).
              </p>
            </div>

            {/* 3. De ce este importantă */}
            <div className="glass rounded-[3rem] p-10 border border-border/50 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-[80px] -z-10" />
              <h2 className="text-3xl font-heading font-bold mb-6 flex items-center gap-3">
                <Star className="text-amber-500 w-8 h-8 fill-amber-500/20" />
                Biletul de Acces în Contracte Majore
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                Dacă ești o firmă de curățenie B2B (Cleaning) și vrei să semnezi un contract cu un mall gigant din București, juriștii mall-ului nu te lasă nici să treci de poartă fără ca tu să atașezi la contract o poliță de "Răspundere Generală" cu o limită uriașă (ex. 500.000 EUR).
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Ei știu că dacă omul tău de serviciu varsă cu mopul apă direct în serverul unui magazin IT din mall, SRL-ul tău mic nu are bani să acopere dauna. Polița aceasta devine așadar un <strong>pașaport comercial</strong> necesar pentru a intra în afaceri cu multinaționalele.
              </p>
            </div>
          </div>

          {/* 4. Cui i se adresează */}
          <div className="mb-24 glass rounded-[3rem] p-10 md:p-16 border border-emerald-500/10 relative overflow-hidden text-center">
            <h2 className="text-3xl font-heading font-bold mb-10 flex items-center justify-center gap-3">
              <Users2 className="text-emerald-500 w-8 h-8" />
              Categorii de expunere legală ridicată
            </h2>
            <div className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Absolut orice firmă înregistrată la ONRC are nevoie de ea, dar este obligatorie de facto pentru:
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto text-left">
              <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <h4 className="font-bold text-emerald-800 mb-2">Construcții / Renovări / Șantiere</h4>
                <p className="text-muted-foreground">Scapi o bucată de tencuială de la etajul 4 direct pe mașina luxoasă a unui trecător. Fără Răspundere Constructor, firma ta plătește reparația de zeci de mii de euro a mașinii terțe.</p>
              </div>
              <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <h4 className="font-bold text-emerald-800 mb-2">Comerț, HoReCa și Mall-uri</h4>
                <p className="text-muted-foreground">Orice spațiu în care au acces clienți din public. (Ex: Un client își prinde mâna grav în ușa rotativă a hotelului, cerând daune morale și operații la privat).</p>
              </div>
              <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <h4 className="font-bold text-emerald-800 mb-2">Chiriași de Spații Industriale (Producție)</h4>
                <p className="text-muted-foreground">Ai închiriat hala. Dacă un sudor de-al tău amorsează un incendiu care arde toată clădirea Landlord-ului, asigurătorul Landlord-ului te va da în judecată "în Regres" pe tine pentru despăgubiri, tu având nevoie de polița R.C. Chiriaș.</p>
              </div>
              <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <h4 className="font-bold text-emerald-800 mb-2">Firme de Mentenanță, Instalații, Paznici</h4>
                <p className="text-muted-foreground">Cei care lucrează "pe locațiile clienților". (Ex: Firma ta de pază lasă un obiect nesupravegheat și are loc un jaf masiv, sau instalatorul tău inundă clădirea premium de sub el).</p>
              </div>
            </div>
          </div>

          {/* 5. Beneficii */}
          <div className="mb-24">
            <h2 className="text-3xl font-heading font-bold mb-10 text-center">Avantajele Structurii Premium Generali</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="glass premium-card p-8 rounded-[2rem] border border-border">
                <CheckCircle2 className="w-8 h-8 text-slate-600 mb-6" />
                <h3 className="text-xl font-bold mb-3 text-foreground">Acoperirea Cheltuielilor de Judecată</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Când victima dă firma în judecată pe civil, simpla angajare a unei case de avocatură bune să apere compania te va costa o avere chiar și dacă vei câștiga procesul. Polița premium suportă taxele de timbru și onorariile de apărare în instanță aprobate.
                </p>
              </div>
              <div className="glass premium-card p-8 rounded-[2rem] border border-border">
                <CheckCircle2 className="w-8 h-8 text-slate-600 mb-6" />
                <h3 className="text-xl font-bold mb-3 text-foreground">Extensia "Fapta Prepușilor"</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Patronul este responsabil legal pentru incompetența angajaților (prepușilor) săi. Polița Generali protejează firma-mamă tocmai împotriva erorilor fatale făcute de orice angajat în timpul orelor de program la sediu.
                </p>
              </div>
              <div className="glass premium-card p-8 rounded-[2rem] border border-border">
                <CheckCircle2 className="w-8 h-8 text-slate-600 mb-6" />
                <h3 className="text-xl font-bold mb-3 text-foreground">Soluționare fără Tribunal (Amiabilă)</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Compania de asigurări preferă adesea să negocieze direct și în liniște cu victima accidentată în magazinul tău. Dacă pretențiile acestuia sunt îndreptățite și raționale, asigurarea îi plătește rapid o sumă agreată direct, scutindu-te de ani lungi de procese publice de defăimare a brandului.
                </p>
              </div>
            </div>
          </div>

          {/* 6. Ce riscuri acoperă */}
          <div className="mb-24 glass p-10 md:p-16 rounded-[3rem] border border-red-500/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 rounded-full blur-[80px] -z-10" />
            <h2 className="text-3xl font-heading font-bold mb-10 flex items-center justify-center gap-3">
              <AlertTriangle className="text-red-500 w-8 h-8" />
              Ce Despăgubește Exact Polița R.C.?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/50 border border-red-100 shadow-sm">
                <span className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0 font-bold">✕</span>
                <div>
                  <div className="font-bold text-foreground mb-1">Vătămări Corporale (Daune Morale și Fizice)</div>
                  <div className="text-sm text-muted-foreground">Acoperă zilele de spitalizare ale clientului tău, medicația, pierderea de venit a victimei din cauza incapacității și, la limită, daunele morale decise de judecător pentru suferința produsă.</div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/50 border border-red-100 shadow-sm">
                <span className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0 font-bold">✕</span>
                <div>
                  <div className="font-bold text-foreground mb-1">Daune Materiale Provocate Terților</div>
                  <div className="text-sm text-muted-foreground">Țeava ta de la baie a curs, a inundat apartamentul de lux al vecinului de la etajul inferior, distrugându-i biblioteca antică. Generali plătește direct renovarea locuinței vecinului de jos.</div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/50 border border-red-100 shadow-sm">
                <span className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0 font-bold">✕</span>
                <div>
                  <div className="font-bold text-foreground mb-1">Răspunderea Chiriașului (Tenant's Liability)</div>
                  <div className="text-sm text-muted-foreground">Specific: Oferă proprietarului clădirii unde tu ai sediul o garanție certă că dacă tu, ca și chiriaș, îi arzi pereții clădirii prin neglijență, asigurătorul tău îi va achita reparația (în loc să declari tu pur și simplu insolvență).</div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/50 border border-red-100 shadow-sm">
                <span className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0 font-bold">✕</span>
                <div>
                  <div className="font-bold text-foreground mb-1">Răspunderea Produsului (Extensie Specială)</div>
                  <div className="text-sm text-muted-foreground">Doar pentru producătorii de mărfuri (ex. Fabrici). Dacă scaunele pe care le produci se rup și vătămează clienții, sau alimentele (conservele) produse de tine îmbolnăvesc mii de oameni din cauză bacteriană ascunsă.</div>
                </div>
              </div>
            </div>
          </div>

          {/* 7. Exemple practice */}
          <div className="mb-24">
            <h2 className="text-3xl font-heading font-bold mb-10 text-center flex items-center justify-center gap-3">
              <Lightbulb className="text-amber-500 w-8 h-8" />
              Scutul la un pas de Catastrofă
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="glass premium-card p-8 rounded-[2rem] border-l-4 border-l-amber-500">
                <h3 className="text-xl font-bold mb-4 text-foreground">Scenariul 1: Iarna pe trotuar</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  O companie care deține o clădire istorică pe bulevard nu dezapezește țurțurii de la streașină. Un țurțure uriaș cade pe capul unui medic pieton, rănindu-l grav la nivel cervical, oprindu-l din a mai profesa medicina chirurgicală 6 luni.
                </p>
                <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-100">
                  <span className="font-bold text-amber-700">Rezolvarea poliței:</span> Avocații victimei cer instanței 200.000 EUR "pierderi de venit și spitalizare" de la firma proprietară a clădirii. Având Răspundere Civilă Față de Terți (ca proprietar), juriștii firmei au trimis direct notificarea din Tribunal către compania de asigurări care a asumat plata negocierilor gigantice, patronul nedând niciun ban.
                </div>
              </div>
              <div className="glass premium-card p-8 rounded-[2rem] border-l-4 border-l-amber-500">
                <h3 className="text-xl font-bold mb-4 text-foreground">Scenariul 2: Scara Muncitorilor</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Firma ta de instalatori montează reclame luminoase într-un mall. O scară metalică nu e asigurată bine și cade peste o zonă expozițională a altui magazin, distrugând aparatură electronică de display expusă la raft (TV-uri 8K).
                </p>
                <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-100">
                  <span className="font-bold text-amber-700">Rezolvarea poliței:</span> Magazinul vătămat te somează la plată 15.000 EUR reparații. Activezi dosarul poliței tale de "Răspundere a Activității" iar asigurătorul preia disputa și decontează factura bunurilor magazinului terț direct.
                </div>
              </div>
            </div>
          </div>

          {/* 8. De ce să alegi Generali România */}
          <div className="mb-24 glass rounded-[3rem] p-10 md:p-16 border border-border bg-[#c8102e]/5 text-center">
            <h2 className="text-3xl font-heading font-bold mb-10 text-[#c8102e]">Expertiza Juridică Internă</h2>
            <div className="text-lg text-muted-foreground mb-10 max-w-3xl mx-auto">
              Pe partea de polițe de răspundere (Liability), nu e destul să ai banii, e nevoie de avocați experți de parte asigurătorului care să stopeze abuzurile celor care cer daune imense firmei tale.
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              <div className="p-6 rounded-2xl bg-white border border-[#c8102e]/10 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-bold text-[#c8102e] mb-3 text-lg">Limite Internaționale Imense</h4>
                <p className="text-muted-foreground leading-relaxed">Multinaționalele sau contractele mari de stat necesită asigurări pe limite stratosferice (ex. Răspundere Generală cu limită 2 milioane Euro). Generali România are spatele reasigurătorului de a semna polițe de răspunderi gigantice cu ușurință.</p>
              </div>
              <div className="p-6 rounded-2xl bg-white border border-[#c8102e]/10 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-bold text-[#c8102e] mb-3 text-lg">Preluarea Dosarelor Abuzive</h4>
                <p className="text-muted-foreground leading-relaxed">Dacă firma ta este dată în judecată neîntemeiat pentru fapte pe care nu le-a comis (șantaj civil), noi avem dreptul de a ne subroga și a prelua apărarea ta în fața instanțelor împotriva reclamanților frauduloși.</p>
              </div>
              <div className="p-6 rounded-2xl bg-white border border-[#c8102e]/10 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-bold text-[#c8102e] mb-3 text-lg">Tailor-Made Wording (Flexibilitate)</h4>
                <p className="text-muted-foreground leading-relaxed">Nu ești băgat într-un PDF rigid. Contractele de Răspundere se "scriu" special pentru compania ta. Dacă vinzi artificii, includem niște paragrafe. Dacă vinzi ciment,cludem altele, perfect aliniate la Codul CAEN al firmei.</p>
              </div>
            </div>
          </div>

          {/* 9. FAQ */}
          <div className="mb-24">
            <h2 className="text-3xl font-heading font-bold mb-10 text-center">Întrebări Frecvente Juridice</h2>
            <div className="space-y-6 max-w-4xl mx-auto">
              <div className="glass premium-card p-6 md:p-8 rounded-2xl border border-border">
                <h3 className="text-xl font-bold mb-3 text-foreground">Sunt protejat dacă "fur" clienții altei firme și mă dă în judecată pentru daune materiale?</h3>
                <p className="text-muted-foreground leading-relaxed">NU! Răspunderea civilă GENERALĂ (General Liability) acoperă exclusiv daune fizice (Bodily Injury) sau pagube materiale pure distruse fizic (Property Damage) și daunele financiare *consecutive* acestora. Nu acoperă litigiile comerciale pure, furtul de proprietate intelectuală, neplata ratelor sau nerespectarea termenelor contractuale de predare a proiectului. Acolo te supui penalităților de contract comercial.</p>
              </div>
              <div className="glass premium-card p-6 md:p-8 rounded-2xl border border-border">
                <h3 className="text-xl font-bold mb-3 text-foreground">Angajatul meu de la producție își taie o mână la aparat. Polița R.C. despăgubește acest "terț"?</h3>
                <p className="text-muted-foreground leading-relaxed">Angajații proprii, aflați cu tine în contract de muncă, NU sunt "Terți" (adică străini). Ei fac parte din sfera de control a firmei tale (Răspundere a Angajatorului față de Angajat - Employers Liability) care necesită o Extensie specială sau un produs complet diferit denumit "Asigurare de Accidente a Angajaților / Răspunderea Angajatorului".</p>
              </div>
              <div className="glass premium-card p-6 md:p-8 rounded-2xl border border-border">
                <h3 className="text-xl font-bold mb-3 text-foreground">Cât costă să îmi fac o limită uriașă de 500.000 EUR (căci așa cere Mall-ul)?</h3>
                <p className="text-muted-foreground leading-relaxed">Este contra-intuitiv, dar Răspunderea Civilă este adesea foarte ieftină. Nu trebuie să ai banii "în cont". O poliță de 500.000 EUR pentru o firmă de consultanță IT unde riscul să lovească pe cineva fizic e minim, poate costa doar 150-200 EUR PE AN. Costul crește exponențial abia atunci când ești o firmă de macarele, unde riscul de tragedie este enorm.</p>
              </div>
            </div>
          </div>

        </div>

        {/* 11. Formular & 12. Contact Rapid */}
        <div id="oferta" className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold mb-4">Securizează Viitorul Firmei Tale</h2>
            <p className="text-xl text-muted-foreground">Un singur proces civil te poate costa tot profitul pe următorii 10 ani.</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <ContactForm customTitle="Cere Profil Răspundere (General Liability)" />
            </div>
            
            <div className="glass rounded-lg p-8 border border-border h-fit sticky top-32 shadow-lg">
              <h3 className="text-2xl font-bold font-heading mb-6">Pregătirea Ofertei</h3>
              <p className="text-muted-foreground mb-8">
                Deoarece calculul se face prin analiza de risc a industriei, avem nevoie de doar două cifre la prima vedere: Codul CAEN (activitatea) și Cifra de Afaceri estimată (Rulajul / Turnover).
              </p>
              
              <div className="space-y-6">
                <a href={CONTACT.whatsapp.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-2xl bg-green-50 border border-green-200 hover:bg-green-100 transition-colors group">
                  <div className="w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm text-green-700 font-medium">Trimite CUI-ul pe WhatsApp</div>
                    <div className="font-bold text-foreground">{CONTACT.whatsapp.display}</div>
                  </div>
                </a>

                <a href={CONTACT.phone.href} className="flex items-center gap-4 p-4 rounded-2xl bg-blue-50 border border-blue-200 hover:bg-blue-100 transition-colors group">
                  <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                    <PhoneCall className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm text-blue-700 font-medium">Departament Liability</div>
                    <div className="font-bold text-foreground">{CONTACT.phone.display}</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
