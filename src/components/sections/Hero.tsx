"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { motion } from "framer-motion";
import Image from "@/components/common/Image";
import { FadeIn } from "@/components/motion/FadeIn";

const SERVICES = [
  "Орон сууц",
  "Амины сууц",
  "Хөдлөх хөрөнгө",
  "Байгууллагын хөрөнгө",
  "Хохирол тогтоолгоо",
];

export function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-24">
      <div className="absolute inset-0 z-0">
        <motion.div
          initial={{ scale: 1.1, y: 0 }}
          animate={{ scale: 1.15, y: -16 }}
          transition={{
            duration: 12,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          className="absolute inset-[-5%]"
        >
          <Image
            src="/financial-building.jpg"
            alt="Санхүүгийн шилэн барилга"
            fill
            className="object-cover object-center opacity-40"
            sizes="100vw"
            priority
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-background/80" />
      </div>

      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full bg-primary/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-[1200px] px-6 lg:px-8 w-full py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          <div className="lg:col-span-7 space-y-8">
            <FadeIn delay={0}>
              <span className="inline-block rounded-full border border-primary px-4 py-1.5 text-sm font-medium text-primary">
                {t("badge")}
              </span>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] drop-shadow-lg">
                <span className="text-white">ДАМНО Хөрөнгийн</span>
                <br />
                <span className="text-white">үнэлгээний компани</span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="text-xl md:text-2xl text-primary font-semibold drop-shadow-md">
                Хөрөнгийн үнэлгээний мэргэшсэн шийдэл
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <Link
                  href="/contact"
                  className="rounded-full bg-white text-background px-8 py-3.5 font-semibold hover:scale-[1.02] transition-transform"
                >
                  {t("ctaPrimary")}
                </Link>
                <Link
                  href="/services"
                  className="rounded-full border border-primary text-primary px-8 py-3.5 font-semibold hover:bg-primary/10 transition-colors"
                >
                  {t("ctaSecondary")}
                </Link>
              </div>
            </FadeIn>
          </div>

          <div className="lg:col-span-5">
            <FadeIn delay={0.4}>
              <div className="space-y-4">
                <p className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-4">
                  Бидний үйлчилгээ
                </p>
                {SERVICES.map((service, index) => (
                  <motion.div
                    key={service}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-sm"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-primary text-sm font-bold">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-base font-medium text-white/90">{service}</span>
                  </motion.div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
