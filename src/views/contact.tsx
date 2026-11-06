import Image from "next/image";
import { Clock, ExternalLink, MapPin, Navigation, Phone } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { PageIntro } from "@/components/page-intro";
import { ButtonAnchor, Container, Eyebrow, SectionHeading, WaveDivider } from "@/components/ui";
import type { Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { photos } from "@/lib/photos";
import { openingHoursByDay, site } from "@/lib/site";

const copy = {
  fr: {
    title: "Contact et réservation",
    description:
      "Réserver au 9bourg, 64 rue de Neufbourg, 50000 Saint-Lô : téléphone 09 52 88 44 50, horaires, itinéraire Google Maps et page Facebook.",
    eyebrow: "Contact",
    h1: "Venir au 9bourg et réserver",
    lead: "Au 64 rue de Neufbourg, à Saint-Lô. Pour réserver, le plus simple est d'appeler.",
    details: "Coordonnées",
    address: "Adresse",
    phone: "Téléphone",
    facebook: "Facebook",
    facebookLink: "Page Facebook du 9bourg",
    hours: "Horaires",
    dinnerNote: "Service du soir le vendredi et le samedi uniquement.",
    findEyebrow: "Nous trouver",
    findText: "Parking gratuit. Entrée accessible en fauteuil roulant.",
    maps: "Voir sur Google Maps",
    directions: "Itinéraire",
    newTab: " (s'ouvre dans un nouvel onglet)",
    bookEyebrow: "Réservation",
    bookTitle: "Réserver une table",
    bookIntro: "Réservation conseillée, le midi comme le soir. Le plus rapide est de nous appeler.",
    call: `Appeler le ${site.phone}`,
  },
  en: {
    title: "Contact and bookings",
    description:
      "Book at Le 9bourg, 64 rue de Neufbourg, 50000 Saint-Lô: phone 09 52 88 44 50, opening hours, Google Maps directions and Facebook page.",
    eyebrow: "Contact",
    h1: "Visit Le 9bourg and book a table",
    lead: "At 64 rue de Neufbourg, in Saint-Lô. The easiest way to book is to call.",
    details: "Contact details",
    address: "Address",
    phone: "Phone",
    facebook: "Facebook",
    facebookLink: "Le 9bourg on Facebook",
    hours: "Opening hours",
    dinnerNote: "Dinner on Friday and Saturday only.",
    findEyebrow: "Finding us",
    findText: "Free parking. Wheelchair-accessible entrance.",
    maps: "See on Google Maps",
    directions: "Directions",
    newTab: " (opens in a new tab)",
    bookEyebrow: "Bookings",
    bookTitle: "Book a table",
    bookIntro: "Booking recommended for lunch and dinner. Calling us is the quickest way.",
    call: `Call ${site.phone}`,
  },
};

export function contactMetadata(locale: Locale) {
  const t = copy[locale];
  return pageMetadata({ locale, title: t.title, description: t.description, path: "/contact" });
}

const linkClass = "mt-2 inline-block text-lg underline decoration-charcoal/30 underline-offset-4 hover:decoration-terracotta";

export function ContactPage({ locale }: { locale: Locale }) {
  const t = copy[locale];
  return (
    <>
      <PageIntro eyebrow={t.eyebrow} title={t.h1}>
        <p>{t.lead}</p>
      </PageIntro>

      {/* Details */}
      <section aria-labelledby="details-title" className="bg-cream">
        <Container className="grid gap-12 py-16 sm:py-20 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div>
            <h2 id="details-title" className="sr-only">
              {t.details}
            </h2>
            <ul className="divide-y divide-charcoal/10 border-y border-charcoal/10">
              <li className="flex gap-5 py-6">
                <MapPin className="mt-1 size-5 shrink-0 text-olive-deep" strokeWidth={1.5} aria-hidden="true" />
                <div>
                  <h3 className="font-serif text-2xl">{t.address}</h3>
                  <address className="mt-2 leading-relaxed text-ink-muted not-italic">
                    {site.address.street}
                    <br />
                    {site.address.postcode} {site.address.city}
                  </address>
                </div>
              </li>
              <li className="flex gap-5 py-6">
                <Phone className="mt-1 size-5 shrink-0 text-olive-deep" strokeWidth={1.5} aria-hidden="true" />
                <div>
                  <h3 className="font-serif text-2xl">{t.phone}</h3>
                  <a href={site.phoneHref} className={linkClass}>
                    {site.phone}
                  </a>
                </div>
              </li>
              <li className="flex gap-5 py-6">
                <ExternalLink className="mt-1 size-5 shrink-0 text-olive-deep" strokeWidth={1.5} aria-hidden="true" />
                <div className="min-w-0">
                  <h3 className="font-serif text-2xl">{t.facebook}</h3>
                  <a href={site.facebookUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
                    {t.facebookLink}
                    <span className="sr-only">{t.newTab}</span>
                  </a>
                </div>
              </li>
              <li className="flex gap-5 py-6">
                <Clock className="mt-1 size-5 shrink-0 text-olive-deep" strokeWidth={1.5} aria-hidden="true" />
                <div className="flex-1">
                  <h3 className="font-serif text-2xl">{t.hours}</h3>
                  <dl className="mt-3 space-y-2">
                    {openingHoursByDay[locale].map((row) => (
                      <div key={row.days} className="flex items-baseline gap-3">
                        <dt className="text-ink-muted">{row.days}</dt>
                        <span className="min-w-4 flex-1 border-b border-dotted border-charcoal/25" aria-hidden="true" />
                        <dd className="text-right tabular-nums">{row.time}</dd>
                      </div>
                    ))}
                  </dl>
                  <p className="mt-3 text-sm text-ink-muted">{t.dinnerNote}</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Map / address block */}
          <div className="flex flex-col gap-4">
            <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
              <Image
                src={photos.candleTable.src}
                alt={photos.candleTable.alt[locale]}
                fill
                sizes="(min-width: 1024px) 560px, 100vw"
                className="object-cover"
              />
            </div>
            <div className="rounded-sm bg-charcoal p-7 text-cream">
              <Eyebrow tone="dark">{t.findEyebrow}</Eyebrow>
              <p className="mt-3 font-serif text-2xl leading-snug">
                {site.address.street}, {site.address.postcode} {site.address.city}
              </p>
              <WaveDivider className="mt-4" />
              <p className="mt-4 text-sm leading-relaxed text-cream-muted">{t.findText}</p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <ButtonAnchor href={site.mapsUrl} target="_blank" rel="noopener noreferrer" variant="outline-dark">
                  <MapPin className="size-4" aria-hidden="true" />
                  {t.maps}
                  <span className="sr-only">{t.newTab}</span>
                </ButtonAnchor>
                <ButtonAnchor href={site.directionsUrl} target="_blank" rel="noopener noreferrer" variant="outline-dark">
                  <Navigation className="size-4" aria-hidden="true" />
                  {t.directions}
                  <span className="sr-only">{t.newTab}</span>
                </ButtonAnchor>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Booking */}
      <section id="book" aria-labelledby="book-title" className="scroll-mt-20 bg-beige">
        <Container className="grid gap-12 py-20 sm:py-24 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <div>
            <SectionHeading id="book-title" eyebrow={t.bookEyebrow} title={t.bookTitle} intro={t.bookIntro} />
            <a
              href={site.phoneHref}
              className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-full bg-charcoal px-6 text-sm font-medium text-cream transition-colors hover:bg-charcoal-soft"
            >
              <Phone className="size-4" aria-hidden="true" />
              {t.call}
            </a>
          </div>
          <div className="rounded-sm bg-cream p-6 sm:p-10">
            <ContactForm locale={locale} />
          </div>
        </Container>
      </section>
    </>
  );
}
