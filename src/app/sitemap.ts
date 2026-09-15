import { MetadataRoute } from "next";
import { servicesData } from "@/data/services";
import { getPublishedNewsArticles } from "@/data/insuranceNewsData";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://insurance.cristianvaduva.com";
  
  const staticRoutes = [
    { route: "", priority: 1.0, changeFrequency: "daily" as const },
    { route: "/stiri", priority: 0.9, changeFrequency: "daily" as const },
    { route: "/scenarii-risc", priority: 0.9, changeFrequency: "weekly" as const },
    { route: "/servicii", priority: 0.9, changeFrequency: "weekly" as const },
    { route: "/contact", priority: 0.8, changeFrequency: "monthly" as const },
    { route: "/calculatoare", priority: 0.9, changeFrequency: "weekly" as const },
    { route: "/advisor", priority: 0.8, changeFrequency: "weekly" as const },
    { route: "/gap-analyzer", priority: 0.8, changeFrequency: "weekly" as const },
    { route: "/oferta-rapida", priority: 0.8, changeFrequency: "weekly" as const },
    { route: "/risk-simulator", priority: 0.8, changeFrequency: "weekly" as const },
    { route: "/ecosistem", priority: 0.7, changeFrequency: "monthly" as const },
    { route: "/generali", priority: 0.7, changeFrequency: "monthly" as const },
    { route: "/resurse", priority: 0.7, changeFrequency: "weekly" as const },
    { route: "/insights", priority: 0.7, changeFrequency: "weekly" as const },
    { route: "/academy", priority: 0.7, changeFrequency: "weekly" as const },
    { route: "/trust-center", priority: 0.6, changeFrequency: "monthly" as const },
    { route: "/urgente", priority: 0.6, changeFrequency: "monthly" as const },
    { route: "/de-ce-asigurari", priority: 0.7, changeFrequency: "monthly" as const },
    { route: "/despre-mine", priority: 0.6, changeFrequency: "monthly" as const },
    { route: "/legal", priority: 0.5, changeFrequency: "monthly" as const },
    { route: "/legal/privacy-policy", priority: 0.5, changeFrequency: "monthly" as const },
    { route: "/legal/terms-of-use", priority: 0.5, changeFrequency: "monthly" as const },
    { route: "/legal/cookie-policy", priority: 0.5, changeFrequency: "monthly" as const },
    { route: "/legal/data-subject-request", priority: 0.5, changeFrequency: "monthly" as const },
    { route: "/legal/ai-disclaimer", priority: 0.5, changeFrequency: "monthly" as const },
    { route: "/legal/insurance-disclaimer", priority: 0.5, changeFrequency: "monthly" as const },
    { route: "/legal/real-estate-disclaimer", priority: 0.5, changeFrequency: "monthly" as const },
    { route: "/legal/mortgage-disclaimer", priority: 0.5, changeFrequency: "monthly" as const },
    { route: "/legal/investment-disclaimer", priority: 0.5, changeFrequency: "monthly" as const },
    { route: "/legal/accessibility", priority: 0.5, changeFrequency: "monthly" as const },
    { route: "/legal/security", priority: 0.5, changeFrequency: "monthly" as const },
    { route: "/legal/copyright", priority: 0.5, changeFrequency: "monthly" as const },
    { route: "/legal/contact", priority: 0.5, changeFrequency: "monthly" as const },
  ].map(({ route, priority, changeFrequency }) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));

  const dynamicServicesRoutes = Object.keys(servicesData).map(slug => ({
    url: `${baseUrl}/servicii/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const dynamicNewsRoutes = getPublishedNewsArticles().map(article => ({
    url: `${baseUrl}/stiri/${article.slug}`,
    lastModified: new Date(article.updatedAt || article.publishedAt),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...dynamicServicesRoutes, ...dynamicNewsRoutes];
}
