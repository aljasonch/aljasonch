"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchPosts } from "../lib/firebase";
import { formatPostDate, type Post } from "../lib/posts";
import { Markdown } from "./markdown";
import "./journal.css";

export function Journal({ slug }: { slug?: string }) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [tag, setTag] = useState("");
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError("");
    fetchPosts()
      .then((data) => {
        if (active) setPosts(data);
      })
      .catch(() => {
        if (active)
          setError("The journal could not be loaded. Please try again.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [attempt]);

  if (loading)
    return (
      <p className="notice" role="status">
        Loading journal…
      </p>
    );
  if (error)
    return (
      <div className="notice" role="alert">
        <p>{error}</p>
        <button
          className="button secondary"
          onClick={() => setAttempt(attempt + 1)}
        >
          Try again
        </button>
      </div>
    );

  if (slug) {
    const post = posts.find((item) => item.slug === slug);
    if (!post)
      return (
        <div className="section">
          <h1>Article not found.</h1>
          <p className="muted">
            This article may have moved or is no longer available.
          </p>
          <Link className="button secondary" href="/blog">
            Back to journal
          </Link>
        </div>
      );
    return (
      <article className="journal-article">
        <Link className="journal-back" href="/blog">
          ← Back to journal
        </Link>
        <p className="eyebrow">
          <time dateTime={post.date}>{formatPostDate(post.date)}</time>
        </p>
        <h1>{post.title}</h1>
        {post.excerpt && <p className="journal-lede">{post.excerpt}</p>}
        <div className="journal-tags">
          {post.tags.map((value) => (
            <span key={value}>{value}</span>
          ))}
        </div>
        <Markdown>{post.content}</Markdown>
      </article>
    );
  }

  const tags = [...new Set(posts.flatMap((post) => post.tags))].sort();
  const term = search.trim().toLowerCase();
  const filtered = posts.filter(
    (post) =>
      (!tag || post.tags.includes(tag)) &&
      `${post.title} ${post.excerpt} ${post.content} ${post.tags.join(" ")}`
        .toLowerCase()
        .includes(term),
  );
  return (
    <>
      {posts.length > 0 && (
        <div className="journal-controls">
          <label className="field">
            Search articles
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Ideas, systems, experiences…"
            />
          </label>
          <label className="field">
            Topic
            <select
              value={tag}
              onChange={(event) => setTag(event.target.value)}
            >
              <option value="">All topics</option>
              {tags.map((value) => (
                <option key={value}>{value}</option>
              ))}
            </select>
          </label>
        </div>
      )}
      <p className="muted" role="status">
        {posts.length === 0
          ? "No articles yet. New notes will appear here."
          : `${filtered.length} article${filtered.length === 1 ? "" : "s"}`}
      </p>
      <div className="journal-list">
        {filtered.map((post, index) => (
          <article className="journal-card" key={post.id}>
            <span className="journal-index" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div>
              <p className="eyebrow">
                <time dateTime={post.date}>{formatPostDate(post.date)}</time>
              </p>
              <h2>
                <Link href={`/blog/${encodeURIComponent(post.slug)}`}>
                  {post.title}
                  <span aria-hidden="true"> ↗</span>
                </Link>
              </h2>
              <p className="muted">{post.excerpt}</p>
              <div className="journal-tags">
                {post.tags.map((value) => (
                  <span key={value}>{value}</span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
      {posts.length > 0 && filtered.length === 0 && (
        <p className="notice">
          No articles match. Try another search or topic.
        </p>
      )}
    </>
  );
}
