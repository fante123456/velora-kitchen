import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Leaf, Phone, ShoppingBag, UtensilsCrossed, Wine } from "lucide-react";
import { BookingBand } from "@/components/booking-band";
import { ButtonAnchor, ButtonLink, Container, Eyebrow, SectionHeading, WaveDivider } from "@/components/ui";
import { localePath, type Locale } from "@/lib/i18n";
import { featuredDishes, formatPrice, setMenuPrices } from "@/lib/menu";
import { pageMetadata } from "@/lib/metadata";
import { photos } from "@/lib/photos";
import { site } from "@/lib/site";
import { reviews } from "@/lib/reviews";

const copy = {
  fr: {
    title: "Le 9bourg | Restaurant fait maison à Saint-Lô",
    description:
      "Le 9bourg, restaurant de cuisine française faite maison à Saint-Lô, 64 rue de Neufbourg. Petite carte qui change, produits frais, réservation conseillée.",
    eyebrow: "Restaurant · Saint-Lô",
    h1a: "Cuisine française,",
    h1b: "faite maison",
    lead: "Une petite carte courte qui change, des produits frais et des plats bien présentés, au 64 rue de Neufbourg.",
    call: `Réserver : ${site.phone}`,
    menu: "Voir la carte",
    open: "Le midi tous les jours sauf le mercredi · le soir vendredi et samedi",
    introEyebrow: "Bienvenue",
    introTitle: "Un petit restaurant chaleureux et calme",
    intro1:
      "Au 9bourg, tout est fait maison. La carte est courte et change souvent, avec des produits frais et des assiettes soignées.",
    intro2: "L'ambiance est décontractée, chaleureuse et calme. Sur place, à emporter ou en livraison.",
    introLink: "Découvrir le restaurant",
    featuredEyebrow: "Exemple de formule, la carte change",
    featuredTitle: "La formule du week-end",
    featuredIntro: "Du vendredi soir au dimanche midi. Voici un exemple publié sur notre page Facebook.",
    fullMenu: "Voir toute la formule",
    whyEyebrow: "Pourquoi venir",
    whyTitle: "Du fait maison, du début à la fin",
    reasons: [
      { title: "Tout est fait maison", text: "Entrées, plats et desserts faits maison, dans des assiettes bien présentées." },
      { title: "Des produits frais", text: "Une petite carte courte, qui change souvent." },
      { title: "Cocktails, vins et café", text: "Des cocktails, une carte des vins, du café et des desserts. Options végétariennes." },
      { title: "Sur place, à emporter, en livraison", text: "Réservation conseillée le midi comme le soir." },
    ],
    reviewsEyebrow: "Avis Google",
    reviewsTitle: "Ce qu'en disent les clients",
    reviewsIntro: `Note de ${site.rating.fr}/5 sur Google, sur ${site.rating.count} avis.`,
    source: "Avis Google",
    translated: "",
    allReviews: "Voir tous les avis sur Google",
    newTab: " (s'ouvre dans un nouvel onglet)",
  },
  en: {
    title: "Le 9bourg | Homemade French Restaurant in Saint-Lô",
    description:
      "Le 9bourg is a homemade French restaurant in Saint-Lô, 64 rue de Neufbourg. A short menu that changes, fresh produce, booking recommended.",
    eyebrow: "Restaurant · Saint-Lô",
    h1a: "French cooking,",
    h1b: "homemade",
    lead: "A short menu that changes, fresh produce and well-presented dishes, at 64 rue de Neufbourg.",
    call: `Book: ${site.phone}`,
    menu: "See the menu",
    open: "Lunch every day except Wednesday · dinner on Friday and Saturday",
    introEyebrow: "Welcome",
    introTitle: "A small, warm and quiet restaurant",
    intro1:
      "At Le 9bourg, everything is homemade. The menu is short and changes often, with fresh produce and carefully presented plates.",
    intro2: "The atmosphere is relaxed, warm and quiet. Eat in, take away or get it delivered.",
    introLink: "About the restaurant",
    featuredEyebrow: "Example set menu, the menu changes",
    featuredTitle: "The weekend set menu",
    featuredIntro: "From Friday evening to Sunday lunch. Here is an example posted on our Facebook page.",
    fullMenu: "See the whole set menu",
    whyEyebrow: "Why come",
    whyTitle: "Homemade from start to finish",
    reasons: [
      { title: "Everything is homemade", text: "Homemade starters, mains and desserts, nicely presented." },
      { title: "Fresh produce", text: "A short menu that changes often." },
      { title: "Cocktails, wine and coffee", text: "Cocktails, a wine list, coffee and desserts. Vegetarian options." },
      { title: "Eat in, take away, delivery", text: "Booking recommended for lunch and dinner." },
    ],
    reviewsEyebrow: "Google reviews",
    reviewsTitle: "What customers say",
    reviewsIntro: `Rated ${site.rating.en}/5 on Google, from ${site.rating.count} reviews.`,
    source: "Google review",
    translated: "(translated from French)",
    allReviews: "See all reviews on Google",
    newTab: " (opens in a new tab)",
  },
};

const reasonIcons = [UtensilsCrossed, Leaf, Wine, ShoppingBag];

export function homeMetadata(locale: Locale) {
  const t = copy[locale];
  return pageMetadata({ locale, title: t.title, description: t.description, path: "/", absoluteTitle: true });
}

export function HomePage({ locale }: { locale: Locale }) {
  const t = copy[locale];
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-charcoal text-cream">
        <Container className="grid items-center gap-10 py-14 sm:py-20 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:py-24">
          <div className="motion-rise">
            <Eyebrow tone="dark">{t.eyebrow}</Eyebrow>
            <h1 className="mt-5 font-serif text-5xl leading-[1.02] text-balance sm:text-6xl lg:text-7xl">
              {t.h1a} <em className="text-beige">{t.h1b}</em>
            </h1>
            <WaveDivider className="mt-6" />
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-pretty text-cream-muted">{t.lead}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonAnchor href={site.phoneHref}>
                <Phone className="size-4" aria-hidden="true" />
                {t.call}
              </ButtonAnchor>
              <ButtonLink href={localePath(locale, "/menu")} variant="outline-dark">
                {t.menu}
              </ButtonLink>
            </div>
            <p className="mt-8 text-sm text-cream-muted">{t.open}</p>
          </div>

          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm sm:aspect-[5/4] lg:aspect-[4/5]">
            <Image
              src={photos.heroDiningRoom.src}
              alt={photos.heroDiningRoom.alt[locale]}
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
            <SectionHeading id="intro-title" eyebrow={t.introEyebrow} title={t.introTitle} />
          </div>
          <div className="motion-reveal space-y-5 text-lg leading-relaxed text-pretty text-ink-muted lg:pt-10">
            <p>{t.intro1}</p>
            <p>
              {t.intro2}{" "}
              <Link
                href={localePath(locale, "/about")}
                className="font-medium whitespace-nowrap text-charcoal underline decoration-terracotta underline-offset-4"
              >
                {t.introLink}
              </Link>
              .
            </p>
          </div>
        </Container>
      </section>

      {/* Example weekend set menu */}
      <section aria-labelledby="featured-title" className="bg-cream pb-20 sm:pb-24">
        <Container>
          <div className="flex flex-col gap-6 border-t border-charcoal/10 pt-16 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              id="featured-title"
              eyebrow={t.featuredEyebrow}
              title={t.featuredTitle}
              intro={t.featuredIntro}
            />
            <Link
              href={localePath(locale, "/menu")}
              className="group inline-flex shrink-0 items-center gap-2 text-sm font-medium text-charcoal underline-offset-4 hover:underline"
            >
              {t.fullMenu}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
          </div>

          <ul className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {featuredDishes.map((dish, index) => (
              <li key={dish.name} className={`motion-reveal ${index === 2 ? "sm:col-span-2 lg:col-span-1" : ""}`}>
                <article>
                  <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-beige">
                    <Image
                      src={dish.photo.src}
                      alt={dish.photo.alt[locale]}
                      fill
                      sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <p className="mt-5 text-xs font-medium uppercase tracking-[0.2em] text-terracotta-dark">
                    {dish.course[locale]}
                  </p>
                  <h3 lang="fr" className="mt-2 font-serif text-2xl leading-snug">
                    {dish.name}
                  </h3>
                </article>
              </li>
            ))}
          </ul>

          <dl className="mt-12 grid gap-3 border-y border-charcoal/10 py-6 sm:grid-cols-2 sm:gap-8">
            {setMenuPrices.map((row) => (
              <div key={row.price} className="flex items-baseline gap-3">
                <dt className="text-ink-muted">{row.label[locale]}</dt>
                <span className="min-w-6 flex-1 border-b border-dotted border-charcoal/30" aria-hidden="true" />
                <dd className="font-serif text-2xl tabular-nums">{formatPrice(row.price, locale)}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* Why visit */}
      <section aria-labelledby="why-title" className="bg-beige">
        <Container className="grid gap-12 py-20 sm:py-24 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
          <div className="motion-reveal">
            <SectionHeading id="why-title" eyebrow={t.whyEyebrow} title={t.whyTitle} />
            <div className="relative mt-10 hidden aspect-[4/3] overflow-hidden rounded-sm lg:block">
              <Image src={photos.chefPass.src} alt={photos.chefPass.alt[locale]} fill sizes="440px" className="object-cover" />
            </div>
          </div>
          <ul className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:pt-6">
            {t.reasons.map(({ title, text }, index) => {
              const Icon = reasonIcons[index];
              return (
                <li key={title} className="motion-reveal border-t border-charcoal/15 pt-6">
                  <Icon className="size-6 text-olive-deep" strokeWidth={1.5} aria-hidden="true" />
                  <h3 className="mt-4 font-serif text-2xl">{title}</h3>
                  <p className="mt-2 leading-relaxed text-ink-muted">{text}</p>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      {/* Real Google reviews */}
      <section aria-labelledby="reviews-title" className="bg-charcoal text-cream">
        <Container className="py-20 sm:py-24">
          <SectionHeading
            id="reviews-title"
            tone="dark"
            align="center"
            eyebrow={t.reviewsEyebrow}
            title={t.reviewsTitle}
            intro={t.reviewsIntro}
          />
          <ul className="mt-14 grid gap-6 md:grid-cols-3">
            {reviews.map((review) => (
              <li key={review.name} className="motion-reveal">
                <figure className="flex h-full flex-col rounded-sm border border-cream/10 bg-charcoal-soft p-7">
                  <span className="font-serif text-5xl leading-none text-terracotta" aria-hidden="true">
                    &ldquo;
                  </span>
                  <blockquote lang={locale} className="mt-2 flex-1 font-serif text-xl leading-snug text-cream">
                    <p>{review.quote[locale]}</p>
                  </blockquote>
                  {t.translated ? <p className="mt-3 text-xs text-cream-muted">{t.translated}</p> : null}
                  <figcaption className="mt-6 text-sm text-cream-muted">
                    <span className="text-cream">{review.name}</span> · {t.source}
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
          <div className="mt-10 text-center">
            <ButtonAnchor href={site.mapsUrl} target="_blank" rel="noopener noreferrer" variant="outline-dark">
              {t.allReviews}
              <span className="sr-only">{t.newTab}</span>
            </ButtonAnchor>
          </div>
        </Container>
      </section>

      <BookingBand locale={locale} />
    </>
  );
}
