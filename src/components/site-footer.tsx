import Link from "next/link";
import { navLinks, openingHours, site } from "@/lib/site";
import { WaveDivider } from "./ui";

export function SiteFooter() {
  return (
    <footer className="bg-charcoal text-cream">
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-5 pt-16 pb-10 sm:px-8 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:gap-10">
        <div>
          <p className="font-serif text-3xl">
            Velora <span className="italic text-beige">Kitchen</span>
          </p>
          <WaveDivider className="mt-4" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream-muted">{site.tagline}. Seasonal cooking in the heart of Manchester.</p>
        </div>

        <div>
          <h2 className="text-xs font-medium uppercase tracking-[0.2em] text-terracotta">Visit</h2>
          <address className="mt-4 text-sm leading-relaxed text-cream-muted not-italic">
            {site.address.street}
            <br />
            {site.address.city}, {site.address.postcode}
            <br />
            {site.address.country}
          </address>
          <p className="mt-4 space-y-1 text-sm">
            <a href={site.phoneHref} className="block text-cream underline-offset-4 hover:underline">
              {site.phone}
            </a>
            <a href={`mailto:${site.email}`} className="block break-all text-cream underline-offset-4 hover:underline">
              {site.email}
            </a>
          </p>
        </div>

        <div>
          <h2 className="text-xs font-medium uppercase tracking-[0.2em] text-terracotta">Opening hours</h2>
          <dl className="mt-4 space-y-2 text-sm">
            {openingHours.map((row) => (
              <div key={row.days}>
                <dt className="text-cream-muted">{row.days}</dt>
                <dd className="text-cream">{row.time}</dd>
              </div>
            ))}
          </dl>
        </div>

        <nav aria-label="Footer">
          <h2 className="text-xs font-medium uppercase tracking-[0.2em] text-terracotta">Explore</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-cream-muted transition-colors hover:text-cream">
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/contact#book" className="text-cream-muted transition-colors hover:text-cream">
                Book a table
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="border-t border-cream/10">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-5 py-6 text-xs leading-relaxed text-cream-muted sm:px-8 md:flex-row md:justify-between">
          <p>© 2026 Velora Kitchen. A fictional restaurant created for MX AI Academy Challenge 2.</p>
          <p>
            Photography from Unsplash.{" "}
            <Link href="/gallery#credits" className="text-cream underline underline-offset-4">
              Photo credits
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
