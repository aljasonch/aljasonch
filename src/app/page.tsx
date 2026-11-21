import Image from "next/image";
import Link from "next/link";
import { community, experience, profile, projects } from "@/lib/content";
import WorkStage from "@/components/work-stage";
import SystemsExplorer from "@/components/systems-explorer";
import ScrollStamp from "@/components/scroll-stamp";
import Magnetic from "@/components/magnetic";
import Reveal from "@/components/reveal";

const TICKER_ITEMS = [
  "Next.js",
  "TypeScript",
  "Python",
  "Odoo ERP",
  "PostgreSQL",
  "Firebase",
  "Real-Time Proctoring",
  "AI Agents",
  "Multilingual Systems",
  "Azure DevOps",
];

export default function Home() {
  const timeline = [
    {
      year: "2026",
      dates: experience[0].dates,
      company: experience[0].company,
      role: experience[0].role,
      description: experience[0].description,
      current: true,
    },
    {
      year: "2025",
      dates: experience[1].dates,
      company: experience[1].company,
      role: experience[1].role,
      description: experience[1].description,
      current: false,
    },
    {
      year: "2024",
      dates: community[0].dates,
      company: community[0].company,
      role: community[0].role,
      description: community[0].description,
      current: false,
    },
  ];

  return (
    <>
      <section className="broadsheet-hero container" aria-labelledby="hero-heading">
        <div className="broadsheet-headline-row">
          <div className="broadsheet-title-wrap">
            <p className="eyebrow">
              00 <span className="slash">/</span> Alfonsus Jason Christian{" "}
              <span className="slash">/</span> Software Engineer
            </p>
            <h1 id="hero-heading" className="broadsheet-h1">
              <span className="h1-line">From complex</span>
              <span className="h1-line">
                to <em>useful.</em>
              </span>
            </h1>
          </div>
          <div className="broadsheet-stamp-slot">
            <Magnetic strength={0.28}>
              <ScrollStamp />
            </Magnetic>
          </div>
        </div>

        <div className="broadsheet-lower">
          <div className="broadsheet-thesis">
            <p className="hero-description">
              I engineer full-stack web applications and real-world business
              systems—turning tangled operational workflows into calm, durable
              software.
            </p>
            <div className="hero-buttons">
              <Magnetic>
                <Link className="button" href="/portfolio">
                  Selected work{" "}
                  <span className="arrow-cue" aria-hidden="true">
                    →
                  </span>
                </Link>
              </Magnetic>
              <Magnetic>
                <Link className="button secondary" href="/contact">
                  Start a conversation{" "}
                  <span className="arrow-cue" aria-hidden="true">
                    ↗
                  </span>
                </Link>
              </Magnetic>
            </div>
          </div>

          <dl className="broadsheet-dossier">
            <div>
              <dt>Currently</dt>
              <dd>
                PT Solusi Kode Indonesia
                <span>Software Engineer · FIFGROUP Proctoring</span>
              </dd>
            </div>
            <div>
              <dt>Previously</dt>
              <dd>
                Kompas Gramedia
                <span>Odoo ERP · Python · PostgreSQL</span>
              </dd>
            </div>
            <div>
              <dt>Academic</dt>
              <dd>
                Universitas Multimedia Nusantara
                <span>B.Sc. Informatics · GPA 3.74 · GRU Thesis</span>
              </dd>
            </div>
          </dl>

          <figure className="portrait-plate broadsheet-portrait">
            <div className="portrait-frame">
              <Image
                src="/images/aljasonch.png"
                alt="Portrait of Alfonsus Jason Christian"
                width={1024}
                height={1365}
                priority
                sizes="(max-width: 760px) 84vw, 310px"
              />
            </div>
            <figcaption className="portrait-caption">
              <span>Fig. 01 — Jason</span>
              <span>{profile.location}</span>
            </figcaption>
          </figure>
        </div>
      </section>

      <div className="kinetic-ticker" aria-label="Core engineering domains">
        <div className="kinetic-ticker-track">
          {[0, 1].map((dup) => (
            <div
              className="kinetic-ticker-group"
              key={dup}
              aria-hidden={dup === 1 ? "true" : undefined}
            >
              {TICKER_ITEMS.map((item) => (
                <span key={`${dup}-${item}`} className="kinetic-ticker-item">
                  <span>{item}</span>
                  <span className="ticker-mark" aria-hidden="true">
                    ✦
                  </span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <section
        id="selected-work"
        className="section container"
        aria-labelledby="work-heading"
      >
        <Reveal>
          <div className="section-heading">
            <div>
              <p className="eyebrow">01 / Interactive Work Stage</p>
              <h2 id="work-heading" className="section-title">
                Work that <em>works.</em>
              </h2>
            </div>
            <Link href="/portfolio" className="text-link">
              Open filterable archive ({String(projects.length).padStart(2, "0")}){" "}
              <span className="arrow-cue" aria-hidden="true">
                →
              </span>
            </Link>
          </div>
        </Reveal>

        <WorkStage />
      </section>

      <section
        className="inverted-band"
        aria-labelledby="systems-heading"
      >
        <div className="container">
          <Reveal>
            <div className="section-heading">
              <div>
                <p className="eyebrow">02 / Systems &amp; Architecture</p>
                <h2 id="systems-heading" className="section-title">
                  How the <em>systems</em> hold together.
                </h2>
              </div>
              <Link href="/cv" className="text-link">
                Full technical toolkit{" "}
                <span className="arrow-cue" aria-hidden="true">
                  ↗
                </span>
              </Link>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <SystemsExplorer />
          </Reveal>
        </div>
      </section>

      <section
        className="section container"
        aria-labelledby="experience-heading"
      >
        <Reveal>
          <div className="section-heading">
            <div>
              <p className="eyebrow">03 / Experience &amp; Leadership</p>
              <h2 id="experience-heading" className="section-title">
                A background in <em>building.</em>
              </h2>
            </div>
            <Link href="/cv" className="text-link">
              Full CV &amp; certifications{" "}
              <span className="arrow-cue" aria-hidden="true">
                ↗
              </span>
            </Link>
          </div>
        </Reveal>

        <div className="monument-timeline">
          {timeline.map((entry, idx) => (
            <Reveal key={entry.company} delay={idx * 70}>
              <article
                className={`monument-row ${entry.current ? "is-current" : ""}`}
              >
                <div className="monument-year" aria-hidden="true">
                  {entry.year}
                </div>
                <div className="monument-meta">
                  <span className="mono">{entry.dates}</span>
                  <h3>{entry.company}</h3>
                  <p className="monument-role">{entry.role}</p>
                </div>
                <p className="monument-desc">{entry.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section
        className="colophon-section container"
        aria-label="Engineering philosophy"
      >
        <span className="eyebrow">04 / Perspective</span>
        <Reveal>
          <div>
            <p className="editorial-quote">
              “I like turning complicated problems into software that{" "}
              <em>makes sense</em>—thoughtful interfaces on the outside,
              reliable systems underneath.”
            </p>
            <div className="project-actions">
              <Magnetic>
                <Link href="/cv" className="button secondary">
                  Meet Jason{" "}
                  <span className="arrow-cue" aria-hidden="true">
                    →
                  </span>
                </Link>
              </Magnetic>
              <Link href="/blog" className="text-link">
                Read the journal{" "}
                <span className="arrow-cue" aria-hidden="true">
                  →
                </span>
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
