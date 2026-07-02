import Image from "next/image";
import Link from "next/link";

import { navigation } from "@/lib/site-data";

export function Header() {
  return (
    <header className="border-b border-[rgba(15,34,54,0.08)] bg-[rgba(255,252,247,0.94)]">
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
  );
}
