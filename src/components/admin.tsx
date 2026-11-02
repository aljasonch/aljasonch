"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import type { User } from "firebase/auth";
import {
  deletePost,
  fetchPosts,
  isFirebaseConfigured,
  savePost,
  signInAdmin,
  signOutAdmin,
  subscribeToAuth,
} from "../lib/firebase";
import {
  preparePost,
  newestFirst,
  type Post,
  type PostDraft,
} from "../lib/posts";
import { Markdown } from "./markdown";
import "./journal.css";

const blankDraft = (): PostDraft => ({
  title: "",
  excerpt: "",
  content: "",
  tags: "",
  date: new Date().toISOString().slice(0, 10),
});

export function Admin() {
  const [user, setUser] = useState<User | null>(null);
  const [checking, setChecking] = useState(true);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState(false);
  const [existing, setExisting] = useState<Post>();
  const [draft, setDraft] = useState<PostDraft>(blankDraft);
  const [preview, setPreview] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const pendingPost = useRef<Post | undefined>(undefined);
  const [draftOwner, setDraftOwner] = useState("");

  useEffect(() => {
    if (!user) {
      setDraftOwner("");
      return;
    }
    try {
      const stored = sessionStorage.getItem(`journal-draft:${user.uid}`);
      if (stored) {
        const saved = JSON.parse(stored) as {
          draft: PostDraft;
          existing?: Post;
          pending?: Post;
        };
        if (
          saved.draft &&
          ["title", "excerpt", "content", "date"].every(
            (key) => typeof saved.draft[key as keyof PostDraft] === "string",
          ) &&
          (typeof saved.draft.tags === "string" ||
            Array.isArray(saved.draft.tags))
        ) {
          setDraft(saved.draft);
          setExisting(saved.existing);
          pendingPost.current = saved.pending;
          setDirty(true);
          setNotice("Your unsaved draft has been restored.");
        }
      }
    } catch {
      /* Session storage may be disabled; the navigation guard still protects the editor. */
    }
    setDraftOwner(user.uid);
  }, [user]);

  useEffect(() => {
    if (!user || draftOwner !== user.uid) return;
    try {
      const key = `journal-draft:${user.uid}`;
      if (dirty)
        sessionStorage.setItem(
          key,
          JSON.stringify({ draft, existing, pending: pendingPost.current }),
        );
      else sessionStorage.removeItem(key);
    } catch {
      /* Retain the live editor even when browser storage is unavailable. */
    }
  }, [draft, dirty, existing, user, draftOwner]);

  useEffect(() => {
    try {
      return subscribeToAuth(
        (value) => {
          setUser(value);
          setChecking(false);
        },
        () => {
          setError(
            "Authentication could not be checked. Please reload and try again.",
          );
          setChecking(false);
        },
      );
    } catch {
      setError(
        "Firebase could not be initialized. Check the site configuration.",
      );
      setChecking(false);
    }
  }, []);

  useEffect(() => {
    if (!user) return;
    let active = true;
    setLoading(true);
    fetchPosts()
      .then((data) => {
        if (active) setPosts(data);
      })
      .catch(() => {
        if (active)
          setError(
            "Articles could not be loaded. Retry before editing existing work.",
          );
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [user, attempt]);

  useEffect(() => {
    if (!dirty) return;
    const warn = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
    };
    const guardLink = (event: MouseEvent) => {
      const link = (event.target as HTMLElement).closest("a");
      if (
        !link ||
        link.target === "_blank" ||
        link.hasAttribute("download") ||
        !link.href.startsWith(window.location.origin)
      )
        return;
      if (
        !window.confirm("Discard your unsaved changes and leave the editor?")
      ) {
        event.preventDefault();
        event.stopPropagation();
      }
    };
    window.addEventListener("beforeunload", warn);
    document.addEventListener("click", guardLink, true);
    return () => {
      window.removeEventListener("beforeunload", warn);
      document.removeEventListener("click", guardLink, true);
    };
  }, [dirty]);

  function edit(post?: Post) {
    if (dirty && !window.confirm("Discard your unsaved changes?")) return;
    setExisting(post);
    setDraft(post ? { ...post, tags: post.tags.join(", ") } : blankDraft());
    pendingPost.current = undefined;
    setDirty(false);
    setPreview(false);
    setError("");
    setNotice("");
  }

  function update(key: keyof PostDraft, value: string) {
    setDraft((current) => ({ ...current, [key]: value }));
    setDirty(true);
    setNotice("");
  }

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    const data = new FormData(event.currentTarget);
    try {
      await signInAdmin(
        String(data.get("email")),
        String(data.get("password")),
      );
    } catch {
      setError(
        "Sign-in failed. Check your email and password, then try again.",
      );
    } finally {
      setBusy(false);
    }
  }

  async function publish(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    setNotice("");
    try {
      // Reuse the same document on retry if a response was lost after a successful write.
      const post = preparePost(draft, existing ?? pendingPost.current);
      pendingPost.current = post;
      try {
        if (user)
          sessionStorage.setItem(
            `journal-draft:${user.uid}`,
            JSON.stringify({ draft, existing, pending: post }),
          );
      } catch {
        /* The live draft remains available if storage is disabled. */
      }
      await savePost(post);
      setPosts((current) =>
        [post, ...current.filter((item) => item.id !== post.id)].sort(
          newestFirst,
        ),
      );
      setExisting(post);
      setDirty(false);
      setNotice("Article saved.");
    } catch {
      setError(
        "The article was not saved. Your text is still here. Check your connection and publishing permissions, then try again.",
      );
    } finally {
      setBusy(false);
    }
  }

  async function remove(post: Post) {
    if (!window.confirm(`Delete “${post.title}”? This cannot be undone.`))
      return;
    setBusy(true);
    setError("");
    setNotice("");
    try {
      await deletePost(post);
      setPosts((current) => current.filter((item) => item.id !== post.id));
      if (existing?.id === post.id) {
        setExisting(undefined);
        pendingPost.current = undefined;
        setDraft(blankDraft());
        setDirty(false);
      }
      setNotice("Article deleted.");
    } catch {
      setError("The article could not be deleted. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  async function logout() {
    if (dirty && !window.confirm("Discard unsaved changes and sign out?"))
      return;
    setBusy(true);
    setError("");
    try {
      await signOutAdmin();
      if (user) {
        try {
          sessionStorage.removeItem(`journal-draft:${user.uid}`);
        } catch {}
      }
      setExisting(undefined);
      pendingPost.current = undefined;
      setDraft(blankDraft());
      setDirty(false);
      setNotice("");
    } catch {
      setError("Sign-out failed. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  if (checking) return <p role="status">Checking sign-in…</p>;
  if (!isFirebaseConfigured)
    return (
      <div className="notice">
        <h2>Publishing is not configured.</h2>
        <p>
          Existing local articles remain available in the journal on this
          browser. Configure Firebase authentication to manage published
          articles.
        </p>
      </div>
    );

  return (
    <>
      {error && (
        <p className="notice" role="alert">
          {error}
        </p>
      )}
      {notice && (
        <p className="notice" role="status">
          {notice}
        </p>
      )}
      {!user ? (
        <form className="admin-login" onSubmit={login}>
          <h2>Sign in to write.</h2>
          <label className="field">
            Email
            <input
              name="email"
              type="email"
              autoComplete="username"
              required
              disabled={busy}
            />
          </label>
          <label className="field">
            Password
            <input
              name="password"
              type="password"
              autoComplete="current-password"
              required
              disabled={busy}
            />
          </label>
          <button className="button" disabled={busy}>
            {busy ? "Signing in…" : "Sign in"}
          </button>
        </form>
      ) : (
        <>
          <div className="admin-toolbar">
            <p className="muted">Signed in as {user.email}</p>
            <button
              className="button secondary"
              disabled={busy}
              onClick={logout}
            >
              Sign out
            </button>
          </div>
          <div className="admin-layout">
            <aside className="admin-posts" aria-label="Manage articles">
              <button className="button" disabled={busy} onClick={() => edit()}>
                + New article
              </button>
              <div className="admin-toolbar">
                <h2>Articles</h2>
                <button
                  className="admin-text-button"
                  disabled={loading || busy}
                  onClick={() => {
                    setError("");
                    setAttempt(attempt + 1);
                  }}
                >
                  Refresh
                </button>
              </div>
              {loading ? (
                <p role="status">Loading articles…</p>
              ) : posts.length === 0 ? (
                <p className="muted">No articles loaded.</p>
              ) : (
                <ul>
                  {posts.map((post) => (
                    <li key={post.id}>
                      <button
                        disabled={busy}
                        className="admin-post-select"
                        onClick={() => edit(post)}
                        aria-current={
                          existing?.id === post.id ? "true" : undefined
                        }
                      >
                        {post.title}
                      </button>
                      <button
                        className="admin-text-button"
                        disabled={busy}
                        aria-label={`Delete ${post.title}`}
                        onClick={() => remove(post)}
                      >
                        Delete
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </aside>
            <form className="admin-editor" onSubmit={publish}>
              <div className="admin-toolbar">
                <h2>{existing ? "Edit article" : "New article"}</h2>
                <button
                  type="button"
                  className="button secondary"
                  aria-pressed={preview}
                  onClick={() => setPreview(!preview)}
                >
                  {preview ? "Edit text" : "Preview"}
                </button>
              </div>
              {existing && (
                <p className="muted admin-slug">
                  Permanent URL: /blog/{existing.slug}
                </p>
              )}
              {preview ? (
                <section className="admin-preview" aria-label="Article preview">
                  <h2>{draft.title || "Untitled article"}</h2>
                  <p className="journal-lede">{draft.excerpt}</p>
                  <Markdown>
                    {draft.content ||
                      "*Your article preview will appear here.*"}
                  </Markdown>
                </section>
              ) : (
                <fieldset disabled={busy}>
                  <label className="field">
                    Title
                    <input
                      value={draft.title}
                      onChange={(event) => update("title", event.target.value)}
                      required
                    />
                  </label>
                  <label className="field">
                    Excerpt
                    <textarea
                      rows={3}
                      value={draft.excerpt}
                      onChange={(event) =>
                        update("excerpt", event.target.value)
                      }
                    />
                  </label>
                  <label className="field">
                    Tags <span className="muted">Separate with commas</span>
                    <input
                      value={
                        Array.isArray(draft.tags)
                          ? draft.tags.join(", ")
                          : draft.tags
                      }
                      onChange={(event) => update("tags", event.target.value)}
                    />
                  </label>
                  <label className="field">
                    Article <span className="muted">Markdown supported</span>
                    <textarea
                      rows={18}
                      value={draft.content}
                      onChange={(event) =>
                        update("content", event.target.value)
                      }
                      required
                    />
                  </label>
                </fieldset>
              )}
              <div className="admin-toolbar">
                <button
                  className="button"
                  disabled={
                    busy || !draft.title.trim() || !draft.content.trim()
                  }
                >
                  {busy
                    ? "Working…"
                    : existing
                      ? "Save changes"
                      : "Publish article"}
                </button>
                {dirty && <span className="muted">Unsaved changes</span>}
              </div>
            </form>
          </div>
        </>
      )}
    </>
  );
}
