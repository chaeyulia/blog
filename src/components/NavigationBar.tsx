import React from "react";
import { navigate } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";

const MENUS = [
  { url: "about", label: "About me" },
  { url: "all-posts", label: "Posts" },
  { url: "contact", label: "Contact" },
];

export default function NavigationBar() {
  const handleCategoryChange = (categoryId: string) => {
    navigate(`/${categoryId == "home" ? "" : categoryId}`);
  };

  return (
    <nav className="flex items-center pb-4 justify-between">
      <div
        className="flex gap-2 items-center hover:cursor-pointer"
        onClick={() => navigate("/")}
      >
        <StaticImage
          src="../images/profile.png"
          alt="로고 이미지"
          width={40}
          height={40}
          placeholder="blurred"
        />

        <h1 className="text-sm! sm:text-lg! hidden sm:inline">치악산 복숭아</h1>
      </div>
      <div className="flex gap-4">
        {MENUS.map(({ url, label }) => (
          <button
            key={url}
            onClick={() => handleCategoryChange(url)}
            className={"text-sm sm:text-lg hover:cursor-pointer"}
          >
            {label}
          </button>
        ))}
      </div>
    </nav>
  );
}
