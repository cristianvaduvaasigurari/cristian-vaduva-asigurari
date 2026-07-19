// src/lib/seo.tsx
import Head from "next/head";
import type { Metadata } from "next";

interface MetaProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  twitterImage?: string;
  keywords?: string[];
}

/** Helper to generate a Next.js `metadata` object. */
export function generateMetadata(props: MetaProps): Metadata {
  const { title, description, canonical, ogImage, twitterImage, keywords } = props;
  return {
    title,
    description,
    keywords,
    alternates: canonical ? { canonical } : undefined,
    openGraph: ogImage
      ? {
          title,
          description,
          images: [{ url: ogImage, alt: title }],
          type: "website",
        }
      : undefined,
    twitter: twitterImage
      ? {
          title,
          description,
          images: [twitterImage],
          card: "summary_large_image",
        }
      : undefined,
    robots: { index: true, follow: true },
  };
}

/** Render generic meta tags via <Head>. */
export const Meta: React.FC<MetaProps> = ({ title, description, canonical, ogImage, twitterImage, keywords }) => (
  <Head>
    <title>{title}</title>
    <meta name="description" content={description} />
    {keywords && <meta name="keywords" content={keywords.join(", ")} />}
    {canonical && <link rel="canonical" href={canonical} />}
    {ogImage && (
      <>
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:type" content="website" />
      </>
    )}
    {twitterImage && (
      <>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={twitterImage} />
      </>
    )}
  </Head>
);
