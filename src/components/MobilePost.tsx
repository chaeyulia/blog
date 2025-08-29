export default function MobilePost({ post }: { post: any }) {
  return (
    <div className="relative w-full max-w-[95vw] h-full max-h-[95vh] bg-[#FEFEFE] rounded-4xl border border-[#B9B9B9] rounded-4xl overflow-hidden">
      <h1 className="text-center mx-auto max-w-[80%] text-base text-neutral-600 font-semibold truncate py-1">
        {post.title}
      </h1>

      <div className="h-full p-4 sm:p-5 overflow-y-auto content border-t border-neutral-300">
        <h1 className="mx-0! max-w-fit relative">
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
  );
}
