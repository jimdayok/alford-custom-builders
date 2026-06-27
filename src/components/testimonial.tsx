type TestimonialProps = {
  quote: string;
  name: string;
  context: string;
};

export function Testimonial({ quote, name, context }: TestimonialProps) {
  return (
    <article className="rounded-[1.75rem] border border-white/10 bg-white/6 p-7 backdrop-blur-sm">
      <p className="font-serif text-2xl leading-10 text-white">“{quote}”</p>
      <div className="mt-6">
        <p className="text-sm font-semibold tracking-[0.18em] uppercase text-[var(--color-sand)]">
          {name}
        </p>
        <p className="mt-2 text-sm text-white/70">{context}</p>
      </div>
    </article>
  );
}
