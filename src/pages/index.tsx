import React from "react";
import FileTab from "../components/FileTab";
import type { HeadFC } from "gatsby";
import type { TabPosition } from "../components/FileTab";
import { GITHUB_URL, EMAIL_ADDRESS } from "../constants/url";

interface File {
  number: string;
  category?: string;
  position?: TabPosition;
  to?: string;
  label?: string;
}
const FILE_LIST: File[] = [
  { number: "00", category: "About me", position: "left", to: "/about" },
  { number: "001", label: "이력서", position: "center", to: "/resume" },
  {
    number: "002",
    label: "포트폴리오",
    position: "right",
    to: "/my-portfolio",
  },
  { number: "01", category: "Contact", position: "left", to: "/contact" },
  { number: "011", label: "깃허브", position: "center", to: GITHUB_URL },
  {
    number: "012",
    label: "이메일",
    position: "right",
    to: `mailto:${EMAIL_ADDRESS}`,
  },
  { number: "02", category: "Posts", to: "/all-posts" },
  {
    number: "021",
    label: "버그 수정",
    to: "/bug-fix",
    position: "left",
  },
  { number: "022", label: "FE", position: "right", to: "/fe" },
  { number: "023", label: "BE", to: "/be" },
  { number: "024", label: "회고", to: "/retrospect", position: "left" },
  {
    number: "025",
    label: "그 외",
    position: "right",
    to: "/etc",
  },
];

const IndexPage = () => (
  <main className="container items-center justify-center">
    <div className="border border-black relative min-w-[260px] w-[60vw] max-w-[500px] h-[35vh] flex flex-col items-center justify-center border-b-0">
      {FILE_LIST.map((file, idx) => {
        return (
          <FileTab
            key={file.number}
            number={file.number}
            position={file.position}
            label={file.label}
            category={file.category}
            to={file.to}
            style={{
              top: idx * 25,
              zIndex: idx * 5,
              transform:
                "perspective(600px) rotateX(-40deg) translateZ(-25px) translateY(-5px)",
            }}
          />
        );
      })}
    </div>
    <div
      className="border border-black relative min-w-[260px] w-[66vw] h-[2vh] max-w-[540px] bg-white z-100"
      style={{
        transform:
          "perspective(300px) rotateX(2deg) translateZ(25px) translateY(-11px)",
      }}
    />
    <div
      className="flex items-center justify-center border border-black relative min-w-[260px] w-[66vw] max-w-[540px] h-[10vh] border-y-0 bg-white z-100"
      style={{
        transform:
          "perspective(300px) rotateX(-30deg) translateX(0px) translateZ(-2px) translateY(-14px)",
      }}
    >
      <div className="width-[30%] min-w-[200px] height-[50%] flex items-center justify-center border border-black">
        <span
          style={{
            transform: "perspective(300px) rotateX(-30deg)",
          }}
        >
          Chae Julia
        </span>
      </div>
    </div>
  </main>
);

export default IndexPage;

export const Head: HeadFC = () => <title>치악산 복숭아 기술 블로그</title>;
