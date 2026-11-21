"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { profile, projects } from "@/lib/content";

const navLinks = [
  { href: "/portfolio", label: "Work" },
  { href: "/cv", label: "About" },
  { href: "/blog", label: "Journal" },
  { href: "/contact", label: "Contact" },
];

type PaletteItem = {
  label: string;
  meta: string;
  href?: string;
  external?: boolean;
  download?: boolean;
  action?: () => void;
};

export default function Header() {
  const path = usePathname();
  const router = useRouter();
  const [menu, setMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [copied, setCopied] = useState(false);
  const palette = useRef<HTMLDialogElement>(null);
  const search = useRef<HTMLInputElement>(null);

  function applyTheme(next: "light" | "dark", persist = true) {
    setTheme(next);
    document.documentElement.dataset.theme = next;
    if (persist) {
      try {
        localStorage.setItem("theme", next);
      } catch {}
    }
  }

  function toggleTheme() {
    applyTheme(theme === "light" ? "dark" : "light", true);
  }

  function openPalette() {
    setQuery("");
    setCopied(false);
    palette.current?.showModal();
    requestAnimationFrame(() => search.current?.focus());
  }

  function closePalette() {
    palette.current?.close();
  }

  function openAssistant() {
    closePalette();
    setMenu(false);
    window.dispatchEvent(new CustomEvent("open-portfolio-chat"));
  }

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const current = document.documentElement.dataset.theme;
    if (current === "light" || current === "dark") {
      setTheme(current);
    } else {
      applyTheme(media.matches ? "dark" : "light", false);
    }
    const onSchemeChange = (event: MediaQueryListEvent) => {
      try {
        const stored = localStorage.getItem("theme");
        if (stored !== "light" && stored !== "dark") {
          applyTheme(event.matches ? "dark" : "light", false);
        }
      } catch {
        applyTheme(event.matches ? "dark" : "light", false);
      }
    };
    media.addEventListener("change", onSchemeChange);
    return () => media.removeEventListener("change", onSchemeChange);
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        if (palette.current?.open) closePalette();
        else openPalette();
      }
      if (event.key === "Escape") setMenu(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const themeActionLabel =
    theme === "light" ? "Switch to dark theme" : "Switch to light theme";

  const pages: PaletteItem[] = [
    { href: "/", label: "Home", meta: "Overview" },
    ...navLinks.map((item) => ({
      href: item.href,
      label: item.label,
      meta: "Page",
    })),
  ];

  const caseStudies: PaletteItem[] = projects.map((project, index) => ({
    href: `/portfolio/${project.slug}`,
    label: project.title,
    meta: `${String(index + 1).padStart(2, "0")} · ${project.category}`,
  }));

  const actions: PaletteItem[] = [
    {
      label: "Ask AI assistant about Jason",
      meta: "Assistant",
      action: openAssistant,
    },
    {
      label: copied ? "Email copied to clipboard" : `Copy ${profile.email}`,
      meta: "Contact",
      action: async () => {
        try {
          await navigator.clipboard.writeText(profile.email);
          setCopied(true);
          setTimeout(() => closePalette(), 500);
        } catch {
          window.location.href = `mailto:${profile.email}`;
        }
      },
    },
    {
      href: profile.cv,
      label: "Download CV (PDF)",
      meta: "PDF",
      download: true,
    },
    {
      label: themeActionLabel,
      meta: theme === "light" ? "Dark" : "Light",
      action: () => {
        toggleTheme();
        closePalette();
      },
    },
    {
      href: profile.github,
      label: "GitHub profile",
      meta: "External",
      external: true,
    },
    {
      href: profile.linkedin,
      label: "LinkedIn profile",
      meta: "External",
      external: true,
    },
  ];

  const term = query.trim().toLowerCase();
  const filterItems = (items: PaletteItem[]) =>
    !term
      ? items
      : items.filter((item) =>
          `${item.label} ${item.meta}`.toLowerCase().includes(term),
        );

  const matchingPages = filterItems(pages);
  const matchingProjects = filterItems(caseStudies);
  const matchingActions = filterItems(actions);
  const totalMatches =
    matchingPages.length + matchingProjects.length + matchingActions.length;

  function handleNavigate(item: PaletteItem) {
    if (item.action) {
      item.action();
      return;
    }
    if (!item.href) return;
    closePalette();
    if (item.external) {
      window.open(item.href, "_blank", "noopener,noreferrer");
      return;
    }
    if (item.download) {
      window.location.href = item.href;
      return;
    }
    router.push(item.href);
  }

  return (
    <>
      <div className="site-header-wrap">
        <header className="site-header container">
          <Link
            href="/"
            className="brand-link"
            aria-label="Jason Christian, home"
            onClick={() => setMenu(false)}
          >
            <span className="brand-mark">
              <Image
                src="/aljasonch.png"
                alt="AJ monogram"
                width={36}
                height={36}
                priority
              />
            </span>
            <span className="brand-name">Jason Christian</span>
          </Link>

          <nav className="desktop-nav" aria-label="Main navigation">
            {navLinks.map((link) => (
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
              type="button"
              className="icon-btn"
              aria-label={themeActionLabel}
              title={themeActionLabel}
              onClick={toggleTheme}
            >
              <span aria-hidden="true">{theme === "light" ? "☾" : "☀"}</span>
            </button>
            <button
              type="button"
              className="command-trigger"
              aria-label="Search pages, projects, and actions"
              onClick={openPalette}
            >
              <span aria-hidden="true">⌘K</span>
            </button>
            <a className="cv-link" href={profile.cv} download>
              CV <span className="arrow-down-cue" aria-hidden="true">↓</span>
            </a>
            <button
              type="button"
              className="menu-toggle"
              aria-expanded={menu}
              aria-controls="mobile-navigation"
              onClick={() => setMenu(!menu)}
            >
              {menu ? "Close" : "Menu"}
            </button>
          </div>
        </header>

        {menu && (
          <nav
            id="mobile-navigation"
            className="mobile-nav container"
            aria-label="Mobile navigation"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenu(false)}
                aria-current={path.startsWith(link.href) ? "page" : undefined}
              >
                <span>{link.label}</span>
                <span aria-hidden="true">↗</span>
              </Link>
            ))}
            <button type="button" onClick={openAssistant}>
              <span>Ask AI assistant</span>
              <span aria-hidden="true">↗</span>
            </button>
            <a href={profile.cv} download onClick={() => setMenu(false)}>
              <span>Download CV (PDF)</span>
              <span aria-hidden="true">↓</span>
            </a>
          </nav>
        )}
      </div>

      <dialog
        className="command-dialog"
        ref={palette}
        aria-labelledby="command-title"
        onClick={(e) => {
          if (e.target === e.currentTarget) closePalette();
        }}
      >
        <div className="command-inner">
          <div className="dialog-heading">
            <h2 id="command-title">Navigate or ask.</h2>
            <button
              type="button"
              className="dialog-close"
              aria-label="Close palette"
              onClick={closePalette}
            >
              ×
            </button>
          </div>
          <label>
            <span className="sr-only">Search pages, projects, and actions</span>
            <input
              ref={search}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Jump to a project, page, or action…"
            />
          </label>
          <div className="command-results">
            {matchingPages.length > 0 && (
              <>
                <p className="command-group-label">Pages</p>
                {matchingPages.map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    className="command-item"
                    onClick={() => handleNavigate(item)}
                  >
                    <span>{item.label}</span>
                    <small>{item.meta}</small>
                  </button>
                ))}
              </>
            )}

            {matchingProjects.length > 0 && (
              <>
                <p className="command-group-label">Case studies</p>
                {matchingProjects.map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    className="command-item"
                    onClick={() => handleNavigate(item)}
                  >
                    <span>{item.label}</span>
                    <small>{item.meta}</small>
                  </button>
                ))}
              </>
            )}

            {matchingActions.length > 0 && (
              <>
                <p className="command-group-label">Actions</p>
                {matchingActions.map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    className="command-item"
                    onClick={() => handleNavigate(item)}
                  >
                    <span>{item.label}</span>
                    <small>{item.meta}</small>
                  </button>
                ))}
              </>
            )}

            {totalMatches === 0 && (
              <p className="muted" style={{ marginTop: "14px" }}>
                No matching destinations. Try “Chainew”, “CV”, or “assistant”.
              </p>
            )}
          </div>
          <p className="command-hint">
            Tab to move · Enter to select · Esc to close
          </p>
        </div>
      </dialog>
    </>
  );
}
