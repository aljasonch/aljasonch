type SearchableProject = {
  title: string;
  description: string;
  category: string;
  tech: string[];
};

export function filterProjects<T extends SearchableProject>(
  items: T[],
  category: string,
  query: string,
): T[] {
  const term = query.trim().toLowerCase();
  return items.filter(
    (item) =>
      (category === "All" || item.category === category) &&
      [item.title, item.description, ...item.tech]
        .join(" ")
        .toLowerCase()
        .includes(term),
  );
}
