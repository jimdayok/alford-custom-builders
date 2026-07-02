import Image from "next/image";

type ProjectCardProps = {
  title: string;
  category: string;
  description: string;
  image: string;
};

export function ProjectCard({
  title,
  category,
  description,
  image,
}: ProjectCardProps) {
  return (
    <article className="group overflow-hidden rounded-[2rem] border border-[var(--color-border)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(248,244,237,0.94))] shadow-[0_22px_80px_rgba(16,24,32,0.08)] transition duration-300 hover:-translate-y-1">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition duration-700 group-hover:scale-[1.03]"
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
        />
      </div>
      <div className="space-y-4 p-7">
        <p className="text-xs font-semibold tracking-[0.28em] uppercase text-[var(--color-wood)]">
          {category}
        </p>
        <h3 className="font-serif text-3xl text-[var(--color-charcoal)]">
          {title}
        </h3>
        <p className="text-sm leading-7 text-[var(--color-muted)]">
          {description}
        </p>
      </div>
    </article>
  );
}
