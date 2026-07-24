import { content } from '../../data/content';
import { formatMonthYear } from '../../utils/format';
import { Section } from '../ui/Section';
import { AnimatedReveal } from '../ui/AnimatedReveal';

export function Certifications() {
  const { certifications } = content;

  return (
    <Section id="certifications" index="05" eyebrow="Certifications" kana="資格" title="Credentials">
      <ol className="space-y-8">
        {certifications.map((cert, idx) => (
          <AnimatedReveal
            as="li"
            key={cert.id}
            className={`diary-card sketch p-6 transition-transform duration-300 hover:rotate-0 sm:p-8 ${
              idx % 2 === 0 ? '-rotate-1' : 'rotate-1'
            }`}
          >
            <article className="grid gap-x-10 gap-y-3 lg:grid-cols-12">
              {/* Left column — issue date, mono muted */}
              <div className="lg:col-span-4">
                <p className="mono-label">{formatMonthYear(cert.issueDate)}</p>
              </div>

              {/* Right column — title, issuer, credential id */}
              <div className="lg:col-span-8">
                <h3 className="text-xl font-semibold text-ink dark:text-white">{cert.title}</h3>
                <p className="mt-1 text-base text-ink-soft dark:text-white/65">{cert.issuer}</p>
                <p className="mono-label mt-3">
                  Credential ID{' '}
                  <span className="text-ink-soft dark:text-white/60">{cert.credentialId}</span>
                </p>
              </div>
            </article>
          </AnimatedReveal>
        ))}
      </ol>
    </Section>
  );
}
