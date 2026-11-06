import Image from "next/image";
import { HandHeart, Sprout, UtensilsCrossed } from "lucide-react";
import { BookingBand } from "@/components/booking-band";
import { PageIntro } from "@/components/page-intro";
import { Container, SectionHeading } from "@/components/ui";
import { pageMetadata } from "@/lib/metadata";
import { photos } from "@/lib/photos";

export const metadata = pageMetadata({
  title: "About Us",
  description:
    "The story of Velora Kitchen, a fictional modern restaurant on King Street, Manchester: our chef, our team, our values and the room we cook for.",
  path: "/about",
});

const team = [
  { name: "Tom Okafor", role: "Sous chef", note: "Runs the grill and the Sunday roast." },
  { name: "Priya Nair", role: "Restaurant manager", note: "Looks after every booking and every guest." },
  { name: "Sam Whitfield", role: "Pastry", note: "Makes the bread, ice cream and desserts each day." },
];

const values = [
  {
    icon: Sprout,
    title: "Seasonal first",
    text: "We write the menu around what is good this week, not the other way round.",
  },
  {
    icon: UtensilsCrossed,
    title: "Simple, done carefully",
    text: "Few ingredients on each plate, cooked with attention and served at the right moment.",
  },
  {
    icon: HandHeart,
    title: "Everyone is welcome",
    text: "Dietary needs are clearly marked, and the team is always happy to adapt a dish.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageIntro eyebrow="About us" title="A warm table on King Street">
        <p>
          Velora Kitchen opened as a small idea: a restaurant that feels special without feeling formal. This is a
          fictional story written for a demo website.
        </p>
      </PageIntro>

      {/* Story */}
      <section aria-labelledby="story-title" className="bg-cream">
        <Container className="grid items-center gap-12 py-20 sm:py-24 lg:grid-cols-2 lg:gap-16">
          <div className="motion-reveal relative aspect-[4/5] overflow-hidden rounded-sm">
            <Image
              src={photos.walnutInterior.src}
              alt={photos.walnutInterior.alt}
              fill
              sizes="(min-width: 1024px) 540px, 100vw"
              className="object-cover"
            />
          </div>
          <div className="motion-reveal">
            <SectionHeading id="story-title" eyebrow="Our story" title="From a supper club to a dining room" />
            <div className="mt-6 space-y-5 text-lg leading-relaxed text-pretty text-ink-muted">
              <p>
                Our head chef, Callum Reid, began cooking monthly supper clubs for friends in a shared flat in
                Ancoats. The dinners grew from eight guests to forty, and the waiting list grew with them.
              </p>
              <p>
                In 2024 he found a former bookshop on King Street with tall windows and old walnut shelving. We kept
                the shelves, added an open kitchen and a long bar, and opened the doors as Velora Kitchen.
              </p>
              <p>The idea has not changed since the first supper club: good produce, cooked simply, shared slowly.</p>
            </div>
          </div>
        </Container>
      </section>

      {/* Chef and team */}
      <section aria-labelledby="team-title" className="bg-charcoal text-cream">
        <Container className="grid items-center gap-12 py-20 sm:py-24 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <div className="motion-reveal order-2 lg:order-1">
            <SectionHeading
              id="team-title"
              tone="dark"
              eyebrow="Chef and team"
              title="Callum Reid, head chef"
              intro="Callum cooks food he likes to eat: generous, seasonal and full of flavour. He is in the kitchen most evenings and often at the pass."
            />
            <ul className="mt-10 divide-y divide-cream/10 border-y border-cream/10">
              {team.map((member) => (
                <li key={member.name} className="grid gap-1 py-5 sm:grid-cols-[10rem_1fr] sm:gap-6">
                  <h3 className="font-serif text-xl text-cream">{member.name}</h3>
                  <p className="text-sm leading-relaxed text-cream-muted">
                    <span className="text-terracotta">{member.role}.</span> {member.note}
                  </p>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-cream-muted">Names are fictional. Photos are illustrative stock images.</p>
          </div>
          <div className="motion-reveal relative order-1 aspect-[4/5] overflow-hidden rounded-sm lg:order-2">
            <Image
              src={photos.chefPass.src}
              alt={photos.chefPass.alt}
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
          <SectionHeading id="values-title" eyebrow="What we care about" title="Our values" align="center" />
          <ul className="mt-14 grid gap-10 md:grid-cols-3">
            {values.map(({ icon: Icon, title, text }) => (
              <li key={title} className="motion-reveal text-center">
                <span className="mx-auto flex size-14 items-center justify-center rounded-full border border-olive/50">
                  <Icon className="size-6 text-olive-deep" strokeWidth={1.5} aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-serif text-2xl">{title}</h3>
                <p className="mx-auto mt-2 max-w-xs leading-relaxed text-ink-muted">{text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Atmosphere */}
      <section aria-labelledby="atmosphere-title" className="bg-cream pb-20 sm:pb-24">
        <Container>
          <div className="grid items-center gap-12 border-t border-charcoal/10 pt-20 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
            <div className="motion-reveal">
              <SectionHeading
                id="atmosphere-title"
                eyebrow="The room"
                title="Low light, soft music, long tables"
              />
              <div className="mt-6 space-y-5 text-lg leading-relaxed text-pretty text-ink-muted">
                <p>
                  The dining room seats sixty, with booths along the windows and a counter facing the kitchen. In the
                  evening the lights go down and the candles come out.
                </p>
                <p>The bar stays open between lunch and dinner for coffee, cocktails and something sweet.</p>
              </div>
            </div>
            <div className="motion-reveal relative aspect-[5/4] overflow-hidden rounded-sm">
              <Image
                src={photos.goldenBar.src}
                alt={photos.goldenBar.alt}
                fill
                sizes="(min-width: 1024px) 600px, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </Container>
      </section>

      <BookingBand title="Come and see the room" />
    </>
  );
}
