import { profile, projects } from "./content.ts";

const hosts = new Set(
  [
    profile.website,
    profile.github,
    profile.linkedin,
    profile.instagram,
    ...projects.flatMap((p) => (p.url ? [p.url] : [])),
  ].map((value) => new URL(value).hostname),
);
const paths = new Set([
  "/",
  "/portfolio",
  "/contact",
  "/cv",
  "/blog",
  profile.cv,
  "/CV_Alfonsus Jason Christian.pdf",
]);

export function allowedChatUrl(raw: string): boolean {
  if (paths.has(raw) || /^\/blog\/[a-z0-9-]+$/.test(raw)) return true;
  if (raw === `mailto:${profile.email}`) return true;
  try {
    const url = new URL(raw);
    return (
      url.protocol === "https:" &&
      !url.username &&
      !url.password &&
      !url.port &&
      hosts.has(url.hostname)
    );
  } catch {
    return false;
  }
}
