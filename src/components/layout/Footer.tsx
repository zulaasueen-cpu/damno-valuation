import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import Image from "@/components/common/Image";

interface FooterProps {
  locale: string;
}

export function Footer({ locale }: FooterProps) {
  const tNav = useTranslations("nav");
  const t = useTranslations("footer");
  const menuItems = [
    { label: tNav("home"), url: "/" },
    { label: tNav("about"), url: "/about" },
    { label: tNav("services"), url: "/services" },
    { label: tNav("pricing"), url: "/pricing" },
    { label: tNav("portfolio"), url: "/portfolio" },
    { label: tNav("blog"), url: "/blog" },
  ];

  return (
    <footer className="bg-black text-white">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <Image src="/logo-mn.svg" alt="ДАМНО ҮНЭЛГЭЭ" width={260} height={64} className="h-16 w-auto mb-6" />
            <p className="text-white/60 max-w-sm leading-relaxed">
              ДАМНО ҮНЭЛГЭЭ ХХК нь Сангийн яамнаас 2023 оны 11 дүгээр сарын 28-ны өдөр тусгай зөвшөөрөл авсан №140600033 дугаартай, хугацаагүй эрхтэй үнэлгээний компани юм.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">{t("menu")}</h4>
            <ul className="space-y-3">
              {menuItems.map((item) => (
                <li key={item.url}>
                  <Link href={item.url} className="text-white/60 hover:text-white transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">{t("legal")}</h4>
            <ul className="space-y-3 mb-8">
              <li>
                <Link href="/privacy" className="text-white/60 hover:text-white transition-colors">
                  {t("privacy")}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-white/60 hover:text-white transition-colors">
                  {t("terms")}
                </Link>
              </li>
            </ul>
            <h4 className="font-semibold mb-4">{t("contact")}</h4>
            <ul className="space-y-3 text-sm text-white/60">
              <li>
                <span className="text-white/80 font-medium">{t("address")}:</span> {t("addressValue")}
              </li>
              <li>
                <span className="text-white/80 font-medium">{t("phone")}:</span> {t("phoneValue")}
              </li>
              <li>
                <span className="text-white/80 font-medium">{t("email")}:</span> {t("emailValue")}
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/50 text-sm">© {new Date().getFullYear()} {t("rights")}</p>
        </div>
      </div>
    </footer>
  );
}
