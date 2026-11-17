# Astryx Raven Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild Raven Platforms as a Next.js App Router site on Astryx (neutral theme), keeping content/SEO/contact while dropping overwhelming chrome.

**Architecture:** Next.js SSG pages + shared Astryx Theme shell; typed `content/` modules for EN/ES and case studies; Resend contact via `app/api/contact/route.ts`. Old static HTML is archived then removed after parity smoke.

**Tech Stack:** Next.js 15+, React 19, `@astryxdesign/core` (0.7.x+), `@stylexjs/stylex`, `@astryxdesign/theme-neutral`, `@astryxdesign/cli`, Vercel, Resend

**Spec:** `docs/superpowers/specs/2026-11-17-astryx-raven-redesign-design.md`

## Global Constraints

- Sole author for commits: `andresogando <andresogando10@gmail.com>`; no AI co-author trailers; no "Made with Cursor"
- No em dashes (` - `) or en dashes (`-`) in commits, PR text, or Jira
- Theme: `@astryxdesign/theme-neutral` only; ship light appearance in v1
- Keep Resend behavior (recipients, validation limits, env vars)
- Canonical hosts: `https://ai.onraven.ca` (primary), `https://ai.onraven.com`
- Semver: new app starts at `0.1.0`; bump patch/minor on subsequent app commits
- Prefer Astryx components (`Button`, `VStack`, `Card`, `Collapsible`, `Link`, text inputs) over custom CSS chrome
- Discover exact component props with `npx @astryxdesign/cli component <Name>` before wiring each unfamiliar component
- Do not create or edit `HANDOFF.md`

---

## File map

| Path | Responsibility |
|------|----------------|
| `package.json` | Next + Astryx deps, scripts (`dev`, `build`, `astryx`) |
| `next.config.ts` | Next config; StyleX if using example-nextjs-stylex pattern |
| `app/globals.css` | Astryx reset + base imports |
| `app/astryx-themes.ts` | Generated/theme module from CLI |
| `app/layout.tsx` | Theme, metadata defaults, shell |
| `app/page.tsx` | Home composition |
| `app/case-studies/page.tsx` | Listing |
| `app/case-studies/[slug]/page.tsx` | Detail |
| `app/api/contact/route.ts` | Resend API |
| `lib/contact.ts` | `escapeHtml`, `isValidEmail`, body parse/validate |
| `lib/i18n.tsx` | Lang context + `t()` |
| `content/site.ts` | Nav, hero, products, clients, services, FAQ, footer (en/es) |
| `content/case-studies.ts` | Seven studies + listing fields |
| `components/SiteNav.tsx` | Primary nav + lang toggle |
| `components/SiteFooter.tsx` | Footer |
| `components/home/*.tsx` | Hero, Clients, Products, Services, SelectedWork, Faq, ContactForm |
| `components/case-studies/*.tsx` | Card + article layout |
| `public/*` | favicon, og, gallery, robots, sitemap, llms, manifest |
| `next.config` redirects | `*.html` → App Router paths |
| `_archive/` (temp) | Old static HTML during migration only |

---

### Task 1: Scaffold Next.js + Astryx neutral

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `app/layout.tsx`, `app/page.tsx`, `app/globals.css`, `app/astryx-themes.ts` (via CLI), `.gitignore` (Next defaults merged with existing)
- Modify: move `favicon.png`, `og.png`, `robots.txt`, `sitemap.xml`, `llms.txt`, `site.webmanifest`, `gallery/` into `public/`
- Create: `_archive/` and move legacy `index.html`, `case-studies.html`, `case-studies.css`, `case-studies.js`, `case-study-*.html`, root `api/` into it (keep readable until Task 8)

**Interfaces:**
- Consumes: none
- Produces: runnable `npm run dev` with Astryx `Theme` wrapping a hello page; `themes` + `defaultThemeSlug` from `app/astryx-themes.ts`

- [ ] **Step 1: Archive legacy static entrypoints**

```bash
mkdir -p _archive
mv index.html case-studies.html case-studies.css case-studies.js case-study-*.html api _archive/
mkdir -p public
mv favicon.png og.png robots.txt sitemap.xml llms.txt site.webmanifest gallery public/ 2>/dev/null || true
# Keep README.md, vercel.json, docs/, .env* at root
```

- [ ] **Step 2: Scaffold Next App Router (TypeScript)**

```bash
npx create-next-app@latest . --typescript --eslint --app --no-tailwind --no-src-dir --import-alias "@/*" --turbopack --yes
```

If create-next-app refuses a non-empty dir, init manually: add `next`, `react`, `react-dom` (19+), `typescript`, `@types/react`, `@types/node`, then create `app/layout.tsx` and `app/page.tsx` matching create-next-app App Router defaults.

- [ ] **Step 3: Install Astryx**

```bash
npm install @astryxdesign/core @stylexjs/stylex @astryxdesign/theme-neutral @astryxdesign/cli
npx @astryxdesign/cli init --all
npx @astryxdesign/cli theme add neutral
```

Add script to `package.json`:

```json
{
  "name": "raven-platforms",
  "version": "0.1.0",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "astryx": "node node_modules/@astryxdesign/cli/clients/cli/bin/astryx.mjs",
    "test": "node --import tsx --test lib/**/*.test.ts"
  }
}
```

Install `tsx` as a devDependency for the Node test runner later: `npm install -D tsx`.

- [ ] **Step 4: Wire globals + Theme**

`app/globals.css`:

```css
@import '@astryxdesign/core/reset.css';
@import '@astryxdesign/core/astryx.css';
```

`app/layout.tsx` (adjust import path if CLI generated themes elsewhere):

```tsx
import type { Metadata } from 'next';
import { Theme } from '@astryxdesign/core/theme';
import { themes, defaultThemeSlug } from './astryx-themes';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://ai.onraven.ca'),
  title: {
    default: 'Web Design & Software Development in Toronto | Raven Platforms Inc.',
    template: '%s | Raven Platforms',
  },
  description:
    'Toronto web design & software studio: custom websites, web apps, mobile apps, e-commerce, SEO, DevOps & technical audits for businesses across North America & the Caribbean.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-CA">
      <body>
        <Theme theme={themes[defaultThemeSlug]}>{children}</Theme>
      </body>
    </html>
  );
}
```

`app/page.tsx` smoke:

```tsx
import { Button } from '@astryxdesign/core/Button';
import { VStack } from '@astryxdesign/core/VStack';

export default function Home() {
  return (
    <VStack>
      <h1>Raven Platforms</h1>
      <Button label="Astryx ready" />
    </VStack>
  );
}
```

If StyleX build fails, clone conventions from Astryx `apps/example-nextjs` (CSS-only) first; only adopt `example-nextjs-stylex` when custom `xstyle` is required.

- [ ] **Step 5: Verify**

```bash
npm run dev
```

Expected: page loads, neutral theme styles present, button renders, no console Theme errors.

- [ ] **Step 6: Commit**

```bash
git add package.json package-lock.json tsconfig.json next.config.ts app public .gitignore docs
git add _archive
git commit -m "$(cat <<'EOF'
chore: scaffold Next.js with Astryx neutral theme

EOF
)"
```

---

### Task 2: Content modules + i18n

**Files:**
- Create: `content/site.ts`, `content/case-studies.ts`, `lib/i18n.tsx`
- Test: `lib/i18n.test.ts` (resolveLang)

**Interfaces:**
- Consumes: copy from `_archive/index.html` i18n object and case-study HTML
- Produces:
  - `export type Lang = 'en' | 'es'`
  - `export function resolveLang(searchParam: string | null | undefined): Lang`
  - `export const site: Record<Lang, SiteCopy>`
  - `export type CaseStudy = { slug: string; sector: string; title: string; summary: string; tags: string[]; fictional?: boolean; sections: { id: string; heading: string; body: string[] }[]; pullquote?: string; techNote?: string; nextSlug?: string }`
  - `export const caseStudies: CaseStudy[]` (order: prevsi, foundrylane, wemoverd, rookiebets, rmj-transportation, ledgerport, gatherstay)
  - `export function getCaseStudy(slug: string): CaseStudy | undefined`
  - `LangProvider`, `useLang()`, `useT()` in `lib/i18n.tsx`

- [ ] **Step 1: Write failing test for resolveLang**

`lib/i18n-core.ts`:

```ts
export type Lang = 'en' | 'es';

export function resolveLang(searchParam: string | null | undefined): Lang {
  return searchParam === 'es' ? 'es' : 'en';
}
```

`lib/i18n.test.ts`:

```ts
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { resolveLang } from './i18n-core.ts';

describe('resolveLang', () => {
  it('defaults to en', () => {
    assert.equal(resolveLang(undefined), 'en');
    assert.equal(resolveLang(null), 'en');
    assert.equal(resolveLang('fr'), 'en');
  });
  it('accepts es', () => {
    assert.equal(resolveLang('es'), 'es');
  });
});
```

- [ ] **Step 2: Run test**

```bash
npm test
```

Expected: PASS for resolveLang (implement `i18n-core.ts` first if FAIL on missing module).

- [ ] **Step 3: Port site copy**

Create `content/site.ts` with structured EN/ES objects covering: `meta`, `nav` (no gallery link), `hero` (single primary CTA), `clients` (label + `names: string[]` from the archived ticker list), `products` (OnRaven, Prevsi), `services` (10 items with title+desc), `faq` (5 items), `contact`, `footer`. Drop HUD/boot/gallery/orbit strings.

Example shape (fill all fields from `_archive/index.html`):

```ts
import type { Lang } from '../lib/i18n-core';

export type Service = { id: string; title: string; description: string };
export type FaqItem = { question: string; answerHtml: string };
export type Product = { name: string; meta: string; description: string; href: string };

export type SiteCopy = {
  meta: { title: string; description: string };
  nav: { services: string; clients: string; cases: string; faq: string; cta: string };
  hero: { title: string; description: string; cta: string };
  clients: { label: string; names: string[] };
  products: { title: string; items: Product[] };
  services: { title: string; items: Service[] };
  selectedWork: { title: string; seeAll: string };
  faq: { title: string; items: FaqItem[] };
  contact: {
    title: string;
    description: string;
    namePh: string;
    emailPh: string;
    msgPh: string;
    submit: string;
    sending: string;
    fillAll: string;
    success: string;
    error: string;
  };
  footer: { line1: string; line2: string };
};

export const site: Record<Lang, SiteCopy> = {
  en: { /* port from archive */ },
  es: { /* port from archive */ },
};
```

- [ ] **Step 4: Port case studies**

`content/case-studies.ts`: parse each `_archive/case-study-*.html` into `CaseStudy` objects. Keep English body text for v1 (listing page titles/summaries from `_archive/case-studies.html`). Export `caseStudies` and `getCaseStudy`.

- [ ] **Step 5: Lang provider**

`lib/i18n.tsx`:

```tsx
'use client';

import { createContext, useContext, useCallback, useMemo, useState, useEffect } from 'react';
import type { Lang } from './i18n-core';
import { resolveLang } from './i18n-core';
import { site, type SiteCopy } from '../content/site';

const LangContext = createContext<{
  lang: Lang;
  setLang: (lang: Lang) => void;
  copy: SiteCopy;
} | null>(null);

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setLangState(resolveLang(params.get('lang')));
  }, []);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    const url = new URL(window.location.href);
    if (next === 'es') url.searchParams.set('lang', 'es');
    else url.searchParams.delete('lang');
    window.history.replaceState({}, '', url.toString());
  }, []);

  const value = useMemo(() => ({ lang, setLang, copy: site[lang] }), [lang, setLang]);
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useLang requires LangProvider');
  return ctx;
}
```

Wrap children with `LangProvider` in `app/layout.tsx` (client boundary via provider file is enough).

- [ ] **Step 6: Commit**

```bash
git add content lib
git commit -m "$(cat <<'EOF'
feat: add site content modules and language helpers

EOF
)"
```

---

### Task 3: Shell (nav + footer)

**Files:**
- Create: `components/SiteNav.tsx`, `components/SiteFooter.tsx`
- Modify: `app/layout.tsx`

**Interfaces:**
- Consumes: `useLang()`, `site` copy
- Produces: persistent nav/footer around `{children}`

- [ ] **Step 1: Discover nav/link components**

```bash
npx @astryxdesign/cli component Button
npx @astryxdesign/cli component Link
npx @astryxdesign/cli component Navigation
```

Use printed imports/props. Fallback: Next `Link` + Astryx `Button` for CTA.

- [ ] **Step 2: Implement SiteNav**

```tsx
'use client';

import Link from 'next/link';
import { Button } from '@astryxdesign/core/Button';
import { useLang } from '../lib/i18n';

export function SiteNav() {
  const { copy, lang, setLang } = useLang();
  return (
    <header>
      <nav aria-label="Primary">
        <Link href="/">Raven Platforms</Link>
        <Link href="/#services">{copy.nav.services}</Link>
        <Link href="/#work">{copy.nav.clients}</Link>
        <Link href="/case-studies">{copy.nav.cases}</Link>
        <Link href="/#faq">{copy.nav.faq}</Link>
        <a href="https://onraven.com" target="_blank" rel="noopener noreferrer">OnRaven</a>
        <a href="https://prevsi.com" target="_blank" rel="noopener noreferrer">Prevsi</a>
        <div role="group" aria-label="Language">
          <button type="button" aria-pressed={lang === 'en'} onClick={() => setLang('en')}>EN</button>
          <button type="button" aria-pressed={lang === 'es'} onClick={() => setLang('es')}>ES</button>
        </div>
        <Button label={copy.nav.cta} onClick={() => { window.location.href = '/#contact'; }} />
      </nav>
    </header>
  );
}
```

Adjust `Button` usage if CLI shows `href`/`asChild` patterns that fit better than `onClick`.

- [ ] **Step 3: Implement SiteFooter**

```tsx
'use client';

import { useLang } from '../lib/i18n';

export function SiteFooter() {
  const { copy } = useLang();
  return (
    <footer>
      <span>{copy.footer.line1}</span>
      <span>{copy.footer.line2}</span>
    </footer>
  );
}
```

Calm footer copy: prefer `Raven Platforms Inc. · Toronto` over mission-control phrasing if the archived strings still sound like a HUD.

- [ ] **Step 4: Mount in layout**

```tsx
import { LangProvider } from '../lib/i18n';
import { SiteNav } from '../components/SiteNav';
import { SiteFooter } from '../components/SiteFooter';

// inside body Theme:
<LangProvider>
  <SiteNav />
  <main id="main">{children}</main>
  <SiteFooter />
</LangProvider>
```

- [ ] **Step 5: Verify**

```bash
npm run dev
```

Expected: nav links work, EN/ES toggles update labels, `?lang=es` sticks via history API.

- [ ] **Step 6: Commit**

```bash
git add components app/layout.tsx
git commit -m "$(cat <<'EOF'
feat: add Astryx site shell with language toggle

EOF
)"
```

---

### Task 4: Home page sections

**Files:**
- Create: `components/home/Hero.tsx`, `Clients.tsx`, `Products.tsx`, `Services.tsx`, `SelectedWork.tsx`, `Faq.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `useLang()`, `caseStudies`
- Produces: slim home matching spec IA

- [ ] **Step 1: Hero**

Brand-first: visible "Raven Platforms", then `copy.hero.title`, description, one primary CTA to `#contact`. Optional calm CSS fade-in gated by `prefers-reduced-motion`. No secondary clutter CTA required (spec: one primary CTA).

- [ ] **Step 2: Clients**

`id="work"`. Render `copy.clients.names` as a wrapping flex/grid of text names (no marquee animation).

- [ ] **Step 3: Products**

Two cards (Astryx `Card` if available): OnRaven + Prevsi from `copy.products.items` with outbound links.

- [ ] **Step 4: Services**

`id="services"`. Flat responsive grid of 10 services (title + description). No orbit SVG.

- [ ] **Step 5: Selected work**

Use `caseStudies.slice(0, 6)`. Each card: sector, title, summary, link to `/case-studies/${slug}`. Include "See all" → `/case-studies`.

- [ ] **Step 6: FAQ**

`id="faq"`. Use Astryx `Collapsible` / `Collapsible Group` per CLI. Render `copy.faq.items`. For `answerHtml`, use a small sanitizer-free approach: only allow the known mailto anchor from archived FAQ answers by storing structured `{ before, href, label, after }` or plain text. Prefer plain text answers in content unless the mailto answer needs a real `<a>`.

- [ ] **Step 7: Compose `app/page.tsx`**

```tsx
import { Hero } from '../components/home/Hero';
import { Clients } from '../components/home/Clients';
import { Products } from '../components/home/Products';
import { Services } from '../components/home/Services';
import { SelectedWork } from '../components/home/SelectedWork';
import { Faq } from '../components/home/Faq';
import { ContactForm } from '../components/home/ContactForm';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Clients />
      <Products />
      <Services />
      <SelectedWork />
      <Faq />
      <ContactForm />
    </>
  );
}
```

`ContactForm` can be a stub section with heading until Task 6 wires submit.

- [ ] **Step 8: Verify + commit**

```bash
npm run dev
# visually check mobile width and section order
git add app/page.tsx components/home
git commit -m "$(cat <<'EOF'
feat: build slim Astryx home sections

EOF
)"
```

Bump `package.json` version to `0.2.0` in this commit (feat).

---

### Task 5: Case study routes

**Files:**
- Create: `app/case-studies/page.tsx`, `app/case-studies/[slug]/page.tsx`, `components/case-studies/CaseCard.tsx`, `components/case-studies/CaseArticle.tsx`
- Modify: `next.config.ts` redirects from old `.html` URLs

**Interfaces:**
- Consumes: `caseStudies`, `getCaseStudy`
- Produces: listing + detail SSG pages; `generateStaticParams`; metadata per study

- [ ] **Step 1: Listing page**

Server component listing all `caseStudies` with `CaseCard`. Title/description metadata for the collection page (from archived listing).

- [ ] **Step 2: Detail page**

```tsx
import { notFound } from 'next/navigation';
import { caseStudies, getCaseStudy } from '../../../content/case-studies';
import { CaseArticle } from '../../../components/case-studies/CaseArticle';

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};
  return { title: study.title, description: study.summary };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();
  return <CaseArticle study={study} />;
}
```

`CaseArticle`: kicker, h1, dek/summary, sections with `id`s, optional pullquote, tech note, next-case link via `nextSlug`.

- [ ] **Step 3: Redirects**

In `next.config.ts`:

```ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: '/case-studies.html', destination: '/case-studies', permanent: true },
      { source: '/case-study-prevsi.html', destination: '/case-studies/prevsi', permanent: true },
      { source: '/case-study-foundrylane.html', destination: '/case-studies/foundrylane', permanent: true },
      { source: '/case-study-wemoverd.html', destination: '/case-studies/wemoverd', permanent: true },
      { source: '/case-study-rookiebets.html', destination: '/case-studies/rookiebets', permanent: true },
      { source: '/case-study-rmj-transportation.html', destination: '/case-studies/rmj-transportation', permanent: true },
      { source: '/case-study-ledgerport.html', destination: '/case-studies/ledgerport', permanent: true },
      { source: '/case-study-gatherstay.html', destination: '/case-studies/gatherstay', permanent: true },
    ];
  },
};

export default nextConfig;
```

- [ ] **Step 4: Update sitemap**

Rewrite `public/sitemap.xml` to App Router paths (`/`, `/case-studies`, `/case-studies/...`). Update `public/llms.txt` links the same way.

- [ ] **Step 5: Verify + commit**

```bash
npm run build
npm run dev
# hit /case-studies and /case-studies/prevsi and an old .html redirect
git add app/case-studies components/case-studies next.config.ts public/sitemap.xml public/llms.txt package.json
git commit -m "$(cat <<'EOF'
feat: add case study routes and legacy HTML redirects

EOF
)"
```

Bump version minor again if this is a separate feat commit (`0.3.0`).

---

### Task 6: Contact validation, API, form

**Files:**
- Create: `lib/contact.ts`, `lib/contact.test.ts`, `app/api/contact/route.ts`
- Create/Modify: `components/home/ContactForm.tsx`
- Delete later: `_archive/api/contact.js` (Task 8)

**Interfaces:**
- Consumes: same env as today (`RESEND_API_KEY`, `ALLOWED_ORIGIN`)
- Produces:
  - `escapeHtml(value: string): string`
  - `isValidEmail(email: string): boolean`
  - `parseContactBody(body: unknown): { ok: true; name: string; email: string; message: string } | { ok: false; error: string; status: number }`
  - `POST` handler returning JSON `{ ok: true }` or `{ error: string }`

- [ ] **Step 1: Failing tests for contact helpers**

`lib/contact.test.ts`:

```ts
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { escapeHtml, isValidEmail, parseContactBody } from './contact.ts';

describe('isValidEmail', () => {
  it('accepts simple emails', () => {
    assert.equal(isValidEmail('a@b.co'), true);
  });
  it('rejects garbage', () => {
    assert.equal(isValidEmail('nope'), false);
  });
});

describe('escapeHtml', () => {
  it('escapes brackets and quotes', () => {
    assert.equal(escapeHtml('<b>"x"&'), '&lt;b&gt;&quot;x&quot;&amp;');
  });
});

describe('parseContactBody', () => {
  it('requires fields', () => {
    const r = parseContactBody({ name: '', email: '', message: '' });
    assert.equal(r.ok, false);
  });
  it('rejects long messages', () => {
    const r = parseContactBody({ name: 'A', email: 'a@b.co', message: 'x'.repeat(5001) });
    assert.equal(r.ok, false);
  });
  it('accepts valid payloads', () => {
    const r = parseContactBody({ name: 'A', email: 'a@b.co', message: 'Hi' });
    assert.equal(r.ok, true);
  });
});
```

- [ ] **Step 2: Run tests (expect FAIL)**

```bash
npm test
```

Expected: FAIL (module missing).

- [ ] **Step 3: Implement `lib/contact.ts`**

Port logic from `_archive/api/contact.js`:

```ts
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
```

- [ ] **Step 4: Re-run tests**

```bash
npm test
```

Expected: PASS.

- [ ] **Step 5: App Router route**

`app/api/contact/route.ts`: port Resend sends, CORS headers, `FROM` / `NOTIFY_TO` / `NOTIFY_CC` from archive. Use `parseContactBody`. Return `NextResponse.json`.

Preserve subjects and HTML bodies from `_archive/api/contact.js` (rewrite any em dashes in email HTML to commas or hyphens while porting).

- [ ] **Step 6: ContactForm UI**

`id="contact"`. Astryx text inputs + `Button` submit. POST `/api/contact` with JSON `{ name, email, message }`. Show `copy.contact.*` status strings. Disable button while sending.

- [ ] **Step 7: Verify**

```bash
# with RESEND_API_KEY in .env.local
npm run dev
# submit form; expect 200 and inbox traffic, or clear error if key missing
npm test
```

- [ ] **Step 8: Commit**

```bash
git add lib/contact.ts lib/contact.test.ts app/api/contact/route.ts components/home/ContactForm.tsx package.json
git commit -m "$(cat <<'EOF'
feat: port Resend contact API and Astryx form

EOF
)"
```

Bump version minor (`0.4.0` or next).

---

### Task 7: SEO JSON-LD + metadata polish

**Files:**
- Create: `components/JsonLd.tsx` or inline in `app/layout.tsx` / `app/page.tsx`
- Modify: `app/layout.tsx` metadata (`alternates`, openGraph, twitter, icons)
- Modify: `public/robots.txt` if needed for Next paths

**Interfaces:**
- Consumes: organization/service FAQ graph fields from archived `index.html` JSON-LD
- Produces: equivalent `@graph` on home; article JSON-LD on case study pages

- [ ] **Step 1: Port Organization / ProfessionalService / WebSite / FAQPage JSON-LD onto home**
- [ ] **Step 2: Article JSON-LD on case study detail**
- [ ] **Step 3: Verify view-source contains JSON-LD and correct canonical**
- [ ] **Step 4: Commit**

```bash
git commit -m "$(cat <<'EOF'
feat: restore SEO metadata and JSON-LD on Next pages

EOF
)"
```

---

### Task 8: Remove archive, README, final smoke

**Files:**
- Delete: `_archive/` (after confirming content ports are complete)
- Modify: `README.md` (Next + Astryx setup; keep Resend env docs; remove GitHub Pages-only contact hack if obsolete)
- Modify: `vercel.json` (simplify or remove obsolete rewrites if App Router handles `/api`)

**Interfaces:**
- Consumes: working app from Tasks 1-7
- Produces: clean tree deployable on Vercel

- [ ] **Step 1: Full smoke checklist**

1. `/` section order matches spec
2. EN/ES toggle
3. `/case-studies` + one detail
4. Legacy `.html` redirect
5. Contact submit
6. `npm run build` succeeds
7. Mobile width nav

- [ ] **Step 2: Remove `_archive/` and any leftover static CSS/JS**
- [ ] **Step 3: Update README**
- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "$(cat <<'EOF'
chore: drop legacy static site and update README

EOF
)"
```

---

## Self-review vs spec

| Spec requirement | Task |
|------------------|------|
| Next.js + Astryx + neutral | 1 |
| Slim home IA | 4 |
| Case studies routes | 5 |
| EN/ES | 2, 3 |
| Resend contact | 6 |
| SEO files + JSON-LD | 5, 7 |
| Drop cosmos/HUD/orbit/gallery wall | 4 (never reimplemented) |
| Redirects from old HTML | 5 |
| Contact helper test | 6 |
| Light-only v1 | 1 (no dark toggle work) |

No TBD placeholders remain. Types (`Lang`, `CaseStudy`, `SiteCopy`, `parseContactBody`) are consistent across tasks.
`)