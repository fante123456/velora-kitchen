import Image from "next/image";
import { Accessibility, CircleParking, CreditCard, Ear, Leaf, Sofa, Ticket, UtensilsCrossed } from "lucide-react";
import { BookingBand } from "@/components/booking-band";
import { PageIntro } from "@/components/page-intro";
import { Container, SectionHeading } from "@/components/ui";
import type { Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { photos } from "@/lib/photos";

const copy = {
  fr: {
    title: "Le restaurant",
    description:
      "Le 9bourg à Saint-Lô : cuisine française faite maison, petite carte qui change, produits frais, ambiance décontractée et calme. Infos pratiques et accessibilité.",
    eyebrow: "Le restaurant",
    h1: "Un petit restaurant fait maison à Saint-Lô",
    lead: "Le 9bourg est un restaurant de cuisine française faite maison, au 64 rue de Neufbourg.",
    kitchenEyebrow: "Notre cuisine",
    kitchenTitle: "Une petite carte courte, qui change",
    kitchen: [
      "Tout est fait maison, avec des produits frais. La carte reste courte et change souvent.",
      "Les plats sont bien présentés. Côté boissons : cocktails, café et une carte des vins. Des options végétariennes sont proposées.",
      "Vous pouvez manger sur place, emporter vos plats ou vous faire livrer.",
    ],
    practicalEyebrow: "Infos pratiques",
    practicalTitle: "Accès et paiement",
    practical: [
      "Entrée accessible en fauteuil roulant",
      "Boucle auditive",
      "Parking gratuit",
      "Carte bancaire et paiement sans contact",
      "Titres-restaurant et Pluxee",
    ],
    valuesEyebrow: "Ce qui compte",
    valuesTitle: "Fait maison, frais, chaleureux",
    values: [
      { title: "Fait maison", text: "Entrées, plats et desserts sont faits maison." },
      { title: "Produits frais", text: "Une carte courte qui suit les produits et change souvent." },
      { title: "Une ambiance calme", text: "Décontractée, chaleureuse et calme." },
    ],
    roomEyebrow: "L'ambiance",
    roomTitle: "Décontractée, chaleureuse et calme",
    room: [
      "Le midi, du jeudi au mardi (fermé le mercredi). Le soir, le vendredi et le samedi.",
      "Réservation conseillée, le midi comme le soir.",
    ],
    band: "Venez nous voir",
  },
  en: {
    title: "About",
    description:
      "Le 9bourg in Saint-Lô: homemade French cooking, a short menu that changes, fresh produce, a relaxed and quiet atmosphere. Practical information and access.",
    eyebrow: "About",
    h1: "A small homemade restaurant in Saint-Lô",
    lead: "Le 9bourg is a homemade French restaurant at 64 rue de Neufbourg.",
    kitchenEyebrow: "Our cooking",
    kitchenTitle: "A short menu that changes",
    kitchen: [
      "Everything is homemade, with fresh produce. The menu stays short and changes often.",
      "Dishes are nicely presented. To drink: cocktails, coffee and a wine list. Vegetarian options are available.",
      "You can eat in, take away or get it delivered.",
    ],
    practicalEyebrow: "Practical information",
    practicalTitle: "Access and payment",
    practical: [
      "Wheelchair-accessible entrance",
      "Hearing loop",
      "Free parking",
      "Card and contactless payment",
      "Meal vouchers (titres-restaurant) and Pluxee",
    ],
    valuesEyebrow: "What matters",
    valuesTitle: "Homemade, fresh, welcoming",
    values: [
      { title: "Homemade", text: "Starters, mains and desserts are all homemade." },
      { title: "Fresh produce", text: "A short menu that follows the produce and changes often." },
      { title: "A calm atmosphere", text: "Relaxed, warm and quiet." },
    ],
    roomEyebrow: "The atmosphere",
    roomTitle: "Relaxed, warm and quiet",
    room: [
      "Lunch from Thursday to Tuesday (closed on Wednesday). Dinner on Friday and Saturday.",
      "Booking recommended for lunch and dinner.",
    ],
    band: "Come and see us",
  },
};

const practicalIcons = [Accessibility, Ear, CircleParking, CreditCard, Ticket];
const valueIcons = [UtensilsCrossed, Leaf, Sofa];

export function aboutMetadata(locale: Locale) {
  const t = copy[locale];
  return pageMetadata({ locale, title: t.title, description: t.description, path: "/about" });
}

export function AboutPage({ locale }: { locale: Locale }) {
  const t = copy[locale];
  return (
    <>
      <PageIntro eyebrow={t.eyebrow} title={t.h1}>
        <p>{t.lead}</p>
      </PageIntro>

      {/* Our cooking */}
      <section aria-labelledby="kitchen-title" className="bg-cream">
        <Container className="grid items-center gap-12 py-20 sm:py-24 lg:grid-cols-2 lg:gap-16">
          <div className="motion-reveal relative aspect-[4/5] overflow-hidden rounded-sm">
            <Image
              src={photos.walnutInterior.src}
              alt={photos.walnutInterior.alt[locale]}
              fill
              sizes="(min-width: 1024px) 540px, 100vw"
              className="object-cover"
            />
          </div>
          <div className="motion-reveal">
            <SectionHeading id="kitchen-title" eyebrow={t.kitchenEyebrow} title={t.kitchenTitle} />
            <div className="mt-6 space-y-5 text-lg leading-relaxed text-pretty text-ink-muted">
              {t.kitchen.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Practical information */}
      <section aria-labelledby="practical-title" className="bg-charcoal text-cream">
        <Container className="grid items-center gap-12 py-20 sm:py-24 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <div className="motion-reveal order-2 lg:order-1">
            <SectionHeading id="practical-title" tone="dark" eyebrow={t.practicalEyebrow} title={t.practicalTitle} />
            <ul className="mt-10 divide-y divide-cream/10 border-y border-cream/10">
              {t.practical.map((item, index) => {
                const Icon = practicalIcons[index];
                return (
                  <li key={item} className="flex items-center gap-4 py-4">
                    <Icon className="size-5 shrink-0 text-terracotta" strokeWidth={1.5} aria-hidden="true" />
                    <span className="text-lg text-cream">{item}</span>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="motion-reveal relative order-1 aspect-[4/5] overflow-hidden rounded-sm lg:order-2">
            <Image
              src={photos.chefPass.src}
              alt={photos.chefPass.alt[locale]}
              fill
              sizes="(min-width: 1024px) 480px, 100vw"
              className="object-cover"
            />
          </div>
        </Container>
      </section>

      {/* Values */}
      <section aria-labelledby="values-title" className="bg-cream">
        <Container className="py-20 sm:py-24">
          <SectionHeading id="values-title" eyebrow={t.valuesEyebrow} title={t.valuesTitle} align="center" />
          <ul className="mt-14 grid gap-10 md:grid-cols-3">
            {t.values.map(({ title, text }, index) => {
              const Icon = valueIcons[index];
              return (
                <li key={title} className="motion-reveal text-center">
                  <span className="mx-auto flex size-14 items-center justify-center rounded-full border border-olive/50">
                    <Icon className="size-6 text-olive-deep" strokeWidth={1.5} aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 font-serif text-2xl">{title}</h3>
                  <p className="mx-auto mt-2 max-w-xs leading-relaxed text-ink-muted">{text}</p>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      {/* Atmosphere */}
      <section aria-labelledby="atmosphere-title" className="bg-cream pb-20 sm:pb-24">
        <Container>
          <div className="grid items-center gap-12 border-t border-charcoal/10 pt-20 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
            <div className="motion-reveal">
              <SectionHeading id="atmosphere-title" eyebrow={t.roomEyebrow} title={t.roomTitle} />
              <div className="mt-6 space-y-5 text-lg leading-relaxed text-pretty text-ink-muted">
                {t.room.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
            <div className="motion-reveal relative aspect-[5/4] overflow-hidden rounded-sm">
              <Image
                src={photos.goldenBar.src}
                alt={photos.goldenBar.alt[locale]}
                fill
                sizes="(min-width: 1024px) 600px, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </Container>
      </section>

      <BookingBand locale={locale} title={t.band} />
    </>
  );
}
