import React from "react";
import { Link } from "gatsby";

interface MenuProps {
  category?: string;
  to?: string;
  label?: string;
}
const Menu: React.FC<MenuProps> = ({ label, category, to }) => {
  const isCategory = !!category;
  const isDecoration = !to;
  const isInternal = to && to?.startsWith("/");

  const content = (
    <button
      className={`flex items-center rounded-4xl border px-5 py-2.5 hover:cursor-pointer ${
        isCategory ? "text-black bg-moss border-black" : "text-moss bg-gray-50"
      } ${isDecoration ? "bg-melon border-melon hover:cursor-default!" : ""}`}
    >
      <span className="text-2xl font-semibold">{category ?? label}</span>
    </button>
  );

  if (isInternal) return <Link to={to}>{content}</Link>;
  if (to) return <a href={to}>{content}</a>;
  return content;
};

export default Menu;
