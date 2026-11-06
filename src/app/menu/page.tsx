import Image from "next/image";
import { BookingBand } from "@/components/booking-band";
import { PageIntro } from "@/components/page-intro";
import { Container, WaveDivider } from "@/components/ui";
import { dietaryLabels, formatPrice, menuSections, type DietaryTag } from "@/lib/menu";
import { pageMetadata } from "@/lib/metadata";
import { photos } from "@/lib/photos";

export const metadata = pageMetadata({
  title: "Menu",
  description:
    "The Velora Kitchen sample menu: seasonal starters, main courses, desserts and drinks with fictional prices in GBP and clear vegetarian, vegan and gluten-free labels.",
  path: "/menu",
});

function DietaryBadge({ tag }: { tag: DietaryTag }) {
  return (
    <abbr
      title={dietaryLabels[tag]}
      className="inline-flex h-5 min-w-7 items-center justify-center rounded-sm border border-olive px-1 text-[0.7rem] font-medium tracking-wide text-olive-deep no-underline"
    >
      {tag}
    </abbr>
  );
}

export default function MenuPage() {
  return (
    <>
      <PageIntro eyebrow="Our menu" title="Seasonal plates, fairly priced">
        <p>
          A short menu that changes with the market. This is a sample menu with fictional prices. Please tell us about
          any allergies when you book.
        </p>
      </PageIntro>

      <div className="bg-cream">
        <Container className="pt-12">
          <div className="relative aspect-[16/9] overflow-hidden rounded-sm sm:aspect-[21/9]">
            <Image
              src={photos.sharedTable.src}
              alt={photos.sharedTable.alt}
              fill
              sizes="(min-width: 1152px) 1088px, 100vw"
              className="object-cover"
            />
          </div>

          {/* Section jump links and dietary key */}
          <div className="mt-10 flex flex-col gap-6 border-b border-charcoal/10 pb-8 md:flex-row md:items-center md:justify-between">
            <nav aria-label="Menu sections">
              <ul className="flex flex-wrap gap-2">
                {menuSections.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="inline-flex min-h-11 items-center rounded-full border border-charcoal/20 px-4 text-sm transition-colors hover:border-charcoal hover:bg-charcoal hover:text-cream"
                    >
                      {section.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <dl className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-ink-muted" aria-label="Dietary key">
              {(Object.keys(dietaryLabels) as DietaryTag[]).map((tag) => (
                <div key={tag} className="flex items-center gap-2">
                  <dt>
                    <DietaryBadge tag={tag} />
                  </dt>
                  <dd>{dietaryLabels[tag]}</dd>
                </div>
              ))}
            </dl>
          </div>
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
                  <p className="font-serif text-sm text-terracotta-dark italic">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h2 id={`${section.id}-title`} className="mt-1 font-serif text-4xl sm:text-5xl">
                    {section.title}
                  </h2>
                  <WaveDivider className="mt-4" />
                  <p className="mt-4 text-ink-muted">{section.note}</p>

                  <ul className="mt-8 divide-y divide-charcoal/10 border-t border-charcoal/10">
                    {section.items.map((item) => (
                      <li key={item.name} className="py-5">
                        <div className="flex items-baseline gap-3">
                          <h3 className="font-serif text-xl leading-snug sm:text-2xl">{item.name}</h3>
                          <span
                            className="min-w-6 flex-1 translate-y-[-0.3em] border-b border-dotted border-charcoal/30"
                            aria-hidden="true"
                          />
                          <p className="shrink-0 font-serif text-xl tabular-nums sm:text-2xl">
                            <span className="sr-only">Price: </span>
                            {formatPrice(item.price)}
                          </p>
                        </div>
                        <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-2">
                          <p className="text-ink-muted">{item.description}</p>
                          {item.tags?.length ? (
                            <p className="flex gap-1.5">
                              {item.tags.map((tag) => (
                                <DietaryBadge key={tag} tag={tag} />
                              ))}
                            </p>
                          ) : null}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="relative hidden aspect-[3/4] overflow-hidden rounded-sm lg:sticky lg:top-28 lg:block lg:self-start">
                  <Image
                    src={section.photo.src}
                    alt={section.photo.alt}
                    fill
                    sizes="320px"
                    className="object-cover"
                  />
                </div>
              </section>
            ))}
          </div>

          <p className="mt-16 border-t border-charcoal/10 pt-6 text-sm leading-relaxed text-ink-muted">
            All prices include VAT. A discretionary service charge of 10% is added for tables of six or more. Our kitchen
            handles nuts, gluten and other allergens, so we cannot guarantee any dish is completely free of them.
          </p>
        </Container>
      </div>

      <BookingBand title="Hungry yet?" />
    </>
  );
}
