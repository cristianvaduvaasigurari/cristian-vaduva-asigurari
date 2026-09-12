import type { Metadata, Viewport } from "next";
import { StructuredData, organizationSchema, localBusinessSchema, personSchema } from "@/lib/structuredData";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { NextIntlClientProvider } from "next-intl";
import ClientUI from "@/components/layout/ClientUI";
import LocaleInitializer from "@/components/layout/LocaleInitializer";
import { getLocale } from "@/lib/locale";
import { getMessages } from "next-intl/server";
import Telemetry from "@/components/providers/Telemetry";
import { CONTACT } from "@/config/contact";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: true,
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: true,
});

const siteTitle = "Cristian Văduva | Consultant Asigurări Premium & Partener Generali";
const siteDescription = "Platformă premium dedicată consultanței în asigurări Generali România, protecției financiare a familiei și optimizării patrimoniului de afaceri. Consultant autorizat București.";

export const metadata: Metadata = {
  title: {
    default: siteTitle,
    template: "%s",
  },
  description: siteDescription,
  keywords: [
    "asigurări",
    "asigurări Generali",
    "asigurare de viață",
    "asigurare de sănătate",
    "RCA",
    "CASCO",
    "imobiliare",
    "investiții",
    "Cristian Văduva",
    "consultant asigurări București",
    "AiX OS",
    "Home Find",
    "protecție financiară"
  ],
  authors: [{ name: "Cristian Văduva", url: "https://insurance.cristianvaduva.com" }],
  creator: "Cristian Văduva",
  publisher: "Cristian Văduva",
  metadataBase: new URL("https://insurance.cristianvaduva.com"),
  alternates: {
    canonical: "https://insurance.cristianvaduva.com",
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: "https://insurance.cristianvaduva.com",
    siteName: "Cristian Văduva Asigurări",
    locale: "ro_RO",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Cristian Văduva — Asigurări Premium Generali",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/twitter-image"],
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
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ? {
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    }
  } : {}),
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
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
          <Telemetry />
          <LocaleInitializer />
          {children}
          <StructuredData data={organizationSchema({
            name: "Cristian Văduva Asigurări",
            url: "https://insurance.cristianvaduva.com",
            logo: "https://insurance.cristianvaduva.com/logo.png",
            sameAs: [
              CONTACT.social.linkedin,
              CONTACT.social.facebook,
              CONTACT.social.instagram,
              CONTACT.social.youtube,
              CONTACT.social.telegram,
            ],
          })} />
          <StructuredData data={localBusinessSchema({
            name: "Cristian Văduva - Consultant Asigurări Premium București",
            url: "https://insurance.cristianvaduva.com",
            telephone: CONTACT.phone.display,
            email: CONTACT.email.display,
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
          <StructuredData data={personSchema({
            name: "Cristian Văduva",
            jobTitle: "Consultant Asigurări Premium & Partener Generali",
            worksFor: {
              name: "Generali România",
              url: "https://www.generali.ro",
            },
            sameAs: [
              CONTACT.social.linkedin,
              CONTACT.social.facebook,
              CONTACT.social.instagram,
              CONTACT.social.youtube,
              CONTACT.social.telegram,
            ],
          })} />
          <ClientUI />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
