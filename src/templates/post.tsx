import React from "react";
import { graphql, PageProps } from "gatsby";
import Giscus from "@giscus/react";
import SEO from "../components/SEO";
import NavigationBar from "../components/NavigationBar";
interface TOCItem {
  url: string;
  title: string;
  items?: TOCItem[];
}

const TableOfContents = ({ items }: { items: TOCItem[] }) => {
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
};

const PostTemplate = ({
  data,
  children,
}: PageProps<Queries.PostTemplateQuery>) => {
  if (!data.mdx) return null;

  const toc = data.mdx.tableOfContents as { items: TOCItem[] };

  return (
    <div className="root">
      <div className="container">
        <NavigationBar />
        <div className="w-screen max-w-4xl">
          <header className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">
              {data.mdx.frontmatter?.title}
            </h1>
            <div>
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                {data.mdx.frontmatter?.category}
              </span>
              {data.mdx.frontmatter?.tags?.map(
                (tag) =>
                  tag && (
                    <span
                      key={tag}
                      className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
                    >
                      {tag}
                    </span>
                  )
              )}
            </div>
            <div className="mt-4 text-gray-600">
              <time>{data.mdx.frontmatter?.date}</time>
            </div>
          </header>

          <div className="flex flex-row gap-8 ">
            {toc?.items && toc.items.length > 0 && (
              <aside className="hidden md:flex flex-col md:w-60 flex-shrink-0 border-r border-neutral-500 pr-6 sticky top-8 self-start max-h-[calc(100vh-4rem)] overflow-y-auto">
                <h2 className="text-lg font-bold mb-4">목차</h2>
                <TableOfContents items={toc.items} />
              </aside>
            )}
            <div className="flex-1 w-full">
              <article>{children}</article>
              <section>
                <Giscus
                  id="comments"
                  repo="chaeyulia/blog"
                  repoId="R_kgDOO2dZZA"
                  category="Announcements"
                  categoryId="DIC_kwDOO2dZZM4CrR-f"
                  mapping="specific"
                  term={data.mdx.frontmatter?.title ?? "untitled"}
                  reactionsEnabled="1"
                  emitMetadata="0"
                  inputPosition="top"
                  theme="light"
                  lang="en"
                  loading="lazy"
                />
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostTemplate;

export const query = graphql`
  query PostTemplate($id: String!) {
    mdx(id: { eq: $id }) {
      tableOfContents
      frontmatter {
        title
        date
        slug
        tags
        category
      }
    }
  }
`;

export const Head = ({ data }: PageProps<Queries.PostTemplateQuery>) => (
  <SEO title={data.mdx?.frontmatter?.title ?? ""} />
);
