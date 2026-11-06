"use client";

import { useEffect } from "react";
import type { Locale } from "@/lib/i18n";

/**
 * The root <html> is rendered once with lang="fr". The English pages are also wrapped in
 * lang="en"; this keeps <html lang> in sync after client-side navigation between languages.
 */
export function HtmlLang({ locale }: { locale: Locale }) {
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);
  return null;
}
