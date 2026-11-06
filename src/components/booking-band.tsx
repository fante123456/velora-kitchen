import { Phone } from "lucide-react";
import { site } from "@/lib/site";
import { ButtonLink, Container, Eyebrow, WaveDivider } from "./ui";

/** Closing call to action shared by Home, About, Menu and Gallery. */
export function BookingBand({
  title = "Save yourself a seat",
  text = "Tables for lunch, dinner and long Sunday afternoons. Book online or call us and we will find you a spot.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section aria-labelledby="booking-band-title" className="bg-beige">
      <Container className="py-16 text-center sm:py-20">
        <div className="motion-reveal mx-auto max-w-2xl">
          <Eyebrow>Book a table</Eyebrow>
          <h2 id="booking-band-title" className="mt-4 font-serif text-4xl leading-tight text-balance sm:text-5xl">
            {title}
          </h2>
          <WaveDivider className="mx-auto mt-5" />
          <p className="mt-5 text-base leading-relaxed text-pretty text-ink-muted sm:text-lg">{text}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ButtonLink href="/contact#book">Book a table</ButtonLink>
            <a
              href={site.phoneHref}
              className="inline-flex min-h-12 items-center gap-2 rounded-full px-5 text-sm font-medium text-charcoal underline-offset-4 hover:underline"
            >
              <Phone className="size-4" aria-hidden="true" />
              Call {site.phone}
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
