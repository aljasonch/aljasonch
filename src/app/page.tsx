import Image from "next/image";
import Link from "next/link";
import { capabilities, experience, profile, projects } from "@/lib/content";
import ProjectCard from "@/components/project-card";
import LiveClock from "@/components/live-clock";

export default function Home() {
  const [flagship, second, third, ...archiveProjects] = projects;

  return (
    <div className="container">
      <div className="masthead-bar">
        <span>Software Engineer · Full-Stack &amp; Business Systems</span>
        <span>
          Tangerang, ID · <LiveClock />
        </span>
        <span>PT Solusi Kode Indonesia</span>
      </div>

      <section className="hero" aria-labelledby="hero-heading">
        <div className="hero-copy">
          <p className="eyebrow">Alfonsus Jason Christian</p>
          <h1 id="hero-heading">
            From complex
            <br />
            to <em>useful.</em>
          </h1>
          <p className="hero-description">
            I design and build full-stack web applications and practical
            business systems—combining clear interfaces with reliable
            engineering underneath.
          </p>
          <div className="hero-buttons">
            <Link className="button" href="/portfolio">
              Selected work{" "}
              <span className="arrow-cue" aria-hidden="true">
                →
              </span>
            </Link>
            <Link className="button secondary" href="/contact">
              Get in touch{" "}
              <span className="arrow-cue" aria-hidden="true">
                ↗
              </span>
            </Link>
          </div>

          <dl className="hero-ledger">
            <div>
              <dt>Currently</dt>
              <dd>
                PT Solusi Kode Indonesia
                <span>Software Engineer · Sep 2026 — Present</span>
              </dd>
            </div>
            <div>
              <dt>Previously</dt>
              <dd>
                Kompas Gramedia
                <span>Odoo ERP, Python &amp; PostgreSQL</span>
              </dd>
            </div>
          </dl>
        </div>

        <figure className="portrait-plate">
          <div className="portrait-frame">
            <Image
              src="/images/aljasonch.png"
              alt="Portrait of Alfonsus Jason Christian"
              width={1024}
              height={1365}
              priority
              sizes="(max-width: 760px) 84vw, 380px"
            />
          </div>
          <figcaption className="portrait-caption">
            <span>Fig. 01 — Jason Christian</span>
            <span>{profile.location}</span>
          </figcaption>
        </figure>
      </section>

      <section className="section" aria-labelledby="practice-heading">
        <div className="section-heading">
          <div>
            <p className="eyebrow">01 / Practice</p>
            <h2 id="practice-heading" className="section-title">
              Built with a <em>practical</em> mindset.
            </h2>
          </div>
          <Link href="/cv" className="text-link">
            Skills &amp; toolkit{" "}
            <span className="arrow-cue" aria-hidden="true">
              ↗
            </span>
          </Link>
        </div>

        <div className="capabilities-grid">
          {capabilities.map((item) => (
            <article className="capability-col" key={item.index}>
              <span className="capability-index">{item.index}</span>
              <h3>{item.title}</h3>
              <p>{item.summary}</p>
              <ul className="tech-list" aria-label={`${item.title} stack`}>
                {item.stack.map((tech) => (
                  <li key={tech}>{tech}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="section" aria-labelledby="work-heading">
        <div className="section-heading">
          <div>
            <p className="eyebrow">02 / Selected Work</p>
            <h2 id="work-heading" className="section-title">
              Work that <em>works.</em>
            </h2>
          </div>
          <Link href="/portfolio" className="text-link">
            Full archive ({String(projects.length).padStart(2, "0")}){" "}
            <span className="arrow-cue" aria-hidden="true">
              →
            </span>
          </Link>
        </div>

        {flagship && <ProjectCard project={flagship} index={0} featured />}

        <div className="project-pair">
          {second && <ProjectCard project={second} index={1} />}
          {third && <ProjectCard project={third} index={2} />}
        </div>

        <div className="archive-ledger" aria-label="More selected projects">
          <div className="archive-ledger-header">
            <p className="eyebrow">More from the archive</p>
          </div>
          {archiveProjects.map((project, idx) => {
            const number = String(idx + 4).padStart(2, "0");
            return (
              <Link
                key={project.slug}
                href={`/portfolio/${project.slug}`}
                className="index-row"
              >
                <span className="index-num">{number}</span>
                <span className="index-title">{project.title}</span>
                <p className="index-desc">{project.description}</p>
                <span className="index-meta">
                  <span>
                    {project.category} · {project.year}
                  </span>
                  <span className="arrow-cue" aria-hidden="true">
                    →
                  </span>
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <section
        className="section experience-grid"
        aria-labelledby="experience-heading"
      >
        <div>
          <p className="eyebrow">03 / Experience</p>
          <h2 id="experience-heading" className="section-title">
            A background
            <br />
            in <em>building.</em>
          </h2>
          <p className="experience-intro">
            From enterprise financial workflows and real-time proctoring systems
            to products people use every day.
          </p>
          <Link href="/cv" className="text-link">
            Read full CV{" "}
            <span className="arrow-cue" aria-hidden="true">
              ↗
            </span>
          </Link>
        </div>

        <div className="experience-list">
          {experience.map((job) => (
            <article
              key={job.company}
              className={`experience-item ${job.current ? "current" : ""}`}
            >
              <span className="experience-dates">{job.dates}</span>
              <div>
                <h3>{job.company}</h3>
                <p className="experience-role">{job.role}</p>
                <p>{job.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="colophon-section" aria-label="Engineering philosophy">
        <span className="eyebrow">04 / Perspective</span>
        <div>
          <p className="editorial-quote">
            “I like turning complicated problems into software that{" "}
            <em>makes sense</em>—thoughtful interfaces on the outside, reliable
            systems underneath.”
          </p>
          <div className="project-actions">
            <Link href="/cv" className="text-link">
              About Jason{" "}
              <span className="arrow-cue" aria-hidden="true">
                →
              </span>
            </Link>
            <Link href="/blog" className="text-link">
              Read the journal{" "}
              <span className="arrow-cue" aria-hidden="true">
                →
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
