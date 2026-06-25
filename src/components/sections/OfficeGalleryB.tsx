"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Image from "@/components/common/Image";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion/FadeIn";

const images = [
  { src: "/office-1.jpg", span: "row-span-2" },
  { src: "/office-2.jpg", span: "" },
  { src: "/office-3.jpg", span: "" },
  { src: "/office-1.jpg", span: "row-span-2" },
  { src: "/office-2.jpg", span: "" },
  { src: "/office-3.jpg", span: "" },
];

export function OfficeGalleryB() {
  const t = useTranslations("office");

  return (
    <section className="py-20 lg:py-28 bg-black/20">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
        <FadeIn className="text-center mb-12">
          <span className="text-primary font-semibold tracking-wide">{t("label")}</span>
          <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold">{t("title")}</h2>
          <p className="mt-4 mx-auto max-w-2xl text-muted">{t("description")}</p>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[180px]">
          {images.map((img, i) => (
            <StaggerItem key={i} className={img.span}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative w-full h-full rounded-2xl overflow-hidden border border-border cursor-pointer"
              >
                <Image
                  src={img.src}
                  alt={`Office ${i + 1}`}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent opacity-0 hover:opacity-100 transition-opacity" />
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
