import React, { useState } from "react";
import { Link, navigate } from "gatsby";

const CATEGORIES = [
  { id: "all-posts", label: "전체 글" },
  { id: "bug-fix", label: "버그 수정" },
  { id: "fe", label: "FE" },
  { id: "be", label: "BE" },
  { id: "retrospect", label: "회고" },
  { id: "etc", label: "그 외" },
];

interface PostListProps {
  data: Queries.AllPostsQuery;
  currentCategory?: string;
}

export default function PostList({ data, currentCategory }: PostListProps) {
  const [activeCategory, setActiveCategory] = useState(
    currentCategory || "all-posts"
  );
  const [activeTag, setActiveTag] = useState("");

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId || "all-posts");
    navigate(`/${categoryId || "all-posts"}`, { replace: true });
  };

  const tagCounts = data.allMdx.edges.reduce((acc, { node }) => {
    node.frontmatter?.tags?.forEach((tag) => {
      if (!tag) return;
      acc[tag] = (acc[tag] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);

  const sortedTags = Object.entries(tagCounts)
    .sort(([, a], [, b]) => b - a)
    .map(([tag]) => tag);

  const filteredPosts = data.allMdx.edges.filter(
    ({ node }) => !activeTag || node.frontmatter?.tags?.includes(activeTag)
  );

  return (
    <div className="container">
      <div className="w-full max-w-4xl items-center justify-center mx-auto px-4">
        <header className="flex items-baseline mb-4 py-2 gap-1">
          <h1 className="title inline font-bold">Posts</h1>
          <span className="text-2xl font-semibold">
            ({data.allMdx.totalCount})
          </span>
        </header>

        <nav>
          <div className="flex gap-4 border-b">
            {CATEGORIES.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => handleCategoryChange(id)}
                className={`pb-2 text-xl sm:text-3xl font-bold hover:cursor-pointer ${
                  activeCategory === id
                    ? "text-neutral-900"
                    : "text-neutral-500"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </nav>

        <main className="flex flex-col items-baseline py-6">
          {sortedTags.length > 0 && (
            <aside className="hidden sm:flex mb-6">
              <div className="flex flex-wrap gap-2">
                {sortedTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setActiveTag(activeTag === tag ? "" : tag)}
                    className={`border text-left rounded-2xl px-3 py-1 text-sm hover:cursor-pointer ${
                      activeTag === tag
                        ? "bg-black text-white"
                        : "text-gray-700 hover:text-neutral-800"
                    }`}
                  >
                    {tag} ({tagCounts[tag]})
                  </button>
                ))}
              </div>
            </aside>
          )}

          <div className="w-full">
            <ul>
              {filteredPosts.map(({ node }) => (
                <li
                  key={node.id}
                  className="pb-2 mb-6 not-last:border-b border-gray-300 last:mb-0"
                >
                  <Link to={`/posts${node.frontmatter?.slug}`}>
                    <h3 className="text-xl! text-blue-600! hover:underline">
                      {node.frontmatter?.title}
                    </h3>
                  </Link>
                  <div className="flex gap-2 flex-col-reverse xs:flex-row xs:items-center xs:justify-start">
                    <span className="text-gray-500 text-sm">
                      {node.frontmatter?.date}
                    </span>
                    {node.frontmatter?.tags && (
                      <div className="flex gap-2">
                        {node.frontmatter?.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </main>
      </div>
    </div>
  );
}
