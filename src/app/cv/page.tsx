import type { Metadata } from "next";
import Image from "next/image";
import {
  certifications,
  community,
  education,
  experience,
  profile,
  skills,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "About & CV",
  description:
    "Experience, education, certifications, and technical toolkit of Alfonsus Jason Christian, Software Engineer.",
  alternates: { canonical: "/cv" },
};

export default function CV() {
  return (
    <div className="container">
      <header className="page-heading about-heading">
        <div>
          <p className="eyebrow">The person behind the work</p>
          <h1>
            Hi, I’m <em>Jason.</em>
          </h1>
          <p className="page-lede">{profile.bio}</p>

          <dl className="about-facts">
            <div>
              <dt>Based in</dt>
              <dd>{profile.location}</dd>
            </div>
            <div>
              <dt>Current Role</dt>
              <dd>PT Solusi Kode Indonesia</dd>
            </div>
            <div>
              <dt>Degree</dt>
              <dd>B.Sc. Informatics · GPA 3.74</dd>
            </div>
            <div>
              <dt>Languages</dt>
              <dd>Indonesian · English (TOEIC 820)</dd>
            </div>
          </dl>

          <a className="button" href={profile.cv} download>
            Download CV (PDF){" "}
            <span className="arrow-down-cue" aria-hidden="true">
              ↓
            </span>
          </a>
        </div>

        <figure className="portrait-plate">
          <div className="portrait-frame">
            <Image
              src="/images/aljasonch.png"
              alt="Alfonsus Jason Christian"
              width={1024}
              height={1365}
              priority
              sizes="(max-width: 760px) 84vw, 360px"
            />
          </div>
          <figcaption className="portrait-caption">
            <span>Alfonsus Jason Christian</span>
            <span>{profile.location}</span>
          </figcaption>
        </figure>
      </header>

      <section className="resume-section">
        <h2>Experience</h2>
        <div>
          {experience.map((job) => (
            <article className="resume-entry" key={job.company}>
              <div className="entry-header">
                <h3>{job.role}</h3>
                <span className="entry-date">{job.dates}</span>
              </div>
              <p className="entry-org">{job.company}</p>
              <p className="muted">{job.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="resume-section">
        <h2>Community</h2>
        <div>
          {community.map((job) => (
            <article className="resume-entry" key={job.company}>
              <div className="entry-header">
                <h3>{job.role}</h3>
                <span className="entry-date">{job.dates}</span>
              </div>
              <p className="entry-org">{job.company}</p>
              <p className="muted">{job.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="resume-section">
        <h2>Education</h2>
        <div>
          {education.map((item) => (
            <article className="resume-entry" key={item.school}>
              <div className="entry-header">
                <h3>{item.school}</h3>
                <span className="entry-date">{item.dates}</span>
              </div>
              <p className="entry-org">{item.qualification}</p>
              <p className="muted">{item.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="resume-section">
        <h2>Certifications</h2>
        <div>
          {certifications.map((item) => (
            <article className="resume-entry" key={item.title}>
              <div className="entry-header">
                <h3>{item.title}</h3>
                <span className="entry-date">{item.dates}</span>
              </div>
              <p className="entry-org">{item.issuer}</p>
              <p className="accent mono" style={{ fontSize: "0.82rem", marginBottom: 0 }}>
                {item.detail}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="resume-section">
        <h2>Toolkit</h2>
        <div className="skills-grid">
          {[
            ["Languages", skills.languages],
            ["Frameworks", skills.frameworks],
            ["Tools & platforms", skills.tools],
            ["Communication", skills.spoken],
            ["How I work", skills.interpersonal],
          ].map(([label, values]) => (
            <div key={label as string}>
              <h3>{label}</h3>
              <ul className="tech-list">
                {(values as string[]).map((value) => (
                  <li key={value}>{value}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
