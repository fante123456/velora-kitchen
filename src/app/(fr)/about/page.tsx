import { AboutPage, aboutMetadata } from "@/views/about";

export const metadata = aboutMetadata("fr");

export default function Page() {
  return <AboutPage locale="fr" />;
}
