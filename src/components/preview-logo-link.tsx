"use client";

import type { MouseEvent } from "react";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import type { PreviewVersion } from "@/lib/preview-version";

type PreviewLogoLinkProps = {
  previewVersion: PreviewVersion;
  variant?: "header" | "hero";
};

const clickWindowMs = 2200;

export function PreviewLogoLink({
  previewVersion,
  variant = "header",
}: PreviewLogoLinkProps) {
  const pathname = usePathname();
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

  function handleLogoClick(event: MouseEvent<HTMLAnchorElement>) {
    if (pathname === "/") event.preventDefault();
    clickCountRef.current += 1;

    if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    resetTimerRef.current = setTimeout(() => {
      clickCountRef.current = 0;
    }, clickWindowMs);

    if (clickCountRef.current < 5) return;

    event.preventDefault();
    clickCountRef.current = 0;
    if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    setIsOpen(true);
  }

  const isHero = variant === "hero";

  return (
    <>
      <Link
        href="/"
        aria-label="Alford Custom Builders home"
        className={isHero ? "acb-v2-home__mark" : "acb-header__logo"}
        onClick={handleLogoClick}
      >
        <Image
          src={isHero ? "/brand/web/icon-apricot.svg" : "/brand/web/logo-horizontal-primary.svg"}
          alt="Alford Custom Builders"
          width={isHero ? 288 : 406}
          height={isHero ? 288 : 152}
          preload={isHero}
        />
      </Link>

      {isOpen ? (
        <div
          className="acb-preview-switcher"
          role="dialog"
          aria-modal="true"
          aria-labelledby="preview-switcher-title"
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
            <h2 id="preview-switcher-title">Choose a preview</h2>
            <nav aria-label="Preview versions">
              <a href="https://preview1.alfordcustombuilders.com">
                <span>Preview 1</span>
                <span aria-hidden="true">→</span>
                {previewVersion === "preview1" ? <small>Current</small> : null}
              </a>
              <a href="https://preview2.alfordcustombuilders.com">
                <span>Preview 2</span>
                <span aria-hidden="true">→</span>
                {previewVersion === "preview2" ? <small>Current</small> : null}
              </a>
            </nav>
          </div>
        </div>
      ) : null}
    </>
  );
}
