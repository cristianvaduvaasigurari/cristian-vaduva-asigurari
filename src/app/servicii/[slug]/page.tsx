import { servicesData } from "@/data/services";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ContactForm } from "@/components/sections/contact-form";
import { CONTACT } from "@/config/contact";
import { 
  Heart, Activity, Plane, Home, Car, Shield, Briefcase, Building, 
  Scale, Building2, Truck, Users, Award, Stethoscope, TrendingUp,
  CheckCircle2, Info, AlertTriangle, Users2, Lightbulb, type LucideIcon, 
  Star, MessageCircle, PhoneCall
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const iconMap: Record<string, LucideIcon> = {
  Heart, Activity, Plane, Home, Car, Shield, Briefcase, Building, 
  Scale, Building2, Truck, Users, Award, Stethoscope, TrendingUp
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
                Ce este?
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {service.whatIsIt}
              </p>
            </div>

            {/* 3. De ce este importantă */}
            <div className="glass rounded-[3rem] p-10 border border-border/50 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-[80px] -z-10" />
              <h2 className="text-3xl font-heading font-bold mb-6 flex items-center gap-3">
                <Star className="text-amber-500 w-8 h-8 fill-amber-500/20" />
                De ce este importantă?
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {service.whyIsItImportant}
              </p>
            </div>
          </div>

          {/* 4. Cui i se adresează */}
          <div className="mb-24 glass rounded-[3rem] p-10 md:p-16 border border-emerald-500/10 relative overflow-hidden text-center">
            <h2 className="text-3xl font-heading font-bold mb-10 flex items-center justify-center gap-3">
              <Users2 className="text-emerald-500 w-8 h-8" />
              Cui i se adresează?
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              {service.targetAudience.map((audience, i) => (
                <div key={i} className="px-6 py-3 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 font-medium">
                  {audience}
                </div>
              ))}
            </div>
          </div>

          {/* 5. Beneficii */}
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

          {/* 6. Ce riscuri acoperă */}
          <div className="mb-24 glass p-10 md:p-16 rounded-[3rem] border border-red-500/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 rounded-full blur-[80px] -z-10" />
            <h2 className="text-3xl font-heading font-bold mb-10 flex items-center justify-center gap-3">
              <AlertTriangle className="text-red-500 w-8 h-8" />
              Ce riscuri acoperă?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
              {service.risksCovered.map((risk, i) => (
                <div key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-red-50 border border-red-100">
                  <span className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0 font-bold">✕</span>
                  <span className="text-foreground font-medium pt-1">{risk}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 7. Exemple practice */}
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

          {/* 8. De ce să alegi Generali România */}
          <div className="mb-24 glass rounded-[3rem] p-10 md:p-16 border border-border bg-[#c8102e]/5 text-center">
            <h2 className="text-3xl font-heading font-bold mb-10 text-[#c8102e]">De ce să alegi Generali România?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {service.whyGenerali.map((reason, i) => (
                <div key={i} className="p-6 rounded-2xl bg-white border border-[#c8102e]/10 shadow-sm">
                  <p className="text-foreground font-medium leading-relaxed">{reason}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 9. FAQ */}
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

        {/* 11. Formular & 12. Contact Rapid */}
        <div id="oferta" className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <ContactForm customTitle={`Solicită Ofertă: ${service.title}`} />
            </div>
            
            {/* Contact Rapid */}
            <div className="glass rounded-3xl p-8 border border-border h-fit sticky top-32">
              <h3 className="text-2xl font-bold font-heading mb-6">Contact Rapid</h3>
              <p className="text-muted-foreground mb-8">
                Preferi să discuți direct? Suntem disponibili pe WhatsApp sau la telefon pentru a-ți personaliza oferta pe loc.
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
