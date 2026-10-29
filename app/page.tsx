import Image from "next/image";
import NetworkCanvas from "@/components/NetworkCanvas";
import ShipmentCounter from "@/components/ShipmentCounter";
import Architecture from "@/components/Architecture";
import { decisions, experience, projects, site, stack } from "@/lib/site";

export default function Home() {
  return (
    <>
      <header className="nav">
        <a href="#top" className="mark" aria-label="Mohamed Osman, back to top">MO</a>
        <nav aria-label="Sections">
          <a href="#work">Work</a>
          <a href="#experience">Experience</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </nav>
        <a className="nav-cv" href={site.cv} download>Download CV</a>
      </header>

      <main id="main">
        <section className="hero" id="top" aria-labelledby="hero-title">
          <div className="hero-map">
            <NetworkCanvas />
          </div>
          <div className="hero-copy">
            <h1 id="hero-title" className="display">
              <span>Mohamed</span>
              <span className="indent">Osman</span>
            </h1>
            <p className="lede">
              Senior backend engineer in Giza. I designed and built a logistics platform that moves
              twenty million shipments a year across Egypt, and led the team of five that ran it.
            </p>
            <div className="actions">
              <a className="btn btn-gold" href={`mailto:${site.email}`}>Email me</a>
              <a className="btn" href={site.cv} download>Download CV</a>
            </div>
          </div>
          <ShipmentCounter />
        </section>

        <section className="section" id="work" aria-labelledby="work-title">
          <div className="section-head">
            <h2 id="work-title" className="h2">A platform built from nothing, for twenty million shipments a year.</h2>
            <p className="intro">
              ABS Courier was running on a purchased system that didn't fit how the business worked. I joined in 2024,
              proposed NestJS and PostgreSQL as the foundation for a replacement, and took it from requirements gathered
              with operations, branches and the fleet to the system the company runs on today.
            </p>
          </div>

          <dl className="figures">
            <div><dt>Shipments a year</dt><dd>20M+</dd></div>
            <div><dt>People using it</dt><dd>1,000+</dd></div>
            <div><dt>Faster responses with Redis</dt><dd>3.7×</dd></div>
            <div><dt>Backend engineers led</dt><dd>5</dd></div>
          </dl>

          <figure className="arch">
            <Architecture />
            <figcaption>How a request moves through the platform: Nginx in front of the NestJS API, Redis for hot reads, PgBouncer routing writes to a date-partitioned primary and reporting to replicas, and Bull queues feeding a dedicated worker.</figcaption>
          </figure>

          <h3 className="h3">The decisions behind it</h3>
          <ul className="decisions">
            {decisions.map((d) => (
              <li key={d.problem}>
                <p className="problem">{d.problem}</p>
                <p className="answer">{d.answer}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="section" id="experience" aria-labelledby="exp-title">
          <div className="section-head">
            <h2 id="exp-title" className="h2">Four years, from interfaces to infrastructure.</h2>
          </div>
          <ol className="timeline">
            {experience.map((job) => (
              <li key={job.company} className="job">
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
            <h2 id="proj-title" className="h2">Selected projects.</h2>
            <p className="intro">Products I built end to end, from the API to the storefront.</p>
          </div>
          <div className="projects">
            {projects.map((p) => (
              <article key={p.name} className="project">
                <a href={p.href} target="_blank" rel="noopener" className="project-shot" aria-label={`Open ${p.name} in a new tab`}>
                  <Image src={p.image} alt={`${p.name} home page`} width={p.width} height={p.height} sizes="(max-width: 900px) 100vw, 80vw" />
                </a>
                <div className="project-text">
                  <h3 className="h3">{p.name}</h3>
                  <p>{p.summary}</p>
                  <p className="tags">{p.stack.join(", ")}</p>
                  <a className="link" href={p.href} target="_blank" rel="noopener">Visit {p.name}</a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section about" id="about" aria-labelledby="about-title">
          <Image className="portrait" src="/images/mohamed.webp" alt="Portrait of Mohamed Osman" width={600} height={600} />
          <div>
            <h2 id="about-title" className="h2">The person behind the queues.</h2>
            <p>
              I like the unglamorous parts of software: the index that keeps a query flat at year three, the migration
              that ships without anyone noticing, the review comment that saves a teammate a week. I&apos;m studying
              computer science at Cairo University, competed in the Egyptian Collegiate Programming Contest in 2022,
              and spent almost three years teaching coding and robotics to kids with the Digital Egypt Cubs Initiative.
            </p>
            <p>I work in Arabic and English, and I still ship React, Next.js and React Native when a product needs it.</p>
            <dl className="stack">
              {stack.map((s) => (
                <div key={s.group}>
                  <dt>{s.group}</dt>
                  <dd>{s.items.join(", ")}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="contact" id="contact" aria-labelledby="contact-title">
          <h2 id="contact-title" className="h2">Building something that has to keep up?</h2>
          <a className="email" href={`mailto:${site.email}`}>{site.email}</a>
          <ul className="contact-links">
            <li><a href={site.phoneHref}>{site.phone}</a></li>
            <li><a href={site.whatsapp} target="_blank" rel="noopener">WhatsApp</a></li>
            <li><a href={site.linkedin} target="_blank" rel="noopener me">LinkedIn</a></li>
            <li><a href={site.github} target="_blank" rel="noopener me">GitHub</a></li>
            <li><a href={site.leetcode} target="_blank" rel="noopener me">LeetCode</a></li>
            <li><a href={site.cv} download>Download CV</a></li>
          </ul>
        </section>
      </main>

      <footer className="footer">
        <p>© 2026 Mohamed Osman</p>
        <p>Giza, Egypt</p>
      </footer>
    </>
  );
}
