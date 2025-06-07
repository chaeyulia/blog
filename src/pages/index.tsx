import React from "react";
import FileTab from "../components/FileTab";
import type { HeadFC } from "gatsby";
import type { TabPosition } from "../components/FileTab";

interface File {
  number: number;
  category?: string;
  position?: TabPosition;
  to?: string;
  label?: string;
}
const FILE_LIST: File[] = [
  { number: 99, category: "About me", position: "left" },
  { number: 97, label: "이력서", position: "center", to: "/posts" },
  { number: 98, label: "포트폴리오", to: "/posts", position: "right" },
  // { number: 99, label: "🐰🥔?", position: "left" },
  { number: 100, category: "Posts" },
  // { number: 101, label: "전체 글", position: "right" },
  { number: 102, label: "🐞", position: "right" },
  { number: 103, label: "FE" },
  { number: 104, label: "BE", position: "left" },
  { number: 105, label: "공부", position: "right" },
  { number: 106, label: "회고" },
  { number: 107, label: "그 외", position: "left" },
  { number: 108, category: "Contact", position: "right" },
  { number: 109, label: "깃허브 🐱", position: "center" },
  { number: 110, label: "이메일 📩", position: "left" },
  // { number: 112, label: "🐥" },
];

const IndexPage = () => (
  <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
    <div>
      <div className="relative min-w-[260px] w-[60vw] max-w-[500px] h-[50vh] flex flex-col items-center justify-center">
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
    </div>
  </main>
);

export default IndexPage;

export const Head: HeadFC = () => <title>치악산 복숭아</title>;
