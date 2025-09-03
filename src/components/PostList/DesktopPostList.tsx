import Image from "next/image";
import { ChildProps } from "./PostList";
import { useState } from "react";
import WindowMenuList from "../WindowMenuList";

export default function DesktopPostList({
  posts,
  selectedCategory,
  setSelectedCategory,
  isSearchOpen,
  setIsSearchOpen,
  categories,
}: ChildProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBySearch = posts.filter((post) => {
    if (!searchTerm) return true;
    const title = post.slug?.split("/").pop()?.replace(/-/g, " ") || "";
    return title.toLowerCase().includes(searchTerm.toLowerCase());
  });
  return (
    <div
      id="parent"
      className="container w-full h-full max-h-[90vh] max-w-[900px] flex justify-center border rounded-4xl m-auto"
    >
      <div className="m-2 mr-0 w-1/2 xs:w-1/3 md:w-1/4 shadow-xl z-10 rounded-4xl bg-[#F9F9F9] dark:bg-[#202020] border border-white dark:border-[#1D1D1D] border-2">
        <div className="p-4">
          <WindowMenuList />
          <nav className="mt-8">
            {categories.map((category) => (
              <div
                key={category.id}
                className={`h-10 w-full gap-2 flex items-center text-left p-1 md:p-2 rounded-xl mb-1 transition-colors font-semibold ${
                  selectedCategory === category.id
                    ? "bg-[#F0EFEF] dark:bg-[#2D2D2D] text-cBlue"
                    : "hover:bg-[#f3f2f2] dark:hover:bg-[#3d3d3d] hover:cursor-pointer text-neutral-700 dark:text-neutral-100"
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <Image
                  src="/inner-folder.png"
                  alt="내부 폴더 이미지"
                  width={30}
                  height={28}
                  className={`xs:block p-1 ${
                    selectedCategory === category.id ? "" : "grayscale"
                  }`}
                />
                <span className="truncate">{category.name}</span>
              </div>
            ))}
          </nav>
        </div>
      </div>
      <div
        id="right-child"
        className="m-2 flex-1 p-4 pt-0 scrollbar overflow-y-auto"
      >
        <div className="sticky top-0 z-10 container border-b border-gray-200">
          <div className="flex items-center justify-between py-4 h-[70px]">
            <h1 className="text-lg font-bold">
              {categories.find((cat) => cat.id === selectedCategory)?.name}
            </h1>

            <div className="flex items-center overflow-hidden rounded-full shadow-lg dark:shadow-neutral-900">
              <div
                className={`transition-all duration-300 ease-in-out ${
                  isSearchOpen
                    ? "w-64 opacity-100"
                    : "w-[39px] rounded-full opacity-100 hover:bg-neutral-100 dark:bg-[#3d3d3d22] dark:hover:bg-[#3d3d3d]"
                }`}
              >
                {!isSearchOpen ? (
                  <button
                    onClick={() => setIsSearchOpen(true)}
                    className="p-2 rounded-full transition-colors duration-200"
                  >
                    <Image
                      src="/search.png"
                      alt="검색 버튼 이미지"
                      width={20}
                      height={20}
                    />
                  </button>
                ) : (
                  <div className="relative bg-white dark:bg-[#1f1f1f]">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <Image
                        src="/search.png"
                        alt="검색 버튼 이미지"
                        width={16}
                        height={16}
                      />
                    </div>
                    <input
                      type="text"
                      placeholder="검색"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 text-neutral-500 text-sm font-medium rounded-full focus:ring-3 focus:ring-inset focus:ring-[#91AFF2ee] focus:outline-none"
                      onBlur={() =>
                        setTimeout(() => setIsSearchOpen(false), 150)
                      }
                      autoFocus
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-4 text-sm font-semibold text-neutral-600 pb-2">
            <div className="col-span-6">제목</div>
            <div className="col-span-3">최근 수정일</div>
            <div className="col-span-3">카테고리</div>
          </div>
        </div>

        <div>
          {filteredBySearch.length > 0 ? (
            <div>
              {filteredBySearch.map((post, index) => (
                <a
                  key={post.key || index}
                  href={`/posts/${post.slug}`}
                  className={`grid grid-cols-12 gap-4 p-3 rounded-lg hover:bg-neutral-200 dark:hover:bg-[#3d3d3d] cursor-pointer transition-colors ${
                    index % 2 === 1 ? "bg-[#F4F5F5] dark:bg-[#292929]" : ""
                  }`}
                >
                  <div className="col-span-6">
                    <h3 className="font-medium">
                      {post.slug?.split("/").pop()?.replace(/-/g, " ")}
                    </h3>
                  </div>
                  <div className="col-span-3 text-sm text-neutral-500">
                    {post.lastModified
                      ? post.lastModified.toLocaleDateString("ko-KR", {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                        })
                      : "날짜 없음"}
                  </div>
                  <div className="col-span-3 text-sm text-neutral-500">
                    <span className="inline-block text-xs">
                      {post.slug?.split("/")[0] || "-"}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <p className="text-neutral-500 text-center py-8">
              포스트가 없습니다.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
