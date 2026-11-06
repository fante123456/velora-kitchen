import type { Metadata } from "next";
import { localePath, type Locale } from "./i18n";
import { site } from "./site";

// Page-level openGraph replaces the root one, so the shared image is restated here.
const shareImage = {
  url: "/opengraph-image.png",
  width: 1200,
  height: 630,
  alt: "le 9bourg, restaurant de cuisine française faite maison à Saint-Lô",
};

/** Per-page title, description, canonical URL and Open Graph in one place. */
export function pageMetadata({
  locale,
  title,
  description,
  path,
  absoluteTitle,
}: {
  locale: Locale;
  title: string;
  description: string;
  path: string;
  /** Use this exact title instead of "<title> | Le 9bourg" (home pages). */
  absoluteTitle?: boolean;
}): Metadata {
  const url = localePath(locale, path);
  const fullTitle = absoluteTitle ? title : `${title} | ${site.name}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical: url,
      languages: { fr: localePath("fr", path), en: localePath("en", path) },
    },
    openGraph: {
      type: "website",
      locale: locale === "fr" ? "fr_FR" : "en_GB",
      siteName: site.name,
      url,
      title: fullTitle,
      description,
      images: [shareImage],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [shareImage],
    },
  };
}
