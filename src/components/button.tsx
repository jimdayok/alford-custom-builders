import Link from "next/link";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
};

const variants = {
  primary:
    "bg-[var(--color-navy)] text-white shadow-[0_14px_34px_rgba(18,38,58,0.14)] hover:-translate-y-0.5 hover:bg-[var(--color-charcoal)]",
  secondary:
    "bg-[var(--color-wood)] text-white shadow-[0_14px_34px_rgba(126,90,63,0.14)] hover:-translate-y-0.5 hover:bg-[#866041]",
  ghost:
    "border border-[var(--color-border)] bg-[rgba(255,255,255,0.78)] text-[var(--color-charcoal)] hover:-translate-y-0.5 hover:border-[var(--color-navy)] hover:text-[var(--color-navy)]",
};

export function Button({
  href,
  children,
  variant = "primary",
}: ButtonProps) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center rounded-[0.45rem] px-6 py-3 text-xs font-semibold tracking-[0.24em] uppercase transition duration-300 ${variants[variant]}`}
    >
      {children}
    </Link>
  );
}
