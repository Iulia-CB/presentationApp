import { NextResponse } from 'next/server';
import { defaultLanguage, supportedLanguages } from './i18n/config';
import { auth } from '@/auth';

const PROTECTED_PATHS = ['/myAccount'];

export default auth((request) => {
  const { pathname } = request.nextUrl;

  const hasLangPrefix = supportedLanguages.some(
    (lang) => pathname === `/${lang}` || pathname.startsWith(`/${lang}/`)
  );

  // 1. If there's no locale prefix yet, resolve and redirect first — same as before
  if (!hasLangPrefix) {
    const cookieLang = request.cookies.get('NEXT_LOCALE')?.value;
    const preferredCookieLang = supportedLanguages.find((lang) => lang === cookieLang);

    const acceptLanguage = request.headers.get('accept-language') ?? '';
    const preferredHeaderLang = supportedLanguages.find((lang) =>
      acceptLanguage.includes(lang)
    );

    const lang = preferredCookieLang ?? preferredHeaderLang ?? defaultLanguage;

    const url = request.nextUrl.clone();
    url.pathname = `/${lang}${pathname}`;
    return NextResponse.redirect(url);
  }

  // 2. Locale is already resolved — now check auth for protected paths
  const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}/, '') || '/';
  const isProtected = PROTECTED_PATHS.some((path) => pathWithoutLocale.startsWith(path));

  if (isProtected && !request.auth) {
    const locale = pathname.split('/')[1];
    return NextResponse.redirect(new URL(`/${locale}`, request.nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!_next|api|images|favicon.ico).*)'],
};