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
  // Mantenemos las opciones ajustadas del IntersectionObserver
  const isInView = useInView(ref, { once, rootMargin: '0px', threshold: 0.1 });

  // Clases base para la transición
  const baseTransitionClasses = 'transition-all duration-600 ease-out';

  // Clases para el estado inicial (invisible, y movido si es slide-up)
  const initialClasses = cn(
    'opacity-0',
    animation === 'slide-up' && 'translate-y-[30px]' // Empieza 30px más abajo
  );

  // Clases para el estado final (visible, en posición original)
  const finalClasses = 'opacity-100 translate-y-0';

  return (
    <Component
      ref={ref}
      className={cn(
        baseTransitionClasses, // Aplica siempre las propiedades de transición
        initialClasses,        // Aplica siempre el estado inicial
        isInView && finalClasses, // Aplica el estado final SOLO cuando está en vista
        className
      )}
      style={{
        transitionDelay: `${delay}s`, // Usa transition-delay para el escalonamiento
        ...style, // Permite estilos adicionales
      }}
    >
      {children}
    </Component>
  );
}