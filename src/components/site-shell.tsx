import type { ReactNode } from "react";
import type { Locale } from "@/lib/i18n";
import { HtmlLang } from "./html-lang";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

const copy = {
  fr: { skip: "Aller au contenu", banner: "Projet d'entraînement – site non officiel" },
  en: { skip: "Skip to content", banner: "Practice project – unofficial website" },
} satisfies Record<Locale, Record<string, string>>;

/** Demo banner, skip link, header, page and footer for one language. */
export function SiteShell({ locale, children }: { locale: Locale; children: ReactNode }) {
  const t = copy[locale];
  return (
    <div lang={locale} className="flex min-h-dvh flex-col">
      <HtmlLang locale={locale} />
      <a
        href="#main"
        className="sr-only z-50 rounded-full bg-cream px-4 py-2 text-sm text-charcoal focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        {t.skip}
      </a>
      <p className="bg-beige px-5 py-2 text-center text-xs font-medium tracking-wide text-charcoal">{t.banner}</p>
      <SiteHeader locale={locale} />
      <main id="main" className="flex-1">
        {children}
      </main>
      <SiteFooter locale={locale} />
    </div>
  );
}
