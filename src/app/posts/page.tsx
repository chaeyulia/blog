import { getPostsList } from "@/utils/post";
import PostList from "@/components/PostList";

export default async function Posts() {
  const allPosts = await getPostsList();

  return <PostList allPosts={allPosts} />;
}
