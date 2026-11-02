import Link from "next/link";
export default function NotFound() {
  return (
    <div className="container page-heading">
      <p className="eyebrow">404 / A wrong turn</p>
      <h1>
        Nothing here.
        <br />
        <span>Yet.</span>
      </h1>
      <p>The page may have moved. Let’s get you back to the work.</p>
      <Link className="button" href="/">
        Back home ↗
      </Link>
    </div>
  );
}
