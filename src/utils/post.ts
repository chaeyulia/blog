import {
  S3Client,
  GetObjectCommand,
  ListObjectsV2Command,
} from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: "ap-northeast-2",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function getPostsList(prefix?: string) {
  try {
    console.log('AWS keys available:', {
      accessKey: !!process.env.AWS_ACCESS_KEY_ID,
      secretKey: !!process.env.AWS_SECRET_ACCESS_KEY
    });

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
    // slug는 전체 경로 포함 (예: "study/react-hooks-etc")
    const key = `${slug}.mdx`;
    console.log('Finding S3 key:', key);
    
    const command = new GetObjectCommand({
      Bucket: "chiaksan-peaches",
      Key: key,
    });

    const response = await s3.send(command);
    const markdown = await response.Body?.transformToString();

    return {
      title: slug.replace(/-/g, " "),
      content: markdown,
      slug: slug,
    };
  } catch (error) {
    console.error("S3에서 파일을 찾을 수 없습니다:", error);
    return {
      title: "포스트를 찾을 수 없습니다",
      content: "요청하신 포스트가 존재하지 않습니다.",
      slug: slug,
    };
  }
}
