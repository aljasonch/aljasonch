import Image from "next/image";
import Link from "next/link";
import { experience, profile, projects } from "@/lib/content";
import ProjectCard from "@/components/project-card";

export default function Home() {
  return (
    <div className="container">
      <section className="hero">
        <figure className="hero-portrait">
          <Image
            src="/images/aljasonch.png"
            alt="Alfonsus Jason Christian"
            width={1024}
            height={1365}
            priority
            sizes="(max-width: 760px) 75vw, 30vw"
          />
          <figcaption>
            <span>Jason Christian</span>
            <span>Software engineer</span>
          </figcaption>
        </figure>
        <div className="hero-copy">
          <p className="eyebrow hero-eyebrow">
            Alfonsus Jason Christian <span>/</span> Software engineer
          </p>
          <h1>
            From complex
            <br />
            to <span>useful.</span>
          </h1>
          <p className="hero-description">
            Full-stack applications. Business systems.
            <br className="desktop-break" /> Thoughtful digital experiences.
          </p>
          <div className="hero-buttons">
            <Link className="button" href="/portfolio">
              Selected work <span aria-hidden="true">↗</span>
            </Link>
            <Link className="button secondary" href="/contact">
              Get in touch <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <div className="current-role">
            <span className="status-dot" />
            <div>
              <p>Currently at PT Solusi Kode Indonesia</p>
              <span>{profile.location}</span>
            </div>
          </div>
        </div>
      </section>
      <div className="tech-strip">
        <p>Built with a practical mindset.</p>
        <ul aria-label="Core technologies">
          <li>Next.js</li>
          <li>React</li>
          <li>Python</li>
          <li>PostgreSQL</li>
          <li>Odoo</li>
        </ul>
      </div>
      <section className="section selected-work" aria-labelledby="work-heading">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Selected work</p>
            <h2 id="work-heading">
              Work that <span>works.</span>
            </h2>
          </div>
          <Link href="/portfolio" className="text-link">
            View all projects <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <div className="project-list">
          {projects.slice(0, 3).map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>
      </section>
      <section
        className="section experience-section"
        aria-labelledby="experience-heading"
      >
        <div>
          <p className="eyebrow">Experience</p>
          <h2 id="experience-heading">
            A background
            <br />
            in <span>building.</span>
          </h2>
          <p className="muted experience-intro">
            From enterprise workflows to products people use every day.
          </p>
          <Link href="/cv" className="text-link">
            The full story <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <div className="timeline">
          {experience.map((job) => (
            <article key={job.company} className={job.current ? "current" : ""}>
              <div className="timeline-meta">
                <h3>{job.company}</h3>
                <span>{job.dates}</span>
              </div>
              <p className="role-title">{job.role}</p>
              <p className="muted">{job.description}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="about-note">
        <span className="eyebrow">A little about me</span>
        <p>
          I like turning complicated problems into software that{" "}
          <em>makes sense.</em> Thoughtful interfaces on the outside. Reliable
          systems underneath.
        </p>
        <Link href="/cv" className="text-link">
          Meet Jason <span aria-hidden="true">↗</span>
        </Link>
      </section>
    </div>
  );
}
