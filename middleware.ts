import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n';

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always'
});

export const config = {
  // Exclusion `api` : empêche next-intl de préfixer /api/* avec la locale
  // (bug latent révélé par la 1ère route API /api/contact qui POSTait vers
  // /en/api/contact 404). Route Handlers Next.js = non-localisés par convention.
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
