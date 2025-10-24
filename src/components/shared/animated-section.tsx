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
  const isInView = useInView(ref, { once, rootMargin: '0px 0px -100px 0px' });

  const animationClass = {
    'fade-in': 'animate-fade-in',
    'slide-up': 'animate-slide-up',
  }[animation];

  return (
    <Component
      ref={ref}
      className={cn(
        'transition-opacity duration-500',
        isInView ? 'opacity-100' : 'opacity-0',
        className
      )}
      style={{
        animation: isInView ? `${animation} 0.6s ease-out forwards` : 'none',
        animationDelay: `${delay}s`,
        opacity: 0, 
      }}
    >
      {children}
    </Component>
  );
}
