"use client";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <div className="container page-heading">
      <p className="eyebrow">Something went wrong</p>
      <h1>
        Let’s try <em>again.</em>
      </h1>
      <p className="page-lede" style={{ marginBottom: "28px" }}>
        This page could not load. Try again, or return to the home page.
      </p>
      <div className="hero-buttons" style={{ marginBottom: 0 }}>
        <button type="button" className="button" onClick={reset}>
          Try again
        </button>
        <a className="button secondary" href="/">
          Back home
        </a>
      </div>
    </div>
  );
}
