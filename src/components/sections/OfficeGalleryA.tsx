"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "@/components/common/Image";
import { FadeIn } from "@/components/motion/FadeIn";

const images = [
  "/office-1.jpg",
  "/office-2.jpg",
  "/office-3.jpg",
];

export function OfficeGalleryA() {
  const t = useTranslations("office");
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

  return (
    <section ref={containerRef} className="py-20 lg:py-28 overflow-hidden">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-8 mb-12">
        <FadeIn className="text-center">
          <span className="text-primary font-semibold tracking-wide">{t("label")}</span>
          <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold">{t("title")}</h2>
          <p className="mt-4 mx-auto max-w-2xl text-muted">{t("description")}</p>
        </FadeIn>
      </div>

      <motion.div style={{ x }} className="flex gap-6 w-[200%]">
        {[...images, ...images].map((src, i) => (
          <div
            key={i}
            className="relative w-[350px] h-[460px] flex-shrink-0 rounded-2xl overflow-hidden border border-border"
          >
            <Image
              src={src}
              alt={`Office ${i + 1}`}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
          </div>
        ))}
      </motion.div>
    </section>
  );
}
