import type { NextConfig } from "next";

const AMT_HINTS: string = [
  "<https://www.googletagmanager.com>; rel=preconnect",
  "<https://amt.adeptmind.ai>; rel=preconnect",
  "<https://amt.adeptmind.ai/d1h7j8l9/amt.js>; rel=preload; as=script",
].join(", ");

const PRODUCT_HINTS: string = [
  "<https://www.googletagmanager.com>; rel=preconnect",
  "<https://amt.adeptmind.ai>; rel=preconnect",
  "<https://amt.adeptmind.ai/simple-ab-testing/index.global.js>; rel=preload; as=script",
  "<https://amt.adeptmind.ai/d1h7j8l9/amt.js>; rel=preload; as=script",
].join(", ");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  async headers() {
    return [
      { source: "/:path*", headers: [{ key: "Link", value: AMT_HINTS }] },
      { source: "/product/:product*", headers: [{ key: "Link", value: PRODUCT_HINTS }] },
    ];
  },
};

export default nextConfig;
