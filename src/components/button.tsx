import Link from "next/link";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
};

const variants = {
  primary:
    "bg-[var(--color-navy)] text-white shadow-[0_16px_40px_rgba(18,38,58,0.18)] hover:-translate-y-0.5 hover:bg-[var(--color-charcoal)]",
  secondary:
    "bg-[var(--color-wood)] text-white shadow-[0_16px_40px_rgba(126,90,63,0.18)] hover:-translate-y-0.5 hover:bg-[#6d4c34]",
  ghost:
    "border border-[var(--color-border)] bg-white/70 text-[var(--color-charcoal)] hover:-translate-y-0.5 hover:border-[var(--color-navy)] hover:text-[var(--color-navy)]",
};

export function Button({
  href,
  children,
  variant = "primary",
}: ButtonProps) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold tracking-[0.18em] uppercase transition duration-300 ${variants[variant]}`}
    >
      {children}
    </Link>
  );
}
