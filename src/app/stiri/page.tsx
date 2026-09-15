import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { NewsCenterHub } from "@/components/sections/news-center-hub";
import { StructuredData } from "@/lib/structuredData";

export const metadata: Metadata = {
  title: "Insurance Intelligence | Știri & Analize Oficiale Asigurări România",
  description: "Centru de informații oficiale, analize de piață și noutăți legislative din domeniul asigurărilor (RCA, CASCO, PAD, Sănătate, Cyber, Business).",
  keywords: [
    "stiri asigurari",
    "noutati asigurari",
    "legislatie rca",
    "asigurari generali romania",
    "asf stiri",
    "baar amiabila",
    "pad locuinte",
    "casco daune",
    "cyber risk nis2",
    "intelligence asigurari"
  ],
  alternates: {
    canonical: "https://insurance.cristianvaduva.com/stiri",
  },
  openGraph: {
    title: "Insurance Intelligence | Știri & Analize Oficiale Asigurări",
    description: "Informații verificate din surse oficiale (ASF, BAAR, UNSAR, EIOPA), analize de risc și ghiduri practice pentru asigurați.",
    url: "https://insurance.cristianvaduva.com/stiri",
    siteName: "Cristian Văduva Asigurări",
    locale: "ro_RO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Insurance Intelligence | Știri & Analize Oficiale Asigurări",
    description: "Informații verificate din surse oficiale (ASF, BAAR, UNSAR, EIOPA), analize de risc și ghiduri practice pentru asigurați.",
  },
};

export default function StiriPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 min-h-screen bg-background">
        <StructuredData
          data={{
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Insurance Intelligence — Știri & Analize Oficiale Asigurări",
            description: "Centru de analiză, date verificate și noutăți legislative din lumea asigurărilor din România.",
            url: "https://insurance.cristianvaduva.com/stiri",
            publisher: {
              "@type": "Organization",
              name: "Cristian Văduva Asigurări",
              url: "https://insurance.cristianvaduva.com",
              logo: "https://insurance.cristianvaduva.com/logo.png"
            }
          }}
        />
        <NewsCenterHub />
      </main>
      <Footer />
    </>
  );
}
