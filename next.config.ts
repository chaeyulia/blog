import type { NextConfig } from "next";
import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],

  // 이미지 최적화 설정
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // 프로덕션 환경에서 console.log 제거
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  // 리다이렉트 설정
  async redirects() {
    return [
      {
        source: "/portfolio",
        destination: "https://plausible-bar-5d8.notion.site/261f697e691e809585abf8431b72d3fb?pvs=74",
        permanent: true, // 308 permanent redirect
      },
    ];
  },

  // 번들 최적화
  webpack: (config) => {
    // AWS SDK를 서버 전용으로 표시
    config.externals = config.externals || [];
    if (!Array.isArray(config.externals)) {
      config.externals = [config.externals];
    }

    return config;
  },
};

export default withBundleAnalyzer(nextConfig);
