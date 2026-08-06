import Link from "next/link";

export function PreviewBanner() {
  return (
    <aside className="sticky top-0 z-[70] flex h-10 items-center justify-center bg-[var(--color-charcoal)] px-4 text-center text-[10px] font-semibold tracking-[0.18em] text-white uppercase sm:text-[11px] sm:tracking-[0.24em]">
      <span>Preview environment</span>
      <span className="mx-3 text-[var(--color-sand)]" aria-hidden="true">•</span>
      <span className="hidden sm:inline">Private working site</span>
      <Link href="/contact" className="ml-3 border-b border-[var(--color-sand)] pb-0.5 text-[var(--color-sand)]">
        Share feedback
      </Link>
    </aside>
  );
}
