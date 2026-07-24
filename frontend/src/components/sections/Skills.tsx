import { content } from '../../data/content';
import { Section } from '../ui/Section';
import { AnimatedReveal } from '../ui/AnimatedReveal';

export function Skills() {
  const { skills } = content;

  return (
    <Section id="skills" index="04" eyebrow="Skills" kana="技術" title="Tools of the trade">
      <div className="grid gap-6 sm:grid-cols-2">
        {skills.map((group, idx) => (
          <AnimatedReveal
            key={group.category}
            className={`diary-card sketch p-6 transition-transform duration-300 hover:rotate-0 ${
              idx % 2 === 0 ? '-rotate-1' : 'rotate-1'
            }`}
          >
            <h3 className="mono-label mb-4">{group.category}</h3>
            <ul className="flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <li
                  key={skill}
                  className="diary-card border-ink/50 px-2 py-0.5 font-mono text-sm text-ink-soft dark:border-white/40 dark:text-white/70"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </AnimatedReveal>
        ))}
      </div>
    </Section>
  );
}
