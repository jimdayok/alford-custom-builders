"use client";

import { useRef } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(useGSAP);

function playWhenVisible(root: HTMLElement, timeline: gsap.core.Timeline) {
  if (
    typeof IntersectionObserver === "undefined" ||
    root.getBoundingClientRect().top <= window.innerHeight * 0.92
  ) {
    timeline.play(0);
    return undefined;
  }

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry?.isIntersecting) return;
      observer.disconnect();
      timeline.play(0);
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.1 },
  );

  observer.observe(root);
  return () => observer.disconnect();
}

export function AlfordBadge() {
  const rootRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useGSAP(
    () => {
      const root = rootRef.current;
      const stage = root?.querySelector<HTMLElement>("[data-badge-stage]");

      if (!root || !stage) return;

      if (prefersReducedMotion()) {
        root.dataset.motionState = "complete";
        return;
      }

      root.dataset.motionState = "running";

      gsap.set(stage, {
        xPercent: 160,
        boxShadow: "0 0 0 0 rgba(215, 139, 49, 0)",
        filter: "brightness(1)",
        force3D: true,
      });

      const finish = () => {
        root.dataset.motionState = "complete";
        gsap.set(stage, { clearProps: "transform,filter,boxShadow" });
      };

      const timeline = gsap.timeline({
        paused: true,
        delay: 1,
        onComplete: finish,
      });

      timeline
        .to(stage, {
          xPercent: 0,
          duration: 2,
          ease: "power4.out",
        })
        .to(stage, {
          boxShadow:
            "0 0 0 1px rgba(215, 139, 49, 0.2), 0 0 22px rgba(215, 139, 49, 0.18)",
          filter: "brightness(1.06)",
          duration: 0.55,
          ease: "sine.inOut",
        })
        .to(stage, {
          boxShadow: "0 0 0 0 rgba(215, 139, 49, 0)",
          filter: "brightness(1)",
          duration: 0.95,
          ease: "sine.inOut",
        });

      return playWhenVisible(root, timeline);
    },
    { scope: rootRef, dependencies: [pathname], revertOnUpdate: true },
  );

  return (
    <div
      ref={rootRef}
      className="acb-hero__media-mark acb-badge"
      data-badge-motion
      data-motion-state="pending"
      aria-hidden="true"
    >
      <Image
        className="acb-badge__final-mark"
        src="/brand/web/icon-apricot.svg"
        alt=""
        width={92}
        height={92}
        priority
      />

      <div className="acb-badge__stage" data-badge-stage>
        <span className="acb-badge__field" />
        <Image
          className="acb-badge__animated-mark"
          src="/brand/web/icon-apricot.svg"
          alt=""
          width={92}
          height={92}
          priority
        />
      </div>
    </div>
  );
}
