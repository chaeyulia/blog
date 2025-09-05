import type { Metadata } from "next";
import "./globals.css";

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
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
