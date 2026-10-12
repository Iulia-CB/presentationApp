import { NextResponse } from 'next/server';
import { defaultLanguage, supportedLanguages, type Language } from './i18n/config';
import { auth } from '@/auth';

const PROTECTED_PATHS = ['/myAccount'];

export const proxy = auth((request) => {
   const { pathname } = request.nextUrl;

   const hasLangPrefix = supportedLanguages.some(
      (lang) => pathname === `/${lang}` || pathname.startsWith(`/${lang}/`)
   );

   if (!hasLangPrefix) {
      const sessionLang = request.auth?.user.preferredLanguage; // from db 
      const cookieLang = request.cookies.get('NEXT_LOCALE')?.value; // from cookie

      const preferredSessionLang = supportedLanguages.find((lang) => lang === sessionLang);
      const preferredCookieLang = supportedLanguages.find((lang) => lang === cookieLang);

      const acceptLanguage = request.headers.get('accept-language') ?? '';
      const preferredHeaderLang = supportedLanguages.find((lang) => acceptLanguage.includes(lang));

      const lang: Language = preferredSessionLang ?? preferredCookieLang ?? preferredHeaderLang ?? defaultLanguage;

      const url = request.nextUrl.clone();
      url.pathname = `/${lang}${pathname}`;
      return NextResponse.redirect(url);
   }

   const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}/, '') || '/';
   const isProtected = PROTECTED_PATHS.some((path) => pathWithoutLocale.startsWith(path));

   if (isProtected && !request.auth) {
      const locale = pathname.split('/')[1];
      return NextResponse.redirect(new URL(`/${locale}`, request.nextUrl));
   }

   return NextResponse.next();
});

export const config = {
   matcher: ['/((?!_next|api|.*\\..*).*)'],
};