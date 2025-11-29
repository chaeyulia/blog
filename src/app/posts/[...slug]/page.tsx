import DesktopPost from "@/components/DesktopPost";
import MobilePost from "@/components/MobilePost";
import { getPostBySlug, getPostsList } from "@/utils/post";
import { Metadata } from "next";

// S3 데이터를 1시간마다 재검증 (ISR)
export const revalidate = 3600;

// 빌드 시 모든 포스트 페이지를 미리 생성
export async function generateStaticParams() {
  const posts = await getPostsList();

  return posts.map((post) => ({
    slug: post.slug?.split("/") || [],
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const slugPath = resolvedParams.slug.join("/");
  const post = await getPostBySlug(slugPath);

  const plainText = post.content.replace(/<[^>]*>/g, "").trim();
  const description =
    plainText.length > 200 ? plainText.substring(0, 200) + "..." : plainText;

  return {
    title: `치악산 복숭아 | ${post.title}`,
    description,
  };
}

export default async function Post({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const resolvedParams = await params;
  const slugPath = resolvedParams.slug.join("/");
  const post = await getPostBySlug(slugPath);
  return (
    <div className="h-screen flex gingham p-4">
      <div className="flex sm:hidden mx-auto w-full">
        <MobilePost post={post} />
      </div>
      <div className="hidden sm:flex mx-auto w-full">
        <DesktopPost post={post} />
      </div>
    </div>
  );
}
