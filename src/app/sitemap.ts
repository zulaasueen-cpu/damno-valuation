import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://damno.mn";
  const routes = ["", "about", "services", "pricing", "portfolio", "blog", "contact"];

  return routes.flatMap((route) =>
    routing.locales.map((locale) => ({
      url: `${baseUrl}/${locale}${route ? `/${route}` : ""}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1 : 0.7,
    }))
  );
}
