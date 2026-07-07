"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function HomepageMotion() {
  useGSAP(() => {
    if (prefersReducedMotion()) {
      return;
    }

    const splitTargets = gsap.utils.toArray<HTMLElement>("[data-split-heading]");
    const splits = splitTargets.map((target) => {
      const split = new SplitType(target, { types: "lines" });
      gsap.set(split.lines, { overflow: "hidden" });
      return split;
    });

    splitTargets.forEach((target, index) => {
      const split = splits[index];
      if (!split) return;

      gsap.fromTo(
        split.lines,
        { yPercent: 110, autoAlpha: 0 },
        {
          yPercent: 0,
          autoAlpha: 1,
          duration: 1.1,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: target.hasAttribute("data-hero-heading")
            ? undefined
            : {
                trigger: target,
                start: "top 84%",
              },
        },
      );
    });

    const revealTargets = gsap.utils.toArray<HTMLElement>("[data-reveal]");
    revealTargets.forEach((target, index) => {
      gsap.fromTo(
        target,
        { autoAlpha: 0, y: 36 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          ease: "power2.out",
          delay: index === 0 ? 0.1 : 0,
          scrollTrigger: {
            trigger: target,
            start: "top 88%",
          },
        },
      );
    });

    gsap.to("[data-hero-parallax]", {
      yPercent: 10,
      ease: "none",
      scrollTrigger: {
        trigger: "[data-hero]",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    gsap.fromTo(
      "[data-hero-copy]",
      { autoAlpha: 0, y: 40 },
      { autoAlpha: 1, y: 0, duration: 1.1, ease: "power3.out" },
    );

    gsap.utils.toArray<HTMLElement>("[data-process-step]").forEach((step) => {
      gsap.fromTo(
        step,
        { autoAlpha: 0.3, y: 48 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: step,
            start: "top 82%",
            end: "top 42%",
            scrub: false,
          },
        },
      );
    });

    gsap.utils.toArray<HTMLElement>("[data-lux-card]").forEach((card, index) => {
      gsap.fromTo(
        card,
        { autoAlpha: 0, y: 28 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.85,
          ease: "power2.out",
          delay: index * 0.04,
          scrollTrigger: {
            trigger: card,
            start: "top 84%",
          },
        },
      );
    });

    gsap.utils.toArray<HTMLElement>("[data-float-card]").forEach((card) => {
      gsap.to(card, {
        yPercent: -8,
        ease: "none",
        scrollTrigger: {
          trigger: card,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    return () => {
      splits.forEach((split) => split.revert());
    };
  });

  return null;
}
