import "@fontsource/bodoni-moda/400.css";
import "@fontsource/bodoni-moda/500.css";
import "@fontsource/bodoni-moda/400-italic.css";
import "@fontsource/hanken-grotesk/400.css";
import "@fontsource/hanken-grotesk/500.css";
import "@fontsource/hanken-grotesk/600.css";
import "@fontsource/amiri/400.css";
import "@fontsource/amiri/700.css";
import "@fontsource/ibm-plex-sans-arabic/400.css";
import "@fontsource/ibm-plex-sans-arabic/500.css";
import "../app/globals.css";
import "../app/motion.css";
import "../app/rtl.css";
import { site } from "@/lib/site";
import type { Lang } from "@/lib/content";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${site.url}/#person`,
      name: site.name,
      alternateName: ["محمد عثمان", "MoOsman5"],
      givenName: "Mohamed",
      familyName: "Osman",
      url: site.url,
      image: `${site.url}/images/mohamed.webp`,
      jobTitle: site.role,
      email: `mailto:${site.email}`,
      telephone: site.phone.replace(/\s/g, ""),
      address: { "@type": "PostalAddress", addressLocality: "Giza", addressCountry: "EG" },
      alumniOf: { "@type": "CollegeOrUniversity", name: "Cairo University" },
      knowsAbout: ["Backend engineering", "NestJS", "Node.js", "TypeScript", "PostgreSQL", "Redis", "Distributed systems", "Logistics software"],
      knowsLanguage: ["ar", "en"],
      hasOccupation: { "@type": "Occupation", name: "Senior Backend Engineer", occupationLocation: { "@type": "Country", name: "Egypt" }, skills: "NestJS, Node.js, TypeScript, PostgreSQL, Redis, system design" },
      sameAs: [site.linkedin, site.github, site.leetcode],
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: site.name,
      publisher: { "@id": `${site.url}/#person` },
      inLanguage: ["en", "ar"],
    },
  ],
};

// Runs before paint: marks JS as available and applies a saved light theme (dark is the default).
const boot = `(function(){var d=document.documentElement;d.classList.add("js");try{if(localStorage.getItem("theme")==="light"){d.dataset.theme="light";var m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute("content","#f4f0e8");}}catch(e){}})();`;

export default function Document({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  const ar = lang === "ar";
  return (
    <html lang={lang} dir={ar ? "rtl" : "ltr"} data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: boot }} />
        <link rel="me" href={site.linkedin} />
        <link rel="me" href={site.github} />
        <link rel="author" href={site.url} />
      </head>
      <body>
        <a className="skip" href="#main">{ar ? "انتقل إلى المحتوى" : "Skip to content"}</a>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
