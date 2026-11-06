import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, Flame, Leaf, Wine } from "lucide-react";
import { BookingBand } from "@/components/booking-band";
import { ButtonLink, Container, Eyebrow, SectionHeading, WaveDivider } from "@/components/ui";
import { featuredDishes, formatPrice } from "@/lib/menu";
import { photos } from "@/lib/photos";
import { site } from "@/lib/site";

const reasons = [
  {
    icon: Leaf,
    title: "Seasonal from the start",
    text: "The menu follows what growers and fishmongers in the North West bring us each week.",
  },
  {
    icon: Flame,
    title: "An open kitchen",
    text: "Sit at the counter and watch dishes come together over the grill and on the pass.",
  },
  {
    icon: Wine,
    title: "A short, thoughtful drinks list",
    text: "Cocktails, natural wines by the glass and good alcohol-free choices.",
  },
  {
    icon: Clock,
    title: "Unhurried service",
    text: "Your table is yours for the evening. Stay for one more coffee.",
  },
];

const reviews = [
  {
    quote: "The sea bream was bright and fresh, and the staff were friendly without hovering. A relaxed evening.",
    name: "Hannah R.",
    detail: "Dinner for two",
  },
  {
    quote: "Lovely warm room on a cold night. The crème caramel is worth saving space for.",
    name: "Daniel M.",
    detail: "Friday dinner",
  },
  {
    quote: "Good for a long Sunday lunch with family. Clear menu with vegetarian options marked.",
    name: "Priya S.",
    detail: "Sunday lunch",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-charcoal text-cream">
        <Container className="grid items-center gap-10 py-14 sm:py-20 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:py-24">
          <div className="motion-rise">
            <Eyebrow tone="dark">Modern casual dining · Manchester</Eyebrow>
            <h1 className="mt-5 font-serif text-5xl leading-[1.02] text-balance sm:text-6xl lg:text-7xl">
              Modern flavours, <em className="text-beige">warm atmosphere</em>
            </h1>
            <WaveDivider className="mt-6" />
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-pretty text-cream-muted">
              Seasonal plates, good wine and a candlelit room on King Street. Come for a quick lunch or stay for the
              whole evening.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/contact#book">Book a table</ButtonLink>
              <ButtonLink href="/menu" variant="outline-dark">
                View the menu
              </ButtonLink>
            </div>
            <p className="mt-8 text-sm text-cream-muted">
              Open Tuesday to Sunday · {site.address.street}, {site.address.postcode}
            </p>
          </div>

          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm sm:aspect-[5/4] lg:aspect-[4/5]">
            <Image
              src={photos.heroDiningRoom.src}
              alt={photos.heroDiningRoom.alt}
              fill
              preload
              fetchPriority="high"
              quality={70}
              sizes="(min-width: 1152px) 520px, (min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
        </Container>
      </section>

      {/* Intro */}
      <section aria-labelledby="intro-title" className="bg-cream">
        <Container className="grid gap-10 py-20 sm:py-24 lg:grid-cols-2 lg:gap-16">
          <div className="motion-reveal">
            <SectionHeading
              id="intro-title"
              eyebrow="Welcome"
              title="A neighbourhood kitchen in the city centre"
            />
          </div>
          <div className="motion-reveal space-y-5 text-lg leading-relaxed text-pretty text-ink-muted lg:pt-10">
            <p>
              Velora Kitchen is a relaxed modern restaurant with a short menu that changes with the seasons. We cook
              simple food carefully, using produce from farms and markets around the North West.
            </p>
            <p>
              Expect warm lighting, soft music and staff who are happy to talk you through the menu.{" "}
              <Link href="/about" className="font-medium text-charcoal underline decoration-terracotta underline-offset-4">
                Read our story
              </Link>
              .
            </p>
          </div>
        </Container>
      </section>

      {/* Featured dishes */}
      <section aria-labelledby="featured-title" className="bg-cream pb-20 sm:pb-24">
        <Container>
          <div className="flex flex-col gap-6 border-t border-charcoal/10 pt-16 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading id="featured-title" eyebrow="From the menu" title="Featured dishes" />
            <Link
              href="/menu"
              className="group inline-flex items-center gap-2 text-sm font-medium text-charcoal underline-offset-4 hover:underline"
            >
              See the full menu
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
          </div>

          <ul className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {featuredDishes.map((dish, index) => (
              <li key={dish.name} className={`motion-reveal ${index === 2 ? "sm:col-span-2 lg:col-span-1" : ""}`}>
                <article>
                  <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-beige sm:aspect-[4/5]">
                    <Image
                      src={dish.photo.src}
                      alt={dish.photo.alt}
                      fill
                      sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="mt-5 flex items-baseline gap-3">
                    <h3 className="font-serif text-2xl">{dish.name}</h3>
                    <span className="h-px flex-1 translate-y-[-0.3em] border-b border-dotted border-charcoal/30" aria-hidden="true" />
                    <p className="font-serif text-xl">{formatPrice(dish.price)}</p>
                  </div>
                  <p className="mt-2 leading-relaxed text-ink-muted">{dish.description}</p>
                </article>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Why visit */}
      <section aria-labelledby="why-title" className="bg-beige">
        <Container className="grid gap-12 py-20 sm:py-24 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
          <div className="motion-reveal">
            <SectionHeading
              id="why-title"
              eyebrow="Why visit us"
              title="Good food, a warm room and time to enjoy both"
            />
            <div className="relative mt-10 hidden aspect-[4/3] overflow-hidden rounded-sm lg:block">
              <Image
                src={photos.chefPass.src}
                alt={photos.chefPass.alt}
                fill
                sizes="440px"
                className="object-cover"
              />
            </div>
          </div>
          <ul className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:pt-6">
            {reasons.map(({ icon: Icon, title, text }) => (
              <li key={title} className="motion-reveal border-t border-charcoal/15 pt-6">
                <Icon className="size-6 text-olive-deep" strokeWidth={1.5} aria-hidden="true" />
                <h3 className="mt-4 font-serif text-2xl">{title}</h3>
                <p className="mt-2 leading-relaxed text-ink-muted">{text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Reviews */}
      <section aria-labelledby="reviews-title" className="bg-charcoal text-cream">
        <Container className="py-20 sm:py-24">
          <SectionHeading
            id="reviews-title"
            tone="dark"
            align="center"
            eyebrow="Guest notes"
            title="What guests say"
            intro="Sample reviews written for this demo website. They are not from real customers."
          />
          <ul className="mt-14 grid gap-6 md:grid-cols-3">
            {reviews.map((review) => (
              <li key={review.name} className="motion-reveal">
                <figure className="flex h-full flex-col rounded-sm border border-cream/10 bg-charcoal-soft p-7">
                  <span className="font-serif text-5xl leading-none text-terracotta" aria-hidden="true">
                    &ldquo;
                  </span>
                  <blockquote className="mt-2 flex-1 font-serif text-xl leading-snug text-cream">
                    <p>{review.quote}</p>
                  </blockquote>
                  <figcaption className="mt-6 text-sm text-cream-muted">
                    <span className="text-cream">{review.name}</span> · {review.detail}
                    <span className="ml-2 rounded-full border border-olive/60 px-2 py-0.5 text-[0.7rem] uppercase tracking-wider text-olive">
                      Demo
                    </span>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <BookingBand />
    </>
  );
}
