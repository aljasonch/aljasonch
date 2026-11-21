import Link from "next/link";
import { profile } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="studio-footer">
      <div className="container">
        <p className="eyebrow">NEXT STEP</p>
        <a
          className="footer-billboard"
          href={`mailto:${profile.email}`}
          aria-label={`Email ${profile.email}`}
        >
          <span>LET’S BUILD</span>
          <span>
            SOMETHING <em>REAL</em> <i aria-hidden="true">↗</i>
          </span>
        </a>

        <div className="footer-bar mono">
          <span>{profile.email}</span>
          <span>TANGERANG, ID · UTC+7</span>
          <nav className="footer-links" aria-label="Social links">
            <a href={profile.github} target="_blank" rel="noreferrer">
              GITHUB ↗
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer">
              LINKEDIN ↗
            </a>
            <a href={profile.instagram} target="_blank" rel="noreferrer">
              INSTAGRAM ↗
            </a>
            <Link href="/admin">ADMIN</Link>
          </nav>
          <span>© {new Date().getFullYear()} JASON CHRISTIAN</span>
        </div>
      </div>
    </footer>
  );
}
