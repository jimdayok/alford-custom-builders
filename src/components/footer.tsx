import Image from "next/image";
import Link from "next/link";

import { navigation } from "@/lib/site-data";
import { getGlobalSettings } from "@/lib/cms/published-content";

export async function Footer() {
  const settings = await getGlobalSettings();
  return (
    <footer className="mt-24 border-t border-[rgba(15,34,54,0.08)] bg-[linear-gradient(180deg,#f6f1e8_0%,#efe7da_100%)] text-[var(--color-charcoal)]">
      <div className="mx-auto max-w-7xl px-5 pb-8 pt-14 sm:px-6 lg:px-8 lg:pb-10 lg:pt-18">
        <div className="overflow-hidden rounded-[2.4rem] border border-[rgba(15,34,54,0.08)] bg-[linear-gradient(135deg,#16202b_0%,#111a24_45%,#1f2d3b_100%)] text-white shadow-[0_34px_100px_rgba(10,14,20,0.18)]">
          <div className="grid gap-10 px-6 py-8 sm:px-8 lg:grid-cols-[1fr_auto] lg:items-end lg:px-12 lg:py-12">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold tracking-[0.32em] uppercase text-[var(--color-sand)]">
                {settings.businessName}
              </p>
              <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">
                Start with a conversation that feels as considered as the home you want to build.
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-white/72 sm:text-lg">
                Luxury custom homes, estate renovations, and additions led with
                direct communication, thoughtful planning, and personal builder
                involvement from first meeting through closeout.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex min-h-12 items-center justify-center rounded-[1rem] bg-[var(--color-sand)] px-6 py-3 text-xs font-semibold tracking-[0.24em] uppercase text-[var(--color-charcoal)] transition hover:-translate-y-0.5 hover:bg-[#e7cfb0]"
              >
                {settings.consultationCtaLabel}
              </Link>
              <Link
                href="/portfolio"
                className="inline-flex min-h-12 items-center justify-center rounded-[1rem] border border-white/14 bg-white/8 px-6 py-3 text-xs font-semibold tracking-[0.24em] uppercase text-white transition hover:-translate-y-0.5 hover:bg-white/12"
              >
                View Portfolio
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr_0.9fr]">
          <div className="max-w-lg">
            <Link href="/" aria-label={`${settings.businessName} home`}>
              <Image
                src="/logos/aclogoblue.png"
                alt={settings.businessName}
                width={220}
                height={74}
                className="h-14 w-auto rounded-[0.6rem] shadow-[0_14px_34px_rgba(15,24,34,0.08)]"
              />
            </Link>
            <p className="mt-6 text-base leading-8 text-[var(--color-muted)]">
              {settings.defaultDescription}
            </p>
            <p className="mt-5 text-sm font-semibold tracking-[0.18em] uppercase text-[var(--color-wood)]">
              Private consultations by appointment
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold tracking-[0.32em] uppercase text-[var(--color-wood)]">
              Navigate
            </p>
            <div className="mt-5 grid grid-cols-2 gap-x-6 gap-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-base text-[var(--color-charcoal)] transition hover:text-[var(--color-wood)]"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold tracking-[0.32em] uppercase text-[var(--color-wood)]">
              Contact
            </p>
            <div className="mt-5 space-y-5 text-base leading-8 text-[var(--color-muted)]">
              <p>{settings.footerContactCopy}</p>
              <p>Luxury custom homes, estate renovations, and additions across Dallas.</p>
              <a
                href={`tel:${settings.phone.replace(/[^+\d]/g, "")}`}
                className="block text-[var(--color-charcoal)] transition hover:text-[var(--color-wood)]"
              >
                {settings.phone}
              </a>
              <a
                href={`mailto:${settings.email}`}
                className="block text-[var(--color-charcoal)] transition hover:text-[var(--color-wood)]"
              >
                {settings.email}
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-[rgba(15,34,54,0.08)]">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-6 text-xs tracking-[0.16em] uppercase text-[rgba(22,32,43,0.54)] sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <p>© {new Date().getFullYear()} {settings.businessName}</p>
          <p>Luxury custom homes and high-end remodels in Dallas</p>
        </div>
      </div>
    </footer>
  );
}
