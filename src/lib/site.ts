import type { Locale } from "./i18n";

/**
 * Le 9bourg, Saint-Lô. Every fact below was verified from public sources on 6 Nov 2026
 * (Google Maps listing and the restaurant's Facebook page). Do not add facts that are not here.
 */
export const site = {
  name: "Le 9bourg",
  // If this changes, also update src/app/robots.txt and src/app/sitemap.xml.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://velora-kitchen.ammar-rajabi.com",
  address: {
    street: "64 rue de Neufbourg",
    postcode: "50000",
    city: "Saint-Lô",
  },
  phone: "09 52 88 44 50",
  phoneHref: "tel:+33952884450",
  mapsUrl: "https://maps.google.com/?cid=17240466865448566424",
  directionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=Le+9bourg%2C+64+rue+de+Neufbourg%2C+50000+Saint-L%C3%B4",
  facebookUrl: "https://www.facebook.com/profile.php?id=61550853158522",
  rating: { fr: "4,7", en: "4.7", count: 177 },
} as const;

export const tagline: Record<Locale, string> = {
  fr: "Cuisine française faite maison à Saint-Lô",
  en: "Homemade French cooking in Saint-Lô",
};

export const description: Record<Locale, string> = {
  fr: "Le 9bourg, restaurant de cuisine française faite maison à Saint-Lô, 64 rue de Neufbourg. Petite carte qui change, produits frais. Réservation au 09 52 88 44 50.",
  en: "Le 9bourg is a homemade French restaurant in Saint-Lô, 64 rue de Neufbourg. A short menu that changes, fresh produce. Book on 09 52 88 44 50.",
};

export const navLinks: Record<Locale, { href: string; label: string }[]> = {
  fr: [
    { href: "/", label: "Accueil" },
    { href: "/about", label: "Le restaurant" },
    { href: "/menu", label: "La carte" },
    { href: "/gallery", label: "Galerie" },
    { href: "/contact", label: "Contact" },
  ],
  en: [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/menu", label: "Menu" },
    { href: "/gallery", label: "Gallery" },
    { href: "/contact", label: "Contact" },
  ],
};

type HoursRow = { days: string; time: string };

/** One row per day (Contact page). Dinner only on Friday and Saturday. */
export const openingHoursByDay: Record<Locale, HoursRow[]> = {
  fr: [
    { days: "Lundi", time: "12h – 14h" },
    { days: "Mardi", time: "12h – 14h" },
    { days: "Mercredi", time: "Fermé" },
    { days: "Jeudi", time: "12h – 14h" },
    { days: "Vendredi", time: "12h – 14h, 19h – 22h" },
    { days: "Samedi", time: "12h – 14h, 19h – 22h" },
    { days: "Dimanche", time: "12h – 14h" },
  ],
  en: [
    { days: "Monday", time: "12:00 – 14:00" },
    { days: "Tuesday", time: "12:00 – 14:00" },
    { days: "Wednesday", time: "Closed" },
    { days: "Thursday", time: "12:00 – 14:00" },
    { days: "Friday", time: "12:00 – 14:00, 19:00 – 22:00" },
    { days: "Saturday", time: "12:00 – 14:00, 19:00 – 22:00" },
    { days: "Sunday", time: "12:00 – 14:00" },
  ],
};

/** Short version (footer). */
export const openingHoursSummary: Record<Locale, HoursRow[]> = {
  fr: [
    { days: "Lundi, mardi, jeudi, dimanche", time: "12h – 14h" },
    { days: "Vendredi et samedi", time: "12h – 14h et 19h – 22h" },
    { days: "Mercredi", time: "Fermé" },
  ],
  en: [
    { days: "Monday, Tuesday, Thursday, Sunday", time: "12:00 – 14:00" },
    { days: "Friday and Saturday", time: "12:00 – 14:00 and 19:00 – 22:00" },
    { days: "Wednesday", time: "Closed" },
  ],
};
