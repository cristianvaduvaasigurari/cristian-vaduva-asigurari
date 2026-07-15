import { servicesData } from "@/data/services";
import { ServiceDirectAnswer } from "@/components/sections/service-direct-answer";

type Props = {
  slug: string;
};

const humanizeSlug = (slug: string) =>
  slug
    .split("-")
    .map(word => {
      const upper = word.toUpperCase();
      if (["RCA", "CASCO", "PAD", "IMM"].includes(upper)) return upper;
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");

export function ServicePageIntro({ slug }: Props) {
  const service = servicesData[slug];
  const serviceName = service?.title ?? humanizeSlug(slug);
  const benefits = service?.benefits.map(benefit => `${benefit.title}: ${benefit.description}`).join(" ") ??
    "Primești o structură de protecție clară, adaptată situației tale, cu opțiuni comparate pe acoperiri, limite, excluderi și costuri.";

  return (
    <div className="container mx-auto px-4 max-w-6xl pt-6">
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
    </div>
  );
}
