import type { Metadata } from "next";
import { profile } from "@/lib/content";
export const metadata: Metadata = { title: "Get in touch" };
export default function Contact() {
  return (
    <div className="container contact-page">
      <header className="page-heading">
        <p className="eyebrow">Good things start with a conversation</p>
        <h1>
          What do you
          <br />
          have in <span>mind?</span>
        </h1>
        <p>
          A product to build, a workflow to improve, or just something
          interesting to talk about. I’d like to hear it.
        </p>
      </header>
      <a className="contact-email" href={`mailto:${profile.email}`}>
        {profile.email}
        <span aria-hidden="true">↗</span>
      </a>
      <div className="contact-details">
        <div>
          <p className="eyebrow">Find me elsewhere</p>
          <a href={profile.github} target="_blank" rel="noreferrer">
            GitHub ↗
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer">
            LinkedIn ↗
          </a>
          <a href={profile.instagram} target="_blank" rel="noreferrer">
            Instagram ↗
          </a>
        </div>
        <div>
          <p className="eyebrow">Based in</p>
          <p>Tangerang, Indonesia</p>
          <p className="muted">Western Indonesia Time · UTC+7</p>
        </div>
      </div>
    </div>
  );
}
