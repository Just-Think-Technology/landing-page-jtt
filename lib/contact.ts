export const CONTACT_HONEYPOT_FIELD = "website";

export const CONTACT_LIMITS = {
  nameMin: 2,
  nameMax: 120,
  messageMin: 10,
  messageMax: 5000,
  companyMax: 120,
} as const;

export type ContactInput = {
  name: string;
  email: string;
  company: string;
  message: string;
};

export type ContactValidationError = {
  ok: false;
  error: "validation";
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Shared server-side validation. Returns the sanitized input or a validation error. */
export function validateContactInput(
  data: Record<string, unknown>
): { ok: true; input: ContactInput } | ContactValidationError {
  const name = String(data.name ?? "").trim();
  const email = String(data.email ?? "").trim();
  const company = String(data.company ?? "").trim();
  const message = String(data.message ?? "").trim();

  if (
    name.length < CONTACT_LIMITS.nameMin ||
    name.length > CONTACT_LIMITS.nameMax ||
    !EMAIL_RE.test(email) ||
    email.length > 254 ||
    message.length < CONTACT_LIMITS.messageMin ||
    message.length > CONTACT_LIMITS.messageMax ||
    company.length > CONTACT_LIMITS.companyMax
  ) {
    return { ok: false, error: "validation" };
  }

  return { ok: true, input: { name, email, company, message } };
}

/** Honeypot check — a filled trap field means bot: caller should fake success. */
export function isHoneypotFilled(data: Record<string, unknown>): boolean {
  return String(data[CONTACT_HONEYPOT_FIELD] ?? "").trim().length > 0;
}
