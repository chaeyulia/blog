import WindowMenuList from "./WindowMenuList";

export default function DesktopPost({ post }: { post: any }) {
  return (
    <div
      id="parent"
      className="container w-full h-full max-h-[90vh] max-w-[900px] flex flex-col justify-start border rounded-4xl m-auto"
    >
      <div className="flex gap-4 items-center m-[21px_0_14px_26px]">
        <WindowMenuList />
        <h1 className="max-w-[70%] text-xl text-neutral-600 dark:text-neutral-200 font-bold truncate">
          {post.title}
        </h1>
      </div>

      <div className="mx-4 p-5 scrollbar overflow-y-auto content border-t border-neutral-300 dark:border-neutral-800">
        <div className="flex text-sm text-neutral-500 mb-2 gap-2">
          <span>{post.date}</span>
          <span
            className={`${
              post.slug?.split("/")[0] || (post.tags && post.tags.length > 0)
                ? "before:content-['/'] before:mr-2"
                : ""
            }`}
          >
            {post.slug?.split("/")[0] || ""}
            {post.tags && post.tags.length > 0 ? ", " : ""}
            {Array.isArray(post.tags) ? post.tags.join(", ") : post.tags}
          </span>
        </div>

        <div
          className="highlight"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
    </div>
  );
}
