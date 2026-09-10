import Image from "next/image";

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
        <div className="acb-hero__media-mark" aria-hidden="true">
          <Image
            className="acb-hero__media-mark-icon"
            src="/brand/web/icon-apricot.svg"
            alt=""
            width={92}
            height={92}
          />
          <svg
            className="acb-hero__media-mark-light"
            viewBox="0 0 288 288"
            focusable="false"
            aria-hidden="true"
          >
            <defs>
              <filter id="acb-mark-glow" x="-180%" y="-180%" width="460%" height="460%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <path
              data-logo-trace
              className="acb-hero__media-mark-trace"
              d="M207 244 C188 259 169 266 148 266 C104 266 70 247 57 212 C43 176 55 138 84 114 C110 93 151 88 184 95 C198 98 208 103 217 110"
            />
            <g data-logo-light className="acb-hero__media-mark-point">
              <circle r="8" fill="rgba(255, 231, 182, 0.24)" />
              <circle r="3.2" fill="#fff4dc" />
              <circle r="1.2" fill="#ffffff" />
            </g>
          </svg>
          <span data-logo-bloom className="acb-hero__media-mark-bloom" />
        </div>
        <p className="acb-hero__caption">Luxury · Personalized</p>
      </div>
    </section>
  );
}
