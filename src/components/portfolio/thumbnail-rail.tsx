"use client";

import { useEffect, useRef } from "react";
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
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);

  useEffect(() => {
    const activeItem = itemRefs.current[activeIndex];
    activeItem?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [activeIndex]);

  return (
    <div className="overflow-x-auto pb-2 xl:overflow-y-auto xl:overflow-x-hidden xl:pb-0">
      <div
        className="flex min-w-max snap-x snap-mandatory gap-3 pr-1 xl:min-w-0 xl:flex-col xl:snap-y"
        aria-label="Select a project image"
      >
        {images.map((image, index) => {
          const isActive = index === activeIndex;

          return (
            <button
              key={image.src}
              ref={(element) => {
                itemRefs.current[index] = element;
              }}
              type="button"
              onClick={() => onSelect(index)}
              className={`group relative h-24 w-[6.8rem] shrink-0 snap-center overflow-hidden rounded-[1.3rem] border transition duration-300 sm:h-28 sm:w-[8rem] xl:h-28 xl:w-full ${
                isActive
                  ? "border-[#d2b38f] bg-[#1d1915] shadow-[0_14px_34px_rgba(210,179,143,0.18)]"
                  : "border-white/10 hover:-translate-y-1 hover:border-white/30"
              }`}
              aria-label={`View ${image.room}`}
              aria-pressed={isActive}
              aria-current={isActive}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className={`object-cover transition duration-500 ${
                  isActive ? "scale-105" : "group-hover:scale-105"
                }`}
                sizes="(min-width: 1280px) 20rem, (min-width: 640px) 8rem, 6.8rem"
              />
              <span className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,8,8,0.05),rgba(8,8,8,0.18)_48%,rgba(8,8,8,0.82))]" />
              <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-3 text-left">
                <span className="min-w-0">
                  <span className="block truncate text-[10px] font-semibold tracking-[0.24em] uppercase text-[#d2b38f]">
                    {image.room}
                  </span>
                  <span className="mt-1 block truncate text-xs text-[#f7f1e7]/82">
                    {index + 1} of {images.length}
                  </span>
                </span>
                <span
                  className={`h-2.5 w-2.5 shrink-0 rounded-full border ${
                    isActive
                      ? "border-[#f4d1a9] bg-[#d2b38f]"
                      : "border-white/30 bg-black/20"
                  }`}
                  aria-hidden="true"
                />
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
