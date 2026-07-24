import { motion } from 'framer-motion';
import { content } from '../../data/content';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { GitHubIcon, LinkedInIcon } from '../ui/icons';

export function Hero() {
  const { about } = content;
  const reduced = useReducedMotion();

  // A single quiet fade of the whole block — no stagger, no translate.
  const reveal = reduced
    ? {}
    : {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.5, ease: 'easeOut' as const },
      };

  return (
    <section
      id="top"
      aria-label="Introduction"
      className="flex min-h-[92svh] items-center pt-16"
    >
      <motion.div className="section-shell" {...reveal}>
        <p className="mono-label mb-8">
          {about.title} · {about.location}
        </p>

        <h1 className="max-w-4xl text-display font-semibold text-ink dark:text-white">
          {about.name}
        </h1>

        <p className="mt-8 max-w-2xl text-xl leading-relaxed text-ink-soft sm:text-2xl sm:leading-relaxed dark:text-white/70">
          I build high-throughput, low-latency{' '}
          <span className="marker text-ink dark:text-white">REST APIs and distributed systems</span>{' '}
          that stay fast and reliable for millions of daily users.
        </p>

        <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4">
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 text-base font-medium text-ink underline-scribble transition-opacity hover:opacity-80 dark:text-white"
          >
            Get in touch
            <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5">
              →
            </span>
          </a>
          <a
            href="#experience"
            className="group inline-flex items-center gap-2 text-base font-medium text-ink underline-scribble transition-opacity hover:opacity-80 dark:text-white"
          >
            View work
            <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5">
              →
            </span>
          </a>
          <span className="hidden h-4 w-px bg-black/15 dark:bg-white/15 sm:inline-block" aria-hidden="true" />
          <div className="flex items-center gap-4">
            <a
              href={about.links.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="text-ink-muted transition-colors hover:text-ink dark:text-white/50 dark:hover:text-white"
            >
              <GitHubIcon />
            </a>
            <a
              href={about.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="text-ink-muted transition-colors hover:text-ink dark:text-white/50 dark:hover:text-white"
            >
              <LinkedInIcon />
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
