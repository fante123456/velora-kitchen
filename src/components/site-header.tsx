"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/lib/site";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function SiteHeader() {
  const pathname = usePathname();
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
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-6 px-5 sm:h-20 sm:px-8">
        <Link
          href="/"
          className="font-serif text-xl tracking-tight sm:text-2xl"
          onClick={() => setOpen(false)}
        >
          Velora <span className="italic text-beige">Kitchen</span>
        </Link>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-8 text-sm">
            {navLinks.map((link) => {
              const active = isActive(pathname, link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
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

        <div className="flex items-center gap-2">
          <Link
            href="/contact#book"
            className="hidden min-h-11 items-center rounded-full bg-terracotta-deep px-5 text-sm font-medium text-cream transition-colors hover:bg-terracotta-dark sm:inline-flex"
          >
            Book a table
          </Link>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-full border border-cream/20 md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      <nav
        id="mobile-nav"
        aria-label="Mobile"
        hidden={!open}
        className="border-t border-cream/10 bg-charcoal md:hidden"
      >
        <ul className="mx-auto w-full max-w-6xl px-5 py-4 sm:px-8">
          {navLinks.map((link) => {
            const active = isActive(pathname, link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
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
            <Link
              href="/contact#book"
              onClick={() => setOpen(false)}
              className="flex min-h-12 items-center justify-center rounded-full bg-terracotta-deep text-sm font-medium text-cream"
            >
              Book a table
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
