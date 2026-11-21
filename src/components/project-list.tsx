"use client";

import { useState } from "react";
import { projects } from "@/lib/content";
import { filterProjects } from "@/lib/projects";
import ProjectCard from "./project-card";

export default function ProjectList() {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const categories = ["All", ...new Set(projects.map((p) => p.category))];
  const filtered = filterProjects(projects, category, query);

  const countFor = (name: string) =>
    name === "All"
      ? projects.length
      : projects.filter((project) => project.category === name).length;

  return (
    <>
      <div className="filter-bar">
        <div className="filters" role="group" aria-label="Project categories">
          {categories.map((name) => (
            <button
              key={name}
              type="button"
              aria-pressed={category === name}
              onClick={() => setCategory(name)}
            >
              {name} · {countFor(name)}
            </button>
          ))}
        </div>
        <label className="search-field">
          <span className="sr-only">Search projects</span>
          <input
            type="search"
            placeholder="Filter by title or stack…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <span className="search-icon" aria-hidden="true">
            ⌕
          </span>
        </label>
      </div>

      <p className="sr-only" role="status">
        {filtered.length} project{filtered.length === 1 ? "" : "s"} found
      </p>

      {filtered.length > 0 ? (
        <div className="portfolio-grid">
          {filtered.map((project) => {
            const originalIndex = projects.findIndex(
              (item) => item.slug === project.slug,
            );
            return (
              <ProjectCard
                key={project.slug}
                project={project}
                index={originalIndex >= 0 ? originalIndex : 0}
              />
            );
          })}
        </div>
      ) : (
        <div className="empty-state">
          <h2>No matching projects.</h2>
          <p className="muted">
            Try a different keyword or reset the category filter to view all{" "}
            {projects.length} works.
          </p>
          <button
            type="button"
            className="button secondary"
            onClick={() => {
              setCategory("All");
              setQuery("");
            }}
          >
            Clear filters
          </button>
        </div>
      )}
    </>
  );
}
