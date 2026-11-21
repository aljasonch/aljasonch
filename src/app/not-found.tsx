import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container page-heading">
      <p className="eyebrow">404 / A wrong turn</p>
      <h1>
        Nothing here.
        <br />
        <em>Yet.</em>
      </h1>
      <p className="page-lede" style={{ marginBottom: "28px" }}>
        This page may have moved or never existed. Let’s get you back to the
        work.
      </p>
      <Link className="button" href="/">
        Back home <span className="arrow-cue" aria-hidden="true">→</span>
      </Link>
    </div>
  );
}
