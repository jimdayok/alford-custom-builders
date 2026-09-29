"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";

import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const frames = [
  {
    src: "/images/hero-journey/greenbrier-wide.webp",
    className: "home-journey__image--wide",
  },
  {
    src: "/images/hero-journey/greenbrier-walk.webp",
    className: "home-journey__image--walk",
  },
  {
    src: "/images/hero-journey/greenbrier-close.webp",
    className: "home-journey__image--close",
  },
  {
    src: "/images/hero-journey/greenbrier-porch-ai.webp",
    className: "home-journey__image--porch",
  },
  {
    src: "/images/hero-journey/doorway-interior-ai.webp",
    className: "home-journey__image--doorway",
  },
  {
    src: "/images/hero-journey/bryn-mawr-interior.webp",
    className: "home-journey__image--interior",
  },
] as const;

export function HomeJourneyHero() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const stage = section.querySelector<HTMLElement>("[data-journey-stage]");
      const imageFrames = gsap.utils.toArray<HTMLElement>("[data-journey-frame]");
      const logo = section.querySelector<HTMLElement>("[data-journey-logo]");
      const scrollCue = section.querySelector<HTMLElement>("[data-journey-scroll]");
      const threshold = section.querySelector<HTMLElement>("[data-journey-threshold]");
      const invitation = section.querySelector<HTMLElement>("[data-journey-invitation]");

      if (!stage || imageFrames.length !== frames.length) return;

      gsap.set(imageFrames, { autoAlpha: 0, scale: 1.04 });
      gsap.set(imageFrames[0], { autoAlpha: 1, scale: 1 });
      gsap.set(invitation, { autoAlpha: 0, y: 28 });
      gsap.set(threshold, { autoAlpha: 0 });

      if (prefersReducedMotion()) {
        gsap.set(invitation, { autoAlpha: 1, y: 0 });
        return;
      }

      const timeline = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: section,
          pin: stage,
          start: "top top",
          end: "+=460%",
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      timeline
        .to(logo, { autoAlpha: 0, yPercent: -135, duration: 0.9 }, 0)
        .to(scrollCue, { autoAlpha: 0, y: 18, duration: 0.35 }, 0)
        .to(imageFrames[0], { scale: 1.12, duration: 1.15 }, 0)
        .to(imageFrames[1], { autoAlpha: 1, scale: 1.14, duration: 1 }, 0.65)
        .to(imageFrames[0], { autoAlpha: 0, duration: 0.48 }, 0.92)
        .to(imageFrames[2], { autoAlpha: 1, scale: 1.18, duration: 1 }, 1.5)
        .to(imageFrames[1], { autoAlpha: 0, duration: 0.5 }, 1.72)
        .to(imageFrames[3], { autoAlpha: 1, scale: 1.22, duration: 1.15 }, 2.35)
        .to(imageFrames[2], { autoAlpha: 0, duration: 0.52 }, 2.55)
        .to(threshold, { autoAlpha: 0.88, duration: 0.5 }, 3.08)
        .to(imageFrames[4], { autoAlpha: 1, scale: 1.1, duration: 1.15 }, 3.35)
        .to(imageFrames[3], { autoAlpha: 0, duration: 0.35 }, 3.35)
        .to(threshold, { autoAlpha: 0, duration: 0.65 }, 3.55)
        .to(imageFrames[5], { autoAlpha: 1, scale: 1.055, duration: 1.25 }, 4.35)
        .to(imageFrames[4], { autoAlpha: 0, duration: 0.55 }, 4.55)
        .to(invitation, { autoAlpha: 1, y: 0, duration: 0.75, ease: "power2.out" }, 5.05);

      return () => timeline.scrollTrigger?.kill();
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="home-journey" aria-labelledby="home-journey-title">
      <div className="home-journey__stage" data-journey-stage>
        <h1 id="home-journey-title" className="sr-only">
          Alford Custom Builders — enter a thoughtfully crafted home
        </h1>

        {frames.map((frame, index) => (
          <div
            key={frame.src}
            className={`home-journey__frame home-journey__frame--${index} ${index === 0 ? "home-journey__frame--first" : ""}`}
            data-journey-frame
            aria-hidden="true"
          >
            <Image
              src={frame.src}
              alt=""
              fill
              sizes="100vw"
              preload={index === 0}
              className={`home-journey__image ${frame.className}`}
            />
          </div>
        ))}

        <div className="home-journey__shade" aria-hidden="true" />
        <div className="home-journey__threshold" data-journey-threshold aria-hidden="true" />

        <div className="home-journey__logo" data-journey-logo>
          <Image
            src="/logos/alfordtemplogo.png"
            alt="Alford Custom Builders"
            width={1000}
            height={500}
            preload
            className="h-auto w-full"
          />
        </div>

        <div className="home-journey__scroll" data-journey-scroll aria-hidden="true">
          <span>Scroll to enter</span>
          <i />
        </div>

        <div className="home-journey__invitation" data-journey-invitation>
          <p>Crafted around the way you live</p>
          <h2>Explore this home</h2>
          <Link href="/portfolio">Step inside</Link>
        </div>
      </div>
    </section>
  );
}
