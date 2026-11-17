import type { Lang } from './i18n-core';

export function withLang(href: string, lang: Lang) {
  if (lang !== 'es') return href;
  const hashAt = href.indexOf('#');
  const hash = hashAt === -1 ? '' : href.slice(hashAt);
  const base = hashAt === -1 ? href : href.slice(0, hashAt);
  return `${base}${base.includes('?') ? '&' : '?'}lang=es${hash}`;
}
