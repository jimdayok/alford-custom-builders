"use client";

import Image from "next/image";

import type { PortfolioImage } from "@/data/portfolio";

type GalleryMasonryProps = {
  images: PortfolioImage[];
  onImageClick?: (index: number) => void;
  priorityCount?: number;
};

const aspectClasses = [
  "aspect-[4/5]",
  "aspect-[5/4]",
  "aspect-[4/3]",
  "aspect-[3/4]",
];

export function GalleryMasonry({
  images,
  onImageClick,
  priorityCount = 0,
}: GalleryMasonryProps) {
  return (
    <div className="columns-1 gap-5 sm:columns-2 xl:columns-3">
      {images.map((image, index) => (
        <button
          key={image.src}
          type="button"
          className="group mb-5 block w-full break-inside-avoid overflow-hidden rounded-[1.7rem] border border-white/10 bg-white/[0.03] text-left transition duration-500 hover:-translate-y-1 hover:border-white/20"
          onClick={() => onImageClick?.(index)}
        >
          <div className={`relative overflow-hidden ${aspectClasses[index % aspectClasses.length]}`}>
            <Image
              src={image.src}
              alt={image.alt}
              fill
              priority={index < priorityCount}
              className="object-cover transition duration-700 group-hover:scale-[1.03]"
              sizes="(min-width: 1280px) 30vw, (min-width: 640px) 45vw, 100vw"
            />
          </div>
          <div className="space-y-2 px-5 py-4">
            <p className="text-[11px] font-semibold tracking-[0.24em] uppercase text-[#d2b38f]">
              {image.room}
            </p>
            <p className="text-sm leading-7 text-[#efe8dc]/76">{image.caption}</p>
          </div>
        </button>
      ))}
    </div>
  );
}
