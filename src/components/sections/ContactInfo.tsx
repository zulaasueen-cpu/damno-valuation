"use client";

import { useTranslations } from "next-intl";
import { MapPin, Phone, Mail } from "lucide-react";

export function ContactInfo() {
  const t = useTranslations("contact");

  return (
    <div className="space-y-4">
      <h2 className="text-2xl md:text-3xl font-bold mb-6">{t("infoTitle")}</h2>

      <div className="rounded-2xl border border-border bg-card/50 p-5 flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <MapPin className="h-5 w-5" />
        </div>
        <div>
          <p className="text-sm font-semibold text-muted-foreground mb-1">{t("address")}</p>
          <p className="text-base">{t("addressValue")}</p>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card/50 p-5 flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Phone className="h-5 w-5" />
        </div>
        <div>
          <p className="text-sm font-semibold text-muted-foreground mb-1">{t("phone")}</p>
          <p className="text-base">{t("phoneValue")}</p>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card/50 p-5 flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Mail className="h-5 w-5" />
        </div>
        <div>
          <p className="text-sm font-semibold text-muted-foreground mb-1">{t("email")}</p>
          <p className="text-base">{t("emailValue")}</p>
        </div>
      </div>
    </div>
  );
}
