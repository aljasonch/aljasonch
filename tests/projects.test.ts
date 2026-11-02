import test from "node:test";
import assert from "node:assert/strict";
import { filterProjects } from "../src/lib/projects.ts";

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
