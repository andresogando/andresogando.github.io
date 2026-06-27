const FROM = 'Raven Platforms <corporate@email.onraven.com>';
const NOTIFY_TO = 'andres@onraven.ca';

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function corsHeaders(origin) {
  const allowed = process.env.ALLOWED_ORIGIN;
  const headers = {
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

async function sendEmail(apiKey, payload) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(data.message || data.error || 'Failed to send email');
    err.status = res.status;
    throw err;
  }
  return data;
}

module.exports = async function handler(req, res) {
  const origin = req.headers.origin || '';
  const headers = corsHeaders(origin);

  if (req.method === 'OPTIONS') {
    return res.status(204).setHeader('Access-Control-Allow-Origin', headers['Access-Control-Allow-Origin'] || '*')
      .setHeader('Access-Control-Allow-Methods', headers['Access-Control-Allow-Methods'])
      .setHeader('Access-Control-Allow-Headers', headers['Access-Control-Allow-Headers'])
      .end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Email service is not configured.' });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch {
      return res.status(400).json({ error: 'Invalid JSON body.' });
    }
  }

  const name = (body.name || '').trim();
  const email = (body.email || '').trim();
  const message = (body.message || '').trim();

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required.' });
  }
  if (!isValidEmail(email)) {
    return res.status(400).json({ error: 'Please enter a valid email address.' });
  }
  if (message.length > 5000) {
    return res.status(400).json({ error: 'Message is too long.' });
  }

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message).replace(/\n/g, '<br>');

  try {
    await sendEmail(apiKey, {
      from: FROM,
      to: [NOTIFY_TO],
      reply_to: email,
      subject: `New project enquiry — ${name}`,
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
      to: [email],
      subject: 'We received your message — Raven Platforms',
      html: `
        <p>Hi ${safeName},</p>
        <p>Thanks for reaching out to Raven Platforms. We received your message and will reply within one business day.</p>
        <p><strong>Your message:</strong></p>
        <p>${safeMessage}</p>
        <p>— Raven Platforms<br>Toronto, Canada</p>
      `,
    });

    Object.entries(headers).forEach(([key, value]) => res.setHeader(key, value));
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Contact form error:', err);
    Object.entries(headers).forEach(([key, value]) => res.setHeader(key, value));
    return res.status(err.status || 500).json({ error: 'Unable to send your message. Please try again or email us directly.' });
  }
};
