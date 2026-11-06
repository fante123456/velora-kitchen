import type { Locale } from "./i18n";

/**
 * Every photo on the site comes from Unsplash (free licence). They are illustrative
 * stock photos, not photos of Le 9bourg (real photos come in a later step).
 * The query string must match `remotePatterns.search` in next.config.ts.
 */
const SOURCE_QUERY = "?fm=jpg&q=80&w=2000&fit=max";

export type Photo = {
  src: string;
  alt: Record<Locale, string>;
  credit: { name: string; username: string };
};

function unsplash(id: string, fr: string, en: string, name: string, username: string): Photo {
  return {
    src: `https://images.unsplash.com/${id}${SOURCE_QUERY}`,
    alt: { fr, en },
    credit: { name, username },
  };
}

export const photos = {
  heroDiningRoom: unsplash(
    "photo-1608816042754-d69cb2271bea",
    "Salle de restaurant éclairée en lumière chaude, chaises en bois et tables dressées avec verres et assiettes blanches",
    "Warmly lit dining room with wooden chairs and tables laid with glasses and white plates",
    "Vitor Paladini",
    "vtrpldn",
  ),
  walnutInterior: unsplash(
    "photo-1766832255363-c9f060ade8b0",
    "Salle de restaurant avec étagères en bois foncé et tables nappées de blanc",
    "Restaurant interior with walnut shelving and tables dressed in white linen",
    "Tanja Tepavac",
    "ttepavac",
  ),
  goldenBar: unsplash(
    "photo-1687945512099-400cbe94460c",
    "Bar et salon dans une lumière dorée, fauteuils couleur terre cuite et long comptoir",
    "Bar and lounge in soft golden light with terracotta armchairs and a long counter",
    "ASR Design Studio",
    "asrdesignstudio",
  ),
  candleTable: unsplash(
    "photo-1716317662068-2733a6e592db",
    "Table avec deux verres à vin et une petite lampe, près de chaises au dossier en rotin",
    "Table with two wine glasses and a small lamp beside rattan-backed chairs",
    "Jivan Garcha",
    "jivangarcha",
  ),
  tableSetting: unsplash(
    "photo-1593515463811-63535505f44a",
    "Fourchette et couteau posés sur une serviette en lin pliée, sur une table dressée",
    "Fork and knife resting on a folded linen napkin at a set table",
    "Hayley Kim Studios",
    "hayleykimstudios",
  ),
  sharedTable: unsplash(
    "photo-1731941465921-eb4285693713",
    "Table partagée avec du vin rouge, des verres et plusieurs petites assiettes",
    "Shared table with red wine, glasses and several small plated dishes",
    "Kamilla Isalieva",
    "kamillaisalieva",
  ),
  chefPass: unsplash(
    "photo-1577219491135-ce391730fb2c",
    "Cuisinier qui dresse des assiettes sous des lampes chauffantes en cuivre, dans une cuisine ouverte",
    "Chef plating dishes beneath copper heat lamps in an open kitchen",
    "Louis Hansel",
    "louishansel",
  ),
  chefPlating: unsplash(
    "photo-1761095596755-99ba58997720",
    "Cuisinier qui montre une assiette de fruits de mer sur un comptoir en bois",
    "Chef pointing to a plated seafood dish on a wooden counter",
    "Madeline Liu",
    "madeline_sd",
  ),
  sirloin: unsplash(
    "photo-1663530761401-15eefb544889",
    "Sauce versée à la cuillère sur une pièce de viande dans l'assiette, sur fond sombre",
    "Sauce being spooned over a plated steak with a small side, on a dark background",
    "Urban Gyllström",
    "gyllstrom_photo",
  ),
  cod: unsplash(
    "photo-1676471932681-45fa972d848a",
    "Sauce versée d'un petit pot sur une assiette de poisson, sur une nappe blanche",
    "Sauce poured from a small jug over a plated fish dish on a white tablecloth",
    "Nima Naseri",
    "nimanaseri",
  ),
  pasta: unsplash(
    "photo-1683827449087-ccf5a9e6283c",
    "Spaghetti avec de la pancetta croustillante dans une assiette noire",
    "Spaghetti with crisp pancetta on a black plate",
    "Helen Van",
    "uynnha",
  ),
  sourdough: unsplash(
    "photo-1628809643520-7c20491d5324",
    "Pain aux graines coupé en tranches épaisses, sur un tissu sombre",
    "Seeded loaf with thick slices cut, on a dark cloth",
    "Helen Van",
    "uynnha",
  ),
  seaBream: unsplash(
    "photo-1750943031775-f18a5dba24c3",
    "Entrée de poisson dans l'assiette, à côté d'un verre de vin blanc, en lumière tamisée",
    "Plated fish starter beside a glass of white wine in low light",
    "Tommaso Ubezio",
    "tommasoubezio",
  ),
  cremeCaramel: unsplash(
    "photo-1792862242002-40af9499b301",
    "Crème caramel surmontée d'un fin éclat de caramel, dans un bol blanc",
    "Crème caramel topped with a thin caramel shard in a white bowl",
    "Stefano Intintoli",
    "stefano_intintoli",
  ),
  chocolate: unsplash(
    "photo-1777897311527-d7e1b2775c84",
    "Dessert au chocolat avec crème et crumble de cacao, tenu par un serveur en veste blanche",
    "Chocolate dessert with cream and cocoa crumb, held by a server in a white jacket",
    "Tommaso Ubezio",
    "tommasoubezio",
  ),
  sour: unsplash(
    "photo-1628531199920-f328a07ef139",
    "Cocktail orangé dans une coupe à pied, sur un bar aux lumières chaudes",
    "Orange cocktail in a stemmed coupe glass on a bar with warm lights behind",
    "Maria Dempsey",
    "messyhairandplants",
  ),
  oldFashioned: unsplash(
    "photo-1654677608880-51f63b5dee97",
    "Barman qui vaporise des agrumes sur un cocktail ambré dans un verre bas",
    "Bartender spritzing citrus over an amber cocktail in a tumbler",
    "Martina Alpeza",
    "alpeza",
  ),
  flatWhite: unsplash(
    "photo-1503240778100-fd245e17a273",
    "Café au lait avec un dessin de feuille dans la mousse, sur une table en bois",
    "Flat white with leaf latte art on a wooden table",
    "Lex Sirikiat",
    "pundalex",
  ),
} satisfies Record<string, Photo>;

export function unsplashProfile(username: string) {
  return `https://unsplash.com/@${username}?utm_source=le_9bourg_demo&utm_medium=referral`;
}
