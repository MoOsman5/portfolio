import type { Metadata, Viewport } from "next";
import Document from "@/components/Document";
import { site } from "@/lib/site";

const title = "محمد عثمان — مهندس برمجيات أول";
const description =
  "محمد عثمان مهندس برمجيات أول وقائد تقني من الجيزة، مصر، يبدأ من الباك إند ويسلّم المنتج كاملًا. يصمم أنظمة تصمد تحت الضغط الحقيقي، ويقود الفرق التي تبنيها، ويسلّم منتجات كاملة بـNestJS وPostgreSQL وRedis وReact. بنى منصة ABS Courier اللوجستية لأكثر من 20 مليون شحنة سنويًا.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: title, template: `%s — محمد عثمان` },
  description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  keywords: ["محمد عثمان", "مهندس برمجيات أول", "مهندس فل ستاك", "مهندس باك إند", "مهندس باك إند مصر", "مطور NestJS", "PostgreSQL", "معماري برمجيات", "Mohamed Osman", "Senior Backend Engineer"],
  alternates: { canonical: "/ar", languages: { en: "/", ar: "/ar", "x-default": "/" } },
  openGraph: {
    type: "profile",
    url: `${site.url}/ar`,
    siteName: site.name,
    title,
    description,
    locale: "ar_EG",
    alternateLocale: ["en_US"],
    firstName: "Mohamed",
    lastName: "Osman",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "محمد عثمان، مهندس برمجيات أول" }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/og.png"] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark light",
  width: "device-width",
  initialScale: 1,
};

export default function ArabicLayout({ children }: { children: React.ReactNode }) {
  return <Document lang="ar">{children}</Document>;
}
