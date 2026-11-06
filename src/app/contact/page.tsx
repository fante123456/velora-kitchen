import Image from "next/image";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { PageIntro } from "@/components/page-intro";
import { Container, Eyebrow, SectionHeading, WaveDivider } from "@/components/ui";
import { pageMetadata } from "@/lib/metadata";
import { photos } from "@/lib/photos";
import { openingHours, site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Contact and Bookings",
  description:
    "Book a table at Velora Kitchen, 18 King Street, Manchester M2 6AG. Phone, email, opening hours and directions for this fictional modern restaurant.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageIntro eyebrow="Contact" title="Visit us and book a table">
        <p>
          Find us on King Street in the heart of Manchester city centre. Call, email or send a booking request below.
        </p>
      </PageIntro>

      {/* Details */}
      <section aria-labelledby="details-title" className="bg-cream">
        <Container className="grid gap-12 py-16 sm:py-20 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div>
            <h2 id="details-title" className="sr-only">
              Contact details
            </h2>
            <ul className="divide-y divide-charcoal/10 border-y border-charcoal/10">
              <li className="flex gap-5 py-6">
                <MapPin className="mt-1 size-5 shrink-0 text-olive-deep" strokeWidth={1.5} aria-hidden="true" />
                <div>
                  <h3 className="font-serif text-2xl">Address</h3>
                  <address className="mt-2 leading-relaxed text-ink-muted not-italic">
                    {site.address.street}, {site.address.city}, {site.address.postcode}
                    <br />
                    {site.address.country}
                  </address>
                </div>
              </li>
              <li className="flex gap-5 py-6">
                <Phone className="mt-1 size-5 shrink-0 text-olive-deep" strokeWidth={1.5} aria-hidden="true" />
                <div>
                  <h3 className="font-serif text-2xl">Phone</h3>
                  <a href={site.phoneHref} className="mt-2 inline-block text-lg underline decoration-charcoal/30 underline-offset-4 hover:decoration-terracotta">
                    {site.phone}
                  </a>
                </div>
              </li>
              <li className="flex gap-5 py-6">
                <Mail className="mt-1 size-5 shrink-0 text-olive-deep" strokeWidth={1.5} aria-hidden="true" />
                <div className="min-w-0">
                  <h3 className="font-serif text-2xl">Email</h3>
                  <a
                    href={`mailto:${site.email}`}
                    className="mt-2 inline-block break-all text-lg underline decoration-charcoal/30 underline-offset-4 hover:decoration-terracotta"
                  >
                    {site.email}
                  </a>
                </div>
              </li>
              <li className="flex gap-5 py-6">
                <Clock className="mt-1 size-5 shrink-0 text-olive-deep" strokeWidth={1.5} aria-hidden="true" />
                <div className="flex-1">
                  <h3 className="font-serif text-2xl">Opening hours</h3>
                  <dl className="mt-3 space-y-2">
                    {openingHours.map((row) => (
                      <div key={row.days} className="flex items-baseline gap-3">
                        <dt className="text-ink-muted">{row.days}</dt>
                        <span className="flex-1 border-b border-dotted border-charcoal/25" aria-hidden="true" />
                        <dd className="tabular-nums">{row.time}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </li>
            </ul>
          </div>

          {/* Map / address block */}
          <div className="flex flex-col gap-4">
            <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
              <Image
                src={photos.candleTable.src}
                alt={photos.candleTable.alt}
                fill
                sizes="(min-width: 1024px) 560px, 100vw"
                className="object-cover"
              />
            </div>
            <div className="rounded-sm bg-charcoal p-7 text-cream">
              <Eyebrow tone="dark">Finding us</Eyebrow>
              <p className="mt-3 font-serif text-2xl leading-snug">
                {site.address.street}, {site.address.city} {site.address.postcode}
              </p>
              <WaveDivider className="mt-4" />
              <p className="mt-4 text-sm leading-relaxed text-cream-muted">
                In Manchester city centre, a short walk from several tram stops. Public car parks are nearby, and the
                entrance is step-free.
              </p>
              <a
                href={site.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex min-h-12 items-center rounded-full border border-cream/30 px-6 text-sm font-medium transition-colors hover:border-cream hover:bg-cream hover:text-charcoal"
              >
                Open in Google Maps
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* Booking */}
      <section id="book" aria-labelledby="book-title" className="scroll-mt-20 bg-beige">
        <Container className="grid gap-12 py-20 sm:py-24 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <div>
            <SectionHeading
              id="book-title"
              eyebrow="Book a table"
              title="Request a booking"
              intro="Send us your preferred date and party size and we will confirm by email. For same-day tables, calling is quickest."
            />
            <a
              href={site.phoneHref}
              className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-full bg-charcoal px-6 text-sm font-medium text-cream transition-colors hover:bg-charcoal-soft"
            >
              <Phone className="size-4" aria-hidden="true" />
              Call {site.phone}
            </a>
          </div>
          <div className="rounded-sm bg-cream p-6 sm:p-10">
            <ContactForm />
          </div>
        </Container>
      </section>
    </>
  );
}
