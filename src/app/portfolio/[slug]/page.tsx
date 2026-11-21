import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBySlug, projects } from "@/lib/content";
import { ProjectVisual } from "@/components/project-card";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project not found" };
  return {
    title: project.title,
    description: project.detail,
    alternates: { canonical: `/portfolio/${project.slug}` },
  };
}

export default async function ProjectCaseStudy({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const index = projects.findIndex((item) => item.slug === slug);
  if (index < 0) notFound();

  const project = projects[index];
  const previous = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  const num = String(index + 1).padStart(2, "0");

  return (
    <div className="container">
      <header className="page-heading">
        <Link className="case-back" href="/portfolio">
          ← Back to work archive
        </Link>
        <p className="eyebrow">
          Case Study {num} <span className="slash">/</span> {project.category}{" "}
          <span className="slash">/</span> {project.year}
        </p>
        <h1>{project.title}</h1>
        <p className="page-lede">{project.description}</p>
        {project.url && (
          <div className="project-actions" style={{ marginTop: "28px" }}>
            <a
              className="button"
              href={project.url}
              target="_blank"
              rel="noreferrer"
            >
              Visit live website{" "}
              <span className="arrow-cue" aria-hidden="true">
                ↗
              </span>
            </a>
          </div>
        )}
      </header>

      <dl className="case-specs">
        <div>
          <dt>Role</dt>
          <dd>{project.role}</dd>
        </div>
        <div>
          <dt>Category</dt>
          <dd>{project.category}</dd>
        </div>
        <div>
          <dt>Year</dt>
          <dd>{project.year}</dd>
        </div>
        <div>
          <dt>Stack</dt>
          <dd>{project.tech.join(", ")}</dd>
        </div>
      </dl>

      <div className="case-hero-stage">
        <ProjectVisual project={project} index={index} priority />
      </div>

      <section className="case-body-grid" aria-labelledby="overview-heading">
        <div>
          <p className="eyebrow">Overview</p>
          <h2 id="overview-heading">Context &amp; scope.</h2>
          <p className="ink-2">{project.detail}</p>
          <ul
            className="tech-list"
            aria-label="Technologies used"
            style={{ marginTop: "20px" }}
          >
            {project.tech.map((tech) => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow">Engineering &amp; delivery</p>
          <h2>What was built.</h2>
          <ul className="case-highlights">
            {project.highlights.map((item, itemIndex) => (
              <li key={item}>
                <span>{String(itemIndex + 1).padStart(2, "0")}</span>
                <div>{item}</div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <nav className="case-nav" aria-label="More case studies">
        <Link href={`/portfolio/${previous.slug}`}>
          <small>← Previous project</small>
          <strong>{previous.title}</strong>
        </Link>
        <Link href={`/portfolio/${next.slug}`}>
          <small>Next project →</small>
          <strong>{next.title}</strong>
        </Link>
      </nav>
    </div>
  );
}
