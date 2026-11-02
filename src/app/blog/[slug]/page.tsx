import { Journal } from "../../../components/journal";

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <div className="container section">
      <Journal slug={slug} />
    </div>
  );
}
