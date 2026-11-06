import type { Locale } from "./i18n";
import { photos, type Photo } from "./photos";

/**
 * Example weekend set menu, copied from Le 9bourg's Facebook page.
 * The menu changes often: always present it as an example.
 * Dish names stay in French on both language versions (they are the restaurant's own names).
 */
export type MenuSection = {
  id: string;
  title: Record<Locale, string>;
  photo: Photo;
  items: string[];
};

export const setMenuPrices = [
  { label: { fr: "Entrée + plat + dessert", en: "Starter + main + dessert" }, price: 34 },
  { label: { fr: "Entrée + plat ou plat + dessert", en: "Starter + main, or main + dessert" }, price: 29 },
] as const;

export const menuSections: MenuSection[] = [
  {
    id: "entrees",
    title: { fr: "Entrées", en: "Starters" },
    photo: photos.seaBream,
    items: [
      "Caprice des dieux pané, bacon",
      "Saumon fumé maison, crème d'Isigny citronnée",
      "Tartine magret fumé, Boursin aux noix",
    ],
  },
  {
    id: "plats",
    title: { fr: "Plats", en: "Mains" },
    photo: photos.sirloin,
    items: [
      "Filet de bœuf, jus au thym, frites",
      "Pavé de saumon, beurre blanc, purée",
      "Magret de canard sauce miel, purée de patates douces",
    ],
  },
  {
    id: "desserts",
    title: { fr: "Desserts", en: "Desserts" },
    photo: photos.chocolate,
    items: ["Tartelette citron", "Dôme au chocolat", "Flan noix de coco"],
  },
];

/** Dishes Google reviewers photograph most (they depend on the menu of the moment). */
export const customerFavourites = [
  "Pavlova",
  "Saint-Jacques",
  "Mousse chorizo et poivrons verts",
  "Tartelette",
  "Foie gras, confit d'oignon",
];

/** Featured on the home page: one dish per course from the example weekend menu. */
export const featuredDishes = [
  { course: { fr: "Entrée", en: "Starter" }, name: "Saumon fumé maison, crème d'Isigny citronnée", photo: photos.seaBream },
  { course: { fr: "Plat", en: "Main" }, name: "Filet de bœuf, jus au thym, frites", photo: photos.sirloin },
  { course: { fr: "Dessert", en: "Dessert" }, name: "Dôme au chocolat", photo: photos.chocolate },
];

export function formatPrice(value: number, locale: Locale) {
  return new Intl.NumberFormat(locale === "fr" ? "fr-FR" : "en-GB", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}
