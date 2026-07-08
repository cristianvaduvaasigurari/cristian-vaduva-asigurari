import { servicesData } from "@/data/services";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ContactForm } from "@/components/sections/contact-form";
import { Heart, Activity, Plane, Home, Car, Shield, Briefcase, Building, Scale, Building2, Truck, Users, Award, Stethoscope, CheckCircle2, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const iconMap: Record<string, LucideIcon> = {
  Heart, Activity, Plane, Home, Car, Shield, Briefcase, Building, Scale, Building2, Truck, Users, Award, Stethoscope
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
        <div className="container mx-auto px-4">
          
          {/* Hero Section pt Serviciu */}
          <div className="mb-24 flex flex-col items-center text-center max-w-4xl mx-auto">
            <div className="inline-flex p-5 rounded-3xl glass text-blue-500 mb-8">
              <IconComponent className="w-12 h-12" />
            </div>
            <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6 leading-tight">
              {service.title}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-10 max-w-3xl">
              {service.longDescription}
            </p>
            <Button size="lg" className="h-14 px-8 text-lg rounded-full shadow-xl" asChild>
              <Link href="/contact">Solicită Ofertă Personalizată</Link>
            </Button>
          </div>

          {/* Benefits Section */}
          <div className="mb-24">
            <h2 className="text-3xl font-heading font-bold mb-10 text-center">Avantajele Protecției</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {service.benefits.map((benefit, i) => (
                <div key={i} className="glass p-8 rounded-[2rem] hover:border-border transition-colors">
                  <CheckCircle2 className="w-8 h-8 text-blue-500 mb-6" />
                  <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Process Section */}
          <div className="mb-24 glass rounded-[3rem] p-10 md:p-16 border border-border/50">
            <h2 className="text-3xl font-heading font-bold mb-12 text-center">Cum Funcționează</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
              <div className="hidden md:block absolute top-8 left-16 right-16 h-px bg-border/50 -z-10" />
              {service.process.map((proc, i) => (
                <div key={i} className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-background border border-border flex items-center justify-center text-2xl font-bold mb-6 text-blue-500 shadow-xl">
                    {proc.step}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{proc.title}</h3>
                  <p className="text-muted-foreground">{proc.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ Section */}
          <div className="max-w-3xl mx-auto mb-24">
            <h2 className="text-3xl font-heading font-bold mb-10 text-center">Întrebări Frecvente</h2>
            <div className="space-y-6">
              {service.faqs.map((faq, i) => (
                <div key={i} className="glass p-6 md:p-8 rounded-2xl">
                  <h3 className="text-xl font-bold mb-3">{faq.q}</h3>
                  <p className="text-muted-foreground">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

        <ContactForm />
      </main>
      
      <Footer />
    </div>
  );
}
