import type { NextConfig } from "next";

/**
 * Two build targets:
 * - default: Vercel (server image optimisation, AVIF/WebP via next/image)
 * - STATIC_EXPORT=1: plain HTML/CSS/JS for shared hosting such as o2switch.
 *   Images are resized by Unsplash's own CDN through a custom loader instead.
 *   STATIC_BASE_PATH sets the subfolder, e.g. "/velora-kitchen".
 */
const isStaticExport = process.env.STATIC_EXPORT === "1";
const basePath = process.env.STATIC_BASE_PATH || undefined;

const nextConfig: NextConfig = {
  // Cache Components need a Next.js server, so they are off for the static export.
  cacheComponents: !isStaticExport,
  partialPrefetching: !isStaticExport,
  ...(isStaticExport
    ? {
        output: "export",
        trailingSlash: true,
        basePath,
        images: {
          loader: "custom",
          loaderFile: "./src/lib/unsplash-loader.ts",
        },
      }
    : {
        images: {
          // Only Unsplash photos with our exact source query string can be optimised.
          remotePatterns: [
            {
              protocol: "https",
              hostname: "images.unsplash.com",
              pathname: "/photo-*",
              search: "?fm=jpg&q=80&w=2000&fit=max",
            },
          ],
          formats: ["image/avif", "image/webp"],
          qualities: [70, 75],
        },
      }),
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
