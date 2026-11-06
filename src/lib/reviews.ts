import type { Locale } from "./i18n";

/**
 * Real Google reviews of Le 9bourg, quoted exactly (cuts marked with "…").
 * First name and initial only. The English text is our translation and is labelled as such on the page.
 */
export const reviews: { name: string; quote: Record<Locale, string> }[] = [
  {
    name: "Jocelyne B.",
    quote: {
      fr: "… accueil très convivial, repas excellent, plats présentés avec raffinement, fait maison. Ambiance décontractée.",
      en: "… a very friendly welcome, an excellent meal, dishes presented with refinement, homemade. Relaxed atmosphere.",
    },
  },
  {
    name: "Marie M.",
    quote: {
      fr: "Fait maison, nous nous sommes régalés - Rapport qualité prix rien à redire. Service rapide et efficace - un régal du début à la fin.",
      en: "Homemade, we really enjoyed it - Nothing to fault on value for money. Quick, efficient service - a treat from start to finish.",
    },
  },
  {
    name: "Kévin M.",
    quote: {
      fr: "Petit resto sympa, ouvrez la porte et rentrez : vous êtes au bon endroit pour goûter une cuisine simple mais pleine de saveurs, recherchée avec des produits frais.",
      en: "A nice little restaurant, open the door and come in: you are in the right place to taste simple but flavourful, thoughtful cooking with fresh produce.",
    },
  },
];
