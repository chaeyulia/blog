import React from "react";
import { Link } from "gatsby";

const posts = [
  { id: "1", title: "첫 번째 게시글", summary: "이것은 첫 번째 게시글입니다." },
  { id: "2", title: "두 번째 게시글", summary: "이것은 두 번째 게시글입니다." },
  { id: "3", title: "세 번째 게시글", summary: "이것은 세 번째 게시글입니다." },
];

const PostsPage = () => (
  <main className="min-h-screen bg-gray-50 flex flex-col items-center py-16">
    <h1 className="text-3xl font-bold mb-8">게시글 리스트</h1>
    <div className="w-full max-w-xl bg-white rounded-lg shadow p-6">
      <ul>
        {posts.map((post) => (
          <li key={post.id} className="mb-6 last:mb-0">
            <Link
              to={`/posts/${post.id}`}
              className="text-xl font-semibold text-blue-600 hover:underline"
            >
              {post.title}
            </Link>
            <p className="text-gray-600 mt-1">{post.summary}</p>
          </li>
        ))}
      </ul>
    </div>
  </main>
);

export default PostsPage;
