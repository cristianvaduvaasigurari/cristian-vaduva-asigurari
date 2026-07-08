import { servicesData } from "@/data/services";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ContactForm } from "@/components/sections/contact-form";
import { 
  Heart, Activity, Plane, Home, Car, Shield, Briefcase, Building, 
  Scale, Building2, Truck, Users, Award, Stethoscope, 
  CheckCircle2, Info, AlertTriangle, Users2, Lightbulb, type LucideIcon 
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const iconMap: Record<string, LucideIcon> = {
  Heart, Activity, Plane, Home, Car, Shield, Briefcase, Building, 
  Scale, Building2, Truck, Users, Award, Stethoscope
};

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const service = servicesData[params.slug];
  
  if (!service) {
    return { title: "Serviciu Inexistent | Cristian Văduva" };
  }

  return {
    title: `${service.title} | Premium Insurance`,
    description: service.shortDescription,
    openGraph: {
      title: `${service.title} | Cristian Văduva`,
      description: service.shortDescription,
    },
  };
}

export function generateStaticParams() {
  return Object.keys(servicesData).map((slug) => ({
    slug,
  }));
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = servicesData[params.slug];

  if (!service) {
    notFound();
  }

  const IconComponent = iconMap[service.iconName] || Shield;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-16">
        <div className="container mx-auto px-4 max-w-5xl">
          
          {/* 1. Hero Section */}
          <div className="mb-24 flex flex-col items-center text-center mx-auto">
            <div className="inline-flex p-5 rounded-3xl glass text-blue-600 mb-8 border border-border bg-blue-50">
              <IconComponent className="w-12 h-12" />
            </div>
            <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6 leading-tight">
              {service.title}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-10 max-w-3xl">
              {service.longDescription}
            </p>
            <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-xl" asChild>
              <Link href="#oferta">Solicită Ofertă Personalizată</Link>
            </Button>
          </div>

          {/* 2. Ce este această asigurare */}
          <div className="mb-24 glass rounded-[3rem] p-10 md:p-16 border border-border/50 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-[80px] -z-10" />
            <h2 className="text-3xl font-heading font-bold mb-6 flex items-center gap-3">
              <Info className="text-blue-500 w-8 h-8" />
              Ce este această asigurare?
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {service.whatIsIt}
            </p>
          </div>

          {/* 3. Beneficii */}
          <div className="mb-24">
            <h2 className="text-3xl font-heading font-bold mb-10 text-center">Avantajele Protecției</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {service.benefits.map((benefit, i) => (
                <div key={i} className="glass premium-card p-8 rounded-[2rem] border border-border">
                  <CheckCircle2 className="w-8 h-8 text-blue-600 mb-6" />
                  <h3 className="text-xl font-bold mb-3 text-foreground">{benefit.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
            {/* 4. Ce riscuri acoperă */}
            <div className="glass p-10 rounded-[3rem] border border-red-500/10 relative">
              <h2 className="text-2xl font-heading font-bold mb-6 flex items-center gap-3">
                <AlertTriangle className="text-red-500 w-8 h-8" />
                Ce riscuri acoperă?
              </h2>
              <ul className="space-y-4">
                {service.risksCovered.map((risk, i) => (
                  <li key={i} className="flex items-start gap-3 text-muted-foreground">
                    <span className="w-6 h-6 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center flex-shrink-0 text-xs mt-0.5">✕</span>
                    <span>{risk}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 5. Pentru cine este */}
            <div className="glass p-10 rounded-[3rem] border border-emerald-500/10 relative">
              <h2 className="text-2xl font-heading font-bold mb-6 flex items-center gap-3">
                <Users2 className="text-emerald-500 w-8 h-8" />
                Pentru cine este?
              </h2>
              <ul className="space-y-4">
                {service.targetAudience.map((audience, i) => (
                  <li key={i} className="flex items-start gap-3 text-muted-foreground">
                    <span className="w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center flex-shrink-0 text-xs mt-0.5">✓</span>
                    <span>{audience}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 6. Exemple practice */}
          <div className="mb-24">
            <h2 className="text-3xl font-heading font-bold mb-10 text-center flex items-center justify-center gap-3">
              <Lightbulb className="text-amber-500 w-8 h-8" />
              Exemple Practice
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {service.practicalExamples.map((example, i) => (
                <div key={i} className="glass premium-card p-8 rounded-[2rem] border-l-4 border-l-amber-500">
                  <h3 className="text-xl font-bold mb-4 text-foreground">{example.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {example.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 7. FAQ */}
          <div className="mb-24">
            <h2 className="text-3xl font-heading font-bold mb-10 text-center">Întrebări Frecvente</h2>
            <div className="space-y-6">
              {service.faqs.map((faq, i) => (
                <div key={i} className="glass premium-card p-6 md:p-8 rounded-2xl border border-border">
                  <h3 className="text-xl font-bold mb-3 text-foreground">{faq.q}</h3>
                  <p className="text-muted-foreground">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* 8. CTA */}
        <div id="oferta">
          <ContactForm customTitle={`Solicită Ofertă: ${service.title}`} />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
