import { Navbar, FooterSection } from '@nextjs-template/ui';
import LanguageSwitcher from '../components/LanguageSwitcher';
import LogoutButton from '../components/LogoutButton';
import { supportedLanguages } from '../../i18n/config';
import { auth } from '@/auth';
import { getTranslation } from '@/lib/getTranslations';

export const dynamicParams = false; 

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
   const navBarData = await getTranslation('navbar', lang);
   const footerData = await getTranslation('footer', lang);
   const session = await auth();

   return (
      <>
         <Navbar
            lang={lang}
            navBarData={navBarData}
            isLoggedIn={Boolean(session)}
            actions={session && <LogoutButton lang={lang} />}
         />
         <main className="flex-1">{children}</main>
         <FooterSection
            lang={lang}
            footerData={footerData}
            actions={<LanguageSwitcher lang={lang} />}
         />
      </>
   );
}
