"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type ProcessStep = {
  step: string;
  title: string;
  eyebrow: string;
  description: string;
  image: string;
};

type GuidedProcessExperienceProps = {
  steps: ProcessStep[];
};

export function GuidedProcessExperience({
  steps,
}: GuidedProcessExperienceProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeStep = useMemo(() => steps[activeIndex] ?? steps[0], [activeIndex, steps]);

  useGSAP(() => {
    if (prefersReducedMotion() || typeof window === "undefined" || window.innerWidth < 1024) {
      return;
    }

    const railCards = gsap.utils.toArray<HTMLElement>("[data-process-rail-card]");

    const sectionTrigger = ScrollTrigger.create({
      trigger: "[data-process-desktop]",
      start: "top top+=96",
      end: `+=${steps.length * window.innerHeight * 0.72}`,
      pin: "[data-process-stage]",
      scrub: 0.4,
      anticipatePin: 1,
      onUpdate: (self) => {
        const rawIndex = Math.round(self.progress * (steps.length - 1));
        const nextIndex = Math.max(0, Math.min(steps.length - 1, rawIndex));
        setActiveIndex(nextIndex);
      },
    });

    railCards.forEach((card, index) => {
      gsap.fromTo(
        card,
        { autoAlpha: index === 0 ? 1 : 0.3, y: index === 0 ? 0 : 44 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
          },
        },
      );
    });

    return () => {
      sectionTrigger.kill();
    };
  }, [steps]);

  return (
    <>
      <div className="mt-14 hidden lg:block" data-process-desktop>
        <div className="grid gap-8 lg:grid-cols-[1.02fr_0.98fr]">
          <div
            data-process-stage
            className="sticky top-24 h-[78vh] overflow-hidden rounded-[2.45rem] border border-[rgba(15,34,54,0.1)] bg-[linear-gradient(180deg,#f9f5ef_0%,#f5ede1_100%)] shadow-[0_34px_100px_rgba(15,24,34,0.1)]"
          >
            <div className="grid h-full grid-cols-[1.02fr_0.98fr]">
              <div className="relative overflow-hidden bg-[var(--color-charcoal)]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(236,214,183,0.18),transparent_28%)]" />
                <div className="image-sheen relative h-full overflow-hidden">
                  <div className="absolute inset-0">
                    <Image
                      key={activeStep.image}
                      src={activeStep.image}
                      alt={`${activeStep.title} stage of an Alford Custom Homes project`}
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 44vw, 100vw"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center px-10 py-10 xl:px-12">
                <div className="w-full max-w-xl" key={activeStep.step}>
                  <p className="text-xs font-semibold tracking-[0.32em] uppercase text-[var(--color-wood)]">
                    {activeStep.step} · {activeStep.eyebrow}
                  </p>
                  <h3 className="mt-5 font-serif text-6xl leading-[0.96] text-[var(--color-charcoal)]">
                    {activeStep.title}
                  </h3>
                  <p className="mt-6 text-xl leading-10 text-[var(--color-muted)]">
                    {activeStep.description}
                  </p>

                  <div className="mt-10 space-y-4">
                    {steps.map((step, index) => {
                      const isActive = index === activeIndex;
                      return (
                        <div
                          key={step.step}
                          className={`flex items-center gap-4 transition ${
                            isActive ? "opacity-100" : "opacity-42"
                          }`}
                        >
                          <span
                            className={`h-2.5 rounded-full transition ${
                              isActive ? "w-12 bg-[var(--color-charcoal)]" : "w-6 bg-[var(--color-border-strong)]"
                            }`}
                          />
                          <span className="text-sm font-semibold tracking-[0.22em] uppercase text-[var(--color-charcoal)]">
                            {step.title}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6 py-[8vh]">
            {steps.map((step, index) => (
              <article
                key={step.step}
                data-process-rail-card
                className={`rounded-[1.9rem] border p-8 shadow-[0_22px_70px_rgba(15,24,34,0.08)] transition ${
                  index === activeIndex
                    ? "border-[var(--color-border-strong)] bg-white"
                    : "border-[var(--color-border)] bg-white/78"
                }`}
              >
                <p className="text-xs font-semibold tracking-[0.28em] uppercase text-[var(--color-wood)]">
                  {step.step} · {step.eyebrow}
                </p>
                <h4 className="mt-4 font-serif text-4xl text-[var(--color-charcoal)]">
                  {step.title}
                </h4>
                <p className="mt-4 text-base leading-8 text-[var(--color-muted)]">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-12 space-y-8 lg:hidden">
        {steps.map((step) => (
          <article
            key={step.step}
            className="grid gap-5 rounded-[2rem] border border-[var(--color-border)] bg-white p-5 shadow-[0_20px_70px_rgba(15,24,34,0.06)]"
          >
            <div className="image-sheen relative overflow-hidden rounded-[1.5rem]">
              <div className="relative aspect-[16/10]">
                <Image
                  src={step.image}
                  alt={`${step.title} stage of an Alford Custom Homes project`}
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold tracking-[0.28em] uppercase text-[var(--color-wood)]">
                {step.step} · {step.eyebrow}
              </p>
              <h3 className="mt-4 font-serif text-3xl text-[var(--color-charcoal)]">
                {step.title}
              </h3>
              <p className="mt-4 text-base leading-8 text-[var(--color-muted)]">
                {step.description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
