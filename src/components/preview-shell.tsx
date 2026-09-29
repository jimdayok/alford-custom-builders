"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

type PreviewShellProps = {
  children: ReactNode;
  header: ReactNode;
  footer: ReactNode;
};

export function PreviewShell({ children, header, footer }: PreviewShellProps) {
  const isLanding = ["/", "/coming-soon"].includes(usePathname());

  return (
    <div className={isLanding ? "min-h-screen" : "site-bg min-h-screen"}>
      {isLanding ? null : header}
      <main>{children}</main>
      {isLanding ? null : footer}
    </div>
  );
}
