"use client";

import { motion } from "framer-motion";
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
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-heading font-bold mb-6"
          >
            Partener <span className="text-red-500">Generali România</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Soluții complete de asigurare pentru persoanele fizice și juridice, susținute de puterea și experiența unuia dintre cei mai mari asigurători din lume.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesList.map((service, index) => {
            const Icon = iconMap[service.iconName] || Shield;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (index % 6) * 0.1 }}
                className="glass p-8 rounded-3xl hover:bg-white/5 transition-colors group cursor-pointer flex flex-col h-full"
              >
                <div className="h-12 w-12 bg-red-500/10 text-red-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-muted-foreground mb-6 line-clamp-3 flex-1">
                  {service.shortDescription}
                </p>
                <Link href={`/servicii/${service.slug}`} className="inline-flex items-center text-sm font-medium text-foreground group-hover:text-red-400 transition-colors mt-auto">
                  Află mai multe <ChevronRight className="ml-1 w-4 h-4" />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
