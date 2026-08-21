import { NextRequest, NextResponse } from 'next/server';
import { defaultLanguage, supportedLanguages } from './i18n/config';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasLangPrefix = supportedLanguages.some(
    (lang) => pathname === `/${lang}` || pathname.startsWith(`/${lang}/`)
  );
  if (hasLangPrefix) return NextResponse.next();

  const cookieLang = request.cookies.get('NEXT_LOCALE')?.value;
  const preferredCookieLang = supportedLanguages.find((lang) => lang === cookieLang);

  const acceptLanguage = request.headers.get('accept-language') ?? '';
  const preferredHeaderLang = supportedLanguages.find((lang) => acceptLanguage.includes(lang));

  const lang = preferredCookieLang ?? preferredHeaderLang ?? defaultLanguage;

  const url = request.nextUrl.clone();
  url.pathname = `/${lang}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/((?!_next|api|images|favicon.ico).*)'],
};