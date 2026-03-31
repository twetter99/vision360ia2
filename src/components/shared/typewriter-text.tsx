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

  // Find the longest line for reserving height
  const longestLine = lines.reduce((a, b) => (a.length > b.length ? a : b), '');

  return (
    <div className={`relative ${className}`} style={style}>
      <span className="invisible block" aria-hidden="true">{longestLine}</span>
      <span className={`absolute inset-0 flex items-center ${contentClassName}`}>
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
