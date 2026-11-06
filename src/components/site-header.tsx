"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { basePath, localePath, type Locale } from "@/lib/i18n";
import { navLinks, site } from "@/lib/site";
import { Logo } from "./ui";

const copy = {
  fr: {
    home: "le 9bourg, accueil",
    nav: "Navigation principale",
    mobileNav: "Navigation mobile",
    open: "Ouvrir le menu",
    close: "Fermer le menu",
    book: "Réserver",
    bookLabel: `Réserver, appeler le ${site.phone}`,
    language: "Choisir la langue",
  },
  en: {
    home: "le 9bourg, home",
    nav: "Main",
    mobileNav: "Mobile",
    open: "Open menu",
    close: "Close menu",
    book: "Book",
    bookLabel: `Book, call ${site.phone}`,
    language: "Choose language",
  },
} satisfies Record<Locale, Record<string, string>>;

function isActive(current: string, href: string) {
  return href === "/" ? current === "/" : current.startsWith(href);
}

function LanguageSwitch({ locale, current, label }: { locale: Locale; current: string; label: string }) {
  const options = [
    { code: "fr" as const, text: "FR", name: "Français" },
    { code: "en" as const, text: "EN", name: "English" },
  ];
  return (
    <nav aria-label={label}>
      <ul className="flex items-center text-sm">
        {options.map((option, index) => (
          <li key={option.code} className="flex items-center">
            {index > 0 ? (
              <span className="px-1 text-cream/40" aria-hidden="true">
                |
              </span>
            ) : null}
            <Link
              href={localePath(option.code, current)}
              hrefLang={option.code}
              lang={option.code}
              aria-current={option.code === locale ? "true" : undefined}
              title={option.name}
              className={`inline-flex min-h-11 min-w-9 items-center justify-center rounded-full px-1.5 font-medium transition-colors hover:text-cream ${
                option.code === locale ? "text-cream underline decoration-terracotta underline-offset-4" : "text-cream-muted"
              }`}
            >
              {option.text}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function SiteHeader({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  // On the 404 page the pathname is "/_not-found": switch languages via the home pages instead.
  const current = pathname.includes("_not-found") ? "/" : basePath(pathname);
  const t = copy[locale];
  const links = navLinks[locale];
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-cream/10 bg-charcoal text-cream">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-5 sm:h-20 sm:px-8 lg:gap-6">
        <Link
          href={localePath(locale, "/")}
          aria-label={t.home}
          className="text-2xl sm:text-[1.7rem]"
          onClick={() => setOpen(false)}
        >
          <Logo />
        </Link>

        <nav aria-label={t.nav} className="hidden lg:block">
          <ul className="flex items-center gap-8 text-sm">
            {links.map((link) => {
              const active = isActive(current, link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={localePath(locale, link.href)}
                    aria-current={active ? "page" : undefined}
                    className={`relative py-2 transition-colors hover:text-cream ${
                      active
                        ? "text-cream after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:bg-terracotta"
                        : "text-cream-muted"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-1 sm:gap-3">
          <LanguageSwitch locale={locale} current={current} label={t.language} />
          <a
            href={site.phoneHref}
            aria-label={t.bookLabel}
            className="hidden min-h-11 items-center gap-2 rounded-full bg-terracotta-deep px-5 text-sm font-medium text-cream transition-colors hover:bg-terracotta-dark sm:inline-flex"
          >
            <Phone className="size-4" aria-hidden="true" />
            {t.book}
          </a>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-full border border-cream/20 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? t.close : t.open}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      <nav
        id="mobile-nav"
        aria-label={t.mobileNav}
        hidden={!open}
        className="border-t border-cream/10 bg-charcoal lg:hidden"
      >
        <ul className="mx-auto w-full max-w-6xl px-5 py-4 sm:px-8">
          {links.map((link) => {
            const active = isActive(current, link.href);
            return (
              <li key={link.href}>
                <Link
                  href={localePath(locale, link.href)}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setOpen(false)}
                  className={`flex min-h-12 items-center justify-between border-b border-cream/10 font-serif text-2xl ${
                    active ? "text-cream" : "text-cream-muted"
                  }`}
                >
                  {link.label}
                  {active ? <span className="size-1.5 rounded-full bg-terracotta" aria-hidden="true" /> : null}
                </Link>
              </li>
            );
          })}
          <li className="pt-5">
            <a
              href={site.phoneHref}
              className="flex min-h-12 items-center justify-center gap-2 rounded-full bg-terracotta-deep text-sm font-medium text-cream"
            >
              <Phone className="size-4" aria-hidden="true" />
              {t.book} · {site.phone}
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
