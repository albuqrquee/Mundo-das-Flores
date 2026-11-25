import { ReactNode, useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';

interface ParallaxMediaProps {
  children: ReactNode;
  offset?: number;
  className?: string;
}

export function ParallaxMedia({
  children,
  offset = 18,
  className = '',
}: ParallaxMediaProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [isMobileViewport, setIsMobileViewport] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)');
    const updateMatch = () => setIsMobileViewport(mediaQuery.matches);
    updateMatch();

    mediaQuery.addEventListener('change', updateMatch);
    return () => mediaQuery.removeEventListener('change', updateMatch);
  }, []);

  const effectiveOffset = prefersReducedMotion
    ? 0
    : isMobileViewport
      ? Math.round(offset * 0.4)
      : offset;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const rawY = useTransform(scrollYProgress, [0, 1], [-effectiveOffset, effectiveOffset]);
  const smoothY = useSpring(rawY, { stiffness: 150, damping: 26, mass: 0.35 });

  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`}>
      <motion.div
        style={effectiveOffset === 0 ? undefined : { y: smoothY }}
        className={
          effectiveOffset === 0
            ? 'w-full h-full'
            : 'absolute -inset-y-[9%] inset-x-0 will-change-transform'
        }
      >
        {children}
      </motion.div>
    </div>
  );
}
