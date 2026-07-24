import { content } from '../../data/content';
import { Section } from '../ui/Section';
import { AnimatedReveal } from '../ui/AnimatedReveal';
import { GitHubIcon, LinkedInIcon, EmailIcon } from '../ui/icons';

export function About() {
  const { about } = content;

  const links = [
    { label: 'GitHub', href: about.links.github, icon: <GitHubIcon className="h-4 w-4" />, external: true },
    { label: 'LinkedIn', href: about.links.linkedin, icon: <LinkedInIcon className="h-4 w-4" />, external: true },
    { label: 'Email', href: `mailto:${about.links.email}`, icon: <EmailIcon className="h-4 w-4" />, external: false },
  ];

  return (
    <Section id="about" index="01" eyebrow="About" kana="概要" title="Engineering for scale and reliability">
      <div className="grid gap-12 lg:grid-cols-12">
        <AnimatedReveal className="lg:col-span-8">
          <p className="text-xl leading-relaxed text-ink-soft sm:text-2xl sm:leading-relaxed dark:text-white/70">
            {about.summary}
          </p>
        </AnimatedReveal>

        <AnimatedReveal className="lg:col-span-4">
          <p className="mono-label mb-4">Connect</p>
          <ul className="diary-card sketch px-6 py-2">
            {links.map((link, i) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  {...(link.external
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {})}
                  className="group flex items-center justify-between py-3.5 text-base text-ink transition-colors hover:text-ink-muted dark:text-white dark:hover:text-white/60"
                >
                  <span className="flex items-center gap-3">
                    <span className="text-ink-muted dark:text-white/50">{link.icon}</span>
                    {link.label}
                  </span>
                  <span
                    aria-hidden="true"
                    className="text-ink-muted transition-transform duration-200 group-hover:translate-x-0.5 dark:text-white/50"
                  >
                    →
                  </span>
                </a>
                {i < links.length - 1 && <div className="ink-rule opacity-60" aria-hidden="true" />}
              </li>
            ))}
          </ul>
        </AnimatedReveal>
      </div>
    </Section>
  );
}
