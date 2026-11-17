export function escapeHtml(value: string): string {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

const MAX_EMAIL_LENGTH = 254;

export function isValidEmail(email: string): boolean {
  if (email.length > MAX_EMAIL_LENGTH) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// No Origin is same-origin or a non-browser client. A set allowlist rejects every other mismatch.
export function isAllowedContactOrigin(
  origin: string,
  allowedOrigin: string | undefined,
  serverOrigin: string,
): boolean {
  if (!allowedOrigin) return true;
  if (!origin || origin === serverOrigin) return true;
  return origin === allowedOrigin;
}

export function parseContactBody(body: unknown):
  | { ok: true; name: string; email: string; message: string }
  | { ok: false; error: string; status: number } {
  const data = (body ?? {}) as Record<string, unknown>;
  const name = String(data.name ?? '').trim();
  const email = String(data.email ?? '').trim();
  const message = String(data.message ?? '').trim();
  if (!name || !email || !message) {
    return { ok: false, error: 'Name, email, and message are required.', status: 400 };
  }
  if (!isValidEmail(email)) {
    return { ok: false, error: 'Please enter a valid email address.', status: 400 };
  }
  if (message.length > 5000) {
    return { ok: false, error: 'Message is too long.', status: 400 };
  }
  return { ok: true, name, email, message };
}
