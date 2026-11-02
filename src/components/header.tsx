"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { profile } from "@/lib/content";

const links = [
  { href: "/portfolio", label: "Work" },
  { href: "/cv", label: "About" },
  { href: "/blog", label: "Journal" },
  { href: "/contact", label: "Contact" },
];
const commands = [
  { href: "/", label: "Home" },
  ...links,
  { href: profile.cv, label: "Download CV" },
  { href: `mailto:${profile.email}`, label: "Email Jason" },
  { href: profile.github, label: "GitHub" },
];

export default function Header() {
  const path = usePathname();
  const [menu, setMenu] = useState(false);
  const [query, setQuery] = useState("");
  const palette = useRef<HTMLDialogElement>(null);
  const search = useRef<HTMLInputElement>(null);
  function openPalette() {
    setQuery("");
    palette.current?.showModal();
    search.current?.focus();
  }
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        if (palette.current?.open) palette.current.close();
        else openPalette();
      }
      if (event.key === "Escape") setMenu(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  return (
    <>
      <header className="site-header container">
        <Link
          href="/"
          className="wordmark"
          aria-label="Jason, home"
          onClick={() => setMenu(false)}
        >
          <Image
            src="/aljasonch.png"
            alt="AJ logo"
            width={46}
            height={46}
            priority
          />
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={path.startsWith(link.href) ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <button
            className="command-trigger"
            aria-label="Search pages and actions"
            onClick={openPalette}
          >
            <span aria-hidden="true">⌘</span> K
          </button>
          <a className="cv-link" href={profile.cv} download>
            Download CV <span aria-hidden="true">↗</span>
          </a>
          <button
            className="menu-toggle"
            aria-expanded={menu}
            aria-controls="mobile-navigation"
            onClick={() => setMenu(!menu)}
          >
            {menu ? "Close" : "Menu"}{" "}
            <span aria-hidden="true">{menu ? "−" : "+"}</span>
          </button>
        </div>
      </header>
      {menu && (
        <nav
          id="mobile-navigation"
          className="mobile-nav container"
          aria-label="Mobile navigation"
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenu(false)}
              aria-current={path.startsWith(link.href) ? "page" : undefined}
            >
              {link.label}
              <span aria-hidden="true">↗</span>
            </Link>
          ))}
          <a href={profile.cv} download onClick={() => setMenu(false)}>
            Download CV ↓
          </a>
        </nav>
      )}
      <dialog
        className="command-dialog"
        ref={palette}
        aria-labelledby="command-title"
        onClick={(e) => {
          if (e.target === e.currentTarget) palette.current?.close();
        }}
      >
        <div className="command-inner">
          <div className="dialog-heading">
            <h2 id="command-title">Where to?</h2>
            <button
              aria-label="Close search"
              onClick={() => palette.current?.close()}
            >
              ×
            </button>
          </div>
          <label>
            <span className="sr-only">Search pages and actions</span>
            <input
              ref={search}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search pages and actions…"
            />
          </label>
          <div className="command-results">
            {commands
              .filter((command) =>
                command.label.toLowerCase().includes(query.toLowerCase()),
              )
              .map((command) => (
                <a
                  key={command.label}
                  href={command.href}
                  onClick={() => palette.current?.close()}
                >
                  {command.label}
                  <span aria-hidden="true">↗</span>
                </a>
              ))}
            {!commands.some((command) =>
              command.label.toLowerCase().includes(query.toLowerCase()),
            ) && (
              <p className="muted">No matching pages. Try “work” or “CV”.</p>
            )}
          </div>
          <p className="command-hint">
            Tab to move · Enter to open · Esc to close
          </p>
        </div>
      </dialog>
    </>
  );
}
