export type Lang = 'en' | 'es';

export function resolveLang(searchParam: string | null | undefined): Lang {
  return searchParam === 'es' ? 'es' : 'en';
}
