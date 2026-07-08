import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CalculatorsSection } from "@/components/sections/calculators";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculatoare Asigurări | Cristian Văduva",
  description: "Estimează rapid costurile pentru asigurarea de locuință, viață, CASCO sau IMM.",
};

export default function CalculatoarePage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 pt-32 pb-16">
        <CalculatorsSection />
      </main>
      <Footer />
    </div>
  );
}
