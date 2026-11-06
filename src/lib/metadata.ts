import type { Metadata } from "next";
import { site } from "./site";

// Page-level openGraph replaces the root one, so the shared image is restated here.
const shareImage = {
  url: "/opengraph-image.png",
  width: 1200,
  height: 630,
  alt: "Velora Kitchen, modern restaurant in Manchester. Modern flavours, warm atmosphere.",
};

/** Per-page title, description, canonical URL and Open Graph in one place. */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "en_GB",
      siteName: site.name,
      url: path,
      title: `${title} | ${site.name}`,
      description,
      images: [shareImage],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${site.name}`,
      description,
      images: [shareImage],
    },
  };
}
