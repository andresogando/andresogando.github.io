# Raven Platforms

Static marketing site with a Resend-powered contact form.

## Contact form setup

The API key must stay server-side. Deploy this repo to **Vercel** (recommended) so `/api/contact` runs alongside the site.

1. Push the repo to GitHub.
2. Import the project in [Vercel](https://vercel.com).
3. Add an environment variable:
   - `RESEND_API_KEY` — your Resend API key
   - `ALLOWED_ORIGIN` (optional) — e.g. `https://your-domain.com` to restrict CORS
4. Deploy.

Emails sent on submit:
- **To you:** `andres@onraven.ca` with the enquiry details
- **To the submitter:** receipt confirmation from `corporate@email.onraven.com`

Ensure `corporate@email.onraven.com` is verified in your Resend domain settings.

## GitHub Pages only

GitHub Pages cannot run the API. Either:

- Deploy the full site on Vercel instead, or
- Deploy only the `api/` folder on Vercel and add this to `index.html` `<head>`:

```html
<meta name="contact-api" content="https://your-api.vercel.app/api/contact">
```

## Local development

```bash
cp .env.example .env.local
# Add RESEND_API_KEY to .env.local
npx vercel dev
```

Open the URL Vercel prints (usually `http://localhost:3000`).
