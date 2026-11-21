"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { profile, projects } from "@/lib/content";
import LiveClock from "./live-clock";

const dockLinks = [
  { href: "/", code: "00", label: "Home" },
  { href: "/portfolio", code: "01", label: "Work" },
  { href: "/cv", code: "02", label: "About" },
  { href: "/blog", code: "03", label: "Journal" },
  { href: "/contact", code: "04", label: "Contact" },
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
  const [query, setQuery] = useState("");
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [copied, setCopied] = useState(false);
  const [scrollPct, setScrollPct] = useState(0);
  const palette = useRef<HTMLDialogElement>(null);
  const search = useRef<HTMLInputElement>(null);

  function applyTheme(next: "dark" | "light", persist = true) {
    setTheme(next);
    document.documentElement.dataset.theme = next;
    if (persist) {
      try {
        localStorage.setItem("theme", next);
      } catch {}
    }
  }

  function toggleTheme() {
    applyTheme(theme === "dark" ? "light" : "dark", true);
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
    window.dispatchEvent(new CustomEvent("open-portfolio-chat"));
  }

  useEffect(() => {
    const current = document.documentElement.dataset.theme;
    if (current === "light" || current === "dark") {
      setTheme(current);
    } else {
      applyTheme("dark", false);
    }
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        if (palette.current?.open) closePalette();
        else openPalette();
      }
    };
    const onScroll = () => {
      const max =
        document.documentElement.scrollHeight - window.innerHeight || 1;
      setScrollPct(Math.min(100, Math.max(0, Math.round((window.scrollY / max) * 100))));
    };
    onScroll();
    window.addEventListener("keydown", onKey);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const themeActionLabel =
    theme === "dark" ? "Switch to light mode" : "Switch to dark mode";

  const pages: PaletteItem[] = dockLinks.map((item) => ({
    href: item.href,
    label: item.label,
    meta: item.code,
  }));

  const caseStudies: PaletteItem[] = projects.map((project, index) => ({
    href: `/portfolio/${project.slug}`,
    label: project.title,
    meta: `${String(index + 1).padStart(2, "0")} · ${project.category}`,
  }));

  const actions: PaletteItem[] = [
    {
      label: "Ask AI assistant about Jason",
      meta: "AI",
      action: openAssistant,
    },
    {
      label: copied ? "Email copied to clipboard" : `Copy ${profile.email}`,
      meta: "Copy",
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
      meta: theme === "dark" ? "Light" : "Dark",
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
      <header className="studio-topbar">
        <div className="studio-topbar-inner container">
          <Link href="/" className="brand-link" aria-label="Jason Christian, home">
            <span className="brand-mark">
              <Image
                src="/aljasonch.png"
                alt="AJ monogram"
                width={32}
                height={32}
                priority
              />
            </span>
            <span className="brand-meta">
              <strong>JASON CHRISTIAN</strong>
              <span className="mono">
                TANGERANG · <LiveClock />
              </span>
            </span>
          </Link>

          <div className="topbar-utils">
            <span className="topbar-scroll mono" aria-hidden="true">
              {String(scrollPct).padStart(3, "0")}%
            </span>
            <button
              type="button"
              className="util-btn mono"
              aria-label={themeActionLabel}
              title={themeActionLabel}
              onClick={toggleTheme}
            >
              <span aria-hidden="true">{theme === "dark" ? "☀" : "☾"}</span>
              <span className="util-label">
                {theme === "dark" ? "LIGHT" : "DARK"}
              </span>
            </button>
            <button
              type="button"
              className="util-btn mono"
              aria-label="Open command console"
              onClick={openPalette}
            >
              ⌘K
            </button>
            <a className="util-cv mono" href={profile.cv} download>
              CV ↓
            </a>
          </div>
        </div>
        <div className="topbar-rail" aria-hidden="true">
          <div
            className="topbar-rail-fill"
            style={{ transform: `scaleX(${scrollPct / 100})` }}
          />
        </div>
      </header>

      <nav className="studio-dock" aria-label="Primary studio dock">
        {dockLinks.map((link) => {
          const active =
            link.href === "/" ? path === "/" : path.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`dock-item ${active ? "is-active" : ""}`}
              aria-current={active ? "page" : undefined}
            >
              <span className="dock-code mono">{link.code}</span>
              <span>{link.label}</span>
            </Link>
          );
        })}
        <button
          type="button"
          className="dock-item dock-ai"
          onClick={openAssistant}
          aria-haspopup="dialog"
          aria-controls="portfolio-chat"
        >
          <span className="dock-code mono">✦</span>
          <span>Ask AI</span>
        </button>
      </nav>

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
            <h2 id="command-title">Command Console</h2>
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
              placeholder="Jump to a project, page, or command…"
            />
          </label>
          <div className="command-results">
            {matchingPages.length > 0 && (
              <>
                <p className="command-group-label">Routes</p>
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
                <p className="command-group-label">Case Studies</p>
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
            TAB TO MOVE · ENTER TO SELECT · ESC TO CLOSE
          </p>
        </div>
      </dialog>
    </>
  );
}
