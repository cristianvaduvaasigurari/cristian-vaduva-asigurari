import type { Metadata, Viewport } from "next";
import { StructuredData, organizationSchema, localBusinessSchema } from "@/lib/structuredData";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { SmartPopup } from "@/components/ui/smart-popup";
import { NextIntlClientProvider } from "next-intl";
import LocaleInitializer from "@/components/layout/LocaleInitializer";
import { getLocale } from "@/lib/locale";
import { getMessages } from "next-intl/server";
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
  description: "Platformă premium dedicată protecției financiare, investițiilor de lux și optimizării patrimoniului. Expertiză în asigurări Generali, luxury real estate Home Find și AiX OS. Consultant asigurări București.",
  keywords: ["asigurări", "asigurări Generali", "asigurare de viață", "asigurare de sănătate", "RCA", "CASCO", "imobiliare", "real estate", "investiții", "Cristian Văduva", "consultant asigurări București", "AiX OS", "Home Find"],
  authors: [{ name: "Cristian Văduva", url: "https://cristianvaduva.com" }],
  creator: "Cristian Văduva",
  publisher: "Cristian Văduva Premium Portfolio",
  metadataBase: new URL("https://cristianvaduva.com"),
  alternates: {
    canonical: "./",
  },
  openGraph: {
    title: "Cristian Văduva | Insurance, Real Estate & Investments",
    description: "Platformă premium dedicată protecției financiare, investițiilor de lux și optimizării patrimoniului. Expertiză în asigurări Generali, luxury real estate și AiX OS.",
    url: "https://cristianvaduva.com",
    siteName: "Cristian Văduva",
    locale: "ro_RO",
    type: "website",
    images: [
      {
        url: "https://cristianvaduva.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Cristian Văduva - Insurance, Real Estate & Investments",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cristian Văduva | Insurance, Real Estate & Investments",
    description: "Platformă premium dedicată protecției financiare, investițiilor de lux și optimizării patrimoniului.",
    images: ["https://cristianvaduva.com/og-image.png"],
    creator: "@cristianvaduva",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-code",
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages({ locale });
  return (
    <html
      lang={locale}
      className={`${inter.variable} ${outfit.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <LocaleInitializer />
          {children}
        </NextIntlClientProvider>
          <StructuredData data={organizationSchema({
            name: "Cristian Văduva Premium Portfolio",
            url: "https://cristianvaduva.com",
            logo: "https://cristianvaduva.com/logo.png",
            sameAs: [
              "https://www.facebook.com/cristianvaduva",
              "https://www.linkedin.com/in/cristianvaduva",
              "https://www.instagram.com/cristianvaduva",
            ],
          })} />
          <StructuredData data={localBusinessSchema({
            name: "Cristian Văduva - Consultant Asigurări București",
            url: "https://cristianvaduva.com",
            telephone: "+40767110439",
            email: "contact@cristianvaduva.com",
            address: {
              streetAddress: "Clădirea Globalworth, Et. 15",
              addressLocality: "București",
              addressRegion: "București",
              postalCode: "020337",
              addressCountry: "RO",
            },
            geo: { latitude: "44.4268", longitude: "26.1025" },
            openingHours: "Mo-Fr 09:00-18:00",
          })} />
          <GlobalHomeButton />
          <SmartPopup />
          <AiChatbot />
          <CookieBanner />
      </body>
    </html>
  );
}
