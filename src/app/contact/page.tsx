import type { Metadata } from "next";
import { profile } from "@/lib/content";
import CopyEmail from "@/components/copy-email";
import LiveClock from "@/components/live-clock";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Alfonsus Jason Christian by email, GitHub, LinkedIn, or Instagram.",
  alternates: { canonical: "/contact" },
};

export default function Contact() {
  return (
    <div className="container">
      <header className="page-heading">
        <p className="eyebrow">Good things start with a conversation</p>
        <h1>
          What do you
          <br />
          have in <em>mind?</em>
        </h1>
        <p className="page-lede">
          A product to build, a business workflow to simplify, or just something
          worth exchanging notes on—feel free to write directly.
        </p>
      </header>

      <CopyEmail />

      <div className="contact-details">
        <div>
          <p className="eyebrow">Elsewhere</p>
          <div className="contact-links">
            <a href={profile.github} target="_blank" rel="noreferrer">
              <span>GitHub</span>
              <span aria-hidden="true">↗</span>
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer">
              <span>LinkedIn</span>
              <span aria-hidden="true">↗</span>
            </a>
            <a href={profile.instagram} target="_blank" rel="noreferrer">
              <span>Instagram</span>
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        <div>
          <p className="eyebrow">Location &amp; Local Time</p>
          <p style={{ fontWeight: 600, marginBottom: "0.35rem" }}>
            {profile.location}
          </p>
          <p className="muted mono" style={{ fontSize: "0.82rem" }}>
            Western Indonesia Time · <LiveClock />
          </p>
        </div>

        <div>
          <p className="eyebrow">Good topics to write about</p>
          <ul className="contact-topics">
            <li>Full-stack web products (Next.js, React, TypeScript)</li>
            <li>Business systems, Odoo ERP, and PostgreSQL workflows</li>
            <li>Practical AI integrations &amp; community collaborations</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
