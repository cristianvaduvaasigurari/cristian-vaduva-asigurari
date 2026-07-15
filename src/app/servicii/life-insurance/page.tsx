import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ServicePageIntro } from "@/components/sections/service-page-intro";
import { ContactForm } from "@/components/sections/contact-form";
import { Heart, Info, Star, Users2, CheckCircle2, AlertTriangle, Lightbulb, MessageCircle, PhoneCall } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CONTACT } from "@/config/contact";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Asigurări de Viață Premium | Cristian Văduva",
  description: "Protecție financiară completă și soluții de capitalizare pentru un viitor sigur și predictibil, oriunde v-ați afla.",
};

export default function LifeInsurancePage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <ServicePageIntro slug="life-insurance" />
      
      <main className="flex-1 pt-32 pb-16">
        <div className="container mx-auto px-4 max-w-5xl">
          
          {/* 1. Hero Section */}
          <div className="mb-24 flex flex-col items-center text-center mx-auto">
            <div className="inline-flex p-5 rounded-3xl glass text-blue-600 mb-8 border border-border bg-blue-50">
              <Heart className="w-12 h-12" />
            </div>
            <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6 leading-tight">
              Asigurări de Viață și Planificare Financiară
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-10 max-w-3xl">
              Înțelegem că adevărata bogăție este liniștea de a ști că familia ta va fi protejată indiferent de neprevăzut. Un plan solid de asigurare de viață reprezintă pilonul de bază al protecției tale financiare și al administrării corecte a patrimoniului. O decizie asumată astăzi elimină decenii de incertitudine pentru cei dragi.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-xl" asChild>
                <Link href="#oferta">Cere Ofertă Personalizată</Link>
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full border-border hover:bg-muted" asChild>
                <a href={CONTACT.whatsapp.href} target="_blank" rel="noopener noreferrer">
                  Discută cu Cristian Văduva
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
                Ce este această asigurare?
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                Asigurarea de viață este un contract ferm, cu putere de lege, prin care transferi riscul unui deces prematur, al invalidității sau al unor afecțiuni medicale grave către o companie de asigurări solidă.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                În schimbul unei prime lunare sau anuale accesibile, asigurătorul garantează plata unei sume de bani considerabile (capital asigurat) direct către familia sau beneficiarii aleși de tine, garantând astfel conservarea standardului lor de viață. Pachetul poate fi extins cu opțiuni de economisire (capitalizare), transformând polița într-un veritabil cont de economii cu dobândă și protecție totală.
              </p>
            </div>

            {/* 3. De ce este importantă */}
            <div className="glass rounded-[3rem] p-10 border border-border/50 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-[80px] -z-10" />
              <h2 className="text-3xl font-heading font-bold mb-6 flex items-center gap-3">
                <Star className="text-amber-500 w-8 h-8 fill-amber-500/20" />
                De ce este fundamentală?
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                Indiferent de succesul profesional actual, absența unui plan de rezervă masiv și imediat disponibil poate lăsa în urmă datorii uriașe. Dacă deții credite ipotecare sau leasing-uri, ratele acestora nu dispar în cazul unei tragedii.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Asigurarea de viață este singurul instrument financiar din lume capabil să livreze o sumă imensă de bani exact în secunda în care este cea mai mare nevoie de ea. Oferă garanția că educația universitară a copiilor tăi este deja plătită, iar reședința familiei nu va fi pierdută în fața băncilor.
              </p>
            </div>
          </div>

          {/* 4. Cui i se adresează */}
          <div className="mb-24 glass rounded-[3rem] p-10 md:p-16 border border-emerald-500/10 relative overflow-hidden text-center">
            <h2 className="text-3xl font-heading font-bold mb-10 flex items-center justify-center gap-3">
              <Users2 className="text-emerald-500 w-8 h-8" />
              Cui i se adresează?
            </h2>
            <div className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Această soluție este proiectată exclusiv pentru persoanele responsabile care înțeleg că viitorul se construiește pe fundații solide. Este indispensabilă pentru:
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto text-left">
              <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <h4 className="font-bold text-emerald-800 mb-2">Părinți și Tineri Familiști</h4>
                <p className="text-muted-foreground">Cei care au copii în întreținere și doresc să asigure finanțarea creșterii și educației lor viitoare indiferent de situație.</p>
              </div>
              <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <h4 className="font-bold text-emerald-800 mb-2">Antreprenori și Liber Profesioniști</h4>
                <p className="text-muted-foreground">Persoane ale căror venituri reprezintă singurul motor financiar al familiei lor, unde oprirea muncii înseamnă oprirea veniturilor.</p>
              </div>
              <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <h4 className="font-bold text-emerald-800 mb-2">Persoane cu Credite Ipotecare</h4>
                <p className="text-muted-foreground">Cei care doresc să se asigure că, în caz de forță majoră, banca își primește banii iar familia păstrează casa.</p>
              </div>
              <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <h4 className="font-bold text-emerald-800 mb-2">Investitori Prudenți</h4>
                <p className="text-muted-foreground">Persoanele care folosesc componenta de capitalizare a poliței pentru a construi un portofoliu fără riscuri bursiere majore.</p>
              </div>
            </div>
          </div>

          {/* 5. Beneficii */}
          <div className="mb-24">
            <h2 className="text-3xl font-heading font-bold mb-10 text-center">Beneficiile Esențiale</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="glass premium-card p-8 rounded-[2rem] border border-border">
                <CheckCircle2 className="w-8 h-8 text-blue-600 mb-6" />
                <h3 className="text-xl font-bold mb-3 text-foreground">Capital Garantat Imediat</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Spre deosebire de un depozit bancar pe care trebuie să-l umpli lent în decenii, suma asigurată din poliță este disponibilă integral și garantat încă de la achitarea primei rate.
                </p>
              </div>
              <div className="glass premium-card p-8 rounded-[2rem] border border-border">
                <CheckCircle2 className="w-8 h-8 text-blue-600 mb-6" />
                <h3 className="text-xl font-bold mb-3 text-foreground">Scutire de Impozit</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Din punct de vedere legislativ, sumele plătite beneficiarilor în urma decesului sunt considerate indemnizații de asigurare și sunt absolut scutite de impozitul pe venit sau taxe succesorale.
                </p>
              </div>
              <div className="glass premium-card p-8 rounded-[2rem] border border-border">
                <CheckCircle2 className="w-8 h-8 text-blue-600 mb-6" />
                <h3 className="text-xl font-bold mb-3 text-foreground">Flexibilitate Totală</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Poți modifica beneficiarii ori de câte ori dorești. De asemenea, frecvența plăților este adaptabilă nevoilor tale: lunar, trimestrial, semestrial sau anual.
                </p>
              </div>
            </div>
          </div>

          {/* 6. Ce riscuri acoperă */}
          <div className="mb-24 glass p-10 md:p-16 rounded-[3rem] border border-red-500/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 rounded-full blur-[80px] -z-10" />
            <h2 className="text-3xl font-heading font-bold mb-10 flex items-center justify-center gap-3">
              <AlertTriangle className="text-red-500 w-8 h-8" />
              Ce riscuri acoperă în mod direct?
            </h2>
            <div className="text-lg text-muted-foreground text-center mb-10 max-w-2xl mx-auto">
              Polița ta este configurabilă și poate forma un scut împotriva următoarelor situații extreme:
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/50 border border-red-100 shadow-sm">
                <span className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0 font-bold">✕</span>
                <div>
                  <div className="font-bold text-foreground mb-1">Deces din orice cauză</div>
                  <div className="text-sm text-muted-foreground">Acoperire integrală fie că survine în urma unui accident auto, de muncă sau din cauza unei boli grave.</div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/50 border border-red-100 shadow-sm">
                <span className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0 font-bold">✕</span>
                <div>
                  <div className="font-bold text-foreground mb-1">Invaliditate Permanentă</div>
                  <div className="text-sm text-muted-foreground">Plata unui capital major pentru adaptarea la noua viață în cazul pierderii capacității de muncă în urma unui accident.</div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/50 border border-red-100 shadow-sm">
                <span className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0 font-bold">✕</span>
                <div>
                  <div className="font-bold text-foreground mb-1">Afecțiuni Medicale Grave</div>
                  <div className="text-sm text-muted-foreground">Sume de bani plătite imediat la diagnosticarea cu afecțiuni precum Cancer, Infarct, AVC, pentru finanțarea tratamentelor.</div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/50 border border-red-100 shadow-sm">
                <span className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0 font-bold">✕</span>
                <div>
                  <div className="font-bold text-foreground mb-1">Incapacitate Temporară de Muncă</div>
                  <div className="text-sm text-muted-foreground">Indemnizații zilnice pentru perioadele de spitalizare și recuperare.</div>
                </div>
              </div>
            </div>
          </div>

          {/* 7. Exemple practice */}
          <div className="mb-24">
            <h2 className="text-3xl font-heading font-bold mb-10 text-center flex items-center justify-center gap-3">
              <Lightbulb className="text-amber-500 w-8 h-8" />
              Exemple Reale din Piață
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="glass premium-card p-8 rounded-[2rem] border-l-4 border-l-amber-500">
                <h3 className="text-xl font-bold mb-4 text-foreground">Scenariul 1: Creditul Ipotecar și Familia</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Alexandru (35 ani) tocmai a contractat un credit ipotecar de 150.000 EUR pentru casa familiei sale. Din păcate, Alexandru suferă un accident rutier fatal în anul 3 de credit.
                </p>
                <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-100">
                  <span className="font-bold text-amber-700">Rezolvarea poliței:</span> Compania de asigurări transferă imediat capitalul de 150.000 EUR soției. Aceasta achită integral creditul la bancă a doua zi, păstrând casa și stabilitatea pentru copii.
                </div>
              </div>
              <div className="glass premium-card p-8 rounded-[2rem] border-l-4 border-l-amber-500">
                <h3 className="text-xl font-bold mb-4 text-foreground">Scenariul 2: Polița cu Capitalizare pentru Educație</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Maria încheie o poliță de viață cu economisire atunci când copilul ei împlinește 1 an, plătind o primă de 100 EUR lunar. Scopul: fondul de studenție.
                </p>
                <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-100">
                  <span className="font-bold text-amber-700">Rezolvarea poliței:</span> După 18 ani, Maria este în viață și sănătoasă. Polița a ajuns la maturitate. Ea primește înapoi toți banii economisiți plus randamentul investițional generat de asigurător, cu care finanțează studiile copilului. Dacă Maria ar fi decedat între timp, copilul ar fi primit garantat toată suma finală prevăzută în contract.
                </div>
              </div>
            </div>
          </div>

          {/* 8. De ce să alegi Generali România */}
          <div className="mb-24 glass rounded-[3rem] p-10 md:p-16 border border-border bg-[#c8102e]/5 text-center">
            <h2 className="text-3xl font-heading font-bold mb-10 text-[#c8102e]">De ce Generali România?</h2>
            <div className="text-lg text-muted-foreground mb-10 max-w-3xl mx-auto">
              Să alegi un asigurător de viață înseamnă să alegi o promisiune pe zeci de ani. Grupul Generali nu face compromisuri când vine vorba de stabilitate și solvabilitate financiară.
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              <div className="p-6 rounded-2xl bg-white border border-[#c8102e]/10 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-bold text-[#c8102e] mb-3 text-lg">Tradiție Seculară</h4>
                <p className="text-muted-foreground leading-relaxed">Cu o istorie de peste 190 de ani de excelență, Generali a supraviețuit crizelor economice și războaielor mondiale, plătindu-și mereu polițele. Aceasta este o garanție pe care doar giganții o pot oferi.</p>
              </div>
              <div className="p-6 rounded-2xl bg-white border border-[#c8102e]/10 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-bold text-[#c8102e] mb-3 text-lg">Solvabilitate A++</h4>
                <p className="text-muted-foreground leading-relaxed">Soliditate financiară auditată anual care respectă cele mai stricte norme Solvency II din Uniunea Europeană, garantând fondurile tale investiționale și primele de risc.</p>
              </div>
              <div className="p-6 rounded-2xl bg-white border border-[#c8102e]/10 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-bold text-[#c8102e] mb-3 text-lg">Ecosistem Internațional</h4>
                <p className="text-muted-foreground leading-relaxed">Ai acces la resurse globale prin Generali Investments. Nu este doar o asigurare națională, ești sub protecția uneia dintre cele mai puternice corporații financiare mondiale.</p>
              </div>
            </div>
          </div>

          {/* 9. FAQ */}
          <div className="mb-24">
            <h2 className="text-3xl font-heading font-bold mb-10 text-center">Întrebări Frecvente</h2>
            <div className="space-y-6 max-w-4xl mx-auto">
              <div className="glass premium-card p-6 md:p-8 rounded-2xl border border-border">
                <h3 className="text-xl font-bold mb-3 text-foreground">La ce vârstă este ideal să închei o poliță de viață?</h3>
                <p className="text-muted-foreground leading-relaxed">Cât mai devreme. Pe măsură ce înaintezi în vârstă, riscurile medicale cresc, iar prima de asigurare va fi substanțial mai mare. O persoană sănătoasă de 25 de ani poate bloca o primă de plată extrem de mică pentru următoarele decenii.</p>
              </div>
              <div className="glass premium-card p-6 md:p-8 rounded-2xl border border-border">
                <h3 className="text-xl font-bold mb-3 text-foreground">Trebuie să fac controale medicale la intrare?</h3>
                <p className="text-muted-foreground leading-relaxed">În majoritatea cazurilor pentru sume asigurate medii, un simplu chestionar medical onest este suficient. Pentru sume foarte mari de despăgubire, compania îți poate cere realizarea unui control medical gratuit și decontat integral de ei.</p>
              </div>
              <div className="glass premium-card p-6 md:p-8 rounded-2xl border border-border">
                <h3 className="text-xl font-bold mb-3 text-foreground">Îmi pot pierde banii dacă nu mai pot plăti polița o perioadă?</h3>
                <p className="text-muted-foreground leading-relaxed">Nu imediat. Există o perioadă de grație, iar dacă alegi varianta cu componentă de economisire (capitalizare), polița poate funcționa automat consumând din fondul acumulat pentru a te menține protejat, fără să anuleze contractul imediat.</p>
              </div>
            </div>
          </div>

        </div>

        {/* 11. Formular & 12. Contact Rapid */}
        <div id="oferta" className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold mb-4">Construiește-ți un Viitor Fără Griji</h2>
            <p className="text-xl text-muted-foreground">Investește astăzi 5 minute într-o discuție care poate schimba soarta financiară a familiei tale.</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <ContactForm customTitle="Solicită o ofertă gratuită și confidențială" />
            </div>
            
            <div className="glass rounded-3xl p-8 border border-border h-fit sticky top-32 shadow-lg">
              <h3 className="text-2xl font-bold font-heading mb-6">Suntem Aici Să Te Ajutăm</h3>
              <p className="text-muted-foreground mb-8">
                Discuțiile despre asigurările de viață sunt complexe și foarte personale. Suntem la un telefon distanță pentru a-ți clarifica orice aspect.
              </p>
              
              <div className="space-y-6">
                <a href={CONTACT.whatsapp.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-2xl bg-green-50 border border-green-200 hover:bg-green-100 transition-colors group">
                  <div className="w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm text-green-700 font-medium">Scrie-ne pe WhatsApp</div>
                    <div className="font-bold text-foreground">{CONTACT.whatsapp.display}</div>
                  </div>
                </a>

                <a href={CONTACT.phone.href} className="flex items-center gap-4 p-4 rounded-2xl bg-blue-50 border border-blue-200 hover:bg-blue-100 transition-colors group">
                  <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                    <PhoneCall className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm text-blue-700 font-medium">Sună pentru Consultanță</div>
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
