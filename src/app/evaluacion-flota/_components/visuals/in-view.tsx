"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Activa las animaciones CSS de sus hijos ([data-a]) solo mientras están en
 * pantalla: en móvil no se gasta batería animando lo que no se ve.
 * Con `once`, la animación se reproduce una vez al llegar y se queda en su
 * estado final. Las reglas viven en landing.css (.ef-anim).
 */
export function InView({
  children,
  className,
  once = false,
  threshold = 0.3,
}: {
  children: ReactNode;
  className?: string;
  once?: boolean;
  threshold?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [once, threshold]);

  return (
    <div ref={ref} data-inview={inView ? "true" : "false"} className={cn("ef-anim", className)}>
      {children}
    </div>
  );
}
