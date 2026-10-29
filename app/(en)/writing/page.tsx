import type { Metadata } from "next";
import Link from "next/link";
import { articles, readingMinutes } from "@/lib/articles";
import { site } from "@/lib/site";

const title = "Writing on PostgreSQL, NestJS and backend architecture";
const description =
  "Articles by Mohamed Osman, senior backend engineer, on PostgreSQL performance, read replicas, NestJS, queues and building a logistics platform for 20M+ shipments a year. In English and Arabic.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/writing" },
  openGraph: { type: "website", url: `${site.url}/writing`, title, description, images: [{ url: "/og.png", width: 1200, height: 630 }] },
  twitter: { card: "summary_large_image", title, description, images: ["/og.png"] },
};

const fmt = (d: string, lang: string) =>
  new Date(d + "T00:00:00Z").toLocaleDateString(lang === "ar" ? "ar-EG" : "en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

export default function WritingIndex() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Blog",
        "@id": `${site.url}/writing#blog`,
        url: `${site.url}/writing`,
        name: "Mohamed Osman — Writing",
        description,
        author: { "@id": `${site.url}/#person` },
        blogPost: articles.map((a) => ({ "@type": "BlogPosting", headline: a.title, url: `${site.url}/writing/${a.slug}`, datePublished: a.date, inLanguage: a.lang })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: site.url },
          { "@type": "ListItem", position: 2, name: "Writing", item: `${site.url}/writing` },
        ],
      },
    ],
  };

  return (
    <div className="w-wrap">
      <header className="w-index-head">
        <h1 className="h2" data-reveal="up">Writing</h1>
        <p className="intro" data-reveal="up">
          Notes from building and running a logistics platform for twenty million shipments a year: PostgreSQL internals,
          splitting reads from writes, queues, framework choices, and what the people using a system teach you about it.
          Some are in English, some in Arabic.
        </p>
      </header>
      <ol className="w-list">
        {articles.map((a) => (
          <li key={a.slug} data-reveal="up" lang={a.lang} dir={a.lang === "ar" ? "rtl" : "ltr"}>
            <Link href={`/writing/${a.slug}`} className="w-item">
              <p className="w-meta">
                <time dateTime={a.date}>{fmt(a.date, a.lang)}</time>
                <span>{a.lang === "ar" ? `${readingMinutes(a.body)} دقايق قراية` : `${readingMinutes(a.body)} min read`}</span>
              </p>
              <h2 className="w-item-title">{a.title}</h2>
              <p className="w-item-desc">{a.description}</p>
            </Link>
          </li>
        ))}
      </ol>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </div>
  );
}
