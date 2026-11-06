import { MenuPage, menuMetadata } from "@/views/menu";

export const metadata = menuMetadata("en");

export default function Page() {
  return <MenuPage locale="en" />;
}
