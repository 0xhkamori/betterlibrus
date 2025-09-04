import { cn } from "@/lib/utils";

// Typography utility classes and configurations
export const typography = {
  // Font families
  fonts: {
    sans: "font-sans", // Manrope as primary
    body: "font-body", // Inter for body text
    headline: "font-headline", // Manrope for headlines
    mono: "font-mono", // JetBrains Mono for code
  },

  // Heading styles with responsive sizing
  headings: {
    h1: "font-headline text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight",
    h2: "font-headline text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight",
    h3: "font-headline text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight",
    h4: "font-headline text-xl md:text-2xl lg:text-3xl font-semibold tracking-tight",
    h5: "font-headline text-lg md:text-xl lg:text-2xl font-medium tracking-tight",
    h6: "font-headline text-base md:text-lg lg:text-xl font-medium tracking-tight",
  },

  // Body text styles
  body: {
    large: "font-body text-lg leading-relaxed",
    base: "font-body text-base leading-normal",
    small: "font-body text-sm leading-normal",
    xs: "font-body text-xs leading-tight",
  },

  // Special text styles
  special: {
    caption: "font-body text-xs text-muted-foreground uppercase tracking-wide font-medium",
    code: "font-mono text-sm bg-muted px-1.5 py-0.5 rounded-md",
    label: "font-body text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
    muted: "font-body text-sm text-muted-foreground",
    lead: "font-body text-xl text-muted-foreground leading-relaxed",
  },

  // Weights
  weights: {
    light: "font-light",
    normal: "font-normal",
    medium: "font-medium",
    semibold: "font-semibold",
    bold: "font-bold",
    extrabold: "font-extrabold",
  },
};

// Typography component helpers
export const createTypographyClass = (
  variant: keyof typeof typography.headings | keyof typeof typography.body | keyof typeof typography.special,
  weight?: keyof typeof typography.weights,
  className?: string
) => {
  const baseClass = 
    variant in typography.headings 
      ? typography.headings[variant as keyof typeof typography.headings]
      : variant in typography.body
      ? typography.body[variant as keyof typeof typography.body]
      : typography.special[variant as keyof typeof typography.special];

  return cn(
    baseClass,
    weight && typography.weights[weight],
    className
  );
};

// Export commonly used combinations
export const headingStyles = typography.headings;
export const bodyStyles = typography.body;
export const specialStyles = typography.special;
