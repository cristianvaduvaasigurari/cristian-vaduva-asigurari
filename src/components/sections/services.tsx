import { Heart, Activity, Plane, Home, Car, Shield, Briefcase, Building, Scale, Building2, Truck, Users, Award, Stethoscope, ChevronRight, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { servicesData } from "@/data/services";

const iconMap: Record<string, LucideIcon> = {
  Heart, Activity, Plane, Home, Car, Shield, Briefcase, Building, Scale, Building2, Truck, Users, Award, Stethoscope
};

export function Services() {
  const servicesList = Object.values(servicesData);

  return (
    <section id="servicii" className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
            Partener <span className="text-red-500">Generali România</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Soluții complete de asigurare pentru persoanele fizice și juridice, susținute de puterea și experiența unuia dintre cei mai mari asigurători din lume.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesList.map((service) => {
            const Icon = iconMap[service.iconName] || Shield;
            return (
              <div
                key={service.id}
                className="glass premium-card p-8 rounded-md group cursor-pointer flex flex-col h-full transition-all duration-300"
              >
                <div className="h-12 w-12 bg-red-500/10 text-red-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-muted-foreground mb-6 line-clamp-3 flex-1">
                  {service.shortDescription}
                </p>
                <Link href={`/servicii/${service.slug}`} prefetch={false} className="inline-flex items-center text-sm font-medium text-foreground group-hover:text-red-400 transition-colors mt-auto">
                  Află mai multe <ChevronRight className="ml-1 w-4 h-4" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
