import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Tone = "light" | "dark";

/** Small uppercase label above a heading. */
export function Eyebrow({ children, tone = "light" }: { children: ReactNode; tone?: Tone }) {
  return (
    <p
      className={`text-xs font-medium uppercase tracking-[0.2em] ${
        tone === "dark" ? "text-terracotta" : "text-terracotta-dark"
      }`}
    >
      {children}
    </p>
  );
}

/** The site's one signature detail: a hand-drawn terracotta line. */
export function WaveDivider({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 160 14"
      width="160"
      height="14"
      aria-hidden="true"
      focusable="false"
      className={`text-terracotta ${className}`}
    >
      <path
        d="M2 8.5c9-6 17 4.5 27-.5s16-6.5 26-.5 17 6 27 .5 16-6.5 26-.5 17 5.5 26 .5 13-4 24-1"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type ButtonVariant = "primary" | "outline-light" | "outline-dark";

const buttonStyles: Record<ButtonVariant, string> = {
  primary: "bg-terracotta-deep text-cream hover:bg-terracotta-dark",
  "outline-light": "border border-charcoal/25 text-charcoal hover:border-charcoal hover:bg-charcoal hover:text-cream",
  "outline-dark": "border border-cream/30 text-cream hover:border-cream hover:bg-cream hover:text-charcoal",
};

const buttonBase =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-medium tracking-wide transition-colors duration-200";

export function ButtonLink({
  variant = "primary",
  className = "",
  ...props
}: ComponentProps<typeof Link> & { variant?: ButtonVariant }) {
  return <Link {...props} className={`${buttonBase} ${buttonStyles[variant]} ${className}`} />;
}

/** Same look as ButtonLink, for tel: links and other websites. */
export function ButtonAnchor({
  variant = "primary",
  className = "",
  ...props
}: ComponentProps<"a"> & { variant?: ButtonVariant }) {
  return <a {...props} className={`${buttonBase} ${buttonStyles[variant]} ${className}`} />;
}

/** Text logo: "le 9bourg" with a slightly bigger, bolder terracotta 9 (their wall sign says "le 9"). */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`font-serif tracking-tight ${className}`}>
      le{" "}
      <span className="text-[1.3em] leading-none font-semibold text-terracotta">9</span>bourg
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  tone = "light",
  align = "left",
  id,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  tone?: Tone;
  align?: "left" | "center";
  id?: string;
}) {
  const centered = align === "center";
  return (
    <div className={`max-w-2xl ${centered ? "mx-auto text-center" : ""}`}>
      <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
      <h2
        id={id}
        className={`mt-4 font-serif text-3xl leading-tight text-balance sm:text-4xl lg:text-5xl ${
          tone === "dark" ? "text-cream" : "text-charcoal"
        }`}
      >
        {title}
      </h2>
      <WaveDivider className={`mt-5 ${centered ? "mx-auto" : ""}`} />
      {intro ? (
        <p
          className={`mt-5 text-base leading-relaxed text-pretty sm:text-lg ${
            tone === "dark" ? "text-cream-muted" : "text-ink-muted"
          }`}
        >
          {intro}
        </p>
      ) : null}
    </div>
  );
}

export function Container({ className = "", ...props }: ComponentProps<"div">) {
  return <div {...props} className={`mx-auto w-full max-w-6xl px-5 sm:px-8 ${className}`} />;
}
