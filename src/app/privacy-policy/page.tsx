import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Privacy Policy", description: "How Alford Custom Builders handles information submitted through this website." };

export default function PrivacyPolicyPage() {
  return <article className="mx-auto max-w-4xl px-5 pb-20 pt-32 sm:px-6 lg:px-8 lg:pt-40">
    <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[var(--color-wood)]">Website policy</p>
    <h1 className="mt-5 font-serif text-5xl leading-tight sm:text-6xl">Privacy policy</h1>
    <p className="mt-5 text-sm text-[var(--color-muted)]">Effective August 10, 2026</p>
    <div className="mt-12 space-y-9 text-lg leading-8 text-[var(--color-muted)]">
      <section><h2 className="font-serif text-3xl text-[var(--color-charcoal)]">Information you provide</h2><p className="mt-3">We receive information you choose to provide when you contact Alford Custom Builders by phone, email, or an available website form.</p></section>
      <section><h2 className="font-serif text-3xl text-[var(--color-charcoal)]">Website operation and measurement</h2><p className="mt-3">Necessary technologies support security and core operation. Optional measurement is disabled unless you consent. When enabled, Vercel Analytics provides aggregate website performance and usage information.</p></section>
      <section><h2 className="font-serif text-3xl text-[var(--color-charcoal)]">Consent records</h2><p className="mt-3">Your privacy choice is stored in your browser and recorded by our self-hosted consent service for policy management and auditing. D2D Marketing supports this website and consent infrastructure on Alford Custom Builders&apos; behalf.</p></section>
      <section><h2 className="font-serif text-3xl text-[var(--color-charcoal)]">Your choices</h2><p className="mt-3">Reject optional technologies or change your selection at any time using the Privacy preferences control in the footer. See the <Link className="underline" href="/cookie-policy">cookie policy</Link> for details.</p></section>
      <section><h2 className="font-serif text-3xl text-[var(--color-charcoal)]">Contact</h2><p className="mt-3">Use the published Alford Custom Builders phone number or email address with questions about this policy.</p></section>
    </div>
  </article>;
}
