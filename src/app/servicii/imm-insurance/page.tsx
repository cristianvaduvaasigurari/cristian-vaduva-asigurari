import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ServicePageIntro } from "@/components/sections/service-page-intro";
import { ContactForm } from "@/components/sections/contact-form";
import { Briefcase, Info, Star, Users2, CheckCircle2, AlertTriangle, Lightbulb, MessageCircle, PhoneCall } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CONTACT } from "@/config/contact";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Asigurări IMM și Business | Cristian Văduva",
  description: "Scutul operațional complet pentru afacerea ta: protejarea proprietăților, a angajaților și acoperirea împotriva proceselor de răspundere civilă.",
};

export default function IMMInsurancePage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <ServicePageIntro slug="imm-insurance" />
      
      <main className="flex-1 pt-32 pb-16">
        <div className="container mx-auto px-4 max-w-5xl">
          
          {/* 1. Hero Section */}
          <div className="mb-24 flex flex-col items-center text-center mx-auto">
            <div className="inline-flex p-5 rounded-3xl glass text-blue-600 mb-8 border border-border bg-blue-50">
              <Briefcase className="w-12 h-12" />
            </div>
            <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6 leading-tight">
              Asigurări Pentru Companii (SME / IMM)
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-10 max-w-3xl">
              Un business de succes funcționează neîntrerupt doar cât timp nu intervine un incident major neacoperit. Pachetele noastre Corporate protejează imobilele, echipamentele vitale și stocurile tale comerciale. Însă cel mai important, preia total răspunderea civilă (litigiile) împotriva firmei în cazul în care un client sau un angajat are de suferit în urma operațiunilor tale.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-xl" asChild>
                <Link href="#oferta">Configurează Planul de Business</Link>
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full border-border hover:bg-muted" asChild>
                <a href={CONTACT.whatsapp.href} target="_blank" rel="noopener noreferrer">
                  Contactează Divizia Corporate
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
                Umbrela Financiară a Firmei
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                Asigurarea pentru IMM este un program de protecție flexibil și modular. În funcție de tipologia industriei tale (comerț, medical, transport, servicii software), tu decizi împreună cu noi care module contractuale trebuie activate pe poliță.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Polița poate acoperi absolut tot, de la pereții clădirii pe care o închiriezi, până la stocul tău de piese de 1 milion de euro, serverele companiei, banii din casierie, și cheltuielile cu avocații dacă un vizitator alunecă pe scările firmei tale.
              </p>
            </div>

            {/* 3. De ce este importantă */}
            <div className="glass rounded-[3rem] p-10 border border-border/50 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-[80px] -z-10" />
              <h2 className="text-3xl font-heading font-bold mb-6 flex items-center gap-3">
                <Star className="text-amber-500 w-8 h-8 fill-amber-500/20" />
                Diferența dintre Supraviețuire și Faliment
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                Datele economice demonstrează că peste 40% din întreprinderile mici și mijlocii din România dau faliment în următoarele 12 luni după ce trec printr-un eveniment catastrofic fără a fi asigurate. Lipsa rezervelor masive de lichidități lovește instantaneu.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Fără un spațiu de desfășurare (distrus de foc), firma ta nu mai generează venituri (Business Interruption), dar trebuie în continuare să plătească ratele la băncile comerciale, salariile echipei cheie și impozitele la stat. Un Pachet Multi-Risc modern preia toate aceste deficite direct de pe balanța contabilă a afacerii.
              </p>
            </div>
          </div>

          {/* 4. Cui i se adresează */}
          <div className="mb-24 glass rounded-[3rem] p-10 md:p-16 border border-emerald-500/10 relative overflow-hidden text-center">
            <h2 className="text-3xl font-heading font-bold mb-10 flex items-center justify-center gap-3">
              <Users2 className="text-emerald-500 w-8 h-8" />
              Pentru ce industrii arhitectăm programe?
            </h2>
            <div className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Niciun domeniu de activitate nu e ferit de incidente. Din contră, protejăm industriile dinamice și segmentul de profesioniști de elita:
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto text-left">
              <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <h4 className="font-bold text-emerald-800 mb-2">Centre Comerciale / HoReCa</h4>
                <p className="text-muted-foreground">Saloane de beauty, restaurante, cafenele, hipermarketuri, pensiuni. Oriunde fluxul de clienți este enorm și riscul de accidente (ex. incendiu în bucătărie) este permanent.</p>
              </div>
              <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <h4 className="font-bold text-emerald-800 mb-2">Clinici și Cabinete de Expertiză</h4>
                <p className="text-muted-foreground">Centre de imagistică și stomatologie care folosesc utilaje de zeci de mii de euro. Se protejează atât utilajul tehnic contra daunelor, cât și răspunderea medicală (Malpraxis).</p>
              </div>
              <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <h4 className="font-bold text-emerald-800 mb-2">Platforme Logistice și Producție</h4>
                <p className="text-muted-foreground">Firme de expediții cu depozite pline de stocuri vulnerabile la inundații sau furt din efracție, și fabrici ale căror utilaje se pot strica accidental paralizând banda.</p>
              </div>
              <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <h4 className="font-bold text-emerald-800 mb-2">Agenții Software și Consultanți</h4>
                <p className="text-muted-foreground">Companiile care au nevoie de acoperirea erorilor profesionale (E&O). Un cod greșit predat unui client important care generează blocarea comenzilor acestuia, duce la procese ce necesită o poliță de acoperire informatică uriașă.</p>
              </div>
            </div>
          </div>

          {/* 5. Beneficii */}
          <div className="mb-24">
            <h2 className="text-3xl font-heading font-bold mb-10 text-center">Beneficiile Pentru Manageri și Acționari</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="glass premium-card p-8 rounded-[2rem] border border-border">
                <CheckCircle2 className="w-8 h-8 text-blue-600 mb-6" />
                <h3 className="text-xl font-bold mb-3 text-foreground">Optimizare Fiscală</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Primele plătite pentru polițele de asigurare ale societății (fie că e pentru sediu, angajați sau utilaje) sunt recunoscute ca și cheltuieli 100% deductibile, diminuând impozitul anual.
                </p>
              </div>
              <div className="glass premium-card p-8 rounded-[2rem] border border-border">
                <CheckCircle2 className="w-8 h-8 text-blue-600 mb-6" />
                <h3 className="text-xl font-bold mb-3 text-foreground">Scutul Executivului (D&O)</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Deciziile managerilor executivi pot fi atacate de acționari sau de stat. Acoperirile avansate pot proteja averea personală a administratorilor de procese de management, despăgubind apărarea acestora.
                </p>
              </div>
              <div className="glass premium-card p-8 rounded-[2rem] border border-border">
                <CheckCircle2 className="w-8 h-8 text-blue-600 mb-6" />
                <h3 className="text-xl font-bold mb-3 text-foreground">Stabilitatea Cash-flow-ului</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Plata se face prin factorizarea riscului. Plătești cu certitudine o sumă predictibilă anual (ex. 200 EUR) pentru a fi perfect protejat de pierderi imprevizibile de 150.000 EUR.
                </p>
              </div>
            </div>
          </div>

          {/* 6. Ce riscuri acoperă */}
          <div className="mb-24 glass p-10 md:p-16 rounded-[3rem] border border-red-500/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 rounded-full blur-[80px] -z-10" />
            <h2 className="text-3xl font-heading font-bold mb-10 flex items-center justify-center gap-3">
              <AlertTriangle className="text-red-500 w-8 h-8" />
              Ce categorii de incidente protejăm complet?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/50 border border-red-100 shadow-sm">
                <span className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0 font-bold">✕</span>
                <div>
                  <div className="font-bold text-foreground mb-1">Clădiri și Conținut Material (Property)</div>
                  <div className="text-sm text-muted-foreground">Incendiu, trăsnet, explozie, căderea corpurilor aeriene, cutremur, inundații, fenomene meteo, refularea conductelor și apa de conductă ce îți strică sediul.</div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/50 border border-red-100 shadow-sm">
                <span className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0 font-bold">✕</span>
                <div>
                  <div className="font-bold text-foreground mb-1">Criminalitate și Furt Comercial</div>
                  <div className="text-sm text-muted-foreground">Furtul stocurilor prin efracție din depozit. Vandalizarea fațadelor din geam (spargerea vitrinelor), inclusiv furtul banilor din seiful casieriei afacerii.</div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/50 border border-red-100 shadow-sm">
                <span className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0 font-bold">✕</span>
                <div>
                  <div className="font-bold text-foreground mb-1">Răspunderi și Litigii Juridice (Liability)</div>
                  <div className="text-sm text-muted-foreground">Vătămarea corporală a clienților. Vătămarea angajaților la punctul de lucru (Răspunderea Angajatorului). Distrugerea bunurilor firmei învecinate.</div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/50 border border-red-100 shadow-sm">
                <span className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0 font-bold">✕</span>
                <div>
                  <div className="font-bold text-foreground mb-1">Întreruperea Activității (Business Interruption)</div>
                  <div className="text-sm text-muted-foreground">Generali va suporta costurile tale fixe și va înlocui profitul așteptat și nerealizat pe toată perioada în care spațiul e în reconstrucție post-incendiu.</div>
                </div>
              </div>
            </div>
          </div>

          {/* 7. Exemple practice */}
          <div className="mb-24">
            <h2 className="text-3xl font-heading font-bold mb-10 text-center flex items-center justify-center gap-3">
              <Lightbulb className="text-amber-500 w-8 h-8" />
              Scurte Studii de Caz B2B
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="glass premium-card p-8 rounded-[2rem] border-l-4 border-l-amber-500">
                <h3 className="text-xl font-bold mb-4 text-foreground">Scenariul 1: Litigiul și Răspunderea Produsului</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  O companie care livrează catering pentru birouri a livrat întâmplător materie primă compromisă, trimițând la spital peste 20 de angajați ai unei corporații partenere. Corporația s-a întors imediat în instanță cerând daune masive firmei de catering.
                </p>
                <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-100">
                  <span className="font-bold text-amber-700">Rezolvarea poliței:</span> Modulul de "Răspunderea Produsului" a despăgubit cererile de daune ale spitalului și costul cu avocații reprezentând IMM-ul de catering, preîntâmpinând închiderea completă a afacerii de catering pentru datoriile imputate.
                </div>
              </div>
              <div className="glass premium-card p-8 rounded-[2rem] border-l-4 border-l-amber-500">
                <h3 className="text-xl font-bold mb-4 text-foreground">Scenariul 2: Avaria Tehnologică la Centrul Medical</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  O cădere majoră de tensiune de la distribuitor a prajit componentele critice ale unui echipament RMN (valoare 500.000 Euro) dintr-un centru imagistic independent privat.
                </p>
                <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-100">
                  <span className="font-bold text-amber-700">Rezolvarea poliței:</span> Clauza de "Avarii Accidentale la Echipamente și Utilaje / Electronic Equipment" s-a activat instantaneu, acoperind integral valoarea pieselor schimbate din Germania, în condițiile în care garanția furnizorului expirase.
                </div>
              </div>
            </div>
          </div>

          {/* 8. De ce să alegi Generali România */}
          <div className="mb-24 glass rounded-[3rem] p-10 md:p-16 border border-border bg-[#c8102e]/5 text-center">
            <h2 className="text-3xl font-heading font-bold mb-10 text-[#c8102e]">Capacitatea Gigantică de Asigurare B2B Generali</h2>
            <div className="text-lg text-muted-foreground mb-10 max-w-3xl mx-auto">
              Corporațiile și afacerile moderne nu caută doar protecție măruntă. Ele caută solvabilitate la zeci de milioane de euro pentru a satisface cerințele unor contracte de milioane semnate cu statul sau cu entități internaționale.
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              <div className="p-6 rounded-2xl bg-white border border-[#c8102e]/10 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-bold text-[#c8102e] mb-3 text-lg">Soluții "Tailor-Made"</h4>
                <p className="text-muted-foreground leading-relaxed">Nu forțăm antreprenorii în șabloane generice. Polițele se taie la milimetru. De la acoperirea clădirilor de birouri (Owner’s Property) la protecția flotelor comerciale complexe.</p>
              </div>
              <div className="p-6 rounded-2xl bg-white border border-[#c8102e]/10 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-bold text-[#c8102e] mb-3 text-lg">Evaluatori Industriali Top Class</h4>
                <p className="text-muted-foreground leading-relaxed">Sistemele noastre de gestiune de criză direcționează inspectori industriali de daună în câteva ore de la un incident major pentru a stopa sângerarea companiei.</p>
              </div>
              <div className="p-6 rounded-2xl bg-white border border-[#c8102e]/10 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-bold text-[#c8102e] mb-3 text-lg">Generali Global Corporate</h4>
                <p className="text-muted-foreground leading-relaxed">Suntem reasigurați și susținuți de gigantul Generali GC&C. Putem subscrie clădiri comerciale la sute de milioane de euro (MALL-uri, depozite, fabrici gigantice).</p>
              </div>
            </div>
          </div>

          {/* 9. FAQ */}
          <div className="mb-24">
            <h2 className="text-3xl font-heading font-bold mb-10 text-center">Întrebări Frecvente Despre Planurile IMM</h2>
            <div className="space-y-6 max-w-4xl mx-auto">
              <div className="glass premium-card p-6 md:p-8 rounded-2xl border border-border">
                <h3 className="text-xl font-bold mb-3 text-foreground">Compania mea închiriază birourile, nu sunt proprietar. Pot încheia eu polița?</h3>
                <p className="text-muted-foreground leading-relaxed">Bineînțeles. Chiriașii se bucură de un avantaj masiv: ei își asigură propriile bunuri de amenajare (mobilier, IT, stocuri) și simultan semnează "Răspunderea Chiriașului". Astfel, dacă ei dau foc din greșeală întregului turn de birouri, Generali preia pagubele impuse de proprietarul turnului, protejând chiriașul.</p>
              </div>
              <div className="glass premium-card p-6 md:p-8 rounded-2xl border border-border">
                <h3 className="text-xl font-bold mb-3 text-foreground">Partenerii B2B îmi cer o poliță Răspundere Profesională ca să semnăm contractul. Generali poate emite așa ceva?</h3>
                <p className="text-muted-foreground leading-relaxed">Da, suntem experți în Professional Indemnity (E&O). Fie că ești o agenție IT care lucrează pentru băncile elvețiene sau un arhitect cu contracte grele de construcții. Emitem polița cu limtele de milioane de EUR cerute de partenerii tăi pentru o fracțiune din acel cost.</p>
              </div>
              <div className="glass premium-card p-6 md:p-8 rounded-2xl border border-border">
                <h3 className="text-xl font-bold mb-3 text-foreground">Cât este prima anuală pentru un IMM de dimensiuni mici?</h3>
                <p className="text-muted-foreground leading-relaxed">Prețurile sunt absolut modice. Protecția completă pentru un spațiu comercial standard cu stocuri medii și limite rezonabile se încadrează frecvent între 200 și 400 EUR per AN. Este pur și simplu un cost decizional de bază ignorat deseori din lipsa informației.</p>
              </div>
            </div>
          </div>

        </div>

        {/* 11. Formular & 12. Contact Rapid */}
        <div id="oferta" className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold mb-4">Securizează Businessul Tău</h2>
            <p className="text-xl text-muted-foreground">Alocă o discuție de consultanță B2B și primești arhitectura de risc completă și perfect echilibrată cu bugetul firmei.</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <ContactForm customTitle="Solicită Audit de Risc pentru Firma Ta" />
            </div>
            
            <div className="glass rounded-3xl p-8 border border-border h-fit sticky top-32 shadow-lg">
              <h3 className="text-2xl font-bold font-heading mb-6">Canale B2B</h3>
              <p className="text-muted-foreground mb-8">
                Asigurările de companie necesită cunoașterea cifrei de afaceri, a domeniului și a bunurilor contabile. Suntem pregătiți să procesăm rapid datele.
              </p>
              
              <div className="space-y-6">
                <a href={CONTACT.whatsapp.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-2xl bg-green-50 border border-green-200 hover:bg-green-100 transition-colors group">
                  <div className="w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm text-green-700 font-medium">Chat Executiv via WhatsApp</div>
                    <div className="font-bold text-foreground">{CONTACT.whatsapp.display}</div>
                  </div>
                </a>

                <a href={CONTACT.phone.href} className="flex items-center gap-4 p-4 rounded-2xl bg-blue-50 border border-blue-200 hover:bg-blue-100 transition-colors group">
                  <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                    <PhoneCall className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm text-blue-700 font-medium">Divizia Corporate (Telefon)</div>
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
