import type { LiteratureItem } from "./types";

type Props = {
  items: LiteratureItem[];
};

export function LiteratureResults({ items }: Props) {
  return (
    <table>
      <thead>
        <tr>
          <th>Title</th><th>Author</th><th>Keywords</th><th>Views</th>
        </tr>
      </thead>
      <tbody>
        {items.map(({ id, title, author, keywords, views }) => (
          <tr key={id}>
            <td>{title}</td>
            <td>{author}</td>
            <td>{keywords}</td>
            <td>{views}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
