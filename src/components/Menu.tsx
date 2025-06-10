import React from "react";
import { Link } from "gatsby";

interface MenuProps {
  category?: string;
  to?: string;
  label?: string;
}
const FileTab: React.FC<MenuProps> = ({ label = "", category, to }) => {
  const isSpecialNumber = !!category;

  const content = (
    <button
      className={`flex items-center rounded-4xl border px-5 py-2.5 hover:cursor-pointer ${
        isSpecialNumber
          ? "text-black bg-moss border-black"
          : "text-moss bg-gray-50"
      }`}
    >
      <span className="text-2xl font-semibold">{category ?? label}</span>
    </button>
  );

  return to ? <Link to={to}>{content}</Link> : content;
};

export default FileTab;
