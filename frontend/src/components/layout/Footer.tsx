import { content } from '../../data/content';
import { GitHubIcon, LinkedInIcon, EmailIcon } from '../ui/icons';

export function Footer() {
  const { about } = content;
  const year = new Date().getFullYear();

  return (
    <footer className="py-12">
      <div className="section-shell">
        <div className="ink-rule mb-12" aria-hidden="true" />
      </div>
      <div className="section-shell flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <a
          href="#top"
          className="font-hand text-2xl font-bold tracking-tight text-ink transition-opacity hover:opacity-70 dark:text-white"
        >
          {about.name}
        </a>

        <div className="flex items-center gap-5">
          <a
            href={about.links.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className="text-ink-muted transition-colors hover:text-ink dark:text-white/50 dark:hover:text-white"
          >
            <GitHubIcon className="h-4 w-4" />
          </a>
          <a
            href={about.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
            className="text-ink-muted transition-colors hover:text-ink dark:text-white/50 dark:hover:text-white"
          >
            <LinkedInIcon className="h-4 w-4" />
          </a>
          <a
            href={`mailto:${about.links.email}`}
            aria-label="Send an email"
            className="text-ink-muted transition-colors hover:text-ink dark:text-white/50 dark:hover:text-white"
          >
            <EmailIcon className="h-4 w-4" />
          </a>
        </div>

        <p className="mono-label">
          © {year} {about.name}. React · TypeScript · Tailwind CSS
        </p>
      </div>
    </footer>
  );
}
