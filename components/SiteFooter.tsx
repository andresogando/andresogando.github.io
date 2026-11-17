'use client';

import { useLang } from '../lib/i18n';

export function SiteFooter() {
  const { copy } = useLang();
  return (
    <footer>
      <span>{copy.footer.line1}</span>
      {' · '}
      <span>{copy.footer.line2}</span>
    </footer>
  );
}
