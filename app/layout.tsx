import type { Metadata } from 'next';
import { Theme } from '@astryxdesign/core/theme';
import { themes, defaultThemeSlug } from '../astryx-themes';
import { SiteFooter } from '../components/SiteFooter';
import { SiteNav } from '../components/SiteNav';
import { LangProvider } from '../lib/i18n';
import { ogImage, SITE_ORIGIN } from '../lib/jsonld';
import './globals.css';

const title = 'Web Design & Software Development in Toronto | Raven Platforms Inc.';
const description =
  'Toronto web design & software studio: custom websites, web apps, mobile apps, e-commerce, SEO, DevOps & technical audits for businesses across North America & the Caribbean.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_ORIGIN),
  applicationName: 'Raven Platforms Inc.',
  authors: [{ name: 'Raven Platforms Inc.' }],
  keywords: [
    'Raven Platforms',
    'web design Toronto',
    'web development Toronto',
    'software development Toronto',
    'software company Toronto',
    'hire web developer Toronto',
    'freelance web developer Toronto',
    'app development Toronto',
    'mobile app developers Toronto',
    'e-commerce development',
    'custom software development',
    'SaaS development',
    'UI UX design Toronto',
    'SEO agency Toronto',
    'DevOps consulting Toronto',
    'technical audit',
    'website audit',
    'digital agency Toronto',
    'web studio Toronto',
    'MVP development',
    'startup software development',
    'IT consulting Toronto',
    'cloud infrastructure',
    'business automation',
    'web application development',
    'hire software developer Canada',
  ],
  title: { default: title, template: '%s | Raven Platforms' },
  description,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  alternates: {
    canonical: '/',
    languages: {
      'en-CA': `${SITE_ORIGIN}/`,
      en: 'https://ai.onraven.com/',
      'es-CA': `${SITE_ORIGIN}/?lang=es`,
      es: 'https://ai.onraven.com/?lang=es',
      'x-default': `${SITE_ORIGIN}/`,
    },
    types: {
      'text/plain': '/llms.txt',
    },
  },
  openGraph: {
    type: 'website',
    siteName: 'Raven Platforms Inc.',
    locale: 'en_CA',
    title,
    description:
      'Toronto software studio building custom websites, web apps, mobile apps, e-commerce, DevOps and technical audits for ambitious businesses across North America and the Caribbean.',
    url: '/',
    images: [ogImage],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description:
      'Custom websites, web apps, mobile apps, e-commerce, SEO, DevOps and technical audits, built in Toronto for teams across North America and the Caribbean.',
    images: [{ url: ogImage.url, alt: ogImage.alt }],
  },
  icons: {
    icon: [{ url: '/favicon.png', type: 'image/png' }],
    apple: [{ url: '/favicon.png' }],
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-CA" data-theme="dark">
      <body>
        <Theme theme={themes[defaultThemeSlug]} mode="dark">
          <LangProvider>
            <SiteNav />
            <main id="main">{children}</main>
            <SiteFooter />
          </LangProvider>
        </Theme>
      </body>
    </html>
  );
}
