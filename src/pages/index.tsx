import React from "react";
import Menu from "../components/Menu";
import { GITHUB_URL, EMAIL_ADDRESS } from "../constants/url";
import { StaticImage } from "gatsby-plugin-image";
import SEO from "../components/SEO";

const MENU_LIST = [
  { category: "About me", to: "/about" },
  { label: "이력서", to: "/resume" },
  { label: "포트폴리오", to: "/my-portfolio" },
  { label: "🐰☘️💛" },
  { category: "Contact", to: "/contact" },
  { label: "깃허브", to: GITHUB_URL },
  { label: "이메일", to: `mailto:${EMAIL_ADDRESS}` },
  { category: "Posts", to: "/all-posts" },
  { label: "👩‍💻" },
  { label: "버그 수정", to: "/bug-fix" },
  { label: "FE", to: "/fe" },
  { label: "🏋️‍♂️🐱" },
  { label: "BE", to: "/be" },
  { label: "회고", to: "/retrospect" },
  { label: "그 외", to: "/etc" },
];

const IndexPage = () => (
  <main className="root center">
    <header className="flex gap-2 m-[1vw] items-center">
      <StaticImage
        src="../images/profile.png"
        alt="프로필 이미지"
        width={100}
        height={100}
        placeholder="blurred"
      />
      <h1 className="text-lg! text-medium! m-0!">치악산 복숭아 기술 블로그</h1>
    </header>
    <nav className="center gap-3 max-w-[50vw] flex-wrap">
      {MENU_LIST.map((file) => {
        return (
          <Menu
            key={file.label}
            label={file.label}
            category={file.category}
            to={file.to}
          />
        );
      })}
    </nav>
  </main>
);

export default IndexPage;

export const Head = () => <SEO />;
