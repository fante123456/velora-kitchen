import Image from "next/image";
import { BookingBand } from "@/components/booking-band";
import { PageIntro } from "@/components/page-intro";
import { Container, SectionHeading } from "@/components/ui";
import type { Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { photos, unsplashProfile, type Photo } from "@/lib/photos";

const copy = {
  fr: {
    title: "Galerie",
    description:
      "Galerie du 9bourg, restaurant fait maison à Saint-Lô : cuisine, salle, tables et boissons. Photos d'illustration en attendant les photos du restaurant.",
    eyebrow: "Galerie",
    h1: "Cuisine, salle et boissons",
    lead: "Photos d'illustration (Unsplash) en attendant les vraies photos du restaurant.",
    gallery: "Galerie de photos",
    creditsEyebrow: "Merci",
    creditsTitle: "Crédits photos",
    creditsIntro:
      "Toutes les photos viennent d'Unsplash (licence gratuite). Ce sont des photos d'illustration : elles ne montrent pas le 9bourg.",
    onUnsplash: " sur Unsplash (s'ouvre dans un nouvel onglet)",
  },
  en: {
    title: "Gallery",
    description:
      "Gallery for Le 9bourg, a homemade restaurant in Saint-Lô: food, dining room, tables and drinks. Illustrative photos until the restaurant's own photos are added.",
    eyebrow: "Gallery",
    h1: "Food, dining room and drinks",
    lead: "Illustrative photos (Unsplash) until the restaurant's own photos are added.",
    gallery: "Photo gallery",
    creditsEyebrow: "Thank you",
    creditsTitle: "Photo credits",
    creditsIntro:
      "All photos come from Unsplash (free licence). They are illustrative and do not show Le 9bourg.",
    onUnsplash: " on Unsplash (opens in a new tab)",
  },
};

type Text = Record<Locale, string>;
type GalleryItem = { photo: Photo; caption: Text; category: Text; span?: string };

const room = { fr: "Salle", en: "Dining room" };
const food = { fr: "Cuisine", en: "Food" };
const kitchen = { fr: "En cuisine", en: "Kitchen" };
const table = { fr: "À table", en: "At the table" };
const drinks = { fr: "Boissons", en: "Drinks" };

const gallery: GalleryItem[] = [
  { photo: photos.walnutInterior, caption: { fr: "Une salle chaleureuse", en: "A warm dining room" }, category: room, span: "sm:row-span-2" },
  { photo: photos.sirloin, caption: { fr: "Viande et sauce", en: "Meat and sauce" }, category: food },
  { photo: photos.chefPass, caption: { fr: "Le service", en: "Service" }, category: kitchen },
  { photo: photos.candleTable, caption: { fr: "Une table pour deux", en: "A table for two" }, category: table },
  { photo: photos.sour, caption: { fr: "Un cocktail", en: "A cocktail" }, category: drinks, span: "sm:row-span-2" },
  { photo: photos.pasta, caption: { fr: "Pâtes et pancetta", en: "Pasta and pancetta" }, category: food },
  { photo: photos.goldenBar, caption: { fr: "Bar et salon", en: "Bar and lounge" }, category: room },
  { photo: photos.chefPlating, caption: { fr: "Une assiette prête à partir", en: "A plate ready to go" }, category: kitchen, span: "sm:row-span-2" },
  { photo: photos.cod, caption: { fr: "Poisson et sauce", en: "Fish and sauce" }, category: food },
  { photo: photos.oldFashioned, caption: { fr: "Cocktail aux agrumes", en: "Citrus cocktail" }, category: drinks, span: "sm:row-span-2" },
  { photo: photos.flatWhite, caption: { fr: "Un café", en: "A coffee" }, category: drinks },
  { photo: photos.sharedTable, caption: { fr: "Assiettes à partager", en: "Plates to share" }, category: table },
  { photo: photos.chocolate, caption: { fr: "Dessert au chocolat", en: "Chocolate dessert" }, category: food },
  { photo: photos.tableSetting, caption: { fr: "Table dressée", en: "A set table" }, category: table },
];

const allPhotos = Object.values(photos);
const credits = Array.from(new Map(allPhotos.map((p) => [p.credit.username, p.credit])).values()).sort((a, b) =>
  a.name.localeCompare(b.name),
);

export function galleryMetadata(locale: Locale) {
  const t = copy[locale];
  return pageMetadata({ locale, title: t.title, description: t.description, path: "/gallery" });
}

export function GalleryPage({ locale }: { locale: Locale }) {
  const t = copy[locale];
  return (
    <>
      <PageIntro eyebrow={t.eyebrow} title={t.h1}>
        <p>{t.lead}</p>
      </PageIntro>

      <section aria-label={t.gallery} className="bg-cream">
        <Container className="py-14 sm:py-20">
          <ul className="grid grid-flow-row-dense auto-rows-[16rem] gap-3 sm:grid-cols-2 sm:auto-rows-[14rem] sm:gap-4 lg:grid-cols-3 lg:auto-rows-[16rem]">
            {gallery.map(({ photo, caption, category, span = "" }) => (
              <li key={photo.src} className={`motion-reveal ${span}`}>
                <figure className="group relative h-full overflow-hidden rounded-sm bg-beige">
                  <Image
                    src={photo.src}
                    alt={photo.alt[locale]}
                    fill
                    sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.03]"
                  />
                  <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-charcoal/85 via-charcoal/40 to-transparent px-4 pt-10 pb-4 text-cream">
                    <span className="block text-[0.7rem] font-medium uppercase tracking-[0.2em] text-beige">
                      {category[locale]}
                    </span>
                    <span className="mt-1 block font-serif text-lg leading-snug">{caption[locale]}</span>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section id="credits" aria-labelledby="credits-title" className="scroll-mt-24 bg-cream pb-20 sm:pb-24">
        <Container>
          <div className="border-t border-charcoal/10 pt-16">
            <SectionHeading id="credits-title" eyebrow={t.creditsEyebrow} title={t.creditsTitle} intro={t.creditsIntro} />
            <ul className="mt-8 grid gap-x-8 gap-y-2 text-sm sm:grid-cols-2 lg:grid-cols-3">
              {credits.map((credit) => (
                <li key={credit.username}>
                  <a
                    href={unsplashProfile(credit.username)}
                    className="text-charcoal underline decoration-charcoal/30 underline-offset-4 hover:decoration-terracotta"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {credit.name}
                    <span className="sr-only">{t.onUnsplash}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <BookingBand locale={locale} />
    </>
  );
}
