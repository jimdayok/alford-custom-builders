"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { PreviewLogoLink } from "@/components/preview-logo-link";
import type { PreviewVersion } from "@/lib/preview-version";
import { navigation, previewTwoNavigation } from "@/lib/site-data";

export function Header({ previewVersion }: { previewVersion: PreviewVersion | null }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const previewMode = previewVersion !== null;
  const activeNavigation = previewVersion === "preview2" ? previewTwoNavigation : navigation;
  const isPreviewTwoHome = previewVersion === "preview2" && pathname === "/";

  useEffect(() => {
    if (!isOpen) return;

    const closeOnOutsideClick = (event: PointerEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) setIsOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("pointerdown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen]);

  return (
    <header className={`acb-header ${previewMode ? "top-10" : "top-0"} ${previewVersion === "preview2" ? "acb-header--v2" : ""} ${isPreviewTwoHome ? "acb-header--v2-home" : ""}`}>
      <div className="acb-header__inner">
        {previewVersion ? (
          <PreviewLogoLink previewVersion={previewVersion} />
        ) : (
          <Link href="/" aria-label="Alford Custom Builders home" className="acb-header__logo">
            <Image
              src="/brand/web/logo-horizontal-primary.svg"
              alt="Alford Custom Builders"
              width={406}
              height={152}
              priority
            />
          </Link>
        )}

        <nav className="acb-header__nav" aria-label="Primary navigation">
          {activeNavigation.map((item) => {
            const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link key={item.href} href={item.href} aria-current={isActive ? "page" : undefined}>
                {item.label}
              </Link>
            );
          })}
        </nav>

        {previewVersion === "preview2" ? null : (
          <Link href="/contact" className="acb-header__cta">
            Start a Conversation
          </Link>
        )}

        <div ref={menuRef} className="acb-header__mobile">
          <button
            type="button"
            aria-label={isOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={isOpen}
            aria-controls="acb-mobile-menu"
            onClick={() => setIsOpen((open) => !open)}
          >
            <span />
            <span />
          </button>
          {isOpen ? (
            <nav id="acb-mobile-menu" aria-label="Mobile navigation">
              {activeNavigation.map((item) => (
                <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)}>
                  {item.label}
                </Link>
              ))}
              {previewVersion === "preview2" ? null : (
                <Link href="/contact" onClick={() => setIsOpen(false)}>
                  Start a Conversation
                </Link>
              )}
            </nav>
          ) : null}
        </div>
      </div>
    </header>
  );
}
