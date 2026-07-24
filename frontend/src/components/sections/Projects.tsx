import { content } from '../../data/content';
import { Section } from '../ui/Section';
import { AnimatedReveal } from '../ui/AnimatedReveal';
import { GitHubIcon } from '../ui/icons';

export function Projects() {
  const { projects } = content;

  return (
    <Section id="projects" index="03" eyebrow="Projects" kana="制作" title="Things I've shipped">
      <ol className="space-y-8">
        {projects.map((project, idx) => (
          <AnimatedReveal
            as="li"
            key={project.id}
            className={`diary-card sketch p-6 transition-transform duration-300 hover:rotate-0 sm:p-8 ${
              idx % 2 === 0 ? 'rotate-1' : '-rotate-1'
            }`}
          >
            <article className="grid gap-x-10 gap-y-4 lg:grid-cols-12">
              {/* Left column — technologies as hand-drawn sticker chips */}
              <div className="lg:col-span-4">
                <ul className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <li
                      key={tech}
                      className="diary-card border-ink/50 px-2 py-0.5 font-mono text-sm text-ink-soft dark:border-white/40 dark:text-white/70"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right column — title, points, repo link */}
              <div className="lg:col-span-8">
                <h3 className="text-2xl font-semibold leading-tight text-ink dark:text-white">
                  {project.title}
                </h3>

                <ul className="mt-5 space-y-3">
                  {project.descriptionPoints.map((point, i) => (
                    <li
                      key={i}
                      className="flex gap-3 text-base leading-relaxed text-ink-soft dark:text-white/65"
                    >
                      <span
                        className="mt-2.5 inline-flex h-0.5 w-3 flex-shrink-0 rounded-full bg-shu/80"
                        aria-hidden="true"
                      />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={project.repositoryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-6 inline-flex items-center gap-2 text-base font-medium text-ink underline-scribble transition-opacity hover:opacity-80 dark:text-white"
                  aria-label={`View ${project.title} on GitHub`}
                >
                  <GitHubIcon className="h-4 w-4" />
                  View repository
                  <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5">
                    →
                  </span>
                </a>
              </div>
            </article>
          </AnimatedReveal>
        ))}
      </ol>
    </Section>
  );
}
