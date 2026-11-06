import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { DM_Sans, Fraunces } from "next/font/google";
import { description, site } from "@/lib/site";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const homeTitle = "Le 9bourg | Restaurant fait maison à Saint-Lô";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: homeTitle,
    template: `%s | ${site.name}`,
  },
  description: description.fr,
  applicationName: site.name,
  alternates: { canonical: "/" },
  // Practice demo for a real business (real-business branch only): keep it out of search engines.
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: site.name,
    url: "/",
    title: homeTitle,
    description: description.fr,
  },
  twitter: {
    card: "summary_large_image",
    title: homeTitle,
    description: description.fr,
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#121212",
};

/** French is the default language. English pages set lang="en" on their own wrapper (see SiteShell). */
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr" className={`${fraunces.variable} ${dmSans.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
