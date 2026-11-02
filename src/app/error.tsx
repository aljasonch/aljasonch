"use client";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <div className="container page-heading">
      <p className="eyebrow">Something went wrong</p>
      <h1>
        Let’s try <span>again.</span>
      </h1>
      <p>This page could not load. Try again, or return to the home page.</p>
      <div className="hero-buttons">
        <button className="button" onClick={reset}>
          Try again
        </button>
        <a className="button secondary" href="/">
          Back home
        </a>
      </div>
    </div>
  );
}
