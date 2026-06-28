"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { MapPin } from "lucide-react";
import { useState } from "react";

const PRIMARY = "#ff6b4a";
const MUTED = "#cdd0d6";
const BORDER = "rgba(255, 107, 74, 0.35)";
const BG_GLOW = "rgba(255, 107, 74, 0.1)";

const BOUNDS = {
  minLon: 87.5,
  maxLon: 119.9,
  minLat: 41.5,
  maxLat: 52.1,
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

function project(lon: number, lat: number, width: number, height: number) {
  const x = ((lon - BOUNDS.minLon) / (BOUNDS.maxLon - BOUNDS.minLon)) * width;
  const y = height - ((lat - BOUNDS.minLat) / (BOUNDS.maxLat - BOUNDS.minLat)) * height;
  return { x, y };
}

export function BranchMap() {
  const t = useTranslations("branches");
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="w-full">
      <h2 className="text-2xl md:text-3xl font-bold mb-6">{t("title")}</h2>
      <div className="rounded-2xl border border-border bg-card/50 p-4 md:p-6 overflow-hidden">
        <div className="relative w-full aspect-[4/3] md:aspect-[16/10]">
          <svg
            viewBox="0 0 800 520"
            className="w-full h-full"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <radialGradient id="mapGradient" cx="50%" cy="50%" r="70%">
                <stop offset="0%" stopColor={BG_GLOW} />
                <stop offset="100%" stopColor="rgba(255, 107, 74, 0.01)" />
              </radialGradient>
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <rect width="800" height="520" fill="url(#mapGradient)" rx="16" />

            <path
              d="M80,420 L120,430 L160,440 L210,450 L260,455 L310,450 L360,440 L410,430 L460,420 L510,405 L560,385 L610,360 L650,330 L690,290 L720,250 L740,210 L750,170 L745,130 L730,100 L700,80 L660,70 L620,72 L580,80 L540,95 L500,110 L460,120 L420,125 L380,122 L340,115 L300,110 L260,112 L220,120 L180,135 L140,160 L110,195 L90,235 L75,280 L70,325 L72,370 L80,420 Z"
              fill="rgba(205, 208, 214, 0.06)"
              stroke={BORDER}
              strokeWidth="1.5"
            />

            {BRANCHES.map((branch, index) => {
              const { x, y } = project(branch.lon, branch.lat, 800, 520);
              const isActive = active === branch.key;
              const tooltipX = x > 640 ? -152 : 18;
              const tooltipY = y > 440 ? -56 : -44;

              return (
                <g
                  key={branch.key}
                  transform={`translate(${x}, ${y})`}
                  onMouseEnter={() => setActive(branch.key)}
                  onMouseLeave={() => setActive(null)}
                  onFocus={() => setActive(branch.key)}
                  onBlur={() => setActive(null)}
                  className="cursor-pointer"
                  tabIndex={0}
                >
                  <motion.circle
                    r={isActive ? 8 : 6}
                    fill={PRIMARY}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.05, type: "spring", stiffness: 300, damping: 20 }}
                    filter={isActive ? "url(#glow)" : undefined}
                  />
                  <motion.circle
                    r={isActive ? 22 : 14}
                    fill="transparent"
                    stroke={PRIMARY}
                    strokeWidth={1.5}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: isActive ? 0.5 : 0.25 }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                  />
                  <g
                    className="transition-opacity duration-200"
                    style={{ opacity: isActive ? 1 : 0 }}
                  >
                    <rect
                      x={tooltipX}
                      y={tooltipY}
                      width="140"
                      height="32"
                      rx="8"
                      fill="rgba(23, 32, 46, 0.95)"
                      stroke={BORDER}
                      strokeWidth="1"
                    />
                    <text
                      x={tooltipX + 70}
                      y={tooltipY + 21}
                      textAnchor="middle"
                      fill="#ffffff"
                      fontSize="12"
                      fontWeight="600"
                    >
                      {t(branch.key)}
                    </text>
                  </g>
                </g>
              );
            })}
          </svg>

          <div className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-64 rounded-xl border border-border bg-background/90 p-4 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold">{t("legend")}</span>
            </div>
            <p className="text-xs text-muted-foreground">{t("description")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
