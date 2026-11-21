"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { projects } from "@/lib/content";

export default function WorkStage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const stageRef = useRef<HTMLDivElement>(null);
  const active = projects[activeIndex] ?? projects[0];
  const num = String(activeIndex + 1).padStart(2, "0");

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse" || !stageRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = stageRef.current.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    stageRef.current.style.setProperty("--tilt-x", `${(-y * 5.5).toFixed(2)}deg`);
    stageRef.current.style.setProperty("--tilt-y", `${(x * 7).toFixed(2)}deg`);
    stageRef.current.style.setProperty("--glare-x", `${((x + 0.5) * 100).toFixed(1)}%`);
    stageRef.current.style.setProperty("--glare-y", `${((y + 0.5) * 100).toFixed(1)}%`);
  }

  function handlePointerLeave() {
    if (!stageRef.current) return;
    stageRef.current.style.setProperty("--tilt-x", "0deg");
    stageRef.current.style.setProperty("--tilt-y", "0deg");
  }

  return (
    <div className="work-stage-grid">
      <div className="work-ledger" role="list" aria-label="Featured projects">
        {projects.map((project, index) => {
          const isSelected = index === activeIndex;
          const idxLabel = String(index + 1).padStart(2, "0");
          return (
            <div
              key={project.slug}
              role="listitem"
              className={`work-ledger-row ${isSelected ? "is-active" : ""}`}
              onMouseEnter={() => setActiveIndex(index)}
            >
              <button
                type="button"
                className="work-ledger-trigger"
                aria-pressed={isSelected}
                onFocus={() => setActiveIndex(index)}
                onClick={() => setActiveIndex(index)}
              >
                <span className="work-ledger-num">{idxLabel}</span>
                <span className="work-ledger-main">
                  <span className="work-ledger-title">{project.title}</span>
                  <span className="work-ledger-sub">{project.description}</span>
                </span>
                <span className="work-ledger-meta">
                  <span>{project.category}</span>
                  <span>{project.year}</span>
                </span>
              </button>
              <Link
                href={`/portfolio/${project.slug}`}
                className="work-ledger-open"
                aria-label={`Open ${project.title} case study`}
              >
                ↗
              </Link>
            </div>
          );
        })}
      </div>

      <aside className="work-monitor" aria-live="polite">
        <div className="work-monitor-chrome">
          <span>
            PLATE {num} / {String(projects.length).padStart(2, "0")}
          </span>
          <span>
            {active.category.toUpperCase()} · {active.year}
          </span>
        </div>

        <Link
          href={`/portfolio/${active.slug}`}
          className="work-monitor-stage-link"
          aria-label={`Read case study for ${active.title}`}
        >
          <div
            ref={stageRef}
            className={`work-monitor-stage ${active.tone}`}
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
          >
            {active.image ? (
              <div className="work-monitor-frame" key={active.slug}>
                <div className="project-frame-bar" aria-hidden="true">
                  <span className="frame-dots">
                    <i />
                    <i />
                    <i />
                  </span>
                  <span>{active.title.toLowerCase()}</span>
                  <span>{active.year}</span>
                </div>
                <Image
                  src={active.image}
                  alt={`${active.title} website preview`}
                  width={active.slug === "mentoring" ? 1920 : 2732}
                  height={active.slug === "mentoring" ? 1080 : 1536}
                  priority={activeIndex === 0}
                  sizes="(max-width: 1020px) 92vw, 48vw"
                />
              </div>
            ) : (
              <div className="work-monitor-plate" key={active.slug}>
                <div className="plate-top">
                  <span>MONOGRAPH NO. {num}</span>
                  <span>{active.year}</span>
                </div>
                <strong>{active.title}</strong>
                <small>{active.tech.join(" · ")}</small>
              </div>
            )}
          </div>
        </Link>

        <div className="work-monitor-body" key={`body-${active.slug}`}>
          <p className="work-monitor-role">{active.role}</p>
          <p className="work-monitor-detail">{active.detail}</p>
          <ul className="tech-list" aria-label="Technologies">
            {active.tech.map((tech) => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>
          <div className="project-actions">
            <Link href={`/portfolio/${active.slug}`} className="button">
              Inspect case study{" "}
              <span className="arrow-cue" aria-hidden="true">
                →
              </span>
            </Link>
            {active.url && (
              <a
                href={active.url}
                target="_blank"
                rel="noreferrer"
                className="button secondary"
              >
                Live site{" "}
                <span className="arrow-cue" aria-hidden="true">
                  ↗
                </span>
              </a>
            )}
          </div>
        </div>
      </aside>
    </div>
  );
}
