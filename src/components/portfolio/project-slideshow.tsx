"use client";

import type { TouchEvent } from "react";
import { useEffect, useState } from "react";
import Image from "next/image";

import type { PortfolioProject } from "@/data/portfolio";
import {
  getPortfolioImageAlt,
  getPortfolioImageCaption,
} from "@/lib/portfolio-display";

import { GalleryMasonry } from "@/components/portfolio/gallery-masonry";
import { ImageLightbox } from "@/components/portfolio/image-lightbox";
import { ThumbnailRail } from "@/components/portfolio/thumbnail-rail";

type ProjectSlideshowProps = {
  project: PortfolioProject;
};

const swipeThreshold = 40;

export function ProjectSlideshow({ project }: ProjectSlideshowProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (lightboxOpen) return;
      if (event.key === "ArrowLeft") {
        setActiveIndex((current) =>
          current === 0 ? project.images.length - 1 : current - 1,
        );
      }
      if (event.key === "ArrowRight") {
        setActiveIndex((current) =>
          current === project.images.length - 1 ? 0 : current + 1,
        );
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, project.images.length]);

  if (project.images.length === 0) {
    return null;
  }

  const activeImage = project.images[activeIndex] ?? project.images[0];
  const activeCaption = getPortfolioImageCaption(activeImage);

  function goToIndex(index: number) {
    setActiveIndex(index);
  }

  function goToPrevious() {
    setActiveIndex((current) =>
      current === 0 ? project.images.length - 1 : current - 1,
    );
  }

  function goToNext() {
    setActiveIndex((current) =>
      current === project.images.length - 1 ? 0 : current + 1,
    );
  }

  function openImage(index: number) {
    setActiveIndex(index);
    setLightboxOpen(true);
  }

  function handleTouchStart(event: TouchEvent<HTMLDivElement>) {
    setTouchStartX(event.changedTouches[0]?.clientX ?? null);
  }

  function handleTouchEnd(event: TouchEvent<HTMLDivElement>) {
    if (touchStartX === null) return;

    const touchEndX = event.changedTouches[0]?.clientX ?? touchStartX;
    const distance = touchEndX - touchStartX;

    if (Math.abs(distance) > swipeThreshold) {
      if (distance > 0) {
        goToPrevious();
      } else {
        goToNext();
      }
    }

    setTouchStartX(null);
  }

  return (
    <>
      <section className="border-b border-white/8 bg-[#11100e]">
        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-6 lg:px-8 lg:py-14">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-xs font-semibold tracking-[0.32em] uppercase text-[#d2b38f]">
                  Explore The Home
                </p>
                <h2 className="mt-4 font-serif text-3xl text-[#f7f1e7] sm:text-4xl">
                  Project photography with cinematic navigation.
                </h2>
              </div>
              <p className="max-w-xl text-sm leading-7 text-[#efe8dc]/66">
                Use the keyboard arrows or swipe gestures to move through the project.
                Click any image for an expanded lightbox view.
              </p>
            </div>

            <div className="grid gap-6 xl:items-start xl:grid-cols-[minmax(0,1fr)_20rem]">
              <div className="rounded-[2rem] border border-white/10 bg-[#191714] p-3 shadow-[0_28px_90px_rgba(0,0,0,0.2)] sm:p-4">
                <div
                  className="group relative overflow-hidden rounded-[1.6rem]"
                  onTouchStart={handleTouchStart}
                  onTouchEnd={handleTouchEnd}
                >
                  <button
                    type="button"
                    onClick={() => setLightboxOpen(true)}
                    className="relative block w-full overflow-hidden text-left"
                  >
                    <div className="relative aspect-[16/10] w-full bg-[#0e0d0b]">
                      <Image
                        key={activeImage.src}
                        src={activeImage.src}
                        alt={getPortfolioImageAlt(
                          activeImage,
                          activeIndex,
                          project.title,
                        )}
                        fill
                        priority
                        className="animate-fade object-cover transition duration-700 group-hover:scale-[1.015]"
                        sizes="(min-width: 1280px) 70vw, 100vw"
                      />
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_30%,rgba(10,10,10,0.1)_50%,rgba(10,10,10,0.82))]" />
                    </div>
                    <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 p-6 sm:p-8">
                      <div className="flex flex-wrap items-center gap-3 text-[11px] font-semibold tracking-[0.22em] uppercase">
                        <span className="text-[#efe8dc]/54">
                          {activeIndex + 1} / {project.images.length}
                        </span>
                      </div>
                      {activeCaption ? (
                        <p className="max-w-3xl text-sm leading-7 text-[#efe8dc]/78 sm:text-base">
                          {activeCaption}
                        </p>
                      ) : null}
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={goToPrevious}
                    className="absolute left-4 top-1/2 hidden -translate-y-1/2 rounded-full border border-white/10 bg-black/30 px-4 py-3 text-xs font-semibold tracking-[0.22em] uppercase text-[#f7f1e7] backdrop-blur-sm transition hover:bg-black/45 md:block"
                    aria-label="Previous image"
                  >
                    Prev
                  </button>
                  <button
                    type="button"
                    onClick={goToNext}
                    className="absolute right-4 top-1/2 hidden -translate-y-1/2 rounded-full border border-white/10 bg-black/30 px-4 py-3 text-xs font-semibold tracking-[0.22em] uppercase text-[#f7f1e7] backdrop-blur-sm transition hover:bg-black/45 md:block"
                    aria-label="Next image"
                  >
                    Next
                  </button>
                </div>
              </div>

              <div className="rounded-[2rem] border border-white/10 bg-[#161411] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.16)]">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold tracking-[0.22em] uppercase text-[#d2b38f]">
                      Thumbnail Rail
                    </p>
                    <p className="mt-2 text-sm leading-7 text-[#efe8dc]/68">
                      Jump to a specific image in this project.
                    </p>
                  </div>
                </div>
                <div className="mt-5 xl:max-h-[42rem] xl:overflow-y-auto xl:pr-1">
                  <ThumbnailRail
                    images={project.images}
                    activeIndex={activeIndex}
                    onSelect={goToIndex}
                    projectTitle={project.title}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#141311]">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:px-8 lg:py-18">
          <div>
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold tracking-[0.26em] uppercase text-[#d2b38f]">
                  {project.title}
                </p>
                <h3 className="mt-3 font-serif text-3xl text-[#f7f1e7]">
                  Project Gallery
                </h3>
              </div>
              <p className="text-xs font-semibold tracking-[0.22em] uppercase text-[#efe8dc]/52">
                {project.images.length} Images
              </p>
            </div>
            <GalleryMasonry
              images={project.images}
              projectTitle={project.title}
              onImageClick={openImage}
            />
          </div>
        </div>
      </section>

      <ImageLightbox
        image={activeImage}
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onPrevious={goToPrevious}
        onNext={goToNext}
        title={project.title}
        indexLabel={`${activeIndex + 1} of ${project.images.length}`}
        imageIndex={activeIndex}
      />
    </>
  );
}
