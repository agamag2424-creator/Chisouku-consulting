import * as React from "react";
import Link from "next/link";
import { cn } from "../../lib/utils";

type GlowButtonVariant = "primary" | "secondary" | "ghost";
type GlowButtonSize = "sm" | "md" | "lg";

type GlowButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: GlowButtonVariant;
  size?: GlowButtonSize;
  className?: string;
  pulsing?: boolean;
};

const baseClasses =
  "inline-flex items-center justify-center rounded-full uppercase tracking-[0.13em] font-semibold transition-transform transition-shadow transition-colors duration-200";

const variantClasses: Record<GlowButtonVariant, string> = {
  primary:
    "bg-[var(--color-cyan)] text-[var(--color-void)] hover:-translate-y-[2px] hover:shadow-[0_0_36px_var(--color-cyan-glow)]",
  secondary:
    "border border-[var(--color-border-light)] text-[var(--color-cyan)] bg-transparent hover:border-[var(--color-cyan-dim)]",
  ghost:
    "bg-transparent text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]",
};

const sizeClasses: Record<GlowButtonSize, string> = {
  sm: "px-[22px] py-[9px] text-[10px]",
  md: "px-[34px] py-[15px] text-[12px]",
  lg: "px-[48px] py-[18px] text-[13px]",
};

export function GlowButton({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
  pulsing,
}: GlowButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        pulsing && "glow-button-pulsing",
        className,
      )}
    >
      {children}
    </Link>
  );
}

