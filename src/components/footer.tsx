import Link from "next/link";
import Image from "next/image";
import { profile } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="container site-footer">
      <div className="footer-invitation">
        <h2>
          Let’s make
          <br />
          it <span>useful.</span>
        </h2>
        <div>
          <p className="muted">Have a project or a conversation in mind?</p>
          <a className="email-link" href={`mailto:${profile.email}`}>
            <span>{profile.email}</span>
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <Link className="wordmark" href="/" aria-label="Jason, home">
          <Image src="/aljasonch.png" alt="AJ logo" width={40} height={40} />
        </Link>
        <p>Built with intention. Based in Tangerang.</p>
        <div>
          <a href={profile.github} target="_blank" rel="noreferrer">
            GitHub ↗
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer">
            LinkedIn ↗
          </a>
          <Link href="/admin">Admin</Link>
        </div>
        <span>© {new Date().getFullYear()} Jason</span>
      </div>
    </footer>
  );
}
