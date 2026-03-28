import { getPostsList } from "@/utils/post";
import PostList from "@/components/PostList";

// 노션 이미지 URL 만료(1시간) 전에 갱신
export const revalidate = 3000;

export default async function Posts() {
  const allPosts = await getPostsList();

  return <PostList allPosts={allPosts} />;
}
