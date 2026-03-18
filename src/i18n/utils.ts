import { ui, defaultLang } from './ui';
export { languages, defaultLang } from './ui';

export type LanguageCode = keyof typeof ui;
type TranslationKey = keyof typeof ui[typeof defaultLang];

export function getLangFromUrl(url: URL): LanguageCode {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as LanguageCode;
  return defaultLang;
}

export function useTranslations(lang: LanguageCode) {
  return function t(key: TranslationKey): string {
    return (ui[lang][key] ?? ui[defaultLang][key]) as string;
  };
}

// Obtener el path sin el prefijo de idioma
export function getPathWithoutLang(url: URL): string {
  const [, first, ...rest] = url.pathname.split('/');
  if (first in ui) {
    return '/' + rest.join('/');
  }
  return url.pathname;
}

// Construir URL con idioma preservando el path
export function getLocalizedUrl(lang: LanguageCode, currentUrl: URL): string {
  const path = getPathWithoutLang(currentUrl);
  if (lang === defaultLang) {
    return path || '/';
  }
  return `/${lang}${path}`;
}