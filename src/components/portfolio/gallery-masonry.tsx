"use client";

import Image from "next/image";

import type { PortfolioImage } from "@/data/portfolio";
import {
  getPortfolioImageAlt,
  getPortfolioImageCaption,
} from "@/lib/portfolio-display";

type GalleryMasonryProps = {
  images: PortfolioImage[];
  onImageClick?: (index: number) => void;
  priorityCount?: number;
  projectTitle?: string;
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
  projectTitle,
}: GalleryMasonryProps) {
  return (
    <div className="columns-1 gap-5 sm:columns-2 xl:columns-3">
      {images.map((image, index) => {
        const caption = getPortfolioImageCaption(image);

        return (
          <button
            key={image.src}
            type="button"
            className="group mb-5 block w-full break-inside-avoid overflow-hidden rounded-[1.7rem] border border-white/10 bg-white/[0.03] text-left transition duration-500 hover:-translate-y-1 hover:border-white/20"
            onClick={() => onImageClick?.(index)}
            style={{ contentVisibility: "auto", containIntrinsicSize: "560px" }}
          >
            <div
              className={`relative overflow-hidden ${aspectClasses[index % aspectClasses.length]}`}
            >
              <Image
                src={image.src}
                alt={getPortfolioImageAlt(image, index, projectTitle)}
                fill
                priority={index < priorityCount}
                className="object-cover transition duration-700 group-hover:scale-[1.03]"
                sizes="(min-width: 1280px) 30vw, (min-width: 640px) 45vw, 100vw"
                quality={74}
              />
            </div>
            {caption ? (
              <div className="px-5 py-4">
                <p className="text-sm leading-7 text-[#efe8dc]/76">{caption}</p>
              </div>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
