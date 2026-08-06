"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { navigation } from "@/lib/site-data";

type MobileMenuProps = {
  align?: "center" | "right";
  label: string;
};

function MobileMenu({ align = "right", label }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

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

  const menuId = `${label.toLowerCase().replaceAll(" ", "-")}-menu`;

  return (
    <div ref={menuRef} className="relative">
      <button
        type="button"
        aria-controls={menuId}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
        className="flex min-h-10 cursor-pointer items-center rounded-full border border-[var(--color-border)] bg-white px-5 py-2 text-[11px] font-semibold tracking-[0.22em] uppercase text-[var(--color-charcoal)]"
      >
        {isOpen ? "Close" : "Menu"}
      </button>
      {isOpen ? (
        <div
          id={menuId}
          className={`absolute top-full z-30 mt-3 w-[min(19rem,88vw)] rounded-[1.3rem] border border-[var(--color-border)] bg-[rgba(248,244,237,0.98)] p-3 shadow-[0_20px_60px_rgba(15,24,34,0.16)] backdrop-blur-xl ${
            align === "center" ? "left-1/2 -translate-x-1/2" : "right-0"
          }`}
        >
          <nav className="flex flex-col" aria-label={label}>
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="rounded-[1rem] px-4 py-3 text-sm text-[var(--color-charcoal)] transition hover:bg-[var(--color-surface)] focus-visible:bg-[var(--color-surface)]"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      ) : null}
    </div>
  );
}

export function Header({ previewMode = false }: { previewMode?: boolean }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 220);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header className="relative z-30 border-b border-[rgba(15,34,54,0.08)] bg-[rgba(255,252,247,0.94)]">
        <div className="mx-auto max-w-7xl px-5 pb-5 pt-6 sm:px-6 lg:px-8 lg:pb-7 lg:pt-8">
          <div className="flex justify-center">
            <Link href="/" aria-label="Alford Custom Builders home">
              <Image
                src="/logos/aclogoblue.png"
                alt="Alford Custom Builders"
                width={248}
                height={84}
                priority
                className="h-16 w-auto sm:h-20"
              />
            </Link>
          </div>

          <nav className="mt-5 hidden items-center justify-center gap-8 lg:flex" aria-label="Primary">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[13px] font-medium tracking-[0.18em] uppercase text-[var(--color-charcoal)] transition hover:text-[var(--color-wood)]"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="mt-4 flex justify-center lg:hidden">
            <MobileMenu align="center" label="Mobile navigation" />
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-x-0 z-50 transition duration-500 ${previewMode ? "top-10" : "top-0"} ${
          scrolled ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <div className="mx-auto mt-3 w-[min(96vw,84rem)] rounded-[1.35rem] border border-[rgba(255,255,255,0.35)] bg-[rgba(248,244,237,0.84)] px-4 py-3 shadow-[0_18px_60px_rgba(15,24,34,0.14)] backdrop-blur-2xl sm:px-5">
          <div className="flex items-center justify-between gap-4">
            <Link href="/" aria-label="Alford Custom Builders home" className="shrink-0">
              <Image
                src="/logos/aclogoblue.png"
                alt="Alford Custom Builders"
                width={150}
                height={48}
                className="h-10 w-auto rounded-[0.5rem] shadow-[0_10px_24px_rgba(15,24,34,0.14)]"
              />
            </Link>

            <nav className="hidden items-center gap-6 xl:flex" aria-label="Sticky primary">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-[11px] font-semibold tracking-[0.24em] uppercase text-[var(--color-charcoal)] transition hover:text-[var(--color-wood)]"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <Link
                href="/contact"
                className="hidden min-h-11 items-center justify-center rounded-[0.9rem] bg-[var(--color-sand)] px-4 py-2 text-[11px] font-semibold tracking-[0.22em] uppercase text-[var(--color-charcoal)] transition hover:-translate-y-0.5 hover:bg-[#e7cfb0] sm:inline-flex"
              >
                Schedule a Consultation
              </Link>
              <div className="xl:hidden">
                <MobileMenu label="Sticky mobile navigation" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
