"use client";

import { useState } from "react";

const categories = [
  {
    id: "allPosts",
    name: "전체 글",
    prefix: "",
  },
  {
    id: "study",
    name: "알게된 것",
    prefix: "study/",
  },
  {
    id: "retrospective",
    name: "회고",
    prefix: "retrospective/",
  },
];

interface Post {
  key?: string;
  slug?: string;
  lastModified?: Date;
}

interface PostListProps {
  allPosts: Post[];
}

export default function PostList({ allPosts }: PostListProps) {
  const [selectedCategory, setSelectedCategory] = useState("allPosts");

  // 클라이언트에서 필터링
  const filteredPosts = allPosts.filter((post) => {
    const selectedCat = categories.find(cat => cat.id === selectedCategory);
    if (!selectedCat) return false;
    
    if (selectedCat.id === "allPosts") return true;
    return post.slug?.startsWith(selectedCat.prefix);
  });

  return (
    <div className="h-screen flex">
      {/* Left Sidebar */}
      <div className="w-1/3 bg-gray-50 border-r border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">카테고리</h2>
        </div>
        <nav className="p-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`w-full text-left p-3 rounded-lg mb-1 transition-colors ${
                selectedCategory === category.id
                  ? "bg-blue-100 text-blue-700"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              {category.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Right Content Area */}
      <div className="flex-1 bg-white">
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-800">
            {categories.find((cat) => cat.id === selectedCategory)?.name} 포스트
          </h1>
        </div>
        <div className="p-4">
          {filteredPosts.length > 0 ? (
            <ul className="space-y-3">
              {filteredPosts.map((post, index) => (
                <li
                  key={post.key || index}
                  className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <a href={`/posts/${post.slug}`} className="block">
                    <h3 className="text-gray-800 font-medium">
                      {post.slug?.split('/').pop()?.replace(/-/g, " ")}
                    </h3>
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">포스트가 없습니다.</p>
          )}
        </div>
      </div>
    </div>
  );
}