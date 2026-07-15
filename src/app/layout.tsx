import type { Metadata, Viewport } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { SmartPopup } from "@/components/ui/smart-popup";
import { CookieBanner } from "@/components/ui/cookie-banner";
import { AiChatbot } from "@/components/ui/ai-chatbot";
import { GlobalHomeButton } from "@/components/ui/global-home-button";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Cristian Văduva | Insurance, Real Estate & Investments",
    template: "%s | Cristian Văduva",
  },
  description: "Platformă care ajută clienții să economisească timp și să reducă riscurile financiare prin asigurări personalizate și acces la oportunități imobiliare verificate. Expertiză în asigurări și investiții imobiliare.",
  metadataBase: new URL("https://cristianvaduva.com"),
  alternates: {
    canonical: "./",
  },
  openGraph: {
    title: "Cristian Văduva | Insurance, Real Estate & Investments",
    description: "Platformă care ajută clienții să economisească timp și să reducă riscurile financiare prin asigurări personalizate și acces la oportunități imobiliare verificate. Expertiză în asigurări și investiții imobiliare.",
    url: "https://cristianvaduva.com",
    siteName: "Cristian Văduva",
    locale: "ro_RO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cristian Văduva | Insurance, Real Estate & Investments",
    description: "Platformă beneficiu dedicată protecției financiare, investițiilor de lux și optimizării patrimoniului.",
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ro"
      className={`${inter.variable} ${outfit.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FinancialService",
              "name": "Cristian Văduva – Portfolio de Asigurări și Investiții",
              "image": "https://cristianvaduva.com/logo.png",
              "@id": "https://cristianvaduva.com",
              "url": "https://cristianvaduva.com",
              "telephone": "+40767110439",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Clădirea Globalworth, Et. 15",
                "addressLocality": "București",
                "addressCountry": "RO"
              }
            })
          }}
        />
           {children}
          <GlobalHomeButton />
          <SmartPopup />
          <AiChatbot />
          <CookieBanner />
      </body>
    </html>
  );
}
