import React from "react";
import FileTab from "../components/FileTab";
import type { HeadFC } from "gatsby";
import type { TabPosition } from "../components/FileTab";

interface File {
  number: string;
  category?: string;
  position?: TabPosition;
  to?: string;
  label?: string;
}
const FILE_LIST: File[] = [
  { number: "00", category: "About me", position: "left" },
  { number: "001", label: "이력서", position: "center", to: "/posts" },
  { number: "002", label: "포트폴리오", to: "/posts", position: "right" },
  // { number: 99, label: "🐰🥔?", position: "left" },
  { number: "01", category: "Posts" },
  // { number: 101, label: "전체 글", position: "right" },
  { number: "011", label: "삽질", position: "right" },
  { number: "012", label: "FE" },
  { number: "013", label: "BE", position: "left" },
  { number: "014", label: "공부", position: "right" },
  { number: "015", label: "회고" },
  { number: "016", label: "그 외", position: "left" },
  { number: "02", category: "Contact", position: "right" },
  { number: "021", label: "깃허브", position: "center" },
  { number: "022", label: "이메일", position: "left" },
  // { number: 112, label: "🐥" },
];

const IndexPage = () => (
  <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
    <div className="border border-black relative min-w-[260px] w-[60vw] max-w-[500px] h-[36.4vh] flex flex-col items-center justify-center border-b-0">
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
              top: idx * 22,
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
          Chae Yulia
        </span>
      </div>
    </div>
  </main>
);

export default IndexPage;

export const Head: HeadFC = () => <title>치악산 복숭아</title>;
