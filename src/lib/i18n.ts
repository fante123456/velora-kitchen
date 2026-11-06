/** Two languages: French is the default (no prefix), English lives under /en. */
export type Locale = "fr" | "en";

export const locales: Locale[] = ["fr", "en"];

/** "/menu" → "/menu" (fr) or "/en/menu" (en). */
export function localePath(locale: Locale, path: string) {
  if (locale === "fr") return path;
  return path === "/" ? "/en" : `/en${path}`;
}

/** "/en/menu" → "/menu", "/en" → "/". */
export function basePath(pathname: string) {
  if (pathname === "/en" || pathname === "/en/") return "/";
  return pathname.startsWith("/en/") ? pathname.slice(3) : pathname;
}

export function localeFromPath(pathname: string): Locale {
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "fr";
}
