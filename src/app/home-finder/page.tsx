import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ContactForm } from "@/components/sections/contact-form";
import { Search, Map, BarChart, Key } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home Finder | Sistem Inteligent de Căutare",
  description: "Căutare inteligentă a proprietăților imobiliare. Reprezentare și analiză pentru decizii inspirate.",
};

export default function HomeFinderPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-24 text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-heading font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600">
              Home Finder
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Găsirea căminului ideal nu trebuie să fie o provocare. Utilizăm tehnologie inteligentă și acces direct la proprietăți premium pentru a-ți oferi exact ceea ce cauți.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24 max-w-6xl mx-auto">
            {[
              { icon: Search, title: "Personalized Search", desc: "Algoritmi de căutare care învață preferințele tale pentru a filtra zgomotul pieței." },
              { icon: Key, title: "Buyer Representation", desc: "Suntem de partea ta la negocieri, asigurându-ne că plătești prețul corect." },
              { icon: Map, title: "Off-Market Opportunities", desc: "Acces exclusiv la proprietăți care nu sunt și nu vor fi listate public." },
              { icon: BarChart, title: "Investment Analysis", desc: "Evaluarea potențialului de apreciere și a costurilor ascunse." }
            ].map((item, i) => (
              <div key={i} className="glass p-10 rounded-[3rem] border border-emerald-500/10">
                <item.icon className="w-10 h-10 text-emerald-500 mb-6" />
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <ContactForm />
      </main>
      
      <Footer />
    </div>
  );
}
