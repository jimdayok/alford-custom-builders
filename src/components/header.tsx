"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { navigation } from "@/lib/site-data";

export function Header({ previewMode = false }: { previewMode?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

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
    <header className={`acb-header ${previewMode ? "top-10" : "top-0"}`}>
      <div className="acb-header__inner">
        <Link href="/" aria-label="Alford Custom Builders home" className="acb-header__logo">
          <Image
            src="/brand/web/logo-horizontal-primary.svg"
            alt="Alford Custom Builders"
            width={406}
            height={152}
            priority
          />
        </Link>

        <nav className="acb-header__nav" aria-label="Primary navigation">
          {navigation.map((item) => {
            const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link key={item.href} href={item.href} aria-current={isActive ? "page" : undefined}>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <Link href="/contact" className="acb-header__cta">
          Start a Conversation
        </Link>

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
              {navigation.map((item) => (
                <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)}>
                  {item.label}
                </Link>
              ))}
              <Link href="/contact" onClick={() => setIsOpen(false)}>
                Start a Conversation
              </Link>
            </nav>
          ) : null}
        </div>
      </div>
    </header>
  );
}
