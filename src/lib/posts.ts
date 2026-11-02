export const STORAGE_KEY = "aljasonch_blog_posts";

export function newestFirst(a: { date: string }, b: { date: string }): number {
  const first = Date.parse(a.date);
  const second = Date.parse(b.date);
  return (
    (Number.isNaN(second) ? 0 : second) - (Number.isNaN(first) ? 0 : first)
  );
}

export type Post = {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  tags: string[];
  slug: string;
  date: string;
};

export type PostDraft = Pick<Post, "title" | "excerpt" | "content" | "date"> & {
  tags: string | string[];
};

export function normalizeTags(value: unknown): string[] {
  return [
    ...new Set(
      (Array.isArray(value)
        ? value
        : typeof value === "string"
          ? value.split(",")
          : []
      )
        .filter((tag): tag is string => typeof tag === "string")
        .map((tag) => tag.trim())
        .filter(Boolean),
    ),
  ];
}

export function normalizePost(value: unknown, documentId?: string): Post {
  if (!value || typeof value !== "object")
    throw new Error("Invalid article data.");
  const data = value as Record<string, unknown>;
  for (const key of ["title", "content", "slug", "date"]) {
    if (typeof data[key] !== "string" || !(data[key] as string).trim())
      throw new Error("Invalid article data.");
  }
  return {
    id: documentId ?? String(data.id ?? data.slug),
    title: data.title as string,
    content: data.content as string,
    slug: data.slug as string,
    date: data.date as string,
    excerpt: typeof data.excerpt === "string" ? data.excerpt : "",
    tags: normalizeTags(data.tags),
  };
}

export function readLocalPosts(stored: string | null): Post[] {
  if (stored === null) return [];
  const data: unknown = JSON.parse(stored);
  if (!Array.isArray(data))
    throw new Error(
      "Stored articles are invalid. Your data has not been changed.",
    );
  return data.map((item) => normalizePost(item));
}

export function preparePost(draft: PostDraft, existing?: Post): Post {
  if (!draft.title.trim() || !draft.content.trim())
    throw new Error("A title and article body are required.");
  const slug =
    existing?.slug ??
    `${
      draft.title
        .toLowerCase()
        .normalize("NFKD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "")
        .slice(0, 70) || "article"
    }-${crypto.randomUUID().slice(0, 8)}`;
  return {
    id: existing?.id ?? slug,
    slug,
    title: draft.title.trim(),
    excerpt: draft.excerpt.trim(),
    content: draft.content,
    tags: normalizeTags(draft.tags),
    date: existing?.date ?? draft.date,
  };
}

export function formatPostDate(value: string): string {
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? value
    : new Intl.DateTimeFormat("en", {
        month: "long",
        day: "numeric",
        year: "numeric",
        timeZone: "UTC",
      }).format(date);
}
