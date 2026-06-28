import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import ApolloClientProvider from "@/lib/apollo/provider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "../globals.css";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "ДАМНО ҮНЭЛГЭЭ | Хөрөнгийн үнэлгээний мэргэшсэн шийдэл",
  description:
    "ДАМНО ҮНЭЛГЭЭ ХХК — 2008 оноос хойш хөрөнгийн үнэлгээ, банкны барьцаа, бизнесийн үнэлгээ, хохирол тогтоолгоо үйлчилгээг YOVC, НБОУС стандартаар үзүүлж байна.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://damno.mn"),
};

export const dynamic = "force-static";

export function generateStaticParams() {
  return [{ locale: "mn" }, { locale: "en" }];
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${openSans.variable} antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <NextIntlClientProvider messages={messages}>
          <ApolloClientProvider>
            <Header locale={locale} />
            <main className="flex-1">{children}</main>
            <Footer locale={locale} />
          </ApolloClientProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
