import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SectionProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export function Section({ title, children, className }: SectionProps) {
  return (
    <section className={cn('w-full', className)}>
      <h2 className="px-4 md:px-0 mb-4 text-lg font-medium tracking-tight text-muted-foreground">{title}</h2>
      {children}
    </section>
  );
}
