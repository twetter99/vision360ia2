'use client';
import { useEffect, useState, useRef } from 'react';

interface TypewriterRotatorProps {
  lines: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseAfterType?: number;
  pauseAfterDelete?: number;
  className?: string;
  style?: React.CSSProperties;
  onCycleComplete?: () => void;
  loop?: boolean;
  contentClassName?: string;
}

export function TypewriterRotator({
  lines,
  typingSpeed = 45,
  deletingSpeed = 25,
  pauseAfterType = 2000,
  pauseAfterDelete = 400,
  className = '',
  style,
  onCycleComplete,
  loop = true,
  contentClassName = 'justify-center',
}: TypewriterRotatorProps) {
  const [lineIndex, setLineIndex] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const cycledRef = useRef(false);
  const onCycleCompleteRef = useRef(onCycleComplete);
  onCycleCompleteRef.current = onCycleComplete;

  const currentLine = lines[lineIndex] || '';

  // Calcula a-priori en SSR el contenido visible (sin animación) para que
  // el HTML inicial ya tenga una línea y el grid mida la celda correcta.

  useEffect(() => {
    if (isDone || isPaused) return;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing forward
        if (charCount < currentLine.length) {
          setCharCount(charCount + 1);
        } else {
          // Finished typing — pause before deleting
          const isLastLine = lineIndex === lines.length - 1;
          if (isLastLine && !loop) {
            setIsDone(true);
            if (!cycledRef.current) {
              cycledRef.current = true;
              onCycleCompleteRef.current?.();
            }
            return;
          }
          setIsPaused(true);
          setTimeout(() => {
            setIsPaused(false);
            setIsDeleting(true);
          }, pauseAfterType);
        }
      } else {
        // Deleting
        if (charCount > 0) {
          setCharCount(charCount - 1);
        } else {
          // Finished deleting — move to next line
          const nextIndex = (lineIndex + 1) % lines.length;
          if (nextIndex === 0) {
            if (!cycledRef.current) {
              cycledRef.current = true;
              onCycleCompleteRef.current?.();
            }
            if (!loop) {
              setIsDone(true);
              return;
            }
          }
          setIsDeleting(false);
          setIsPaused(true);
          setTimeout(() => {
            setLineIndex(nextIndex);
            setIsPaused(false);
          }, pauseAfterDelete);
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timeout);
  }, [charCount, isDeleting, isPaused, isDone, currentLine.length, lineIndex, lines.length, loop, typingSpeed, deletingSpeed, pauseAfterType, pauseAfterDelete]);

  /*
   * Reserva de espacio con CSS Grid (anti-CLS).
   *
   * Problema previo: usábamos un único <span> invisible con la línea de más
   * caracteres como referencia. Falla cuando otra línea tiene MENOS caracteres
   * pero envuelve a más líneas en el viewport actual (palabras anchas, ancho
   * de contenedor variable, font-stretch), provocando layout shift al rotar.
   *
   * Solución: meter TODAS las líneas en la misma celda de grid (col-start-1
   * row-start-1). El contenedor toma automáticamente las dimensiones de la
   * línea más grande tanto en alto como en ancho, sin importar el orden de
   * rotación ni el viewport. Solo la línea con animación es visible; el
   * resto reserva espacio invisibly.
   */
  return (
    <div
      className={`grid grid-cols-1 grid-rows-1 ${className}`}
      style={style}
    >
      {lines.map((line, i) => (
        <span
          key={`reserve-${i}`}
          aria-hidden="true"
          className="invisible col-start-1 row-start-1"
        >
          {line}
        </span>
      ))}
      {/*
       * items-start (NO items-center): cuando la frase corta de 1 línea se
       * centraría verticalmente en una celda dimensionada para 3 líneas,
       * Chrome cuenta el "salto vertical" como CLS al rotar. Alineando al
       * top todas las frases empiezan en la misma baseline superior; las
       * más largas se extienden hacia abajo sin mover su punto de anclaje.
       */}
      <span
        className={`col-start-1 row-start-1 flex items-start ${contentClassName}`}
      >
        <span>
          {currentLine.slice(0, charCount)}
          <span
            className="inline-block w-[3px] h-[0.85em] bg-current align-middle ml-[2px] animate-blink"
          />
        </span>
      </span>
    </div>
  );
}
