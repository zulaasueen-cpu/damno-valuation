import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";
import mnMessages from "../../messages/mn.json";
import enMessages from "../../messages/en.json";

const messagesByLocale: Record<string, typeof mnMessages> = {
  mn: mnMessages,
  en: enMessages,
};

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = routing.defaultLocale;
  try {
    const requested = await requestLocale;
    if (hasLocale(routing.locales, requested)) {
      locale = requested;
    }
  } catch {
    // fallback to default locale for static export
  }

  return {
    locale,
    messages: messagesByLocale[locale],
  };
});
