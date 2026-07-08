import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ContactForm } from "@/components/sections/contact-form";
import { Stethoscope, FileText, Info, Star, Users2, CheckCircle2, AlertTriangle, Lightbulb, MessageCircle, PhoneCall } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CONTACT } from "@/config/contact";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Asigurare Răspundere Profesională | Cristian Văduva",
  description: "Erorile costă. Asigură-te împotriva proceselor civile pentru neglijență în profesii precum medicină (malpraxis), avocatură, IT, contabilitate și consultanță.",
};

export default function BusinessProfessionalLiabilityPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-16">
        <div className="container mx-auto px-4 max-w-5xl">
          
          {/* 1. Hero Section */}
          <div className="mb-24 flex flex-col items-center text-center mx-auto">
            <div className="inline-flex p-5 rounded-3xl glass text-purple-600 mb-8 border border-border bg-purple-50">
              <FileText className="w-12 h-12" />
            </div>
            <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6 leading-tight">
              Asigurarea de Răspundere Profesională (PI/Malpraxis)
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-10 max-w-3xl">
              Când produsul pe care îl vinzi este "Inteligența sau Sfatul Tău" – o simplă eroare de judecată (calcul greșit, sfat nociv, eroare de cod informatic) poate distruge financiar clientul tău. Protejează-ți biroul de procesele colosale intentate pentru neglijență profesională.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-xl" asChild>
                <Link href="#oferta">Auditează Riscul Biroului Tău</Link>
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full border-border hover:bg-muted" asChild>
                <a href={CONTACT.whatsapp.href} target="_blank" rel="noopener noreferrer">
                  Discută Acoperirea PI
                </a>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
            {/* 2. Ce este această asigurare */}
            <div className="glass rounded-[3rem] p-10 border border-border/50 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-[80px] -z-10" />
              <h2 className="text-3xl font-heading font-bold mb-6 flex items-center gap-3">
                <Info className="text-blue-500 w-8 h-8" />
                "General Liability" vs "Professional Liability"
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                Există o confuzie uriașă în piață. Dacă un client vine la tine în birou de contabilitate, alunecă pe parchet și își rupe mâna, te va da în judecată iar dauna va fi plătită de polița de "Răspundere GENERALĂ".
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                DAR... dacă nu alunecă pe parchet, dar tu introduci o cifră greșită în bilanțul lui și îi atragi o amendă fiscală uriașă de la ANAF? Acesta e prejudiciu strict prin <strong>greșeală intelectuală</strong> (eroare tehnică/omisivă de consultanță). Acest prejudiciu intelectual se acoperă DOAR de Răspunderea PROFESIONALĂ (cunoscută global ca PI - Professional Indemnity sau E&O - Errors and Omissions).
              </p>
            </div>

            {/* 3. De ce este importantă */}
            <div className="glass rounded-[3rem] p-10 border border-border/50 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-[80px] -z-10" />
              <h2 className="text-3xl font-heading font-bold mb-6 flex items-center gap-3">
                <Star className="text-amber-500 w-8 h-8 fill-amber-500/20" />
                Scutul împotriva Litigiilor B2B
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                Spre deosebire de daunele fizice cu sume limitate, daunele financiare pot fi infinite. Dacă arhitectul tău greșește proiectul structurii, un dezvoltator poate pierde o investiție de sute de milioane pentru că acea clădire nu va lua avizele de stabilitate.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Niciun expert inteligent din România sau din lume nu mai livrează servicii de consultanță (B2B sau B2C) fără să aibă o poliță activă ("Malpraxis"). În majoritatea meseriilor din corpurile experților, această poliță este condiția legală OBLIGATORIE pentru obținerea dreptului de practică (Viza Anuală).
              </p>
            </div>
          </div>

          {/* 4. Cui i se adresează */}
          <div className="mb-24 glass rounded-[3rem] p-10 md:p-16 border border-emerald-500/10 relative overflow-hidden text-center">
            <h2 className="text-3xl font-heading font-bold mb-10 flex items-center justify-center gap-3">
              <Users2 className="text-emerald-500 w-8 h-8" />
              Profesii supuse stresului Răspunderii
            </h2>
            <div className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Instrumentul este o obligație legală sau comercială pentru oricine oferă "expertiză":
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto text-left">
              <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <h4 className="font-bold text-emerald-800 mb-2 flex items-center gap-2"><Stethoscope className="w-5 h-5"/> Medici și Personal Medical (Malpraxis)</h4>
                <p className="text-muted-foreground">Obligație de lege de bază pentru medici, farmaciști, asistenți (spitale, clinici sau cabinete de stomatologie private) pentru erori și erori letale în actul medical.</p>
              </div>
              <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <h4 className="font-bold text-emerald-800 mb-2">IT, Software Developers și Cyber</h4>
                <p className="text-muted-foreground">Scrii un software pentru o bancă. Produsul are un "bug" ascuns. Banca intră în colaps 2 ore și pierde tranzacții. Vei fi dat în judecată de corporație pentru Erori Profesionale (Tech PI).</p>
              </div>
              <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <h4 className="font-bold text-emerald-800 mb-2">Arhitecți, Ingineri, Proiectanți Civili</h4>
                <p className="text-muted-foreground">Orice eroare ascunsă în designul podurilor, hărților topografice sau clădirilor de birouri (dacă grinzi de oțel sunt prea subțiri pe deviz) este preluată de asigurare.</p>
              </div>
              <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <h4 className="font-bold text-emerald-800 mb-2">Contabili, Experți CECCAR, Avocați, Brokeri</h4>
                <p className="text-muted-foreground">Obligație prin statutul profesional. Erori din neatenție în dosare, ratarea unui termen la tribunal pentru client sau declarații ANAF cu întârziere care atrag penalități grele clientului.</p>
              </div>
            </div>
          </div>

          {/* 5. Beneficii */}
          <div className="mb-24">
            <h2 className="text-3xl font-heading font-bold mb-10 text-center">Protecția Reputației și a Bugetului</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="glass premium-card p-8 rounded-[2rem] border border-border">
                <CheckCircle2 className="w-8 h-8 text-purple-600 mb-6" />
                <h3 className="text-xl font-bold mb-3 text-foreground">Defensive Costs (Apărarea Legală)</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Când ești acuzat de Malpraxis, până să decizi dacă plătești dauna, trebuie să te aperi public în fața colegiului (și a televiziunilor). Polița avansată plătește ea experții independenți care depun contra-rapoarte în tribunal pentru a arăta că NU tu ai greșit tehnic.
                </p>
              </div>
              <div className="glass premium-card p-8 rounded-[2rem] border border-border">
                <CheckCircle2 className="w-8 h-8 text-purple-600 mb-6" />
                <h3 className="text-xl font-bold mb-3 text-foreground">Principiul "Claims Made"</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Polițele complexe PI se achită pe sistem modern. Nu contează când ai făcut greșeala contabilă (poate ai făcut-o acum 2 ani). Contează cine era asigurătorul tău în momentul în care s-a DESCOPERIT greșeala și clientul a depus cererea (Claim-ul).
                </p>
              </div>
              <div className="glass premium-card p-8 rounded-[2rem] border border-border">
                <CheckCircle2 className="w-8 h-8 text-purple-600 mb-6" />
                <h3 className="text-xl font-bold mb-3 text-foreground">Limită Extinsă Rezonabilă</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Sumele la care te obligă colegiile de breaslă (ex: limita de 10.000 EUR pentru contabili pe o poliță de 50 de lei) sunt doar un minim inutil. Ofertele corporate reale permit achiziția de limite adecvate pierderilor clienților (ex: acoperiri PI de 1.000.000 EUR cu o primă excelentă).
                </p>
              </div>
            </div>
          </div>

          {/* 6. Ce riscuri acoperă */}
          <div className="mb-24 glass p-10 md:p-16 rounded-[3rem] border border-red-500/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 rounded-full blur-[80px] -z-10" />
            <h2 className="text-3xl font-heading font-bold mb-10 flex items-center justify-center gap-3">
              <AlertTriangle className="text-red-500 w-8 h-8" />
              Categorii Centrale Acoperite (E. & O.)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/50 border border-red-100 shadow-sm">
                <span className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0 font-bold">✕</span>
                <div>
                  <div className="font-bold text-foreground mb-1">Neglijență (Erori și Omisiuni)</div>
                  <div className="text-sm text-muted-foreground">Esența produsului. Orice greșeală inocentă (din oboseală sau o omisiune neintenționată) în redactarea sfaturilor, planurilor, consultanței, pe baza cărora clientul tău a pierdut bani acționând pe încredere.</div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/50 border border-red-100 shadow-sm">
                <span className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0 font-bold">✕</span>
                <div>
                  <div className="font-bold text-foreground mb-1">Încălcarea neintenționată a Drepturilor de Autor</div>
                  <div className="text-sm text-muted-foreground">Dacă ești agenție de marketing și preiei accidental o imagine cu copyright protejat pe campania globală a unui client. Clientul este dat în judecată de creator. Clientul te va da în judecată pe tine pentru a recupera banii de despăgubire.</div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/50 border border-red-100 shadow-sm">
                <span className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0 font-bold">✕</span>
                <div>
                  <div className="font-bold text-foreground mb-1">Defăimare și Calomnie (Libel & Slander)</div>
                  <div className="text-sm text-muted-foreground">O afirmație profesională proastă emisă public (PR, Consultanță Media) care ruinează direct imaginea sau vânzările brandului concurent/protejat, ducând la acțiuni civile masive.</div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/50 border border-red-100 shadow-sm">
                <span className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0 font-bold">✕</span>
                <div>
                  <div className="font-bold text-foreground mb-1">Pierderea Datelor Clientului (GDPR)</div>
                  <div className="text-sm text-muted-foreground">Unele polițe au atașate extensii cibernetice. Dacă laptopul biroului de contabilitate este virusat (Ransomware) și se pierd absolut toate serverele de salarii ale clienților pe ultimele luni.</div>
                </div>
              </div>
            </div>
          </div>

          {/* 7. Exemple practice */}
          <div className="mb-24">
            <h2 className="text-3xl font-heading font-bold mb-10 text-center flex items-center justify-center gap-3">
              <Lightbulb className="text-amber-500 w-8 h-8" />
              Sustinerea Experților în Criză
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="glass premium-card p-8 rounded-[2rem] border-l-4 border-l-amber-500">
                <h3 className="text-xl font-bold mb-4 text-foreground">Scenariul 1: Eroarea Arhitecturală</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Un birou de arhitectură a proiectat planul unei clădiri de apartamente premium. Pe parcursul turnării, se descoperă că din cauza unei calcule de deviere de câțiva centimetri în proiect (eroare de soft nedetectată), conductele uriașe de aerisire nu încap în plafon, necesitând demolarea și turnarea altor niveluri.
                </p>
                <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-100">
                  <span className="font-bold text-amber-700">Rezolvarea poliței:</span> Dezvoltatorul somează biroul de arhitectură cu facturi de 150.000 EUR - contravaloarea demolării și re-turnării betonului cauzate de eroarea lor intelectuală. Polița Profesională PI a firmei de arhitectură a recunoscut și onorat suma de despăgubire direct din plafonul lor de acoperire.
                </div>
              </div>
              <div className="glass premium-card p-8 rounded-[2rem] border-l-4 border-l-amber-500">
                <h3 className="text-xl font-bold mb-4 text-foreground">Scenariul 2: Malpraxisul Medical Asistentelor</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  O clinică mică tratează un pacient. Asistenta amestecă din suprasolicitare medicația la perfuzia intravenoasă, pacientul având reacții alergice severe ce au provocat insuficiență respiratorie și deces la ATI.
                </p>
                <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-100">
                  <span className="font-bold text-amber-700">Rezolvarea poliței:</span> Familia dă în judecată medicul și clinica pentru daune morale de sute de mii de euro. Având "Malpraxis Medical Complet", juriștii din sistemul de asigurare au sprijinit reprezentarea, onorând sumele solicitate de victimă în civil, evitând blocarea conturilor firmei.
                </div>
              </div>
            </div>
          </div>

          {/* 8. De ce să alegi Generali România */}
          <div className="mb-24 glass rounded-[3rem] p-10 md:p-16 border border-border bg-[#c8102e]/5 text-center">
            <h2 className="text-3xl font-heading font-bold mb-10 text-[#c8102e]">Precizie și Discreție Absolută</h2>
            <div className="text-lg text-muted-foreground mb-10 max-w-3xl mx-auto">
              Scandalurile de neglijență distrug branduri uriașe. Procesul de Daună (Claim-ul) de pe linia Profesională se desfășoară discret și cu ajutorul unor juriști super-specializați pe domeniu tău.
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              <div className="p-6 rounded-2xl bg-white border border-[#c8102e]/10 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-bold text-[#c8102e] mb-3 text-lg">Preluarea cazurilor complicate (IT)</h4>
                <p className="text-muted-foreground leading-relaxed">Multe companii de asigurare locale încă nu înțeleg ce înseamnă să scrii "cod cu bug-uri" pentru SUA. Generali scrie polițe PI pentru firme de IT și soft, adaptate clauzelor cerute adesea de corporațiile americane în contractele de Outsourcing din România.</p>
              </div>
              <div className="p-6 rounded-2xl bg-white border border-[#c8102e]/10 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-bold text-[#c8102e] mb-3 text-lg">Retroactivitate Controlabilă</h4>
                <p className="text-muted-foreground leading-relaxed">Când îți muți asigurarea la noi astăzi, putem discuta acoperirea unor erori pe care tu le-ai comis cu 1 an în urmă (într-o contabilitate de exemplu), dar de care nici tu, nici clientul tău nu aveți habar încă. Dacă se descoperă anul acesta, noua noastră poliță va plăti retroactiv. (Acoperirea Retroactivă).</p>
              </div>
              <div className="p-6 rounded-2xl bg-white border border-[#c8102e]/10 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-bold text-[#c8102e] mb-3 text-lg">Suport de Drept Internațional</h4>
                <p className="text-muted-foreground leading-relaxed">Firmele de arhitectură din România proiectează adesea mall-uri în Germania. Polița Profesională te va susține într-un tribunal din München, adaptându-se legislației de protecție unde s-a petrecut "fapta intelectuală".</p>
              </div>
            </div>
          </div>

          {/* 9. FAQ */}
          <div className="mb-24">
            <h2 className="text-3xl font-heading font-bold mb-10 text-center">Întrebări Frecvente Specifice PI</h2>
            <div className="space-y-6 max-w-4xl mx-auto">
              <div className="glass premium-card p-6 md:p-8 rounded-2xl border border-border">
                <h3 className="text-xl font-bold mb-3 text-foreground">M-am enervat pe clientul meu și, pentru că nu mi-a plătit factura, i-am șters baza de date intenționat. Polița acoperă pierderea lui?</h3>
                <p className="text-muted-foreground leading-relaxed">Fără echivoc: NU! Asigurările funcționează doar pentru întâmplări ACCIDENTALE ("Erori și Omisiuni", Neglijență). Fapta făcută cu "Intenție Directă", Răutate (Malice) sau Frauda/Fals în acte dovedit penal anulează instant orice acoperire de răspundere, deoarece e infracțiune.</p>
              </div>
              <div className="glass premium-card p-6 md:p-8 rounded-2xl border border-border">
                <h3 className="text-xl font-bold mb-3 text-foreground">Cine face asigurarea de malpraxis: eu ca medic PFA sau Spitalul privat SRL unde lucrez?</h3>
                <p className="text-muted-foreground leading-relaxed">Legea spune că AMBILOR. Tu trebuie să ai "Polița Medicului" strict personală care îți acoperă ție Colegiul Medicilor și erorile manuale. Pe de altă parte, Clinica Privat SRL (Unitatea Sanitară) trebuie să aibă O ALTĂ poliță separată, uriașă, care preia viciile de dotare spitalicească (ex. infecții nosocomiale în clădire sau aparatură stricată care a vătămat pacientul).</p>
              </div>
              <div className="glass premium-card p-6 md:p-8 rounded-2xl border border-border">
                <h3 className="text-xl font-bold mb-3 text-foreground">Eu doar dau consultanță verbală (Coaching/Management). Am nevoie de așa ceva?</h3>
                <p className="text-muted-foreground leading-relaxed">Da. Dacă oferi consultanță pe "Management de criză", iar sfatul dat de tine a provocat concedierea greșită a 10 oameni și compania este dată în judecată, compania se va întoarce "în regres" împotriva ta, deoarece decizia lor dezastruoasă s-a bazat pe consultanța ta facturată profesional.</p>
              </div>
            </div>
          </div>

        </div>

        {/* 11. Formular & 12. Contact Rapid */}
        <div id="oferta" className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold mb-4">Securizează Mintea Afacerii</h2>
            <p className="text-xl text-muted-foreground">Oricât de bun specialist ești, oboseala cronică generează la un moment dat erori omenești.</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <ContactForm customTitle="Cere Profil Răspundere Profesională (PI/Malpraxis)" />
            </div>
            
            <div className="glass rounded-3xl p-8 border border-border h-fit sticky top-32 shadow-lg">
              <h3 className="text-2xl font-bold font-heading mb-6">Chestionarul de Evaluare</h3>
              <p className="text-muted-foreground mb-8">
                Polițele IT, Arhitectură sau Medicale sunt personalizate. Vă vom trimite un scurt chestionar de "Subscriere a Riscului" în care veți declara detaliat tipurile de proceduri și piețele pe care operați (ex. exportați consultanță în SUA?).
              </p>
              
              <div className="space-y-6">
                <a href={CONTACT.whatsapp.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-2xl bg-green-50 border border-green-200 hover:bg-green-100 transition-colors group">
                  <div className="w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm text-green-700 font-medium">Inițiază Auditul Profesiei</div>
                    <div className="font-bold text-foreground">{CONTACT.whatsapp.display}</div>
                  </div>
                </a>

                <a href={CONTACT.phone.href} className="flex items-center gap-4 p-4 rounded-2xl bg-blue-50 border border-blue-200 hover:bg-blue-100 transition-colors group">
                  <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                    <PhoneCall className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm text-blue-700 font-medium">Asistență Juridică - Brokeraj</div>
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
