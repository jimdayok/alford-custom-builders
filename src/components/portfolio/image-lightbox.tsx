"use client";

import { useEffect } from "react";
import Image from "next/image";

import type { PortfolioImage } from "@/data/portfolio";
import {
  getPortfolioImageAlt,
  getPortfolioImageCaption,
} from "@/lib/portfolio-display";

type ImageLightboxProps = {
  image: PortfolioImage | null;
  open: boolean;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
  title: string;
  indexLabel: string;
  imageIndex: number;
};

export function ImageLightbox({
  image,
  open,
  onClose,
  onPrevious,
  onNext,
  title,
  indexLabel,
  imageIndex,
}: ImageLightboxProps) {
  useEffect(() => {
    if (!open) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") onPrevious();
      if (event.key === "ArrowRight") onNext();
    }

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose, onNext, onPrevious, open]);

  if (!open || !image) return null;
  const caption = getPortfolioImageCaption(image);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[rgba(7,7,7,0.92)] p-4 backdrop-blur-md animate-fade"
      role="dialog"
      aria-modal="true"
      aria-label={`${title} image viewer`}
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-5 top-5 rounded-full border border-white/12 bg-white/8 px-4 py-2 text-xs font-semibold tracking-[0.22em] uppercase text-[#f7f1e7] transition hover:bg-white/14"
      >
        Close
      </button>

      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onPrevious();
        }}
        className="absolute left-4 top-1/2 hidden -translate-y-1/2 rounded-full border border-white/12 bg-white/8 px-4 py-3 text-xs font-semibold tracking-[0.22em] uppercase text-[#f7f1e7] transition hover:bg-white/14 md:block"
        aria-label="Previous image"
      >
        Prev
      </button>

      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onNext();
        }}
        className="absolute right-4 top-1/2 hidden -translate-y-1/2 rounded-full border border-white/12 bg-white/8 px-4 py-3 text-xs font-semibold tracking-[0.22em] uppercase text-[#f7f1e7] transition hover:bg-white/14 md:block"
        aria-label="Next image"
      >
        Next
      </button>

      <div
        className="relative w-full max-w-6xl overflow-hidden rounded-[1.8rem] border border-white/10 bg-[#141311] shadow-[0_30px_120px_rgba(0,0,0,0.45)]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="relative aspect-[16/10] w-full">
          <Image
            src={image.src}
            alt={getPortfolioImageAlt(image, imageIndex, title)}
            fill
            className="object-contain"
            sizes="100vw"
          />
        </div>
        <div className="flex flex-col gap-3 border-t border-white/10 px-6 py-5 sm:flex-row sm:items-end sm:justify-between">
          {caption ? (
            <p className="text-sm leading-7 text-[#efe8dc]/78">{caption}</p>
          ) : null}
          <p className="text-xs font-semibold tracking-[0.22em] uppercase text-[#efe8dc]/52">
            {indexLabel}
          </p>
        </div>
      </div>
    </div>
  );
}
