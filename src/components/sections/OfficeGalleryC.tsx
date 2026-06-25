"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Image from "@/components/common/Image";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion/FadeIn";

const slides = [
  { src: "/office-1.jpg", title: "Мэргэжлийн орчин", desc: "Өндөр стандартад нийцсэн ажлын байр" },
  { src: "/office-2.jpg", title: "Баримт бичгийн хэсэг", desc: "Гэрчилгээ, зөвшөөрөл, даатгал" },
  { src: "/office-3.jpg", title: "Улаанбаатарын үзэмж", desc: "Төв оффисийн байршил" },
];

export function OfficeGalleryC() {
  const t = useTranslations("office");

  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
        <FadeIn className="text-center mb-16">
          <span className="text-primary font-semibold tracking-wide">{t("label")}</span>
          <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold">{t("title")}</h2>
          <p className="mt-4 mx-auto max-w-2xl text-muted">{t("description")}</p>
        </FadeIn>

        <StaggerContainer className="space-y-24">
          {slides.map((slide, i) => (
            <StaggerItem key={i}>
              <div
                className={`grid grid-cols-1 lg:grid-cols-2 gap-10 items-center ${
                  i % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <motion.div
                  initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className={`${i % 2 === 1 ? "lg:order-2" : ""}`}
                >
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-border">
                    <Image src={slide.src} alt={slide.title} fill className="object-cover" />
                  </div>
                </motion.div>
                <div className={`${i % 2 === 1 ? "lg:order-1" : ""}`}>
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">{slide.title}</h3>
                  <p className="text-muted text-lg">{slide.desc}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
