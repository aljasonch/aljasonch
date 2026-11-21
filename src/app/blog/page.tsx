import type { Metadata } from "next";
import { Journal } from "../../components/journal";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Notes, engineering reflections, and experiments by Alfonsus Jason Christian.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  return (
    <div className="container">
      <header className="page-heading">
        <p className="eyebrow">Notes from the work</p>
        <h1>
          The <em>journal.</em>
        </h1>
        <p className="page-lede">
          Ideas, experiments, and practical lessons from building software for
          the web and real operations.
        </p>
      </header>
      <Journal />
    </div>
  );
}
