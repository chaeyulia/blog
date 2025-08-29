import { getPostBySlug } from "@/utils/post";
import Image from "next/image";

export default async function Post({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const resolvedParams = await params;
  const slugPath = resolvedParams.slug.join("/");
  const post = await getPostBySlug(slugPath);
  return (
    <div className="h-screen flex gingham p-4">
      <div
        id="parent"
        className="w-full h-full max-h-[90vh] my-auto mx-4 max-w-[900px] flex flex-col justify-start h-full bg-white rounded-4xl m-auto border border-[#B9B9B9] rounded-4xl mx-auto"
      >
        <div className="flex gap-4 items-center m-[23px_0_14px_27px]">
          <img src="/menu.png" alt="folder" width={80} height={20} />
          <h1 className="max-w-[70%] text-lg text-neutral-600 font-bold truncate">
            {post.title}
          </h1>
        </div>

        <div className="p-5 scrollbar overflow-y-auto content border-t border-neutral-300">
          <h1 className="ml-0! max-w-fit relative">
            <span className="relative title">{post.title}</span>
          </h1>

          <div className="flex text-sm text-neutral-500 mb-2 gap-2">
            <span>{post.date}</span>
            <span
              className={`${
                post.tags && post.tags.length > 0
                  ? "before:content-['/'] before:mr-2"
                  : ""
              }`}
            >
              {Array.isArray(post.tags) ? post.tags.join(", ") : post.tags}
            </span>
          </div>

          <div
            className="highlight"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </div>
    </div>
  );
}
