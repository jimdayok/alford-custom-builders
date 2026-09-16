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
    let targetProgress = 0;
    let currentProgress = 0;
    let lastFrameTime = 0;

    const readProgress = () => {
      const stickyTop = 40;
      const rect = section.getBoundingClientRect();
      const scrollDistance = Math.max(1, section.offsetHeight - stage.offsetHeight);
      return clamp((stickyTop - rect.top) / scrollDistance);
    };

    const paint = (progress: number) => {
      const houseMove = range(progress, 0.02, 1);
      const logoPassThrough = range(progress, 0.05, 0.82);
      const logoFade = 1 - range(progress, 0.62, 0.82);

      stage.style.setProperty("--home-scale", String(1 + houseMove * 0.58));
      stage.style.setProperty("--mark-opacity", String(logoFade));
      stage.style.setProperty("--mark-scale", String(0.82 + logoPassThrough * 11.5));
      markLink.style.pointerEvents = progress > 0.78 ? "none" : "auto";
    };

    const paintReducedMotion = () => {
      stage.style.setProperty("--home-scale", "1.05");
      stage.style.setProperty("--mark-opacity", "1");
      stage.style.setProperty("--mark-scale", "1");
      markLink.style.pointerEvents = "auto";
    };

    const render = (frameTime: number) => {
      animationFrame = 0;

      if (reducedMotion.matches) {
        paintReducedMotion();
        lastFrameTime = 0;
        return;
      }

      const elapsed = lastFrameTime ? Math.min(64, frameTime - lastFrameTime) : 16;
      lastFrameTime = frameTime;
      const smoothing = 1 - Math.exp(-elapsed / 115);
      currentProgress += (targetProgress - currentProgress) * smoothing;

      if (Math.abs(targetProgress - currentProgress) < 0.0001) {
        currentProgress = targetProgress;
      }

      paint(currentProgress);

      if (currentProgress !== targetProgress) {
        animationFrame = window.requestAnimationFrame(render);
      } else {
        lastFrameTime = 0;
      }
    };

    const queueRender = (jumpToProgress = false) => {
      targetProgress = readProgress();
      if (jumpToProgress) {
        currentProgress = targetProgress;
        if (reducedMotion.matches) paintReducedMotion();
        else paint(currentProgress);
        return;
      }
      if (!animationFrame) animationFrame = window.requestAnimationFrame(render);
    };

    queueRender(true);
    const handleScroll = () => queueRender();
    const handleResize = () => queueRender(true);
    const handleMotionPreference = () => queueRender(true);

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);
    reducedMotion.addEventListener("change", handleMotionPreference);

    return () => {
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      reducedMotion.removeEventListener("change", handleMotionPreference);
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
            className="acb-v2-home__image"
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
