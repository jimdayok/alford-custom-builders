import Link from "next/link";

type BrandActionsProps = {
  primaryHref: string;
  primaryLabel: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  inverse?: boolean;
};

export function BrandActions({
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
  inverse = false,
}: BrandActionsProps) {
  return (
    <div className="acb-actions">
      <Link href={primaryHref} className="acb-button acb-button--primary">
        <span>{primaryLabel}</span>
        <span aria-hidden="true">↗</span>
      </Link>
      {secondaryHref && secondaryLabel ? (
        <Link
          href={secondaryHref}
          className={`acb-button acb-button--secondary${inverse ? " acb-button--inverse" : ""}`}
        >
          <span>{secondaryLabel}</span>
          <span aria-hidden="true">→</span>
        </Link>
      ) : null}
    </div>
  );
}
