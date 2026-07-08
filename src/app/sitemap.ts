import { MetadataRoute } from "next";
import { servicesData } from "@/data/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://cristianvaduva.com";
  
  const staticRoutes = [
    "",
    "/contact",
    "/generali",
    "/real-estate",
    "/aix-luxury",
    "/aix-os",
    "/home-finder"
  ].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  const dynamicRoutes = Object.keys(servicesData).map(slug => ({
    url: `${baseUrl}/servicii/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...dynamicRoutes];
}
