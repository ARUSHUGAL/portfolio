import type { ReactNode } from 'react';
import { AnimatedReveal } from './AnimatedReveal';

interface SectionProps {
  id: string;
  /** Two-digit section index rendered as a muted mono label, e.g. "01". */
  index?: string;
  /** Short section label shown next to the index, e.g. "About". */
  eyebrow?: string;
  /** Small Japanese gloss shown beside the label, e.g. "概要". */
  kana?: string;
  title: string;
  intro?: string;
  children: ReactNode;
  className?: string;
}

/**
 * Semantic <section> landmark with an editorial heading block:
 * a muted monospace index/eyebrow ("01 — About") above a left-aligned title.
 * Sections are separated by generous whitespace and a top hairline rule.
 */
export function Section({
  id,
  index,
  eyebrow,
  kana,
  title,
  intro,
  children,
  className = '',
}: SectionProps) {
  const headingId = `${id}-heading`;
  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={`py-24 sm:py-28 lg:py-32 ${className}`}
    >
      <div className="section-shell">
        <div className="ink-rule mb-14 sm:mb-16" aria-hidden="true" />
        <AnimatedReveal className="max-w-3xl">
          {(index || eyebrow) && (
            <p className="mono-label mb-5 flex items-center gap-3">
              {index && (
                <span
                  className="diary-card sketch inline-flex h-9 w-9 items-center justify-center rounded-full border-2 border-shu/70 bg-transparent text-shu dark:border-shu/70"
                  style={{ borderRadius: '50% 48% 52% 50% / 50% 52% 48% 50%' }}
                >
                  {index}
                </span>
              )}
              {eyebrow && <span>{eyebrow}</span>}
              {kana && (
                <span className="ml-1 font-sans text-ink-muted/70 dark:text-white/40">
                  {kana}
                </span>
              )}
            </p>
          )}
          <h2
            id={headingId}
            className="text-headline font-semibold text-ink dark:text-white"
          >
            {title}
          </h2>
          {intro && (
            <p className="mt-6 text-lg leading-relaxed text-ink-soft dark:text-white/65">
              {intro}
            </p>
          )}
        </AnimatedReveal>
        <div className="mt-14 sm:mt-16">{children}</div>
      </div>
    </section>
  );
}
