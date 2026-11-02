import type { Metadata } from "next";
import { Admin } from "../../components/admin";

export const metadata: Metadata = {
  title: "Journal admin",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return (
    <div className="container">
      <header className="page-heading">
        <p className="eyebrow">Behind the journal</p>
        <h1>
          Writing <span>room.</span>
        </h1>
      </header>
      <Admin />
    </div>
  );
}
