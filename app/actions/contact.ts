"use server";

import nodemailer from "nodemailer";
import { site } from "@/lib/site";
import {
  isHoneypotFilled,
  validateContactInput,
} from "@/lib/contact";

export type ContactResult =
  | { ok: true }
  | { ok: false; error: "validation" | "send" };

/** Trims whitespace and strips surrounding quotes from env values. */
function sanitizeEnv(value: string | undefined): string | undefined {
  if (!value) return undefined;
  const trimmed = value.trim().replace(/^["']|["']$/g, "").trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

/**
 * Sends the contact form to the JTT inbox via Gmail SMTP.
 * No redirect — the client stays on the page and renders the result inline.
 */
export async function sendContactMessage(
  formData: FormData
): Promise<ContactResult> {
  const data: Record<string, unknown> = {
    name: formData.get("name"),
    email: formData.get("email"),
    company: formData.get("company"),
    message: formData.get("message"),
    website: formData.get("website"),
  };

  // Bot trap: pretend success without sending anything.
  if (isHoneypotFilled(data)) {
    return { ok: true };
  }

  const validated = validateContactInput(data);
  if (!validated.ok) {
    return validated;
  }
  const { name, email, company, message } = validated.input;

  const user = sanitizeEnv(process.env.GMAIL_USER);
  // App Passwords are often pasted with spaces or quotes — normalize.
  const pass = sanitizeEnv(process.env.GMAIL_APP_PASSWORD)?.replace(
    /\s+/g,
    ""
  );
  if (!user || !pass) {
    console.error("Contact form misconfigured: missing Gmail credentials.");
    return { ok: false, error: "send" };
  }

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: { user, pass },
    });

    await transporter.sendMail({
      from: `"Site JTT" <${user}>`,
      to: site.contact.email,
      replyTo: `"${name}" <${email}>`,
      subject: `[Site JTT] ${name}${company ? ` — ${company}` : ""}`,
      text: [
        `Nome: ${name}`,
        `E-mail: ${email}`,
        `Empresa: ${company || "—"}`,
        "",
        message,
      ].join("\n"),
    });

    return { ok: true };
  } catch (err) {
    console.error("Contact form send failed:", err);
    return { ok: false, error: "send" };
  }
}
