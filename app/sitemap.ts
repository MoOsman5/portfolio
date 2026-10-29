import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { articles } from "@/lib/articles";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const latest = articles.map((a) => a.date).sort().at(-1)!;
  return [
    { url: site.url, lastModified: new Date("2026-10-30"), changeFrequency: "monthly", priority: 1, alternates: { languages: { en: site.url, ar: `${site.url}/ar` } } },
    { url: `${site.url}/ar`, lastModified: new Date("2026-10-30"), changeFrequency: "monthly", priority: 0.9, alternates: { languages: { en: site.url, ar: `${site.url}/ar` } } },
    { url: `${site.url}/writing`, lastModified: new Date(latest), changeFrequency: "weekly", priority: 0.8 },
    ...articles.map((a) => ({ url: `${site.url}/writing/${a.slug}`, lastModified: new Date(a.date), changeFrequency: "yearly" as const, priority: 0.7 })),
  ];
}
