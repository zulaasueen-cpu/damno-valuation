"use client";

import { useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";

const LABELS: Record<string, string> = { en: "EN", mn: "МН" };

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const other = locale === "mn" ? "en" : "mn";

  return (
    <Link
      href={pathname}
      locale={other}
      className="text-sm font-semibold text-white/80 hover:text-white transition-colors"
    >
      {LABELS[other]}
    </Link>
  );
}
