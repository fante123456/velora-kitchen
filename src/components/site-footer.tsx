import Link from "next/link";
import { localePath, type Locale } from "@/lib/i18n";
import { navLinks, openingHoursSummary, site, tagline } from "@/lib/site";
import { Logo, WaveDivider } from "./ui";

const copy = {
  fr: {
    visit: "Adresse",
    hours: "Horaires",
    explore: "Le site",
    nav: "Pied de page",
    call: "Réserver par téléphone : ",
    facebook: "Page Facebook",
    newTab: " (s'ouvre dans un nouvel onglet)",
    demo: "Démo réalisée par Ammar Rajabi à titre d'entraînement. Le propriétaire peut demander sa suppression.",
    photos: "Photos d'illustration Unsplash, pas celles du restaurant.",
    credits: "Crédits photos",
  },
  en: {
    visit: "Address",
    hours: "Opening hours",
    explore: "Explore",
    nav: "Footer",
    call: "Book by phone: ",
    facebook: "Facebook page",
    newTab: " (opens in a new tab)",
    demo: "Demo made by Ammar Rajabi as a practice project. The owner can ask for it to be removed.",
    photos: "Illustrative photos from Unsplash, not of the restaurant.",
    credits: "Photo credits",
  },
} satisfies Record<Locale, Record<string, string>>;

export function SiteFooter({ locale }: { locale: Locale }) {
  const t = copy[locale];
  return (
    <footer className="bg-charcoal text-cream">
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-5 pt-16 pb-10 sm:px-8 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1.2fr_0.8fr] lg:gap-10">
        <div>
          <p className="text-3xl">
            <Logo />
          </p>
          <WaveDivider className="mt-4" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream-muted">{tagline[locale]}.</p>
        </div>

        <div>
          <h2 className="text-xs font-medium uppercase tracking-[0.2em] text-terracotta">{t.visit}</h2>
          <address className="mt-4 text-sm leading-relaxed text-cream-muted not-italic">
            {site.address.street}
            <br />
            {site.address.postcode} {site.address.city}
          </address>
          <p className="mt-4 space-y-1 text-sm">
            <a href={site.phoneHref} className="block text-cream underline-offset-4 hover:underline">
              <span className="sr-only">{t.call}</span>
              {site.phone}
            </a>
            <a
              href={site.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-cream underline-offset-4 hover:underline"
            >
              {t.facebook}
              <span className="sr-only">{t.newTab}</span>
            </a>
          </p>
        </div>

        <div>
          <h2 className="text-xs font-medium uppercase tracking-[0.2em] text-terracotta">{t.hours}</h2>
          <dl className="mt-4 space-y-2 text-sm">
            {openingHoursSummary[locale].map((row) => (
              <div key={row.days}>
                <dt className="text-cream-muted">{row.days}</dt>
                <dd className="text-cream">{row.time}</dd>
              </div>
            ))}
          </dl>
        </div>

        <nav aria-label={t.nav}>
          <h2 className="text-xs font-medium uppercase tracking-[0.2em] text-terracotta">{t.explore}</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {navLinks[locale].map((link) => (
              <li key={link.href}>
                <Link href={localePath(locale, link.href)} className="text-cream-muted transition-colors hover:text-cream">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-cream/10">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-5 py-6 text-xs leading-relaxed text-cream-muted sm:px-8 md:flex-row md:justify-between md:gap-8">
          <p>{t.demo}</p>
          <p className="shrink-0">
            {t.photos}{" "}
            <Link href={`${localePath(locale, "/gallery")}#credits`} className="text-cream underline underline-offset-4">
              {t.credits}
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
