import { ButtonLink, Container, Eyebrow, WaveDivider } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="bg-cream">
      <Container className="py-24 text-center sm:py-32">
        <Eyebrow>Page not found</Eyebrow>
        <h1 className="mt-4 font-serif text-5xl sm:text-6xl">This table is not on our floor plan</h1>
        <WaveDivider className="mx-auto mt-6" />
        <p className="mx-auto mt-6 max-w-md text-lg text-ink-muted">
          The page you are looking for has moved or never existed. Try the menu, or head back home.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href="/">Back to home</ButtonLink>
          <ButtonLink href="/menu" variant="outline-light">
            View the menu
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
