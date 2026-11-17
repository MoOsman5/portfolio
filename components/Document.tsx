import "@fontsource-variable/archivo/wdth.css";
import "@fontsource/ibm-plex-sans/400.css";
import "@fontsource/ibm-plex-sans/500.css";
import "@fontsource/ibm-plex-sans/600.css";
import "@fontsource/ibm-plex-sans-arabic/400.css";
import "@fontsource/ibm-plex-sans-arabic/500.css";
import "@fontsource/ibm-plex-sans-arabic/700.css";
import "../app/globals.css";
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

// Runs before paint: applies the saved theme, or the system preference on a first visit (light is the default).
const boot = `(function(){var d=document.documentElement;try{var t=localStorage.getItem("theme");if(!t&&window.matchMedia("(prefers-color-scheme: dark)").matches)t="dark";if(t==="dark"){d.dataset.theme="dark";var m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute("content","#0a1420");}}catch(e){}})();`;

export default function Document({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  const ar = lang === "ar";
  return (
    <html lang={lang} dir={ar ? "rtl" : "ltr"} data-theme="light" suppressHydrationWarning>
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
