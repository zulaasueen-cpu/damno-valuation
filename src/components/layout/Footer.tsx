import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import Image from "@/components/common/Image";

interface FooterProps {
  locale: string;
}

export function Footer({ locale }: FooterProps) {
  const t = useTranslations("nav");
  const menuItems = [
    { label: t("home"), url: "/" },
    { label: t("about"), url: "/about" },
    { label: t("services"), url: "/services" },
    { label: t("pricing"), url: "/pricing" },
    { label: t("portfolio"), url: "/portfolio" },
    { label: t("blog"), url: "/blog" },
  ];

  return (
    <footer className="bg-black text-white">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <Image src="/logo-mn.svg" alt="ДАМНО ҮНЭЛГЭЭ" width={180} height={44} className="h-10 w-auto mb-6" />
            <p className="text-white/60 max-w-sm leading-relaxed">
              ДАМНО ҮНЭЛГЭЭ ХХК нь Сангийн яамнаас 2023 оны 11 дүгээр сарын 28-ны өдөр тусгай зөвшөөрөл авсан №140600033 дугаартай, хугацаагүй эрхтэй үнэлгээний компани юм.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">{locale === "mn" ? "Цэс" : "Menu"}</h4>
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
            <h4 className="font-semibold mb-4">{locale === "mn" ? "Баримт бичиг" : "Legal"}</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/privacy" className="text-white/60 hover:text-white transition-colors">
                  {locale === "mn" ? "Нууцлалын бодлого" : "Privacy Policy"}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-white/60 hover:text-white transition-colors">
                  {locale === "mn" ? "Үйлчилгээний нөхцөл" : "Terms of Service"}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/50 text-sm">© {new Date().getFullYear()} {locale === "mn" ? "Бүх эрх хуулиар хамгаалагдсан. ДАМНО ҮНЭЛГЭЭ ХХК" : "All rights reserved. Damno Valuation LLC"}</p>
        </div>
      </div>
    </footer>
  );
}
