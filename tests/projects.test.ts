import test from "node:test";
import assert from "node:assert/strict";
import { filterProjects } from "../src/lib/projects.ts";
import { getProjectBySlug, projects } from "../src/lib/content.ts";
import { allowedChatUrl } from "../src/lib/chat-links.ts";

test("project filtering combines category and case-insensitive search", () => {
  const items = [
    {
      title: "News",
      description: "Digital newsroom",
      category: "Personal",
      tech: ["Next.js"],
    },
    {
      title: "Consulting",
      description: "Tax services",
      category: "Freelance",
      tech: ["Next.js"],
    },
  ];
  assert.equal(
    filterProjects(items, "Freelance", "NEXT.JS")[0]?.title,
    "Consulting",
  );
  assert.equal(filterProjects(items, "All", "news").length, 1);
  assert.equal(filterProjects(items, "Personal", "tax").length, 0);
  assert.equal(filterProjects(items, "All", "  ").length, 2);
});

test("every project resolves by slug and is permitted in assistant links", () => {
  assert.ok(projects.length >= 7);
  for (const project of projects) {
    assert.equal(getProjectBySlug(project.slug)?.title, project.title);
    assert.ok(project.highlights.length > 0);
    assert.equal(allowedChatUrl(`/portfolio/${project.slug}`), true);
  }
  assert.equal(getProjectBySlug("nonexistent-project"), undefined);
});
