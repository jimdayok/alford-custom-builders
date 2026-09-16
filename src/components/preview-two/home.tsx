"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef } from "react";
import Image from "next/image";

import { PreviewLogoLink } from "@/components/preview-logo-link";

const clamp = (value: number, minimum = 0, maximum = 1) =>
  Math.min(maximum, Math.max(minimum, value));

const easeInOut = (value: number) => {
  const bounded = clamp(value);
  return bounded * bounded * (3 - 2 * bounded);
};

const range = (progress: number, start: number, end: number) =>
  easeInOut((progress - start) / (end - start));

const canvasStyle: CSSProperties = {
  position: "relative",
  width: "100%",
  height: "100%",
  overflow: "hidden",
  isolation: "isolate",
};

export function PreviewTwoHome() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    const mark = markRef.current;
    if (!section || !stage || !mark) return;
    const markLink = mark.querySelector<HTMLAnchorElement>(".acb-v2-home__mark");
    if (!markLink) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let animationFrame = 0;

    const render = () => {
      animationFrame = 0;

      if (reducedMotion.matches) {
        stage.style.setProperty("--wide-opacity", "0");
        stage.style.setProperty("--wide-scale", "1");
        stage.style.setProperty("--close-opacity", "1");
        stage.style.setProperty("--close-scale", "1.05");
        stage.style.setProperty("--mark-opacity", "1");
        stage.style.setProperty("--mark-scale", "1");
        markLink.style.pointerEvents = "auto";
        return;
      }

      const stickyTop = 40;
      const rect = section.getBoundingClientRect();
      const scrollDistance = Math.max(1, section.offsetHeight - stage.offsetHeight);
      const progress = clamp((stickyTop - rect.top) / scrollDistance);
      const imageTransition = range(progress, 0.25, 0.58);
      const logoPassThrough = range(progress, 0.05, 0.82);
      const logoFade = 1 - range(progress, 0.62, 0.82);

      stage.style.setProperty("--wide-opacity", String(1 - imageTransition));
      stage.style.setProperty("--wide-scale", String(1 + progress * 0.2));
      stage.style.setProperty("--close-opacity", String(imageTransition));
      stage.style.setProperty("--close-scale", String(1.02 + progress * 0.36));
      stage.style.setProperty("--mark-opacity", String(logoFade));
      stage.style.setProperty("--mark-scale", String(0.82 + logoPassThrough * 11.5));
      markLink.style.pointerEvents = progress > 0.78 ? "none" : "auto";
    };

    const queueRender = () => {
      if (animationFrame) return;
      animationFrame = window.requestAnimationFrame(render);
    };

    render();
    window.addEventListener("scroll", queueRender, { passive: true });
    window.addEventListener("resize", queueRender);
    reducedMotion.addEventListener("change", queueRender);

    return () => {
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", queueRender);
      window.removeEventListener("resize", queueRender);
      reducedMotion.removeEventListener("change", queueRender);
    };
  }, []);

  return (
    <section ref={sectionRef} className="acb-v2-home" aria-label="Greenbrier residence entrance">
      <div ref={stageRef} className="acb-v2-home__stage">
        <div className="acb-v2-home__canvas" style={canvasStyle}>
          <Image
            src="/images/3534-greenbrier-dr-44.jpg"
            alt="Greenbrier residence by Alford Custom Builders"
            fill
            preload
            quality={75}
            className="acb-v2-home__image acb-v2-home__image--wide"
            sizes="100vw"
          />
          <Image
            src="/images/3534-greenbrier-dr-45.jpg"
            alt=""
            fill
            loading="eager"
            quality={75}
            className="acb-v2-home__image acb-v2-home__image--close"
            sizes="100vw"
          />
          <div className="acb-v2-home__veil" aria-hidden="true" />
          <div ref={markRef} className="acb-v2-home__mark-motion">
            <PreviewLogoLink previewVersion="preview2" variant="hero" />
          </div>
          <h1 className="sr-only">Alford Custom Builders</h1>
        </div>
      </div>
    </section>
  );
}
