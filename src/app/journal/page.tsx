import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

import { CTA } from "@/components/cta";
import { PageHero } from "@/components/page-hero";
import { getJournalPosts } from "@/lib/cms/published-content";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Explore future-ready insights from Alford Custom Builders on Dallas luxury custom homes, remodel planning, and high-end residential construction.",
};

export default async function JournalPage() {
  const journalPosts = await getJournalPosts();
  return (
    <>
      <PageHero
        eyebrow="Journal"
        title="A thoughtful editorial structure for Dallas luxury homebuilding insights."
        description="This section is designed to support future articles, project stories, and planning guidance in a voice that feels informed, measured, and aligned with the Alford Custom Builders brand."
      />

      <section className="section-shell">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {journalPosts.map((post) => (
            <article
              key={post.slug}
              className="rounded-[1.85rem] border border-[var(--color-border)] bg-white p-7 shadow-[0_22px_70px_rgba(20,26,35,0.07)]"
            >
              {post.coverImage ? <div className="relative mb-6 aspect-[16/10] overflow-hidden rounded-[1.25rem]"><Image src={post.coverImage.path} alt={post.coverImage.decorative ? "" : post.coverImage.altText} fill className="object-cover" sizes="(min-width: 1280px) 28vw, 100vw" /></div> : null}
              <p className="text-xs font-semibold tracking-[0.28em] uppercase text-[var(--color-wood)]">
                {new Date(`${post.publishDate}T12:00:00`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
              </p>
              <h2 className="mt-4 font-serif text-3xl text-[var(--color-charcoal)]">
                <Link href={`/journal/${post.slug}`}>{post.title}</Link>
              </h2>
              <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">
                {post.excerpt}
              </p>
              <div className="mt-8">
                <Link href={`/journal/${post.slug}`} className="text-xs font-semibold tracking-[0.2em] uppercase text-[var(--color-charcoal)]">Read Article</Link>
              </div>
            </article>
          ))}
          {journalPosts.length === 0 ? <div className="md:col-span-2 xl:col-span-3 rounded-[1.85rem] border border-[var(--color-border)] bg-white p-8 text-[var(--color-muted)]">No journal articles have been published yet.</div> : null}
        </div>
      </section>

      <section className="section-shell">
        <div className="rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-surface)] px-8 py-10 lg:px-10">
          <p className="text-xs font-semibold tracking-[0.3em] uppercase text-[var(--color-wood)]">
            Why It Matters
          </p>
          <h2 className="mt-4 max-w-4xl font-serif text-4xl leading-tight text-[var(--color-charcoal)] sm:text-5xl">
            The Journal creates room for search visibility, project authority, and a more established brand presence over time.
          </h2>
          <p className="mt-6 max-w-3xl text-base leading-8 text-[var(--color-muted)] sm:text-lg">
            It gives the site a natural home for subjects like custom home
            planning, Dallas neighborhood-specific insights, renovation strategy,
            and the practical differences between remodeling and building new.
          </p>
          <div className="mt-8">
            <Link
              href="/contact"
              className="text-sm font-semibold tracking-[0.18em] uppercase text-[var(--color-navy)] transition hover:text-[var(--color-wood)]"
            >
              Discuss Your Build
            </Link>
          </div>
        </div>
      </section>

      <section className="section-shell pt-20">
        <CTA
          title="Planning a luxury custom home or major remodel in Dallas?"
          description="Start with a private consultation and we can talk through the vision, neighborhood, planning stage, and level of builder involvement your project deserves."
          primaryHref="/contact"
          primaryLabel="Discuss Your Build"
          secondaryHref="/portfolio"
          secondaryLabel="View Our Work"
        />
      </section>
    </>
  );
}
