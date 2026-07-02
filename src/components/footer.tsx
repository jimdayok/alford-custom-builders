import Image from "next/image";
import Link from "next/link";

import { navigation, siteConfig } from "@/lib/site-data";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-[rgba(15,34,54,0.08)] bg-[#f8f4ed] text-[var(--color-charcoal)]">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr_0.8fr] lg:px-8 lg:py-20">
        <div>
          <Link href="/" aria-label="Alford Custom Builders home">
            <Image
              src="/logos/aclogoblue.png"
              alt="Alford Custom Builders"
              width={220}
              height={74}
              className="h-14 w-auto"
            />
          </Link>
          <p className="mt-6 max-w-md text-sm leading-8 text-[var(--color-muted)]">
            Built on a legacy of craftsmanship and relationships, Alford Custom
            Builders serves Dallas clients with a more personal, transparent, and
            design-conscious luxury homebuilding experience.
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold tracking-[0.28em] uppercase text-[var(--color-wood)]">
            Navigate
          </p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-[var(--color-muted)] transition hover:text-[var(--color-charcoal)]"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold tracking-[0.28em] uppercase text-[var(--color-wood)]">
            Contact
          </p>
          <div className="mt-5 space-y-4 text-sm leading-8 text-[var(--color-muted)]">
            <p>{siteConfig.location}</p>
            <a href="tel:+14698631381" className="block transition hover:text-[var(--color-charcoal)]">
              {siteConfig.phone}
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="block transition hover:text-[var(--color-charcoal)]"
            >
              {siteConfig.email}
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-[rgba(15,34,54,0.08)]">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-6 text-xs tracking-[0.16em] uppercase text-[rgba(22,32,43,0.5)] sm:px-6 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p>© {new Date().getFullYear()} Alford Custom Builders</p>
          <p>Luxury custom homes and high-end remodels in Dallas</p>
        </div>
      </div>
    </footer>
  );
}
