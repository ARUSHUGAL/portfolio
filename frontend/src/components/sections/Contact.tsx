import { useId, useState } from 'react';
import { useForm } from '@formspree/react';
import { content } from '../../data/content';
import {
  validateContact,
  type ContactFieldErrors,
  type ContactFormValues,
} from '../../utils/validation';
import { Section } from '../ui/Section';
import { AnimatedReveal } from '../ui/AnimatedReveal';
import { GitHubIcon, LinkedInIcon, EmailIcon } from '../ui/icons';

const EMPTY: ContactFormValues = { name: '', email: '', message: '' };

// Formspree form id (public — it lives in the form action). Env can override.
const FORMSPREE_ID =
  (import.meta.env.VITE_FORMSPREE_ID as string | undefined) || 'mqerybwo';

export function Contact() {
  const { about } = content;
  const fieldId = useId();
  const [values, setValues] = useState<ContactFormValues>(EMPTY);
  const [errors, setErrors] = useState<ContactFieldErrors>({});

  const [state, submitToFormspree, resetFormspree] = useForm(FORMSPREE_ID);
  const submitted = state.succeeded;
  const sending = state.submitting;
  const sendError =
    !state.succeeded && state.errors
      ? "Something went wrong sending your message. Please email me directly, or try again."
      : null;

  const update =
    (field: keyof ContactFormValues) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((prev) => ({ ...prev, [field]: e.target.value }));
      if (errors[field]) {
        setErrors((prev) => {
          const next = { ...prev };
          delete next[field];
          return next;
        });
      }
    };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // Run our client-side validation first; only hand off to Formspree if clean.
    const nextErrors = validateContact(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      e.preventDefault();
      return;
    }
    await submitToFormspree(e);
  };

  const socials = [
    { label: 'Email', href: `mailto:${about.links.email}`, icon: <EmailIcon className="h-4 w-4" />, value: about.links.email, external: false },
    { label: 'GitHub', href: about.links.github, icon: <GitHubIcon className="h-4 w-4" />, value: 'ARUSHUGAL', external: true },
    { label: 'LinkedIn', href: about.links.linkedin, icon: <LinkedInIcon className="h-4 w-4" />, value: 'arush-ugal', external: true },
  ];

  return (
    <Section
      id="contact"
      index="07"
      eyebrow="Contact"
      kana="連絡"
      title="Let's build something"
      intro="Have a role, a project, or an idea worth talking through? Send a note and I'll get back to you."
    >
      <div className="grid gap-12 lg:grid-cols-12">
        {/* Form */}
        <AnimatedReveal className="lg:col-span-7">
          <div className="diary-card sketch p-6 sm:p-8">
          {submitted ? (
            <div role="status" aria-live="polite" className="py-6">
              <p className="mono-label">Message sent</p>
              <h3 className="mt-3 text-2xl font-semibold text-ink dark:text-white">
                Thanks for reaching out
              </h3>
              <p className="mt-2 max-w-sm text-base text-ink-soft dark:text-white/65">
                Your message has been received. I'll get back to you soon.
              </p>
              <button
                type="button"
                onClick={() => {
                  resetFormspree();
                  setValues(EMPTY);
                  setErrors({});
                }}
                className="group mt-6 inline-flex items-center gap-2 text-base font-medium text-ink underline-scribble transition-opacity hover:opacity-80 dark:text-white"
              >
                Send another message
                <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5">
                  →
                </span>
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              <Field id={`${fieldId}-name`} label="Name" error={errors.name}>
                <input
                  id={`${fieldId}-name`}
                  type="text"
                  name="name"
                  autoComplete="name"
                  value={values.name}
                  onChange={update('name')}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? `${fieldId}-name-error` : undefined}
                  className={inputClass(Boolean(errors.name))}
                  placeholder="Jane Doe"
                />
              </Field>

              <Field id={`${fieldId}-email`} label="Email" error={errors.email}>
                <input
                  id={`${fieldId}-email`}
                  type="email"
                  name="email"
                  autoComplete="email"
                  value={values.email}
                  onChange={update('email')}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? `${fieldId}-email-error` : undefined}
                  className={inputClass(Boolean(errors.email))}
                  placeholder="jane@example.com"
                />
              </Field>

              <Field id={`${fieldId}-message`} label="Message" error={errors.message}>
                <textarea
                  id={`${fieldId}-message`}
                  name="message"
                  rows={5}
                  value={values.message}
                  onChange={update('message')}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? `${fieldId}-message-error` : undefined}
                  className={`${inputClass(Boolean(errors.message))} resize-y`}
                  placeholder="Tell me a little about what you have in mind…"
                />
              </Field>

              {sendError && (
                <p role="alert" className="text-base font-medium text-shu">
                  {sendError}
                </p>
              )}

              <button
                type="submit"
                disabled={sending}
                className="group inline-flex items-center gap-2 text-base font-medium text-ink underline-scribble transition-opacity hover:opacity-80 disabled:opacity-50 dark:text-white"
              >
                {sending ? 'Sending…' : 'Send message'}
                {!sending && (
                  <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5">
                    →
                  </span>
                )}
              </button>
            </form>
          )}
          </div>
        </AnimatedReveal>

        {/* Direct links */}
        <AnimatedReveal className="lg:col-span-5">
          <p className="mono-label mb-4">Reach me directly</p>
          <ul className="diary-card sketch px-6 py-2">
            {socials.map((s, i) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  {...(s.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="group flex items-center gap-4 py-4 transition-colors hover:text-ink-muted dark:hover:text-white/60"
                >
                  <span className="text-ink-muted dark:text-white/50">{s.icon}</span>
                  <span className="min-w-0">
                    <span className="mono-label block">{s.label}</span>
                    <span className="block truncate text-base font-medium text-ink dark:text-white">
                      {s.value}
                    </span>
                  </span>
                </a>
                {i < socials.length - 1 && <div className="ink-rule opacity-60" aria-hidden="true" />}
              </li>
            ))}
          </ul>
          <p className="mt-8 text-base leading-relaxed text-ink-soft dark:text-white/65">
            Based in {about.location}. Open to backend and full-stack
            opportunities, internships, and collaborations.
          </p>
        </AnimatedReveal>
      </div>
    </Section>
  );
}

function inputClass(hasError: boolean): string {
  return [
    'w-full rounded-[12px_8px_14px_7px] border-2 bg-canvas-light/40 px-4 py-3 text-base text-ink transition-colors dark:bg-canvas-dark/40',
    'placeholder:text-ink-muted/70 dark:text-white dark:placeholder:text-white/40',
    'focus:border-ink dark:focus:border-white',
    hasError
      ? 'border-shu/70 dark:border-shu/70'
      : 'border-ink/40 dark:border-white/30',
  ].join(' ');
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mono-label mb-2 block">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-2 text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}
