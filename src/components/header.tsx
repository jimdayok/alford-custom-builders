import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/button";
import { navigation } from "@/lib/site-data";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-[rgba(248,245,239,0.88)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="shrink-0" aria-label="Alford Custom Builders home">
          <Image
            src="/logos/aclogoblue.png"
            alt="Alford Custom Builders"
            width={188}
            height={56}
            priority
            className="h-10 w-auto sm:h-12"
          />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium tracking-[0.14em] uppercase text-[var(--color-charcoal)] transition hover:text-[var(--color-navy)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button href="/contact" variant="secondary">
            Schedule A Consultation
          </Button>
        </div>

        <details className="relative lg:hidden">
          <summary className="flex cursor-pointer list-none items-center gap-3 rounded-full border border-[var(--color-border)] bg-white/75 px-4 py-2 text-xs font-semibold tracking-[0.2em] uppercase text-[var(--color-charcoal)]">
            Menu
          </summary>
          <div className="absolute right-0 mt-3 w-64 rounded-[1.5rem] border border-[var(--color-border)] bg-white p-3 shadow-[0_20px_60px_rgba(15,23,31,0.12)]">
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
              <div className="px-2 pt-3">
                <Button href="/contact" variant="secondary">
                  Schedule A Consultation
                </Button>
              </div>
            </nav>
          </div>
        </details>
      </div>
    </header>
  );
}
