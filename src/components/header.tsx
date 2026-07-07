"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { navigation } from "@/lib/site-data";

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 220);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header className="relative z-30 border-b border-[rgba(15,34,54,0.08)] bg-[rgba(255,252,247,0.94)]">
        <div className="mx-auto max-w-7xl px-5 pb-5 pt-6 sm:px-6 lg:px-8 lg:pb-7 lg:pt-8">
          <div className="flex justify-center">
            <Link href="/" aria-label="Alford Custom Homes home">
              <Image
                src="/logos/aclogoblue.png"
                alt="Alford Custom Homes"
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

          <details className="relative mt-4 lg:hidden">
            <summary className="mx-auto flex w-fit cursor-pointer list-none items-center rounded-full border border-[var(--color-border)] bg-white px-5 py-2 text-xs font-semibold tracking-[0.2em] uppercase text-[var(--color-charcoal)]">
              Menu
            </summary>
            <div className="absolute left-1/2 top-full z-20 mt-3 w-[min(18rem,90vw)] -translate-x-1/2 rounded-[1.5rem] border border-[var(--color-border)] bg-white p-3 shadow-[0_20px_60px_rgba(15,23,31,0.12)]">
              <nav className="flex flex-col" aria-label="Mobile">
                {navigation.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-2xl px-4 py-3 text-sm text-[var(--color-charcoal)] transition hover:bg-[var(--color-surface)]"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          </details>
        </div>
      </header>

      <div
        className={`fixed inset-x-0 top-0 z-50 transition duration-500 ${
          scrolled ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <div className="mx-auto mt-3 w-[min(96vw,84rem)] rounded-[1.35rem] border border-[rgba(255,255,255,0.35)] bg-[rgba(248,244,237,0.82)] px-4 py-3 shadow-[0_18px_60px_rgba(15,24,34,0.14)] backdrop-blur-2xl sm:px-5">
          <div className="flex items-center justify-between gap-4">
            <Link href="/" aria-label="Alford Custom Homes home" className="shrink-0">
              <Image
                src="/logos/aclogoblue.png"
                alt="Alford Custom Homes"
                width={150}
                height={48}
                className="h-10 w-auto rounded-[0.5rem] shadow-[0_10px_24px_rgba(15,24,34,0.14)]"
              />
            </Link>

            <nav className="hidden items-center gap-6 xl:flex" aria-label="Sticky Primary">
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
              <details className="relative xl:hidden">
                <summary className="flex list-none cursor-pointer items-center rounded-full border border-[var(--color-border)] bg-white px-4 py-2 text-[11px] font-semibold tracking-[0.22em] uppercase text-[var(--color-charcoal)]">
                  Menu
                </summary>
                <div className="absolute right-0 top-full mt-3 w-[min(18rem,84vw)] rounded-[1.3rem] border border-[var(--color-border)] bg-[rgba(248,244,237,0.98)] p-3 shadow-[0_20px_60px_rgba(15,24,34,0.16)] backdrop-blur-xl">
                  <nav className="flex flex-col" aria-label="Sticky Mobile">
                    {navigation.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="rounded-[1rem] px-4 py-3 text-sm text-[var(--color-charcoal)] transition hover:bg-[var(--color-surface)]"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </nav>
                </div>
              </details>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
