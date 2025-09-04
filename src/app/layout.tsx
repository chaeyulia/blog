import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "치악산 복숭아",
  description: "치악산에서 자생하는 복숭아입니다.",
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
