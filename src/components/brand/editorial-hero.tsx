import Image from "next/image";

import { AlfordBadge } from "@/components/brand/alford-badge";
import { BrandActions } from "@/components/brand/brand-actions";

type EditorialHeroProps = {
  eyebrow: string;
  title: React.ReactNode;
  subheadline: string;
  intro: React.ReactNode;
  image: string;
  imageAlt: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref: string;
  secondaryLabel: string;
  imagePosition?: string;
};

export function EditorialHero({
  eyebrow,
  title,
  subheadline,
  intro,
  image,
  imageAlt,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
  imagePosition = "object-center",
}: EditorialHeroProps) {
  return (
    <section className="acb-hero">
      <div className="acb-hero__copy">
        <p className="acb-kicker">{eyebrow}</p>
        <h1 className="acb-display">{title}</h1>
        <p className="acb-subheadline">{subheadline}</p>
        <div className="acb-intro">{intro}</div>
        <BrandActions
          primaryHref={primaryHref}
          primaryLabel={primaryLabel}
          secondaryHref={secondaryHref}
          secondaryLabel={secondaryLabel}
        />
      </div>
      <div className="acb-hero__media">
        <Image
          src={image}
          alt={imageAlt}
          fill
          priority
          className={`object-cover ${imagePosition}`}
          sizes="(min-width: 1024px) 46vw, 100vw"
        />
        <AlfordBadge />
        <p className="acb-hero__caption">Luxury · Personalized</p>
      </div>
    </section>
  );
}
