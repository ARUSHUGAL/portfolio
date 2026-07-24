import { content } from '../../data/content';
import { formatMonthYear } from '../../utils/format';
import { Section } from '../ui/Section';
import { AnimatedReveal } from '../ui/AnimatedReveal';

export function Education() {
  const { education, languages, leadership } = content.education;

  return (
    <Section id="education" index="06" eyebrow="Education" kana="学歴" title="Foundation">
      <div className="space-y-8">
        {/* Degree */}
        {education.map((entry) => (
          <AnimatedReveal
            key={entry.institution}
            className="diary-card sketch p-6 transition-transform duration-300 hover:rotate-0 sm:p-8 -rotate-1"
          >
            <div className="grid gap-x-10 gap-y-3 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <p className="mono-label">
                  {formatMonthYear(entry.startDate)} — {formatMonthYear(entry.endDate)}
                </p>
                <p className="mono-label mt-2">GPA {entry.gpa}</p>
              </div>
              <div className="lg:col-span-8">
                <h3 className="text-2xl font-semibold text-ink dark:text-white">
                  {entry.institution}
                </h3>
                <p className="mt-1 text-base text-ink-soft dark:text-white/65">{entry.degree}</p>
                <p className="mt-1 text-base text-ink-soft dark:text-white/65">{entry.school}</p>
                {entry.honors.length > 0 && (
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {entry.honors.map((honor) => (
                      <li
                        key={honor}
                        className="diary-card border-ink/50 px-2 py-0.5 font-mono text-sm text-ink-soft dark:border-white/40 dark:text-white/70"
                      >
                        {honor}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </AnimatedReveal>
        ))}

        {/* Languages */}
        <AnimatedReveal className="diary-card sketch p-6 transition-transform duration-300 hover:rotate-0 sm:p-8 rotate-1">
          <div className="grid gap-x-10 gap-y-3 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <h3 className="mono-label">Languages</h3>
            </div>
            <div className="lg:col-span-8">
              <ul className="space-y-2">
                {languages.map((lang) => (
                  <li key={lang.language} className="flex items-baseline justify-between gap-4">
                    <span className="text-base text-ink dark:text-white">{lang.language}</span>
                    <span className="mono-label">{lang.proficiency}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </AnimatedReveal>

        {/* Leadership */}
        <AnimatedReveal className="diary-card sketch p-6 transition-transform duration-300 hover:rotate-0 sm:p-8 -rotate-1">
          <div className="grid gap-x-10 gap-y-3 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <h3 className="mono-label">Leadership</h3>
            </div>
            <div className="lg:col-span-8">
              <ul className="space-y-2">
                {leadership.map((item) => (
                  <li key={item} className="text-base text-ink-soft dark:text-white/70">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </AnimatedReveal>
      </div>
    </Section>
  );
}
