// src/lib/structuredData.ts
import React from "react";

/** Component to inject JSON‑LD script into the page */
export const StructuredData: React.FC<{ data: object }> = ({ data }) =>
  React.createElement("script", {
    type: "application/ld+json",
    dangerouslySetInnerHTML: { __html: JSON.stringify(data) },
  });

/** Helpers for common schemas */
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
