import { ContactPage, contactMetadata } from "@/views/contact";

export const metadata = contactMetadata("fr");

export default function Page() {
  return <ContactPage locale="fr" />;
}
