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
    title: "Cât te-ar costa să reconstruiești vila, nu cât ai putea să o vinzi?",
    image: "/images/risks/villa-fire-cinematic.jpg",
    alt: "Vilă arhitecturală modernă cuprinsă de incendiu violent în timpul nopții, cu intervenția autospecialelor de pompieri în ploaie torențială",
    whatHappens: "Un scurtcircuit la panourile fotovoltaice, o defecțiune la instalația smart home sau un incendiu de vegetație pot mistui complet structura, tâmplăria din aluminiu și finisajele de autor ale unei vile.",
    financialImpact: "Costul reconstrucției depășește adesea cu 30–50% valoarea de piață: autorizații noi, demolare, proiectare specială și materiale importate la prețurile actuale. În plus, chiria unei locuințe echivalente pe durata reconstrucției (12–24 luni) adaugă zeci de mii de euro.",
    whatToCheck: "Dacă suma asigurată este stabilită la costul real de reconstrucție nou (fără subasigurare) și dacă polița include explicit demolarea, evacuarea molozului și cazarea temporară de lux."
  },
  {
    id: "auto-dauna-totala",
    category: "Automobile de Valoare & CASCO",
    title: "O mașină de lux poate deveni, într-o secundă, o daună majoră.",
    image: "/images/risks/supercar-crash-cinematic.jpg",
    alt: "Supercar exotic avariat grav într-o coliziune rutieră pe carosabil umed, cu caroserie din carbon zdrobită și airbaguri declanșate",
    whatHappens: "O coliziune pe carosabil umed, o acroșare în trafic sau un parapet lovit distrug instantaneu elementele din fibră de carbon, structura frontală și blocurile optice cu tehnologie laser.",
    financialImpact: "La vehiculele de performanță, reparația depășește rapid 70.000–120.000 EUR. Dacă polița CASCO aplică tabele generice de depreciere sau refuză decontarea la reprezentanța oficială, diferența devine o pierdere directă uriașă suportată din buzunar.",
    whatToCheck: "Dacă polița CASCO funcționează pe principiul Valorii Agreate (fără depreciere forfetară de catalog) și garantează reparația exclusiv în rețeaua oficială a constructorului."
  },
  {
    id: "furtuna-acoperis-structura",
    category: "Fenomene Extreme & Acoperișuri",
    title: "O singură furtună poate schimba totul.",
    image: "/images/risks/storm-severe-damage.jpg",
    alt: "Acoperiș rezidențial cu țigle și structură expuse la furtună extremă și descărcări electrice violente",
    whatHappens: "Rafalele de peste 100 km/h smulg învelitoarea acoperișului, grindina extremă sparge luminatoarele, iar apa torențială pătrunde nestingherită prin planșee și tavane până la parter.",
    financialImpact: "Dauna nu se oprește la refacerea acoperișului: apa distruge termoizolația, tavanele din gips-carton, instalația electrică îngropată și parchetul masiv de pe toate nivelurile clădirii.",
    whatToCheck: "Dacă polița acoperă fenomenele meteo extreme fără franșize ascunse și dacă include infiltrațiile de apă rezultate din deteriorarea acoperișului."
  },
  {
    id: "inundatie-interioara-lux",
    category: "Finisaje Premium & Daune de Apă",
    title: "O conductă spartă în timp ce ești plecat: parchet și finisaje compromise",
    image: "/images/risks/flooded-luxury-living.jpg",
    alt: "Living modern de lux inundat cu apă de 40 cm, canapea de designer scufundată și finisaje de autor afectate",
    whatHappens: "Un racord flexibil cedat la etaj sau o defecțiune a sistemului de climatizare în timpul unei deplasări de weekend refulează sute de litri de apă pe oră pe suprafețele de lux.",
    financialImpact: "Parchetul din lemn masiv se umflă și se desprinde, mobilierul la comandă este compromis ireversibil, iar mucegaiul structural impune decaparea completă a pereților și tratamente speciale de uscare.",
    whatToCheck: "Dacă limita pentru avarii accidentale ale instalațiilor de apă acoperă integral bunurile casnice de valoare și include răspunderea civilă față de vecini."
  },
  {
    id: "ceasuri-bijuterii-furt",
    category: "Ceasuri, Bijuterii & Colecții",
    title: "Ce se întâmplă dacă un obiect valoros nu este declarat corect în poliță?",
    image: "/images/risks/burglary-jeweler.jpg",
    alt: "Vitrină securizată cu geam spart și urme clare de efracție și sustragere de ceasuri de lux",
    whatHappens: "Sustragerea dintr-o cameră de hotel în vacanță, efracția locuinței prin forțarea vitrinei sau pierderea accidentală a unei piese de orologerie unicat în călătorii.",
    financialImpact: "Polițele standard conțin o sub-limită severă pentru bunuri de valoare (1.000–2.500 EUR per obiect), complet insuficientă pentru un ceas Patek Philippe sau bijuterii de zeci de mii de euro. Restul este pierdere 100% suportată de proprietar.",
    whatToCheck: "Dacă bunurile sunt asigurate nominativ pe bază de certificate și facturi, cu acoperire All-Risks la nivel mondial (Worldwide) și fără clauze absurde privind purtarea în public."
  },
  {
    id: "frauda-cyber-date",
    category: "Securitate Digitală & Cyber",
    title: "Un atac cibernetic poate opri o afacere înainte să observi amploarea pagubelor.",
    image: "/images/risks/ransomware.jpg",
    alt: "Ecran de server blocat complet prin atac de criptare malware GoldenEye ransomware",
    whatHappens: "Un atac phishing sofisticat direcționat către management (CEO fraud), infectarea rețelei cu ransomware sau exfiltrarea bazei de date cu clienți și contracte confidențiale.",
    financialImpact: "Transferurile frauduloase, blocarea completă a facturării și producției, investigațiile IT forensics acreditate, amenzile GDPR și litigiile partenerilor pot decapitaliza o firmă în câteva săptămâni.",
    whatToCheck: "Dacă polița cyber include răspuns la incidente 24/7 cu negociatori acreditați, acoperirea ingineriei sociale și cheltuielile de restaurare a bazelor de date."
  },
  {
    id: "afacere-oprita-incident",
    category: "Afaceri & Continuitate Operațională",
    title: "O afacere oprită brusc de un incendiu sau avarie industrială",
    image: "/images/risks/industrial-fire-interruption.jpg",
    alt: "Hală industrială de producție cu linii robotizate și utilaje complet distruse în incendiu, activitate de fabricație sistată",
    whatHappens: "O avarie la tabloul electric principal, un incendiu într-un depozit de logistică sau o defecțiune catastrofală a unui utilaj cheie opresc activitatea operațională timp de săptămâni sau luni.",
    financialImpact: "Veniturile încetează instantaneu, însă costurile fixe nu așteaptă: salarii, chirii, rate de leasing și credite bancare trebuie plătite în fiecare lună. În plus, clienții pot aplica penalități contractuale pentru nerespectarea termenelor de livrare.",
    whatToCheck: "Dacă polița acoperă explicit Întreruperea Activității (Business Interruption), care este perioada maximă de indemnizare (12, 18 sau 24 de luni) și ce franșiză temporală (număr de ore deductibile) se aplică."
  },
  {
    id: "arbore-doborat-garaj",
    category: "Daune Naturale & Răspundere",
    title: "Un copac prăbușit peste automobil sau garaj în timpul nopții",
    image: "/images/risks/storm-tree-crushed-car.jpg",
    alt: "Arbore masiv prăbușit peste automobil pe carosabil după o furtună violentă",
    whatHappens: "Vântul violent prăbușește un arbore masiv din spațiul public sau din curtea vecină direct peste vehiculul parcat, strivind plafonul și structura montantilor.",
    financialImpact: "Litigiile cu primăria sau proprietarul terenului durează ani de zile fără certitudinea recuperării banilor. Doar o poliță CASCO completă fără regres despăgubește imediat dauna totală.",
    whatToCheck: "Dacă polița CASCO acoperă explicit căderea de corpuri pe autovehicul fără obligativitatea identificării unui vinovat responsabil civilmente."
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

        {/* Cinematic Asymmetric Featured Showcase */}
        <div className="mb-16 grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 relative rounded-3xl overflow-hidden bg-zinc-950 border border-zinc-800 shadow-xl min-h-[380px] sm:min-h-[440px] flex flex-col justify-end p-8 sm:p-10 group">
            <Image
              src="/images/risks/villa-fire-cinematic.jpg"
              alt="Incendiu violent la vilă rezidențială modernă cu autospeciale de intervenție"
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover opacity-60 group-hover:opacity-70 group-hover:scale-105 transition-all duration-700"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
            <div className="relative z-10 space-y-3">
              <span className="inline-block px-3 py-1 rounded-full bg-red-600/90 text-white text-[11px] font-bold tracking-wider uppercase">
                Daună Catastrofală Rezidențială
              </span>
              <h3 className="text-2xl sm:text-3xl font-heading font-extrabold text-white tracking-tight leading-snug">
                „Cât te-ar costa să reconstruiești vila, nu cât ai putea să o vinzi?”
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-xl">
                O locuință de autor distrusă de incendiu impune demolare, evacuare de moloz, avize și manoperă la tarife actualizate. În lipsa unei evaluări la cost de reconstrucție nou, diferența devine o gaură financiară de sute de mii de euro.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 grid grid-cols-1 gap-6">
            <div className="relative rounded-3xl overflow-hidden bg-zinc-950 border border-zinc-800 shadow-lg min-h-[200px] flex flex-col justify-end p-6 group">
              <Image
                src="/images/risks/supercar-crash-cinematic.jpg"
                alt="Automobil de lux distrus în coliziune gravă pe carosabil umed"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover opacity-55 group-hover:opacity-65 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-transparent" />
              <div className="relative z-10 space-y-1.5">
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-blue-600/90 text-white text-[10px] font-bold tracking-wider uppercase">
                  CASCO Valoare Agreată
                </span>
                <h4 className="text-lg font-heading font-bold text-white leading-snug">
                  „O mașină de lux poate deveni, într-o secundă, o daună majoră.”
                </h4>
                <p className="text-xs text-zinc-300 leading-relaxed line-clamp-2">
                  Elementele de fibră de carbon și senzorii calibrați din fabrică cer decontare fără depreciere forfetară.
                </p>
              </div>
            </div>

            <div className="relative rounded-3xl overflow-hidden bg-zinc-950 border border-zinc-800 shadow-lg min-h-[200px] flex flex-col justify-end p-6 group">
              <Image
                src="/images/risks/storm-severe-damage.jpg"
                alt="Acoperiș rezidențial expus la furtună violentă și descărcări atmosferice"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover opacity-55 group-hover:opacity-65 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-transparent" />
              <div className="relative z-10 space-y-1.5">
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-amber-600/90 text-white text-[10px] font-bold tracking-wider uppercase">
                  Climă Extremă
                </span>
                <h4 className="text-lg font-heading font-bold text-white leading-snug">
                  „O singură furtună poate schimba totul.”
                </h4>
                <p className="text-xs text-zinc-300 leading-relaxed line-clamp-2">
                  Infiltrațiile prin acoperișul smuls de vânt compromit toate etajele inferioare dacă polița nu e completă.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed 8-Card Consequence Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 280px"
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-md bg-zinc-900/85 backdrop-blur-xs text-white text-[11px] font-medium tracking-wide">
                    {item.category}
                  </span>
                </div>
              </div>

              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-base font-heading font-bold text-zinc-900 leading-snug mb-3.5">
                    {item.title}
                  </h3>

                  <div className="space-y-3 text-xs text-zinc-600 leading-relaxed">
                    <div>
                      <span className="font-semibold text-zinc-900 block text-[11px] uppercase tracking-wider mb-1">
                        Ce se poate întâmpla
                      </span>
                      <p>{item.whatHappens}</p>
                    </div>

                    <div className="pt-2 border-t border-zinc-100">
                      <span className="font-semibold text-red-900 block text-[11px] uppercase tracking-wider mb-1">
                        Ce costuri pot apărea (exemplu orientativ)
                      </span>
                      <p className="text-zinc-700">{item.financialImpact}</p>
                    </div>

                    <div className="pt-2 border-t border-zinc-100">
                      <span className="font-semibold text-zinc-900 flex items-center gap-1 text-[11px] uppercase tracking-wider mb-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                        Ce trebuie verificat
                      </span>
                      <p className="text-zinc-600 bg-zinc-50 p-2 rounded-lg border border-zinc-100">
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
        
        <div className="mt-8 text-center">
          <p className="text-[11px] text-zinc-500 max-w-3xl mx-auto leading-relaxed">
            * Notă informativă: Sumele, intervalele de cost și scenariile menționate pe această pagină reprezintă exemple orientative și ilustrative din practica de daune din piață. Ele nu constituie statistici oficiale, oferte ferme sau promisiuni de despăgubire garantată. Costurile reale diferă în funcție de caracteristicile fiecărui bun, devizele unităților reparatoare și condițiile contractuale specifice poliței încheiate.
          </p>
        </div>
      </div>
    </section>
  );
}
