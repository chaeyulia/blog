import { getPostsList } from "@/utils/post";
import PostList from "@/components/PostList";

// S3 데이터를 1시간마다 재검증 (ISR)
export const revalidate = 3600;

export default async function Posts() {
  const allPosts = await getPostsList();

  return <PostList allPosts={allPosts} />;
}
