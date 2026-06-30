"use client";

import Image from "next/image";

import type { PortfolioImage } from "@/data/portfolio";

type ThumbnailRailProps = {
  images: PortfolioImage[];
  activeIndex: number;
  onSelect: (index: number) => void;
};

export function ThumbnailRail({
  images,
  activeIndex,
  onSelect,
}: ThumbnailRailProps) {
  return (
    <div className="overflow-x-auto pb-1">
      <div className="flex min-w-max gap-3">
        {images.map((image, index) => {
          const isActive = index === activeIndex;

          return (
            <button
              key={image.src}
              type="button"
              onClick={() => onSelect(index)}
              className={`group relative h-20 w-20 shrink-0 overflow-hidden rounded-[1.1rem] border transition duration-300 sm:h-24 sm:w-24 ${
                isActive
                  ? "border-[#d2b38f] shadow-[0_10px_30px_rgba(210,179,143,0.2)]"
                  : "border-white/10 hover:-translate-y-1 hover:border-white/30"
              }`}
              aria-label={`View ${image.room}`}
              aria-pressed={isActive}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className={`object-cover transition duration-500 ${
                  isActive ? "scale-105" : "group-hover:scale-105"
                }`}
                sizes="96px"
              />
              <span className="absolute inset-x-0 bottom-0 h-12 bg-[linear-gradient(180deg,transparent,rgba(10,10,10,0.75))]" />
            </button>
          );
        })}
      </div>
    </div>
  );
}
