"use client";

import Image from "next/image";
import Link from "next/link";

export default function WindowMenuList() {
  const handleExpandButtonClick = () =>
    document.documentElement.requestFullscreen();

  return (
    <div className="flex gap-3">
      <Link href="/">
        <Image
          src="/menu-red.png"
          alt="뒤로 가기 버튼 이미지"
          width={18}
          height={18}
        />
      </Link>

      <Image
        src="/menu-yellow.png"
        alt="장식용 버튼 이미지"
        width={18}
        height={18}
      />

      <Image
        src="/menu-green.png"
        alt="전체 화면 버튼 이미지"
        className="hover:cursor-pointer"
        onClick={handleExpandButtonClick}
        width={18}
        height={18}
      />
    </div>
  );
}
