import type { Metadata } from "next";
import { Journal } from "../../components/journal";

export const metadata: Metadata = { title: "Journal" };

export default function BlogPage() {
  return (
    <div className="container">
      <header className="page-heading">
        <p className="eyebrow">Notes from the work</p>
        <h1>
          The <span>journal.</span>
        </h1>
        <p className="muted">
          Ideas, experiments, and lessons from building things for the web.
        </p>
      </header>
      <Journal />
    </div>
  );
}
