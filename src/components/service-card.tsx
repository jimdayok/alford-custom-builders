type ServiceCardProps = {
  title: string;
  description: string;
};

export function ServiceCard({ title, description }: ServiceCardProps) {
  return (
    <article className="rounded-[1.75rem] border border-[var(--color-border)] bg-[var(--color-surface)] p-7 shadow-[0_18px_60px_rgba(20,26,35,0.06)] transition duration-300 hover:-translate-y-1">
      <div className="mb-5 h-px w-14 bg-[var(--color-wood)]" />
      <h3 className="font-serif text-2xl text-[var(--color-charcoal)]">
        {title}
      </h3>
      <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">
        {description}
      </p>
    </article>
  );
}
