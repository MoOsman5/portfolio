import Image from "next/image";
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
import { decisions, experience, projects, site, stack } from "@/lib/site";

const marqueeA = ["NestJS", "PostgreSQL", "Redis", "Bull", "TypeScript", "Node.js", "PgBouncer", "Docker", "AWS", "GraphQL"];
const marqueeB = ["Partitioning", "Read replicas", "Zero-downtime migrations", "Queues", "Caching", "Multi-tenant SaaS", "OpenTelemetry", "Code review"];

export default function Home() {
  return (
    <>
      <Preloader />
      <Cosmos />
      <Motion />
      <header className="nav">
        <a href="#top" className="mark" aria-label="Mohamed Osman, back to top" data-magnetic><Logo height={26} title="Mohamed Osman" /></a>
        <nav aria-label="Sections">
          <a href="#work"><span className="roll" data-text="Work">Work</span></a>
          <a href="#experience"><span className="roll" data-text="Experience">Experience</span></a>
          <a href="#projects"><span className="roll" data-text="Projects">Projects</span></a>
          <a href="#contact"><span className="roll" data-text="Contact">Contact</span></a>
        </nav>
        <a className="nav-cv" href={site.cv} download data-magnetic>Download CV</a>
      </header>

      <main id="main">
        <section className="hero" id="top" aria-labelledby="hero-title">
          <div className="hero-map">
            <HeroScene />
          </div>
          <div className="hero-copy">
            <h1 id="hero-title" className="display" aria-label="Mohamed Osman">
              <span className="line"><SlabM /><Chars text="ohamed" start={1} /></span>
              <span className="line indent"><Chars text="Osman" start={7} /></span>
            </h1>
            <p className="lede">
              Senior backend engineer in Giza. I designed and built a logistics platform that moves
              twenty million shipments a year across Egypt, and led the team of five that ran it.
            </p>
            <div className="actions">
              <a className="btn btn-gold" href={`mailto:${site.email}`} data-magnetic><span>Email me</span></a>
              <a className="btn" href={site.cv} download data-magnetic><span>Download CV</span></a>
            </div>
          </div>
          <ShipmentCounter />
          <a href="#work" className="scroll-cue" aria-label="Scroll to work"><span /></a>
        </section>

        <Story />

        <section className="section" id="work" aria-labelledby="work-title">
          <div className="section-head">
            <h2 id="work-title" className="h2" data-reveal="mask"><Words text="A platform built from nothing, for twenty million shipments a year." /></h2>
            <p className="intro" data-reveal="up">
              ABS Courier was running on a purchased system that didn&apos;t fit how the business worked. I joined in 2024,
              proposed NestJS and PostgreSQL as the foundation for a replacement, and took it from requirements gathered
              with operations, branches and the fleet to the system the company runs on today.
            </p>
          </div>

          <dl className="figures" data-reveal="up">
            <div><dt>Shipments a year</dt><dd data-count="20" data-suffix="M+">20M+</dd></div>
            <div><dt>People using it</dt><dd data-count="1000" data-suffix="+">1,000+</dd></div>
            <div><dt>Faster responses with Redis</dt><dd data-count="3.7" data-decimals="1" data-suffix="×">3.7×</dd></div>
            <div><dt>Backend engineers led</dt><dd data-count="5">5</dd></div>
          </dl>

          <figure className="arch" data-reveal="fade">
            <Architecture />
            <figcaption>How a request moves through the platform: Nginx in front of the NestJS API, Redis for hot reads, PgBouncer routing writes to a date-partitioned primary and reporting to replicas, and Bull queues feeding a dedicated worker.</figcaption>
          </figure>

          <h3 className="h3" data-reveal="mask"><Words text="The decisions behind it" /></h3>
          <ul className="decisions">
            {decisions.map((d) => (
              <li key={d.problem} data-reveal="up">
                <p className="problem">{d.problem}</p>
                <p className="answer">{d.answer}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="section" id="experience" aria-labelledby="exp-title">
          <div className="section-head">
            <h2 id="exp-title" className="h2" data-reveal="mask"><Words text="Four years, from interfaces to infrastructure." /></h2>
          </div>
          <ol className="timeline">
            {experience.map((job) => (
              <li key={job.company} className="job" data-reveal="up">
                <div className="job-when">
                  {job.roles[job.roles.length - 1].from.split(" ")[1]}
                  <span aria-hidden="true">–</span>
                  {job.roles[0].to.split(" ")[1]}
                </div>
                <div className="job-body">
                  <h3 className="job-company">{job.company}<span className="job-place">{job.place}, Egypt</span></h3>
                  {job.roles.map((r) => (
                    <div key={r.title} className="role">
                      <p className="role-title">
                        {r.title}
                        <span className="role-dates">{r.from} to {r.to}</span>
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
            <h2 id="proj-title" className="h2" data-reveal="mask"><Words text="Selected projects." /></h2>
            <p className="intro" data-reveal="up">Products I build end to end, from the platform underneath to the screen people tap.</p>
          </div>
          <div className="projects">
            {projects.map((p) => (
              <article key={p.name} className="project">
                <a href={p.href} target="_blank" rel="noopener" className="project-shot" aria-label={`Open ${p.name} in a new tab`} data-reveal="clip" data-tilt data-cursor="Visit">
                  <span className="project-img" data-parallax="0.06">
                    <Image src={p.image} alt={`${p.name} home page`} width={p.width} height={p.height} sizes="(max-width: 900px) 100vw, 80vw" />
                  </span>
                  <span className="project-glare" aria-hidden="true" />
                </a>
                <div className="project-text" data-reveal="up">
                  {p.status ? <p className="status"><span aria-hidden="true" />{p.status}</p> : null}
                  <h3 className="h3">{p.name}</h3>
                  <p>{p.summary}</p>
                  <p className="tags">{p.stack.join(", ")}</p>
                  <a className="link" href={p.href} target="_blank" rel="noopener">Visit {p.name}</a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <div className="marquee" aria-hidden="true">
          <div className="marquee-row"><div className="marquee-track">{[...marqueeA, ...marqueeA].map((t, i) => <span key={i}>{t}</span>)}</div></div>
          <div className="marquee-row reverse"><div className="marquee-track">{[...marqueeB, ...marqueeB].map((t, i) => <span key={i}>{t}</span>)}</div></div>
        </div>

        <section className="section about" id="about" aria-labelledby="about-title">
          <div className="portrait-wrap" data-reveal="clip">
            <Image className="portrait" src="/images/mohamed.webp" alt="Portrait of Mohamed Osman" width={600} height={600} />
          </div>
          <div>
            <h2 id="about-title" className="h2" data-reveal="mask"><Words text="The person behind the queues." /></h2>
            <p data-reveal="up">
              I like the unglamorous parts of software: the index that keeps a query flat at year three, the migration
              that ships without anyone noticing, the review comment that saves a teammate a week. I&apos;m studying
              computer science at Cairo University, competed in the Egyptian Collegiate Programming Contest in 2022,
              and spent almost three years teaching coding and robotics to kids with the Digital Egypt Cubs Initiative.
            </p>
            <p data-reveal="up">I work in Arabic and English, and I still ship React, Next.js and React Native when a product needs it.</p>
            <dl className="stack">
              {stack.map((s) => (
                <div key={s.group} data-reveal="up">
                  <dt>{s.group}</dt>
                  <dd>{s.items.join(", ")}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="contact" id="contact" aria-labelledby="contact-title">
          <h2 id="contact-title" className="h2" data-reveal="mask"><Words text="Building something that has to keep up?" /></h2>
          <a className="email" href={`mailto:${site.email}`} aria-label={`Email ${site.email}`} data-reveal="up"><Chars text={site.email} /></a>
          <ul className="contact-links" data-reveal="up">
            <li><a href={site.phoneHref}><span className="roll" data-text={site.phone}>{site.phone}</span></a></li>
            <li><a href={site.whatsapp} target="_blank" rel="noopener"><span className="roll" data-text="WhatsApp">WhatsApp</span></a></li>
            <li><a href={site.linkedin} target="_blank" rel="noopener me"><span className="roll" data-text="LinkedIn">LinkedIn</span></a></li>
            <li><a href={site.github} target="_blank" rel="noopener me"><span className="roll" data-text="GitHub">GitHub</span></a></li>
            <li><a href={site.leetcode} target="_blank" rel="noopener me"><span className="roll" data-text="LeetCode">LeetCode</span></a></li>
            <li><a href={site.cv} download><span className="roll" data-text="Download CV">Download CV</span></a></li>
          </ul>
        </section>
      </main>

      <footer className="footer">
        <p className="footer-mark"><Logo height={16} title="" /> © 2026 Mohamed Osman</p>
        <a href="#top" className="to-top" data-magnetic>Back to top</a>
      </footer>
    </>
  );
}
