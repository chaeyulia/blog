export const categories = [
  {
    id: "allPosts",
    name: "전체 글",
    prefix: "",
  },
  {
    id: "study",
    name: "알게된 것",
    prefix: "study/",
  },
  {
    id: "retrospective",
    name: "회고",
    prefix: "retrospective/",
  },
] as const;

export type CategoryId = (typeof categories)[number]["id"];
export type Category = (typeof categories)[number];
export type Categories = typeof categories;
