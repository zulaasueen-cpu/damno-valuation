import { getHeaderMenu } from "@/lib/cms/menus";
import { Link } from "@/i18n/routing";
import Image from "@/components/common/Image";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { MobileMenu } from "./MobileMenu";

interface HeaderProps {
  locale: string;
}

export async function Header({ locale }: HeaderProps) {
  const items = await getHeaderMenu(locale);
  const logo = locale === "mn" ? "/logo-mn.svg" : "/logo-en.svg";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-8 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image src={logo} alt="ДАМНО ҮНЭЛГЭЭ" width={200} height={48} className="h-10 w-auto" />
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {items.map((item) => (
            <Link
              key={item._id}
              href={item.url ?? "/"}
              target={item.target ?? undefined}
              className="text-sm font-medium text-white/80 hover:text-white transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-6">
          <LanguageSwitcher />
          <Link
            href="/contact"
            className="rounded-full bg-white text-background px-5 py-2.5 text-sm font-semibold hover:scale-[1.02] transition-transform"
          >
            Захиалах
          </Link>
        </div>

        <MobileMenu items={items} />
      </div>
    </header>
  );
}
