import Image from "next/image";
import Link from "next/link";

import { navigation, siteConfig } from "@/lib/site-data";

export function Footer() {
  return (
    <footer className="mt-24 bg-[var(--color-charcoal)] text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
        <div>
          <Link href="/" aria-label="Alford Custom Builders home">
            <Image
              src="/logos/acbuildbrown.png"
              alt="Alford Custom Builders"
              width={192}
              height={58}
              className="h-12 w-auto"
            />
          </Link>
          <p className="mt-6 max-w-xl text-sm leading-8 text-white/70">
            Luxury custom homes and high-end remodels for Dallas clients who
            value personal attention, timeless design, and clear communication.
          </p>
        </div>

        <div className="grid gap-10 sm:grid-cols-2">
          <div>
            <p className="text-xs font-semibold tracking-[0.28em] uppercase text-[var(--color-sand)]">
              Navigate
            </p>
            <div className="mt-5 flex flex-col gap-4">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-white/75 transition hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold tracking-[0.28em] uppercase text-[var(--color-sand)]">
              Contact
            </p>
            <div className="mt-5 space-y-4 text-sm text-white/75">
              <p>{siteConfig.location}</p>
              <a href="tel:+14698631381" className="block transition hover:text-white">
                {siteConfig.phone}
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="block transition hover:text-white"
              >
                {siteConfig.email}
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-6 text-xs tracking-[0.16em] uppercase text-white/45 sm:px-6 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p>© {new Date().getFullYear()} Alford Custom Builders</p>
          <p>Built for timeless Dallas living</p>
        </div>
      </div>
    </footer>
  );
}
