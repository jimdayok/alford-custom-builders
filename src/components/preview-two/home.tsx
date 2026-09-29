"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
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
  const [isImageReady, setIsImageReady] = useState(false);

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
      const endingReveal = range(progress, 0.81, 0.93);
      stage.style.setProperty("--home-scale", String(1 + houseMove * 1.45));
      stage.style.setProperty("--home-pan-x", "0vw");
      stage.style.setProperty("--home-pan-y", `${houseMove * -38}vh`);
      stage.style.setProperty("--mark-opacity", String(logoFade));
      stage.style.setProperty("--mark-scale", String(0.82 + logoPassThrough * 11.5));
      stage.style.setProperty("--ending-veil-opacity", String(range(progress, 0.78, 0.9) * 0.86));
      stage.style.setProperty("--ending-content-opacity", String(endingReveal));
      stage.style.setProperty("--ending-content-y", `${(1 - endingReveal) * 28}px`);
      markLink.style.pointerEvents = progress > 0.78 ? "none" : "auto";
    };

    const paintReducedMotion = () => {
      stage.style.setProperty("--home-scale", "1.05");
      stage.style.setProperty("--home-pan-x", "0vw");
      stage.style.setProperty("--home-pan-y", "0vh");
      stage.style.setProperty("--mark-opacity", "0");
      stage.style.setProperty("--mark-scale", "1");
      stage.style.setProperty("--ending-veil-opacity", "0.62");
      stage.style.setProperty("--ending-content-opacity", "1");
      stage.style.setProperty("--ending-content-y", "0px");
      markLink.style.pointerEvents = "none";
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

    const showOpeningView = () => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      queueRender(true);
    };

    showOpeningView();
    const handleScroll = () => queueRender();
    const handleResize = () => queueRender(true);
    const handleMotionPreference = () => queueRender(true);

    window.addEventListener("pageshow", showOpeningView);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);
    reducedMotion.addEventListener("change", handleMotionPreference);

    return () => {
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("pageshow", showOpeningView);
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
            src="/images/greenbrier-hero-clean-wide.png"
            alt="Greenbrier residence by Alford Custom Builders"
            fill
            preload
            quality={75}
            className={`acb-v2-home__image${isImageReady ? " acb-v2-home__image--ready" : ""}`}
            sizes="100vw"
            onLoad={() => setIsImageReady(true)}
          />
          <div className="acb-v2-home__veil" aria-hidden="true" />
          <div ref={markRef} className="acb-v2-home__mark-motion">
            <PreviewLogoLink previewVersion="preview2" variant="hero" />
          </div>
          <div className="acb-v2-home__ending-veil" aria-hidden="true" />
          <div className="acb-v2-home__ending">
            <Image
              src="/brand/web/logo-horizontal-blanket.svg"
              alt="Alford Custom Builders"
              width={406}
              height={152}
              className="acb-v2-home__ending-logo"
            />
            <p className="acb-v2-home__ending-slogan">Luxury.<br />Personalized.</p>
          </div>
          <h1 className="sr-only">Alford Custom Builders</h1>
        </div>
      </div>
    </section>
  );
}
