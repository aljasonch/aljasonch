import Image from "next/image";
import Link from "next/link";
import {
  certifications,
  community,
  education,
  experience,
  profile,
  projects,
} from "@/lib/content";
import HeroCanvas from "@/components/hero-canvas";
import RoleSwitcher from "@/components/role-switcher";
import WorkDeck from "@/components/work-deck";
import SystemsExplorer from "@/components/systems-explorer";
import DevConsole from "@/components/dev-console";
import Magnetic from "@/components/magnetic";

export default function Home() {
  return (
    <>
      <section className="kinetic-hero" aria-labelledby="hero-heading">
        <HeroCanvas />

        <div className="kinetic-hero-inner container">
          <div className="hero-top-tag mono">
            <span>PORTFOLIO / VOL. 2026</span>
            <span>MOVE CURSOR TO DISTURB FIELD</span>
          </div>

          <h1 id="hero-heading" className="sculptural-h1">
            <span className="sh1-row sh1-row-1">
              <span>JASON</span>
              <span className="sh1-note mono">
                SOFTWARE ENGINEER
                <br />
                FULL-STACK &amp; ERP
              </span>
            </span>

            <span className="sh1-row sh1-row-2">
              <span className="inline-portrait" aria-hidden="true">
                <Image
                  src="/images/aljasonch.png"
                  alt=""
                  width={1024}
                  height={1365}
                  priority
                  sizes="150px"
                />
              </span>
              <span>CHRISTIAN</span>
            </span>

            <span className="sh1-row sh1-row-3">
              <span>BUILDS</span>
              <RoleSwitcher />
            </span>
          </h1>

          <div className="hero-spec-strip">
            <div className="hero-spec-cell">
              <span className="mono accent">01 / NOW</span>
              <strong>PT Solusi Kode Indonesia</strong>
              <p>Online psychological test proctoring for FIFGROUP.</p>
            </div>
            <div className="hero-spec-cell">
              <span className="mono accent">02 / PREV</span>
              <strong>Kompas Gramedia</strong>
              <p>Odoo ERP (Python / XML), PostgreSQL &amp; Azure CI/CD.</p>
            </div>
            <div className="hero-spec-cell">
              <span className="mono accent">03 / DEGREE</span>
              <strong>UMN Informatics · 3.74</strong>
              <p>IDX30 stock prediction with GRU neural networks.</p>
            </div>
            <div className="hero-spec-cta">
              <Magnetic strength={0.2}>
                <a href="#work-deck" className="button accent-fill">
                  Explore {String(projects.length).padStart(2, "0")} works{" "}
                  <span aria-hidden="true">↓</span>
                </a>
              </Magnetic>
              <Link href="/contact" className="button secondary">
                Contact <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section
        id="work-deck"
        className="deck-section"
        aria-labelledby="deck-heading"
      >
        <div className="container deck-header">
          <div>
            <p className="eyebrow">01 / FILMSTRIP ARCHIVE</p>
            <h2 id="deck-heading">SELECTED WORK</h2>
          </div>
          <Link href="/portfolio" className="text-link mono">
            FILTER ALL ({String(projects.length).padStart(2, "0")}) →
          </Link>
        </div>

        <WorkDeck />
      </section>

      <section
        className="cockpit-section container"
        aria-labelledby="cockpit-heading"
      >
        <div className="deck-header">
          <div>
            <p className="eyebrow">02 / ENGINEERING COCKPIT</p>
            <h2 id="cockpit-heading">SYSTEMS &amp; SHELL</h2>
          </div>
          <Link href="/cv" className="text-link mono">
            FULL DOSSIER &amp; CV ↗
          </Link>
        </div>

        <div className="cockpit-stack">
          <SystemsExplorer />
          <DevConsole />
        </div>
      </section>

      <section className="chalk-band" aria-labelledby="track-heading">
        <div className="container">
          <div className="deck-header">
            <div>
              <p className="eyebrow">03 / TRACK RECORD</p>
              <h2 id="track-heading">EXPERIENCE &amp; CREDENTIALS</h2>
            </div>
            <a href={profile.cv} download className="button">
              Download CV (PDF) ↓
            </a>
          </div>

          <div className="chalk-grid">
            {experience.map((job, idx) => (
              <article className="chalk-card" key={job.company}>
                <div className="chalk-card-top mono">
                  <span>{job.current ? "CURRENT ROLE" : `ROLE 0${idx + 1}`}</span>
                  <span>{job.dates}</span>
                </div>
                <h3>{job.company}</h3>
                <p className="chalk-role">{job.role}</p>
                <p className="chalk-desc">{job.description}</p>
              </article>
            ))}

            <article className="chalk-card">
              <div className="chalk-card-top mono">
                <span>LEADERSHIP</span>
                <span>{community[0].dates}</span>
              </div>
              <h3>{community[0].company}</h3>
              <p className="chalk-role">{community[0].role}</p>
              <p className="chalk-desc">{community[0].description}</p>
            </article>

            <article className="chalk-card">
              <div className="chalk-card-top mono">
                <span>EDUCATION &amp; AI CERT</span>
                <span>{education[0].dates}</span>
              </div>
              <h3>{education[0].school}</h3>
              <p className="chalk-role">{education[0].qualification}</p>
              <p className="chalk-desc">
                {education[0].detail} {certifications[0].title}:{" "}
                {certifications[0].detail}; {certifications[1].title}.
              </p>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
