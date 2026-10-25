import Image from "next/image";
import Link from "next/link";
import { servicesData } from "@/data/services";
import { ServiceDirectAnswer } from "@/components/sections/service-direct-answer";
import { AlertTriangle, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  slug: string;
};

interface ServiceRiskVisual {
  image: string;
  alt: string;
  categoryBadge: string;
  headline: string;
  consequenceLead: string;
  whatToCheck: string;
}

const humanizeSlug = (slug: string) =>
  slug
    .split("-")
    .map(word => {
      const upper = word.toUpperCase();
      if (["RCA", "CASCO", "PAD", "IMM"].includes(upper)) return upper;
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");

function getServiceRiskVisual(slug: string): ServiceRiskVisual {
  if (slug.includes("casco") || slug === "auto-insurance") {
    return {
      image: "/images/risks/supercar-crash-cinematic.jpg",
      alt: "Supercar exotic avariat grav în coliziune pe carosabil umed cu avarii structurale severe",
      categoryBadge: "Automobile & CASCO",
      headline: "O mașină de lux poate deveni, într-o secundă, o daună majoră.",
      consequenceLead: "Costul pieselor originale de fabrică, decontarea în rețeaua oficială a constructorului și absența deprecierii forfetare de catalog fac diferența între o reparație garantată și o pierdere directă de zeci de mii de euro.",
      whatToCheck: "Verifică dacă polița funcționează pe principiul Valorii Agreate și acoperă explicit reparațiile în service-ul de marcă."
    };
  }
  if (slug.includes("rca")) {
    return {
      image: "/images/risks/car-collision-rca.jpg",
      alt: "Coliziune pe șosea cu avarii materiale severe și răspundere față de terți",
      categoryBadge: "Răspundere Auto & RCA",
      headline: "Impact în lanț sau vătămări corporale produse terților",
      consequenceLead: "Când ești responsabil de un accident grav, limitele legale de răspundere și decontarea directă cu asiguratorul tău elimină stresul birocratic și întârzierile majore de plată.",
      whatToCheck: "Verifică opțiunea de Decontare Directă pentru a repara mașina prin propriul asigurator, indiferent de firma vinovatului."
    };
  }
  if (slug.includes("fleet")) {
    return {
      image: "/images/risks/storm-tree-crushed-car.jpg",
      alt: "Vehicul comercial din flotă avariat de căderea unui copac cu blocarea livrărilor",
      categoryBadge: "Flote Auto Comerciale",
      headline: "Imobilizarea flotei comerciale și penalități contractuale de întârziere",
      consequenceLead: "Fiecare autovehicul oprit din cauza unui incident rutier sau furt afectează direct fluxul operațional de livrări și veniturile companiei.",
      whatToCheck: "Verifică dacă polița de flotă include vehicul la schimb de categorie similară și asistență rutieră dedicată non-stop."
    };
  }
  if (slug.includes("roadside")) {
    return {
      image: "/images/risks/car-crash.jpg",
      alt: "Automobil avariat pe carosabil și asistență tehnică de urgență",
      categoryBadge: "Asistență Rutieră & Tractare",
      headline: "Avarie mecanică, pană sau accident pe timp de noapte sau în afara țării",
      consequenceLead: "Tractarea neprevăzută de pe autostradă, cazarea pasagerilor și repatrierea vehiculului pot costa mii de euro fără o acoperire dedicată.",
      whatToCheck: "Verifică raza kilometrică de tractare gratuită și asistența directă la nivel european."
    };
  }
  if (slug.includes("home") || slug.includes("pad")) {
    return {
      image: "/images/risks/villa-fire-cinematic.jpg",
      alt: "Vilă rezidențială cuprinsă de incendiu violent în timpul nopții impunând reconstrucție integrală",
      categoryBadge: "Locuințe & Proprietăți",
      headline: "Cât te-ar costa să reconstruiești vila, nu cât ai putea să o vinzi?",
      consequenceLead: "Costurile reale de reconstrucție (demolare, evacuare moloz, materiale scumpe și manoperă) depășesc adesea suma asigurată a contractelor vechi, expunându-te riscului de subasigurare.",
      whatToCheck: "Verifică dacă suma asigurată reflectă prețurile actualizate din construcții și include cheltuielile de cazare temporară."
    };
  }
  if (slug.includes("personal-goods")) {
    return {
      image: "/images/risks/flooded-luxury-living.jpg",
      alt: "Living modern de lux inundat cu mobilier de designer și finisaje compromise",
      categoryBadge: "Bunuri & Valori Personale",
      headline: "Conductă spartă în timp ce ești plecat: mobilă și finisaje compromise",
      consequenceLead: "O conductă spartă în timpul deplasărilor poate distruge finisaje de zeci de mii de euro și bunurile vecinilor de la etajele inferioare.",
      whatToCheck: "Verifică limita de răspundere civilă față de vecini și clauza de All-Risks pentru bunurile casnice."
    };
  }
  if (slug.includes("cyber")) {
    return {
      image: "/images/risks/ransomware.jpg",
      alt: "Terminal de companie blocat prin atac de criptare ransomware și cerere de răscumpărare",
      categoryBadge: "Securitate Digitală & Cyber",
      headline: "Un atac cibernetic poate opri o afacere înainte să observi amploarea pagubelor.",
      consequenceLead: "Companiile vizate de atacuri cyber suferă pierderi financiare directe prin transferuri frauduloase (CEO fraud), amenzi de conformitate GDPR și costuri mari de restaurare IT.",
      whatToCheck: "Verifică dacă polița include echipă de intervenție forensic 24/7 și acoperirea fraudelor prin inginerie socială."
    };
  }
  if (slug.includes("interruption") || slug.includes("imm")) {
    return {
      image: "/images/risks/commercial-fire.jpg",
      alt: "Depozit comercial avariat de incendiu industrial cu activitatea operațională sistată complet",
      categoryBadge: "Continuitatea Afacerii & IMM",
      headline: "O afacere oprită brusc: veniturile încetează, dar costurile fixe continuă",
      consequenceLead: "O avarie electrică sau un incendiu în depozit pot opri activitatea timp de luni de zile. Salariile, chiriile și ratele bancare trebuie plătite chiar dacă producția este sistată.",
      whatToCheck: "Verifică dacă perioada maximă de indemnizare este de minimum 12–24 luni și ce franșiză temporală se aplică."
    };
  }
  if (slug.includes("building")) {
    return {
      image: "/images/risks/storm-severe-damage.jpg",
      alt: "Acoperiș și clădire comercială avariate grav de furtună extremă",
      categoryBadge: "Clădiri & Spații Comerciale",
      headline: "O singură furtună poate schimba totul: patrimoniul imobiliar compromis",
      consequenceLead: "Evaluarea la valoarea contabilă istorică lasă clădirile comerciale grav subasigurate în fața costurilor actuale de reconstrucție industrială.",
      whatToCheck: "Verifică dacă evaluarea este făcută la cost de înlocuire nou și include instalațiile HVAC și panourile fotovoltaice."
    };
  }
  if (slug.includes("goods") || slug.includes("cargo")) {
    return {
      image: "/images/risks/cargo-truck-overturned.jpg",
      alt: "Camion de transport internațional răsturnat pe șosea cu marfă împrăștiată și distrusă",
      categoryBadge: "Marfă & Transport Cargo",
      headline: "Răsturnarea sau furtul mărfii în tranzit internațional",
      consequenceLead: "Convenția CMR limitează despăgubirea la aproximativ 10–12 EUR/kg, sumă infimă pentru componente electronice sau produse de mare valoare.",
      whatToCheck: "Încheie întotdeauna o poliță Cargo All-Risks la valoarea reală a facturii mărfii transportate."
    };
  }
  if (slug.includes("equipment")) {
    return {
      image: "/images/risks/heavy-machinery-breakdown.jpg",
      alt: "Utilaj industrial CNC inspectat după avarie electronică severă și scurtcircuit",
      categoryBadge: "Utilaje & Echipamente",
      headline: "Defecțiune mecanică sau supratensiune ce blochează linia tehnologică",
      consequenceLead: "Garanția producătorului nu acoperă erorile de operare, fluctuațiile de tensiune sau corpurile străine pătrunse în utilaj.",
      whatToCheck: "Verifică acoperirea pentru Avarii Accidentale la Utilaje (Machinery Breakdown) inclusiv erorile umane."
    };
  }
  if (slug.includes("construction")) {
    return {
      image: "/images/risks/industrial-plant-incident.jpg",
      alt: "Incident grav pe șantier de construcții industriale cu utilaje avariate și oprirea lucrărilor",
      categoryBadge: "Construcții & Șantiere (CAR)",
      headline: "Prăbușirea structurilor temporare, furturi de pe șantier sau fisurarea clădirilor vecine",
      consequenceLead: "Orice incident pe șantier atrage penalități de întârziere față de beneficiar și riscuri de daune aduse proprietăților adiacente.",
      whatToCheck: "Verifică dacă polița CAR include răspunderea civilă contractuală și perioada de mentenanță extinsă."
    };
  }
  if (slug.includes("liability") || slug.includes("malpractice") || slug.includes("directors")) {
    return {
      image: "/images/risks/legal-litigation.jpg",
      alt: "Dosare de litigiu și balanța justiției pentru cereri masive de despăgubire civilă și profesională",
      categoryBadge: "Răspundere & Management (D&O)",
      headline: "Eroare profesională, litigiu al asociaților sau cereri de despăgubire",
      consequenceLead: "Cheltuielile cu echipele de avocați, taxele de timbru și experții independenți pot costa zeci de mii de euro chiar și atunci când acuzațiile sunt nefondate.",
      whatToCheck: "Verifică dacă cheltuielile de apărare sunt acoperite peste limita principală și dacă se aplică clauza de retroactivitate."
    };
  }
  if (slug.includes("travel")) {
    return {
      image: "/images/risks/ocean-tempest-yacht.jpg",
      alt: "Furtună violentă pe mare și urgențe medicale internaționale",
      categoryBadge: "Călătorii & Urgențe Medicale",
      headline: "Urgență medicală în străinătate și evacuare sanitară internațională",
      consequenceLead: "Facturile de spitalizare privată în străinătate și un zbor de repatriere medicală pot depăși cu ușurință 50.000–100.000 EUR.",
      whatToCheck: "Verifică dacă suma asigurată este de minimum 50.000–100.000 EUR și include decontare directă fără plată din buzunar."
    };
  }
  if (slug.includes("health")) {
    return {
      image: "/images/risks/hospital-emergency-surgery.jpg",
      alt: "Bloc operator privat pentru intervenție chirurgicală complexă și investigații",
      categoryBadge: "Sănătate & Spitalizare Privată",
      headline: "Diagnostic critic, intervenție chirurgicală și acces rapid la spitale private",
      consequenceLead: "Când apare o problemă gravă de sănătate, timpul de așteptare și costul tratamentelor într-un spital de top pot epuiza rapid economiile familiei.",
      whatToCheck: "Verifică rețeaua de spitale cu decontare directă și accesul la a doua opinie medicală internațională."
    };
  }
  if (slug.includes("accident")) {
    return {
      image: "/images/risks/accident-orthopedic-trauma.jpg",
      alt: "Fractură severă și recuperare medicală prelungită după un accident neprevăzut",
      categoryBadge: "Accidente & Invaliditate",
      headline: "Incapacitate temporară de muncă și recuperare prelungită după accident",
      consequenceLead: "Un traumatism grav oprește generarea de venituri, însă cheltuielile zilnice ale familiei și ratele bancare continuă să vină lună de lună.",
      whatToCheck: "Verifică indemnizația zilnică de spitalizare și procentele de despăgubire pentru invaliditate permanentă."
    };
  }
  return {
    image: "/images/risks/villa-fire-cinematic.jpg",
    alt: "Protecția patrimoniului și a capitalului în fața dezastrelor neprevăzute",
    categoryBadge: "Protecția Patrimoniului",
    headline: "Protecția patrimoniului și a continuității financiare",
    consequenceLead: "În lipsa unui capital garantat, familia sau compania se pot confrunta cu vânzarea precipitată a activelor sau insolvență.",
    whatToCheck: "Verifică dacă acoperirile sunt corelate cu valoarea reală a patrimoniului expus."
  };
}

export function ServicePageIntro({ slug }: Props) {
  const service = servicesData[slug];
  const serviceName = service?.title ?? humanizeSlug(slug);
  const benefits = service?.benefits.map(benefit => `${benefit.title}: ${benefit.description}`).join(" ") ??
    "Primești o structură de protecție clară, adaptată situației tale, cu opțiuni comparate pe acoperiri, limite, excluderi și costuri.";

  const riskVisual = getServiceRiskVisual(slug);

  return (
    <div className="container mx-auto px-4 max-w-6xl pt-28 md:pt-36 space-y-12">
      <ServiceDirectAnswer
        problemSolved={service?.problemSolved ?? `Rezolvă expunerea financiară specifică pentru ${serviceName}: costuri neprevăzute, întârzieri în despăgubire, lipsă de acoperire și decizii luate fără comparație reală între opțiuni.`}
        whoIsItFor={service?.whoItsFor ?? `Este pentru persoane, familii sau companii care au nevoie de ${serviceName} și vor o recomandare verificată înainte de a semna o poliță.`}
        whyCare={service?.whyCare ?? "O poliță aleasă superficial poate părea ieftină, dar poate exclude exact situația în care ai nevoie de bani, timp și suport rapid."}
        whatIGain={benefits}
        timeSaved={service?.timeMoneySaved ?? "Economisești ore sau zile de comparații, formulare și clarificări, pentru că primești rapid opțiunile relevante și pașii următori."}
        moneySaved={service?.timeMoneySaved ?? "Reduci riscul de supraplată, franșize nepotrivite sau acoperiri lipsă care pot costa mult mai mult decât diferența de primă."}
        risksRemoved={service?.risksRemoved.join(" ") ?? "Dispar riscul de subasigurare, riscul excluderilor neînțelese, riscul limitelor prea mici și riscul de a descoperi problema abia la daună."}
        whyContactNow={service?.urgency ?? "Cel mai bun moment este înainte de incident sau înainte de reînnoire, când poți ajusta acoperirea fără presiune și fără costuri de criză."}
      />

      {/* EDITORIAL RISK CONSEQUENCE CARD */}
      <section className="bg-zinc-950 text-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-zinc-800 shadow-xl overflow-hidden relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 relative aspect-[16/11] rounded-2xl overflow-hidden border border-zinc-800 shadow-md">
            <Image
              src={riskVisual.image}
              alt={riskVisual.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 450px"
              className="object-cover"
              loading="lazy"
            />
            <div className="absolute top-3 left-3">
              <span className="px-3 py-1 rounded-md bg-zinc-950/85 backdrop-blur-xs text-white text-[11px] font-semibold tracking-wide border border-zinc-800">
                {riskVisual.categoryBadge}
              </span>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-950/80 text-red-400 text-xs font-semibold uppercase tracking-wider border border-red-800/80">
              <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
              Înțelege ce ai de pierdut înainte să afli cât te costă
            </div>

            <h3 className="text-xl sm:text-2xl font-heading font-bold text-white tracking-tight leading-snug">
              {riskVisual.headline}
            </h3>

            <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed">
              {riskVisual.consequenceLead}
            </p>

            <div className="p-4 rounded-xl bg-zinc-900/90 border border-zinc-800 text-xs text-zinc-300 flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>
                <strong className="text-white block mb-0.5">Ce trebuie să verifici în contract:</strong>
                {riskVisual.whatToCheck}
              </span>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Button 
                size="sm"
                className="rounded-full bg-white text-zinc-950 hover:bg-zinc-200 font-semibold px-5 h-10 text-xs tracking-wide shadow-sm"
                asChild
              >
                <Link href="/contact">
                  Solicită o analiză confidențială
                  <ArrowRight className="ml-1.5 w-3.5 h-3.5" />
                </Link>
              </Button>
              <Button 
                size="sm"
                variant="outline"
                className="rounded-full border-zinc-700 bg-zinc-900 text-zinc-200 hover:bg-zinc-800 hover:text-white px-5 h-10 text-xs font-medium"
                asChild
              >
                <Link href="/verifica-polita">Verifică dacă ai lacune</Link>
              </Button>
            </div>

            <p className="text-[11px] text-zinc-500 leading-relaxed pt-2 border-t border-zinc-850">
              * Notă: Scenariile și valorile de risc menționate sunt exemple orientative pentru conștientizarea riscurilor. Condițiile efective de despăgubire depind exclusiv de termenii poliței contractate.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

