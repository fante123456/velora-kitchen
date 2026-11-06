import Image from "next/image";
import { BookingBand } from "@/components/booking-band";
import { PageIntro } from "@/components/page-intro";
import { Container, SectionHeading } from "@/components/ui";
import { pageMetadata } from "@/lib/metadata";
import { photos, unsplashProfile, type Photo } from "@/lib/photos";

export const metadata = pageMetadata({
  title: "Gallery",
  description:
    "Photos of Velora Kitchen's food, dining room, tables, kitchen and drinks. A look inside a fictional modern restaurant in Manchester.",
  path: "/gallery",
});

type GalleryItem = { photo: Photo; caption: string; category: string; span?: string };

const gallery: GalleryItem[] = [
  { photo: photos.walnutInterior, caption: "The dining room", category: "Interior", span: "sm:row-span-2" },
  { photo: photos.sirloin, caption: "Aged sirloin, jus poured at the table", category: "Food" },
  { photo: photos.chefPass, caption: "Service at the pass", category: "Kitchen" },
  { photo: photos.candleTable, caption: "A table for two", category: "Dining table" },
  { photo: photos.sour, caption: "The Velora sour", category: "Drinks", span: "sm:row-span-2" },
  { photo: photos.pasta, caption: "Spaghetti with crisp pancetta", category: "Food" },
  { photo: photos.goldenBar, caption: "The bar and lounge", category: "Interior" },
  { photo: photos.chefPlating, caption: "Checking a plate before it leaves", category: "Kitchen", span: "sm:row-span-2" },
  { photo: photos.cod, caption: "Roast cod with brown shrimp butter", category: "Food" },
  { photo: photos.oldFashioned, caption: "Smoked orange old fashioned", category: "Drinks", span: "sm:row-span-2" },
  { photo: photos.flatWhite, caption: "Afternoon flat white", category: "Coffee" },
  { photo: photos.sharedTable, caption: "Plates to share", category: "Dining table" },
  { photo: photos.chocolate, caption: "Dark chocolate delice", category: "Food" },
  { photo: photos.tableSetting, caption: "Set for the evening", category: "Dining table" },
];

const allPhotos = Object.values(photos);
const credits = Array.from(new Map(allPhotos.map((p) => [p.credit.username, p.credit])).values()).sort((a, b) =>
  a.name.localeCompare(b.name),
);

export default function GalleryPage() {
  return (
    <>
      <PageIntro eyebrow="Gallery" title="A look inside Velora">
        <p>Food from the pass, the dining room after dark, and a few drinks from the bar.</p>
      </PageIntro>

      <section aria-label="Photo gallery" className="bg-cream">
        <Container className="py-14 sm:py-20">
          <ul className="grid grid-flow-row-dense auto-rows-[16rem] gap-3 sm:grid-cols-2 sm:auto-rows-[14rem] sm:gap-4 lg:grid-cols-3 lg:auto-rows-[16rem]">
            {gallery.map(({ photo, caption, category, span = "" }) => (
              <li key={photo.src} className={`motion-reveal ${span}`}>
                <figure className="group relative h-full overflow-hidden rounded-sm bg-beige">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.03]"
                  />
                  <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-charcoal/85 via-charcoal/40 to-transparent px-4 pt-10 pb-4 text-cream">
                    <span className="block text-[0.7rem] font-medium uppercase tracking-[0.2em] text-beige">
                      {category}
                    </span>
                    <span className="mt-1 block font-serif text-lg leading-snug">{caption}</span>
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
            <SectionHeading
              id="credits-title"
              eyebrow="Thank you"
              title="Photo credits"
              intro="All photographs are used under the free Unsplash licence. They are illustrative and do not show a real Velora Kitchen."
            />
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
                    <span className="sr-only"> on Unsplash (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <BookingBand />
    </>
  );
}
