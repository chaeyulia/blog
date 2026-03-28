import { Client } from "@notionhq/client";
import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { NotionToMarkdown } from "notion-to-md";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeStringify from "rehype-stringify";
import type { Post } from "@/types/post";

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const n2m = new NotionToMarkdown({ notionClient: notion });

const DATABASE_ID = process.env.NOTION_DATABASE_ID!;

export async function getPostsList(
  category?: string
): Promise<Pick<Post, "slug" | "title" | "date" | "category">[]> {
  try {
    const filter =
      category && category !== ""
        ? {
            and: [
              { property: "published", checkbox: { equals: true } },
              { property: "category", select: { equals: category } },
            ],
          }
        : { property: "published", checkbox: { equals: true } };

    const response = await notion.databases.query({
      database_id: DATABASE_ID,
      filter,
      sorts: [{ property: "date", direction: "descending" }],
    });

    return response.results
      .filter((page): page is PageObjectResponse => page.object === "page")
      .map((page) => ({
        slug: getTextProp(page.properties.slug),
        title: getTitleProp(page.properties.title),
        date: getDateProp(page.properties.date),
        category: getSelectProp(page.properties.category),
      }));
  } catch (error) {
    console.error("노션 글 목록 조회 실패:", error);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<Post> {
  try {
    const decodedSlug = decodeURIComponent(slug);

    const response = await notion.databases.query({
      database_id: DATABASE_ID,
      filter: {
        and: [
          { property: "published", checkbox: { equals: true } },
          { property: "slug", rich_text: { equals: decodedSlug } },
        ],
      },
    });

    const page = response.results.find(
      (p): p is PageObjectResponse => p.object === "page"
    );

    if (!page) {
      return {
        title: "404 NOT FOUND",
        content: "요청하신 포스트가 존재하지 않습니다.",
        slug,
      };
    }

    const mdBlocks = await n2m.pageToMarkdown(page.id);
    const markdown = n2m.toMarkdownString(mdBlocks).parent;

    const processedContent = await remark()
      .use(remarkGfm)
      .use(remarkRehype, { allowDangerousHtml: true })
      .use(rehypePrettyCode, {
        theme: "github-dark",
        keepBackground: true,
        defaultLang: "plaintext",
      })
      .use(rehypeStringify, { allowDangerousHtml: true })
      .process(markdown);

    return {
      title:
        getTitleProp(page.properties.title) ||
        slug.split("/").pop()?.replace(/-/g, " ") ||
        slug,
      date: getDateProp(page.properties.date),
      tags: getMultiSelectProp(page.properties.tags),
      category: getSelectProp(page.properties.category),
      content: processedContent.toString(),
      slug,
    };
  } catch (error) {
    console.error("노션에서 포스트를 불러오지 못했습니다:", error);
    return {
      title: "404 NOT FOUND",
      content: "요청하신 포스트가 존재하지 않습니다.",
      slug,
    };
  }
}

// 속성 파싱 헬퍼
function getTitleProp(prop: unknown): string {
  if (!prop || typeof prop !== "object") return "";
  const p = prop as { title?: Array<{ plain_text?: string }> };
  return p.title?.[0]?.plain_text ?? "";
}

function getTextProp(prop: unknown): string {
  if (!prop || typeof prop !== "object") return "";
  const p = prop as { rich_text?: Array<{ plain_text?: string }> };
  return p.rich_text?.[0]?.plain_text ?? "";
}

function getDateProp(prop: unknown): string | undefined {
  if (!prop || typeof prop !== "object") return undefined;
  const p = prop as { date?: { start?: string } };
  return p.date?.start;
}

function getSelectProp(prop: unknown): string | undefined {
  if (!prop || typeof prop !== "object") return undefined;
  const p = prop as { select?: { name?: string } };
  return p.select?.name;
}

function getMultiSelectProp(prop: unknown): string[] {
  if (!prop || typeof prop !== "object") return [];
  const p = prop as { multi_select?: Array<{ name?: string }> };
  return p.multi_select?.map((item) => item.name ?? "").filter(Boolean) ?? [];
}
