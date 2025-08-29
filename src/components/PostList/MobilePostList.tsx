import Image from "next/image";
import { ChildProps } from "./PostList";
import { useState } from "react";

export default function MobilePostList({
  posts,
  selectedCategory,
  setSelectedCategory,

  categories,
}: ChildProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBySearch = posts.filter((post) => {
    if (!searchTerm) return true;
    const title = post.slug?.split("/").pop()?.replace(/-/g, " ") || "";
    return title.toLowerCase().includes(searchTerm.toLowerCase());
  });
  return (
    <div className="relative w-full max-w-[95vw] h-full max-h-[95vh] bg-[#FEFEFE] rounded-4xl border border-[#B9B9B9] rounded-4xl overflow-hidden">
      <div className="h-full m-2 pt-0">
        <div className="sticky top-0 z-10 bg-white p-4 pb-0">
          <div className="flex flex-col items-left py-4 gap-4">
            <h1 className="text-xl font-bold text-neutral-700">
              {categories.find((cat) => cat.id === selectedCategory)?.name}
            </h1>

            <div className="flex items-center overflow-hidden rounded-full bg-[#F5F5F4] shadow-sm focus-within:bg-white transition-all">
              <div className="w-full transition-all duration-300 ease-in-out w-64">
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <Image
                      src="/search.png"
                      alt="search"
                      width={16}
                      height={16}
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="검색"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 text-neutral-500 text-sm font-medium rounded-full focus:ring-1 focus:ring-inset focus:ring-white focus:outline-none "
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {filteredBySearch.length > 0 ? (
          <div className="h-full overflow-y-auto">
            {filteredBySearch.map((post, index) => (
              <a
                key={post.key || index}
                href={`/posts/${post.slug}`}
                className="flex flex-col p-3 hover:bg-neutral-100 cursor-pointer transition-colors border-b border-neutral-200"
              >
                <h3 className="text-gray-800 font-medium text-base">
                  {post.slug?.split("/").pop()?.replace(/-/g, " ")}
                </h3>

                <div className="flex items-center text-xs text-gray-500">
                  {post.lastModified
                    ? post.lastModified.toLocaleDateString("ko-KR", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      })
                    : "날짜 없음"}
                  <span className="mx-1">-</span>
                  <span>{post.slug?.split("/")[0] || ""}</span>
                </div>
              </a>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-8">포스트가 없습니다.</p>
        )}
      </div>
      <nav className="bg-white w-4/5 absolute bottom-4 left-1/2 -translate-x-1/2 flex p-1 rounded-full shadow-lg z-10">
        {categories.map((category) => (
          <div
            key={category.id}
            className={`w-full flex flex-col items-center p-1 rounded-full transition-colors font-semibold ${
              selectedCategory === category.id
                ? "bg-[#F0EFEF] text-cBlue"
                : "hover:bg-[#f3f2f2] hover:cursor-pointer text-neutral-700"
            }`}
            onClick={() => setSelectedCategory(category.id)}
          >
            <Image
              src="/inner-folder.png"
              alt="menu"
              width={25}
              height={20}
              className={`xs:block p-1 ${
                selectedCategory === category.id ? "" : "grayscale"
              }`}
            />
            <span className="text-xs">{category.name}</span>
          </div>
        ))}
      </nav>
    </div>
  );
}
