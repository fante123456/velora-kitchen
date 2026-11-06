import { MenuPage, menuMetadata } from "@/views/menu";

export const metadata = menuMetadata("fr");

export default function Page() {
  return <MenuPage locale="fr" />;
}
