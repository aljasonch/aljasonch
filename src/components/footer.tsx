import Link from "next/link";
import Image from "next/image";
import { profile } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="container site-footer">
      <div className="footer-invitation">
        <div>
          <p className="eyebrow">Start a conversation</p>
          <h2 className="section-title">
            Let’s make
            <br />
            it <em>useful.</em>
          </h2>
        </div>
        <div className="footer-contact-col">
          <p>
            Have a product to ship, a business workflow to untangle, or an
            engineering role to discuss?
          </p>
          <a className="email-link" href={`mailto:${profile.email}`}>
            <span>{profile.email}</span>
            <span className="arrow-cue" aria-hidden="true">
              ↗
            </span>
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <Link className="brand-link" href="/" aria-label="Jason Christian, home">
          <span className="brand-mark">
            <Image src="/aljasonch.png" alt="AJ monogram" width={32} height={32} />
          </span>
          <span className="brand-name">Alfonsus Jason Christian</span>
        </Link>
        <span>Tangerang, Indonesia · UTC+7</span>
        <nav className="footer-links" aria-label="Footer links">
          <a href={profile.github} target="_blank" rel="noreferrer">
            GitHub ↗
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer">
            LinkedIn ↗
          </a>
          <a href={profile.instagram} target="_blank" rel="noreferrer">
            Instagram ↗
          </a>
          <Link href="/admin">Admin</Link>
        </nav>
        <span>© {new Date().getFullYear()} Jason Christian</span>
      </div>
    </footer>
  );
}
