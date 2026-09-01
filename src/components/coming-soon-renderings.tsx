"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const renderings = [
  {
    number: "01",
    title: "First Floor",
    image: "/images/renderings/6207-prestonshire-marketing-plan-1.webp",
    pdf: "/images/renderings/6207-prestonshire-marketing-plan-1.pdf",
    alt: "First-floor architectural plan for 6207 Prestonshire",
  },
  {
    number: "02",
    title: "Second Floor",
    image: "/images/renderings/6207-prestonshire-marketing-plan-2.webp",
    pdf: "/images/renderings/6207-prestonshire-marketing-plan-2.pdf",
    alt: "Second-floor architectural plan for 6207 Prestonshire",
  },
] as const;

export function ComingSoonRenderings() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeRendering, setActiveRendering] = useState(0);

  useEffect(() => {
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, []);

  function openDialog() {
    setActiveRendering(0);
    dialogRef.current?.showModal();
    document.documentElement.style.overflow = "hidden";
    requestAnimationFrame(() => scrollRef.current?.scrollTo({ top: 0 }));
  }

  function closeDialog() {
    dialogRef.current?.close();
  }

  function handleDialogClose() {
    document.documentElement.style.overflow = "";
  }

  function handleScroll() {
    const scroller = scrollRef.current;
    if (!scroller) return;

    const sections = Array.from(scroller.querySelectorAll<HTMLElement>("[data-rendering]"));
    const viewportCenter = scroller.scrollTop + scroller.clientHeight / 2;
    const nearestIndex = sections.reduce((nearest, section, index) => {
      const sectionCenter = section.offsetTop + section.offsetHeight / 2;
      const nearestCenter = sections[nearest].offsetTop + sections[nearest].offsetHeight / 2;
      return Math.abs(sectionCenter - viewportCenter) < Math.abs(nearestCenter - viewportCenter) ? index : nearest;
    }, 0);

    setActiveRendering(nearestIndex);
  }

  return (
    <>
      <button
        type="button"
        onClick={openDialog}
        className="group mt-[clamp(2.75rem,7vh,5.25rem)] inline-flex items-center gap-4 text-[0.62rem] font-semibold tracking-[0.34em] text-white/94 uppercase transition hover:text-white sm:text-[0.72rem]"
      >
        <span className="h-px w-9 bg-[#d6b58f] transition duration-500 group-hover:w-14" />
        VIEW RENDERINGS
        <span aria-hidden="true" className="text-[#d6b58f] transition duration-500 group-hover:translate-x-1">→</span>
      </button>

      <dialog
        ref={dialogRef}
        className="renderings-dialog fixed inset-0 m-0 h-svh max-h-none w-screen max-w-none overflow-hidden bg-[#0b1823] p-0 text-white backdrop:bg-[#071019]/90 backdrop:backdrop-blur-md"
        aria-label="Architectural plans for 6207 Prestonshire"
        onClose={handleDialogClose}
      >
        <div className="renderings-shell relative h-full overflow-hidden">
          <header className="absolute inset-x-0 top-0 z-30 border-b border-white/12 bg-[#0b1823]/82 backdrop-blur-xl">
            <div className="mx-auto flex h-[5.25rem] max-w-[112rem] items-center justify-between gap-4 px-5 sm:px-10 lg:px-14">
              <div className="flex min-w-0 items-center gap-4 sm:gap-5">
                <span
                  aria-hidden="true"
                  className="block h-12 w-12 shrink-0 bg-[#d6b58f]"
                  style={{
                    WebkitMaskImage: "url('/logos/alfordtemplogo.png')",
                    WebkitMaskPosition: "left center",
                    WebkitMaskRepeat: "no-repeat",
                    WebkitMaskSize: "10rem auto",
                    maskImage: "url('/logos/alfordtemplogo.png')",
                    maskPosition: "left center",
                    maskRepeat: "no-repeat",
                    maskSize: "10rem auto",
                  }}
                />
                <span aria-hidden="true" className="hidden h-8 w-px bg-white/16 sm:block" />
                <div className="hidden min-w-0 sm:block">
                  <p className="truncate text-[0.56rem] font-semibold tracking-[0.3em] text-[#d6b58f] uppercase sm:text-[0.64rem]">6207 Prestonshire</p>
                  <p className="mt-1 text-[0.58rem] tracking-[0.26em] text-white/52 uppercase">Architectural plans</p>
                </div>
              </div>

              <div className="ml-auto flex items-center gap-4 sm:gap-7">
                <div className="flex items-center gap-3 text-[0.62rem] font-semibold tracking-[0.2em] text-white/48" aria-live="polite">
                  <span className="text-white">0{activeRendering + 1}</span>
                  <span className="h-px w-10 overflow-hidden bg-white/18 sm:w-16">
                    <span
                      className="block h-full origin-left bg-[#d6b58f] transition-transform duration-500"
                      style={{ transform: `scaleX(${(activeRendering + 1) / renderings.length})` }}
                    />
                  </span>
                  <span>0{renderings.length}</span>
                </div>
                <button
                  type="button"
                  onClick={closeDialog}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-xl font-light text-white/72 transition duration-300 hover:rotate-90 hover:border-[#d6b58f] hover:text-white"
                  aria-label="Close architectural plans"
                >
                  ×
                </button>
              </div>
            </div>
          </header>

          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="renderings-scroll h-svh snap-y snap-mandatory overflow-x-hidden overflow-y-auto overscroll-contain pt-[5.25rem]"
          >
            {renderings.map((rendering) => (
              <figure
                key={rendering.number}
                data-rendering
                className="rendering-panel relative flex min-h-[calc(100svh-5.25rem)] scroll-mt-[5.25rem] snap-start flex-col items-center justify-start px-4 py-8 sm:px-8 lg:px-14"
              >
                <div className="relative z-10 mb-4 flex w-full max-w-[100rem] items-end justify-between gap-4 px-1 sm:mb-6">
                  <figcaption>
                    <h2 className="font-serif text-3xl font-normal tracking-[-0.025em] text-[#f7f3ec] sm:text-5xl">{rendering.title}</h2>
                  </figcaption>
                  <a
                    href={rendering.pdf}
                    target="_blank"
                    rel="noreferrer"
                    className="hidden text-[0.56rem] font-semibold tracking-[0.24em] text-white/48 uppercase transition hover:text-[#d6b58f] sm:block"
                  >
                    Open full-resolution PDF ↗
                  </a>
                </div>

                <div className="rendering-frame relative z-10 w-fit max-w-full overflow-hidden rounded-[0.2rem] bg-[#f8f7f3] p-2 shadow-[0_36px_100px_rgba(0,0,0,0.42)] sm:p-4 lg:p-5">
                  <Image
                    src={rendering.image}
                    alt={rendering.alt}
                    width={2640}
                    height={2040}
                    unoptimized
                    sizes="(max-width: 639px) 96vw, (max-width: 1199px) 92vw, 1600px"
                    className="h-auto max-h-[calc(100svh-18rem)] w-auto max-w-full bg-white"
                  />
                </div>

                <a
                  href={rendering.pdf}
                  target="_blank"
                  rel="noreferrer"
                  className="relative z-10 mt-5 text-[0.55rem] font-semibold tracking-[0.22em] text-white/52 uppercase transition hover:text-[#d6b58f] sm:hidden"
                >
                  Open full-resolution PDF ↗
                </a>
              </figure>
            ))}
          </div>
        </div>
      </dialog>
    </>
  );
}
