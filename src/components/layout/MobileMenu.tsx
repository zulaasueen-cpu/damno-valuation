"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function MobileMenu() {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);

  const items = [
    { label: t("home"), url: "/" },
    { label: t("about"), url: "/about" },
    { label: t("services"), url: "/services" },
    { label: t("pricing"), url: "/pricing" },
    { label: t("portfolio"), url: "/portfolio" },
    { label: t("blog"), url: "/blog" },
    { label: t("contact"), url: "/contact" },
  ];

  return (
    <div className="lg:hidden">
      <button className="text-white" onClick={() => setOpen(!open)} aria-label="Menu">
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed inset-x-0 top-20 bg-background border-b border-border"
          >
            <nav className="flex flex-col px-6 py-6 gap-4">
              {items.map((item) => (
                <Link
                  key={item.url}
                  href={item.url}
                  onClick={() => setOpen(false)}
                  className="text-base font-medium text-white/80 hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-4 flex items-center justify-between">
                <LanguageSwitcher />
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="rounded-full bg-white text-background px-5 py-2.5 text-sm font-semibold"
                >
                  {t("order")}
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
