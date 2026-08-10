import type { Metadata } from "next";

export const metadata: Metadata = { title: "Cookie Policy", description: "Cookie and consent choices for the Alford Custom Builders website." };

export default function CookiePolicyPage() {
  return <article className="mx-auto max-w-4xl px-5 pb-20 pt-32 sm:px-6 lg:px-8 lg:pt-40">
    <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[var(--color-wood)]">Website policy</p>
    <h1 className="mt-5 font-serif text-5xl leading-tight sm:text-6xl">Cookie policy</h1>
    <p className="mt-5 text-sm text-[var(--color-muted)]">Effective August 10, 2026</p>
    <div className="mt-12 space-y-9 text-lg leading-8 text-[var(--color-muted)]">
      <section><h2 className="font-serif text-3xl text-[var(--color-charcoal)]">Necessary</h2><p className="mt-3">Necessary storage supports site security, core operation, and remembering your privacy choice. It cannot be disabled through the consent manager.</p></section>
      <section><h2 className="font-serif text-3xl text-[var(--color-charcoal)]">Functionality</h2><p className="mt-3">This category permits optional embedded services or enhanced website features when present.</p></section>
      <section><h2 className="font-serif text-3xl text-[var(--color-charcoal)]">Measurement</h2><p className="mt-3">With permission, Vercel Analytics measures aggregate site usage and performance. It is not loaded until measurement consent is granted.</p></section>
      <section><h2 className="font-serif text-3xl text-[var(--color-charcoal)]">Change your choice</h2><p className="mt-3">Use the Privacy preferences control in the footer at any time. Your updated selection replaces the earlier consent record.</p></section>
    </div>
  </article>;
}
