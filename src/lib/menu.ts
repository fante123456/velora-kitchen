import { photos, type Photo } from "./photos";

export type DietaryTag = "V" | "VG" | "GF";

export const dietaryLabels: Record<DietaryTag, string> = {
  V: "Vegetarian",
  VG: "Vegan",
  GF: "Gluten free",
};

export type MenuItem = {
  name: string;
  description: string;
  price: number;
  tags?: DietaryTag[];
};

export type MenuSection = {
  id: string;
  title: string;
  note: string;
  photo: Photo;
  items: MenuItem[];
};

export const menuSections: MenuSection[] = [
  {
    id: "starters",
    title: "Starters",
    note: "Small plates to share or keep to yourself.",
    photo: photos.seaBream,
    items: [
      {
        name: "Seeded sourdough",
        description: "Baked each morning, served warm with smoked butter and sea salt.",
        price: 5.5,
        tags: ["V"],
      },
      {
        name: "Cured sea bream",
        description: "Blood orange, shaved fennel and dill oil.",
        price: 11,
        tags: ["GF"],
      },
      {
        name: "Charred leeks",
        description: "Hazelnut romesco, crispy shallots and chives.",
        price: 9,
        tags: ["VG"],
      },
      {
        name: "Ham hock croquettes",
        description: "Golden and crisp, with house piccalilli.",
        price: 9,
      },
    ],
  },
  {
    id: "mains",
    title: "Main Courses",
    note: "Seasonal British produce, cooked over the grill and in the oven.",
    photo: photos.sirloin,
    items: [
      {
        name: "Aged beef sirloin",
        description: "Red wine jus, confit shallot and watercress.",
        price: 29,
        tags: ["GF"],
      },
      {
        name: "Roast cod",
        description: "Brown shrimp butter and charred hispi cabbage.",
        price: 24,
        tags: ["GF"],
      },
      {
        name: "Spaghetti with crisp pancetta",
        description: "Egg yolk, black pepper and aged pecorino.",
        price: 18,
      },
      {
        name: "Wild mushroom risotto",
        description: "Thyme, roasted garlic and vegetarian hard cheese.",
        price: 17,
        tags: ["V", "GF"],
      },
    ],
  },
  {
    id: "desserts",
    title: "Desserts",
    note: "Made in our pastry corner every afternoon.",
    photo: photos.cremeCaramel,
    items: [
      {
        name: "Burnt honey crème caramel",
        description: "Silky custard with a thin caramel shard.",
        price: 8,
        tags: ["V", "GF"],
      },
      {
        name: "Dark chocolate delice",
        description: "Crème fraîche and cocoa crumb.",
        price: 9,
        tags: ["V"],
      },
      {
        name: "Seasonal sorbet",
        description: "Three scoops, flavours change with the market.",
        price: 6.5,
        tags: ["VG", "GF"],
      },
    ],
  },
  {
    id: "drinks",
    title: "Drinks",
    note: "A short list of cocktails, alcohol-free options and coffee.",
    photo: photos.sour,
    items: [
      {
        name: "Velora sour",
        description: "Passion fruit, vanilla vodka and lime, shaken with aquafaba.",
        price: 11,
        tags: ["VG"],
      },
      {
        name: "Smoked orange old fashioned",
        description: "Bourbon, orange bitters and a twist of smoked peel.",
        price: 12,
        tags: ["VG"],
      },
      {
        name: "Elderflower and cucumber spritz",
        description: "Alcohol free, light and very cold.",
        price: 6,
        tags: ["VG", "GF"],
      },
      {
        name: "Flat white",
        description: "Single-origin espresso. Oat milk on request.",
        price: 3.6,
        tags: ["V"],
      },
    ],
  },
];

export const featuredDishes = [
  {
    name: "Cured sea bream",
    description: "Blood orange, shaved fennel and dill oil. Bright, fresh and light.",
    price: 11,
    photo: photos.seaBream,
  },
  {
    name: "Aged beef sirloin",
    description: "Red wine jus poured at the table, confit shallot and watercress.",
    price: 29,
    photo: photos.sirloin,
  },
  {
    name: "Burnt honey crème caramel",
    description: "Silky set custard with a deep honey caramel and a thin sugar shard.",
    price: 8,
    photo: photos.cremeCaramel,
  },
];

export function formatPrice(price: number) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: Number.isInteger(price) ? 0 : 2,
  }).format(price);
}
