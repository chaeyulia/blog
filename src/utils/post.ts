import {
  S3Client,
  GetObjectCommand,
  ListObjectsV2Command,
} from "@aws-sdk/client-s3";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeStringify from "rehype-stringify";
import matter from "gray-matter";

const s3 = new S3Client({
  region: "ap-northeast-2",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function getPostsList(prefix?: string) {
  try {
    const command = new ListObjectsV2Command({
      Bucket: "chiaksan-peaches",
      Prefix: prefix,
    });

    const response = await s3.send(command);
    return (
      response.Contents?.filter(
        (obj) => obj.Key && obj.Key.endsWith(".mdx") && !obj.Key.endsWith("/")
      ).map((obj) => ({
        key: obj.Key,
        slug: obj.Key?.replace(".mdx", ""),
        lastModified: obj.LastModified,
      })) || []
    );
  } catch (error) {
    console.error("S3 파일 목록 조회 실패:", error);
    console.error("Error details:", JSON.stringify(error, null, 2));
    return [];
  }
}

export async function getPostBySlug(slug: string) {
  try {
    const key = `${slug}.mdx`;
    console.log("Finding S3 key:", key);

    const command = new GetObjectCommand({
      Bucket: "chiaksan-peaches",
      Key: key,
    });

    const response = await s3.send(command);
    const markdown = await response.Body?.transformToString();

    const { data: frontmatter, content } = matter(markdown || "");

    const processedContent = await remark()
      .use(remarkGfm)
      .use(remarkRehype)
      .use(rehypePrettyCode, {
        theme: "github-dark",
        keepBackground: true,
        defaultLang: "plaintext",
      })
      .use(rehypeStringify)
      .process(content);

    return {
      title:
        frontmatter?.title || slug.split("/").pop()?.replace(/-/g, " ") || slug,
      date: frontmatter?.date,
      tags: frontmatter?.tags,
      content: processedContent.toString(),
      slug: slug,
    };
  } catch (error) {
    console.error("S3에서 파일을 찾을 수 없습니다:", error);
    return {
      title: "404 NOT FOUND",
      content: "요청하신 포스트가 존재하지 않습니다.",
      slug: slug,
    };
  }
}
