import { GalleryPage, galleryMetadata } from "@/views/gallery";

export const metadata = galleryMetadata("fr");

export default function Page() {
  return <GalleryPage locale="fr" />;
}
