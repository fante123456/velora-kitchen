/**
 * Used only for the static (o2switch) build, where there is no Next.js image server.
 * Unsplash's CDN resizes each photo and serves AVIF/WebP to browsers that support them.
 */
export default function unsplashLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) {
  if (!src.startsWith("https://images.unsplash.com/")) return src;
  const url = new URL(src);
  url.search = "";
  url.searchParams.set("auto", "format");
  url.searchParams.set("fit", "max");
  url.searchParams.set("w", String(width));
  url.searchParams.set("q", String(quality ?? 70));
  return url.toString();
}
