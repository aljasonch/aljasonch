import test from "node:test";
import assert from "node:assert/strict";
import {
  normalizeTags,
  readLocalPosts,
  preparePost,
  normalizePost,
  STORAGE_KEY,
  newestFirst,
} from "../src/lib/posts.ts";

const draft = {
  title: "A useful system",
  excerpt: "Notes",
  content: "# Hello",
  tags: "Next.js, design",
  date: "2026-10-29",
};

test("sorts mixed legacy and ISO publication dates chronologically", () => {
  const dates = [
    "September 1, 2026",
    "2026-10-29",
    "December 1, 2025",
    "invalid",
  ];
  assert.deepEqual(
    dates
      .map((date) => ({ date }))
      .sort(newestFirst)
      .map((post) => post.date),
    ["2026-10-29", "September 1, 2026", "December 1, 2025", "invalid"],
  );
});

test("legacy tags and numeric identifiers are preserved in normalized posts", () => {
  assert.deepEqual(normalizeTags(" web, design, web,  "), ["web", "design"]);
  assert.deepEqual(normalizeTags(["web", "design"]), ["web", "design"]);
  assert.equal(normalizePost({ ...draft, id: 12, slug: "original" }).id, "12");
  assert.equal(
    normalizePost(
      { ...draft, id: "stale-field", slug: "original" },
      "actual-document",
    ).id,
    "actual-document",
  );
  assert.equal(STORAGE_KEY, "aljasonch_blog_posts");
});

test("invalid stored data throws instead of silently erasing articles", () => {
  assert.deepEqual(readLocalPosts(null), []);
  assert.equal(
    readLocalPosts(JSON.stringify([{ ...draft, id: 12, slug: "original" }]))[0]
      .id,
    "12",
  );
  assert.throws(() => readLocalPosts("{broken"));
  assert.throws(() => readLocalPosts("{}"));
  assert.throws(() => readLocalPosts('[{"title":"Incomplete"}]'));
});

test("editing preserves the document ID, slug, and publication date", () => {
  const existing = normalizePost({
    ...draft,
    id: "remote-document-id",
    slug: "original",
  });
  const edited = preparePost(
    { ...draft, title: "A new title", date: "2026-11-01" },
    existing,
  );
  assert.equal(edited.id, "remote-document-id");
  assert.equal(edited.slug, "original");
  assert.equal(edited.date, "2026-10-29");
});

test("new articles require title and body and receive a URL-safe slug", () => {
  assert.throws(() => preparePost({ ...draft, title: "  " }));
  assert.throws(() => preparePost({ ...draft, content: "  " }));
  const post = preparePost(draft);
  assert.match(post.slug, /^a-useful-system-[a-z0-9-]+$/);
  assert.equal(post.id, post.slug);
  assert.deepEqual(post.tags, ["Next.js", "design"]);
});
