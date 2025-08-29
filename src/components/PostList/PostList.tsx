"use client";

import { useState } from "react";
import DesktopPostList from "./DesktopPostList";
import MobilePostList from "./MobilePostList";
import { categories, CategoryId, Categories } from "@/constants/categories";

interface Post {
  key?: string;
  slug?: string;
  lastModified?: Date;
}

interface PostListProps {
  allPosts: Post[];
}

export interface ChildProps {
  posts: Post[];
  selectedCategory: CategoryId;
  setSelectedCategory: React.Dispatch<React.SetStateAction<CategoryId>>;
  isSearchOpen: boolean;
  setIsSearchOpen: React.Dispatch<React.SetStateAction<boolean>>;
  categories: Categories;
}

export default function PostList({ allPosts }: PostListProps) {
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryId>("allPosts");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const filteredPosts = allPosts.filter((post) => {
    const selectedCat = categories.find((cat) => cat.id === selectedCategory);
    if (!selectedCat) return false;

    if (selectedCat.id === "allPosts") return true;
    return post.slug?.startsWith(selectedCat.prefix);
  });

  return (
    <div className="h-screen flex gingham p-4">
      <div className="flex sm:hidden mx-auto w-full">
        <MobilePostList
          posts={filteredPosts}
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          isSearchOpen={isSearchOpen}
          setIsSearchOpen={setIsSearchOpen}
        />
      </div>
      <div className="hidden sm:flex mx-auto w-full">
        <DesktopPostList
          posts={filteredPosts}
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          isSearchOpen={isSearchOpen}
          setIsSearchOpen={setIsSearchOpen}
        />
      </div>
    </div>
  );
}
