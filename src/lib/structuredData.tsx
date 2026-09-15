// src/lib/structuredData.tsx
import React from "react";

/** Render JSON‑LD script for a given schema object. */
export const StructuredData: React.FC<{ data: object }> = ({ data }) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
  />
);

/** Helper for Organization schema */
export const organizationSchema = (params: {
  name: string;
  url: string;
  logo: string;
  sameAs?: string[];
}) => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: params.name,
  url: params.url,
  logo: params.logo,
  sameAs: params.sameAs,
});

/** Helper for LocalBusiness schema */
export const localBusinessSchema = (params: {
  name: string;
  url: string;
  telephone: string;
  email: string;
  address: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  geo: { latitude: string; longitude: string };
  openingHours: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: params.name,
  url: params.url,
  telephone: params.telephone,
  email: params.email,
  address: {
    "@type": "PostalAddress",
    ...params.address,
  },
  geo: { "@type": "GeoCoordinates", ...params.geo },
  openingHours: params.openingHours,
});

/** Helper for Person schema */
export const personSchema = (params: {
  name: string;
  jobTitle: string;
  worksFor: { name: string; url: string };
  sameAs?: string[];
}) => ({
  "@context": "https://schema.org",
  "@type": "Person",
  name: params.name,
  jobTitle: params.jobTitle,
  worksFor: { "@type": "Organization", ...params.worksFor },
  sameAs: params.sameAs,
});

/** Helper for NewsArticle schema */
export const newsArticleSchema = (params: {
  headline: string;
  description: string;
  url: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  authorName: string;
  authorUrl?: string;
  publisherName: string;
  publisherUrl: string;
  publisherLogo: string;
  sourceName?: string;
  sourceUrl?: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "NewsArticle",
  headline: params.headline,
  description: params.description,
  url: params.url,
  image: params.image ? [params.image] : undefined,
  datePublished: params.datePublished,
  dateModified: params.dateModified || params.datePublished,
  author: {
    "@type": "Person",
    name: params.authorName,
    url: params.authorUrl || "https://insurance.cristianvaduva.com/despre-mine",
  },
  publisher: {
    "@type": "Organization",
    name: params.publisherName,
    url: params.publisherUrl,
    logo: {
      "@type": "ImageObject",
      url: params.publisherLogo,
    },
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": params.url,
  },
  ...(params.sourceName && params.sourceUrl
    ? {
        isBasedOn: {
          "@type": "CreativeWork",
          name: params.sourceName,
          url: params.sourceUrl,
        },
      }
    : {}),
});
