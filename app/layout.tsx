import type { Metadata, Viewport } from "next";
import "@fontsource/bodoni-moda/400.css";
import "@fontsource/bodoni-moda/500.css";
import "@fontsource/bodoni-moda/400-italic.css";
import "@fontsource/hanken-grotesk/400.css";
import "@fontsource/hanken-grotesk/500.css";
import "@fontsource/hanken-grotesk/600.css";
import "./globals.css";
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
    "Giza",
    "Cairo",
  ],
  alternates: { canonical: "/" },
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
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${site.url}/#person`,
      name: site.name,
      url: site.url,
      image: `${site.url}/images/mohamed.webp`,
      jobTitle: site.role,
      email: `mailto:${site.email}`,
      telephone: site.phone.replace(/\s/g, ""),
      address: { "@type": "PostalAddress", addressLocality: "Giza", addressCountry: "EG" },
      alumniOf: { "@type": "CollegeOrUniversity", name: "Cairo University" },
      knowsAbout: ["Backend engineering", "NestJS", "Node.js", "TypeScript", "PostgreSQL", "Redis", "Distributed systems", "Logistics software"],
      knowsLanguage: ["ar", "en"],
      sameAs: [site.linkedin, site.github, site.leetcode],
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: site.name,
      publisher: { "@id": `${site.url}/#person` },
      inLanguage: "en",
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(sessionStorage.getItem("mo-intro")==="1")document.documentElement.dataset.intro="skip"}catch(e){}`,
          }}
        />
      </head>
      <body>
        <a className="skip" href="#main">Skip to content</a>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
