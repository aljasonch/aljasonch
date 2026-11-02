import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { createHash } from "node:crypto";

const base = process.env.PREVIEW_URL || "http://127.0.0.1:3100";
for (const path of [
  "/",
  "/portfolio",
  "/cv",
  "/contact",
  "/blog",
  "/admin",
  "/robots.txt",
  "/sitemap.xml",
]) {
  const response = await fetch(base + path);
  assert.equal(response.status, 200, path);
  console.log(`200 ${path}`);
}
const redirect = await fetch(base + "/projects", { redirect: "manual" });
assert.equal(redirect.status, 308);
assert.equal(
  new URL(redirect.headers.get("location"), base).pathname,
  "/portfolio",
);
assert.equal((await fetch(base + "/not-a-page")).status, 404);
for (const path of [
  "/alfonsus-jason-christian-cv.pdf",
  "/CV_Alfonsus%20Jason%20Christian.pdf",
]) {
  const response = await fetch(base + path);
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type"), /application\/pdf/);
  const hash = (data) => createHash("sha256").update(data).digest("hex");
  assert.equal(
    hash(Buffer.from(await response.arrayBuffer())),
    hash(await readFile("public/alfonsus-jason-christian-cv.pdf")),
  );
}
const invalid = await fetch(base + "/api/chat", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ message: "" }),
});
assert.equal(invalid.status, 400);
assert.equal((await fetch(base + "/api/chat")).status, 405);
console.log(
  "Legacy redirect, 404, both PDF downloads, and API validation passed.",
);
