import { GalleryPage, galleryMetadata } from "@/views/gallery";

export const metadata = galleryMetadata("en");

export default function Page() {
  return <GalleryPage locale="en" />;
}
