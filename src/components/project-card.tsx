import Image from "next/image";
import type { Project } from "@/lib/content";

export default function ProjectCard({
  project,
  index = 0,
}: {
  project: Project;
  index?: number;
}) {
  const visual = (
    <div className={`project-stage ${project.tone}`}>
      {project.image ? (
        <div className="project-browser">
          <div className="browser-bar" aria-hidden="true">
            <i />
            <i />
            <i />
            <span>{project.title.toLowerCase()}</span>
          </div>
          <Image
            src={project.image}
            alt={`${project.title} website preview`}
            width={project.slug === "mentoring" ? 1920 : 2732}
            height={project.slug === "mentoring" ? 1080 : 1536}
            sizes="(max-width: 760px) 90vw, 60vw"
          />
        </div>
      ) : (
        <div className="project-wordmark" aria-hidden="true">
          <span>{project.category}</span>
          <strong>{project.title}</strong>
          <small>{project.tech.join(" / ")}</small>
        </div>
      )}
      <span className="stage-corner" aria-hidden="true">
        ↗
      </span>
    </div>
  );
  return (
    <article className={`project-row ${index % 2 ? "reverse" : ""}`}>
      {project.url ? (
        <a
          className="project-visual"
          href={project.url}
          target="_blank"
          rel="noreferrer"
          aria-label={`Visit ${project.title} (opens in a new tab)`}
        >
          {visual}
        </a>
      ) : (
        <div className="project-visual">{visual}</div>
      )}
      <div className="project-copy">
        <p className="eyebrow">
          {project.category} <span className="slash">/</span> {project.year}
        </p>
        <h3>{project.title}</h3>
        <p className="project-deck">{project.description}</p>
        <p className="muted">{project.detail}</p>
        <ul className="tech-list" aria-label="Technologies">
          {project.tech.map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>
        {project.url && (
          <a
            href={project.url}
            target="_blank"
            rel="noreferrer"
            className="text-link"
          >
            Visit website <span aria-hidden="true">↗</span>
          </a>
        )}
      </div>
    </article>
  );
}
