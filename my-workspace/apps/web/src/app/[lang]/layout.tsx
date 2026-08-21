import { Navbar, FooterSection } from '@nextjs-template/ui';
import LanguageSwitcher from '../components/LanguageSwitcher';
import { supportedLanguages } from '../../i18n/config';

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
  return (
    <>
      <Navbar lang={lang} actions={<LanguageSwitcher lang={lang} />} />
      <main className="flex-1">{children}</main>
      <FooterSection />
    </>
  );
}
