import { ArrowRight, Smartphone, Globe } from "lucide-react";
import Link from "next/link";
import { CONTACT } from "@/config/contact";

const ecosystems = [
  {
    icon: <Globe className="w-8 h-8" />,
    title: "Site Personal",
    description: "Portofoliul complet de servicii, expertiză și consultanță strategică Cristian Văduva.",
    href: CONTACT.ecosystem.website,
    gradient: "from-purple-500 to-pink-600"
  },
  {
    icon: <Globe className="w-8 h-8" />,
    title: "AiXLuxury",
    description: "O selecție exclusivistă de proprietăți de lux și oportunități investiționale high-end.",
    href: CONTACT.ecosystem.aixluxury,
    gradient: "from-amber-500 to-orange-400"
  },
  {
    icon: <Globe className="w-8 h-8" />,
    title: "Generali",
    description: "Partenerul principal pentru asigurări de viață, sănătate, bunuri și protecția patrimoniului.",
    href: CONTACT.ecosystem.generali,
    gradient: "from-green-500 to-teal-400"
  },
  {
    icon: <Smartphone className="w-8 h-8" />,
    title: "AiX OS",
    description: "Sistemul de operare al viitorului pentru management financiar inteligent și portofolii de active.",
    href: CONTACT.ecosystem.os,
    gradient: "from-purple-500 to-pink-500"
  },
  {
    icon: <Globe className="w-8 h-8" />,
    title: "Home Find",
    description: "Sistem inteligent pentru identificarea și achiziția de proprietăți off-market.",
    href: CONTACT.ecosystem.homefind,
    gradient: "from-emerald-400 to-emerald-600"
  },
  {
    icon: <Globe className="w-8 h-8" />,
    title: "AiX Media",
    description: "Platforma media pentru conținut de calitate și comunicare digitală.",
    href: CONTACT.ecosystem.aixmedia,
    gradient: "from-indigo-500 to-blue-400"
  },
  {
    icon: <Globe className="w-8 h-8" />,
    title: "Health",
    description: "Sănătate și asigurări medicale premium.",
    href: CONTACT.ecosystem.health,
    gradient: "from-red-500 to-pink-400"
  },
  {
    icon: <Globe className="w-8 h-8" />,
    title: "Subvenții",
    description: "Finanțare și granturi pentru proiecte.",
    href: CONTACT.ecosystem.subventii,
    gradient: "from-emerald-500 to-teal-400"
  },
  {
    icon: <Globe className="w-8 h-8" />,
    title: "Credite",
    description: "Credite și soluții financiare pentru afaceri.",
    href: CONTACT.ecosystem.credite,
    gradient: "from-yellow-500 to-amber-400"
  },
  {
    icon: <Globe className="w-8 h-8" />,
    title: "Market Pulse",
    description: "Insight-uri de piață și analize financiare.",
    href: CONTACT.ecosystem.marketPulse,
    gradient: "from-gray-500 to-slate-400"
  }
];

export function Ecosystem() {
  return (
    <section id="ecosistem" className="py-24 relative overflow-hidden bg-muted/50">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
            Ecosistemul <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">AiX</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Descoperă suite-ul nostru complet de platforme și servicii interconectate.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {ecosystems.map((eco) => (
            <div
              key={eco.title}
              className="relative group rounded-[2.5rem] p-8 glass premium-card overflow-hidden border border-border/50 h-full flex flex-col transition-all duration-300"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${eco.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none`} />
              
              <div className="mb-8">
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${eco.gradient} text-white mb-6 shadow-lg`}>
                  {eco.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{eco.title}</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {eco.description}
                </p>
              </div>

              <div className="mt-auto pt-8">
                <Link 
                  href={eco.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full py-4 rounded-full bg-background border border-border group-hover:bg-foreground group-hover:text-background transition-all duration-300 font-medium"
                >
                  Accesează platforma
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
