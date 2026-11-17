import Image from "next/image";
import Link from "next/link";
import Logo from "@/components/Logo";
import Architecture from "@/components/Architecture";
import CoverArt from "@/components/Covers";
import SiteControls from "@/components/SiteControls";
import { articles, readingMinutes } from "@/lib/articles";
import { site } from "@/lib/site";
import { content, type Lang } from "@/lib/content";

export default function HomePage({ lang }: { lang: Lang }) {
  const c = content[lang];
  const ar = lang === "ar";
  const base = ar ? "/ar" : "";
  const latest = [...articles].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3);
  const stops = c.route.stops;

  const profileLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${site.url}${base}/#profile`,
    url: `${site.url}${base || "/"}`,
    name: ar ? "محمد عثمان — مهندس باك إند أول" : `${site.name} — ${site.role}`,
    dateCreated: "2026-09-01",
    dateModified: "2026-11-17",
    inLanguage: lang,
    isPartOf: { "@id": `${site.url}/#website` },
    mainEntity: { "@id": `${site.url}/#person` },
    hasPart: articles.map((a) => ({ "@type": "BlogPosting", headline: a.title, url: `${site.url}/writing/${a.slug}`, datePublished: a.date })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(profileLd) }} />
      <header className="nav">
        <a href="#top" className="mark" aria-label={c.nav.home}><Logo height={24} title={site.name} /></a>
        <nav aria-label={c.nav.sections}>
          <a href="#work">{c.nav.work}</a>
          <a href="#now">{c.nav.now}</a>
          <a href="#projects">{c.nav.projects}</a>
          <a href="#experience">{c.nav.experience}</a>
          <Link href="/writing">{c.nav.writing}</Link>
          <a href="#contact">{c.nav.contact}</a>
        </nav>
        <div className="nav-end">
          <SiteControls themeLabel={c.toggle.theme} langText={c.toggle.lang} langLabel={c.toggle.langLabel} langHref={c.toggle.langHref} langCode={ar ? "en" : "ar"} />
          <a className="btn btn-small" href={site.cv} download>{c.nav.cv}</a>
        </div>
      </header>

      <main id="main">
        <section className="hero wrap">
          <div className="hero-copy">
            <h1 className="display">{c.hero.title}</h1>
            <p className="lede">{c.hero.lede}</p>
            <div className="actions">
              <a className="btn" href={`mailto:${site.email}`}>{c.hero.email}</a>
              <a className="btn btn-ghost" href={site.cv} download>{c.hero.cv}</a>
              <a className="text-link" href={site.linkedin} target="_blank" rel="noopener">LinkedIn</a>
              <a className="text-link" href={site.github} target="_blank" rel="noopener">GitHub</a>
            </div>
          </div>

          <aside className="route" aria-labelledby="route-title">
            <div className="route-head">
              <h2 id="route-title">{c.route.title}</h2>
              <p className="status"><span className="status-dot" aria-hidden="true" />{c.route.status}</p>
            </div>
            <ol className="route-stops">
              {stops.map((s, i) => {
                const current = i === stops.length - 1;
                return (
                  <li key={s.date + s.role} className={current ? "is-now" : undefined} style={{ ["--i" as string]: i }}>
                    <span className="route-date">{s.date}</span>
                    <span className="route-what">
                      <b>{s.place}</b>
                      <span>{s.role}</span>
                    </span>
                    {current && <span className="tag">{c.route.now}</span>}
                  </li>
                );
              })}
              <li className="is-next" style={{ ["--i" as string]: stops.length }}>
                <span className="route-date">{c.route.next}</span>
                <span className="route-what"><span>{c.route.nextBody}</span></span>
              </li>
            </ol>
          </aside>
        </section>

        <section className="section wrap" id="work" aria-labelledby="work-title">
          <div className="section-head">
            <h2 id="work-title" className="h2">{c.work.title}</h2>
            <p className="intro">{c.work.intro}</p>
          </div>

          <dl className="figures">
            {c.work.figures.map((f) => (
              <div key={f.label}><dd dir="ltr">{f.value}</dd><dt>{f.label}</dt></div>
            ))}
          </dl>

          <figure className="arch">
            <div className="arch-scroll" dir="ltr" tabIndex={0} role="group" aria-label={c.work.archLabel}><Architecture label={c.work.archLabel} /></div>
            <figcaption>{c.work.caption}</figcaption>
          </figure>

          <h3 className="h3">{c.work.decisionsTitle}</h3>
          <table className="decisions">
            <thead><tr><th scope="col">{c.work.problem}</th><th scope="col">{c.work.answer}</th></tr></thead>
            <tbody>
              {c.decisions.map((d) => (
                <tr key={d.problem}><th scope="row">{d.problem}</th><td>{d.answer}</td></tr>
              ))}
            </tbody>
          </table>

          <div className="story">
            <div className="story-head">
              <h3 className="h3">{c.story.title}</h3>
              <p>{c.story.sub}</p>
            </div>
            <ol className="story-steps">
              {c.story.steps.map((s) => (
                <li key={s.title}>
                  <p className="story-when"><time>{s.time}</time><span>{s.place}</span></p>
                  <div>
                    <h4>{s.title}</h4>
                    <p>{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="story-coda">{c.story.coda}</p>
          </div>
        </section>

        <section className="section wrap" id="now" aria-labelledby="now-title">
          <div className="section-head">
            <h2 id="now-title" className="h2">{c.now.title}</h2>
            <p className="intro">{c.now.intro}</p>
          </div>
          <div className="features">
            {c.now.items.map((p) => (
              <article key={p.name} className="feature">
                <figure className="shot">
                  {p.image
                    ? <Image src={p.image} alt={`${p.name} ${c.projects.homePage}`} width={p.width} height={p.height} sizes="(max-width: 900px) 100vw, 55vw" />
                    : p.cover && <><CoverArt kind={p.cover} /><figcaption className="sr-only">{c.now.illustration}</figcaption></>}
                </figure>
                <div className="feature-body">
                  <h3 className="feature-name" dir="ltr">{p.name}</h3>
                  <p className="feature-tagline">{p.tagline}</p>
                  <p>{p.summary}</p>
                  <ul className="facts">{p.facts.map((f) => <li key={f}>{f}</li>)}</ul>
                  <ul className="chips" dir="ltr">{p.stack.map((s) => <li key={s}>{s}</li>)}</ul>
                  {p.href && <a className="text-link" href={p.href} target="_blank" rel="noopener" aria-label={`${c.now.visit}: ${p.name} (${c.projects.inNewTab})`}>{c.now.visit}</a>}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section wrap" id="projects" aria-labelledby="projects-title">
          <div className="section-head">
            <h2 id="projects-title" className="h2">{c.projects.title}</h2>
            <p className="intro">{c.projects.intro}</p>
          </div>
          <div className="projects">
            {c.projects.items.map((p) => {
              const github = p.href?.includes("github.com");
              return (
                <article key={p.name} className="project">
                  <figure className="shot">
                    {p.image
                      ? <Image src={p.image} alt={`${p.name} ${c.projects.homePage}`} width={p.width} height={p.height} sizes="(max-width: 900px) 100vw, 45vw" />
                      : p.cover && <CoverArt kind={p.cover} />}
                  </figure>
                  <div className="project-head">
                    <h3 dir="ltr">{p.name}</h3>
                    {p.status && <span className="tag tag-quiet">{p.status}</span>}
                  </div>
                  <p>{p.summary}</p>
                  <ul className="chips" dir="ltr">{p.stack.map((s) => <li key={s}>{s}</li>)}</ul>
                  {p.href && <a className="text-link" href={p.href} target="_blank" rel="noopener" aria-label={`${github ? c.projects.code : c.projects.visit}: ${p.name} (${c.projects.inNewTab})`}>{github ? c.projects.code : c.projects.visit}</a>}
                </article>
              );
            })}
          </div>
        </section>

        <section className="section wrap" id="experience" aria-labelledby="exp-title">
          <div className="section-head">
            <h2 id="exp-title" className="h2">{c.expTitle}</h2>
          </div>
          <div className="jobs">
            {c.experience.map((j) => (
              <article key={j.company} className="job">
                <header>
                  <h3 dir="ltr">{j.company}</h3>
                  <p>{j.place}</p>
                </header>
                <div className="roles">
                  {j.roles.map((r) => (
                    <div key={r.title} className="role">
                      <h4>{r.title}</h4>
                      <p className="role-dates">{r.from} {c.datesJoin} {r.to}</p>
                      <ul>{r.points.map((pt) => <li key={pt}>{pt}</li>)}</ul>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section wrap about" id="about" aria-labelledby="about-title">
          <div className="about-text">
            <h2 id="about-title" className="h2">{c.about.title}</h2>
            <p>{c.about.p1}</p>
            <p>{c.about.p2}</p>
          </div>
          <Image className="portrait" src="/images/mohamed.webp" alt={c.about.portrait} width={600} height={600} sizes="(max-width: 900px) 60vw, 280px" />
          <dl className="stack">
            {c.about.stack.map((g) => (
              <div key={g.group}>
                <dt>{g.group}</dt>
                <dd>{g.items.join(ar ? "، " : ", ")}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="section wrap" id="writing" aria-labelledby="writing-title">
          <div className="section-head">
            <h2 id="writing-title" className="h2">{c.writing.title}</h2>
            <p className="intro">{c.writing.intro}</p>
          </div>
          <ul className="posts">
            {latest.map((a) => (
              <li key={a.slug} lang={a.lang} dir={a.lang === "ar" ? "rtl" : "ltr"}>
                <Link href={`/writing/${a.slug}`}>
                  <h3>{a.title}</h3>
                  <p>{a.description}</p>
                </Link>
              </li>
            ))}
          </ul>
          <Link className="text-link" href="/writing">{c.writing.all}</Link>
        </section>

        <section className="contact" id="contact" aria-labelledby="contact-title">
          <div className="wrap">
            <h2 id="contact-title" className="display">{c.contact.title}</h2>
            <p className="lede">{c.contact.body}</p>
            <div className="actions">
              <a className="btn btn-ink" href={`mailto:${site.email}`}>{c.contact.email}</a>
              <a className="btn btn-ink-ghost" href={site.whatsapp} target="_blank" rel="noopener">{c.contact.whatsapp}</a>
              <a className="btn btn-ink-ghost" href={site.linkedin} target="_blank" rel="noopener">{c.contact.linkedin}</a>
              <a className="btn btn-ink-ghost" href={site.cv} download>{c.contact.cv}</a>
            </div>
            <p className="contact-direct" dir="ltr"><a href={`mailto:${site.email}`}>{site.email}</a><a href={site.phoneHref}>{site.phone}</a></p>
          </div>
        </section>
      </main>

      <footer className="footer wrap">
        <p><Logo height={14} title="" /> © 2026 {ar ? "محمد عثمان" : site.name}</p>
        <a className="text-link" href="#top">{c.footer.top}</a>
      </footer>
    </>
  );
}
