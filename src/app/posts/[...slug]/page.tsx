import DesktopPost from "@/components/DesktopPost";
import MobilePost from "@/components/MobilePost";
import { getPostBySlug } from "@/utils/post";

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
      <div className="flex sm:hidden mx-auto w-full">
        <MobilePost post={post} />
      </div>
      <div className="hidden sm:flex mx-auto w-full">
        <DesktopPost post={post} />
      </div>
    </div>
  );
}
