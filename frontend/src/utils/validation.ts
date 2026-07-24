export interface ContactFormValues {
  name: string;
  email: string;
  message: string;
}

export type ContactFieldErrors = Partial<Record<keyof ContactFormValues, string>>;

// Pragmatic RFC-5322-ish email check; mirrors backend @Email semantics closely enough for a form.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const LIMITS = {
  name: 100,
  email: 254,
  message: 5000,
} as const;

/**
 * Validate contact form values. Returns a map of field -> error message.
 * An empty object means the form is valid.
 */
export function validateContact(values: ContactFormValues): ContactFieldErrors {
  const errors: ContactFieldErrors = {};

  const name = values.name.trim();
  const email = values.email.trim();
  const message = values.message.trim();

  if (!name) {
    errors.name = 'Please enter your name.';
  } else if (name.length > LIMITS.name) {
    errors.name = `Name must be ${LIMITS.name} characters or fewer.`;
  }

  if (!email) {
    errors.email = 'Please enter your email.';
  } else if (email.length > LIMITS.email) {
    errors.email = `Email must be ${LIMITS.email} characters or fewer.`;
  } else if (!EMAIL_RE.test(email)) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!message) {
    errors.message = 'Please enter a message.';
  } else if (message.length > LIMITS.message) {
    errors.message = `Message must be ${LIMITS.message} characters or fewer.`;
  }

  return errors;
}
