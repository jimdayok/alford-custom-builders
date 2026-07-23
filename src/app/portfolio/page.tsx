import type { Metadata } from "next";

import { CTA } from "@/components/cta";
import { PortfolioGrid } from "@/components/portfolio/portfolio-grid";
import { siteConfig } from "@/lib/site-data";
import { getPortfolioProjects } from "@/lib/cms/published-content";

export async function generateMetadata(): Promise<Metadata> {
  const projects = await getPortfolioProjects();
  const description = "Explore Dallas luxury residential work from Alford Custom Builders through immersive project galleries and room-by-room photography.";
  return { title: "Portfolio", description, openGraph: { title: `Portfolio | ${siteConfig.name}`, description, images: [{ url: projects[0]?.coverImage ?? "/opengraph-image", alt: projects[0]?.title ?? siteConfig.name }] }, twitter: { card: "summary_large_image", title: `Portfolio | ${siteConfig.name}`, description, images: [projects[0]?.coverImage ?? "/opengraph-image"] } };
}

export default async function PortfolioPage() {
  const portfolioProjects = await getPortfolioProjects();
  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-white/10 bg-[#13110f]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(210,179,143,0.16),transparent_24%),linear-gradient(180deg,#1a1714_0%,#13110f_100%)]" />
        <div className="relative mx-auto max-w-7xl px-5 pb-16 pt-20 sm:px-6 lg:px-8 lg:pb-20 lg:pt-24">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(20rem,28rem)] lg:items-end">
            <div className="max-w-4xl">
              <p className="text-xs font-semibold tracking-[0.36em] uppercase text-[#d2b38f]">
                Portfolio
              </p>
              <h1 className="mt-5 font-serif text-5xl leading-none text-[#f7f1e7] sm:text-6xl lg:text-7xl">
                Timeless Dallas homes experienced through light, material, and detail.
              </h1>
              <p className="mt-6 max-w-3xl text-base leading-8 text-[#efe8dc]/74 sm:text-lg">
                Explore a premium gallery of custom homes and high-end residential work
                that reflects the classic, transitional standard Alford Custom Builders is
                bringing to the Dallas market.
              </p>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.18)] backdrop-blur-sm sm:p-7">
              <p className="text-xs font-semibold tracking-[0.28em] uppercase text-[#d2b38f]">
                Selected Residences
              </p>
              <div className="mt-5 grid grid-cols-2 gap-4">
                <div>
                  <p className="font-serif text-4xl text-[#f7f1e7]">{portfolioProjects.length}</p>
                  <p className="mt-2 text-sm leading-6 text-[#efe8dc]/66">Project galleries</p>
                </div>
                <div>
                  <p className="font-serif text-4xl text-[#f7f1e7]">
                    {portfolioProjects.reduce((sum, project) => sum + project.photoCount, 0)}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[#efe8dc]/66">Curated photographs</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#13110f]">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:px-8 lg:py-16">
          <PortfolioGrid projects={portfolioProjects} />
        </div>
      </section>

      <section className="bg-[#13110f] pb-16 pt-2 sm:pb-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <CTA
            title="Start Your Custom Home Conversation"
            description="Share the kind of home you want to build or transform, and we will shape a process around craftsmanship, clarity, and exceptional execution."
            primaryHref="/contact"
            primaryLabel="Start a Private Consultation"
            secondaryHref="/about"
            secondaryLabel="About The Firm"
          />
        </div>
      </section>
    </>
  );
}
