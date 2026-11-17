export function escapeHtml(value: string): string {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
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
