import ReactMarkdown from "react-markdown";

export function Markdown({ children }: { children: string }) {
  return (
    <div className="article-body">
      <ReactMarkdown skipHtml>{children}</ReactMarkdown>
    </div>
  );
}
