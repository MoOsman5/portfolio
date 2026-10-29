import Image from "next/image";
import Link from "next/link";
import HeroScene from "@/components/HeroScene";
import Preloader from "@/components/Preloader";
import Motion from "@/components/Motion";
import Logo from "@/components/Logo";
import ShipmentCounter from "@/components/ShipmentCounter";
import Architecture from "@/components/Architecture";
import Story from "@/components/Story";
import { Chars, Words } from "@/components/Split";
import SlabM from "@/components/SlabM";
import Cosmos from "@/components/Cosmos";
import SiteControls from "@/components/SiteControls";
import { articles } from "@/lib/articles";
import { site } from "@/lib/site";
import { content, type Lang } from "@/lib/content";

const marqueeA = ["NestJS", "PostgreSQL", "Redis", "Bull", "TypeScript", "Node.js", "PgBouncer", "Docker", "AWS", "GraphQL"];
const marqueeB = ["Partitioning", "Read replicas", "Zero-downtime migrations", "Queues", "Caching", "Multi-tenant SaaS", "OpenTelemetry", "Code review"];

export default function HomePage({ lang }: { lang: Lang }) {
  const c = content[lang];
  const ar = lang === "ar";
  const base = ar ? "/ar" : "";

  const profileLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${site.url}${base}/#profile`,
    url: `${site.url}${base || "/"}`,
    name: ar ? "محمد عثمان — مهندس باك إند أول" : `${site.name} — ${site.role}`,
    dateCreated: "2026-09-01",
    dateModified: "2026-10-30",
    inLanguage: lang,
    isPartOf: { "@id": `${site.url}/#website` },
    mainEntity: { "@id": `${site.url}/#person` },
    hasPart: articles.map((a) => ({ "@type": "BlogPosting", headline: a.title, url: `${site.url}/writing/${a.slug}`, datePublished: a.date })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(profileLd) }} />
      <Preloader logs={c.loader} />
      <Cosmos />
      <Motion />
      <header className="nav">
        <a href="#top" className="mark" aria-label={c.nav.home} data-magnetic><Logo height={26} title={site.name} /></a>
        <nav aria-label={c.nav.sections}>
          <a href="#work"><span className="roll" data-text={c.nav.work}>{c.nav.work}</span></a>
          <a href="#experience"><span className="roll" data-text={c.nav.experience}>{c.nav.experience}</span></a>
          <a href="#projects"><span className="roll" data-text={c.nav.projects}>{c.nav.projects}</span></a>
          <Link href="/writing"><span className="roll" data-text={c.nav.writing}>{c.nav.writing}</span></Link>
          <a href="#contact"><span className="roll" data-text={c.nav.contact}>{c.nav.contact}</span></a>
        </nav>
        <div className="nav-end">
          <a className="nav-cv" href={site.cv} download data-magnetic>{c.nav.cv}</a>
          <SiteControls themeLabel={c.toggle.theme} langText={c.toggle.lang} langLabel={c.toggle.langLabel} langHref={c.toggle.langHref} langCode={ar ? "en" : "ar"} />
        </div>
      </header>

      <main id="main">
        <section className="hero" id="top" aria-labelledby="hero-title">
          <div className="hero-map">
            <HeroScene />
          </div>
          <div className="hero-copy">
            {ar ? (
              <h1 id="hero-title" className="display display-ar" aria-label={c.hero.name}>
                <span className="line" aria-hidden="true"><span className="ch" style={{ ["--i" as string]: 0 }}>محمد</span></span>
                <span className="line indent" aria-hidden="true"><span className="ch" style={{ ["--i" as string]: 3 }}>عثمان</span></span>
              </h1>
            ) : (
              <h1 id="hero-title" className="display" aria-label={c.hero.name}>
                <span className="line"><SlabM /><Chars text="ohamed" start={1} /></span>
                <span className="line indent"><Chars text="Osman" start={7} /></span>
              </h1>
            )}
            <p className="lede">{c.hero.lede}</p>
            <div className="actions">
              <a className="btn btn-gold" href={`mailto:${site.email}`} data-magnetic><span>{c.hero.email}</span></a>
              <a className="btn" href={site.cv} download data-magnetic><span>{c.hero.cv}</span></a>
            </div>
          </div>
          <ShipmentCounter label={c.counter} locale={c.numberLocale} />
          <a href="#work" className="scroll-cue" aria-label={c.hero.scroll}><span /></a>
        </section>

        <Story t={c.story} />

        <section className="section" id="work" aria-labelledby="work-title">
          <div className="section-head">
            <h2 id="work-title" className="h2" data-reveal="mask"><Words text={c.work.title} /></h2>
            <p className="intro" data-reveal="up">{c.work.intro}</p>
          </div>

          <dl className="figures" data-reveal="up">
            <div><dt>{c.work.figures[0]}</dt><dd dir="ltr" data-count="20" data-suffix="M+">20M+</dd></div>
            <div><dt>{c.work.figures[1]}</dt><dd dir="ltr" data-count="50" data-suffix="K+">50K+</dd></div>
            <div><dt>{c.work.figures[2]}</dt><dd dir="ltr" data-count="3.7" data-decimals="1" data-suffix="×">3.7×</dd></div>
            <div><dt>{c.work.figures[3]}</dt><dd dir="ltr" data-count="5">5</dd></div>
          </dl>

          <figure className="arch" data-reveal="fade">
            <div dir="ltr"><Architecture /></div>
            <figcaption>{c.work.caption}</figcaption>
          </figure>

          <h3 className="h3" data-reveal="mask"><Words text={c.work.decisionsTitle} /></h3>
          <ul className="decisions">
            {c.decisions.map((d) => (
              <li key={d.problem} data-reveal="up">
                <p className="problem">{d.problem}</p>
                <p className="answer">{d.answer}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="section" id="experience" aria-labelledby="exp-title">
          <div className="section-head">
            <h2 id="exp-title" className="h2" data-reveal="mask"><Words text={c.expTitle} /></h2>
          </div>
          <ol className="timeline">
            {c.experience.map((job) => (
              <li key={job.company} className="job" data-reveal="up">
                <div className="job-when">
                  {job.roles[job.roles.length - 1].from.split(" ")[1]}
                  <span aria-hidden="true">–</span>
                  {job.roles[0].to.split(" ")[1]}
                </div>
                <div className="job-body">
                  <h3 className="job-company"><span dir="auto">{job.company}</span><span className="job-place">{job.place}</span></h3>
                  {job.roles.map((r) => (
                    <div key={r.title} className="role">
                      <p className="role-title">
                        <span dir="auto">{r.title}</span>
                        <span className="role-dates">{r.from} {c.datesJoin} {r.to}</span>
                      </p>
                      <ul>
                        {r.points.map((p) => <li key={p}>{p}</li>)}
                      </ul>
                    </div>
                  ))}
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="section" id="projects" aria-labelledby="proj-title">
          <div className="section-head">
            <h2 id="proj-title" className="h2" data-reveal="mask"><Words text={c.projects.title} /></h2>
            <p className="intro" data-reveal="up">{c.projects.intro}</p>
          </div>
          <div className="projects">
            {c.projects.items.map((p) => (
              <article key={p.name} className="project">
                <a href={p.href} target="_blank" rel="noopener" className="project-shot" aria-label={`${c.projects.open} ${p.name} ${c.projects.inNewTab}`} data-reveal="clip" data-tilt data-cursor={c.projects.visit}>
                  <span className="project-img" data-parallax="0.06">
                    <Image src={p.image} alt={`${p.name} ${c.projects.homePage}`} width={p.width} height={p.height} sizes="(max-width: 900px) 100vw, 80vw" />
                  </span>
                  <span className="project-glare" aria-hidden="true" />
                </a>
                <div className="project-text" data-reveal="up">
                  {p.status ? <p className="status"><span aria-hidden="true" />{p.status}</p> : null}
                  <h3 className="h3" dir="ltr">{p.name}</h3>
                  <p>{p.summary}</p>
                  <p className="tags" dir="ltr">{p.stack.join(", ")}</p>
                  <a className="link" href={p.href} target="_blank" rel="noopener">{c.projects.visit} {p.name}</a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <div className="marquee" aria-hidden="true" dir="ltr">
          <div className="marquee-row"><div className="marquee-track">{[...marqueeA, ...marqueeA].map((t, i) => <span key={i}>{t}</span>)}</div></div>
          <div className="marquee-row reverse"><div className="marquee-track">{[...marqueeB, ...marqueeB].map((t, i) => <span key={i}>{t}</span>)}</div></div>
        </div>

        <section className="section about" id="about" aria-labelledby="about-title">
          <div className="portrait-wrap" data-reveal="clip">
            <Image className="portrait" src="/images/mohamed.webp" alt={c.about.portrait} width={600} height={600} />
          </div>
          <div>
            <h2 id="about-title" className="h2" data-reveal="mask"><Words text={c.about.title} /></h2>
            <p data-reveal="up">{c.about.p1}</p>
            <p data-reveal="up">{c.about.p2}</p>
            <dl className="stack">
              {c.about.stack.map((s) => (
                <div key={s.group} data-reveal="up">
                  <dt>{s.group}</dt>
                  <dd dir="ltr">{s.items.join(", ")}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="section writing" id="writing" aria-labelledby="writing-title">
          <div className="section-head">
            <h2 id="writing-title" className="h2" data-reveal="mask"><Words text={c.writing.title} /></h2>
            <p className="intro" data-reveal="up">{c.writing.intro}</p>
          </div>
          <ol className="writing-list">
            {articles.map((a) => (
              <li key={a.slug} data-reveal="up" lang={a.lang} dir={a.lang === "ar" ? "rtl" : "ltr"}>
                <Link href={`/writing/${a.slug}`} data-magnetic>
                  <time dateTime={a.date}>{a.date.slice(0, 7).replace("-", " · ")}</time>
                  <span className="writing-title">{a.title}</span>
                  <span className="writing-arrow" aria-hidden="true">→</span>
                </Link>
              </li>
            ))}
          </ol>
          <p data-reveal="up"><Link href="/writing" className="link">{c.writing.all}</Link></p>
        </section>

        <section className="contact" id="contact" aria-labelledby="contact-title">
          <h2 id="contact-title" className="h2" data-reveal="mask"><Words text={c.contact.title} /></h2>
          <a className="email" href={`mailto:${site.email}`} aria-label={`${c.contact.email} ${site.email}`} data-reveal="up" dir="ltr"><Chars text={site.email} /></a>
          <ul className="contact-links" data-reveal="up">
            <li><a href={site.phoneHref} dir="ltr"><span className="roll" data-text={site.phone}>{site.phone}</span></a></li>
            <li><a href={site.whatsapp} target="_blank" rel="noopener"><span className="roll" data-text={c.contact.whatsapp}>{c.contact.whatsapp}</span></a></li>
            <li><a href={site.linkedin} target="_blank" rel="noopener me"><span className="roll" data-text="LinkedIn">LinkedIn</span></a></li>
            <li><a href={site.github} target="_blank" rel="noopener me"><span className="roll" data-text="GitHub">GitHub</span></a></li>
            <li><a href={site.leetcode} target="_blank" rel="noopener me"><span className="roll" data-text="LeetCode">LeetCode</span></a></li>
            <li><a href={site.cv} download><span className="roll" data-text={c.contact.cv}>{c.contact.cv}</span></a></li>
          </ul>
        </section>
      </main>

      <footer className="footer">
        <p className="footer-mark"><Logo height={16} title="" /> <span dir="ltr">© 2026 Mohamed Osman</span></p>
        <a href="#top" className="to-top" data-magnetic>{c.footer.top}</a>
      </footer>
    </>
  );
}
