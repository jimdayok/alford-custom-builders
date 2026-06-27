import { Button } from "@/components/button";

type CtaProps = {
  title: string;
  description: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref?: string;
  secondaryLabel?: string;
};

export function CTA({
  title,
  description,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
}: CtaProps) {
  return (
    <section className="rounded-[2rem] bg-[linear-gradient(135deg,rgba(18,38,58,0.96),rgba(27,33,42,0.96))] px-7 py-14 text-white shadow-[0_24px_80px_rgba(10,16,24,0.22)] sm:px-10 lg:px-14">
      <div className="max-w-3xl">
        <p className="text-xs font-semibold tracking-[0.32em] uppercase text-[var(--color-sand)]">
          Start The Conversation
        </p>
        <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">
          {title}
        </h2>
        <p className="mt-5 max-w-2xl text-base leading-8 text-white/75">
          {description}
        </p>
      </div>
      <div className="mt-8 flex flex-col gap-4 sm:flex-row">
        <Button href={primaryHref}>{primaryLabel}</Button>
        {secondaryHref && secondaryLabel ? (
          <Button href={secondaryHref} variant="ghost">
            {secondaryLabel}
          </Button>
        ) : null}
      </div>
    </section>
  );
}
