// components/shared/animated-section.tsx
'use client';

import { useInView } from '@/hooks/use-in-view';
import { cn } from '@/lib/utils';
import React, { useRef } from 'react';

type AnimationType = 'fade-in' | 'slide-up';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  animation?: AnimationType;
  delay?: number;
  once?: boolean;
  style?: React.CSSProperties;
}

export function AnimatedSection({
  children,
  className,
  as: Component = 'section',
  animation = 'fade-in',
  delay = 0,
  once = true,
  style,
}: AnimatedSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once, rootMargin: '0px', threshold: 0.1 });

  const baseTransitionClasses =
    'will-change-transform transition-[opacity,transform,filter] duration-700 ease-out motion-reduce:transform-none motion-reduce:transition-none';

  const initialClasses = cn(
    'opacity-0 motion-reduce:opacity-100',
    animation === 'slide-up' && 'translate-y-8 motion-reduce:translate-y-0'
  );

  const finalClasses = 'opacity-100 translate-y-0';

  return (
    <Component
      ref={ref}
      className={cn(
        baseTransitionClasses,
        initialClasses,
        isInView && finalClasses,
        className
      )}
      style={{
        transitionDelay: `${delay}s`,
        ...style,
      }}
    >
      {children}
    </Component>
  );
}