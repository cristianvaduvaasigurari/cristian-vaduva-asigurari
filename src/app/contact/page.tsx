import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ContactForm } from "@/components/sections/contact-form";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Cristian Văduva",
  description: "Contactează-ne pentru consultanță premium în asigurări, real estate și investiții.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6">
              Suntem aici pentru tine
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Fie că ai nevoie de un audit de risc, consultanță imobiliară sau o strategie de investiții, te invităm să ne contactezi.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24 max-w-6xl mx-auto">
            <div className="glass p-8 rounded-3xl flex flex-col items-center text-center">
              <Phone className="w-8 h-8 text-blue-500 mb-4" />
              <h3 className="font-bold mb-2">Telefon</h3>
              <p className="text-muted-foreground">+40 (700) 000 000</p>
            </div>
            <div className="glass p-8 rounded-3xl flex flex-col items-center text-center">
              <Mail className="w-8 h-8 text-blue-500 mb-4" />
              <h3 className="font-bold mb-2">Email</h3>
              <p className="text-muted-foreground">contact@cristianvaduva.com</p>
            </div>
            <div className="glass p-8 rounded-3xl flex flex-col items-center text-center">
              <MapPin className="w-8 h-8 text-blue-500 mb-4" />
              <h3 className="font-bold mb-2">Birou Central</h3>
              <p className="text-muted-foreground">Clădirea Globalworth, Et. 15<br/>București, România</p>
            </div>
            <div className="glass p-8 rounded-3xl flex flex-col items-center text-center">
              <Clock className="w-8 h-8 text-blue-500 mb-4" />
              <h3 className="font-bold mb-2">Program</h3>
              <p className="text-muted-foreground">Luni - Vineri: 09:00 - 18:00<br/>Suport VIP: 24/7</p>
            </div>
          </div>

          {/* Form & Map Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto mb-24">
            <div className="w-full">
              <ContactForm />
            </div>
            <div className="glass rounded-[3rem] overflow-hidden min-h-[400px] relative border border-border">
              {/* Placeholder pentru Google Maps */}
              <div className="absolute inset-0 bg-accent/50 flex flex-col items-center justify-center text-center p-8">
                <MapPin className="w-12 h-12 text-muted-foreground mb-4 opacity-50" />
                <h3 className="text-xl font-bold mb-2">Locație Premium</h3>
                <p className="text-muted-foreground max-w-sm">
                  Acesta este un placeholder pentru Google Maps iframe. Va fi actualizat cu locația exactă a sediului.
                </p>
              </div>
            </div>
          </div>

        </div>
      </main>
      
      <Footer />
    </div>
  );
}
