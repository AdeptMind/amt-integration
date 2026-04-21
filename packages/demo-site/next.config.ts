import type { NextConfig } from "next";

const EARLY_HINTS: string = [
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
      {
        source: "/:path(hpdp|hpdp-gtm-optimized)",
        headers: [{ key: "Link", value: EARLY_HINTS }],
      },
    ];
  },
};

export default nextConfig;
