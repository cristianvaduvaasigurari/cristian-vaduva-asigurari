import type { Metadata, Viewport } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

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
    default: "Cristian Văduva | Ecosistem Premium",
    template: "%s | Cristian Văduva",
  },
  description: "Platformă premium pentru servicii de Asigurări Generali, Real Estate, AiXLuxury și Ecosistemul AiX OS.",
  metadataBase: new URL("https://cristianvaduva.com"),
  openGraph: {
    title: "Cristian Văduva | Ecosistem Premium",
    description: "Platformă premium pentru servicii de Asigurări Generali, Real Estate, AiXLuxury și Ecosistemul AiX OS.",
    url: "https://cristianvaduva.com",
    siteName: "Cristian Văduva",
    locale: "ro_RO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cristian Văduva | Ecosistem Premium",
    description: "Platformă premium pentru servicii de Asigurări Generali, Real Estate, AiXLuxury și Ecosistemul AiX OS.",
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ro"
      className={`${inter.variable} ${outfit.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FinancialService",
              "name": "Cristian Văduva Premium Portfolio",
              "image": "https://cristianvaduva.com/logo.png",
              "@id": "https://cristianvaduva.com",
              "url": "https://cristianvaduva.com",
              "telephone": "+40700000000",
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
      </body>
    </html>
  );
}
