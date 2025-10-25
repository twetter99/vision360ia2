'use client';

import { useState, useEffect, RefObject } from 'react';

interface IntersectionObserverOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
  once?: boolean;
}

export function useInView(
  ref: RefObject<Element>,
  options: IntersectionObserverOptions = {}
): boolean {
  const [isInView, setIsInView] = useState(false);
  const { root = null, rootMargin = '0px 0px -20% 0px', threshold = 0.25, once = true } = options;

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (once) {
            observer.unobserve(element);
          }
        } else {
          if (!once) {
            setIsInView(false);
          }
        }
      },
      { root, rootMargin, threshold }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [ref, root, rootMargin, threshold, once]);

  return isInView;
}
