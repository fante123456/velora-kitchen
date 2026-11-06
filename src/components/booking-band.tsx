import { Phone } from "lucide-react";
import { localePath, type Locale } from "@/lib/i18n";
import { site } from "@/lib/site";
import { ButtonAnchor, ButtonLink, Container, Eyebrow, WaveDivider } from "./ui";

const copy = {
  fr: {
    eyebrow: "Réservation",
    title: "Réservation conseillée",
    text: "Le midi tous les jours sauf le mercredi, le soir le vendredi et le samedi. Appelez-nous pour réserver votre table.",
    call: `Appeler le ${site.phone}`,
    hours: "Horaires et adresse",
  },
  en: {
    eyebrow: "Bookings",
    title: "Booking recommended",
    text: "Lunch every day except Wednesday, dinner on Friday and Saturday. Call us to book your table.",
    call: `Call ${site.phone}`,
    hours: "Hours and address",
  },
} satisfies Record<Locale, Record<string, string>>;

/** Closing call to action shared by Home, About, Menu and Gallery. "Book" always means "call". */
export function BookingBand({ locale, title }: { locale: Locale; title?: string }) {
  const t = copy[locale];
  return (
    <section aria-labelledby="booking-band-title" className="bg-beige">
      <Container className="py-16 text-center sm:py-20">
        <div className="motion-reveal mx-auto max-w-2xl">
          <Eyebrow>{t.eyebrow}</Eyebrow>
          <h2 id="booking-band-title" className="mt-4 font-serif text-4xl leading-tight text-balance sm:text-5xl">
            {title ?? t.title}
          </h2>
          <WaveDivider className="mx-auto mt-5" />
          <p className="mt-5 text-base leading-relaxed text-pretty text-ink-muted sm:text-lg">{t.text}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ButtonAnchor href={site.phoneHref}>
              <Phone className="size-4" aria-hidden="true" />
              {t.call}
            </ButtonAnchor>
            <ButtonLink href={localePath(locale, "/contact")} variant="outline-light">
              {t.hours}
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
