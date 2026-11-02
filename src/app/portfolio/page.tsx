import type { Metadata } from "next";
import ProjectList from "@/components/project-list";
export const metadata: Metadata = {
  title: "Selected work",
  description:
    "Full-stack applications, freelance websites, and community projects by Jason Christian.",
};
export default function Portfolio() {
  return (
    <div className="container">
      <header className="page-heading">
        <p className="eyebrow">Selected work</p>
        <h1>
          Ideas, made
          <br />
          <span>useful.</span>
        </h1>
        <p>
          A selection of things I’ve built, from business tools to community
          platforms. Different challenges. The same attention to detail.
        </p>
      </header>
      <ProjectList />
    </div>
  );
}
