import path from "node:path";
import type { NextConfig } from "next";

// Source of truth for the AMT bundle:
//  - production / deployed → real CDN bundle so we exercise the same code
//    path real clients hit
//  - dev → local `public/amt.js` mock so we can iterate on overlay tweaks
//    without redeploying the AMT CDN
export const AMT_URL =
  process.env.NODE_ENV === "production"
    ? "https://amt.adeptmind.ai/d1h7j8l9/amt.js"
    : "/amt.js";

// HPDP overlay's hero <img> URL. Must match exactly what amt.js fetches at
// runtime so the preload de-dupes against the actual request — otherwise the
// browser fetches twice.
const HERO_IMG_URL =
  "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80&auto=format";

const EARLY_HINTS: string = [
  "<https://amt.adeptmind.ai>; rel=preconnect",
  "<https://images.unsplash.com>; rel=preconnect; crossorigin",
  "<https://amt.adeptmind.ai/simple-ab-testing/index.global.js>; rel=preload; as=script",
  `<${AMT_URL}>; rel=preload; as=script`,
  // Make the HPDP overlay's LCP image discoverable in the initial HTTP
  // response so the browser starts fetching it before amt.js even loads.
  // Without this preload, Lighthouse flags the LCP as JS-discovered.
  `<${HERO_IMG_URL}>; rel=preload; as=image; fetchpriority=high`,
].join(", ");

const nextConfig: NextConfig = {
  // Emit a self-contained `.next/standalone/` server so the production
  // container doesn't need `node_modules/` at runtime.
  output: "standalone",
  // Monorepo root — lets standalone output trace workspace deps correctly.
  outputFileTracingRoot: path.join(__dirname, "../.."),
  experimental: {
    // Inline critical CSS into the HTML head so there's no render-blocking
    // CSS request between HTML and first paint. Trades a bit of HTML size
    // and build time for a shorter critical-request chain.
    optimizeCss: true,
  },
  images: {
    // AVIF first (~20% smaller than WebP on most photos), WebP fallback,
    // and finally the original format for browsers that support neither.
    formats: ["image/avif", "image/webp"],
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
