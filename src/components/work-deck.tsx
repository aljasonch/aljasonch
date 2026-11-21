"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { projects } from "@/lib/content";

export default function WorkDeck() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const drag = useRef({ down: false, startX: 0, scrollLeft: 0, moved: false });

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const onScroll = () => {
      const cards = Array.from(el.querySelectorAll<HTMLElement>(".deck-slide"));
      if (!cards.length) return;
      const center = el.scrollLeft + el.clientWidth * 0.35;
      let best = 0;
      let bestDist = Infinity;
      cards.forEach((card, idx) => {
        const dist = Math.abs(card.offsetLeft - center);
        if (dist < bestDist) {
          bestDist = dist;
          best = idx;
        }
      });
      setActiveIndex(best);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  function scrollToSlide(index: number) {
    const el = trackRef.current;
    if (!el) return;
    const clamped = Math.max(0, Math.min(projects.length - 1, index));
    const card = el.querySelectorAll<HTMLElement>(".deck-slide")[clamped];
    if (card) {
      el.scrollTo({
        left: card.offsetLeft - 24,
        behavior: "smooth",
      });
      setActiveIndex(clamped);
    }
  }

  function onPointerDown(event: React.PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse" || !trackRef.current) return;
    if ((event.target as HTMLElement).closest("a, button")) return;
    drag.current = {
      down: true,
      startX: event.clientX,
      scrollLeft: trackRef.current.scrollLeft,
      moved: false,
    };
  }

  function onPointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (!drag.current.down || !trackRef.current) return;
    const dx = event.clientX - drag.current.startX;
    if (Math.abs(dx) > 6) drag.current.moved = true;
    trackRef.current.scrollLeft = drag.current.scrollLeft - dx * 1.15;
  }

  function onPointerUp() {
    drag.current.down = false;
  }

  return (
    <div className="work-deck">
      <div className="deck-toolbar container">
        <div className="deck-counter mono">
          <span className="accent">
            {String(activeIndex + 1).padStart(2, "0")}
          </span>
          <span className="slash">/</span>
          <span>{String(projects.length).padStart(2, "0")}</span>
          <span className="deck-drag-hint">· DRAG OR CLICK TO SCRUB</span>
        </div>

        <div className="deck-controls">
          <button
            type="button"
            className="deck-arrow"
            onClick={() => scrollToSlide(activeIndex - 1)}
            disabled={activeIndex === 0}
            aria-label="Previous project"
          >
            ←
          </button>
          <button
            type="button"
            className="deck-arrow"
            onClick={() => scrollToSlide(activeIndex + 1)}
            disabled={activeIndex === projects.length - 1}
            aria-label="Next project"
          >
            →
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        className="deck-track"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        role="region"
        aria-label="Interactive project filmstrip"
      >
        {projects.map((project, index) => {
          const num = String(index + 1).padStart(2, "0");
          const isCurrent = index === activeIndex;
          return (
            <article
              key={project.slug}
              className={`deck-slide ${isCurrent ? "is-current" : ""}`}
            >
              <div className="deck-slide-head mono">
                <span>
                  NO.{num} <span className="slash">/</span> {project.category}
                </span>
                <span>{project.year}</span>
              </div>

              <Link
                href={`/portfolio/${project.slug}`}
                className="deck-media-link"
                aria-label={`Inspect ${project.title} case study`}
              >
                {project.image ? (
                  <div className="deck-media-frame">
                    <Image
                      src={project.image}
                      alt={`${project.title} website preview`}
                      width={project.slug === "mentoring" ? 1920 : 2732}
                      height={project.slug === "mentoring" ? 1080 : 1536}
                      priority={index < 2}
                      sizes="(max-width: 760px) 88vw, 720px"
                    />
                  </div>
                ) : (
                  <div className="deck-poster-plate">
                    <span className="mono">{project.category}</span>
                    <strong>{project.title}</strong>
                    <span className="mono accent">{project.tech.join(" · ")}</span>
                  </div>
                )}
              </Link>

              <div className="deck-slide-body">
                <div className="deck-title-row">
                  <h3>
                    <Link href={`/portfolio/${project.slug}`}>{project.title}</Link>
                  </h3>
                  <span className="mono deck-role">{project.role}</span>
                </div>
                <p className="deck-desc">{project.description}</p>
                <p className="deck-detail">{project.detail}</p>
                <div className="deck-slide-foot">
                  <ul className="tech-list" aria-label="Technologies">
                    {project.tech.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                  <div className="deck-links">
                    <Link href={`/portfolio/${project.slug}`} className="button">
                      Case study <span>→</span>
                    </Link>
                    {project.url && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noreferrer"
                        className="button secondary"
                      >
                        Live <span>↗</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <div className="deck-scrub container" role="tablist" aria-label="Jump to project">
        {projects.map((project, index) => (
          <button
            key={project.slug}
            type="button"
            role="tab"
            aria-selected={index === activeIndex}
            className={`deck-scrub-btn ${index === activeIndex ? "is-active" : ""}`}
            onClick={() => scrollToSlide(index)}
          >
            <span className="mono">{String(index + 1).padStart(2, "0")}</span>
            <span>{project.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
