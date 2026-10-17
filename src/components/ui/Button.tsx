import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { isRouteLive } from "../../lib/siteConfig";
import { cn } from "../../lib/utils";

type Variant = "primary" | "secondary" | "text";
type Size = "md" | "lg";

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

type LinkButtonProps = CommonProps &
  { href: string } & Omit<ComponentPropsWithoutRef<"a">, "href" | "className" | "children">;

type NativeButtonProps = CommonProps &
  { href?: undefined } & Omit<ComponentPropsWithoutRef<"button">, "className" | "children">;

export type ButtonProps = LinkButtonProps | NativeButtonProps;

const variantClasses: Record<Variant, string> = {
  primary: "rounded-control border border-ink bg-ink text-paper hover:border-teal hover:bg-teal",
  secondary: "rounded-control border border-line bg-paper text-ink hover:border-ink",
  text: "text-teal underline decoration-1 underline-offset-4 hover:decoration-2",
};

const boxSizes: Record<Size, string> = {
  md: "min-h-11 px-5 text-[15px]",
  lg: "min-h-12 px-6 text-[17px]",
};

const textSizes: Record<Size, string> = {
  md: "text-[15px]",
  lg: "text-[17px]",
};

const EXTERNAL = /^(https?:|mailto:|tel:)/;

/**
 * Primary, secondary or text-link action. Renders a link when given `href`, otherwise a button.
 * An internal `href` whose route is not live yet (siteConfig.routeLive) renders as inactive text, never a dead link.
 */
export function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", className, children, ...rest } = props;
  const classes = cn(
    "inline-flex items-center justify-center gap-2 font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50",
    variantClasses[variant],
    variant === "text" ? textSizes[size] : boxSizes[size],
    className,
  );

  if (rest.href !== undefined) {
    const { href, ...anchorProps } = rest as Omit<LinkButtonProps, keyof CommonProps>;
    if (!EXTERNAL.test(href) && !href.startsWith("#") && !isRouteLive(href)) {
      return (
        <span aria-disabled="true" className={cn(classes, "pointer-events-none opacity-60")}>
          {children}
        </span>
      );
    }
    if (EXTERNAL.test(href)) {
      return (
        <a href={href} className={classes} {...anchorProps}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...anchorProps}>
        {children}
      </Link>
    );
  }

  const { type = "button", ...buttonProps } = rest as Omit<NativeButtonProps, keyof CommonProps>;
  return (
    <button type={type} className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
