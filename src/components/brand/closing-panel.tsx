import Image from "next/image";

import { BrandActions } from "@/components/brand/brand-actions";

type ClosingPanelProps = {
  eyebrow?: string;
  title: string;
  subheadline: string;
  intro: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref: string;
  secondaryLabel: string;
};

export function ClosingPanel({
  eyebrow = "Begin Here",
  title,
  subheadline,
  intro,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
}: ClosingPanelProps) {
  return (
    <section className="acb-closing-wrap">
      <div className="acb-closing">
        <Image
          src="/brand/web/icon-organic.svg"
          alt=""
          width={280}
          height={280}
          className="acb-closing__mark"
        />
        <div className="relative z-10 max-w-4xl">
          <p className="acb-kicker">{eyebrow}</p>
          <h2 className="acb-heading mt-6">{title}</h2>
          <p className="acb-section-lede mt-7">{subheadline}</p>
          <p className="acb-body mt-6 max-w-2xl">{intro}</p>
          <BrandActions
            primaryHref={primaryHref}
            primaryLabel={primaryLabel}
            secondaryHref={secondaryHref}
            secondaryLabel={secondaryLabel}
          />
        </div>
      </div>
    </section>
  );
}
