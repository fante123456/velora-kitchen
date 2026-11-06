/**
 * Every photo on the site comes from Unsplash (free licence).
 * The query string must match `remotePatterns.search` in next.config.ts.
 */
const SOURCE_QUERY = "?fm=jpg&q=80&w=2000&fit=max";

export type Photo = {
  src: string;
  alt: string;
  credit: { name: string; username: string };
};

function unsplash(id: string, alt: string, name: string, username: string): Photo {
  return {
    src: `https://images.unsplash.com/${id}${SOURCE_QUERY}`,
    alt,
    credit: { name, username },
  };
}

export const photos = {
  heroDiningRoom: unsplash(
    "photo-1608816042754-d69cb2271bea",
    "Warmly lit dining room with wooden chairs and tables laid with glasses and white plates",
    "Vitor Paladini",
    "vtrpldn",
  ),
  walnutInterior: unsplash(
    "photo-1766832255363-c9f060ade8b0",
    "Restaurant interior with walnut shelving and tables dressed in white linen",
    "Tanja Tepavac",
    "ttepavac",
  ),
  goldenBar: unsplash(
    "photo-1687945512099-400cbe94460c",
    "Bar and lounge in soft golden light with terracotta armchairs and a long counter",
    "ASR Design Studio",
    "asrdesignstudio",
  ),
  candleTable: unsplash(
    "photo-1716317662068-2733a6e592db",
    "Table with two wine glasses and a small lamp beside rattan-backed chairs",
    "Jivan Garcha",
    "jivangarcha",
  ),
  tableSetting: unsplash(
    "photo-1593515463811-63535505f44a",
    "Fork and knife resting on a folded linen napkin at a set table",
    "Hayley Kim Studios",
    "hayleykimstudios",
  ),
  sharedTable: unsplash(
    "photo-1731941465921-eb4285693713",
    "Shared table with red wine, glasses and several small plated dishes",
    "Kamilla Isalieva",
    "kamillaisalieva",
  ),
  chefPass: unsplash(
    "photo-1577219491135-ce391730fb2c",
    "Chef plating dishes beneath copper heat lamps in an open kitchen",
    "Louis Hansel",
    "louishansel",
  ),
  chefPlating: unsplash(
    "photo-1761095596755-99ba58997720",
    "Chef pointing to a plated seafood dish on a wooden counter",
    "Madeline Liu",
    "madeline_sd",
  ),
  sirloin: unsplash(
    "photo-1663530761401-15eefb544889",
    "Sauce being spooned over a plated steak with a small side, on a dark background",
    "Urban Gyllström",
    "gyllstrom_photo",
  ),
  cod: unsplash(
    "photo-1676471932681-45fa972d848a",
    "Sauce poured from a small jug over a plated fish dish on a white tablecloth",
    "Nima Naseri",
    "nimanaseri",
  ),
  pasta: unsplash(
    "photo-1683827449087-ccf5a9e6283c",
    "Spaghetti with crisp pancetta on a black plate",
    "Helen Van",
    "uynnha",
  ),
  sourdough: unsplash(
    "photo-1628809643520-7c20491d5324",
    "Seeded loaf with thick slices cut, on a dark cloth",
    "Helen Van",
    "uynnha",
  ),
  seaBream: unsplash(
    "photo-1750943031775-f18a5dba24c3",
    "Plated fish starter beside a glass of white wine in low light",
    "Tommaso Ubezio",
    "tommasoubezio",
  ),
  cremeCaramel: unsplash(
    "photo-1792862242002-40af9499b301",
    "Crème caramel topped with a thin caramel shard in a white bowl",
    "Stefano Intintoli",
    "stefano_intintoli",
  ),
  chocolate: unsplash(
    "photo-1777897311527-d7e1b2775c84",
    "Chocolate dessert with cream and cocoa crumb, held by a server in a white jacket",
    "Tommaso Ubezio",
    "tommasoubezio",
  ),
  sour: unsplash(
    "photo-1628531199920-f328a07ef139",
    "Orange cocktail in a stemmed coupe glass on a bar with warm lights behind",
    "Maria Dempsey",
    "messyhairandplants",
  ),
  oldFashioned: unsplash(
    "photo-1654677608880-51f63b5dee97",
    "Bartender spritzing citrus over an amber cocktail in a tumbler",
    "Martina Alpeza",
    "alpeza",
  ),
  flatWhite: unsplash(
    "photo-1503240778100-fd245e17a273",
    "Flat white with leaf latte art on a wooden table",
    "Lex Sirikiat",
    "pundalex",
  ),
} satisfies Record<string, Photo>;

export function unsplashProfile(username: string) {
  return `https://unsplash.com/@${username}?utm_source=velora_kitchen&utm_medium=referral`;
}
