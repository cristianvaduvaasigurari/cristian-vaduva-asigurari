"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ContactForm } from "@/components/sections/contact-form";
import { MapPin, Phone, Mail, MessageCircle, MonitorPlay, Briefcase, Globe, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CONTACT } from "@/config/contact";

export default function ContactPage() {
  const [activeTab, setActiveTab] = useState<"general" | "oferta" | "consultanta">("general");

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6 tracking-tight">
              Suntem aici pentru tine
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Alege modul prin care dorești să colaborăm. Fie că e o simplă întrebare sau o strategie complexă, experții noștri îți stau la dispoziție.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-16">
            <Button 
              variant={activeTab === "general" ? "default" : "glass"} 
              className={cn("rounded-full px-6", activeTab === "general" && "bg-foreground text-background hover:bg-foreground/90")}
              onClick={() => setActiveTab("general")}
            >
              Contact General
            </Button>
            <Button 
              variant={activeTab === "oferta" ? "default" : "glass"} 
              className={cn("rounded-full px-6", activeTab === "oferta" && "bg-blue-600 text-white hover:bg-blue-700")}
              onClick={() => setActiveTab("oferta")}
            >
              Cerere Ofertă
            </Button>
            <Button 
              variant={activeTab === "consultanta" ? "default" : "glass"} 
              className={cn("rounded-full px-6", activeTab === "consultanta" && "bg-purple-600 text-white hover:bg-purple-700")}
              onClick={() => setActiveTab("consultanta")}
            >
              Programează Consultanță
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24 max-w-6xl mx-auto">
            <div className="glass premium-card p-8 rounded-lg flex flex-col items-center text-center">
              <Phone className="w-8 h-8 text-blue-600 mb-4" />
              <h3 className="font-bold mb-2 text-foreground">Telefon</h3>
              <p className="text-muted-foreground mb-4">{CONTACT.phone.display}</p>
              <Button variant="outline" size="sm" className="rounded-full w-full border-border hover:bg-muted" asChild>
                <a href={CONTACT.phone.href}>Sună acum</a>
              </Button>
            </div>
            <div className="glass premium-card p-8 rounded-lg flex flex-col items-center text-center">
              <MessageCircle className="w-8 h-8 text-green-600 mb-4" />
              <h3 className="font-bold mb-2 text-foreground">WhatsApp</h3>
              <p className="text-muted-foreground mb-4">{CONTACT.whatsapp.display}</p>
              <Button variant="outline" size="sm" className="rounded-full w-full border-green-600/30 text-green-700 hover:bg-green-50" asChild>
                <a href={CONTACT.whatsapp.href} target="_blank" rel="noopener noreferrer">Trimite mesaj</a>
              </Button>
            </div>
            <div className="glass premium-card p-8 rounded-lg flex flex-col items-center text-center">
              <Mail className="w-8 h-8 text-blue-600 mb-4" />
              <h3 className="font-bold mb-2 text-foreground">Email</h3>
              <p className="text-muted-foreground mb-4 text-sm truncate w-full">{CONTACT.email.display}</p>
              <Button variant="outline" size="sm" className="rounded-full w-full border-border hover:bg-muted" asChild>
                <a href={CONTACT.email.href}>Scrie-ne</a>
              </Button>
            </div>
            <div className="glass premium-card p-8 rounded-lg flex flex-col items-center text-center">
              <MapPin className="w-8 h-8 text-blue-600 mb-4" />
              <h3 className="font-bold mb-2 text-foreground">Locație</h3>
              <p className="text-muted-foreground mb-4 text-sm">București, România</p>
              <Button variant="outline" size="sm" className="rounded-full w-full border-border hover:bg-muted" asChild>
                <a href="#harta">Vezi pe hartă</a>
              </Button>
            </div>
          </div>

          {/* Social Media Links */}
          <div className="flex flex-wrap justify-center gap-4 mb-24">
            <a href={CONTACT.social.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 rounded-full glass hover:bg-black/5 transition-colors border border-border">
              <Briefcase className="w-5 h-5 text-blue-600" />
              <span className="font-medium text-sm text-foreground">LinkedIn</span>
            </a>
            <a href={CONTACT.social.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 rounded-full glass hover:bg-black/5 transition-colors border border-border">
              <Camera className="w-5 h-5 text-pink-600" />
              <span className="font-medium text-sm text-foreground">Instagram</span>
            </a>
            <a href={CONTACT.social.facebook} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 rounded-full glass hover:bg-black/5 transition-colors border border-border">
              <Globe className="w-5 h-5 text-blue-700" />
              <span className="font-medium text-sm text-foreground">Facebook</span>
            </a>
            <a href={CONTACT.social.youtube} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 rounded-full glass hover:bg-black/5 transition-colors border border-border">
              <MonitorPlay className="w-5 h-5 text-red-600" />
              <span className="font-medium text-sm text-foreground">YouTube</span>
            </a>
          </div>

          {/* Form & Map Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto mb-24">
            <div className="w-full">
              {activeTab === "general" && <ContactForm />}
              {activeTab === "oferta" && (
                <div className="glass p-8 rounded-[3rem] border border-blue-500/20">
                  <h3 className="text-2xl font-bold mb-6">Cerere Ofertă</h3>
                  <ContactForm customTitle=" " />
                </div>
              )}
              {activeTab === "consultanta" && (
                <div className="glass p-8 rounded-[3rem] border border-purple-500/20">
                  <h3 className="text-2xl font-bold mb-6">Programează Consultanță</h3>
                  <ContactForm customTitle=" " />
                </div>
              )}
            </div>
            <div id="harta" className="glass rounded-[3rem] overflow-hidden min-h-[400px] relative border border-border">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d91158.11209923704!2d26.02696375!3d44.43266455!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b1f93abf3cad4f%3A0xac0632e37c9ca628!2sBucharest%2C%20Romania!5e0!3m2!1sen!2s!4v1720000000000!5m2!1sen!2s"
                className="absolute inset-0 w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Locație Cristian Văduva - București"
              />
            </div>
          </div>

        </div>
      </main>
      
      <Footer />
    </div>
  );
}
