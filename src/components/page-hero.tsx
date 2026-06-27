type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <section className="px-5 pb-12 pt-10 sm:px-6 lg:px-8 lg:pt-14">
      <div className="mx-auto max-w-5xl rounded-[2rem] border border-[var(--color-border)] bg-white px-7 py-14 shadow-[0_24px_80px_rgba(15,24,34,0.08)] sm:px-10 lg:px-14">
        <p className="text-xs font-semibold tracking-[0.34em] uppercase text-[var(--color-wood)]">
          {eyebrow}
        </p>
        <h1 className="mt-5 max-w-4xl font-serif text-5xl leading-tight text-[var(--color-charcoal)] sm:text-6xl">
          {title}
        </h1>
        <p className="mt-6 max-w-3xl text-base leading-8 text-[var(--color-muted)] sm:text-lg">
          {description}
        </p>
      </div>
    </section>
  );
}
