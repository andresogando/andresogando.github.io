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
    // Search params exist only in the browser. First render stays en so server HTML matches.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLangState(resolveLang(params.get('lang')));
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang === 'es' ? 'es-CA' : 'en-CA';
  }, [lang]);

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

export function useT() {
  return useLang().copy;
}
