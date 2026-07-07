import Link from "next/link";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
};

const variants = {
  primary:
    "bg-[var(--color-navy)] !text-white shadow-[0_18px_40px_rgba(18,38,58,0.2)] hover:-translate-y-0.5 hover:bg-[var(--color-charcoal)]",
  secondary:
    "bg-[var(--color-sand)] !text-[var(--color-charcoal)] shadow-[0_18px_40px_rgba(151,117,76,0.22)] hover:-translate-y-0.5 hover:bg-[#e7cfb0]",
  ghost:
    "border border-[var(--color-border)] bg-[rgba(255,255,255,0.78)] !text-[var(--color-charcoal)] hover:-translate-y-0.5 hover:border-[var(--color-navy)] hover:!text-[var(--color-navy)]",
};

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
}: ButtonProps) {
  return (
    <Link
      href={href}
      className={`inline-flex min-h-12 items-center justify-center rounded-[0.95rem] px-6 py-3 text-xs font-semibold tracking-[0.24em] uppercase transition duration-300 ${variants[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
