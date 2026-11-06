import Image from "next/image";
import { Phone } from "lucide-react";
import { BookingBand } from "@/components/booking-band";
import { PageIntro } from "@/components/page-intro";
import { ButtonAnchor, Container, WaveDivider } from "@/components/ui";
import type { Locale } from "@/lib/i18n";
import { customerFavourites, formatPrice, menuSections, setMenuPrices } from "@/lib/menu";
import { pageMetadata } from "@/lib/metadata";
import { photos } from "@/lib/photos";
import { site } from "@/lib/site";

const copy = {
  fr: {
    title: "La carte",
    description:
      "La carte du 9bourg à Saint-Lô : exemple de formule du week-end (34 € ou 29 €), entrées, plats et desserts faits maison. La carte change souvent.",
    eyebrow: "La carte",
    h1: "Une carte courte, qui change souvent",
    lead: "Voici un exemple de formule du week-end publié sur notre page Facebook. La carte change : appelez-nous pour connaître les plats du moment.",
    sectionsNav: "Rubriques de la carte",
    setTitle: "Formule du week-end",
    setWhen: "Du vendredi soir au dimanche midi",
    example: "Exemple de formule, la carte change.",
    vegetarian: "Options végétariennes : demandez-nous.",
    drinksTitle: "Boissons",
    drinksNote: "Cocktails, café et carte des vins. Prix sur demande.",
    drinks: ["Cocktails", "Café", "Carte des vins"],
    onRequest: "Sur demande",
    favTitle: "Souvent photographiés par nos clients",
    favNote: "Des plats qui reviennent dans les photos des avis Google, selon la carte du moment.",
    note: "La carte change souvent. Les plats et les prix de cette page sont un exemple de formule du week-end. Pour toute allergie, parlez-en en réservant.",
    call: `Appeler le ${site.phone}`,
    band: "Envie de goûter ?",
  },
  en: {
    title: "Menu",
    description:
      "Le 9bourg's menu in Saint-Lô: an example weekend set menu (€34 or €29) with homemade starters, mains and desserts. The menu changes often.",
    eyebrow: "Menu",
    h1: "A short menu that changes often",
    lead: "Here is an example weekend set menu posted on our Facebook page. The menu changes: call us to hear what is on today.",
    sectionsNav: "Menu sections",
    setTitle: "Weekend set menu",
    setWhen: "Friday evening to Sunday lunch",
    example: "Example set menu, the menu changes.",
    vegetarian: "Vegetarian options: just ask us.",
    drinksTitle: "Drinks",
    drinksNote: "Cocktails, coffee and a wine list. Prices on request.",
    drinks: ["Cocktails", "Coffee", "Wine list"],
    onRequest: "On request",
    favTitle: "Often photographed by our customers",
    favNote: "Dishes that keep appearing in Google review photos, depending on the menu of the moment.",
    note: "The menu changes often. The dishes and prices on this page are an example weekend set menu. Dish names are in French, as on the restaurant's menu. If you have an allergy, please mention it when you book.",
    call: `Call ${site.phone}`,
    band: "Feeling hungry?",
  },
};

export function menuMetadata(locale: Locale) {
  const t = copy[locale];
  return pageMetadata({ locale, title: t.title, description: t.description, path: "/menu" });
}

function SectionTitle({ index, id, children }: { index: number; id: string; children: string }) {
  return (
    <>
      <p className="font-serif text-sm text-terracotta-dark italic">{String(index).padStart(2, "0")}</p>
      <h2 id={id} className="mt-1 font-serif text-4xl sm:text-5xl">
        {children}
      </h2>
      <WaveDivider className="mt-4" />
    </>
  );
}

export function MenuPage({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const jumpLinks = [
    ...menuSections.map((section) => ({ id: section.id, title: section.title[locale] })),
    { id: "boissons", title: t.drinksTitle },
  ];

  return (
    <>
      <PageIntro eyebrow={t.eyebrow} title={t.h1}>
        <p>{t.lead}</p>
      </PageIntro>

      <div className="bg-cream">
        <Container className="pt-12">
          <div className="relative aspect-[16/9] overflow-hidden rounded-sm sm:aspect-[21/9]">
            <Image
              src={photos.sharedTable.src}
              alt={photos.sharedTable.alt[locale]}
              fill
              sizes="(min-width: 1152px) 1088px, 100vw"
              className="object-cover"
            />
          </div>

          {/* Set menu prices */}
          <section aria-labelledby="set-title" className="mt-10 rounded-sm border border-charcoal/15 p-6 sm:p-8">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
              <h2 id="set-title" className="font-serif text-3xl">
                {t.setTitle}
              </h2>
              <p className="text-sm text-terracotta-dark">{t.setWhen}</p>
            </div>
            <dl className="mt-6 space-y-3">
              {setMenuPrices.map((row) => (
                <div key={row.price} className="flex items-baseline gap-3">
                  <dt className="text-lg">{row.label[locale]}</dt>
                  <span className="min-w-6 flex-1 translate-y-[-0.3em] border-b border-dotted border-charcoal/30" aria-hidden="true" />
                  <dd className="font-serif text-2xl tabular-nums">{formatPrice(row.price, locale)}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-5 text-sm text-ink-muted">
              {t.example} {t.vegetarian}
            </p>
          </section>

          {/* Section jump links */}
          <nav aria-label={t.sectionsNav} className="mt-10 border-b border-charcoal/10 pb-8">
            <ul className="flex flex-wrap gap-2">
              {jumpLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    className="inline-flex min-h-11 items-center rounded-full border border-charcoal/20 px-4 text-sm transition-colors hover:border-charcoal hover:bg-charcoal hover:text-cream"
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </Container>

        {/* The printed-menu card */}
        <Container className="py-16 sm:py-20">
          <div className="space-y-20 sm:space-y-24">
            {menuSections.map((section, index) => (
              <section
                key={section.id}
                id={section.id}
                aria-labelledby={`${section.id}-title`}
                className="grid scroll-mt-28 gap-10 lg:grid-cols-[1fr_20rem] lg:gap-16"
              >
                <div>
                  <SectionTitle index={index + 1} id={`${section.id}-title`}>
                    {section.title[locale]}
                  </SectionTitle>
                  <p className="mt-4 text-ink-muted">{t.example}</p>
                  <ul lang="fr" className="mt-8 divide-y divide-charcoal/10 border-t border-charcoal/10">
                    {section.items.map((item) => (
                      <li key={item} className="py-5">
                        <h3 className="font-serif text-xl leading-snug sm:text-2xl">{item}</h3>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="relative hidden aspect-[3/4] overflow-hidden rounded-sm lg:sticky lg:top-28 lg:block lg:self-start">
                  <Image
                    src={section.photo.src}
                    alt={section.photo.alt[locale]}
                    fill
                    sizes="320px"
                    className="object-cover"
                  />
                </div>
              </section>
            ))}

            {/* Drinks */}
            <section
              id="boissons"
              aria-labelledby="boissons-title"
              className="grid scroll-mt-28 gap-10 lg:grid-cols-[1fr_20rem] lg:gap-16"
            >
              <div>
                <SectionTitle index={menuSections.length + 1} id="boissons-title">
                  {t.drinksTitle}
                </SectionTitle>
                <p className="mt-4 text-ink-muted">{t.drinksNote}</p>
                <ul className="mt-8 divide-y divide-charcoal/10 border-t border-charcoal/10">
                  {t.drinks.map((drink) => (
                    <li key={drink} className="flex items-baseline gap-3 py-5">
                      <h3 className="font-serif text-xl leading-snug sm:text-2xl">{drink}</h3>
                      <span className="min-w-6 flex-1 translate-y-[-0.3em] border-b border-dotted border-charcoal/30" aria-hidden="true" />
                      <p className="shrink-0 text-sm text-ink-muted">{t.onRequest}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative hidden aspect-[3/4] overflow-hidden rounded-sm lg:sticky lg:top-28 lg:block lg:self-start">
                <Image src={photos.sour.src} alt={photos.sour.alt[locale]} fill sizes="320px" className="object-cover" />
              </div>
            </section>

            {/* Customer favourites */}
            <section aria-labelledby="favourites-title" className="rounded-sm bg-beige p-6 sm:p-10">
              <h2 id="favourites-title" className="font-serif text-3xl sm:text-4xl">
                {t.favTitle}
              </h2>
              <WaveDivider className="mt-4" />
              <p className="mt-4 text-ink-muted">{t.favNote}</p>
              <ul lang="fr" className="mt-6 flex flex-wrap gap-2">
                {customerFavourites.map((dish) => (
                  <li key={dish} className="rounded-full border border-charcoal/20 bg-cream px-4 py-2 font-serif text-lg">
                    {dish}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <div className="mt-16 flex flex-col gap-6 border-t border-charcoal/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-2xl text-sm leading-relaxed text-ink-muted">{t.note}</p>
            <ButtonAnchor href={site.phoneHref} className="shrink-0">
              <Phone className="size-4" aria-hidden="true" />
              {t.call}
            </ButtonAnchor>
          </div>
        </Container>
      </div>

      <BookingBand locale={locale} title={t.band} />
    </>
  );
}
