"use client";

import { useTranslations } from "next-intl";
import Image from "@/components/common/Image";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion/FadeIn";

const clientNames = [
  "Эрдэнэт Үйлдвэр",
  "Оюу толгой",
  "Рио Тинто",
  "MCS International",
  "Төрийн банк",
  "Хас банк",
  "Ариг банк",
  "ҮХОБ",
  "Монголын Хөрөнгийн Бирж",
  "Гоёл Кашмер",
  "Саус Гоби Сэндс",
  "Монгол Даатгал",
  "CAT",
  "MSM",
  "Хаан Даатгал",
  "Practical",
  "Голомт банк",
  "TDB",
  "Улаанбаатар хотын банк",
  "Номин Даатгал",
  "Mandal",
  "Хаан банк",
  "Бодь Даатгал",
  "Санхүүгийн зохицуулах хороо",
];

export function Portfolio() {
  const t = useTranslations();

  return (
    <section className="py-20 lg:py-28 bg-black/30">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
        <FadeIn className="text-center mb-16">
          <span className="text-primary font-semibold tracking-wide">{t("portfolio.label")}</span>
          <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold">{t("portfolio.clients")}</h2>
        </FadeIn>

        <FadeIn className="mb-16">
          <div className="rounded-2xl border border-border bg-white p-6 md:p-8">
            <Image
              src="/client-grid.png"
              alt="ДАМНО-ийн харилцагч байгууллагууд"
              width={1200}
              height={600}
              className="w-full h-auto rounded-lg"
            />
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <FadeIn>
            <div className="rounded-2xl border border-border bg-white p-8 flex items-center justify-center h-40">
              <Image
                src="/client-frc.png"
                alt="Санхүүгийн зохицуулах хороо"
                width={320}
                height={100}
                className="h-20 w-auto"
              />
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="rounded-2xl border border-dashed border-border bg-card/30 flex items-center justify-center h-40">
              <span className="text-muted text-center px-4">
                +20 гаруй харилцагч байгууллагын лого оруулах зай
              </span>
            </div>
          </FadeIn>
        </div>

        <StaggerContainer className="flex flex-wrap justify-center gap-3">
          {clientNames.map((client) => (
            <StaggerItem key={client}>
              <div className="rounded-full border border-border bg-card/30 px-5 py-2 text-sm text-white/90 hover:border-primary/50 transition-colors">
                {client}
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
