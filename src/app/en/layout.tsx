import type { ReactNode } from "react";
import { SiteShell } from "@/components/site-shell";

/** English pages under /en, using the same components as the French site. */
export default function EnglishLayout({ children }: { children: ReactNode }) {
  return <SiteShell locale="en">{children}</SiteShell>;
}
