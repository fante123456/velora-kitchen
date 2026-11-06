import Link from "next/link";
import { SiteShell } from "@/components/site-shell";
import { ButtonLink, Container, Eyebrow, WaveDivider } from "@/components/ui";

/** Unknown URLs in either language land here, so the page is French with an English line. */
export default function NotFound() {
  return (
    <SiteShell locale="fr">
      <section className="bg-cream">
        <Container className="py-24 text-center sm:py-32">
          <Eyebrow>Page introuvable</Eyebrow>
          <h1 className="mt-4 font-serif text-5xl text-balance sm:text-6xl">Cette page n&apos;est pas à la carte</h1>
          <WaveDivider className="mx-auto mt-6" />
          <p className="mx-auto mt-6 max-w-md text-lg text-ink-muted">
            La page que vous cherchez n&apos;existe pas ou a été déplacée.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href="/">Retour à l&apos;accueil</ButtonLink>
            <ButtonLink href="/menu" variant="outline-light">
              Voir la carte
            </ButtonLink>
          </div>
          <p lang="en" className="mt-10 text-sm text-ink-muted">
            Page not found.{" "}
            <Link href="/en" className="font-medium text-charcoal underline underline-offset-4">
              Go to the English home page
            </Link>
          </p>
        </Container>
      </section>
    </SiteShell>
  );
}
