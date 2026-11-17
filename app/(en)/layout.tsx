import type { Metadata, Viewport } from "next";
import Document from "@/components/Document";
import { site } from "@/lib/site";

const title = `${site.name} — ${site.role}`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: title, template: `%s — ${site.name}` },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  keywords: [
    "Mohamed Osman",
    "Senior Backend Engineer",
    "Backend Engineer Egypt",
    "NestJS developer",
    "Node.js engineer",
    "PostgreSQL performance",
    "Logistics platform",
    "Backend team lead",
    "TypeScript",
    "Redis",
    "Bull queues",
    "Software architect Egypt",
    "Giza",
    "Cairo",
    "محمد عثمان",
    "مهندس باك اند",
  ],
  alternates: { canonical: "/", languages: { en: "/", ar: "/ar", "x-default": "/" } },
  openGraph: {
    type: "profile",
    url: site.url,
    siteName: site.name,
    title,
    description: site.description,
    locale: "en_US",
    firstName: "Mohamed",
    lastName: "Osman",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Mohamed Osman, Senior Backend Engineer" }],
  },
  twitter: { card: "summary_large_image", title, description: site.description, images: ["/og.png"] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <Document lang="en">{children}</Document>;
}
