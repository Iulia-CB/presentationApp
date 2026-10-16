import { getTranslation } from "@/lib/getTranslations";
import About from "../components/sections/About";
import Hero from "../components/sections/Hero";
import Procedures from "../components/sections/Procedures";
import Contact from "../components/sections/Contact";
import AuthSection from "../components/sections/AuthSection";
import { auth } from '@/auth';

export default async function Page({
   params,
}: {
   params: Promise<{ lang: string }>;
}) {
   const { lang } = await params;
   const heroData = await getTranslation('hero', lang);
   const aboutData = await getTranslation('about', lang);
   const proceduresData = await getTranslation('procedures', lang);
   const contactData = await getTranslation('contact', lang);
   const errorsContactData = await getTranslation('contactErrors', lang);
   const loginData = await getTranslation('authLogin', lang);
   const signupFormData = await getTranslation('authSignup', lang);
   const session = await auth();

   return (
      <div >
         <Hero heroData={heroData} />
         <About aboutData={aboutData} />
         <Procedures proceduresData={proceduresData} />
         <Contact
            contactData={contactData}
            errorsContactData={errorsContactData}
            lang={lang}
         />
         { !Boolean(session) && <AuthSection
               loginData={loginData}
               signupFormData={signupFormData}
               lang={lang}
            />
         }
      </div>
   );
}

