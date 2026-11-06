export const site = {
  name: "Velora Kitchen",
  tagline: "Modern flavours, warm atmosphere",
  description:
    "Velora Kitchen is a fictional modern restaurant in Manchester offering warm dining, seasonal dishes and a relaxed premium atmosphere.",
  // If this changes, also update src/app/robots.txt and src/app/sitemap.xml.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://velora-kitchen.ammar-rajabi.com",
  address: {
    street: "18 King Street",
    city: "Manchester",
    postcode: "M2 6AG",
    country: "United Kingdom",
  },
  phone: "0161 555 3920",
  phoneHref: "tel:+441615553920",
  email: "hello@velorakitchen.co.uk",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=18+King+Street+Manchester+M2+6AG",
} as const;

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/menu", label: "Menu" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
] as const;

export const openingHours = [
  { days: "Monday", time: "Closed" },
  { days: "Tuesday to Thursday", time: "12:00 – 22:00" },
  { days: "Friday and Saturday", time: "12:00 – 23:00" },
  { days: "Sunday", time: "12:00 – 21:00" },
] as const;
