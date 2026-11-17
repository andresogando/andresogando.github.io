# Raven Platforms

Next.js marketing site. The UI uses Astryx (`@astryxdesign/core` and the neutral theme). The contact form sends mail through Resend from a Next.js route.

## Local development

```bash
npm install
cp .env.example .env.local
```

Set `RESEND_API_KEY` in `.env.local`. Optional: set `ALLOWED_ORIGIN` (for example `https://ai.onraven.ca`) so `/api/contact` only accepts that browser origin.

```bash
npm run dev
```

Open http://localhost:3000.

`npm test` runs the contact and JSON-LD checks. `npm run build` produces the production build.

## Contact form

The API key stays on the server. Deploy this app on Vercel and set the same environment variables in the project settings. `/api/contact` is a Next.js route handler, so it does not need a separate API project.

Emails sent on submit:

- To you: `andres@onraven.ca` with the enquiry details
- To the submitter: a receipt from `corporate@email.onraven.com`

`corporate@email.onraven.com` must be a verified sender in Resend.

## Deploy

1. Push the repo to GitHub.
2. Import the project in [Vercel](https://vercel.com).
3. Add `RESEND_API_KEY`. Add `ALLOWED_ORIGIN` if you want to lock CORS.
4. Deploy.

## SEO

Files in `public/`:

- `robots.txt`: crawl rules and the sitemap reference
- `sitemap.xml`: URL list
- `llms.txt`: plain-text summary for answer engines
- `site.webmanifest`: web app metadata

Production hosts: [https://ai.onraven.ca](https://ai.onraven.ca) (canonical) and [https://ai.onraven.com](https://ai.onraven.com).

Submit `https://ai.onraven.ca/sitemap.xml` in [Google Search Console](https://search.google.com/search-console).
