import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articles, blocks, getArticle, readingMinutes } from "@/lib/articles";
import { site } from "@/lib/site";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) return {};
  const url = `${site.url}/writing/${a.slug}`;
  return {
    title: a.title,
    description: a.description,
    keywords: [...a.tags, "Mohamed Osman", "backend engineering"],
    authors: [{ name: site.name, url: site.url }],
    alternates: { canonical: `/writing/${a.slug}` },
    openGraph: {
      type: "article",
      url,
      title: a.title,
      description: a.description,
      publishedTime: a.date,
      authors: [site.url],
      tags: a.tags,
      locale: a.lang === "ar" ? "ar_EG" : "en_US",
      images: [{ url: "/og.png", width: 1200, height: 630, alt: site.name }],
    },
    twitter: { card: "summary_large_image", title: a.title, description: a.description, images: ["/og.png"] },
  };
}

const fmt = (d: string, lang: string) =>
  new Date(d + "T00:00:00Z").toLocaleDateString(lang === "ar" ? "ar-EG" : "en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

export default async function ArticlePage({ params }: Params) {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) notFound();
  const ar = a.lang === "ar";
  const url = `${site.url}/writing/${a.slug}`;
  const others = articles.filter((x) => x.slug !== a.slug).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${url}#article`,
        headline: a.title,
        description: a.description,
        datePublished: a.date,
        dateModified: a.date,
        inLanguage: a.lang,
        keywords: a.tags.join(", "),
        wordCount: a.body.split(/\s+/).length,
        mainEntityOfPage: url,
        url,
        image: `${site.url}/og.png`,
        author: { "@type": "Person", "@id": `${site.url}/#person`, name: site.name, url: site.url },
        publisher: { "@id": `${site.url}/#person` },
        isPartOf: { "@id": `${site.url}/writing#blog` },
        sameAs: a.linkedin,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: site.url },
          { "@type": "ListItem", position: 2, name: "Writing", item: `${site.url}/writing` },
          { "@type": "ListItem", position: 3, name: a.title, item: url },
        ],
      },
    ],
  };

  return (
    <div className="w-wrap">
      <nav className="w-crumbs" aria-label="Breadcrumb">
        <Link href="/">Home</Link><span aria-hidden="true">/</span><Link href="/writing">Writing</Link>
      </nav>

      <article className={`w-article ${ar ? "is-ar" : ""}`} lang={a.lang} dir={ar ? "rtl" : "ltr"}>
        <header className="w-head">
          <p className="w-meta" data-reveal="up">
            <time dateTime={a.date}>{fmt(a.date, a.lang)}</time>
            <span>{ar ? `${readingMinutes(a.body)} دقايق قراية` : `${readingMinutes(a.body)} min read`}</span>
          </p>
          <h1 className="w-title" data-reveal="up">{a.title}</h1>
          <p className="w-lede" data-reveal="up">{a.description}</p>
          <ul className="w-tags" aria-label="Topics" dir="ltr">
            {a.tags.map((t) => <li key={t}>{t}</li>)}
          </ul>
        </header>

        <div className="w-body">
          {blocks(a.body).map((b, i) =>
            b.type === "list" ? (
              <ul key={i}>{b.items.map((it) => <li key={it}>{it}</li>)}</ul>
            ) : (
              <p key={i}>{b.text}</p>
            ),
          )}
        </div>

        <footer className="w-foot">
          <a className="link" href={a.linkedin} target="_blank" rel="noopener">
            {ar ? "البوست الأصلي والنقاش عليه في LinkedIn" : "Read the original post and discussion on LinkedIn"}
          </a>
        </footer>
      </article>

      <aside className="w-author" aria-label="About the author">
        <Image src="/images/mohamed.webp" alt="Mohamed Osman" width={96} height={96} className="w-author-img" />
        <div>
          <p className="w-author-name">Mohamed Osman</p>
          <p className="w-author-bio">
            Senior backend engineer in Giza. Designed and built ABS Courier&apos;s logistics platform for 20M+ shipments a
            year and 50,000+ users, and led the backend team behind it.
          </p>
          <Link href="/" className="link">See the work</Link>
        </div>
      </aside>

      <section className="w-more" aria-labelledby="more-title">
        <h2 id="more-title" className="h3">More writing</h2>
        <ul>
          {others.map((o) => (
            <li key={o.slug} lang={o.lang} dir={o.lang === "ar" ? "rtl" : "ltr"}>
              <Link href={`/writing/${o.slug}`}>{o.title}</Link>
            </li>
          ))}
        </ul>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </div>
  );
}
