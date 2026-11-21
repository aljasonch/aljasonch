import type { Metadata } from "next";
import ProjectList from "@/components/project-list";

export const metadata: Metadata = {
  title: "Selected work",
  description:
    "Full-stack applications, freelance websites, and community projects built by Alfonsus Jason Christian.",
  alternates: { canonical: "/portfolio" },
};

export default function Portfolio() {
  return (
    <div className="container">
      <header className="page-heading">
        <p className="eyebrow">Work Archive</p>
        <h1>
          Ideas, made
          <br />
          <em>useful.</em>
        </h1>
        <p className="page-lede">
          A complete selection of products I have built—from multilingual
          business websites and digital newsrooms to campus platforms and
          everyday utilities.
        </p>
      </header>
      <ProjectList />
    </div>
  );
}
