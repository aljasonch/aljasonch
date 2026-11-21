import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/content";

export function ProjectVisual({
  project,
  index = 0,
  priority = false,
}: {
  project: Project;
  index?: number;
  priority?: boolean;
}) {
  const num = String(index + 1).padStart(2, "0");
  return (
    <div className={`project-stage ${project.tone}`}>
      {project.image ? (
        <div className="project-frame">
          <div className="project-frame-bar" aria-hidden="true">
            <span className="frame-dots">
              <i />
              <i />
              <i />
            </span>
            <span>{project.title.toLowerCase()}</span>
            <span>{project.year}</span>
          </div>
          <Image
            src={project.image}
            alt={`${project.title} website preview`}
            width={project.slug === "mentoring" ? 1920 : 2732}
            height={project.slug === "mentoring" ? 1080 : 1536}
            priority={priority}
            sizes="(max-width: 760px) 92vw, 55vw"
          />
        </div>
      ) : (
        <div className="project-monograph-plate" aria-hidden="true">
          <div className="plate-top">
            <span>NO. {num}</span>
            <span>
              {project.category} · {project.year}
            </span>
          </div>
          <strong>{project.title}</strong>
          <small>{project.tech.join(" / ")}</small>
        </div>
      )}
    </div>
  );
}

export default function ProjectCard({
  project,
  index = 0,
  featured = false,
}: {
  project: Project;
  index?: number;
  featured?: boolean;
}) {
  const num = String(index + 1).padStart(2, "0");
  const href = `/portfolio/${project.slug}`;

  return (
    <article className={featured ? "project-featured" : "project-card-v2"}>
      <Link
        href={href}
        className="project-stage-link"
        aria-label={`Read case study for ${project.title}`}
      >
        <ProjectVisual project={project} index={index} priority={featured} />
      </Link>

      <div className="project-copy">
        <div className="project-meta-row">
          <span>
            {num} <span className="slash">/</span> {project.category}
          </span>
          <span>{project.year}</span>
        </div>
        <h3>
          <Link href={href}>{project.title}</Link>
        </h3>
        <p className="project-deck">{project.description}</p>
        <p className="project-detail">{project.detail}</p>
        <ul className="tech-list" aria-label="Technologies">
          {project.tech.map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>
        <div className="project-actions">
          <Link href={href} className="text-link">
            Read case study{" "}
            <span className="arrow-cue" aria-hidden="true">
              →
            </span>
          </Link>
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noreferrer"
              className="text-link"
            >
              Live site{" "}
              <span className="arrow-cue" aria-hidden="true">
                ↗
              </span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
