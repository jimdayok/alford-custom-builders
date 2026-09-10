"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";

import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const revealEase = "power3.out";

export function SiteMotion() {
  const pathname = usePathname();

  useGSAP(
    () => {
      if (prefersReducedMotion()) {
        return;
      }

      gsap.to(".acb-scroll-progress", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          start: 0,
          end: "max",
          scrub: 0.25,
        },
      });

      const hero = document.querySelector<HTMLElement>(".acb-hero");
      if (hero) {
        const heroCopy = hero.querySelectorAll<HTMLElement>(".acb-hero__copy > *");
        const heroMedia = hero.querySelector<HTMLElement>(".acb-hero__media");

        gsap.fromTo(
          heroCopy,
          { autoAlpha: 0, y: 34 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1,
            ease: revealEase,
            stagger: 0.085,
            clearProps: "opacity,visibility,transform",
          },
        );

        if (heroMedia) {
          const heroImage = heroMedia.querySelector<HTMLElement>("img");

          gsap.fromTo(
            heroMedia,
            { clipPath: "inset(0 0 0 14%)" },
            {
              clipPath: "inset(0 0 0 0%)",
              duration: 1.35,
              ease: "power4.inOut",
              clearProps: "clipPath",
            },
          );

          if (heroImage) {
            gsap.set(heroImage, { scale: 1.065, transformOrigin: "center center" });
            gsap.to(heroImage, {
              yPercent: 6,
              ease: "none",
              scrollTrigger: {
                trigger: hero,
                start: "top top",
                end: "bottom top",
                scrub: 0.8,
              },
            });
          }
        }

        const logoMark = hero.querySelector<HTMLElement>(".acb-hero__media-mark");
        const logoTrace = logoMark?.querySelector<SVGPathElement>("[data-logo-trace]");
        const logoLight = logoMark?.querySelector<SVGGElement>("[data-logo-light]");
        const logoBloom = logoMark?.querySelector<HTMLElement>("[data-logo-bloom]");

        if (logoMark && logoTrace && logoLight && logoBloom) {
          const forceReplay = new URLSearchParams(window.location.search).get("intro") === "replay";
          let hasPlayed = false;

          try {
            hasPlayed = window.sessionStorage.getItem("acb-hero-logo-motion-seen-v1") === "true";
          } catch {
            hasPlayed = false;
          }

          if (forceReplay || !hasPlayed) {
            try {
              window.sessionStorage.setItem("acb-hero-logo-motion-seen-v1", "true");
            } catch {
              // The logo animation still works when storage is unavailable.
            }

            const totalLength = logoTrace.getTotalLength();
            const travel = { progress: 0 };
            const placeLight = () => {
              const point = logoTrace.getPointAtLength(totalLength * travel.progress);
              gsap.set(logoLight, { x: point.x, y: point.y });
            };

            gsap.set(logoTrace, {
              strokeDasharray: totalLength,
              strokeDashoffset: totalLength,
            });
            gsap.set(logoLight, { autoAlpha: 0 });
            placeLight();

            gsap
              .timeline({ delay: 0.28 })
              .fromTo(
                logoMark,
                { backgroundColor: "#a08870" },
                { backgroundColor: "#40422f", duration: 0.95, ease: "power2.inOut" },
              )
              .to(logoLight, { autoAlpha: 0.9, duration: 0.16 }, 0.2)
              .to(
                logoTrace,
                { strokeDashoffset: 0, duration: 1.15, ease: "power2.inOut" },
                0.2,
              )
              .to(
                travel,
                {
                  progress: 1,
                  duration: 1.15,
                  ease: "power2.inOut",
                  onUpdate: placeLight,
                },
                0.2,
              )
              .fromTo(
                logoBloom,
                { autoAlpha: 0, scale: 0.2 },
                { autoAlpha: 0.72, scale: 1, duration: 0.22, ease: "power2.out" },
                1.22,
              )
              .to(
                logoBloom,
                { autoAlpha: 0, scale: 7, duration: 0.5, ease: "power3.out" },
                1.39,
              )
              .to([logoTrace, logoLight], { autoAlpha: 0, duration: 0.35 }, 1.38);
          }
        }
      }

      const projectHero = document.querySelector<HTMLElement>("[data-motion-hero]");
      if (projectHero) {
        const projectHeroCopy = projectHero.querySelectorAll<HTMLElement>(
          "[data-motion-copy] > *",
        );
        const projectHeroImage = projectHero.querySelector<HTMLElement>(
          "[data-motion-media] img",
        );

        gsap.fromTo(
          projectHeroCopy,
          { autoAlpha: 0, y: 30 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1,
            ease: revealEase,
            stagger: 0.08,
            clearProps: "opacity,visibility,transform",
          },
        );

        if (projectHeroImage) {
          gsap.set(projectHeroImage, { scale: 1.07, transformOrigin: "center center" });
          gsap.to(projectHeroImage, {
            yPercent: 7,
            ease: "none",
            scrollTrigger: {
              trigger: projectHero,
              start: "top top",
              end: "bottom top",
              scrub: 0.8,
            },
          });
        }
      }

      gsap.utils
        .toArray<HTMLElement>(
          ".acb-section__intro, .acb-split__copy, .acb-form-panel__intro, .acb-form-panel__body, .acb-closing > div, .section-shell > *, [data-motion-reveal]",
        )
        .forEach((group) => {
          const children = Array.from(group.children).filter(
            (child): child is HTMLElement => child instanceof HTMLElement,
          );

          gsap.fromTo(
            children.length ? children : group,
            { autoAlpha: 0, y: 34 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.9,
              ease: revealEase,
              stagger: 0.07,
              clearProps: "opacity,visibility,transform",
              scrollTrigger: {
                trigger: group,
                start: "top 86%",
                once: true,
              },
            },
          );
        });

      gsap.utils.toArray<HTMLElement>(".acb-split__media").forEach((media) => {
        const image = media.querySelector<HTMLElement>("img");

        gsap.fromTo(
          media,
          { clipPath: "inset(0 10% 0 0)" },
          {
            clipPath: "inset(0 0% 0 0)",
            duration: 1.2,
            ease: "power4.inOut",
            clearProps: "clipPath",
            scrollTrigger: {
              trigger: media,
              start: "top 88%",
              once: true,
            },
          },
        );

        if (image) {
          gsap.set(image, { scale: 1.055, transformOrigin: "center center" });
          gsap.to(image, {
            yPercent: 5,
            ease: "none",
            scrollTrigger: {
              trigger: media,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.8,
            },
          });
        }
      });

      gsap.utils.toArray<HTMLElement>(".acb-statement__inner").forEach((band) => {
        const icon = band.querySelector<HTMLElement>(".acb-statement__icon");
        const statement = band.querySelector<HTMLElement>("p");
        const rule = band.querySelector<HTMLElement>(".acb-statement__rule");

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: band,
            start: "top 88%",
            once: true,
          },
        });

        if (icon) {
          timeline.fromTo(
            icon,
            { autoAlpha: 0, rotate: -24, scale: 0.75 },
            { autoAlpha: 1, rotate: 0, scale: 1, duration: 0.8, ease: revealEase },
          );
        }
        if (statement) {
          timeline.fromTo(
            statement,
            { autoAlpha: 0, y: 22 },
            { autoAlpha: 1, y: 0, duration: 0.8, ease: revealEase },
            "-=0.55",
          );
        }
        if (rule) {
          timeline.fromTo(
            rule,
            { scaleX: 0, transformOrigin: "left center" },
            { scaleX: 1, duration: 1, ease: "power3.inOut" },
            "-=0.55",
          );
        }
      });

      gsap.utils
        .toArray<HTMLElement>(
          ".acb-standard-card, .acb-values > p, .acb-project-card, [data-motion-card]",
        )
        .forEach((card, index) => {
          gsap.fromTo(
            card,
            { autoAlpha: 0, y: 28 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.82,
              delay: (index % 4) * 0.045,
              ease: revealEase,
              clearProps: "opacity,visibility,transform",
              scrollTrigger: {
                trigger: card,
                start: "top 91%",
                once: true,
              },
            },
          );
        });

      const footerSections = gsap.utils.toArray<HTMLElement>(
        ".acb-footer__lead, .acb-footer__grid, .acb-footer__base",
      );
      if (footerSections.length) {
        gsap.fromTo(
          footerSections,
          { autoAlpha: 0, y: 26 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.1,
            ease: revealEase,
            clearProps: "opacity,visibility,transform",
            scrollTrigger: {
              trigger: ".acb-footer",
              start: "top 88%",
              once: true,
            },
          },
        );
      }

      ScrollTrigger.refresh();
    },
    { dependencies: [pathname], revertOnUpdate: true },
  );

  return <span className="acb-scroll-progress" aria-hidden="true" />;
}
