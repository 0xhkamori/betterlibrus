import React from "react";
import { cn } from "@/lib/utils";
import { typography, createTypographyClass } from "@/lib/typography";

interface TypographyProps {
  variant?: 
    | "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
    | "large" | "base" | "small" | "xs"
    | "caption" | "code" | "label" | "muted" | "lead";
  weight?: "light" | "normal" | "medium" | "semibold" | "bold" | "extrabold";
  className?: string;
  children: React.ReactNode;
  as?: keyof JSX.IntrinsicElements;
}

export const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ variant = "base", weight, className, children, as, ...props }, ref) => {
    // Determine the appropriate HTML element based on variant
    const getDefaultElement = (): keyof JSX.IntrinsicElements => {
      if (variant.startsWith("h")) return variant as keyof JSX.IntrinsicElements;
      if (variant === "code") return "code";
      if (variant === "label") return "label";
      if (variant === "caption") return "span";
      return "p";
    };

    const Component = as || getDefaultElement();
    const typographyClass = createTypographyClass(variant, weight, className);

    return React.createElement(
      Component,
      {
        ref,
        className: typographyClass,
        ...props,
      },
      children
    );
  }
);

Typography.displayName = "Typography";

// Specific typography components for convenience
export const Heading1 = ({ className, children, ...props }: Omit<TypographyProps, "variant">) => (
  <Typography variant="h1" className={className} {...props}>
    {children}
  </Typography>
);

export const Heading2 = ({ className, children, ...props }: Omit<TypographyProps, "variant">) => (
  <Typography variant="h2" className={className} {...props}>
    {children}
  </Typography>
);

export const Heading3 = ({ className, children, ...props }: Omit<TypographyProps, "variant">) => (
  <Typography variant="h3" className={className} {...props}>
    {children}
  </Typography>
);

export const Heading4 = ({ className, children, ...props }: Omit<TypographyProps, "variant">) => (
  <Typography variant="h4" className={className} {...props}>
    {children}
  </Typography>
);

export const BodyText = ({ className, children, ...props }: Omit<TypographyProps, "variant">) => (
  <Typography variant="base" className={className} {...props}>
    {children}
  </Typography>
);

export const SmallText = ({ className, children, ...props }: Omit<TypographyProps, "variant">) => (
  <Typography variant="small" className={className} {...props}>
    {children}
  </Typography>
);

export const MutedText = ({ className, children, ...props }: Omit<TypographyProps, "variant">) => (
  <Typography variant="muted" className={className} {...props}>
    {children}
  </Typography>
);

export const CodeText = ({ className, children, ...props }: Omit<TypographyProps, "variant">) => (
  <Typography variant="code" className={className} {...props}>
    {children}
  </Typography>
);
