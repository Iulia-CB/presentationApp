import { Navbar, FooterSection } from '@nextjs-template/ui';
import LanguageSwitcher from '../components/LanguageSwitcher';
import LogoutButton from '../components/LogoutButton';
import { supportedLanguages } from '../../i18n/config';
import { auth } from '@/auth';

export function generateStaticParams() {
  return supportedLanguages.map((lang) => ({ lang }));
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const session = await auth();

  return (
    <>
      <Navbar 
         lang={lang}
         actions={session && <LogoutButton lang={lang} />}
      />
      <main className="flex-1">{children}</main>
      <FooterSection 
         lang={lang} 
         actions={<LanguageSwitcher lang={lang} />} 
      />
    </>
  );
}
