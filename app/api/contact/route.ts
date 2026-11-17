import { NextResponse } from 'next/server';
import { escapeHtml, isAllowedContactOrigin, parseContactBody } from '../../../lib/contact';

const FROM = 'Raven Platforms <corporate@email.onraven.com>';
const NOTIFY_TO = 'andres@onraven.ca';
const NOTIFY_CC = 'andresogando10@gmail.com';

function corsHeaders(origin: string): Record<string, string> {
  const allowed = process.env.ALLOWED_ORIGIN;
  const headers: Record<string, string> = {
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
  if (allowed) {
    if (origin === allowed) headers['Access-Control-Allow-Origin'] = origin;
  } else if (origin) {
    headers['Access-Control-Allow-Origin'] = origin;
  } else {
    headers['Access-Control-Allow-Origin'] = '*';
  }
  return headers;
}

async function sendEmail(apiKey: string, payload: Record<string, unknown>) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  const data = (await res.json().catch(() => ({}))) as { message?: string; error?: string };
  if (!res.ok) {
    const err = new Error(data.message || data.error || 'Failed to send email') as Error & { status?: number };
    err.status = res.status;
    throw err;
  }
  return data;
}

function originDecision(req: Request) {
  const origin = req.headers.get('origin') || '';
  const serverOrigin = new URL(req.url).origin;
  const headers = corsHeaders(origin);
  const allowed = isAllowedContactOrigin(origin, process.env.ALLOWED_ORIGIN, serverOrigin);
  return { headers, allowed };
}

export function OPTIONS(req: Request) {
  const { headers, allowed } = originDecision(req);
  if (!allowed) {
    return NextResponse.json({ error: 'Origin not allowed.' }, { status: 403, headers });
  }
  return new NextResponse(null, { status: 204, headers });
}

export async function POST(req: Request) {
  const { headers, allowed } = originDecision(req);
  if (!allowed) {
    return NextResponse.json({ error: 'Origin not allowed.' }, { status: 403, headers });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'Email service is not configured.' }, { status: 500, headers });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400, headers });
  }

  const parsed = parseContactBody(body);
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: parsed.status, headers });
  }

  const safeName = escapeHtml(parsed.name);
  const safeEmail = escapeHtml(parsed.email);
  const safeMessage = escapeHtml(parsed.message).replace(/\n/g, '<br>');

  try {
    await sendEmail(apiKey, {
      from: FROM,
      to: [NOTIFY_TO],
      cc: [NOTIFY_CC],
      reply_to: parsed.email,
      subject: `New project enquiry - ${parsed.name}`,
      html: `
        <h2>New contact form submission</h2>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Message:</strong></p>
        <p>${safeMessage}</p>
      `,
    });

    await sendEmail(apiKey, {
      from: FROM,
      to: [parsed.email],
      subject: 'We received your message - Raven Platforms',
      html: `
        <p>Hi ${safeName},</p>
        <p>Thanks for reaching out to Raven Platforms. We received your message and will reply within one business day.</p>
        <p><strong>Your message:</strong></p>
        <p>${safeMessage}</p>
        <p>- Raven Platforms<br>Toronto, Canada</p>
      `,
    });

    return NextResponse.json({ ok: true }, { headers });
  } catch (err) {
    console.error('Contact form error:', err);
    const status = typeof err === 'object' && err && 'status' in err && typeof err.status === 'number' ? err.status : 500;
    return NextResponse.json(
      { error: 'Unable to send your message. Please try again or email us directly.' },
      { status, headers },
    );
  }
}
