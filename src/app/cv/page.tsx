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
    "Experience, education, and skills of Alfonsus Jason Christian, Software Engineer.",
};

export default function CV() {
  return (
    <div className="container">
      <header className="page-heading about-heading">
        <div>
          <p className="eyebrow">The person behind the work</p>
          <h1>
            Hi, I’m <span>Jason.</span>
          </h1>
          <p>{profile.bio}</p>
          <a className="button" href={profile.cv} download>
            Download my CV <span aria-hidden="true">↓</span>
          </a>
        </div>
        <div className="portrait">
          <Image
            src="/images/aljasonch.png"
            alt="Alfonsus Jason Christian"
            width={1024}
            height={1365}
            sizes="(max-width: 760px) 75vw, 30vw"
          />
          <span>{profile.location}</span>
        </div>
      </header>
      <section className="resume-section">
        <h2>Experience</h2>
        <div>
          {experience.map((job) => (
            <article className="resume-entry" key={job.company}>
              <span className="entry-date">{job.dates}</span>
              <h3>{job.role}</h3>
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
              <span className="entry-date">{job.dates}</span>
              <h3>{job.role}</h3>
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
              <span className="entry-date">{item.dates}</span>
              <h3>{item.school}</h3>
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
              <span className="entry-date">{item.dates}</span>
              <h3>{item.title}</h3>
              <p className="entry-org">{item.issuer}</p>
              <p className="accent">{item.detail}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="resume-section">
        <h2>My toolkit</h2>
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
