import type { ReactNode } from "react";
import { SiteShell } from "@/components/site-shell";

/** French pages (default language, no URL prefix). */
export default function FrenchLayout({ children }: { children: ReactNode }) {
  return <SiteShell locale="fr">{children}</SiteShell>;
}
