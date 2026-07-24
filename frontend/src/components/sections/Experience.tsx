import { content } from '../../data/content';
import { formatDateRange, sortByStartDateDesc } from '../../utils/format';
import { Section } from '../ui/Section';
import { AnimatedReveal } from '../ui/AnimatedReveal';
import { PaytmLogo } from '../ui/PaytmLogo';

export function Experience() {
  const experiences = sortByStartDateDesc(content.experience);

  return (
    <Section id="experience" index="02" eyebrow="Experience" kana="経歴" title="Where I've built">
      <ol className="space-y-8">
        {experiences.map((exp, idx) => (
          <AnimatedReveal
            as="li"
            key={exp.id}
            className={`diary-card sketch p-6 transition-transform duration-300 hover:rotate-0 sm:p-8 ${
              idx % 2 === 0 ? '-rotate-1' : 'rotate-1'
            }`}
          >
            <article className="grid gap-x-10 gap-y-4 lg:grid-cols-12">
              {/* Left column — dates & location, monospace muted */}
              <div className="lg:col-span-4">
                <p className="mono-label text-ink-soft dark:text-white/55">
                  {formatDateRange(exp.startDate, exp.endDate, exp.current)}
                </p>
                <p className="mono-label mt-2">{exp.location}</p>
                {exp.current && <p className="mono-label mt-2">Current</p>}
              </div>

              {/* Right column — role, org, points */}
              <div className="lg:col-span-8">
                <h3 className="text-2xl font-semibold text-ink dark:text-white">
                  {exp.role}
                </h3>
                <div className="mt-2 flex items-center gap-3">
                  {exp.id === 'paytm' && (
                    <PaytmLogo className="h-9 w-9 flex-shrink-0" />
                  )}
                  <p className="text-lg font-medium text-ink dark:text-white/80">
                    {exp.organization}
                  </p>
                </div>

                <ul className="mt-6 space-y-3">
                  {exp.descriptionPoints.map((point, i) => (
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
              </div>
            </article>
          </AnimatedReveal>
        ))}
      </ol>
    </Section>
  );
}
