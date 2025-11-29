import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";

const notoSansKR = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-noto-sans-kr",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://julia98percent.me"),
  title: "치악산 복숭아",
  description: "치악산에서 자생하는 복숭아입니다.",
  openGraph: {
    siteName: "치악산 복숭아",
    type: "website",
    url: "/",
    images: [
      {
        url: "/thumbnail.png",
        width: 1200,
        height: 630,
        alt: "치악산 복숭아",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "치악산 복숭아",
    description: "치악산에서 자생하는 복숭아입니다.",
    images: [
      {
        url: "/thumbnail.png",
        alt: "치악산 복숭아",
      },
    ],
  },
  verification: {
    google: "nj0jOcskW_ukZJZzqX7x_GO_H3Zw0SRPHbIOAOk8g3Y",
    other: {
      "naver-site-verification": "c1d31cf929409ffafd788778948bb224f23ed84f",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={notoSansKR.variable}>
      <body className={notoSansKR.className}>{children}</body>
    </html>
  );
}
