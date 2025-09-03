export default function MobilePost({ post }: { post: any }) {
  console.log(post.slug?.split("/")[0]);
  return (
    <div className="container relative w-full max-w-[95vw] h-full max-h-[95vh] bg-[#FEFEFE] border rounded-4xl overflow-hidden">
      <h1 className="py-2 text-center mx-auto max-w-[80%] text-base font-semibold truncate py-1">
        {post.title}
      </h1>

      <div className="h-full p-4 sm:p-5 overflow-y-auto content pb-12">
        <h1 className="mx-0! max-w-fit relative">
          <span className="relative title">{post.title}</span>
        </h1>

        <div
          className={`flex text-sm text-neutral-500 mb-2
            ${
              Array.isArray(post.tags)
                ? "flex-col items-start"
                : "flex-row items-center"
            }
            `}
        >
          <span className="mr-2">{post.date}</span>
          <span
            className={`${
              post.tags && post.tags.length > 0
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
