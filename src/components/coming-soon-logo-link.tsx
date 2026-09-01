"use client";

import type { MouseEvent, ReactNode } from "react";
import { useRef } from "react";

const previewSiteUrl = "https://preview.alfordcustombuilders.com";

type ComingSoonLogoLinkProps = {
  children: ReactNode;
  className?: string;
};

export function ComingSoonLogoLink({ children, className }: ComingSoonLogoLinkProps) {
  const clickCount = useRef(0);

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    clickCount.current += 1;

    if (clickCount.current === 5) {
      event.preventDefault();
      clickCount.current = 0;
      window.location.assign(previewSiteUrl);
    }
  }

  return (
    <a
      href="#the-home"
      aria-label="Alford Custom Builders home"
      className={className}
      onClick={handleClick}
    >
      {children}
    </a>
  );
}
