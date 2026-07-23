import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { CTA } from "@/components/cta";
import { PageHero } from "@/components/page-hero";
import { getJournalPosts } from "@/lib/cms/published-content";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = (await getJournalPosts()).find((item) => item.slug === slug);
  return post ? { title: post.seo.title, description: post.seo.description } : {};
}

export default async function JournalPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = (await getJournalPosts()).find((item) => item.slug === slug);
  if (!post) notFound();
  return <>
    <PageHero eyebrow="Journal" title={post.title} description={post.excerpt} />
    <article className="section-shell pt-6">
      {post.coverImage ? <div className="relative mb-12 aspect-[16/9] overflow-hidden rounded-[2rem]"><Image src={post.coverImage.path} alt={post.coverImage.decorative ? "" : post.coverImage.altText} fill priority className="object-cover" sizes="100vw" /></div> : null}
      <div className="mx-auto max-w-3xl space-y-6 text-base leading-8 text-[var(--color-muted)]">
        <p className="text-xs font-semibold tracking-[0.24em] uppercase text-[var(--color-wood)]">{post.authorDisplayName} · {new Date(`${post.publishDate}T12:00:00`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</p>
        {post.body.map((block, index) => block.type === "heading" ? <h2 key={index} className="pt-5 font-serif text-4xl text-[var(--color-charcoal)]">{block.text}</h2> : block.type === "blockquote" ? <blockquote key={index} className="border-l-4 border-[var(--color-wood)] pl-6 font-serif text-2xl text-[var(--color-charcoal)]">{block.text}</blockquote> : block.type === "list" ? <ul key={index} className="list-disc space-y-2 pl-6">{block.text.split("\n").filter(Boolean).map((item) => <li key={item}>{item}</li>)}</ul> : <p key={index}>{block.text}</p>)}
      </div>
    </article>
    <section className="section-shell pt-20"><CTA title="Planning a luxury custom home or major remodel in Dallas?" description="Start with a private consultation and tell us about your project." primaryHref="/contact" primaryLabel="Discuss Your Build" /></section>
  </>;
}
