"use client";
import { useState } from "react";
import { projects } from "@/lib/content";
import { filterProjects } from "@/lib/projects";
import ProjectCard from "./project-card";

export default function ProjectList() {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const filtered = filterProjects(projects, category, query);
  return (
    <>
      <div className="filter-bar">
        <div className="filters" aria-label="Project categories">
          {["All", ...new Set(projects.map((p) => p.category))].map((name) => (
            <button
              key={name}
              aria-pressed={category === name}
              onClick={() => setCategory(name)}
            >
              {name}
            </button>
          ))}
        </div>
        <label className="search-field">
          <span className="sr-only">Search projects</span>
          <input
            type="search"
            placeholder="Search work…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <span aria-hidden="true">⌕</span>
        </label>
      </div>
      <p className="sr-only" role="status">
        {filtered.length} projects found
      </p>
      <div className="project-list">
        {filtered.map((project, index) => (
          <ProjectCard key={project.slug} project={project} index={index} />
        ))}
      </div>
      {!filtered.length && (
        <div className="empty-state">
          <h2>No matching projects.</h2>
          <p>Try another search or view all work.</p>
          <button
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
