import type { Metadata } from 'next';
import { Theme } from '@astryxdesign/core/theme';
import { themes, defaultThemeSlug } from '../astryx-themes';
import { LangProvider } from '../lib/i18n';
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
    <html lang="en-CA" data-theme="light">
      <body>
        <Theme theme={themes[defaultThemeSlug]} mode="light">
          <LangProvider>{children}</LangProvider>
        </Theme>
      </body>
    </html>
  );
}
