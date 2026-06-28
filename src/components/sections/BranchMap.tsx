"use client";

import { useTranslations } from "next-intl";
import { MapPin } from "lucide-react";
import { useState } from "react";
import Image from "@/components/common/Image";

const MAP_BOUNDS = {
  minLon: 87.4,
  maxLon: 120.5,
  minLat: 41.3,
  maxLat: 52.5,
};

const BRANCHES = [
  { key: "chinggis", lat: 47.32, lon: 110.65 },
  { key: "choibalsan", lat: 48.07, lon: 114.53 },
  { key: "khanbogd", lat: 43.15, lon: 107.2 },
  { key: "zamynuud", lat: 43.72, lon: 111.9 },
  { key: "kharkhorin", lat: 47.2, lon: 102.82 },
  { key: "tsenher", lat: 47.47, lon: 101.45 },
  { key: "khovd", lat: 47.99, lon: 89.63 },
  { key: "olgii", lat: 48.97, lon: 89.63 },
  { key: "darkhan", lat: 49.46, lon: 105.97 },
  { key: "moron", lat: 49.64, lon: 100.15 },
  { key: "ulaanbaatar", lat: 47.92, lon: 106.91 },
];

function project(lon: number, lat: number) {
  const x =
    ((lon - MAP_BOUNDS.minLon) /
      (MAP_BOUNDS.maxLon - MAP_BOUNDS.minLon)) *
    100;
  const y =
    ((MAP_BOUNDS.maxLat - lat) /
      (MAP_BOUNDS.maxLat - MAP_BOUNDS.minLat)) *
    100;
  return { x, y };
}

export function BranchMap() {
  const t = useTranslations("branches");
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="w-full">
      <h2 className="text-2xl md:text-3xl font-bold mb-6">{t("title")}</h2>
      <div className="rounded-2xl border border-border bg-card/50 p-4 md:p-6 overflow-hidden">
        <div className="relative w-full aspect-[16/9] md:aspect-[2/1]">
          <Image
            src="/mongolia-map.svg"
            alt={t("title")}
            fill
            className="object-contain rounded-xl"
            sizes="(max-width: 768px) 100vw, 50vw"
          />

          {BRANCHES.map((branch) => {
            const { x, y } = project(branch.lon, branch.lat);
            const isActive = active === branch.key;

            return (
              <button
                key={branch.key}
                type="button"
                className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                style={{ left: `${x}%`, top: `${y}%` }}
                onMouseEnter={() => setActive(branch.key)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(branch.key)}
                onBlur={() => setActive(null)}
                aria-label={t(branch.key)}
              >
                <span className="relative flex h-3 w-3 md:h-4 md:w-4">
                  <span
                    className={`absolute inline-flex h-full w-full rounded-full bg-primary opacity-75 animate-ping ${
                      isActive ? "opacity-60" : "opacity-25"
                    }`}
                  />
                  <span
                    className={`relative inline-flex rounded-full bg-primary transition-all duration-200 ${
                      isActive ? "h-4 w-4 md:h-5 md:w-5" : "h-3 w-3 md:h-4 md:w-4"
                    }`}
                  />
                </span>

                <span
                  className={`absolute left-1/2 -translate-x-1/2 bottom-full mb-2 whitespace-nowrap rounded-lg border border-border bg-background/95 px-3 py-1.5 text-xs font-semibold text-foreground shadow-lg transition-opacity duration-200 pointer-events-none ${
                    isActive ? "opacity-100" : "opacity-0"
                  }`}
                >
                  {t(branch.key)}
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-4 rounded-xl border border-border bg-background/90 p-4 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-1">
            <MapPin className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold">{t("legend")}</span>
          </div>
          <p className="text-xs text-muted-foreground">{t("description")}</p>
        </div>
      </div>
    </div>
  );
}
