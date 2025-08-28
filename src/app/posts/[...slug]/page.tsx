import { getPostBySlug } from "@/utils/post";

export default async function Post({ params }: { params: Promise<{ slug: string[] }> }) {
  const resolvedParams = await params;
  const slugPath = resolvedParams.slug.join('/');
  const post = await getPostBySlug(slugPath);
  return (
    <div>
      {post.title}
      {post.content}
    </div>
  );
}
