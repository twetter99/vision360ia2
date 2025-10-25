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
}

export function AnimatedSection({
  children,
  className,
  as: Component = 'section',
  animation = 'fade-in',
  delay = 0,
  once = true,
}: AnimatedSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once, rootMargin: '0px 0px -20% 0px', threshold: 0.25 });

  const animationClass = {
    'fade-in': 'animate-fade-in',
    'slide-up': 'animate-slide-up',
  }[animation];

  return (
    <Component
      ref={ref}
      className={cn(
        'opacity-0', // Always start as invisible
        isInView && animationClass, // Apply animation class when in view
        className
      )}
      style={{
        animationDelay: `${delay}s`,
      }}
    >
      {children}
    </Component>
  );
}
