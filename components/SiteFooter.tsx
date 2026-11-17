'use client';

import { useLang } from '../lib/i18n';

export function SiteFooter() {
  const { copy } = useLang();
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <p>
          {copy.footer.line1}
          {' · '}
          {copy.footer.line2}
        </p>
        <p>
          Photographs:{' '}
          <a
            href="https://commons.wikimedia.org/wiki/File:Gloucester_Docks_at_Night.jpeg"
            rel="noopener noreferrer"
            target="_blank"
          >
            Saffron Blaze
          </a>
        </p>
      </div>
    </footer>
  );
}
