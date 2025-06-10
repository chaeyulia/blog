import React from "react";

interface TOCItem {
  url: string;
  title: string;
  items?: TOCItem[];
}

export default function TableOfContents({ items }: { items: TOCItem[] }) {
  return (
    <ul className="pl-0 text-sm">
      {items.map((item) => (
        <li key={item.url} className="mb-2">
          <a href={item.url} className="text-blue-600 hover:underline">
            {item.title}
          </a>
          {item.items && <TableOfContents items={item.items} />}
        </li>
      ))}
    </ul>
  );
}
