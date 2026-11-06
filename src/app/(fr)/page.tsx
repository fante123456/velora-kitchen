import { HomePage, homeMetadata } from "@/views/home";

export const metadata = homeMetadata("fr");

export default function Page() {
  return <HomePage locale="fr" />;
}
