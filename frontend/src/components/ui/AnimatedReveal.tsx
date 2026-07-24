import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface AnimatedRevealProps {
  children: ReactNode;
  className?: string;
  /** Optional delay in seconds. Kept minimal; large staggers are discouraged. */
  delay?: number;
  /** Vertical translate distance in px before reveal. Defaults to a barely-there 8px. */
  y?: number;
  as?: 'div' | 'li' | 'article' | 'section';
}

/**
 * Quiet, near-imperceptible fade-in on viewport entry.
 * Opacity 0->1 with at most an 8px lift, ~0.4s. Respects prefers-reduced-motion.
 */
export function AnimatedReveal({
  children,
  className,
  delay = 0,
  y = 8,
  as = 'div',
}: AnimatedRevealProps) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as];

  if (reduced) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.4, delay, ease: 'easeOut' }}
    >
      {children}
    </MotionTag>
  );
}
