import type { ReactNode } from "react";
import { Container, Eyebrow, WaveDivider } from "./ui";

/** Cream page header used by the inner pages. Holds the page's single H1. */
export function PageIntro({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="border-b border-charcoal/10 bg-cream">
      <Container className="py-16 sm:py-20 lg:py-24">
        <div className="motion-rise max-w-3xl">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="mt-4 font-serif text-5xl leading-[1.05] text-balance text-charcoal sm:text-6xl lg:text-7xl">
            {title}
          </h1>
          <WaveDivider className="mt-6" />
          {children ? (
            <div className="mt-6 max-w-2xl text-lg leading-relaxed text-pretty text-ink-muted">{children}</div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
