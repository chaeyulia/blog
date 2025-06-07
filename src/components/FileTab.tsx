import React from "react";
import { Link } from "gatsby";

export type TabPosition = "left" | "center" | "right";

interface FileTabProps {
  number: number;
  label?: string;
  category?: string;
  style?: React.CSSProperties;
  to?: string;
  position?: TabPosition;
}

const getTabPositionStyle = (position: TabPosition = "center") => {
  if (position === "left") return "left-[40px]";
  if (position === "right") return "right-[40px]";
  return "left-1/2 transform -translate-x-1/2";
};

const FileTab: React.FC<FileTabProps> = ({
  number,
  label = "",
  category,
  style,
  to,
  position = "center",
}) => {
  const isSpecialNumber = !!category;

  const content = (
    <div
      className={`absolute left-0 w-full max-w-[500px] h-[50px] bg-white rounded-t-lg flex items-center px-4 mb-[-20px] border border-black cursor-pointer transition rounded-[6px 6px 8px 8px] group ${
        isSpecialNumber
          ? "hover:bg-neutral-700 [&:has(div:hover)]:bg-neutral-700"
          : "hover:bg-gray-100 [&:has(div:hover)]:bg-gray-100"
      }`}
      style={style}
    >
      <div style={{ margin: "25px 0px" }}>
        <div
          className={`absolute inline-block transform-3d border border-black border-b-0 rounded-t-lg top-[-32px] whitespace-nowrap transition-colors ${
            category
              ? "bg-black text-white hover:bg-neutral-700 group-hover:bg-neutral-700"
              : "bg-white text-black hover:bg-gray-100 group-hover:bg-gray-100"
          } ${getTabPositionStyle(position)}`}
          style={{
            padding: "10px 30px",
            transform:
              "perspective(300px) rotateX(34deg) translateZ(25px) translateY(5px)",
          }}
        >
          <span className="text-base">
            {number} {category ?? label}
          </span>
        </div>
      </div>
    </div>
  );

  return to ? <Link to={to}>{content}</Link> : content;
};

export default FileTab;
