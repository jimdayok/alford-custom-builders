"use client";

import { useEffect, useState } from "react";

const chapters = [
  { id: "story", label: "Story" },
  { id: "process", label: "Process" },
  { id: "portfolio", label: "Work" },
  { id: "service-areas", label: "Areas" },
  { id: "contact-form", label: "Contact" },
];

export function ChapterRail() {
  const [activeId, setActiveId] = useState<string>(chapters[0].id);

  useEffect(() => {
    const sections = chapters
      .map((chapter) => document.getElementById(chapter.id))
      .filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target?.id) {
          setActiveId(visible.target.id);
        }
      },
      {
        rootMargin: "-22% 0px -48% 0px",
        threshold: [0.2, 0.35, 0.5, 0.7],
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="pointer-events-none fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 xl:block">
      <div className="pointer-events-auto rounded-[1.3rem] border border-[rgba(15,34,54,0.08)] bg-[rgba(248,244,237,0.88)] px-3 py-4 shadow-[0_18px_50px_rgba(15,24,34,0.12)] backdrop-blur-xl">
        <div className="flex flex-col gap-3">
          {chapters.map((chapter) => {
            const isActive = chapter.id === activeId;
            return (
              <a
                key={chapter.id}
                href={`#${chapter.id}`}
                className="group flex items-center gap-3"
              >
                <span
                  className={`block rounded-full transition ${
                    isActive
                      ? "h-8 w-2 bg-[var(--color-charcoal)]"
                      : "h-2.5 w-2.5 bg-[var(--color-border-strong)] group-hover:bg-[var(--color-wood)]"
                  }`}
                />
                <span
                  className={`text-[10px] font-semibold tracking-[0.24em] uppercase transition ${
                    isActive
                      ? "text-[var(--color-charcoal)]"
                      : "text-[var(--color-muted)] group-hover:text-[var(--color-charcoal)]"
                  }`}
                >
                  {chapter.label}
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
