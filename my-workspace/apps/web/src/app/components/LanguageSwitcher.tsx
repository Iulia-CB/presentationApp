'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { supportedLanguages } from '../../i18n/config';

export default function LanguageSwitcher({ lang }: { lang: string }) {
  const pathname = usePathname();
  const otherLang = supportedLanguages.find((l) => l !== lang) ?? lang;
  const rest = pathname.split('/').slice(2).join('/');
  const href = `/${otherLang}${rest ? `/${rest}` : ''}`;

  // persist the manual choice
  const handleClick = () => {
    document.cookie = `NEXT_LOCALE=${otherLang}; path=/; max-age=31536000`;

    fetch('/api/languagePref', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ lang: otherLang }),
      keepalive: true, // to not abort the request
    })
  };

  return (
    <Link
      href={href}
      onClick={handleClick}
      className="px-3 py-1.5 border rounded-md text-xs uppercase tracking-wide hover:bg-stone-300"
    >
      {otherLang}
    </Link>
  );
}