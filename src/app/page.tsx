import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full p-6 gingham h-screen">
      <main className="flex flex-col w-max ml-auto text-center gap-4 text-sm font-semibold">
        <Link href="/about" className="flex flex-col gap-2">
          <Image src="/folder.png" alt="folder" width={100} height={127} />
          <span>채지원</span>
        </Link>

        <Link href="/posts" className="flex flex-col gap-2">
          <Image src="/folder.png" alt="folder" width={100} height={127} />
          <span>포스트</span>
        </Link>

        <a
          href="https://github.com/julia98percent"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-2"
        >
          <Image src="/github.png" alt="folder" width={90} height={90} />
          <span>깃허브</span>
        </a>
      </main>
    </div>
  );
}
