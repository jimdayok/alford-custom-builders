"use client";

import type { MouseEvent, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

const clickWindowMs = 2200;

type ComingSoonLogoLinkProps = {
  children: ReactNode;
  className?: string;
};

export function ComingSoonLogoLink({ children, className }: ComingSoonLogoLinkProps) {
  const clickCountRef = useRef(0);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    closeButtonRef.current?.focus();

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [isOpen]);

  useEffect(
    () => () => {
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    },
    [],
  );

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    clickCountRef.current += 1;

    if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    resetTimerRef.current = setTimeout(() => {
      clickCountRef.current = 0;
    }, clickWindowMs);

    if (clickCountRef.current < 5) return;

    clickCountRef.current = 0;
    if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    setIsOpen(true);
  }

  return (
    <>
      <a
        href="#the-home"
        aria-label="Alford Custom Builders home"
        className={className}
        onClick={handleClick}
      >
        {children}
      </a>

      {isOpen ? (
        <div
          className="acb-preview-switcher"
          role="dialog"
          aria-modal="true"
          aria-labelledby="holding-preview-switcher-title"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setIsOpen(false);
          }}
        >
          <div className="acb-preview-switcher__panel">
            <button
              ref={closeButtonRef}
              type="button"
              className="acb-preview-switcher__close"
              aria-label="Close preview menu"
              onClick={() => setIsOpen(false)}
            >
              ×
            </button>
            <p className="acb-kicker">Alford Custom Builders</p>
            <h2 id="holding-preview-switcher-title">Choose a preview</h2>
            <nav aria-label="Preview versions">
              <a href="https://preview1.alfordcustombuilders.com">
                <span>Preview 1</span>
                <span aria-hidden="true">→</span>
              </a>
              <a href="https://preview2.alfordcustombuilders.com">
                <span>Preview 2</span>
                <span aria-hidden="true">→</span>
              </a>
            </nav>
          </div>
        </div>
      ) : null}
    </>
  );
}
