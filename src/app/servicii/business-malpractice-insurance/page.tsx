import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ContactForm } from "@/components/sections/contact-form";
import { Stethoscope, Info, Star, Users2, CheckCircle2, AlertTriangle, Lightbulb, MessageCircle, PhoneCall } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CONTACT } from "@/config/contact";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Asigurare Malpraxis Medical | Cristian Văduva",
  description: "Scutul legal obligatoriu pentru profesioniștii din sănătate. Apără medicii, asistenții și clinicile împotriva pretențiilor financiare cauzate de erori medicale.",
};

export default function BusinessMalpracticeInsurancePage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-16">
        <div className="container mx-auto px-4 max-w-5xl">
          
          {/* 1. Hero Section */}
          <div className="mb-24 flex flex-col items-center text-center mx-auto">
            <div className="inline-flex p-5 rounded-3xl glass text-emerald-600 mb-8 border border-border bg-emerald-50">
              <Stethoscope className="w-12 h-12" />
            </div>
            <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6 leading-tight">
              Asigurarea de Malpraxis Medical
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-10 max-w-3xl">
              Medicina nu este matematică, iar factorul uman presupune riscul erorii. Când o procedură medicală eșuează sau diagnosticul este întârziat, despăgubirile civile cerute de pacienți au atins sume astronomice în România. Polița de Malpraxis asigură atât cariera medicului, cât și patrimoniul clinicii în fața acestor șocuri juridice.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-xl" asChild>
                <Link href="#oferta">Auditează Riscul Medical</Link>
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full border-border hover:bg-muted" asChild>
                <a href={CONTACT.whatsapp.href} target="_blank" rel="noopener noreferrer">
                  Contact Broker Malpraxis
                </a>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
            {/* 2. Ce este această asigurare */}
            <div className="glass rounded-[3rem] p-10 border border-border/50 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-[80px] -z-10" />
              <h2 className="text-3xl font-heading font-bold mb-6 flex items-center gap-3">
                <Info className="text-emerald-500 w-8 h-8" />
                Diferența "Medic" vs. "Clinică"
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                Piața de malpraxis este structurată pe două mari ramuri: Polița Individuală (pentru persoana fizică a medicului/asistentului, cerută de Colegiu pentru a profesa) și Polița de Unitate Sanitară (cerută de DSP pentru avizarea firmei clinicii).
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Este vital de înțeles că o despăgubire masivă poate fi cerută "În Solidar". Dacă un medic taie greșit (eroare personală), va plăti polița lui. Dar dacă pacientul ia o infecție nosocomială din spital, sau un aparat defect cedează în timpul operației, va plăti exclusiv polița Clinicii SRL!
              </p>
            </div>

            {/* 3. De ce este importantă */}
            <div className="glass rounded-[3rem] p-10 border border-border/50 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-[80px] -z-10" />
              <h2 className="text-3xl font-heading font-bold mb-6 flex items-center gap-3">
                <Star className="text-amber-500 w-8 h-8 fill-amber-500/20" />
                Sfârșitul Epocii "Polițelor Ieftine"
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                Acum 10 ani, un medic dădea 50 de lei pe an "doar ca să ia viza de la Colegiul Medicilor", având o limită de despăgubire infimă de 10.000 EUR. Astăzi, casele de avocatură specializate în vătămări corporale obțin în instanțele din România daune morale de 500.000 EUR - 1.000.000 EUR.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Dacă ești Chirurg sau Obstetrician, și deții doar polița minimă de 60.000 EUR (limita maximă standard cerută), diferența până la milionul de Euro cerut de judecător va fi luată prin executare silită pe casele și conturile tale personale. De aceea medicii de top cumpără "top pentru tine-Up-uri" (Extinderi Voluntare masive).
              </p>
            </div>
          </div>

          {/* 4. Cui i se adresează */}
          <div className="mb-24 glass rounded-[3rem] p-10 md:p-16 border border-emerald-500/10 relative overflow-hidden text-center">
            <h2 className="text-3xl font-heading font-bold mb-10 flex items-center justify-center gap-3">
              <Users2 className="text-emerald-500 w-8 h-8" />
              Profesioniștii și Entitățile Vizate
            </h2>
            <div className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Instrumentul acoperă toată paleta sectorului de sănătate, public și privat:
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto text-left">
              <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <h4 className="font-bold text-emerald-800 mb-2">Medicii cu Risc Chirurgical (Grupă de Risc Mare)</h4>
                <p className="text-muted-foreground">Chirurgi generalisti, plasticieni, anestezisti (ATI), obstetricieni-ginecologi. Sunt cei mai expuși litigiilor de viață și moarte, având nevoie de limite de peste 500.000 EUR minim.</p>
              </div>
              <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <h4 className="font-bold text-emerald-800 mb-2">Clinicile și Spitalele Private (Unități Sanitare)</h4>
                <p className="text-muted-foreground">Orice SRL sau SA medical. Aceste polițe master acoperă eroarea "organizațională" (angajarea unei asistente incompetente, lipsa dezinfectanților, erori de diagnostic pe firmă).</p>
              </div>
              <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <h4 className="font-bold text-emerald-800 mb-2">Stomatologi / Dentiști</h4>
                <p className="text-muted-foreground">Cele mai frecvente cereri de daune (nu ca valoare absolută, ci ca număr). De la implante refuzate de corp, paralizii de nerv facial din anestezie, la tratamente de canal ratate.</p>
              </div>
              <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <h4 className="font-bold text-emerald-800 mb-2">Farmaciști, Kinetoterapeuți, Asistenți</h4>
                <p className="text-muted-foreground">Eliberarea unei rețete greșite în farmacie care provoacă șoc anafilactic sever cumpărătorului, sau proceduri recuperatorii care luxează grav pacientul.</p>
              </div>
            </div>
          </div>

          {/* 5. Beneficii */}
          <div className="mb-24">
            <h2 className="text-3xl font-heading font-bold mb-10 text-center">Atuurile unei Polițe beneficiu Generali</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="glass beneficiu-card p-8 rounded-[2rem] border border-border">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mb-6" />
                <h3 className="text-xl font-bold mb-3 text-foreground">Extensia "Daune Morale" Inclusă</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Tradițional, malpraxisul acoperea doar "Dauna Materială" (zilele de spitalizare și medicamentele pentru a repara greșeala). Astăzi, 90% din suma cerută în instanță reprezintă Dauna Morală (suferința psihică). Asigurările noastre de top pot INCLUDE această componentă esențială.
                </p>
              </div>
              <div className="glass beneficiu-card p-8 rounded-[2rem] border border-border">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mb-6" />
                <h3 className="text-xl font-bold mb-3 text-foreground">Cheltuielile de Apărare Legală</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Când un pacient te reclamă la Colegiu sau la Parchet, tu trebuie să angajezi experți medico-legali care să contracareze expertiza lui, ceea ce costă foarte scump. Generali poate suporta aceste onorarii (Cheltuieli de Judecată), chiar și dacă te dovedești a fi nevinovat la final.
                </p>
              </div>
              <div className="glass beneficiu-card p-8 rounded-[2rem] border border-border">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mb-6" />
                <h3 className="text-xl font-bold mb-3 text-foreground">Acoperire Retroactivă</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Dacă un pacient dă în judecată medicul "astăzi", pentru o operație greșită făcută acum "2 ani" (pe care a descoperit-o abia acum la RMN). Clauzele de Claims-Made avansate permit preluarea acestei răspunderi dacă tu ai avut asigurare neîntreruptă pe parcurs.
                </p>
              </div>
            </div>
          </div>

          {/* 6. Ce riscuri acoperă */}
          <div className="mb-24 glass p-10 md:p-16 rounded-[3rem] border border-red-500/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 rounded-full blur-[80px] -z-10" />
            <h2 className="text-3xl font-heading font-bold mb-10 flex items-center justify-center gap-3">
              <AlertTriangle className="text-red-500 w-8 h-8" />
              Ce înseamnă tehnic actul de "Malpraxis"?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/50 border border-red-100 shadow-sm">
                <span className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0 font-bold">✕</span>
                <div>
                  <div className="font-bold text-foreground mb-1">Eroarea de Diagnostic (Omisiunea)</div>
                  <div className="text-sm text-muted-foreground">Medicul nu recomandă o biopsie la timp, trimițând pacientul acasă. Peste 6 luni pacientul este în stadiu terminal. Medicul este dat în judecată pentru pierderea "șansei la viață" datorată unei omisiuni de investigație la momentul T0.</div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/50 border border-red-100 shadow-sm">
                <span className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0 font-bold">✕</span>
                <div>
                  <div className="font-bold text-foreground mb-1">Eroarea de Tratament / Execuție Chirurgicală</div>
                  <div className="text-sm text-muted-foreground">Secționarea greșită a unui nerv în timpul unei operații de rutină la tiroidă, lăsând pacientul cu o paralizie parțială de corzi vocale permanentă. Atragere la răspundere cu sume considerabile.</div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/50 border border-red-100 shadow-sm">
                <span className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0 font-bold">✕</span>
                <div>
                  <div className="font-bold text-foreground mb-1">Infecțiile Nosocomiale (Răspunderea Clinicii)</div>
                  <div className="text-sm text-muted-foreground">Pacientul se opereză perfect de menisc, dar contractează un stafilococ auriu multirezistent din sala de ATI a spitalului, care duce la septicemie și deces. Răspunderea este exclusiv a Unității Sanitare SRL.</div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/50 border border-red-100 shadow-sm">
                <span className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0 font-bold">✕</span>
                <div>
                  <div className="font-bold text-foreground mb-1">Efectele adverse nedeclarate (Lipsa Consimțământului)</div>
                  <div className="text-sm text-muted-foreground">Dacă pacientul demonstrează că nu a semnat/nu i s-a explicat complet formularul de "Informed Consent" și că nu știa că există riscul de 1% să orbească la operația de cataractă, medicul va fi tras la răspundere.</div>
                </div>
              </div>
            </div>
          </div>

          {/* 7. Exemple practice */}
          <div className="mb-24">
            <h2 className="text-3xl font-heading font-bold mb-10 text-center flex items-center justify-center gap-3">
              <Lightbulb className="text-amber-500 w-8 h-8" />
              Realitatea Instanțelor din România
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="glass beneficiu-card p-8 rounded-[2rem] border-l-4 border-l-amber-500">
                <h3 className="text-xl font-bold mb-4 text-foreground">Scenariul 1: Tragedia de la Obstetrică</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  O naștere se complică. Medicul obstetrician întârzie decizia de a intra pe cezariană de urgență. Copilul se naște cu hipoxie severă (lipsă de oxigen la creier) și rămâne cu paralizie cerebrală severă (handicap pe viață).
                </p>
                <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-100">
                  <span className="font-bold text-amber-700">Rezolvarea poliței:</span> Părinții au dat în judecată atât medicul cât și Spitalul Privat, obținând 500.000 EUR daune morale + plata îngrijirilor lunare vitagere (o pensie pe viață pentru copil). Medicul avea o poliță de doar 60.000 EUR. Restul imens de sumă a trebuit să fie suportat de Polița spitalului și, în final, din averea medicului, dovedind importanța critică a limitelor (top pentru tine-Up-urilor) extinse.
                </div>
              </div>
              <div className="glass beneficiu-card p-8 rounded-[2rem] border-l-4 border-l-amber-500">
                <h3 className="text-xl font-bold mb-4 text-foreground">Scenariul 2: Malpraxisul Stomatologic</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Un medic stomatolog efectuează un implant dentar, dar perforează canalul mandibular, afectând permanent nervul trigemen. Pacientul suferă de dureri cronice pe viață și pareză a buzei, renunțând la jobul său în televiziune.
                </p>
                <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-100">
                  <span className="font-bold text-amber-700">Rezolvarea poliței:</span> Având o poliță de Malpraxis Stomatologic cu limită solidă și extensie de Daune Morale asumată prin Generali, societatea de asigurare a preluat negocierile amiabile extra-judiciare, decontând tratamentele corective în străinătate și plăți compensatorii către victimă de 40.000 EUR, scutind cabinetul medicului de scandal de imagine.
                </div>
              </div>
            </div>
          </div>

          {/* 8. De ce să alegi Generali România */}
          <div className="mb-24 glass rounded-[3rem] p-10 md:p-16 border border-border bg-[#c8102e]/5 text-center">
            <h2 className="text-3xl font-heading font-bold mb-10 text-[#c8102e]">Puterea de Apărare Medicală a Grupului</h2>
            <div className="text-lg text-muted-foreground mb-10 max-w-3xl mx-auto">
              Nu cumpăra polița cea mai ieftină de pe piață. La momentul unui proces de malpraxis, vrei ca gigantul care stă în spatele tău în tribunal să nu poată fi intimidat.
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              <div className="p-6 rounded-2xl bg-white border border-[#c8102e]/10 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-bold text-[#c8102e] mb-3 text-lg">Polița "top pentru tine-Up" (Suplimentară)</h4>
                <p className="text-muted-foreground leading-relaxed">Chiar dacă ai deja polița "de bază" cerută de Colegiu emisă la altcineva, la Generali putem veni cu o poliță "peste", un scut adițional care intră în vigoare doar dacă se termină fondurile de pe prima poliță (ex. o completare de 300k sau 500k Euro), oferindu-ți un somn liniștit.</p>
              </div>
              <div className="p-6 rounded-2xl bg-white border border-[#c8102e]/10 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-bold text-[#c8102e] mb-3 text-lg">Libertatea Practicii Multiple</h4>
                <p className="text-muted-foreground leading-relaxed">Multe polițe ieftine te limitează la a profesa "doar în Spitalul X". Polițele noastre de medic acoperă persoana TA, oriunde profesezi pe teritoriul României, indiferent dacă faci o gardă la stat, și a doua zi profesezi la cabinetul tău privat.</p>
              </div>
              <div className="p-6 rounded-2xl bg-white border border-[#c8102e]/10 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-bold text-[#c8102e] mb-3 text-lg">Experiența în Negocierea Amiabilă</h4>
                <p className="text-muted-foreground leading-relaxed">În medicină, reputația e totul. Echipa noastră de juriști preferă să discute amiabil și obiectiv cu reprezentanții pacientului nemulțumit înainte ca presa să prindă cazul și să apară "scandalul mediatic cu doctorul ucigaș" pe posturile de știri.</p>
              </div>
            </div>
          </div>

          {/* 9. FAQ */}
          <div className="mb-24">
            <h2 className="text-3xl font-heading font-bold mb-10 text-center">Întrebări Frecvente Juridico-Medicale</h2>
            <div className="space-y-6 max-w-4xl mx-auto">
              <div className="glass beneficiu-card p-6 md:p-8 rounded-2xl border border-border">
                <h3 className="text-xl font-bold mb-3 text-foreground">Sunt medic chirurg la Spitalul de Stat. Trebuie să mă asigur la maxim, din moment ce răspunde Statul?</h3>
                <p className="text-muted-foreground leading-relaxed">Acesta este un mit periculos! Deși spitalul de stat are teoretic o răspundere, atunci când fapta constituie o "neglijență profesională individuală a actului chirurgical", pacientul te va chema pe tine în solidar la plată. De nenumărate ori, spitalele de stat s-au întors împotriva propriilor medici (în Regres), cerându-le să plătească daunele achitate inițial de spital! O poliță personală cu limită MARE e vitală și la Stat.</p>
              </div>
              <div className="glass beneficiu-card p-6 md:p-8 rounded-2xl border border-border">
                <h3 className="text-xl font-bold mb-3 text-foreground">Dacă operez beat sau drogat (eroare grosolană), mă mai apără polița?</h3>
                <p className="text-muted-foreground leading-relaxed">NU. Ca orice poliță din lumea juridică, Răspunderea (Malpraxisul) acoperă NEGLIJENȚA. Faptele comise cu <strong>Intenție</strong>, cu Răutate, sau sub influența alcoolului / substanțelor interzise (încălcarea deliberată și penală a statutului) atrag excluderea absolută a contractului.</p>
              </div>
              <div className="glass beneficiu-card p-6 md:p-8 rounded-2xl border border-border">
                <h3 className="text-xl font-bold mb-3 text-foreground">Clinica mea de chirurgie estetică face o promovare agresivă cu "Rezultate garantate 100%!". Clienta iese asimetrică și ne dă în judecată. Suntem acoperiți?</h3>
                <p className="text-muted-foreground leading-relaxed">În zona "Esteticii cu plată" (operații pur de înfrumusețare, nu curative), polițele au clauze foarte restrictive. Ele exclud despăgubirile izvorâte din simpla "Nemulțumire estetică a pacientului față de un rezultat pe care i l-ai promis în reclamă". Polița acoperă eroarea medicală (ex: infecție, hematom grav din neglijență), nu garantarea frumuseții.</p>
              </div>
            </div>
          </div>

        </div>

        {/* 11. Formular & 12. Contact Rapid */}
        <div id="oferta" className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold mb-4">Investește Liniștit în Cariera Ta</h2>
            <p className="text-xl text-muted-foreground">O poliță de malpraxis cu limite europene extinse îți redă curajul de a profesa la standarde înalte.</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <ContactForm customTitle="Cere Profil de Asigurare Malpraxis (Individual / Clinică)" />
            </div>
            
            <div className="glass rounded-3xl p-8 border border-border h-fit sticky top-32 shadow-lg">
              <h3 className="text-2xl font-bold font-heading mb-6">Auditul Medical</h3>
              <p className="text-muted-foreground mb-8">
                Pentru medici avem nevoie doar de specialitatea practicată. Pentru Spitale / Clinici (Unități Sanitare), vom trimite un chestionar complex (Cifra de Afaceri, nr. de medici, specialitățile de risc practicate, istoric de daune).
              </p>
              
              <div className="space-y-6">
                <a href={CONTACT.whatsapp.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-2xl bg-green-50 border border-green-200 hover:bg-green-100 transition-colors group">
                  <div className="w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm text-green-700 font-medium">Inițiază Oferta top pentru tine-Up pe WhatsApp</div>
                    <div className="font-bold text-foreground">{CONTACT.whatsapp.display}</div>
                  </div>
                </a>

                <a href={CONTACT.phone.href} className="flex items-center gap-4 p-4 rounded-2xl bg-blue-50 border border-blue-200 hover:bg-blue-100 transition-colors group">
                  <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                    <PhoneCall className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm text-blue-700 font-medium">Asistență Brokeraj Healthcare</div>
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
