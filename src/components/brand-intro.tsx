"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";

import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(useGSAP);

const INTRO_STORAGE_KEY = "acb-brand-intro-seen-v1";
const LIGHT_PATH =
  "M207 244 C188 259 169 266 148 266 C104 266 70 247 57 212 C43 176 55 138 84 114 C110 93 151 88 184 95 C198 98 208 103 217 110";

function hasSeenIntro() {
  try {
    return window.sessionStorage.getItem(INTRO_STORAGE_KEY) === "true";
  } catch {
    return false;
  }
}

function rememberIntro() {
  try {
    window.sessionStorage.setItem(INTRO_STORAGE_KEY, "true");
  } catch {
    // The entrance still works when storage is unavailable.
  }
}

export function BrandIntro() {
  const [isVisible, setIsVisible] = useState(true);
  const rootRef = useRef<HTMLDivElement>(null);
  const tileRef = useRef<HTMLDivElement>(null);
  const organicMarkRef = useRef<HTMLImageElement>(null);
  const apricotMarkRef = useRef<HTMLImageElement>(null);
  const traceGlowRef = useRef<SVGPathElement>(null);
  const traceCoreRef = useRef<SVGPathElement>(null);
  const lightRef = useRef<SVGGElement>(null);
  const bloomRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      const tile = tileRef.current;
      const organicMark = organicMarkRef.current;
      const apricotMark = apricotMarkRef.current;
      const traceGlow = traceGlowRef.current;
      const traceCore = traceCoreRef.current;
      const light = lightRef.current;
      const bloom = bloomRef.current;

      if (
        !root ||
        !tile ||
        !organicMark ||
        !apricotMark ||
        !traceGlow ||
        !traceCore ||
        !light ||
        !bloom
      ) {
        return;
      }

      const forceReplay = new URLSearchParams(window.location.search).get("intro") === "replay";
      if (prefersReducedMotion() || (!forceReplay && hasSeenIntro())) {
        setIsVisible(false);
        return;
      }

      rememberIntro();
      document.documentElement.classList.add("acb-intro-active");

      const totalLength = traceCore.getTotalLength();
      const travel = { progress: 0 };

      const placeLight = () => {
        const point = traceCore.getPointAtLength(totalLength * travel.progress);
        gsap.set(light, { x: point.x, y: point.y });
      };

      const finish = () => {
        document.documentElement.classList.remove("acb-intro-active");
        setIsVisible(false);
      };

      gsap.set(root, { autoAlpha: 1 });
      gsap.set([traceGlow, traceCore], {
        strokeDasharray: totalLength,
        strokeDashoffset: totalLength,
      });
      gsap.set(light, { autoAlpha: 0 });
      placeLight();

      const timeline = gsap.timeline({ onComplete: finish });
      timeline
        .fromTo(
          tile,
          { autoAlpha: 0, scale: 0.8, rotate: -1.2 },
          { autoAlpha: 1, scale: 1, rotate: 0, duration: 0.7, ease: "power4.out" },
        )
        .to(
          tile,
          {
            backgroundColor: "#40422f",
            boxShadow: "0 32px 110px rgba(35, 31, 32, 0.24)",
            duration: 0.75,
            ease: "power2.inOut",
          },
          0.38,
        )
        .to(organicMark, { autoAlpha: 0, duration: 0.45, ease: "power2.inOut" }, 0.48)
        .to(apricotMark, { autoAlpha: 1, duration: 0.55, ease: "power2.inOut" }, 0.55)
        .to(light, { autoAlpha: 1, duration: 0.18 }, 0.72)
        .to(
          [traceGlow, traceCore],
          { strokeDashoffset: 0, duration: 1.28, ease: "power2.inOut" },
          0.72,
        )
        .to(
          travel,
          {
            progress: 1,
            duration: 1.28,
            ease: "power2.inOut",
            onUpdate: placeLight,
          },
          0.72,
        )
        .to(light, { scale: 1.7, transformOrigin: "center", duration: 0.2 }, 1.82)
        .fromTo(
          bloom,
          { autoAlpha: 0, scale: 0.2 },
          { autoAlpha: 0.95, scale: 1, duration: 0.35, ease: "power2.out" },
          1.83,
        )
        .to(
          bloom,
          { autoAlpha: 0, scale: 30, duration: 0.75, ease: "power3.out" },
          2.02,
        )
        .to([traceGlow, traceCore, light], { autoAlpha: 0, duration: 0.35 }, 2.03)
        .to(tile, { scale: 1.035, duration: 0.65, ease: "power2.out" }, 2.02)
        .to(root, { autoAlpha: 0, duration: 0.65, ease: "power2.inOut" }, 2.35);

      const skip = () => {
        timeline.progress(1);
      };
      const skipOnKey = (event: KeyboardEvent) => {
        if (event.key === "Escape" || event.key === "Enter" || event.key === " ") skip();
      };

      root.addEventListener("pointerup", skip);
      document.addEventListener("keydown", skipOnKey);

      return () => {
        root.removeEventListener("pointerup", skip);
        document.removeEventListener("keydown", skipOnKey);
        document.documentElement.classList.remove("acb-intro-active");
      };
    },
    { scope: rootRef },
  );

  if (!isVisible) return null;

  return (
    <div ref={rootRef} className="acb-brand-intro" aria-hidden="true">
      <div className="acb-brand-intro__wash" />
      <div ref={tileRef} className="acb-brand-intro__tile">
        <Image
          ref={organicMarkRef}
          className="acb-brand-intro__mark acb-brand-intro__mark--organic"
          src="/brand/web/icon-organic.svg"
          alt=""
          width={288}
          height={288}
          priority
        />
        <Image
          ref={apricotMarkRef}
          className="acb-brand-intro__mark acb-brand-intro__mark--apricot"
          src="/brand/web/icon-apricot.svg"
          alt=""
          width={288}
          height={288}
          priority
        />

        <svg
          className="acb-brand-intro__light"
          viewBox="0 0 288 288"
          focusable="false"
          aria-hidden="true"
        >
          <defs>
            <filter id="acb-intro-soft-glow" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="7" />
            </filter>
            <filter id="acb-intro-point-glow" x="-300%" y="-300%" width="700%" height="700%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <path
            ref={traceGlowRef}
            className="acb-brand-intro__trace acb-brand-intro__trace--glow"
            d={LIGHT_PATH}
          />
          <path
            ref={traceCoreRef}
            className="acb-brand-intro__trace acb-brand-intro__trace--core"
            d={LIGHT_PATH}
          />
          <g ref={lightRef} className="acb-brand-intro__point">
            <circle r="13" fill="rgba(255, 239, 204, 0.28)" />
            <circle r="6" fill="#ffe7b6" />
            <circle r="2.2" fill="#ffffff" />
          </g>
        </svg>

        <span ref={bloomRef} className="acb-brand-intro__bloom" />
      </div>
      <span className="acb-brand-intro__hint">Click or press a key to skip</span>
    </div>
  );
}
