import Image from "next/image";
import Link from "next/link";
import { ArrowRight, AlertTriangle, ShieldCheck, HelpCircle } from "lucide-react";

interface ConsequenceItem {
  id: string;
  category: string;
  title: string;
  image: string;
  alt: string;
  whatHappens: string;
  financialImpact: string;
  whatToCheck: string;
}

const consequences: ConsequenceItem[] = [
  {
    id: "locuinta-reconstructie",
    category: "Locuințe & Proprietăți",
    title: "O locuință care trebuie reconstruită integral sau parțial",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1000&q=80",
    alt: "Inundație și avariere severă a finisajelor interioare într-o locuință rezidențială",
    whatHappens: "Un incendiu izbucnit de la instalația electrică, o conductă spartă în timp ce proprietarii sunt plecați sau o furtună violentă pot compromite structura de rezistență, finisajele de lux și acoperișul.",
    financialImpact: "Costurile reale nu se limitează la reparații: apar cheltuieli de demolare și evacuare a molozului, reproiectare structurală, materiale premium la prețurile actualizate ale pieței și chiria unei locuințe echivalente pe durata șantierului (adesea 12–24 de luni).",
    whatToCheck: "Dacă suma asigurată este stabilită la costul actual de reconstrucție (nu valoarea de piață sau de achiziție), dacă există clauză de subasigurare și dacă polița include explicit cheltuielile de demolare și cazare temporară."
  },
  {
    id: "auto-dauna-totala",
    category: "Automobile de Valoare & Colecție",
    title: "O mașină de valoare avariată grav sau declarată daună totală",
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1000&q=80",
    alt: "Avariere caroserie și senzori tehnologici pe vehicul premium după incident rutier",
    whatHappens: "O coliziune pe carosabil, acroșarea unui parapet sau grindina de mari dimensiuni distrug elementele de caroserie din fibră de carbon sau aluminiu, pachetele aerodinamice și blocurile optice complexe.",
    financialImpact: "La vehiculele de lux sau de colecție, o daună aparent medie poate duce la daune totale financiare din cauza costului pieselor originale de fabrică. Dacă polița aplică uzură forfetară sau catalog generic, despăgubirea poate fi substanțial sub valoarea reală a mașinii.",
    whatToCheck: "Dacă polița CASCO funcționează pe principiul Valorii Agreate (fără depreciere arbitrară), dacă reparațiile sunt garantate exclusiv în rețeaua oficială a mărcii și care sunt excluderile legate de circuit sau evenimente private."
  },
  {
    id: "ceasuri-bijuterii-furt",
    category: "Ceasuri, Bijuterii & Colecții",
    title: "Un ceas sau o bijuterie furate ori deteriorate accidental",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1000&q=80",
    alt: "Ceas de colecție și cutie de bijuterii de mare valoare",
    whatHappens: "Sustragerea dintr-o cameră de hotel în timpul unei vacanțe, spargerea locuinței sau deteriorarea mecanismului complicat în urma unui șoc mecanic.",
    financialImpact: "Polițele standard de locuință conțin de regulă o sub-limită severă pentru bunuri de valoare (adesea 1.000–2.500 EUR per obiect), complet insuficientă pentru o piesă de orologerie de zeci de mii de euro. Diferența devine o pierdere directă suportată din propriul buzunar.",
    whatToCheck: "Dacă bunurile valoroase sunt declarate nominativ pe o listă agreată (cu certificate de autenticitate și facturi), dacă acoperirea este de tip all-risks la nivel mondial (worldwide) și dacă există condiții restrictive privind seiful omologat."
  },
  {
    id: "frauda-cyber-date",
    category: "Securitate Digitală & Cyber",
    title: "O fraudă cibernetică ce compromite fondurile sau datele companiei",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1000&q=80",
    alt: "Sistem cibernetic și securitate digitală în stare de alertă",
    whatHappens: "Un atac de tip phishing sofisticat direcționat către conducere (Business Email Compromise), blocarea serverelor operaționale prin ransomware sau furtul de date confidențiale ale clienților.",
    financialImpact: "Pierderea directă a banilor transferați fraudulos este doar primul pas. Urmează costurile de investigație IT criminalistică (forensics), restaurarea sistemelor, amenzi de conformitate și răspunderea civilă față de terții ale căror date au fost expuse.",
    whatToCheck: "Dacă polița cyber include frauda prin inginerie socială, asistență imediată în caz de criză cu echipă dedicată de răspuns la incidente și care sunt standardele de securitate pe care trebuie să le dovedești pentru ca dauna să fie acceptată."
  },
  {
    id: "afacere-oprita-incident",
    category: "Afaceri & Continuitate Operațională",
    title: "O afacere oprită brusc de un incident operațional sau avarie",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80",
    alt: "Clădire de birouri și sediu operațional al unei companii",
    whatHappens: "O avarie la tabloul electric principal, un incendiu într-un depozit de logistică sau o defecțiune catastrofală a unui utilaj cheie opresc activitatea operațională timp de săptămâni sau luni.",
    financialImpact: "Veniturile încetează instantaneu, însă costurile fixe nu așteaptă: salarii, chirii, rate de leasing și credite bancare trebuie plătite în fiecare lună. În plus, clienții pot aplica penalități contractuale pentru nerespectarea termenelor de livrare.",
    whatToCheck: "Dacă polița acoperă explicit Întreruperea Activității (Business Interruption), care este perioada maximă de indemnizare (12, 18 sau 24 de luni) și ce franșiză temporală (număr de ore deductibile) se aplică."
  },
  {
    id: "raspundere-litigii",
    category: "Răspundere Civilă & Management",
    title: "Un litigiu sau o cerere de despăgubire care produce costuri masive",
    image: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1000&q=80",
    alt: "Documente juridice și analiză de răspundere contractuală",
    whatHappens: "O eroare profesională a echipei, un incident petrecut pe proprietatea administrată sau o decizie de management contestată în instanță de asociați, parteneri ori autorități.",
    financialImpact: "Chiar și atunci când acuzațiile sunt nefondate, cheltuielile cu echipele de avocați, experții independenți și taxele de judecată pot depăși cu ușurință zeci de mii de euro, înainte ca o instanță să se pronunțe definitiv.",
    whatToCheck: "Dacă limitele de răspundere profesională sau D&O (Directori & Administratori) sunt dimensionate la expunerea reală, dacă cheltuielile de apărare sunt acoperite peste limita principală și dacă se aplică clauza de retroactivitate."
  }
];

export function RiskConsequences() {
  return (
    <section className="py-24 bg-zinc-50/70 border-b border-zinc-200/80" aria-labelledby="consequences-heading">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-red-700 text-xs font-semibold tracking-wider uppercase border border-red-200/80 mb-4">
            <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
            Conștientizarea Riscurilor & Protecția Patrimoniului
          </div>
          <h2 id="consequences-heading" className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-zinc-950 tracking-tight leading-tight mb-6">
            Ce ai construit în ani de zile{" "}
            <span className="text-zinc-500 font-normal">se poate pierde într-un singur eveniment.</span>
          </h2>
          <p className="text-base sm:text-lg text-zinc-600 leading-relaxed font-normal">
            Cele mai costisitoare pierderi nu apar din lipsa unei polițe, ci din convingerea că ești protejat când în realitate contractul conține excluderi, limite depășite sau clauze nerespectate. Înțelege ce ai de pierdut înainte să afli cât te costă.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {consequences.map((item) => (
            <article 
              key={item.id}
              className="bg-white rounded-2xl border border-zinc-200/90 shadow-sm overflow-hidden flex flex-col hover:border-zinc-300 hover:shadow-md transition-all duration-300"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-100">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 380px"
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-md bg-zinc-900/85 backdrop-blur-xs text-white text-[11px] font-medium tracking-wide">
                    {item.category}
                  </span>
                </div>
              </div>

              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-5">
                <div>
                  <h3 className="text-lg font-heading font-bold text-zinc-900 leading-snug mb-4">
                    {item.title}
                  </h3>

                  <div className="space-y-3.5 text-xs sm:text-sm text-zinc-600 leading-relaxed">
                    <div>
                      <span className="font-semibold text-zinc-900 block text-xs uppercase tracking-wider mb-1">
                        Ce se poate întâmpla
                      </span>
                      <p>{item.whatHappens}</p>
                    </div>

                    <div className="pt-2 border-t border-zinc-100">
                      <span className="font-semibold text-red-900 block text-xs uppercase tracking-wider mb-1">
                        Ce costuri pot apărea
                      </span>
                      <p className="text-zinc-700">{item.financialImpact}</p>
                    </div>

                    <div className="pt-2 border-t border-zinc-100">
                      <span className="font-semibold text-zinc-900 flex items-center gap-1.5 text-xs uppercase tracking-wider mb-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                        Ce trebuie verificat
                      </span>
                      <p className="text-zinc-600 bg-zinc-50 p-2.5 rounded-lg border border-zinc-100">
                        {item.whatToCheck}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-zinc-100">
                  <Link
                    href="/verifica-polita"
                    className="inline-flex items-center text-xs font-semibold text-zinc-900 hover:text-blue-600 transition-colors group"
                  >
                    <span>Verifică dacă ești expus la acest risc</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-white border border-zinc-200/90 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0 mt-0.5">
              <HelpCircle className="w-5 h-5 text-amber-700" />
            </div>
            <div>
              <h4 className="text-base font-bold text-zinc-900 mb-1">
                Nu știi exact care dintre aceste situații te-ar putea afecta?
              </h4>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed max-w-2xl">
                O verificare preventivă durează puțin, dar elimină nesiguranța. Analizăm contractele existente și expunerea patrimoniului tău fără niciun angajament de cumpărare.
              </p>
            </div>
          </div>
          <Link
            href="/verifica-polita"
            className="w-full sm:w-auto shrink-0 px-6 py-3 rounded-full bg-zinc-900 text-white hover:bg-black font-semibold text-xs uppercase tracking-wider text-center shadow-sm"
          >
            Nu știu dacă sunt protejat
          </Link>
        </div>
      </div>
    </section>
  );
}
